import { BridgeClient } from ".."
import { sendMessage } from "./endpoints"
import { z } from "zod"
import * as BridgeResponse from "../schemas/schema.responses"

export interface OrchestrationArgs {
	name: string
	orchestration: string
}

/**
 * this function will attempt to enter an orchestration
 * @param name
 * @returns
 */
export async function tryEnterOrchestration({ name, orchestration }: OrchestrationArgs): Promise<{
	success: boolean
	response: z.infer<typeof BridgeResponse.orchestration> | null
}> {
	let Bridge = BridgeClient.getInstance()

	Bridge.log("%c function call: tryEnterOrchestration ", "color: magenta; font-weight: bold; border: solid")
	if (name == undefined || name == "") {
		name = "default"
	}

	// if we're already in an orchestration, exit it
	if (orchestration !== "" && orchestration !== undefined) {
		return { success: false, response: null }
	}
	// a new orchestration will be created if the name is different.
	let requestBody = {
		name: name,
	}
	let message = await sendMessage({
		endpoint: "enter_orchestration",
		requestBody: requestBody,
	})
	if (message.success == false) {
		console.error("failed to enter orchestration", message)
		return { success: false, response: null }
	}
	console.groupEnd()
	return { success: true, response: message.response }
}

export async function tryExitOrchestration(
	orchestration: string
): Promise<{ success: boolean; response: z.infer<typeof BridgeResponse.orchestration> | null }> {
	let body = {
		orchestration: orchestration,
	}

	let timeout = new Promise<{
		success: boolean
		response: z.infer<typeof BridgeResponse.orchestration> | null
	}>((reject) => {
		let id = setTimeout(() => {
			clearTimeout(id)
			reject({ success: false, response: null })
		}, 5000)
	})

	let message = await Promise.race([
		sendMessage({
			endpoint: "exit_orchestration",
			requestBody: body,
		}),
		timeout,
	])

	if (!message || message.success == false) {
		return { success: false, response: null }
	}

	return { success: true, response: message.response }
}
