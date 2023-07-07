import { z } from "zod"
import { DEPTHINESS, QUILT_COLS, QUILT_ROWS, ZOOM } from "./defaults"

export const parameterNames = z.union([
	z.literal("rows"),
	z.literal("columns"),
	z.literal("aspect"),
	z.literal("view_count"),
	z.literal("zoom"),
	//rgbd specific
	z.literal("depth_loc"),
	z.literal("depth_inversion"),
	z.literal("chroma_depth"),
	z.literal("depthiness"),
	z.literal("crop_pos_x"),
	z.literal("crop_pos_y"),
	z.literal("focus"),
	z.literal("depth_cutoff"),
])

export const hologramParamMap = z.object({
	rows: QUILT_ROWS.range,
	columns: QUILT_COLS.range,
	aspect: z.number(),
	view_count: z.number(),
	depth_loc: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]),
	depth_inversion: z.union([z.literal(0), z.literal(1)]),
	chroma_depth: z.union([z.literal(0), z.literal(1)]),
	depthiness: DEPTHINESS.range,
	crop_pos_x: z.number().optional(),
	crop_pos_y: z.number().optional(),
	focus: z.number().optional(),
	depth_cutoff: z.union([z.literal(1), z.literal(0)]).optional(),
	zoom: ZOOM.range,
})

export type HologramParamMap = z.infer<typeof hologramParamMap>
