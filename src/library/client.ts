import { Display, tryParseDisplay } from "./components/displays"
import { sendMessage } from "./components/endpoints"
import { tryEnterOrchestration, tryExitOrchestration } from "./components/orchestration"
import { BridgeEventSource } from "./components/eventsource"
import { Playlist } from "./playlists/playlist"
import { HologramType } from "./components/hologram"
import { BridgeEventMap } from "./schemas/schema.events"
import * as schema from "./schemas/schema.responses"
import { z } from "zod"
import { Fallback } from "./components/fallback"

export class BridgeClient {
	/** The name of the current orchestration */
	private orchestration: string
	/** A boolean that stores if the Bridge session is valid or not
	 *  If the orchestration is not valid, some functions will not work
	 */
	static isConnected: boolean
	/**A boolean for checking the status of the current disconnect event */
	public isDisconnecting: boolean
	/**An array containing the connected Looking Glass Displays */
	private displays: Display[]
	/**an Array containing Playlists, we store this to easily switch between multiple playlists */
	public playlists: Playlist[] | undefined
	/** The index of playlists that is currently active */
	public currentPlaylistIndex: number
	/** the instance of the client that we create, BridgeClient is a singleton, there can only be one */
	static instance: BridgeClient
	static fallback: Fallback | undefined
	/** The websocket connection to Bridge's Event Source, this returns information from Bridge */
	static eventsource: BridgeEventSource | undefined
	/**control how often we log to the console, 3 is everything, 0 is nothing */
	static verbosity: 0 | 1 | 2 | 3 = 3
	/**store if we're currently in the middle of a cast */
	private isCastPending = false
	/**the version of the Looking Glass Driver that's running */
	public version: number
	private currentHologram: HologramType | undefined
	/**a boolean for whether a disconnect was triggered automatically or manually */
	public manualDisconnect = false

	constructor() {
		this.orchestration = ""
		BridgeClient.isConnected = false
		this.isDisconnecting = false
		this.displays = []
		BridgeClient.eventsource = undefined
		BridgeClient.fallback = undefined
		this.playlists = []

		this.currentPlaylistIndex = 0
		this.version = 0

		if (!BridgeClient.instance) {
			BridgeClient.instance = this
		} else {
			return BridgeClient.instance
		}
	}

	static getInstance(): BridgeClient {
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
		console.log("%c function call: status ", "color: magenta; font-weight: bold; border: solid")

		const timeout = new Promise((reject) => {
			let id = setTimeout(() => {
				clearTimeout(id)
				reject(new Error("Timed out"))
			}, 5000)
		})

		try {
			const response = (await Promise.race([fetch("http://localhost:33334/"), timeout])) as Response
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}
			return true
		} catch (error) {
			const err = error as Error
			if (err.message === "Timed out") {
				console.warn("Request timed out")
			} else {
				console.warn(`Looking Glass Bridge is not running, please start Bridge and try again.`)
			}
			return false
		}
	}

	/**
	 * Attempt to connect to Looking Glass Bridge.
	 * @returns
	 */
	public async connect(): Promise<{
		success: boolean
		response: { version: number; orchestration: string }
	}> {
		console.log("%c function call: connect ", "color: magenta; font-weight: bold; border: solid")

		// check if we're already connected
		if (BridgeClient.isConnected == true) {
			console.warn(`Already connected to Looking Glass Bridge.`)
			return { success: true, response: { version: this.version, orchestration: this.orchestration } }
		}

		// check that the websocket and the http server are running
		let status = await this.status()
		if (status == false)
			return {
				success: false,
				response: { version: 0, orchestration: "" },
			}
		BridgeClient.isConnected = true

		// create event source and fallback
		BridgeClient.eventsource = new BridgeEventSource()
		await this.subscribeToEvents()

		// BridgeClient.fallback = new Fallback()

		let call = await this.createOrchestration("")
		if (call.success == false) {
			let version = await this.getVersion()
			if (version.success == false) {
				return { success: false, response: { version: 0, orchestration: "" } }
			} else if (version.response < 2.2) {
				return { success: false, response: { version: version.response, orchestration: "" } }
			}
		}

		return { success: true, response: { version: this.version, orchestration: this.orchestration } }
	}

	/**
	 * Creates an orchestration called "default" if one does not already exist.
	 * @returns string, the name of the current orchestration
	 */
	public async createOrchestration(name: string): Promise<{ success: boolean; response: null | string }> {
		console.log("%c function call: createOrchestration ", "color: magenta; font-weight: bold; border: solid")
		if ((await this.status()) == false) {
			return { success: false, response: null }
		}
		const version = await this.getVersion()
		if (version.response < 2.1) {
			console.error(`Unable to get Looking Glass Bridge version, please upgrade Looking Glass Bridge.`)
			return { success: false, response: null }
		}
		let new_orchestration = await tryEnterOrchestration({ name: name, orchestration: this.orchestration })
		if (new_orchestration.success == true) {
			if (new_orchestration.response?.payload.value) {
				this.orchestration = new_orchestration.response?.payload.value
			}
		}
		return { success: true, response: this.orchestration }
	}

	/**
	 * Disconnect from Looking Glass Bridge, free up resources.
	 */

	public async disconnect(): Promise<{ success: boolean }> {
		console.log("%c function call: disconnect ", "color: magenta; font-weight: bold; border: solid")
		// check that we're not already disconnecting
		if (this.isDisconnecting == true || BridgeClient.isConnected == false) {
			return { success: false }
		}

		this.isDisconnecting = true
		this.manualDisconnect = true

		let exit = await tryExitOrchestration(this.orchestration)
		if (exit.success == false) {
			console.warn(` ⚠️ Unable to exit orchestration, Bridge is not reachable.`)
		}

		// shutdown
		BridgeClient.eventsource?.disconnectEvent()
		BridgeClient.eventsource?.ws?.close()
		BridgeClient.fallback?.ws.close()
		BridgeClient.fallback = undefined
		this.displays = []
		this.playlists = []
		this.currentHologram = undefined
		this.orchestration = ""
		this.isDisconnecting = false
		BridgeClient.isConnected = false

		return { success: true }
	}

	/**
	 * changes the state of the Looking Glass Bridge Window
	 * @param showWindow boolean, true to show the Looking Glass window, false to hide the Looking Glass window
	 * @returns
	 */
	public async showWindow(
		showWindow: boolean
	): Promise<{ success: boolean; response: z.infer<typeof schema.show_window> | null }> {
		if (BridgeClient.isConnected == false) return { success: false, response: null }
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
		let message = await sendMessage({
			endpoint: "show_window",
			requestBody: requestBody,
		})

		if (message.success == false) {
			return { success: false, response: null }
		}
		return { success: true, response: message.response }
	}

	/**
	 * A helper function to get the version of Looking Glass Bridge that is running.
	 * @returns string of the version of Looking Glass Bridge that is running
	 */
	public async getVersion(): Promise<{ success: boolean; response: number }> {
		console.log("%c function call: getVersion ", "color: magenta; font-weight: bold; border: solid")

		let message = await sendMessage({ endpoint: "bridge_version", requestBody: {} })
		if (message.success == true) {
			this.version = parseFloat(message.response.payload.value)
			return { success: true, response: this.version }
		}
		// if the bridge version fails, try the legacy version
		else {
			let version = await BridgeClient.fallback?.getLegacyVersion()
			if (version == undefined) return { success: false, response: 0 }
			return { success: true, response: version }
		}
	}

	/**
	 * A helper function to get the version of the Looking Glass Bridge API
	 * @returns the current version of the Looking Glass API
	 */
	public async apiVersion(): Promise<{ success: boolean; response: number }> {
		console.log("%c function call: apiVersion ", "color: magenta; font-weight: bold; border: solid")
		if (BridgeClient.isConnected == false) {
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
	public async getDisplays(): Promise<{ success: boolean; response: Display[] | null }> {
		console.log("%c function call: displays ", "color: magenta; font-weight: bold; border: solid")
		this.displays = []
		// if there is no orchestration, attempt to create one, if that fails, return false
		if (BridgeClient.isConnected == false) return { success: false, response: null }
		const requestBody = {
			orchestration: this.orchestration,
		}
		let data = await sendMessage({
			endpoint: "available_output_devices",
			requestBody: requestBody,
		})
		if (data.success == false) {
			return { success: false, response: null }
		}

		schema.available_output_devices.safeParse(data.response)

		for (let key in data.response.payload.value) {
			let display = data.response.payload.value[`${key}`]
			if (display.value.hwid.value.includes("LKG")) {
				let lkg = tryParseDisplay(display.value)
				if (lkg != undefined) {
					this.displays.push(lkg)
				}
			}
		}

		return { success: true, response: this.displays }
	}

	/**Delete the instance of the playlist from Bridge, this will stop the playlist from playing if it's active. */
	public async deletePlaylist(
		playlist: Playlist
	): Promise<{ success: boolean; response: z.infer<typeof schema.delete_playlist> | null }> {
		console.log("%c function call: deletePlaylist ", "color: magenta; font-weight: bold; border: solid")
		if (BridgeClient.isConnected == false) {
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
	 * This function will allow you to cast a single hologram to the Looking Glass
	 * @param hologram
	 */
	public async cast(hologram: HologramType): Promise<{ success: boolean }> {
		if (BridgeClient.isConnected == false) return { success: false }
		console.log("%c function call: cast ", "color: magenta; font-weight: bold; border: solid")
		if (hologram.uri == this.currentHologram?.uri && hologram.settings == this.currentHologram.settings) {
			console.warn("already casting this hologram")

			return { success: true }
		}

		if (this.isCastPending == true) {
			console.warn("already casting please wait")

			return { success: false }
		}

		this.isCastPending = true

		let newPlaylistIndex = (this.currentPlaylistIndex + 1) % 2
		let playlist = this.playlists?.[newPlaylistIndex]

		// delete the playlist if it already exists
		if (playlist != undefined) {
			// tell bridge to clear the playlist in its internal memory
			const deleteResult = await this.deletePlaylist(playlist)
			if (deleteResult.success == false) {
				return { success: false }
			}
			// clear the playlist in bridge.js
			playlist.clearItems()
			playlist = undefined
		}

		playlist = new Playlist({
			name: "cast" + newPlaylistIndex,
			loop: true,
			items: [],
			orchestration: this.orchestration,
		})

		playlist.addItem(hologram)
		await playlist.play({ playlist })

		this.currentPlaylistIndex = newPlaylistIndex
		if (this.playlists !== undefined && this.playlists[newPlaylistIndex] == undefined) {
			this.playlists[newPlaylistIndex] = playlist
		}

		this.isCastPending = false
		this.currentHologram = hologram
		return { success: true }
	}

	/**Play a Playlist created by Looking Glass Studio, requires the full path to the playlist.json file. */
	public async playStudioPlaylist(
		playlistPath: string
	): Promise<{ success: boolean; response: z.infer<typeof schema.play_playlist> | null }> {
		console.log("%c function call: subscribeToEvents ", "color: magenta; font-weight: bold; border: solid")
		if (BridgeClient.isConnected == false) return { success: false, response: null }

		const requestBody = {
			orchestration: this.orchestration,
			name: "Studio Playlist",
			playlist_path: playlistPath,
			loop: true,
		}

		await sendMessage({
			endpoint: "instance_studio_playlist",
			requestBody: requestBody,
		})

		const playRequestBody = {
			orchestration: this.orchestration,
			name: "Studio Playlist",
			head_index: -1,
		}

		let play_playlist = await sendMessage({
			endpoint: "play_playlist",
			requestBody: playRequestBody,
		})

		return { success: true, response: play_playlist.response }
	}

	/**stop playing the studio playlist */
	public async stopStudioPlaylist(): Promise<{ success: boolean }> {
		console.log("%c function call: stopStudioPlaylist ", "color: magenta; font-weight: bold; border: solid")
		if (BridgeClient.isConnected == false) return { success: false }

		const requestBody = {
			orchestration: this.orchestration,
			name: "Studio Playlist",
			loop: false,
		}

		let message = await sendMessage({
			endpoint: "delete_playlist",
			requestBody: requestBody,
		})
		if (message.success == false) {
			return { success: false }
		}

		await this.showWindow(false)

		return { success: true }
	}

	/**Get the current playlist that is set to start automatically */

	public async getAutoStartPlaylist(): Promise<{
		success: boolean
		response: z.infer<typeof schema.get_autostart_playlist> | null
	}> {
		console.log("%c function call: getAutoStartPlaylist ", "color: magenta; font-weight: bold; border: solid")
		if (BridgeClient.isConnected == false) return { success: false, response: null }

		let requestBody = {
			orchestration: this.orchestration,
			head_index: -1,
		}

		let message = await sendMessage({
			endpoint: "get_autostart_playlist",
			requestBody: requestBody,
		})

		if (message.success == false) {
			return { success: false, response: null }
		}

		return { success: true, response: message.response }
	}

	/**Choose a Playlist that exists on the local file system to set as the start up playlist */
	public async setAutoStartPlaylist(args: { playlistName: string; playlistPath: string }): Promise<{
		success: boolean
		response: z.infer<typeof schema.set_autostart_playlist> | null
	}> {
		console.log("%c function call: setAutoStartPlaylist ", "color: magenta; font-weight: bold; border: solid")
		if (BridgeClient.isConnected == false) return { success: false, response: null }

		let requestBody = {
			orchestration: this.orchestration,
			head_index: -1,
			playlist_name: args.playlistName,
			playlist_path: args.playlistPath,
		}

		let message = await sendMessage({
			endpoint: "set_autostart_playlist",
			requestBody: requestBody,
		})

		if (message.success == false) {
			return { success: false, response: null }
		}

		return { success: true, response: message.response }
	}

	/**set a playlist to auto-start, requires that all files are local on the system */
	public async createAutoStartPlaylist(args: { playlist: Playlist }): Promise<{
		success: boolean
		response: z.infer<typeof schema.set_named_autostart_playlist> | null
	}> {
		console.log(
			"%c function call: createAutoStartPlaylist ",
			"color: magenta; font-weight: bold; border: solid"
		)
		if (BridgeClient.isConnected == false) return { success: false, response: null }

		// check that all holograms are local
		for (let i = 0; i < args.playlist.items.length; i++) {
			let item = args.playlist.items[i]
			if (item.hologram.uri.includes("http")) {
				console.warn("playlist contains a web uri, cannot create autostart playlist")
				return { success: false, response: null }
			}
		}

		let requestBody = {
			orchestration: this.orchestration,
			head_index: -1,
			playlist_name: args.playlist.name,
		}

		let message = await sendMessage({
			endpoint: "set_named_autostart_playlist",
			requestBody: requestBody,
		})

		if (message.success == false) {
			return { success: false, response: null }
		}

		return { success: true, response: message.response }
	}

	// TRANSPORT CONTROLS

	/**Play the currently instanced playlist */
	public async play(): Promise<{
		success: boolean
		response: z.infer<typeof schema.transport_control_play> | null
	}> {
		let requestBody = {
			orchestration: this.orchestration,
		}

		let message = await sendMessage({
			endpoint: "transport_control_play",
			requestBody: requestBody,
		})

		if (message.success == false) {
			return { success: false, response: null }
		}

		return { success: true, response: message.response }
	}

	/**Pause the currently playing playlist */
	public async pause(): Promise<{
		success: boolean
		response: z.infer<typeof schema.transport_control_pause> | null
	}> {
		let requestBody = {
			orchestration: this.orchestration,
		}

		let message = await sendMessage({
			endpoint: "transport_control_pause",
			requestBody: requestBody,
		})

		if (message.success == false) {
			return { success: false, response: null }
		}

		return { success: true, response: message.response }
	}

	/**Got to the next playlist item */
	public async next(): Promise<{
		success: boolean
		response: z.infer<typeof schema.transport_control_next> | null
	}> {
		let requestBody = {
			orchestration: this.orchestration,
		}

		let message = await sendMessage({
			endpoint: "transport_control_next",
			requestBody: requestBody,
		})

		if (message.success == false) {
			return { success: false, response: null }
		}

		return { success: true, response: message.response }
	}

	/**Go to the previous playlist item */
	public async previous(): Promise<{
		success: boolean
		response: z.infer<typeof schema.transport_control_previous> | null
	}> {
		let requestBody = {
			orchestration: this.orchestration,
		}

		let message = await sendMessage({
			endpoint: "transport_control_previous",
			requestBody: requestBody,
		})

		if (message.success == false) {
			return { success: false, response: null }
		}

		return { success: true, response: message.response }
	}

	/**Seek to a specific item in a playlist */
	public async seek(
		index: number
	): Promise<{ success: boolean; response: z.infer<typeof schema.transport_control_seek_to_index> | null }> {
		let requestBody = {
			orchestration: this.orchestration,
			index: index,
		}

		let message = await sendMessage({
			endpoint: "transport_control_seek_to_index",
			requestBody: requestBody,
		})

		if (message.success == false) {
			return { success: false, response: null }
		}

		return { success: true, response: message.response }
	}
	/**
	 * Connect to Looking Glass Bridge's EventSource.
	 * The event source is a websocket connection that will send events from Bridge to the client.
	 * @returns the bridge event source
	 */
	private async subscribeToEvents(): Promise<{ success: boolean }> {
		console.log("%c function call: subscribeToEvents ", "color: magenta; font-weight: bold; border: solid")

		let events = await BridgeClient.eventsource?.connectToBridgeEventSource(this.orchestration)

		if (events?.success == true) return { success: true }
		else return { success: false }
	}
	/**
	 * Adds an event listener that returns a message from Bridge's websocket based event source.
	 * @param event the event to listen for
	 * @param MessageHandler the function to call when the event is received
	 */
	public async addEventListener<T extends keyof BridgeEventMap>(
		event: T,
		MessageHandler: (event: BridgeEventMap[T]) => void
	) {
		if (BridgeClient.eventsource == undefined) {
			await this.subscribeToEvents()
		} else {
			BridgeClient.eventsource.addMessageHandler({ event: event, MessageHandler: MessageHandler })
		}
	}

	public async removeEventListener<T extends keyof BridgeEventMap>(
		event: T,
		MessageHandler: (event: BridgeEventMap[T]) => void
	) {
		if (BridgeClient.eventsource == undefined) {
			await this.subscribeToEvents()
		} else {
			BridgeClient.eventsource.removeMessageHandler({ event: event, MessageHandler: MessageHandler })
		}
	}

	public getCurrentHologram(): HologramType | undefined {
		return this.currentHologram
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
			BridgeClient.isConnected = false
		} else if (this.version < 2.2) {
			console.warn("Please update to the latest version for the best experience")
			BridgeClient.isConnected = false
		} else if (this.version >= 2.2) {
			BridgeClient.isConnected = true
		}

		return BridgeClient.isConnected
	}
}
