import { BridgeEventMap } from "../schemas/events"

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

	constructor() {
		this.eventSource = null
		this.MessageHandler = {}
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
		if (!(event in this.MessageHandler)) {
			this.MessageHandler[event] = []
		}
		this.MessageHandler[event]?.push(MessageHandler)
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
			// console.log(handlers)

			if (handlers) {
				handlers.forEach((handler: any) => handler(parsedResponse.payload))
			}
		}
	}

	public connectToBridgeEventSource(orchestration: string) {
		if (!isWebSocketAvailable()) return
		let bridgeEventSource = this
		// provided we have web socket support, we can proceed to query Bridge
		const ws = new WebSocket("ws://localhost:9724/event_source")

		ws.onopen = function () {
			const params = {
				subscribe_orchestration_events: orchestration,
			}

			ws.send(JSON.stringify(params))
		}

		ws.onmessage = function (evt) {
			bridgeEventSource.callMessageHandler(evt.data)
		}

		ws.onclose = function () {
			console.log("CLIENT: Connection is closed...")
		}

		ws.onerror = function (error) {
			console.warn("Unable to connect to WebSocket, is Bridge Running?", error)
		}
	}
}
