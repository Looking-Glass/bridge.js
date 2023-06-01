//@ts-ignore
import { Client as HoloPlayClient, InfoMessage } from "holoplay-core"

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
			console.error("unable to get version")
			return 0
		}
	}

	public errorCallback() {
		console.error("Looking Glass Bridge isn't running. Note that this will not work on MacOS using Safari.")
	}
}
