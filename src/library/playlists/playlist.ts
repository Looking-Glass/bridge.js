import { PlaylistItemType } from "./playlistItems"

export interface PlaylistType {
	name: string
	loop: boolean
	items: PlaylistItemType[]
}

export interface getPlayPlaylistJsonArgs {
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

	public setName(name: string) {
		this.name = name
	}

	public addItem(item: PlaylistItemType) {
		item.id = this.items.length
		this.items.push(item)
	}

	public removeItem(item: PlaylistItemType) {
		if (item.id == undefined) return
		this.items.splice(item.id, 1)

		for (let i = 0; i < this.items.length; i++) {
			this.items[i].id = i
		}
	}

	public clearItems() {
		this.items = []
	}

	/**
	 * gets the object for the current playlist that is currently being played
	 * @param orchestration
	 * @param head
	 * @returns
	 */
	public getCurrent({ orchestration, head }: getPlayPlaylistJsonArgs) {
		const content = {
			orchestration: orchestration,
			name: this.name,
			head_index: head,
		}

		return content
	}

	/**
	 * create the json object for the playlist instance
	 * @param orchestration
	 * @returns
	 */
	public getInstance(orchestration: string) {
		const content = { orchestration: orchestration, name: this.name, loop: this.loop }

		return content
	}
}
