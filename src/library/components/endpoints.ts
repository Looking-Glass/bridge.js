export type BridgeEndpointType =
	| "api_version"
	| "instance_playlist"
	| "insert_playlist_entry"
	| "delete_playlist"
	| "bridge_version"
	| "play_playlist"
	| "play_playlist_complete"
	| "play_playlist_cancelled"
	| "progress_start"
	| "progress_update"
	| "progress_complete"
	| "monitor_connect"
	| "monitor_disconnect"
	| "available_output_devices"

export async function TrySendMessage(endpoint: BridgeEndpointType, requestBody?: string, baseURL?: string) {
	if (baseURL == undefined) {
		baseURL = "http://localhost:33334/"
	}

	if (requestBody == undefined) {
		requestBody = JSON.stringify({})
	}

	const request = {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: requestBody,
	}

	let response = await fetch(`${baseURL + endpoint}`, request)

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`)
	}

	let data = await response.json()
	return data
}
