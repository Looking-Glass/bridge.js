import { Display, TryParseDisplay } from "./components/displays"
import { TrySendMessage } from "./components/endpoints"
import { TryEnterOrchestration, TryExitOrchestration } from "./components/orchestration"
import { ConnectToBridgeEventSource } from "./components/websocket"
import Playlist from "./playlists/playlist"

export class BridgeClient {
	private orchestration: string
	private displays: Display[]

	constructor() {
		this.orchestration = ""
		this.displays = []
		this.CreateOrchestration()
	}

	static async init() {
		new BridgeClient()
	}

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

	public async CreateOrchestration() {
		if ((await this.QueryBridge()) == false) {
			return
		}
		let new_orchestration = await TryEnterOrchestration("default")
		this.orchestration = new_orchestration
		return this.orchestration
	}

	public async QueryBridgeVersion() {
		let response = await TrySendMessage("bridge_version")
		let BridgeVersion = response.payload.value
		return BridgeVersion
	}

	public async QueryAPIVersion() {
		let response = await TrySendMessage("api_version")
		let APIVersion = response.payload.value
		return APIVersion
	}

	public async QueryDisplays() {
		this.displays = []
		const requestBody = JSON.stringify({
			orchestration: this.orchestration,
		})
		let response = await TrySendMessage("available_output_devices", requestBody)

		for (let key in response.payload.value) {
			let display = response.payload.value[`${key}`]
			if (display.value.hwid.value.includes("LKG")) {
				let lkg = TryParseDisplay(display.value)
				if (lkg != undefined) {
					this.displays.push(lkg)
				}
			}
		}

		return this.displays
	}

	public async PlayPlaylist(playlist: Playlist, head: number) {
		const requestBody = playlist.GetInstanceJson(this.orchestration)

		let response = await TrySendMessage("instance_playlist", requestBody)

		const PlaylistItems: string[] = playlist.GetPlaylistItemsAsJson(this.orchestration)
		console.log(PlaylistItems)

		for (let i = 0; i < PlaylistItems.length; i++) {
			const pRequestBody = PlaylistItems[i]
			console.log(pRequestBody)
			let pResponse = await TrySendMessage("insert_playlist_entry", pRequestBody)
		}

		const playRequestBody = playlist.GetPlayPlaylistJson(this.orchestration, head)
		let playResponse = await TrySendMessage("play_playlist", playRequestBody)

		return true
	}

	public async EventSource() {
		let event_source = await ConnectToBridgeEventSource(this.orchestration)

		return event_source
	}
}
