import { useEffect, useRef, useState } from "react"
import {
	BridgeClient,
	QuiltHologram,
	RGBDHologram,
	PlaylistDeleteMessageHandler,
	PlaylistInsertMessageHandler,
	PlaylistInstanceMessageHandler,
	hologramTypes,
} from "@library/index"
import HologramForm from "./components/HologramForm"

const quilt = new QuiltHologram({
	uri: "https://s3.amazonaws.com/lkg-blocks/u/9aa4b54a7346471d/steampunk_qs8x13.jpg",
	settings: { rows: 13, columns: 8, aspect: 0.75, viewCount: 8 * 13 },
})

const rgbd = new RGBDHologram({
	uri: "https://dl-dev.blocks.glass/u/b528b9def6aa4986/rgbd.png",
	settings: {
		depthiness: 2.0,
		focus: 0,
		aspect: 1,
		chroma_depth: 0,
		depth_inversion: 0,
		depth_loc: 2,
		depth_cutoff: 1,
		zoom: 1,
	},
})

function App() {
	// State for managing connection status
	const [connected, setConnected] = useState<boolean>(false)
	const [connectionStatus, setConnectionStatus] = useState<string>("🛑 Unable to Connect")
	const [displays, setDisplays] = useState<string>("checking display status...")

	//internal application state
	const [isWindowVisible, setIsWindowVisible] = useState(true)
	const [playlist, setPlaylist] = useState<string>()
	const [studioPlaylistPath, setStudioPlaylistPath] = useState<string>("")
	const [index, setIndex] = useState<number>(0)

	// Custom Hologram State
	const [hologram, setHologram] = useState<QuiltHologram | RGBDHologram>(quilt)
	const [hologramType, setHologramType] = useState<hologramTypes>("quilt")

	// State for managing events and responses from Bridge:
	const [eventStatus, setEventStatus] = useState<string>("Listen to Events")
	const eventsink = useRef<HTMLTextAreaElement>(null)
	const [bridgeResponse, setResponse] = useState<string | null>(null)

	const Bridge = BridgeClient.getInstance()

	Bridge.setVerbosity(3)

	useEffect(() => {
		if (hologramType == "quilt") {
			setHologram(quilt)
		} else if (hologramType == "rgbd") {
			setHologram(rgbd)
		}
	}, [hologram])

	useEffect(() => {
		const handleEventConnected = async () => {
			setConnected(true)
			setConnectionStatus("✅ Connected")
			// Manually call Bridge.displays to query for any connected Looking Glass,
			// We need to be connected first in order for this to work.
			await Bridge.displays().then((call) => {
				if (!call.response || call.response.length == 0) {
					setDisplays("⚠️ No Displays Detected")
				} else {
					setDisplays(JSON.stringify(call.response))
				}
			})
		}

		const handleEventDisconnected = () => {
			setConnected(false)
			setConnectionStatus("⚠️ Bridge Disconnected!")
			setEventStatus("Subscribe to Events")

			setPlaylist("")
		}

		const init = async () => {
			await Bridge.addEventListener("Bridge Connected", handleEventConnected)
			await Bridge.addEventListener("Bridge Disconnected", handleEventDisconnected)
		}

		init()

		return () => {
			const cleanup = async () => {
				await Bridge.removeEventListener("Bridge Connected", handleEventConnected)
				await Bridge.removeEventListener("Bridge Disconnected", handleEventDisconnected)
			}

			cleanup()
		}
	}, [Bridge])

	return (
		<>
			<h1>Looking Glass Bridge API Library</h1>
			<h2>Status: {`${connectionStatus}`}</h2>
			<h2>Displays: {`${displays}`}</h2>

			<div>
				<div>
					<h2>Methods</h2>
					<hr />
					<div className="flex-container">
						<button
							onClick={async () => {
								let call = await Bridge.connect()
								setResponse(JSON.stringify(call.response))
								if (call.success) {
									setConnected(true)
									setConnectionStatus("✅ Connected to Bridge")
								}
							}}
							disabled={connected}>
							Connect to Bridge
						</button>
						<button
							onClick={async () => {
								let call = await Bridge.disconnect()
								setResponse(JSON.stringify(call.success))
							}}
							disabled={!connected}>
							Disconnect From Bridge
						</button>
						<button
							onClick={async () => {
								let call = await Bridge.displays()
								setResponse(JSON.stringify(call.response))
							}}
							disabled={!connected}>
							Get connected displays
						</button>
						<button
							onClick={async () => {
								let call = await Bridge.getVersion()
								setResponse(`Looking Glass Bridge Version: ${JSON.stringify(call.response)}`)
							}}>
							Get Bridge version
						</button>
						<button
							onClick={async () => {
								let call = await Bridge.apiVersion()
								setResponse(`Looking Glass Bridge API Version: ${JSON.stringify(call.response)}`)
							}}
							disabled={!connected}>
							Get API version
						</button>
						<button
							onClick={async () => {
								setIsWindowVisible(!isWindowVisible)
								let call = await Bridge.showWindow(isWindowVisible)
								setResponse(JSON.stringify(call.response))
							}}
							disabled={!connected}>
							Toggle Window
						</button>
						<div>
							<label>
								Full Path to Playlist.json
								<input
									type="text"
									onChange={(e) => {
										// remove "" from the uri, quotes are auto-added by windows' copy as path option.
										let cleaned = e.target.value.replace(/"/g, "")
										setStudioPlaylistPath(cleaned)
									}}></input>
							</label>
						</div>
						<button
							onClick={async () => {
								let call = await Bridge.playStudioPlaylist(studioPlaylistPath)
								setResponse(JSON.stringify(call.response))
							}}
							disabled={!connected}>
							Play Studio Playlist
						</button>
						<button
							onClick={async () => {
								await Bridge.stopStudioPlaylist()
								// setResponse(JSON.stringify(call.response))
							}}
							disabled={!connected}>
							Stop Studio Playlist
						</button>
					</div>
					<h2>Controls</h2>
					<hr />
					<div className="flex-container">
						<button
							onClick={async () => {
								await Bridge.play()
								// setResponse(JSON.stringify(call.response))
							}}
							disabled={!connected}>
							PLAY
						</button>
						<button
							onClick={async () => {
								await Bridge.pause()
								// setResponse(JSON.stringify(call.response))
							}}
							disabled={!connected}>
							PAUSE
						</button>
						<button
							onClick={async () => {
								await Bridge.previous()
								// setResponse(JSON.stringify(call.response))
							}}
							disabled={!connected}>
							PREVIOUS
						</button>
						<button
							onClick={async () => {
								await Bridge.next()
								// setResponse(JSON.stringify(call.response))
							}}
							disabled={!connected}>
							NEXT
						</button>
						<div>
							<label>
								Index to seek to
								<input
									type="number"
									onChange={(e) => {
										// remove "" from the uri, quotes are auto-added by windows' copy as path option.
										setIndex(parseInt(e.target.value))
									}}></input>
							</label>
						</div>
						<button
							onClick={async () => {
								await Bridge.seek(index)
							}}
							disabled={!connected}>
							SEEK
						</button>
					</div>
					<div className="flex-container">
						<div>
							<h2>Casting</h2>
							<hr />
							<HologramForm
								connected={connected}
								hologram={hologram}
								setHologram={setHologram}
								hologramType={hologramType}
								setHologramType={setHologramType}
								setResponse={setResponse}
								setPlaylist={setPlaylist}
							/>
							<h3>Cast Predefined Holograms</h3>
							<button
								title={"Cast a prebuilt quilt hologram"}
								onClick={async () => {
									setResponse("Casting Hologram")
									let call = await Bridge.cast(quilt)
									setHologram(quilt)
									setResponse(JSON.stringify(call))
									setPlaylist(JSON.stringify(Bridge.playlists))
								}}
								disabled={!connected}>
								Cast Quilt hologram
							</button>
							<button
								onClick={async () => {
									setResponse("Casting Hologram")
									let call = await Bridge.cast(rgbd)
									setHologram(rgbd)
									setResponse(JSON.stringify(call))
									setPlaylist(JSON.stringify(Bridge.playlists))
								}}
								disabled={!connected}>
								Cast RGBD hologram
							</button>
						</div>
						{/* PLAYLIST SECTION */}
						<div>
							<h2>Properties</h2>
							<hr />
							<h3>Current Hologram:</h3>
							<p>{JSON.stringify(hologram)}</p>
							<h3>Playlists:</h3>
							<p>{playlist}</p>
						</div>
					</div>
				</div>
			</div>

			<h2>Response</h2>
			<hr />
			<p>{bridgeResponse}</p>
			<h2>Bridge Events</h2>
			<button
				onClick={() => {
					console.log("%c REACT: Listening to Events", "color: #00ff00")
					// There are two ways to add events.
					// 1. You can add an event listener to the BridgeClient instance.
					Bridge.addEventListener("Monitor Connect", (event) => {
						setDisplays(JSON.stringify(event.payload.value))
					})
					// 2. You can create a prebuilt MessageHandler Class.
					new PlaylistInsertMessageHandler({ client: Bridge })
					new PlaylistInstanceMessageHandler({ client: Bridge })
					new PlaylistDeleteMessageHandler({ client: Bridge })
					setEventStatus("Listening to Events")
				}}
				disabled={!connected}>
				{eventStatus}
			</button>
			<button
				onClick={() => {
					Bridge.addEventListener("Progress Update", (event) => {
						if (eventsink.current) {
							eventsink.current.value =
								JSON.stringify(event.payload.value.progress_type.value) +
								JSON.stringify(event.payload.value.progress.value)
						}
					})
				}}
				disabled={!connected}>
				Subscribe to Progress Updates
			</button>
			<textarea ref={eventsink}></textarea>
		</>
	)
}

export default App
