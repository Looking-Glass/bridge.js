import { BridgeEventMap } from "../schemas/events"

function isWindowAvailable() {
	if (window !== undefined) {
		return true
	} else {
		console.error("Window is unavailable!")
		return false
	}
}
function isWebSocketAvailable() {
	if ("WebSocket" in window) {
		return true
	} else {
		console.error("WebSocket NOT supported by your Browser!")
		return false
	}
}

export type MessageHandlerType = {
	[event in keyof BridgeEventMap]?: ((payload: BridgeEventMap[event]) => void)[]
}

/**
 * Attempt to establish a connection to Looking Glass Bridge's websocket connection.
 * the websocket connection will send events from Bridge to the client.
 * @param orchestration
 * @returns
 */
export class BridgeEventSource {
	public eventSource: any
	public MessageHandler: MessageHandlerType
	public ws: WebSocket | undefined

	constructor() {
		this.eventSource = undefined
		this.MessageHandler = {}
		this.ws = undefined
	}

	/**
	 * adds a new message handler object to the BridgeEventSource class
	 * @param event the event name to listen for
	 * @param MessageHandler the function to call when the event is received
	 */
	public addMessageHandler<K extends keyof BridgeEventMap>({
		event,
		MessageHandler,
	}: {
		event: K
		MessageHandler: (payload: BridgeEventMap[K]) => void
	}) {
		// The WebSocket is connected, we can add the event handler directly
		if (!(event in this.MessageHandler)) {
			this.MessageHandler[event] = []
		}
		this.MessageHandler[event]?.push(MessageHandler)
		console.log(`%c Add Message Handler: ${event} `, "color: YellowGreen; font-weight: bold; border: solid;")
	}

	public removeMessageHandler<K extends keyof BridgeEventMap>({
		event,
		MessageHandler,
	}: {
		event: K
		MessageHandler: (payload: BridgeEventMap[K]) => void
	}) {
		console.log(`%c Message Handler Removed: ${event} `, "color: Tomato; font-weight: bold; border: solid;")
		if (event in this.MessageHandler) {
			const handlerIndex = this.MessageHandler[event]?.findIndex((handler) => handler === MessageHandler)
			if (handlerIndex !== -1 && handlerIndex !== undefined) {
				this.MessageHandler[event]?.splice(handlerIndex, 1)
			}
		}
	}

	private callMessageHandler<K extends keyof BridgeEventMap>(response: string) {
		let parsedResponse: BridgeEventMap[K]
		try {
			parsedResponse = JSON.parse(response)
		} catch (error) {
			console.error("Failed to parse JSON", error)
			return
		}

		if (parsedResponse.payload.value.event.value in this.MessageHandler) {
			// console.log(parsedResponse.payload.value.event.value)
			const handlers = this.MessageHandler[parsedResponse.payload.value.event.value]

			if (handlers) {
				handlers.forEach((handler: any) => handler(parsedResponse))
			}
		}
	}

	public connectEvent() {
		const handlers = this.MessageHandler["Bridge Connected"]

		if (handlers) {
			handlers.forEach((handler: any) => handler(undefined))
		}
	}

	public disconnectEvent() {
		const handlers = this.MessageHandler["Bridge Disconnected"]

		if (handlers) {
			handlers.forEach((handler: any) => handler(undefined))
		}
	}

	public async connectToBridgeEventSource(orchestration: string): Promise<{ success: boolean }> {
		console.log("%c Connect to Bridge Events Source ", "color: chartreuse; font-weight: bold; border: solid")
		if (!isWindowAvailable()) return { success: false }
		if (!isWebSocketAvailable()) return { success: false }
		let bridgeEventSource = this
		// provided we have web socket support, we can proceed to query Bridge
		this.ws = new WebSocket("ws://localhost:9724/event_source")

		return new Promise((resolve) => {
			let eventsource = this
			if (this.ws !== undefined) {
				this.ws.onopen = () => {
					console.log("%c Connected to Websocket ", "color: chartreuse; font-weight: bold; border: solid")
					const params = {
						subscribe_orchestration_events: orchestration,
					}

					this.ws?.send(JSON.stringify(params))
					resolve({ success: true })
				}

				this.ws.onmessage = function (evt) {
					bridgeEventSource.callMessageHandler(evt.data)
				}

				this.ws.onclose = function () {
					eventsource.disconnectEvent()
					console.log("%c Disconnected from Websocket ", "color: red; font-weight: bold; border: solid")
				}

				this.ws.onerror = function (error) {
					console.warn("Unable to connect to WebSocket, is Bridge Running?", error)
					resolve({ success: false })
				}
			}
		})
	}
}
