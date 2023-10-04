import { BridgeClient } from ".."
import * as BridgeResponse from "../schemas/schema.responses"
import * as BridgeRequest from "../schemas/schema.requests"
import { z } from "zod"

export type BridgeEndpointType =
	| "instance_studio_playlist"
	| "bridge_version"
	| "api_version"
	| "set_named_autostart_playlist"
	| "get_autostart_playlist"
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
	| "show_window"

export type BridgeEndpointSchemaMap = {
	instance_studio_playlist: z.infer<typeof BridgeResponse.instance_studio_playlist>
	bridge_version: z.infer<typeof BridgeResponse.version>
	api_version: z.infer<typeof BridgeResponse.version>
	get_autostart_playlist: z.infer<typeof BridgeResponse.get_autostart_playlist>
	set_named_autostart_playlist: z.infer<typeof BridgeResponse.set_named_autostart_playlist>
	set_autostart_playlist: z.infer<typeof BridgeResponse.set_autostart_playlist>
	available_output_devices: z.infer<typeof BridgeResponse.available_output_devices>
	enter_orchestration: z.infer<typeof BridgeResponse.orchestration>
	exit_orchestration: z.infer<typeof BridgeResponse.orchestration>
	instance_playlist: z.infer<typeof BridgeResponse.instance_playlist>
	delete_playlist: z.infer<typeof BridgeResponse.delete_playlist>
	insert_playlist_entry: z.infer<typeof BridgeResponse.insert_playlist_entry>
	update_playlist_entry: z.infer<typeof BridgeResponse.update_playlist_entry>
	update_current_entry: z.infer<typeof BridgeResponse.update_current_entry>
	// sync_overwrite_playlist: z.infer<typeof BridgeResponse.sync_overwrite_playlist>
	// cancel_pending: z.infer<typeof BridgeResponse.cancel_pending>
	// synced_file_hash: z.infer<typeof BridgeResponse.synced_file_hash>
	transport_control_play: z.infer<typeof BridgeResponse.transport_control_play>
	transport_control_pause: z.infer<typeof BridgeResponse.transport_control_pause>
	transport_control_next: z.infer<typeof BridgeResponse.transport_control_next>
	transport_control_previous: z.infer<typeof BridgeResponse.transport_control_previous>
	transport_control_seek_to_index: z.infer<typeof BridgeResponse.transport_control_seek_to_index>
	play_playlist: z.infer<typeof BridgeResponse.play_playlist>
	show_window: z.infer<typeof BridgeResponse.show_window>
}

export type BridgeRequestBodyMap = {
	instance_studio_playlist: z.infer<typeof BridgeRequest.instance_studio_playlist>
	bridge_version: z.infer<typeof BridgeRequest.version>
	api_version: z.infer<typeof BridgeRequest.version>
	get_autostart_playlist: z.infer<typeof BridgeRequest.get_autostart_playlist>
	set_named_autostart_playlist: z.infer<typeof BridgeRequest.set_named_autostart_playlist>
	set_autostart_playlist: z.infer<typeof BridgeRequest.set_autostart_playlist>
	available_output_devices: z.infer<typeof BridgeRequest.available_output_devices>
	enter_orchestration: z.infer<typeof BridgeRequest.orchestration>
	exit_orchestration: z.infer<typeof BridgeRequest.orchestration>
	instance_playlist: z.infer<typeof BridgeRequest.instance_playlist>
	delete_playlist: z.infer<typeof BridgeRequest.delete_playlist>
	insert_playlist_entry: z.infer<typeof BridgeRequest.insert_playlist_entry>
	update_playlist_entry: BridgeRequest.update_playlist_entry
	update_current_entry: BridgeRequest.update_current_entry
	// sync_overwrite_playlist: z.infer<typeof BridgeRequest.sync_overwrite_playlist>
	// cancel_pending: z.infer<typeof BridgeRequest.cancel_pending>
	// synced_file_hash: z.infer<typeof BridgeRequest.synced_file_hash>
	transport_control_play: z.infer<typeof BridgeRequest.transport_control_play>
	transport_control_pause: z.infer<typeof BridgeRequest.transport_control_pause>
	transport_control_next: z.infer<typeof BridgeRequest.transport_control_next>
	transport_control_previous: z.infer<typeof BridgeRequest.transport_control_previous>
	transport_control_seek_to_index: z.infer<typeof BridgeRequest.transport_control_seek_to_index>
	play_playlist: z.infer<typeof BridgeRequest.play_playlist>
	show_window: z.infer<typeof BridgeRequest.show_window>
}

export type SuccessResponse<T> = { success: true; response: T }
export type ErrorResponse = { success: false; response: null }

export type Response<T> = SuccessResponse<T> | ErrorResponse

/**
 *
 * @param endpoint the bridge endpoint to send the message to, defined in BridgeEndpointType
 * @param requestBody Optional, the Json body to send to Bridge, defaults to empty Json
 * The requestbody is a json object that has been stringified. For example:
 * const requestBody = {
 * 	orchestration: this.orchestration,
 * }
 * @param baseUrl Optional, the localhost url that bridge uses, defaults to http://localhost:33334/
 * @returns the response from the bridge endpoint, as a json object
 */

export async function sendMessage<
	T extends keyof BridgeEndpointSchemaMap & keyof BridgeRequestBodyMap
>(params: {
	endpoint: T
	requestBody: BridgeRequestBodyMap[T]
	baseUrl?: string
}): Promise<Response<BridgeEndpointSchemaMap[T]>> {
	let parsedResponse: BridgeEndpointSchemaMap[T]
	let Bridge = BridgeClient.getInstance()
	if (Bridge.getVerbosity() >= 3 && Bridge.getVerbosity() !== undefined) {
		console.group("Endpoint:", params.endpoint)
	}

	// TEMPORARY: delay to give bridge a chance to handle events
	await new Promise((resolve) => setTimeout(resolve, 10))

	if (params.baseUrl == undefined) {
		params.baseUrl = "http://localhost:33334/"
	}

	if (Bridge.getVerbosity() == 3) {
		console.group("Message:")
		Bridge.log(`${params.baseUrl + params.endpoint}`)
		Bridge.log("body:", params.requestBody)
		console.groupEnd()
	}

	const request = {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(params.requestBody),
	}

	try {
		Bridge.time(params.endpoint)
		let bridgeResponse = await fetch(`${params.baseUrl + params.endpoint}`, request)

		if (!bridgeResponse.ok) {
			return { success: false, response: null }
		}

		//if response timed out, exit
		if (bridgeResponse.status == 408) {
			Bridge.warn("%c Bridge Timeout:", "color: #ff0000", bridgeResponse)
			console.groupEnd()
		}

		parsedResponse = await bridgeResponse.json()

		if (parsedResponse.status.value !== "Completion" && parsedResponse.status.value !== "Pending") {
			console.warn("%c Bridge Failure:", "color: #ff0000", parsedResponse)

			console.groupEnd()
			// the call worked, but the response failed.
			return { success: true, response: parsedResponse }
		}

		Bridge.log("%c Response:", "color: #00aa00", parsedResponse)
		Bridge.timeEnd(params.endpoint)
		console.groupEnd()

		return { success: true, response: parsedResponse }
	} catch (error) {
		console.group("%c Bridge Error:", "color: #ff0000")
		console.error("Bridge Error", error)
		console.groupEnd()
		console.groupEnd()
		return { success: false, response: null }
	}
}
