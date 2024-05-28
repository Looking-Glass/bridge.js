import { Display, tryParseDisplay } from "../components/displays"
import { sendMessage } from "../components/endpoints"
import { tryEnterOrchestration, tryExitOrchestration } from "../components/orchestration"
import { BridgeEventSource } from "../components/eventsource"
import { Playlist } from "../playlists/playlist"
import { HologramType } from "../components/hologram"
import { BridgeEventMap } from "../schemas/schema.events"
import { HologramParamMap } from "../schemas/schema.parameters"
import * as schema from "../schemas/schema.responses"
import { z } from "zod"
import { Fallback } from "../components/fallback"
import { AllEventsMessageHandler, NewItemPlayingMessageHandler } from "../components/messageHandler"
import { BridgeVersion } from "../components/types"
import { parseBridgeVersion } from "../utilities/general.utils"

export class BridgeClient {
	/** The name of the current orchestration */
	private orchestration: string
	/** A boolean that stores if the Bridge session is valid or not
	 *  If the orchestration is not valid, some functions will not work
	 */
	public isConnected: boolean
	/**A boolean for checking the status of the current disconnect event */
	public isDisconnecting: boolean
	/**An array containing the connected Looking Glass Displays */
	private displays: Display[]
	/**an Array containing Playlists, we store this to easily switch between multiple playlists */
	public playlists: Playlist[] | undefined
	/** The index of playlists that is currently active */
	public currentPlaylistIndex: number
	/**The index of the playlist Item that is currently active */
	public currentPlaylistItemIndex: number
	/** the instance of the client that we create, BridgeClient is a singleton, there can only be one */
	static instance: BridgeClient
	static fallback: Fallback | undefined
	/** The websocket connection to Bridge's Event Source, this returns information from Bridge */
	static eventsource: BridgeEventSource
	/**control how often we log to the console, 3 is everything, 0 is nothing */
	static verbosity: 0 | 1 | 2 | 3
	/**store if we're currently in the middle of a cast */
	public isCastPending = false
	/**the version of the Looking Glass Driver that's running */
	public version: BridgeVersion
	private currentHologram: HologramType | undefined
	/**a boolean for whether a disconnect was triggered automatically or manually */
	public manualDisconnect = false

	public playState: "PLAYING" | "PAUSED" | "STOPPED" = "STOPPED"

	constructor() {
		this.orchestration = ""
		this.isConnected = false
		this.isDisconnecting = false
		this.displays = []
		BridgeClient.eventsource = new BridgeEventSource()
		BridgeClient.fallback = undefined
		this.playlists = []

		this.currentPlaylistIndex = 0
		this.currentPlaylistItemIndex = 0
		this.version = { major: 0, minor: 0, patch: 0, hotfix: 0 }

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
		this.log("%c function call: status ", "color: magenta; font-weight: bold; border: solid")

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
				this.warn("Request timed out")
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
		response: { version: BridgeVersion; orchestration: string }
	}> {
		this.log("%c function call: connect ", "color: magenta; font-weight: bold; border: solid")

		// check if we're already connected
		if (this.isConnected == true) {
			console.warn(`Already connected to Looking Glass Bridge.`)
			return { success: true, response: { version: this.version, orchestration: this.orchestration } }
		}

		// check that the websocket and the http server are running
		let status = await this.status()
		if (status == false)
			return {
				success: false,
				response: { version: { major: 0, minor: 0, patch: 0, hotfix: 0 }, orchestration: "" },
			}
		this.isConnected = true

		// BridgeClient.fallback = new Fallback()

		let call = await this.createOrchestration("")
		if (call.success == false) {
			let version = await this.getVersion()
			if (version.success == false) {
				return { success: false, response: { version: parseBridgeVersion("0"), orchestration: "" } }
			} else if (version.response.major < 2 && version.response.minor < 1) {
				return { success: false, response: { version: version.response, orchestration: "" } }
			}
		}

		// create event source and fallback
		await this.subscribeToEvents()
		BridgeClient.eventsource.connectEvent()

		new NewItemPlayingMessageHandler({ client: this })

		new AllEventsMessageHandler({ client: this })

		return { success: true, response: { version: this.version, orchestration: this.orchestration } }
	}

	/**
	 * Creates an orchestration called "default" if one does not already exist.
	 * @returns string, the name of the current orchestration
	 */
	public async createOrchestration(name: string): Promise<{ success: boolean; response: null | string }> {
		this.log("%c function call: createOrchestration ", "color: magenta; font-weight: bold; border: solid")
		if ((await this.status()) == false) {
			return { success: false, response: null }
		}
		const version = await this.getVersion()
		if (version.response.major < 2 && version.response.minor < 1) {
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
		this.log("%c function call: disconnect ", "color: magenta; font-weight: bold; border: solid")
		// check that we're not already disconnecting
		if (this.isDisconnecting == true || this.isConnected == false) {
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
		this.isCastPending = false
		this.isConnected = false

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
		if (this.isConnected == false) return { success: false, response: null }
		this.log("%c function call: showWindow ", "color: magenta; font-weight: bold; border: solid")
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
	public async getVersion(): Promise<{ success: boolean; response: BridgeVersion }> {
		this.log("%c function call: getVersion ", "color: magenta; font-weight: bold; border: solid")

		let message = await sendMessage({ endpoint: "bridge_version", requestBody: {} })
		if (message.success == true) {
			let response = parseBridgeVersion(message.response.payload.value)
			this.version = response
			return { success: true, response: this.version }
		}
		// if the bridge version fails, try the legacy version
		else {
			let version = await BridgeClient.fallback?.getLegacyVersion()
			if (version == undefined) return { success: false, response: parseBridgeVersion("0") }
			return { success: true, response: parseBridgeVersion(version) }
		}
	}

	/**
	 * A helper function to get the version of the Looking Glass Bridge API
	 * @returns the current version of the Looking Glass API
	 */
	public async apiVersion(): Promise<{ success: boolean; response: BridgeVersion }> {
		this.log("%c function call: apiVersion ", "color: magenta; font-weight: bold; border: solid")
		if (this.isConnected == false) {
			return { success: false, response: parseBridgeVersion("0") }
		}
		if ((await this.isVersionCompatible()) == false)
			return { success: false, response: parseBridgeVersion("0") }
		let response = await sendMessage({ endpoint: "api_version", requestBody: {} })
		if (response.success == false) {
			console.warn(`this call is only supported in bridge 2.2 or newer, please upgrade Looking Glass Bridge.`)
			return { success: false, response: parseBridgeVersion("0") }
		}

		let APIVersion = parseBridgeVersion(response.response.payload.value)
		return { success: true, response: APIVersion }
	}

	/**
	 * getDisplays finds all displays that are connected to the computer,
	 * searches for Looking Glass displays, and returns them as an array of Display objects
	 * @returns the display object
	 */
	public async getDisplays(): Promise<{ success: boolean; response: Display[] | null }> {
		this.log("%c function call: displays ", "color: magenta; font-weight: bold; border: solid")
		this.displays = []
		// if there is no orchestration, attempt to create one, if that fails, return false
		if (this.isConnected == false) return { success: false, response: null }
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
			if (display.value.hardwareVersion.value !== ("thirdparty")) {
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
		this.log("%c function call: deletePlaylist ", "color: magenta; font-weight: bold; border: solid")
		if (this.isConnected == false) {
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
		if (this.isConnected == false) return { success: false }
		this.log("%c function call: cast ", "color: magenta; font-weight: bold; border: solid")

		if (this.isCastPending == true) {
			this.warn("already casting please wait")

			return { success: false }
		}

		if (this.displays.length == 0) {
			this.warn("no displays found")
			return { success: false }
		}

		this.isCastPending = true

		// try to find an existing cast playlist
		let randomName = "Cast_" + Math.random().toString(36).substring(7)
		let playlist = undefined

		// if our cast playlist doesn't exist, create one
		if (playlist == undefined) {
			playlist = new Playlist({
				name: randomName,
				loop: true,
				items: [],
				orchestration: this.orchestration,
			})
			this.playlists?.push(playlist)
		}

		// add the hologram to the playlist, and seek to it
		let currentCastItem = playlist.addItem(hologram)
		if (currentCastItem !== undefined) {
			await playlist.play()
			// delete old playlists
			this.playlists?.forEach((playlist) => {
				if (playlist.name != randomName) {
					this.deletePlaylist(playlist)
					this.playlists?.splice(this.playlists.indexOf(playlist), 1)
				}
			})
			//update the current playlist index value.
			this.currentPlaylistIndex = this.playlists?.indexOf(playlist) ?? 0
			//update the current playlistItem Index value.
			this.currentPlaylistItemIndex = currentCastItem.index
		} else {
			return { success: false }
		}

		this.currentHologram = hologram
		this.isCastPending = false
		return { success: true }
	}

	getCurrentPlaylist() {
		return this.playlists?.[this.currentPlaylistIndex]
	}

	public async playRemotePlaylist(holograms: HologramType[], index: number = 0) {
		if (!this.isConnected && !(await this.connect()).success) {
			return { success: false }
		}

		console.log("%c function call: playRemotePlaylist ", "color: magenta; font-weight: bold; border: solid")

		if (this.isCastPending == true) {
			return { success: false }
		}

		this.isCastPending = true

		// try to find an existing cast playlist
		let randomName = "Cast_" + Math.random().toString(36).substring(7)

		const playlist = new Playlist({
			name: randomName,
			loop: true,
			items: holograms,
			orchestration: this.orchestration,
		})
		this.playlists?.push(playlist)

		// delete old playlists
		this.playlists?.forEach((playlist) => {
			if (playlist.name != randomName) {
				this.deletePlaylist(playlist)
				this.playlists?.splice(this.playlists.indexOf(playlist), 1)
			}
		})
		//update the current playlist index value.
		this.currentPlaylistIndex = this.playlists?.indexOf(playlist) ?? 0
		//update the current playlistItem Index value.
		this.currentPlaylistItemIndex = index

		this.currentHologram = holograms[index]
		this.isCastPending = false

		await playlist.play()

		return { success: true }
	}

	/**Play a Playlist created by Looking Glass Studio, requires the full path to the playlist.json file. */
	public async playStudioPlaylist(
		playlistPath: string
	): Promise<{ success: boolean; response: z.infer<typeof schema.play_playlist> | null }> {
		this.log("%c function call: subscribeToEvents ", "color: magenta; font-weight: bold; border: solid")
		if (this.isConnected == false) return { success: false, response: null }

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
		this.log("%c function call: stopStudioPlaylist ", "color: magenta; font-weight: bold; border: solid")
		if (this.isConnected == false) return { success: false }

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
		this.log("%c function call: getAutoStartPlaylist ", "color: magenta; font-weight: bold; border: solid")
		if (this.isConnected == false) return { success: false, response: null }

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
		this.log("%c function call: setAutoStartPlaylist ", "color: magenta; font-weight: bold; border: solid")
		if (this.isConnected == false) return { success: false, response: null }

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
		this.log("%c function call: createAutoStartPlaylist ", "color: magenta; font-weight: bold; border: solid")
		if (this.isConnected == false) return { success: false, response: null }

		// check that all holograms are local
		for (let i = 0; i < args.playlist.items.length; i++) {
			let item = args.playlist.items[i]
			if (item.hologram.uri.includes("http")) {
				this.warn("playlist contains a web uri, cannot create autostart playlist")
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

		this.playState = "PLAYING"

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

		this.playState = "PAUSED"

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

		const playlist = this.getCurrentPlaylist()
		const loop = playlist?.loop
		const length = playlist?.items.length
		const index = this.currentPlaylistItemIndex

		if (index + 1 === length) {
			if (loop) {
				this.currentPlaylistItemIndex = 0
			}
			//TODO: Handle case where we've reached end of playlist
		} else {
			this.currentPlaylistItemIndex++
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

		const playlist = this.getCurrentPlaylist()
		const loop = playlist?.loop
		const length = playlist?.items.length
		const index = this.currentPlaylistIndex

		if (index === 0) {
			if (loop && length) {
				this.currentPlaylistItemIndex = length
			} else {
				//TODO: Repeat first track
			}
		} else {
			this.currentPlaylistItemIndex--
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
		this.log("%c function call: subscribeToEvents ", "color: magenta; font-weight: bold; border: solid")

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

	/**Update the parameters of the current hologram */
	public async updateCurrentHologram<T extends keyof HologramParamMap>({
		name,
		parameter,
		value,
	}: {
		name: string
		parameter: T
		value: HologramParamMap[T]
	}): Promise<{ success: boolean; response: z.infer<typeof schema.update_current_entry> | null }> {
		let requestBody = {
			orchestration: this.orchestration,
			name: name,
			[parameter]: `${value}`,
		}

		let message = await sendMessage({ endpoint: "update_current_entry", requestBody: requestBody })

		if (message.success == false) {
			return { success: false, response: null }
		}

		return { success: true, response: message.response }
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

	/**Asbtraction for logging with verbosity setting */
	public log(...messages: unknown[]) {
		if (BridgeClient.verbosity >= 2) {
			console.log.apply(console, messages)
		}
	}
	public time(label: string) {
		if (BridgeClient.verbosity >= 2) {
			console.time(label)
		}
	}

	public timeEnd(label: string) {
		if (BridgeClient.verbosity >= 2) {
			console.timeEnd(label)
		}
	}
	/**Asbtraction for logging with verbosity setting */
	public warn(...messages: unknown[]) {
		if (BridgeClient.verbosity >= 1) {
			console.warn.apply(messages)
		}
	}
	/**Asbtraction for logging with verbosity setting */
	public error(...messages: unknown[]) {
		if (BridgeClient.verbosity >= 0) {
			console.error.apply(messages)
		}
	}

	/**
	 * helper function for determining if the version of Bridge is valid.
	 * @returns boolean, true if the version is compatible, false if not
	 */
	private async isVersionCompatible() {
		if (this.version.major == 0) {
			this.isConnected = false
		} else if (this.version.major < 2 && this.version.minor < 1) {
			this.warn("Please update to the latest version for the best experience")
			this.isConnected = false
		} else if (this.version.major >= 2 && this.version.minor >= 2) {
			this.isConnected = true
		}

		return this.isConnected
	}
}
