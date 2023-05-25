import { BridgeClient } from "./library/client"
import { QuiltPlaylistItem } from "./library/playlists/playlistItems"

const Bridge = new BridgeClient()

const hologram = QuiltPlaylistItem({
	URI: "https://s3.amazonaws.com/lkg-blocks/u/9aa4b54a7346471d/steampunk_qs8x13.jpg",
	rows: 13,
	columns: 8,
	aspect: 0.75,
	viewCount: 8 * 13,
})

function App() {
	return (
		<>
			<button
				onClick={async () => {
					console.log(await Bridge.displays())
				}}>
				Get currently connected Looking Glass
			</button>
			<button
				onClick={async () => {
					console.log(await Bridge.bridgeVersion())
				}}>
				Get Bridge version
			</button>
			<button
				onClick={async () => {
					console.log(await Bridge.apiVersion())
				}}>
				Get API version
			</button>
			<button
				onClick={async () => {
					await Bridge.cast(hologram)
				}}>
				Cast hologram
			</button>
		</>
	)
}

export default App
