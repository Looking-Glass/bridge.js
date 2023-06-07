import { Display, tryParseDisplay } from "./components/displays"
import { sendMessage } from "./components/endpoints"
import { tryEnterOrchestration } from "./components/orchestration"
import { BridgeEventSource } from "./components/eventsource"
import { Playlist } from "./playlists/playlist"
import { Hologram } from "./components/hologram"
import { BridgeEvent } from "./components"
import * as schema from "./schemas/responses"
import { z } from "zod"
import { Fallback } from "./components/fallback"

/**
 * BridgeClient is the main class for interacting with Looking Glass Bridge.
 * The BridgeClient will attempt to join an orchestration called "default" when it is created.
 * If the "default" orchestration does not exist, it will be created.
 * If the BridgeClient is unable to connect to Bridge, it will not create an orchestration.
 * You can manually call CreateOrchestration() to create an orchestration.
 * This is useful if Bridge was not running when the class was created.
 */

class BridgeClient {
	private orchestration: string
	private isValid: boolean
	private lkgDisplays: Display[]
	private internalPlaylists: Playlist[]
	private currentPlaylist: number
	private eventsource: BridgeEventSource
	static instance: BridgeClient
	static verbosity: 0 | 1 | 2 | 3 = 3
	private isCasting = false
	private fallback: Fallback
	public version: number

	constructor() {
		this.orchestration = ""
		this.isValid = false
		this.lkgDisplays = []
		this.eventsource = new BridgeEventSource()
		this.createOrchestration("")
		this.internalPlaylists = []
		this.currentPlaylist = 0
		this.fallback = new Fallback()
		this.version = 0

		if (!BridgeClient.instance) {
			BridgeClient.instance = this
		} else {
			return BridgeClient.instance
		}
	}

	static getInstance() {
		if (!BridgeClient.instance) {
			BridgeClient.instance = new BridgeClient()
		}
		return BridgeClient.instance
	}

	/**
	 * A helper function to check and see if Looking Glass Bridge is running or not.
	 * @returns boolean, true if Bridge is running, false if Bridge is not running
	 */
	public async status(): Promise<boolean> {
		try {
			let response = await fetch("http://localhost:33334/")
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}
			this.isValid = true
			return true
		} catch (error) {
			console.warn(`Looking Glass Bridge is not running, please start Bridge and try again.`)
			return false
		}
	}

	/**
	 * Creates an orchestration called "default" if one does not already exist.
	 * @returns string, the name of the current orchestration
	 */
	public async createOrchestration(name: string): Promise<{ success: boolean; response: null | string }> {
		if ((await this.status()) == false) {
			return { success: false, response: null }
		}
		const version = await this.getVersion()
		if (version.success == false) {
			console.error(`Unable to get Looking Glass Bridge version, please upgrade Looking Glass Bridge.`)
			return { success: false, response: null }
		}
		let new_orchestration = await tryEnterOrchestration({ name: name, orchestration: this.orchestration })
		if (new_orchestration !== false && new_orchestration !== undefined) {
			this.orchestration = new_orchestration
		}
		this.initializeEventSource()
		this.isValid = true
		return { success: true, response: this.orchestration }
	}

	/**
	 * A helper function to get the version of Looking Glass Bridge that is running.
	 * @returns string of the version of Looking Glass Bridge that is running
	 */
	public async getVersion(): Promise<{ success: boolean; response: number }> {
		//give enough time for the websocket to connect.
		console.log("%c function call: getVersion ", "color: magenta; font-weight: bold; border: solid")
		// use a fallback in case the driver version is too old.
		if (this.isValid != false) {
			await new Promise((r) => setTimeout(r, 1000))
			this.version = await this.fallback.messageCallback()
		}
		if ((await this.isVersionCompatible()) == false && this.isValid == false) {
			return { success: false, response: 0 }
		}

		let response = await sendMessage({ endpoint: "bridge_version", requestBody: {} })
		if (response.success == false) {
			console.warn(`this call is only supported in bridge 2.2 or newer, please upgrade Looking Glass Bridge.`)
			return { success: false, response: 0 }
		}
		this.version = parseFloat(response.response.payload.value)
		this.isValid = true
		return { success: true, response: this.version }
	}

	/**
	 * changes the state of the Looking Glass Bridge Window
	 * @param showWindow boolean, true to show the Looking Glass window, false to hide the Looking Glass window
	 * @returns
	 */
	public async showWindow(
		showWindow: boolean
	): Promise<{ success: boolean; response: z.infer<typeof schema.show_window> | null }> {
		if (this.isValid == false) return { success: false, response: null }
		console.log("%c function call: showWindow ", "color: magenta; font-weight: bold; border: solid")
		let errorMessage = `this call is only supported in bridge 2.2 or newer, please upgrade Looking Glass Bridge.`
		if ((await this.isVersionCompatible()) == false) {
			console.warn(errorMessage)

			return { success: false, response: null }
		}
		const requestBody = {
			orchestration: this.orchestration,
			show_window: showWindow,
			head_index: -1,
		}
		let response = await sendMessage({
			endpoint: "show_window",
			requestBody: requestBody,
		})

		if (response.success == false) {
			return { success: false, response: null }
		}
		return { success: true, response: response.response }
	}

	/**
	 * A helper function to get the version of the Looking Glass Bridge API
	 * @returns the current version of the Looking Glass API
	 */
	public async apiVersion(): Promise<{ success: boolean; response: number }> {
		console.log("%c function call: apiVersion ", "color: magenta; font-weight: bold; border: solid")
		if (this.isValid == false) {
			return { success: false, response: 0 }
		}
		if ((await this.isVersionCompatible()) == false) return { success: false, response: 0 }
		let response = await sendMessage({ endpoint: "api_version", requestBody: {} })
		if (response.success == false) {
			console.warn(`this call is only supported in bridge 2.2 or newer, please upgrade Looking Glass Bridge.`)
			return { success: false, response: 0 }
		}

		let APIVersion = parseFloat(response.response.payload.value)
		return { success: true, response: APIVersion }
	}

	/**
	 * QueryDisplays finds all displays that are connected to the computer,
	 * searches for Looking Glass displays, and returns them as an array of Display objects
	 * @returns the display object
	 */
	public async displays(): Promise<{ success: boolean; response: Display[] | null }> {
		console.log("%c function call: displays ", "color: magenta; font-weight: bold; border: solid")
		this.lkgDisplays = []
		// if there is no orchestration, attempt to create one, if that fails, return false
		if (this.isValid == false) return { success: false, response: null }
		const requestBody = {
			orchestration: this.orchestration,
		}
		let response = await sendMessage({
			endpoint: "available_output_devices",
			requestBody: requestBody,
		})
		if (response.success == false) {
			return { success: false, response: null }
		}

		for (let key in response.response.payload.value) {
			let display = response.response.payload.value[`${key}`]
			if (display.value.hwid.value.includes("LKG")) {
				let lkg = tryParseDisplay(display.value)
				if (lkg != undefined) {
					this.lkgDisplays.push(lkg)
				}
			}
		}

		return { success: true, response: this.lkgDisplays }
	}

	public async deletePlaylist(
		playlist: Playlist
	): Promise<{ success: boolean; response: z.infer<typeof schema.delete_playlist> | null }> {
		console.log("%c function call: deletePlaylist ", "color: magenta; font-weight: bold; border: solid")
		if (this.isValid == false) {
			return { success: false, response: null }
		}
		const requestBody = playlist.getInstance(this.orchestration)
		let response = await sendMessage({
			endpoint: "delete_playlist",
			requestBody: requestBody,
		})

		if (response.success == false) {
			return { success: false, response: null }
		}

		return response
	}

	/**
	 * Casting a hologram requires some pretty specific behavior to work with Bridge' new playlist api.
	 * This function will alternate between two playlists so that you can cast a new hologram without interrupting the current one.
	 * @param hologram
	 */
	public async cast(hologram: Hologram): Promise<{ success: boolean }> {
		if (this.isValid == false) return { success: false }
		console.log("%c function call: cast ", "color: magenta; font-weight: bold; border: solid")
		if (this.isCasting == true) {
			console.warn("already casting please wait")

			return { success: false }
		}
		this.isCasting = true

		let newPlaylistIndex = (this.currentPlaylist + 1) % 2
		let playlist = this.internalPlaylists[newPlaylistIndex]

		// delete the playlist if it already exists
		if (playlist != undefined) {
			// tell bridge to clear the playlist in its internal memory
			const deleteResult = await this.deletePlaylist(playlist)
			if (deleteResult.success == false) {
				return { success: false }
			}
			// clear the playlist in bridge.js
			playlist.clearItems()
		}

		playlist = new Playlist({
			name: "cast" + newPlaylistIndex,
			loop: true,
			items: [],
			orchestration: this.orchestration,
		})

		playlist.addItem(hologram)
		console.log("item", playlist.items[0].toBridge())
		await playlist.play({
			playlist: playlist,
		})
		this.currentPlaylist = newPlaylistIndex

		this.isCasting = false
		return { success: true }
	}

	/**
	 * Connect to Looking Glass Bridge's EventSource.
	 * The event source is a websocket connection that will send events from Bridge to the client.
	 * @returns the bridge event source
	 */
	public initializeEventSource() {
		this.eventsource.connectToBridgeEventSource(this.orchestration)
	}
	/**
	 * Adds an event listener that returns a message from Bridge's websocket based event source.
	 * @param event the event to listen for
	 * @param MessageHandler the function to call when the event is received
	 */
	public addEventListener(event: BridgeEvent, MessageHandler: any) {
		this.eventsource.addMessageHandler({ event: event, MessageHandler: MessageHandler })
	}

	public getVerbosity() {
		return BridgeClient.verbosity
	}
	/**
	 *Set the level of console logging that Bridge.js library will do.
	 * @param verbosity 0 = no logging, 1 = errors only, 2 = only bridge values, 3 = full bridge response
	 */
	public setVerbosity(verbosity: 0 | 1 | 2 | 3) {
		BridgeClient.verbosity = verbosity
	}

	/**
	 * helper function for determining if the version of Bridge is valid.
	 * @returns boolean, true if the version is compatible, false if not
	 */
	private async isVersionCompatible() {
		if (this.version == 0) {
			this.isValid = false
		} else if (this.version < 2.1) {
			console.warn("Please update to the latest version for the best experience")
			this.isValid = false
		} else if (this.version >= 2.1) {
			this.isValid = true
		}

		return this.isValid
	}
}

export const Bridge: BridgeClient = BridgeClient.getInstance()
