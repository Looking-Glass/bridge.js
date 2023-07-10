import { BridgeClient, hologramFactory, QuiltHologram, RGBDHologram, hologramTypes } from "@library/index"
import { useState } from "react"

export interface HologramFactoryArgs {
	connected: boolean
	hologram: QuiltHologram | RGBDHologram
	setHologram: (hologram: QuiltHologram | RGBDHologram) => void
	setResponse: (response: string | null) => void
	hologramType: hologramTypes
	setHologramType: (hologramType: hologramTypes) => void
	isCastPending: boolean
	setIsCastPending: (isCastPending: boolean) => void
}
export default function HologramForm({
	connected,
	hologram,
	setHologram,
	setResponse,
	hologramType,
	setHologramType,
	isCastPending,
	setIsCastPending,
}: HologramFactoryArgs) {
	const [hologramUri, setHologramUri] = useState<string>(hologram.uri)
	const [hologramSettings, setHologramSettings] = useState(hologram.settings)
	const Bridge = BridgeClient.getInstance()
	return (
		<div className="max-w-md">
			<h3>Create a Hologram</h3>
			<form>
				<label>
					Hologram Type:
					<select
						className={
							"bg-gray-50 border border-gray-300 text-gray-900 text-4xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						}
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
							className={
								"bg-gray-50 border border-gray-300 text-gray-900 text-4xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							}
							type="text"
							placeholder="https://s3.amazonaws.com/lkg-blocks/u/9aa4b54a7346471d/steampunk_qs8x13.jpg"
							onChange={(e) => {
								// remove "" from the uri, quotes are auto-added by windows' copy as path option.
								let cleaned = e.target.value.replace(/"/g, "")
								setHologramUri(cleaned)
							}}></input>
					</label>
				</div>

				{/* Settings for RGBD holograms */}
				{hologramType == "rgbd" && (
					<div>
						<h4>RGBD Settings</h4>
						<label>
							Depthiness:
							<input
								className={
									"bg-gray-50 border border-gray-300 text-gray-900 text-4xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								}
								type="number"
								onChange={(e) => {
									setHologramSettings({ ...hologramSettings, depthiness: parseFloat(e.target.value) })
								}}></input>
						</label>
						<label>
							Depth Location:
							<select
								className={
									"bg-gray-50 border border-gray-300 text-gray-900 text-4xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								}
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
								className={
									"bg-gray-50 border border-gray-300 text-gray-900 text-4xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								}
								type="number"
								onChange={(e) => {
									setHologramSettings({ ...hologramSettings, zoom: parseFloat(e.target.value) })
								}}></input>
						</label>
					</div>
				)}

				{/* Settings for Quilt holograms */}
				{hologramType == "quilt" && (
					<div>
						<h4>Quilt Settings</h4>
						<div>
							<label>
								Columns:
								<input
									className={
										"bg-gray-50 border border-gray-300 text-gray-900 text-4xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									}
									type="number"
									placeholder="8"
									onChange={(e) => {
										setHologramSettings({ ...hologramSettings, columns: parseInt(e.target.value) })
									}}></input>
							</label>
						</div>
						<div>
							<label>
								Rows:
								<input
									className={
										"bg-gray-50 border border-gray-300 text-gray-900 text-4xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									}
									type="number"
									placeholder="13"
									onChange={(e) => {
										setHologramSettings({ ...hologramSettings, rows: parseInt(e.target.value) })
									}}></input>
							</label>
						</div>
						<div>
							<label>
								ViewCount:
								<input
									className={
										"bg-gray-50 border border-gray-300 text-gray-900 text-4xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									}
									type="number"
									placeholder={`${8 * 13}`}
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
						className={
							"bg-gray-50 border border-gray-300 text-gray-900 text-4xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						}
						type="number"
						placeholder="0.75"
						onChange={(e) => {
							setHologramSettings({ ...hologramSettings, aspect: parseFloat(e.target.value) })
						}}></input>
				</label>
			</form>

			<button
				className={"primaryButton text-sm"}
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
					setIsCastPending(Bridge.isCastPending)
				}}
				disabled={!connected || isCastPending}>
				Cast hologram
			</button>
		</div>
	)
}
