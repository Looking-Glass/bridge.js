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
import { PauseIcon, PlayIcon, BackwardIcon, ForwardIcon } from "@heroicons/react/24/solid"
import { set } from "zod"

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
	const [connectionStatus, setConnectionStatus] = useState<string>(
		"Not Connected. Click the Connect button below to connect to Bridge"
	)
	const [displays, setDisplays] = useState<string>("Connect to Bridge to detect displays")

	//internal application state
	const [isWindowVisible, setIsWindowVisible] = useState(true)
	const [studioPlaylistPath, setStudioPlaylistPath] = useState<string>("")
	const [index, setIndex] = useState<number>(0)
	const [progress, setProgress] = useState(0)
	const [autoStartPlaylistName, setAutoStartPlaylistName] = useState<string>("")
	const [isCastPending, setIsCastPending] = useState(false)
	const [isPlaying, setIsPlaying] = useState(false)

	// Custom Hologram State
	const [hologram, setHologram] = useState<QuiltHologram | RGBDHologram>(quilt)
	const [hologramType, setHologramType] = useState<hologramTypes>("quilt")

	// State for managing events and responses from Bridge:
	const [eventStatus, setEventStatus] = useState<string>("Listen to Events")
	const eventsink = useRef<HTMLTextAreaElement>(null)
	const [bridgeResponse, setResponse] = useState<string | null>(null)

	const Bridge = BridgeClient.getInstance()

	Bridge.setVerbosity(3)

	const onConnectionFailed = () => {
		setConnected(false)
		setConnectionStatus("🚨 Connection Failed")
	}

	const onConnected = async () => {
		setConnected(true)
		setConnectionStatus("✅ Connected")
		// add an event listener to handle a disconnect event from Bridge.
		await Bridge.addEventListener("Bridge Disconnected", handleEventDisconnected)
		// react-ify the bridge state for cast pending
		await Bridge.addEventListener("New Item Playing", handleNewItemPlaying)
		// Setup Progress Update Events
		await Bridge.addEventListener("Progress Update", (event) => {
			setProgress(event.payload.value.progress.value)
			if (eventsink.current) {
				if (event.payload.value.progress_type.value === "Playlist Progress") {
					eventsink.current.value =
						JSON.stringify(event.payload.value.progress_type.value) +
						JSON.stringify(event.payload.value.progress.value)
				}
			}
		})
		// Manually call Bridge.displays to query for any connected Looking Glass,
		await Bridge.getDisplays().then((call) => {
			if (!call.response || call.response.length == 0) {
				setDisplays("⚠️ No Displays Detected")
			} else {
				setDisplays(JSON.stringify(call.response))
			}
		})
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
	}

	useEffect(() => {
		if (hologramType == "quilt") {
			setHologram(quilt)
		} else if (hologramType == "rgbd") {
			setHologram(rgbd)
		}
	}, [hologram])

	return (
		<div className={"text-4xl"}>
			<h1 className="bg-text holo5 relative mx-auto max-w-3xl pb-20 text-center font-rubik text-4xl font-black md:text-5xl">
				Looking Glass Bridge API Library
			</h1>
			<h2>Status:</h2> <p> {`${connectionStatus}`}</p>
			<h2>Displays:</h2> <p>{`${displays}`}</p>
			<div>
				<div>
					<h2>Methods</h2>
					<hr />
					<div className={"flex items-center justify-between gap-12"}>
						<button
							className={"primaryButton text-sm"}
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
							Connect
						</button>
						<button
							className={"primaryButton text-sm"}
							onClick={async () => {
								let call = await Bridge.disconnect()
								setResponse(JSON.stringify(call.success))
								setConnected(false)
								setConnectionStatus("✂️ Manually Disconnected!")
								setEventStatus("Subscribe to Events")
								setDisplays("Connect to Bridge to detect displays")
							}}
							disabled={!connected}>
							Disconnect
						</button>
						<button
							className={"primaryButton text-sm"}
							onClick={async () => {
								let call = await Bridge.getDisplays()
								setResponse(JSON.stringify(call.response))
							}}
							disabled={!connected}>
							Get Displays
						</button>
						<button
							className={"primaryButton text-sm"}
							onClick={async () => {
								let call = await Bridge.getVersion()
								setResponse(`Looking Glass Bridge Version: ${JSON.stringify(call.response)}`)
							}}>
							Get Bridge version
						</button>
						<button
							className={"primaryButton text-sm"}
							onClick={async () => {
								let call = await Bridge.apiVersion()
								setResponse(`Looking Glass Bridge API Version: ${JSON.stringify(call.response)}`)
							}}
							disabled={!connected}>
							Get API version
						</button>
						<button
							className={"primaryButton text-sm"}
							onClick={async () => {
								setIsWindowVisible(!isWindowVisible)
								let call = await Bridge.showWindow(isWindowVisible)
								setResponse(JSON.stringify(call.response))
							}}
							disabled={!connected}>
							Toggle Window
						</button>
					</div>

					<h2>Controls</h2>
					<hr />
					<div className={"flex items-center justify-start gap-12"}>
						<button
							className={"primaryButton text-sm"}
							title={"Previous"}
							onClick={async () => {
								await Bridge.previous()
								// setResponse(JSON.stringify(call.response))
							}}
							disabled={!connected}>
							<BackwardIcon className={"w-6 h-6"} />
						</button>
						<button
							title={isPlaying ? "Pause" : "Play"}
							className={"primaryButton text-sm"}
							onClick={async () => {
								if (isPlaying) {
									await Bridge.pause()
									setIsPlaying(false)
								} else {
									await Bridge.play()
									setIsPlaying(true)
								}
							}}
							disabled={!connected}>
							{!isPlaying && <PlayIcon className={"w-6 h-6"} />}
							{isPlaying && <PauseIcon className={"w-6 h-6"} />}
						</button>
						<button
							title={"Next"}
							className={"primaryButton text-sm"}
							onClick={async () => {
								await Bridge.next()
								// setResponse(JSON.stringify(call.response))
							}}
							disabled={!connected}>
							<ForwardIcon className={"w-6 h-6"} />
						</button>
						<h2 className={"text-4xl"}>Progress</h2>

						<div className={" bg-gray-200 rounded-full w-40 h-2.5 dark:bg-gray-700"}>
							<div
								className={"bg-purple-gradient h-2.5 rounded-full"}
								style={{ width: progress + "%" }}></div>
						</div>
						<div className="w-24">
							<h3 className={"text-2xl"}>{Math.round(progress)}%</h3>
						</div>
					</div>

					<div>
						<label>
							Index to seek to
							<input
								className={
									"block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								}
								type="number"
								onChange={(e) => {
									// remove "" from the uri, quotes are auto-added by windows' copy as path option.
									setIndex(parseInt(e.target.value))
								}}></input>
						</label>
					</div>
					<button
						className={"primaryButton text-sm"}
						onClick={async () => {
							await Bridge.seek(index)
						}}
						disabled={!connected}>
						SEEK
					</button>
					<br />
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
								className={"primaryButton text-sm"}
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
								className={"primaryButton text-sm"}
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
								<div key={index} className={"playlist-border"}>
									<h3>Playlist {item.name}</h3>
									<PlaylistUI playlist={item} />
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			{/* AUTO START PLAYLIST CONTROLS */}
			<div className={"flex items-center justify-between gap-12"}>
				<div>
					<label>
						Set Auto Start Playlist Name
						<input
							className={
								"bg-gray-50 border border-gray-300 text-gray-900 text-4xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							}
							type="text"
							onChange={(e) => {
								setAutoStartPlaylistName(e.target.value)
							}}></input>
					</label>
				</div>
				<button
					className={"primaryButton text-sm"}
					onClick={async () => {
						let call = await Bridge.getAutoStartPlaylist()
						setResponse(JSON.stringify(call.response))
					}}>
					Get Auto Start Playlist
				</button>
				<button
					className={"primaryButton text-sm"}
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
				<button
					className={"primaryButton text-sm"}
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
			{/* STUDIO PLAYLIST CONTROLS */}
			<div className={"flex items-center justify-between gap-12"}>
				<div>
					<label>
						Full Path to Playlist.json
						<input
							className={
								"bg-gray-50 border border-gray-300 text-gray-900 text-4xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							}
							type="text"
							onChange={(e) => {
								// remove "" from the uri, quotes are auto-added by windows' "copy as path" option.
								let cleaned = e.target.value.replace(/"/g, "")
								setStudioPlaylistPath(cleaned)
							}}></input>
					</label>
				</div>
				<button
					className={"primaryButton text-sm"}
					onClick={async () => {
						let call = await Bridge.playStudioPlaylist(studioPlaylistPath)
						setResponse(JSON.stringify(call.response))
					}}
					disabled={!connected}>
					Play Studio Playlist
				</button>
				<button
					className={"primaryButton text-sm"}
					onClick={async () => {
						await Bridge.stopStudioPlaylist()
						// setResponse(JSON.stringify(call.response))
					}}
					disabled={!connected}>
					Stop Studio Playlist
				</button>
			</div>
			{/* EVENT LISTENERS */}
			<h2>Response</h2>
			<hr />
			<p>{bridgeResponse}</p>
			<h2>Bridge Events</h2>
			<button
				className={"primaryButton text-sm"}
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
		</div>
	)
}

export default App
