import { Display, TryParseDisplay } from "./components/displays"
import { responseStatus, sendMessage } from "./components/endpoints"
import { tryEnterOrchestration } from "./components/orchestration"
import { BridgeEventSource } from "./components/eventsource"
import { Playlist, PlaylistArgs } from "./playlists/playlist"
import { PlaylistItemType } from "./playlists/playlistItems"
import { BridgeEvent } from "./components"

/**
 * BridgeClient is the main class for interacting with Looking Glass Bridge.
 * The BridgeClient will attempt to join an orchestration called "default" when it is created.
 * If the "default" orchestration does not exist, it will be created.
 * If the BridgeClient is unable to connect to Bridge, it will not create an orchestration.
 * You can manually call CreateOrchestration() to create an orchestration.
 * This is useful if Bridge was not running when the class was created.
 */

export class BridgeClient {
	private orchestration: string
	private lkgDisplays: Display[]
	private internalPlaylists: Playlist[]
	private currentPlaylist: number
	private eventsource: BridgeEventSource
	static instance: any
	static verbosity: 0 | 1 | 2 | 3 = 3
	private isCasting = false

	constructor() {
		this.orchestration = ""
		this.lkgDisplays = []
		this.eventsource = new BridgeEventSource()
		this.createOrchestration("")
		this.internalPlaylists = []
		this.currentPlaylist = 0

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
	public async query(): Promise<boolean> {
		try {
			let response = await fetch("http://localhost:33334/")
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}
			return true
		} catch (error) {
			console.error(`Looking Glass Bridge is not running, please start Bridge and try again.`)
			return false
		}
	}

	/**
	 * Creates an orchestration called "default" if one does not already exist.
	 * @returns string, the name of the current orchestration
	 */
	public async createOrchestration(name: string) {
		if ((await this.query()) == false) {
			return
		}
		let new_orchestration = await tryEnterOrchestration({ name: name, orchestration: this.orchestration })
		if (new_orchestration !== false && new_orchestration !== undefined) {
			this.orchestration = new_orchestration
		}
		this.initializeEventSource()
		return this.orchestration
	}

	/**
	 * A helper function to get the version of Looking Glass Bridge that is running.
	 * @returns the current version of Looking Glass Bridge
	 */
	public async version() {
		let BridgeVersion = null
		let errorMessage = `this call is only supported in bridge 2.2 or newer, please upgrade Looking Glass Bridge.`

		let response: any = await sendMessage({ endpoint: "bridge_version" })
		if ((await responseStatus({ response: response, errorMessage: errorMessage })) == false) {
			return false
		}
		BridgeVersion = response.payload.value

		return BridgeVersion
	}

	/**
	 * changes the state of the Looking Glass Bridge Window
	 * @param showWindow boolean, true to show the Looking Glass window, false to hide the Looking Glass window
	 * @returns
	 */
	public async showWindow(showWindow: boolean) {
		let errorMessage = `this call is only supported in bridge 2.2 or newer, please upgrade Looking Glass Bridge.`
		const requestBody = JSON.stringify({
			orchestration: this.orchestration,
			show_window: showWindow,
			head_index: -1,
		})
		let response: any = await sendMessage({ endpoint: "show_window", requestBody: requestBody })

		if ((await responseStatus({ response: response, errorMessage: errorMessage })) == false) {
			return false
		}
	}
	/**
	 * A helper function to get the version of the Looking Glass Bridge API
	 * @returns the current version of the Looking Glass API
	 */
	public async apiVersion() {
		let errorMessage = `this call is only supported in bridge 2.2 or newer, please upgrade Looking Glass Bridge.`
		let response: any = await sendMessage({ endpoint: "api_version" })
		if ((await responseStatus({ response: response, errorMessage: errorMessage })) == false) {
			return false
		}

		let APIVersion = response.payload.value
		return APIVersion
	}

	/**
	 * QueryDisplays finds all displays that are connected to the computer,
	 * searches for Looking Glass displays, and returns them as an array of Display objects
	 * @returns the display object
	 */
	public async displays() {
		this.lkgDisplays = []
		const requestBody = JSON.stringify({
			orchestration: this.orchestration,
		})
		let response: any = await sendMessage({ endpoint: "available_output_devices", requestBody: requestBody })
		if ((await responseStatus({ response: response })) == false) {
			return false
		}

		for (let key in response.payload.value) {
			let display = response.payload.value[`${key}`]
			if (display.value.hwid.value.includes("LKG")) {
				let lkg = TryParseDisplay(display.value)
				if (lkg != undefined) {
					this.lkgDisplays.push(lkg)
				}
			}
		}

		return this.lkgDisplays
	}

	/**
	 * A helper function to create a new Playlist object
	 * @param name the name of the playlist
	 */
	public createPlaylist(name: string) {
		const playlist = new Playlist()
		playlist.SetName(name)
		return playlist
	}

	public async deletePlaylist(playlist: Playlist) {
		const requestBody = playlist.GetInstanceJson(this.orchestration)
		let response = await sendMessage({ endpoint: "delete_playlist", requestBody: requestBody })
		if ((await responseStatus({ response: response })) == false) {
			return false
		}
		return response
	}

	/**
	 * this function will play a playlist on a Looking Glass display
	 * the playlist must be created and populated with content before calling this function
	 * @param playlist
	 * @param head
	 * @returns
	 */
	public async play({ playlist, head }: PlaylistArgs) {
		const requestBody = playlist.GetInstanceJson(this.orchestration)

		if (!head) {
			head = -1
		}

		let instancePlaylist = await sendMessage({ endpoint: "instance_playlist", requestBody: requestBody })
		if ((await responseStatus({ response: instancePlaylist })) == false) {
			console.error("failed to initialize playlist")
			return false
		}

		const PlaylistItems: string[] = playlist.GetPlaylistItemsAsJson(this.orchestration)

		for (let i = 0; i < PlaylistItems.length; i++) {
			const pRequestBody = PlaylistItems[i]
			let message = await sendMessage({ endpoint: "insert_playlist_entry", requestBody: pRequestBody })
			if ((await responseStatus({ response: message })) == false) {
				console.error("failed to insert playlist entry")
				return false
			}
		}
		let orchestration = this.orchestration
		const playRequestBody = playlist.GetPlayPlaylistJson({ orchestration, head })
		let play_playlist = await sendMessage({ endpoint: "play_playlist", requestBody: playRequestBody })

		if ((await responseStatus({ response: play_playlist })) == false) {
			console.error("failed to play the playlist")
			return false
		}

		return true
	}

	/**
	 * Casting a hologram requires some pretty specific behavior to work with Bridge' new playlist api.
	 * This function will alternate between two playlists so that you can cast a new hologram without interrupting the current one.
	 * @param playlistItem
	 */
	public async cast(playlistItem: PlaylistItemType) {
		// only cast if we're not already casting
		if (this.isCasting == true) {
			console.warn("already casting please wait")
			return
		}
		this.isCasting = true
		if (this.getVerbosity() != 0) console.group("casting hologram")
		let newPlaylistIndex = (this.currentPlaylist + 1) % 2
		// placeholder value for playlist
		let newPlaylist = null

		if (this.internalPlaylists[newPlaylistIndex] == undefined) {
			this.internalPlaylists[newPlaylistIndex] = this.createPlaylist("cast" + newPlaylistIndex)
			newPlaylist = this.internalPlaylists[newPlaylistIndex]
		} else {
			newPlaylist = this.internalPlaylists[newPlaylistIndex]
			// tell bridge to clear the playlist in its internal memory
			await this.showWindow(false)
			await this.deletePlaylist(newPlaylist)
			this.internalPlaylists[newPlaylistIndex] = this.createPlaylist("cast" + newPlaylistIndex)
			// clear the playlist in bridge.js
			newPlaylist.ClearItems()
		}
		newPlaylist.loop = true
		newPlaylist.AddItem(playlistItem)

		await this.play({ playlist: newPlaylist })
		this.currentPlaylist = newPlaylistIndex
		if (this.getVerbosity() != 0) console.groupEnd()
		this.isCasting = false
	}

	/**
	 * Connect to Looking Glass Bridge's EventSource.
	 * The event source is a websocket connection that will send events from Bridge to the client.
	 * @returns the bridge event source
	 */
	public initializeEventSource() {
		this.eventsource.ConnectToBridgeEventSource(this.orchestration)
	}
	/**
	 * Adds an event listener that returns a message from Bridge's websocket based event source.
	 * @param event the event to listen for
	 * @param MessageHandler the function to call when the event is received
	 */
	public addEventListener(event: BridgeEvent, MessageHandler: any) {
		this.eventsource.AddMessageHandler({ event: event, MessageHandler: MessageHandler })
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
}
