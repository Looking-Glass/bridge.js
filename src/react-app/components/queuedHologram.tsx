import { BridgeClient } from "@library/index"
import { useLocalStorage, Stores } from "../store/useLocalStorage"
import { StoredHologram } from "../App"
import { useCallback } from "react"

export default function QueuedHologram({
	item,
	index,
	setHolograms,
	holograms,
	activeItemIndex,
}: {
	item: StoredHologram
	index: number
	setHolograms: (holograms: StoredHologram[]) => void
	holograms: StoredHologram[]
	activeItemIndex: number | null
}) {
	const Bridge = BridgeClient.getInstance()
	const deleteData = useLocalStorage((state) => state.deleteData)
	const updateData = useLocalStorage((state) => state.updateData)

	// Function to remove this hologram from the array
	const handleRemove = () => {
		deleteData(Stores.Playlists ,item.id)
		setHolograms(holograms.filter((m) => m.id !== item.id))
	}

	const handleUpdate = useCallback(() => {
		updateData(Stores.Playlists, item.id, {
			...item,
			settings: {
				...item.hologram.settings,
			},
		})
	}, [item])

	return (
		<div
			className="glass"
			style={{ 
				flexGrow: 1, 
				width: "100%", 
				padding: "10px", 
				paddingLeft: "0px",
				paddingRight: "0px",
				margin: "10px 0", 
				borderRadius: "18px", 
				cursor: "pointer" 
			}} 
			onClick={async () => {
				await Bridge.seek(index)
			}}>
				<div style={{ display: "flex", flexDirection: "column", gap: "10px", paddingLeft: "10px" }}>
			<h3 id={`playlist-item-${index}`} style={{ color: activeItemIndex === index ? "green" : "white" }}>
				Hologram {index + 1} ({item.hologram.type})
			</h3>
			<a style={{fontSize: "12px"}} href={item.hologram.uri}>{item.hologram.uri}</a>
			{/* <p>{JSON.stringify(item.settings)}</p> */}
			<div style={{ display: "flex", gap: "10px" }}>
				<button onClick={handleRemove}>Remove</button>
				<button onClick={handleUpdate}>Update</button>
			</div>
			</div>
		</div>
	)
}
