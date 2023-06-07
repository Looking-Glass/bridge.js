import { z } from "zod"

export const version = z.object({}).strict()

export const orchestration = z.object({}).strict()

export const show_window = z.object({
	orchestration: z.string(),
	show_window: z.boolean(),
	head_index: z.number(),
})

export const available_output_devices = z.object({
	orchestration: z.string(),
})

export const delete_playlist = z.object({
	orchestration: z.string(),
	name: z.string(),
	loop: z.boolean(),
})

export const instance_playlist = z.object({
	orchestration: z.string(),
	name: z.string(),
	loop: z.boolean(),
})

export const insert_playlist_entry = z.object({
	id: z.number().optional(),
	uri: z.string(),
	rows: z.number(),
	columns: z.number(),
	viewCount: z.number(),
	aspect: z.number(),
	crop_pos_x: z.number().optional(),
	crop_pos_y: z.number().optional(),
	focus: z.literal(0).optional(),
	zoom: z.literal(0).optional(),
	isRGBD: z.union([z.literal(0), z.literal(1)]).optional(),
	depth_loc: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]).optional(),
	depth_inversion: z.union([z.literal(0), z.literal(1)]).optional(),
	chroma_depth: z.union([z.literal(0), z.literal(1)]).optional(),
	depthiness: z.number().optional(),
	depth_cutoff: z.number().optional(),
})

export const play_playlist = z.object({
	orchestration: z.string(),
	name: z.string(),
	head_index: z.number(),
})
