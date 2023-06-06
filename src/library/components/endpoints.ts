import { Bridge } from ".."
import * as schemas from "../schemas"
import { z } from "zod"

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
	| "show_window"

type BridgeEndpointSchemaMap = {
	// instance_studio_playlist: z.infer<typeof schemas.instance_studio_playlist>
	bridge_version: z.infer<typeof schemas.version>
	api_version: z.infer<typeof schemas.version>
	// set_named_autostart_playlist: z.infer<typeof schemas.set_named_autostart_playlist>
	// set_autostart_playlist: z.infer<typeof schemas.set_autostart_playlist>
	available_output_devices: z.infer<typeof schemas.available_output_devices>
	enter_orchestration: z.infer<typeof schemas.orchestration>
	exit_orchestration: z.infer<typeof schemas.orchestration>
	instance_playlist: z.infer<typeof schemas.instance_playlist>
	delete_playlist: z.infer<typeof schemas.delete_playlist>
	insert_playlist_entry: z.infer<typeof schemas.insert_playlist_entry>
	// update_playlist_entry: z.infer<typeof schemas.update_playlist_entry>
	// update_current_entry: z.infer<typeof schemas.update_current_entry>
	// sync_overwrite_playlist: z.infer<typeof schemas.sync_overwrite_playlist>
	// cancel_pending: z.infer<typeof schemas.cancel_pending>
	// synced_file_hash: z.infer<typeof schemas.synced_file_hash>
	// transport_control_play: z.infer<typeof schemas.transport_control_play>
	// transport_control_pause: z.infer<typeof schemas.transport_control_pause>
	// transport_control_next: z.infer<typeof schemas.transport_control_next>
	// transport_control_previous: z.infer<typeof schemas.transport_control_previous>
	// transport_control_seek_to_index: z.infer<typeof schemas.transport_control_seek_to_index>
	play_playlist: z.infer<typeof schemas.play_playlist>
	show_window: z.infer<typeof schemas.show_window>
}

type SuccessResponse<T> = { success: true; response: T }
type ErrorResponse = { success: false; response: null }

type Response<T> = SuccessResponse<T> | ErrorResponse

/**
 *
 * @param endpoint the bridge endpoint to send the message to, defined in BridgeEndpointType
 * @param requestBody Optional, the Json body to send to Bridge, defaults to empty Json
 * The requestbody is a json object that has been stringified. For example:
 * const requestBody = JSON.stringify({
 * 	orchestration: this.orchestration,
 * })
 * @param baseUrl Optional, the localhost url that bridge uses, defaults to http://localhost:33334/
 * @returns the response from the bridge endpoint, as a json object
 */

export async function sendMessage<T extends keyof BridgeEndpointSchemaMap>(params: {
	endpoint: T
	requestBody?: string
	baseUrl?: string
}): Promise<Response<BridgeEndpointSchemaMap[T]>> {
	let response: any
	if (Bridge.getVerbosity() != 0) console.group("Endpoint:", params.endpoint)

	if (params.baseUrl == undefined) {
		params.baseUrl = "http://localhost:33334/"
	}

	if (params.requestBody == undefined) {
		params.requestBody = JSON.stringify({})
	}

	if (Bridge.getVerbosity() == 3) {
		console.group("Message:")
		console.log(`${params.baseUrl + params.endpoint}`)
		console.log("body:", JSON.parse(params.requestBody))
		console.groupEnd()
	}

	const request = {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: params.requestBody,
	}

	try {
		response = await fetch(`${params.baseUrl + params.endpoint}`, request)

		let parsedResponse = await response.json()
		if (Bridge.getVerbosity() != 0) console.groupEnd()
		return { success: true, response: parsedResponse }
	} catch (error) {
		console.error("Couldn't connect to Bridge", error)
		console.groupEnd()
		return { success: false, response: null }
	}
}
export interface responseStatusArgs {
	response: any
	errorMessage?: string
	schema: any
}
