import { z } from "zod"
import { HologramType, QuiltHologram, RGBDHologram } from "../components/hologram"
import { insert_playlist_entry } from "../schemas/schema.requests"

export interface PlaylistItemArgs {
	orchestration: string
	name: string
	index: number
	tag: string | undefined
	id: string
	uri: string
	rows: number
	cols: number
	aspect: number
	view_count: number
	durationMS: number
	isRGBD: 0 | 1
	depth_loc: 0 | 1 | 2 | 3
	depth_inversion: 0 | 1
	chroma_depth: 0 | 1
	depthiness: number
	crop_pos_x: number | undefined
	crop_pos_y: number | undefined
	zoom: number
}

/**Playist items are what we actually end up sending to Bridge.
 * These are managed by the Playlist class, and should not be called externally.
 * We take the hologram object the user creates and prepare it to be added to a playlist with the toBridge function. */
class PlaylistItem {
	public orchestration: string
	public hologram: HologramType
	public id: number
	public index: number
	public playlistName: string
	public tag: string | undefined

	constructor(args: {
		hologram: HologramType
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
				durationMS: settings.duration ? settings.duration : 10_000,
				focus: settings.focus ? settings.focus : 0,
				zoom: settings.zoom ? settings.zoom : 1,
				crop_pos_x: settings.crop_pos_x ? settings.crop_pos_x : 0,
				crop_pos_y: settings.crop_pos_y ? settings.crop_pos_y : 0,
				aspect: settings.aspect,
				view_count: settings.viewCount,
				isRGBD: 0,
				tag: settings.tag ? settings.tag : "",
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
				rows: 8,
				cols: 13,
				focus: settings.focus ? settings.focus : 0,
				aspect: settings.aspect,
				view_count: 8 * 13,
				durationMS: settings.duration ? settings.duration : 10_000,
				isRGBD: 1,
				depth_loc: settings.depth_loc,
				crop_pos_x: settings.crop_pos_x ? settings.crop_pos_x : 0,
				crop_pos_y: settings.crop_pos_y ? settings.crop_pos_y : 0,
				depth_inversion: settings.depth_inversion,
				chroma_depth: settings.chroma_depth,
				depthiness: settings.depthiness,
				zoom: settings.zoom,
				tag: settings.tag ? settings.tag : "",
			}
			return playlistItem
		}
		throw new Error("Invalid hologram type")
	}
}

export class QuiltPlaylistItem extends PlaylistItem {
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

export class RGBDPlaylistItem extends PlaylistItem {
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
