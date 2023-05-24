export async function TryEnterOrchestration(name: string) {
	try {
		let putRequest = {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: "default",
			}),
		}

		let response = await fetch("http://localhost:33334/enter_orchestration", putRequest)

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}

		let data = await response.json()

		let orchestration = data.payload.value

		return orchestration
	} catch (error) {
		console.error(error)
		// You could throw the error again here if you want to inform caller about it
		// throw error;
	}
}

export async function TryExitOrchestration(orchestration: string) {
	const request = {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: "",
	}

	request.body = JSON.stringify({
		orchestration: orchestration,
	})

	let response = await fetch("http://localhost:33334/exit_orchestration", request)
	let data = await response.json()

	return data
}
