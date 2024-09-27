import { z } from "zod"
import { DEPTHINESS, FILTER_MODE, GAUSSIAN_SIGMA, ZOOM } from "./defaults"

export const parameterNames = z.union([
	z.literal("focus"),
	z.literal("aspect"),
	z.literal("cols"),
	z.literal("rows"),
	z.literal("crop_pos_x"),
	z.literal("crop_pos_y"),
	z.literal("zoom"),
	z.literal("filter_mode"),
	z.literal("gaussian_sigma"),
	//rgbd specific
	z.literal("depth_loc"),
	z.literal("depth_inversion"),
	z.literal("chroma_depth"),
	z.literal("depthiness"),
	z.literal("depth_cutoff"),
])

export const hologramParamMap = z.object({
	focus: z.number().optional(),
	aspect: z.number().optional(),
	cols: z.number().optional(),
	rows: z.number().optional(),
	crop_pos_x: z.number().optional(),
	crop_pos_y: z.number().optional(),
	zoom: ZOOM.range,
	filter_mode: FILTER_MODE.range,
	gaussian_sigma: GAUSSIAN_SIGMA.range,
	//rgbd specific
	depth_loc: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]),
	depth_inversion: z.union([z.literal(0), z.literal(1)]),
	chroma_depth: z.union([z.literal(0), z.literal(1)]),
	depthiness: DEPTHINESS.range,
	depth_cutoff: z.union([z.literal(1), z.literal(0)]).optional(),
})

export type HologramParamMap = z.infer<typeof hologramParamMap>
