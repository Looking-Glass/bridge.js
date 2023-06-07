import { z } from "zod"
import { Hologram, QuiltHologram, RGBDHologram } from "../components/hologram"
import { insert_playlist_entry } from "../schemas/requests"

export interface PlaylistItemArgs {
	orchestration: string
	name: string
	index: number
	id: string
	uri: string
	rows: number
	cols: number
	aspect: number
	view_count: number
	isRGBD: 0 | 1
	depth_loc: 0 | 1 | 2 | 3
	depth_inversion: 0 | 1
	chroma_depth: 0 | 1
	depthiness: number
	zoom: number
}

class PlaylistItem {
	public orchestration: string
	public hologram: Hologram
	public id: number
	public index: number
	public playlistName: string

	constructor(args: {
		hologram: Hologram
		id: number
		index: number
		playlistName: string
		orchestration: string
	}) {
		this.hologram = args.hologram
		this.id = args.id
		this.index = args.index
		this.playlistName = args.playlistName
		this.orchestration = args.orchestration
	}

	public toBridge(): z.infer<typeof insert_playlist_entry> | never {
		let playlistItem: z.infer<typeof insert_playlist_entry>
		if (this.hologram.type == "quilt") {
			const settings = this.hologram.settings
			playlistItem = {
				orchestration: this.orchestration,
				id: this.id,
				name: this.playlistName,
				index: this.index,
				uri: this.hologram.uri,
				rows: settings.rows,
				cols: settings.columns,
				aspect: settings.aspect,
				view_count: settings.viewCount,
				isRGBD: 0,
			}
			return playlistItem
		} else if (this.hologram.type == "rgbd") {
			const settings = this.hologram.settings
			playlistItem = {
				orchestration: this.orchestration,
				id: this.id,
				name: this.playlistName,
				index: this.index,
				uri: this.hologram.uri,
				rows: settings.rows,
				cols: settings.columns,
				aspect: settings.aspect,
				view_count: settings.viewCount,
				isRGBD: 1,
				depth_loc: settings.depth_loc,
				depth_inversion: settings.depth_inversion,
				chroma_depth: settings.chroma_depth,
				depthiness: settings.depthiness,
				zoom: settings.zoom,
			}
			return playlistItem
		}
		throw new Error("Invalid hologram type")
	}
}

export class PlaylistItemQuilt extends PlaylistItem {
	constructor(args: {
		hologram: QuiltHologram
		id: number
		index: number
		playlistName: string
		orchestration: string
	}) {
		super(args)
	}
}

export class PlaylistItemRGBD extends PlaylistItem {
	constructor(args: {
		hologram: RGBDHologram
		id: number
		index: number
		playlistName: string
		orchestration: string
	}) {
		super(args)
	}
}
