//@ts-ignore
import { Client as HoloPlayClient, InfoMessage } from "holoplay-core"

/**
 * provide a fallback in case we're unable to connect to bridge.
 * This class uses HoloPlay Core to see if the older API endpoint used in HoloPlay Service is available.
 */
export class Fallback {
	private holoPlayClient: HoloPlayClient
	public ws: WebSocket
	public versionPromise: Promise<number>
	private resolveVersion!: (value: number | PromiseLike<number>) => void

	constructor() {
		this.versionPromise = new Promise((resolve) => {
			this.resolveVersion = resolve
		})
		this.holoPlayClient = new HoloPlayClient(this.messageCallback.bind(this), this.errorCallback.bind(this))
		this.ws = this.holoPlayClient.ws
	}

	public async messageCallback(message: any) {
		this.resolveVersion(parseFloat(message.version))
	}

	public async getLegacyVersion(): Promise<number> {
		let infoMsg = new InfoMessage()
		this.holoPlayClient.sendMessage(infoMsg)

		return this.versionPromise
	}

	public errorCallback() {
		console.warn("unable to connect to Legacy API")
	}
}
