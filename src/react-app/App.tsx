import { Bridge } from "../library/index"
import { QuiltPlaylistItem, RGBDPlaylistItem } from "../library/playlists/playlistItems"

Bridge.setVerbosity(0)

const hologram = QuiltPlaylistItem({
	URI: "https://s3.amazonaws.com/lkg-blocks/u/9aa4b54a7346471d/steampunk_qs8x13.jpg",
	rows: 13,
	columns: 8,
	aspect: 0.75,
	viewCount: 8 * 13,
})

const rgbd_hologram = RGBDPlaylistItem({
	URI: "https://dl-dev.blocks.glass/u/b528b9def6aa4986/rgbd.png",
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
			<button
				onClick={async () => {
					await Bridge.cast(rgbd_hologram)
				}}>
				Cast RGBD hologram
			</button>
		</>
	)
}

export default App
