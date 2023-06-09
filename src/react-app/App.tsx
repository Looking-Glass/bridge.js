import { useRef, useState } from "react"
import { Bridge } from "../library/index"
import { QuiltHologram, RGBDHologram } from "../library/components/hologram"
import {
	MonitorConnectedMessageHandler,
	PlaylistDeleteMessageHandler,
	PlaylistInsertMessageHandler,
	PlaylistInstanceMessageHandler,
} from "../library/components/messageHandler"

Bridge.setVerbosity(3)
new MonitorConnectedMessageHandler({ client: Bridge })
new PlaylistInsertMessageHandler({ client: Bridge })
new PlaylistInstanceMessageHandler({ client: Bridge })
new PlaylistDeleteMessageHandler({ client: Bridge })

const quilt = new QuiltHologram({
	uri: "https://s3.amazonaws.com/lkg-blocks/u/9aa4b54a7346471d/steampunk_qs8x13.jpg",
	settings: { rows: 13, columns: 8, aspect: 0.75, viewCount: 8 * 13 },
})

const rgbd = new RGBDHologram({
	uri: "https://dl-dev.blocks.glass/u/b528b9def6aa4986/rgbd.png",
	settings: {
		depthiness: 1.0,
		rows: 8,
		columns: 6,
		focus: 0,
		aspect: 1,
		viewCount: 48,
		chroma_depth: 0,
		depth_inversion: 0,
		depth_loc: 2,
		depth_cutoff: 1,
	},
})

function App() {
	const [isWindowVisible, setIsWindowVisible] = useState(true)
	const [bridgeResponse, setResponse] = useState<string | null>(null)
	const [playlist, setPlaylist] = useState<string>()
	const eventsink = useRef<HTMLTextAreaElement>(null)

	return (
		<>
			<h1>Looking Glass Bridge API Library</h1>
			<div className="flex-container">
				<div>
					<h2>Methods</h2>
					<button
						onClick={async () => {
							let call = await Bridge.displays()
							setResponse(JSON.stringify(call.response))
						}}>
						Get currently connected Looking Glass
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
						}}>
						Get API version
					</button>
					<button
						onClick={async () => {
							setResponse("Casting Hologram")
							let call = await Bridge.cast(quilt)
							setResponse(JSON.stringify(call))
							setPlaylist(JSON.stringify(Bridge.playlists))
						}}>
						Cast Quilt hologram
					</button>
					<button
						onClick={async () => {
							setResponse("Casting Hologram")
							let call = await Bridge.cast(rgbd)

							setResponse(JSON.stringify(call))
							setPlaylist(JSON.stringify(Bridge.playlists))
						}}>
						Cast RGBD hologram
					</button>
					<button
						onClick={async () => {
							setIsWindowVisible(!isWindowVisible)
							let call = await Bridge.showWindow(isWindowVisible)
							setResponse(JSON.stringify(call.response))
						}}>
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
					Bridge.addEventListener("Progress Update", (event) => {
						if (eventsink.current) {
							eventsink.current.value = JSON.stringify(event.payload.value.progress.value)
						}
					})
				}}>
				Subscribe to Progress Updates
			</button>
			<textarea ref={eventsink}></textarea>
		</>
	)
}

export default App
