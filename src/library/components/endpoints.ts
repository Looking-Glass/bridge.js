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

export async function sendMessage({ endpoint, requestBody, baseURL }: sendMessageArgs) {
	let response: any
	if (Bridge.getVerbosity() != 0) console.group("Endpoint:", endpoint)

	if (baseURL == undefined) {
		baseURL = "http://localhost:33334/"
	}

	if (requestBody == undefined) {
		requestBody = JSON.stringify({})
	}

	if (Bridge.getVerbosity() == 3) {
		console.group("Message:")
		console.log(`${baseURL + endpoint}`)
		console.log("body:", JSON.parse(requestBody))
		console.groupEnd()
	}

	const request = {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: requestBody,
	}

	try {
		response = await fetch(`${baseURL + endpoint}`, request)

		let parsedResponse = await response.json()
		if (Bridge.getVerbosity() != 0) console.groupEnd()
		return parsedResponse
	} catch (error) {
		console.error("Couldn't connect to Bridge", error)
		console.groupEnd()
		return null
	}
}
export interface responseStatusArgs {
	response: any
	errorMessage?: string
	schema: any
}
/**
 * a utility function for verifying the response from bridge.
 * @param response the response from bridge
 * @param errorMessage Optional: A custom error message to display if the response is undefined
 * @param schema the schema to verify the response against
 * @returns
 */
export async function responseStatus({ response, errorMessage, schema }: responseStatusArgs) {
	try {
		if (response == undefined) {
			throw new Error("response is undefined")
		}
		// verify that the response matches the schema
		const parsed = schema.safeParse(response)
		if (!parsed.success) {
			console.error("🚫Bridge Response does not match expected value", {
				recieved: response,
				validationErrors: parsed.error.formErrors.fieldErrors,
				// or for a formatted error message:
				errorMessage: parsed.error.message,
			})
			return false
		}
		let status: z.infer<typeof schemas.status> = response.status
		if (Bridge.getVerbosity() == 3) {
			console.group("response")
			console.log(response)
		} else if (Bridge.getVerbosity() == 2) {
			console.log(response.payload.value)
			console.log("status:", status.value)
		}
		console.groupEnd()
		if (status.value !== "Completion") {
			console.warn(`Bridge returned status: ${status.value}`)
		}

		return response
	} catch (error) {
		// if we have a custom error message, return that, otherwise return the full error
		if (errorMessage !== undefined) {
			console.error(errorMessage, error)
		} else {
			console.error(error)
		}
		return false
	}
}
