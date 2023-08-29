import { useEffect, useRef, useState } from "react"
import {
	BridgeClient,
	QuiltHologram,
	RGBDHologram,
	PlaylistDeleteMessageHandler,
	PlaylistInsertMessageHandler,
	PlaylistInstanceMessageHandler,
	hologramTypes,
	Playlist,
} from "@library/index"
import HologramForm from "./components/HologramForm"
import { PlaylistUI } from "./components/Playlist"

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
	// link setup for hash commit link
	const githubRepo = "https://github.com/Looking-Glass/Bridge.js"
	const commitUrl = `${githubRepo}/commit/${__COMMIT_HASH__}`
	// State for managing connection status
	const [connected, setConnected] = useState(false)
	const [connectionStatus, setConnectionStatus] = useState<string>(
		"Not Connected. Click the Connect button below to connect to Bridge"
	)
	const [displays, setDisplays] = useState<string>("Connect to Bridge to detect displays")

	//internal application state
	const [isWindowVisible, setIsWindowVisible] = useState(true)
	const [studioPlaylistPath, setStudioPlaylistPath] = useState<string>("")
	const [index, setIndex] = useState(0)
	const [progress, setProgress] = useState(0)
	const [autoStartPlaylistName, setAutoStartPlaylistName] = useState<string>("")
	const [isCastPending, setIsCastPending] = useState(false)

	// Custom Hologram State
	const [hologram, setHologram] = useState<QuiltHologram | RGBDHologram>(quilt)
	const [hologramType, setHologramType] = useState<hologramTypes>("quilt")

	// State for managing events and responses from Bridge:
	const [eventStatus, setEventStatus] = useState<string>("Listen to Events")
	const eventsink = useRef<HTMLTextAreaElement>(null)
	const [bridgeResponse, setResponse] = useState<string | null>(null)

	const Bridge = BridgeClient.getInstance()

	const onConnectionFailed = () => {
		setConnected(false)
		setConnectionStatus("🚨 Connection Failed")
	}

	const onConnected = async () => {
		setConnected(true)
		setConnectionStatus("✅ Connected")
		Bridge.setVerbosity(0)
		// add an event listener to handle a disconnect event from Bridge.
		await Bridge.addEventListener("Bridge Disconnected", handleEventDisconnected)
		// react-ify the bridge state for cast pending
		await Bridge.addEventListener("New Item Playing", handleNewItemPlaying)
		// listen for progress updates
		await Bridge.addEventListener("Progress Update", handleProgressUpdate)
		// Manually call Bridge.displays to query for any connected Looking Glass,
		await Bridge.getDisplays().then((call) => {
			if (!call.response || call.response.length == 0) {
				setDisplays("⚠️ No Displays Detected")
			} else {
				setDisplays(JSON.stringify(call.response))
			}
		})
	}

	const handleProgressUpdate = async (event: any) => {
		setProgress(event.payload.value.progress.value)
		if (eventsink.current) {
			if (event.payload.value.progress_type.value === "Playlist Progress") {
				eventsink.current.value =
					JSON.stringify(event.payload.value.progress_type.value) +
					JSON.stringify(event.payload.value.progress.value)
			}
		}
	}

	const handleNewItemPlaying = async () => {
		setIsCastPending(Bridge.isCastPending)
	}

	const handleEventDisconnected = async () => {
		setConnected(false)
		setConnectionStatus("⚠️ Bridge Disconnected!")
		setEventStatus("Subscribe to Events")
		setDisplays("Connect to Bridge to detect displays")
		await Bridge.removeEventListener("Bridge Disconnected", handleEventDisconnected)
		await Bridge.removeEventListener("New Item Playing", handleNewItemPlaying)
		await Bridge.removeEventListener("Progress Update", handleProgressUpdate)
	}

	useEffect(() => {
		if (hologramType == "quilt") {
			setHologram(quilt)
		} else if (hologramType == "rgbd") {
			setHologram(rgbd)
		}
	}, [hologram])

	return (
		<>
			<h1>Looking Glass Bridge API Library</h1>
			<h2>
				bridge.js is open source on{" "}
				<a href={githubRepo} target="_blank" rel="noopener noreferrer">
					Github
				</a>
				! 🥳
			</h2>
			<p>
				Current Commit Hash:
				<a href={commitUrl} target="_blank" rel="noopener noreferrer">
					{__COMMIT_HASH__}
				</a>
			</p>
			<h2>Status: {`${connectionStatus}`}</h2>
			<h2>Displays: {`${displays}`}</h2>

			<div>
				<div>
					<div>
						<div>
							<h2>Methods</h2>
							<hr />
							<div className="flex-container">
								<button
									onClick={async () => {
										setConnectionStatus("Connecting to Bridge...")
										let call = await Bridge.connect()
										setResponse(JSON.stringify(call.response))
										// if the call was successful
										if (call.success) {
											onConnected()
										}
										// if the call was not successful
										else {
											onConnectionFailed()
										}
									}}
									disabled={connected}>
									Connect to Bridge
								</button>
								<button
									onClick={async () => {
										let call = await Bridge.disconnect()
										setResponse(JSON.stringify(call.success))
										setConnected(false)
										setConnectionStatus("✂️ Manually Disconnected!")
										setEventStatus("Subscribe to Events")
										setDisplays("Connect to Bridge to detect displays")
									}}
									disabled={!connected}>
									Disconnect From Bridge
								</button>
								<button
									onClick={async () => {
										let call = await Bridge.getDisplays()
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
									<label style={{ display: "block" }}>Logging</label>
									<select
										style={{ width: "100px", display: "block" }}
										onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
											Bridge.setVerbosity(parseInt(e.target.value) as 0 | 1 | 2 | 3)
										}}>
										<option value="0">No Logging</option>
										<option value="1">Only Warnings</option>
										<option value="2">Only Responses</option>
										<option value="3">All</option>
									</select>
								</div>
							</div>
						</div>
						<div>
							<h2>Playlist Management</h2>
							<hr />

							<div className="flex-container">
								<div className="border">
									<button
										onClick={async () => {
											let call = await Bridge.playStudioPlaylist(studioPlaylistPath)
											setResponse(JSON.stringify(call.response))
										}}
										disabled={!connected}>
										Play Studio Playlist
									</button>
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
										await Bridge.stopStudioPlaylist()
										// setResponse(JSON.stringify(call.response))
									}}
									disabled={!connected}>
									Stop Studio Playlist
								</button>
								<button
									onClick={async () => {
										let call = await Bridge.getAutoStartPlaylist()
										setResponse(JSON.stringify(call.response))
									}}>
									Get Auto Start Playlist
								</button>
								<div className="border">
									<button
										onClick={async () => {
											let call = await Bridge.setAutoStartPlaylist({
												playlistName: "test",
												playlistPath:
													"C:\\Users\\Public\\Documents\\Looking Glass Factory\\HoloPlay Studio\\Playlists\\test.json",
											})
											setResponse(JSON.stringify(call.response))
										}}
										disabled={!connected}>
										Set Auto Start Playlist
									</button>
									<div>
										<label>
											Set Auto Start Playlist Name
											<input
												type="text"
												onChange={(e) => {
													setAutoStartPlaylistName(e.target.value)
												}}></input>
										</label>
									</div>
								</div>
								<button
									onClick={async () => {
										// Check to see if playlists exist
										if (Bridge.playlists) {
											// Find the playlist with the name that matches the one we want to auto start
											let playlist = Bridge.playlists.find(
												(playlist: Playlist | undefined) => playlist && playlist.name == autoStartPlaylistName
											)
											// Throw an error if no playlist with that name is found
											if (!playlist) {
												setResponse(`No Playlist with named ${autoStartPlaylistName} found`)
												return
											}
											let call = await Bridge.createAutoStartPlaylist({ playlist })
											setResponse(JSON.stringify(call.response))
										}
									}}>
									Create Auto Start Playlist
								</button>
							</div>
						</div>
						<div>
							<h2>Response</h2>
							<hr />
							<p>{bridgeResponse}</p>
						</div>
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
					<br />
					<div className="w3-light-grey">
						<div className="w3-container w3-green w3-center" style={{ width: `${progress}%` }}></div>
						<div className="w3-center">{Math.round(progress)}%</div>
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
								isCastPending={isCastPending}
								setIsCastPending={setIsCastPending}
							/>
							<h3>Cast Predefined Holograms</h3>
							<button
								title={"Cast a prebuilt quilt hologram"}
								onClick={async () => {
									setResponse("Casting Hologram")
									let call = await Bridge.cast(quilt)
									setHologram(quilt)
									setResponse(JSON.stringify(call))
									setIsCastPending(Bridge.isCastPending)
								}}
								disabled={!connected || isCastPending}>
								Cast Quilt hologram
							</button>
							<button
								onClick={async () => {
									setResponse("Casting Hologram")
									let call = await Bridge.cast(rgbd)
									setHologram(rgbd)
									setResponse(JSON.stringify(call))
									setIsCastPending(Bridge.isCastPending)
								}}
								disabled={!connected || isCastPending}>
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
							{Bridge.playlists?.map((item, index) => (
								<div key={index} className={"border"}>
									<h3>Playlist {item.name}</h3>
									<PlaylistUI playlist={item} />
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
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
			<textarea ref={eventsink}></textarea>
		</>
	)
}

export default App
