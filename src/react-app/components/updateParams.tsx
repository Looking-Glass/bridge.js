import { BridgeClient, parameterNames } from "@library/index"
import { useState } from "react"
import { z } from "zod"

export function UpdateParams({
	playlistName,
	parameter,
}: {
	playlistName: string
	parameter: z.infer<typeof parameterNames>
}) {
	const Bridge = BridgeClient.getInstance()
	const [value, setValue] = useState(0)

	return (
		<>
			<div>Parameter: {parameter}</div>
			<div>Value: {value}</div>
			<input
				type="range"
				defaultValue={1}
				min={0}
				max={8}
				step={0.01}
				onChange={async (e) => {
					await Bridge.updateCurrentHologram({
						name: playlistName,
						parameter: parameter,
						value: parseFloat(e.target.value),
					})
					setValue(parseFloat(e.target.value))
				}}></input>
		</>
	)
}
