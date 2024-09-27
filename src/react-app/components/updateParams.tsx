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
	defaultValue: number
	min: number
	max: number
	numberType: "float" | "int"
}) {
	const Bridge = BridgeClient.getInstance()
	const [value, setValue] = useState(defaultValue)

	const stepSize = numberType == "float" ? 0.001 : 1

	const handleChange = async (newValue: number) => {
		await Bridge.updateCurrentHologram({
			name: playlistName,
			parameter: parameter,
			value: newValue,
		})
		setValue(newValue)
	}

	return (
		<>
			<div>{parameter}</div>
			<div style={{ width: "30px", display: "flex", gap: "1rem" }}>
				Value: {value.toFixed(2)}{" "}
				<button
					style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
					onClick={() => {
						setValue(defaultValue)
					}}>
					reset
				</button>
			</div>

			<input
				type="range"
				value={value}
				min={min}
				max={max}
				step={stepSize}
				onChange={(e) => handleChange(parseFloat(e.target.value))}></input>
			<input
				type="number"
				value={value}
				min={min}
				max={max}
				step={stepSize}
				onChange={(e) => handleChange(parseFloat(e.target.value))}></input>
		</>
	)
}
