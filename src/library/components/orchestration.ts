import { Bridge } from ".."
import { responseStatus, sendMessage } from "./endpoints"

export interface OrchestrationArgs {
	name?: string
	orchestration?: string
}

/**
 * this function will attempt to enter an orchestration
 * @param name
 * @returns
 */
export async function tryEnterOrchestration({ name, orchestration }: OrchestrationArgs) {
	if (Bridge.getVerbosity() != 0) console.group("tryEnterOrchestration")
	if (name == undefined) {
		name = "default"
	}

	// if we're already in an orchestration, exit it
	if (orchestration !== "" && orchestration !== undefined) {
		await tryExitOrchestration(orchestration)
	}
	// a new orchestration will be created if the name is different.
	let requestBody = JSON.stringify({
		name: name,
	})
	let response = await sendMessage({ endpoint: "enter_orchestration", requestBody: requestBody })
	if ((await responseStatus({ response: response })) == false) {
		return false
	}
	let new_orchestration = response.payload.value
	orchestration = new_orchestration
	console.groupEnd()
	return orchestration
}

export async function tryExitOrchestration(orchestration: string) {
	let body = JSON.stringify({
		orchestration: orchestration,
	})

	let response = await sendMessage({ endpoint: "exit_orchestration", requestBody: body })
	if ((await responseStatus({ response: response })) == false) {
		return false
	}

	return response
}
