import { BridgeClient } from "@library/index"
import { Hologram } from "./HologramForm"

export default function QueuedHologram({
	item,
	index,
	holograms,
	setHolograms,
	activeItemIndex,
}: {
	item: Hologram
	index: number
	holograms: Hologram[]
	setHolograms: (holograms: Hologram[]) => void
	activeItemIndex: number | null
}) {
	const Bridge = BridgeClient.getInstance()
	// Function to handle updating the hologram
	const handleUpdate = () => {
		// Create a copy of the holograms array
		const updatedHolograms = [...holograms]

		updatedHolograms[index] = { ...item }

		// Set the updated array
		setHolograms(updatedHolograms)
	}

	// Function to remove this hologram from the array
	const handleRemove = () => {
		const filteredHolograms = holograms.filter((_, i) => i !== index)
		setHolograms(filteredHolograms)
	}

	return (
		<div
			className="border glass"
			style={{ padding: "10px", margin: "10px 0", borderRadius: "18px", cursor: "pointer", minWidth: "100%" }} 
			onClick={async () => {
				await Bridge.seek(index)
			}}>
			<h3 id={`playlist-item-${index}`} style={{ color: activeItemIndex === index ? "green" : "white" }}>
				Queued Hologram {index + 1} ({item.type})
			</h3>
			<a href={item.uri}>{item.uri}</a>
			{/* <p>{JSON.stringify(item.settings)}</p> */}
			<div style={{ display: "flex", gap: "10px" }}>
				<button onClick={handleUpdate}>Update</button>
				<button onClick={handleRemove}>Remove</button>
			</div>
		</div>
	)
}
