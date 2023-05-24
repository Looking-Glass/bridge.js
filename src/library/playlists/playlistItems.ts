export interface PlaylistItemType {
	id: number
	URI: string
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
	depthiness?: 0
}

export function QuiltPlaylistItem(
	URI: string,
	rows: number,
	columns: number,
	aspect: number,
	viewCount: number
): PlaylistItemType {
	const PlaylistItem: PlaylistItemType = {
		id: -1,
		URI: URI,
		rows: rows,
		columns: columns,
		aspect: aspect,
		viewCount: viewCount,
	}

	return PlaylistItem
}

export function RGBDPlaylistItem(
	URI: string,
	rows: number,
	columns: number,
	aspect: number,
	viewCount: number,
	depth_loc: 0 | 1 | 2 | 3,
	depth_inversion: 0 | 1,
	chroma_depth: 0 | 1,
	depthiness: 0
): PlaylistItemType {
	const PlaylistItem: PlaylistItemType = {
		id: -1,
		URI: URI,
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
