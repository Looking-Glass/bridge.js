import { useEffect, useRef, useState } from "react"
import {
	BridgeClient,
	QuiltHologram,
	RGBDHologram,
	MonitorConnectedMessageHandler,
	PlaylistDeleteMessageHandler,
	PlaylistInsertMessageHandler,
	PlaylistInstanceMessageHandler,
} from "@library/index"

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
	const [isWindowVisible, setIsWindowVisible] = useState(true)
	const [bridgeResponse, setResponse] = useState<string | null>(null)
	const [playlist, setPlaylist] = useState<string>()
	const [connected, setConnected] = useState<boolean>(false)

	const [connectionStatus, setConnectionStatus] = useState<string>("🛑 Unable to Connect")
	const [eventStatus, setEventStatus] = useState<string>("Listen to Events")
	const eventsink = useRef<HTMLTextAreaElement>(null)

	const Bridge = BridgeClient.getInstance()

	Bridge.setVerbosity(3)

	useEffect(() => {
		const handleEventConnected = () => {
			setConnected(true)
			setConnectionStatus("✅ Connected")
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
	}, [])

	return (
		<>
			<h1>Looking Glass Bridge API Library</h1>
			<h2>Status: {`${connectionStatus}`}</h2>

			<div className="flex-container">
				<div>
					<h2>Methods</h2>
					<button
						onClick={async () => {
							let call = await Bridge.connect()
							setResponse(JSON.stringify(call.response))
							if (call.success) {
								setConnected(true)
								setConnectionStatus("✅ Connected")
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
							setResponse("Casting Hologram")
							let call = await Bridge.cast(quilt)
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

							setResponse(JSON.stringify(call))
							setPlaylist(JSON.stringify(Bridge.playlists))
						}}
						disabled={!connected}>
						Cast RGBD hologram
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
				</div>
				<div>
					<h2>Properties</h2>
					<h3>Playlists</h3>
					<p>{playlist}</p>
				</div>
			</div>
			<h2>Response</h2>
			<p>{bridgeResponse}</p>
			<h2>Bridge Events</h2>
			<button
				onClick={() => {
					console.log("%c REACT: Listening to Events", "color: #00ff00")
					new MonitorConnectedMessageHandler({ client: Bridge })
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
