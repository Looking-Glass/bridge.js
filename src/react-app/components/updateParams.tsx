import { BridgeClient, parameterNames } from "@library/index"
import { useState } from "react"
import { z } from "zod"

export function UpdateParams({
	playlistName,
	parameter,
	min,
	max,
	numberType,
}: {
	playlistName: string
	parameter: z.infer<typeof parameterNames>
	min: number
	max: number
	numberType: "float" | "int"
}) {
	const Bridge = BridgeClient.getInstance()
	const [value, setValue] = useState(0)

	const stepSize = numberType == "float" ? 0.001 : 1

	return (
		<>
			<div>{parameter}</div>
			<div style={{width: "30px"}}>Value: {value.toFixed(2)}</div>
			<input
				type="range"
				defaultValue={1}
				min={min}
				max={max}
				step={stepSize}
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
