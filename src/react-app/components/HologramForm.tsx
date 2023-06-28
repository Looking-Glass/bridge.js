import { BridgeClient, hologramFactory, QuiltHologram, RGBDHologram, hologramTypes } from "@library/index"
import { useState } from "react"

export interface HologramFactoryArgs {
	connected: boolean
	hologram: QuiltHologram | RGBDHologram
	setHologram: (hologram: QuiltHologram | RGBDHologram) => void
	setResponse: (response: string | null) => void
	hologramType: hologramTypes
	setHologramType: (hologramType: hologramTypes) => void
	setPlaylist: (playlist: string) => void
}
export default function HologramForm({
	connected,
	hologram,
	setHologram,
	setResponse,
	hologramType,
	setHologramType,
	setPlaylist,
}: HologramFactoryArgs) {
	const [hologramUri, setHologramUri] = useState<string>(hologram.uri)
	const [hologramSettings, setHologramSettings] = useState(hologram.settings)
	const Bridge = BridgeClient.getInstance()
	return (
		<>
			<h3>Create a Hologram</h3>
			<form>
				<label>
					Hologram Type:
					<select
						name="hologramType"
						id="hologramType"
						onChange={(e) => {
							setHologramType(e.target.value as hologramTypes)
						}}>
						<option value="quilt">Quilt</option>
						<option value="rgbd">RGBD</option>
					</select>
				</label>
				<div>
					<label>
						uri:
						<input
							type="text"
							onChange={(e) => {
								// remove "" from the uri, quotes are auto-added by windows' copy as path option.
								let cleaned = e.target.value.replace(/"/g, "")
								setHologramUri(cleaned)
							}}></input>
					</label>
				</div>
				{hologramType == "rgbd" && (
					<div>
						<h4>RGBD Settings</h4>
						<label>
							Depthiness:
							<input
								type="number"
								onChange={(e) => {
									setHologramSettings({ ...hologramSettings, depthiness: parseFloat(e.target.value) })
								}}></input>
						</label>
						<label>
							Depth Location:
							<select
								onChange={(e) => {
									setHologramSettings({
										...hologramSettings,
										depth_loc: parseInt(e.target.value) as 0 | 1 | 2 | 3,
									})
								}}>
								<option value="0">Top</option>
								<option value="1">Bottom</option>
								<option value="2">Right</option>
								<option value="3">Left</option>
							</select>
						</label>
						<label>
							Zoom:
							<input
								type="number"
								onChange={(e) => {
									setHologramSettings({ ...hologramSettings, zoom: parseFloat(e.target.value) })
								}}></input>
						</label>
					</div>
				)}
				{hologramType == "quilt" && (
					<div>
						<h4>Quilt Settings</h4>
						<div>
							<label>
								Columns:
								<input
									type="number"
									onChange={(e) => {
										setHologramSettings({ ...hologramSettings, columns: parseInt(e.target.value) })
									}}></input>
							</label>
						</div>
						<div>
							<label>
								Rows:
								<input
									type="number"
									onChange={(e) => {
										setHologramSettings({ ...hologramSettings, rows: parseInt(e.target.value) })
									}}></input>
							</label>
						</div>
						<div>
							<label>
								ViewCount:
								<input
									type="number"
									onChange={(e) => {
										setHologramSettings({ ...hologramSettings, viewCount: parseInt(e.target.value) })
									}}></input>
							</label>
						</div>
					</div>
				)}
				<label>
					Aspect Ratio:
					<input
						type="number"
						onChange={(e) => {
							setHologramSettings({ ...hologramSettings, aspect: parseFloat(e.target.value) })
						}}></input>
				</label>
			</form>

			<button
				onClick={async () => {
					setResponse("Casting Hologram")
					let hologram = hologramFactory({
						uri: hologramUri,
						type: hologramType,
						settings: hologramSettings,
					})
					setHologram(hologram)
					let call = await Bridge.cast(hologram)
					setResponse(JSON.stringify(call))
					setPlaylist(JSON.stringify(Bridge.playlists))
				}}
				disabled={!connected}>
				Cast hologram
			</button>
		</>
	)
}
