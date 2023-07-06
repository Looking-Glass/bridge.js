//@ts-ignore
import { Client as HoloPlayClient, InfoMessage } from "holoplay-core"

/**
 * provide a fallback in case we're unable to connect to bridge.
 * This class uses HoloPlay Core to see if the older API endpoint used in HoloPlay Service is available.
 */
export class Fallback {
	private holoPlayClient: HoloPlayClient
	public ws: WebSocket
	public versionPromise: Promise<number> | number

	constructor() {
		this.versionPromise = 0
		this.holoPlayClient = new HoloPlayClient(this.messageCallback.bind(this), this.errorCallback.bind(this))
		this.ws = this.holoPlayClient.ws

		this.holoPlayClient.ws.onerror = (event: Event) => {
			console.error("WebSocket error observed:", event)
		}
	}

	public async messageCallback(message: any) {
		this.versionPromise = parseFloat(message.version)
	}

	public async getLegacyVersion(): Promise<number> {
		console.log("trying to connect to Legacy API")
		let infoMsg = new InfoMessage()
		try {
			await this.holoPlayClient.sendMessage(infoMsg)
			return this.versionPromise
		} catch (e) {
			console.warn(e, "unable to connect to Legacy API")
			return 0
		}
	}

	public errorCallback() {
		console.warn("unable to connect to Legacy API")
	}
}
