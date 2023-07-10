import { z } from "zod"
import { DEPTHINESS, QUILT_COLS, QUILT_ROWS, ZOOM } from "./defaults"

export const parameterNames = z.union([
	z.literal("focus"),
	z.literal("crop_pos_x"),
	z.literal("crop_pos_y"),
	z.literal("zoom"),
	//rgbd specific
	z.literal("depth_loc"),
	z.literal("depth_inversion"),
	z.literal("chroma_depth"),
	z.literal("depthiness"),
	z.literal("depth_cutoff"),
])

export const hologramParamMap = z.object({
	focus: z.number().optional(),
	crop_pos_x: z.number().optional(),
	crop_pos_y: z.number().optional(),
	zoom: ZOOM.range,
	//rgbd specific
	depth_loc: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]),
	depth_inversion: z.union([z.literal(0), z.literal(1)]),
	chroma_depth: z.union([z.literal(0), z.literal(1)]),
	depthiness: DEPTHINESS.range,
	depth_cutoff: z.union([z.literal(1), z.literal(0)]).optional(),
})

export type HologramParamMap = z.infer<typeof hologramParamMap>
