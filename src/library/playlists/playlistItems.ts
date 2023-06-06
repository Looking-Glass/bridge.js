export interface PlaylistItemType {
	id?: number
	uri: string
	rows: number
	columns: number
	viewCount: number
	aspect: number
	crop_pos_x?: number
	crop_pos_y?: number
	focus?: 0
	zoom?: 0

	// only RGBD below
	isRGBD?: 0 | 1
	depth_loc?: 0 | 1 | 2 | 3
	depth_inversion?: 0 | 1
	chroma_depth?: 0 | 1
	depthiness?: number
	depth_cutoff?: number
}
export interface QuiltPlaylistItemArgs {
	uri: string
	rows: number
	columns: number
	aspect: number
	viewCount: number
}
export function QuiltPlaylistItem({
	uri,
	rows,
	columns,
	aspect,
	viewCount,
}: QuiltPlaylistItemArgs): PlaylistItemType {
	const PlaylistItem: PlaylistItemType = {
		id: -1,
		uri: uri,
		rows: rows,
		columns: columns,
		aspect: aspect,
		viewCount: viewCount,
	}

	return PlaylistItem
}

export interface RGBDPlaylistItemArgs {
	uri: string
	rows: number
	columns: number
	aspect: number
	viewCount: number
	depth_loc: 0 | 1 | 2 | 3
	depth_inversion: 0 | 1
	chroma_depth: 0 | 1
	depthiness: number
	focus: number
	depth_cutoff: 1
}

export function RGBDPlaylistItem({
	uri,
	rows,
	columns,
	aspect,
	viewCount,
	depth_loc,
	depth_inversion,
	chroma_depth,
	depthiness,
}: RGBDPlaylistItemArgs): PlaylistItemType {
	const PlaylistItem: PlaylistItemType = {
		id: -1,
		uri: uri,
		rows: rows,
		columns: columns,
		aspect: aspect,
		isRGBD: 1,
		depth_loc: depth_loc,
		depth_inversion: depth_inversion,
		chroma_depth: chroma_depth,
		depthiness: depthiness,
		viewCount: viewCount,
	}

	return PlaylistItem
}
