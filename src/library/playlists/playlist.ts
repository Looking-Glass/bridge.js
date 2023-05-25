import { PlaylistItemType } from "./playlistItems"

export interface PlaylistType {
	name: string
	loop: boolean
	items: PlaylistItemType[]
}

interface getPlayPlaylistJsonArgs {
	orchestration: string
	head: number
}

export interface PlaylistArgs {
	/** the playlist class */
	playlist: Playlist
	/** display */
	head?: number
}
/**
 * Playlist class
 * @class
 *
 */
export class Playlist {
	public name: string
	public loop: boolean
	public items: PlaylistItemType[]

	constructor() {
		this.name = ""
		this.loop = false
		this.items = []
	}

	public SetName(name: string) {
		this.name = name
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

	public ClearItems() {
		this.items = []
	}

	/**
	 * creates the json object for playing the playlist
	 * @param orchestration
	 * @param head
	 * @returns
	 */
	public GetPlayPlaylistJson({ orchestration, head }: getPlayPlaylistJsonArgs) {
		const content = JSON.stringify({
			orchestration: orchestration,
			name: this.name,
			head_index: head,
		})

		return content
	}

	/**
	 * create the json object for the playlist instance
	 * @param orchestration
	 * @returns
	 */
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
