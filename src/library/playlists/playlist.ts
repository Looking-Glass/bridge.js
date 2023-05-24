import { PlaylistItemType } from "./playlistItems"

export class Playlist {
	public name: string
	public loop: boolean
	public items: PlaylistItemType[]

	constructor() {
		this.name = ""
		this.loop = false
		this.items = []
	}

	public AddItem(item: PlaylistItemType) {
		item.id = this.items.length
		this.items.push(item)
	}

	public RemoveItem(item: PlaylistItemType) {
		this.items.splice(item.id, 1)

		for (let i = 0; i < this.items.length; i++) {
			this.items[i].id = i
		}
	}

	public GetPlayPlaylistJson(orchestration: string, head: number) {
		const content = JSON.stringify({
			orchestration: orchestration,
			name: this.name,
			head_index: head,
		})

		return content
	}

	public GetInstanceJson(orchestration: string) {
		const content = JSON.stringify({
			orchestration: orchestration,
			name: this.name,
			loop: this.loop,
		})

		return content
	}

	public GetPlaylistItemsAsJson(orchestration: string) {
		const strings: string[] = []

		for (let i = 0; i < this.items.length; i++) {
			const item = this.items[i]
			const itemString = this.GetPlaylistItemJson(orchestration, i)
			strings.push(itemString)
		}

		return strings
	}

	private GetPlaylistItemJson(orchestration: string, index: number) {
		const item: PlaylistItemType = this.items[index]

		const URI = item.URI

		const content: string = JSON.stringify({
			orchestration: orchestration,
			name: this.name,
			index: index,
			uri: URI,
			rows: item.rows,
			cols: item.columns,
			aspect: item.aspect,
			view_count: item.viewCount,
			isRGBD: item.isRGBD,
			depth_loc: item.depth_loc,
			depth_inversion: item.depth_inversion,
			chroma_depth: item.chroma_depth,
			depthiness: item.depthiness,
			zoom: item.zoom,
		})

		return content
	}
}
