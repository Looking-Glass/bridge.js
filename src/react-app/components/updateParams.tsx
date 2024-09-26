import { BridgeClient, parameterNames } from "@library/index"
import { useState } from "react"
import { z } from "zod"

export function UpdateParams({
	playlistName,
	parameter,
	defaultValue,
	min,
	max,
	numberType,
}: {
	playlistName: string
	parameter: z.infer<typeof parameterNames>
	defaultValue?: number
	min: number
	max: number
	numberType: "float" | "int"
}) {
	const Bridge = BridgeClient.getInstance()
	const [value, setValue] = useState(defaultValue ? defaultValue : 0)

	const stepSize = numberType == "float" ? 0.001 : 1

	return (
		<>
			<div>{parameter}</div>
			<div>Value: {value}</div>
			<input
				type="range"
				defaultValue={defaultValue ? defaultValue : 0}
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
