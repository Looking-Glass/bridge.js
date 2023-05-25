export type BridgeEndpointType =
	| "instance_studio_playlist"
	| "bridge_version"
	| "api_version"
	| "set_named_autostart_playlist"
	| "set_autostart_playlist"
	| "available_output_devices"
	| "enter_orchestration"
	| "exit_orchestration"
	| "instance_playlist"
	| "delete_playlist"
	| "insert_playlist_entry"
	| "update_playlist_entry"
	| "update_current_entry"
	| "sync_overwrite_playlist"
	| "cancel_pending"
	| "synced_file_hash"
	| "transport_control_play"
	| "transport_control_pause"
	| "transport_control_next"
	| "transport_control_previous"
	| "transport_control_seek_to_index"
	| "play_playlist"

/**
 *
 * @param endpoint the bridge endpoint to send the message to, defined in BridgeEndpointType
 * @param requestBody Optional, the Json body to send to Bridge, defaults to empty Json
 * The requestbody is a json object that has been stringified. For example:
 * const requestBody = JSON.stringify({
 * 	orchestration: this.orchestration,
 * })
 * @param baseURL Optional, the localhost url that bridge uses, defaults to http://localhost:33334/
 * @returns the response from the bridge endpoint, as a json object
 */

interface sendMessageArgs {
	endpoint: BridgeEndpointType
	requestBody?: string
	baseURL?: string
	errorMessage?: string
}

export async function sendMessage({ endpoint, requestBody, baseURL, errorMessage }: sendMessageArgs) {
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

	try {
		let data = await response.json()
		return data
	} catch (error) {
		// if we have a custom error message, return that, otherwise return the full error
		if (errorMessage !== undefined) {
			throw new Error(errorMessage)
		} else {
			console.error(error)
		}
	}
}
