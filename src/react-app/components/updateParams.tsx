import { BridgeClient, parameterNames } from "@library/index"
import { useState, useEffect } from "react"
import { z } from "zod"
import { Hologram } from "./HologramForm"

export function UpdateParams({
  playlistName,
  parameter,
  defaultValue,
  min,
  max,
  numberType,
  hologram,
  setHologram,
}: {
  playlistName: string
  parameter: z.infer<typeof parameterNames>
  defaultValue: number
  min: number
  max: number
  numberType: "float" | "int"
  hologram: Hologram
  setHologram: (hologram: Hologram) => void
}) {
  const Bridge = BridgeClient.getInstance()
  const [value, setValue] = useState(defaultValue)
  
  // Sync component state with hologram settings on mount and when hologram changes
  useEffect(() => {
    console.log(`Updating ${parameter} to ${defaultValue}`)
	//@ts-expect-error - hologram type issues
    const initialValue = hologram.settings[parameter] 
      
    
    setValue(initialValue)
  }, [hologram, parameter, defaultValue])

  const stepSize = numberType === "float" ? 0.01 : 1

  const handleChange = async (newValue: number) => {
    // Ensure value is within bounds
    const boundedValue = Math.min(Math.max(newValue, min), max)

    if (!boundedValue) {
      console.warn(`Invalid value for ${parameter}: ${boundedValue}`)
      return
    }
    
    // Round to reasonable precision for float values
    const processedValue = numberType === "float" 
      ? parseFloat(boundedValue.toFixed(3)) 
      : Math.round(boundedValue)
    
    try {
      // Update the current hologram in Bridge
      await Bridge.updateCurrentHologram({
        name: playlistName,
        parameter: parameter,
        value: processedValue,
      })
      
      // Update local state
      setValue(processedValue)
      
      // Create a shallow copy of the hologram
      const updatedHologram = { ...hologram };
      
      // Ensure settings object exists
      if (!updatedHologram.settings) {
        console.warn(`Settings object is missing in hologram`)
		return
      }
      
      // Update the specific parameter in the settings
	  //@ts-expect-error - hard to find parameter type
      updatedHologram.settings[parameter] = processedValue;
      
      // Pass the updated hologram to parent
      setHologram(updatedHologram);
    } catch (error) {
      console.error(`Failed to update ${parameter}:`, error)
    }
  }

  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        paddingBottom: "1rem",
        borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
      }}>
      <div style={{ minWidth: "100px", fontWeight: "bold" }}>{parameter}</div>
      <input
        style={{ width: "60px" }}
        type="number"
        value={value}
        min={min}
        max={max}
        step={stepSize}
        onChange={(e) => handleChange(parseFloat(e.target.value))}
      />
      <div style={{ minWidth: "80px" }}>
        Value: {value}
      </div>
      <input
        type="range"
        style={{ flexGrow: 1 }}
        value={value}
        min={min}
        max={max}
        step={stepSize}
        onChange={(e) => handleChange(parseFloat(e.target.value))}
      />
      <button
        style={{ 
          padding: "0.5rem 1rem",
          marginLeft: "0.5rem",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          borderRadius: "4px"
        }}
        onClick={() => handleChange(defaultValue)}>
        Reset
      </button>
    </div>
  )
}