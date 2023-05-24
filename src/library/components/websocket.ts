import { BridgeEventDecoder } from "./events"

function isWebSocketAvailable() {
	if ("WebSocket" in window) {
		return true
	} else {
		console.error("WebSocket NOT supported by your Browser!")
		return false
	}
}

export async function ConnectToBridgeEventSource(orchestration: string) {
	if (!isWebSocketAvailable()) return
	// provided we have web socket support, we can proceed to query Bridge
	return new Promise((resolve, reject) => {
		const ws = new WebSocket("ws://localhost:9724/event_source")

		ws.onopen = function () {
			const params = {
				subscribe_orchestration_events: orchestration,
			}

			ws.send(JSON.stringify(params))
		}

		ws.onmessage = function (evt) {
			resolve(JSON.parse(evt.data))
			BridgeEventDecoder(JSON.parse(evt.data))
		}

		ws.onclose = function () {
			console.log("CLIENT: Connection is closed...")
		}

		ws.onerror = function (error) {
			reject(new Error("WebSocket Error: " + error))
			console.warn("Unable to connect to WebSocket, is Bridge Running?")
		}
	})
}
