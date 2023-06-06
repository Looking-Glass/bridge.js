function isWebSocketAvailable() {
	if ("WebSocket" in window) {
		return true
	} else {
		console.error("WebSocket NOT supported by your Browser!")
		return false
	}
}

interface messageHandlerArgs {
	event: string
	MessageHandler: any
}

/**
 * Attempt to establish a connection to Looking Glass Bridge's websocket connection.
 * the websocket connection will send events from Bridge to the client.
 * @param orchestration
 * @returns
 */
export class BridgeEventSource {
	public eventSource: any
	public MessageHandler: any

	constructor() {
		this.eventSource = null
		this.MessageHandler = {}
	}

	/**
	 * adds a new message handler object to the BridgeEventSource class
	 * @param event the event name to listen for
	 * @param MessageHandler the function to call when the event is received
	 */
	public addMessageHandler({ event, MessageHandler }: messageHandlerArgs) {
		this.MessageHandler[event] = MessageHandler
	}

	/**
	 * Calls the message handler function for the given event
	 * @param response the response from Bridge
	 */
	private callMessageHandler(response: any) {
		const bridge_event: string = response.payload.value.event.value
		if (this.MessageHandler[bridge_event]) {
			this.MessageHandler[bridge_event](response.payload)
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
			bridgeEventSource.callMessageHandler(JSON.parse(evt.data))
		}

		ws.onclose = function () {
			console.log("CLIENT: Connection is closed...")
		}

		ws.onerror = function (error) {
			console.warn("Unable to connect to WebSocket, is Bridge Running?", error)
		}
	}
}
