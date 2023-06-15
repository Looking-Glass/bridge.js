import { sendMessage } from "../components/endpoints"
import { HologramType, QuiltHologram, RGBDHologram } from "../components/hologram"
import { RGBDPlaylistItem, QuiltPlaylistItem } from "./playlistItems"

export type PlaylistItemType = QuiltPlaylistItem | RGBDPlaylistItem

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
	public orchestration: string

	constructor(args: { name: string; loop: boolean; items: PlaylistItemType[]; orchestration: string }) {
		this.name = args.name
		this.loop = args.loop
		this.items = args.items
		this.orchestration = args.orchestration
	}

	public setName(name: string) {
		this.name = name
	}

	public addItem(hologram: HologramType) {
		let item: PlaylistItemType
		if (hologram.type == "quilt") {
			item = new QuiltPlaylistItem({
				hologram: hologram as QuiltHologram,
				id: this.items.length,
				index: this.items.length,
				playlistName: this.name,
				orchestration: this.orchestration,
			})

			this.items.push(item)
		} else if (hologram.type == "rgbd") {
			item = new RGBDPlaylistItem({
				hologram: hologram as RGBDHologram,
				id: this.items.length,
				index: this.items.length,
				playlistName: this.name,
				orchestration: this.orchestration,
			})
			this.items.push(item)
		}
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

	/**
	 * this function will play a playlist on a Looking Glass display
	 * the playlist must be created and populated with content before calling this function
	 * @param playlist
	 * @param head
	 * @returns
	 */
	public async play({ playlist, head }: PlaylistArgs): Promise<boolean> {
		let orchestration = this.orchestration
		const requestBody = playlist.getInstance(this.orchestration)

		if (!head) {
			head = -1
		}

		let instancePlaylist = await sendMessage({ endpoint: "instance_playlist", requestBody: requestBody })
		if (instancePlaylist.success == false) {
			console.error("failed to initialize playlist")
			return false
		}

		const PlaylistItems: PlaylistItemType[] = playlist.items
		if (instancePlaylist.success == true) {
			if (orchestration !== undefined) {
				for (let i = 0; i < PlaylistItems.length; i++) {
					PlaylistItems[i].orchestration = this.orchestration
					const pRequestBody = PlaylistItems[i].toBridge()

					let message = await sendMessage({ endpoint: "insert_playlist_entry", requestBody: pRequestBody })
					if (message.success == false) {
						console.error("failed to insert playlist entry")
						return false
					}
				}
			}
		}

		const playRequestBody = playlist.getCurrent({ orchestration, head })
		let play_playlist = await sendMessage({
			endpoint: "play_playlist",
			requestBody: playRequestBody,
		})

		if (play_playlist.success == false) {
			return false
		}

		return true
	}
}
