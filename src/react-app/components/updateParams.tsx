import { BridgeClient, parameterNames } from "@library/index"
import { useState, useEffect } from "react"
import { z } from "zod"
import { Hologram } from "./HologramForm"
import { StoredHologram } from "../App"

export function UpdateParams({
  playlistName,
  parameter,
  defaultValue,
  min,
  max,
  numberType,
  index,
  holograms, 
  updateHologram,
}: {
  playlistName: string
  parameter: z.infer<typeof parameterNames>
  defaultValue: number
  min: number
  max: number
  numberType: "float" | "int",
  index: number
  holograms: StoredHologram[]
  updateHologram: (index: number, hologram: Hologram) => void
}) {
  const Bridge = BridgeClient.getInstance()
  const [value, setValue] = useState(defaultValue)
  
  // Sync component state with hologram settings on mount and when hologram changes
  useEffect(() => {
    console.log(`Updating ${parameter} to ${defaultValue}`)
	//@ts-expect-error - hologram type issues
    const initialValue = holograms[index].hologram.settings[parameter] 
      
    
    setValue(initialValue)
  }, [holograms, parameter, defaultValue])

  const stepSize = numberType === "float" ? 0.001 : 1

  const handleChange = async (newValue: number) => {
    // Ensure value is within bounds
    if (newValue === undefined) {
      newValue = 0
    }
    
    try {
      // Update the current hologram in Bridge
      await Bridge.updateCurrentHologram({
        name: playlistName,
        parameter: parameter,
        value: newValue,
      })
      
      // Update local state
      setValue(newValue)
      
      // Create a shallow copy of the hologram
      const updatedHologram = { ...holograms[index].hologram };
      
      // Ensure settings object exists
      if (!updatedHologram.settings) {
        console.warn(`Settings object is missing in hologram`)
		    return
      }
      
      // Update the specific parameter in the settings
      //@ts-expect-error - hologram type issues
      console.log({settings: updatedHologram.settings, parameter, param: updatedHologram.settings[parameter]})

      //@ts-expect-error - hologram type issues
      updatedHologram.settings[parameter] = newValue;

      console.log({hologram: updatedHologram.settings})
      
      // Pass the updated hologram to parent
      updateHologram(index, updatedHologram);
    } catch (error) {
      console.error(`Failed to update ${parameter}:`, error)
    }
  }

  return (
    <div  style={{
      display: "flex",
      gap: "1rem",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      paddingBottom: "1rem",
      borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
    }}>

    
    <div
      style={{
        display: "flex",
        gap: "1rem",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
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
          <input
          type="range"
          style={{ flexGrow: 1 }}
          value={value}
          min={min}
          max={max}
          step={stepSize}
          onChange={(e) => handleChange(parseFloat(e.target.value))}
        />
        </div>
  )
}