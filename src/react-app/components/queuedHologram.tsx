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
		<div className="border" style={{ padding: "10px", margin: "10px 0" }}>
			<h3 id={`playlist-item-${index}`} style={{ color: activeItemIndex === index ? "green" : "white" }}>
                Queued Hologram {index + 1} ({item.type})
            </h3>
			<p>{JSON.stringify(item)}</p>
			<div style={{ display: "flex", gap: "10px" }}>
				<button onClick={handleUpdate}>Update</button>
				<button onClick={handleRemove}>Remove</button>
			</div>
		</div>
	)
}
