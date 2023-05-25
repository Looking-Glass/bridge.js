import { Display, TryParseDisplay } from "./components/displays"
import { sendMessage } from "./components/endpoints"
import { TryEnterOrchestration } from "./components/orchestration"
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

	constructor() {
		this.orchestration = ""
		this.lkgDisplays = []
		this.eventsource = new BridgeEventSource()
		this.CreateOrchestration()
		this.internalPlaylists = []
		this.currentPlaylist = 0
	}

	static async init() {
		new BridgeClient()
	}

	/**
	 * A helper function to check and see if Looking Glass Bridge is running or not.
	 * @returns boolean, true if Bridge is running, false if Bridge is not running
	 */
	public async QueryBridge(): Promise<boolean> {
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
	public async CreateOrchestration(name: string = "default") {
		if ((await this.QueryBridge()) == false) {
			return
		}
		let new_orchestration = await TryEnterOrchestration(name)
		this.orchestration = new_orchestration
		this.initializeEventSource()
		return this.orchestration
	}

	/**
	 * A helper function to get the version of Looking Glass Bridge that is running.
	 * @returns the current version of Looking Glass Bridge
	 */
	public async bridgeVersion() {
		let BridgeVersion = null
		let errorMessage = `this call is only supported in bridge 2.2 or newer, please upgrade Looking Glass Bridge.`

		let response = await sendMessage({ endpoint: "bridge_version", errorMessage: errorMessage })
		BridgeVersion = response.payload.value

		return BridgeVersion
	}
	/**
	 * A helper function to get the version of the Looking Glass Bridge API
	 * @returns the current version of the Looking Glass API
	 */
	public async apiVersion() {
		let errorMessage = `this call is only supported in bridge 2.2 or newer, please upgrade Looking Glass Bridge.`
		let response = await sendMessage({ endpoint: "api_version", errorMessage: errorMessage })

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
		let response = await sendMessage({ endpoint: "available_output_devices", requestBody: requestBody })

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
	public CreatePlaylist(name: string) {
		const playlist = new Playlist()
		playlist.SetName(name)
		return playlist
	}

	public async deletePlaylist(playlist: Playlist) {
		const requestBody = playlist.GetInstanceJson(this.orchestration)
		let response = await sendMessage({ endpoint: "delete_playlist", requestBody: requestBody })
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

		await sendMessage({ endpoint: "instance_playlist", requestBody: requestBody })

		const PlaylistItems: string[] = playlist.GetPlaylistItemsAsJson(this.orchestration)

		for (let i = 0; i < PlaylistItems.length; i++) {
			const pRequestBody = PlaylistItems[i]
			await sendMessage({ endpoint: "insert_playlist_entry", requestBody: pRequestBody })
		}
		let orchestration = this.orchestration
		const playRequestBody = playlist.GetPlayPlaylistJson({ orchestration, head })
		await sendMessage({ endpoint: "play_playlist", requestBody: playRequestBody })

		return true
	}

	/**
	 * Casting a hologram requires some pretty specific behavior to work with Bridge' new playlist api.
	 * This function will alternate between two playlists so that you can cast a new hologram without interrupting the current one.
	 * @param playlistItem
	 */
	public async cast(playlistItem: PlaylistItemType) {
		let newPlaylistIndex = (this.currentPlaylist + 1) % 2
		if (this.internalPlaylists[newPlaylistIndex] == undefined) {
			this.internalPlaylists[newPlaylistIndex] = this.CreatePlaylist("cast" + newPlaylistIndex)
		}
		let newPlaylist = this.internalPlaylists[newPlaylistIndex]
		// tell bridge to clear the playlist in its internal memory
		await this.deletePlaylist(newPlaylist)
		// clear the playlist in bridge.js
		newPlaylist.ClearItems()
		newPlaylist.loop = true
		newPlaylist.AddItem(playlistItem)

		await this.play({ playlist: newPlaylist })
		this.currentPlaylist = newPlaylistIndex
	}

	/**
	 * Connect to Looking Glass Bridge's EventSource.
	 * The event source is a websocket connection that will send events from Bridge to the client.
	 * @returns the bridge event source
	 */
	public initializeEventSource() {
		this.eventsource.ConnectToBridgeEventSource(this.orchestration)
	}

	public addEventListener(event: BridgeEvent, MessageHandler: any) {
		this.eventsource.AddMessageHandler({ event: event, MessageHandler: MessageHandler })
	}
}
