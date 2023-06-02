//@ts-ignore
import { Client as HoloPlayClient, InfoMessage } from "holoplay-core"

/**
 * provide a fallback in case we're unable to connect to bridge.
 * This class uses HoloPlay Core to see if the older API endpoint used in HoloPlay Service is available.
 */
export class Fallback {
	private holoPlayClient: HoloPlayClient

	constructor() {
		this.holoPlayClient = new HoloPlayClient(this.messageCallback.bind(this), this.errorCallback.bind(this))
	}

	public async messageCallback() {
		let version = 0
		let infoMsg = new InfoMessage()
		try {
			await this.holoPlayClient.sendMessage(infoMsg).then((res: any) => {
				version = parseFloat(res.version)
			})
			return version
		} catch (error) {
			console.error("unable to get version", error)
			return 0
		}
	}

	public errorCallback() {
		console.error("unable to connect to Legacy API")
	}
}
