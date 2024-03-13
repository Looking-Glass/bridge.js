import { z } from "zod"
import { HologramParamMap } from "./schema.parameters"

export const version = z.object({}).strict()

export const orchestration = z.object({}).strict()

export const show_window = z.object({
	orchestration: z.string(),
	show_window: z.boolean(),
	head_index: z.number(),
})

export const instance_studio_playlist = z.object({
	orchestration: z.string(),
	name: z.string(),
	playlist_path: z.string(),
	loop: z.boolean(),
})

export const get_autostart_playlist = z.object({
	orchestration: z.string(),
	head_index: z.number(),
})

export const set_autostart_playlist = z.object({
	orchestration: z.string(),
	head_index: z.number(),
	playlist_name: z.string(),
	playlist_path: z.string(),
})

export const set_named_autostart_playlist = z.object({
	orchestration: z.string(),
	head_index: z.number(),
	playlist_name: z.string(),
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
	orchestration: z.string(),
	name: z.string(),
	id: z.number(),
	index: z.number(),
	uri: z.string(),
	focus: z.number(),
	rows: z.number(),
	cols: z.number(),
	aspect: z.number(),
	view_count: z.number(),
	isRGBD: z.union([z.literal(0), z.literal(1)]),
	depth_loc: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]).optional(),
	depth_inversion: z.union([z.literal(0), z.literal(1)]).optional(),
	chroma_depth: z.union([z.literal(0), z.literal(1)]).optional(),
	depthiness: z.number().optional(),
	zoom: z.number().optional(),
	tag: z.string().optional(),
})

export type update_playlist_entry = {
	orchestration: string
	playlistName: string
	playlistIndex: number
} & {
	[K in keyof HologramParamMap]?: `${K}: ${HologramParamMap[K]}`
}

export type update_current_entry = {
	orchestration: string
	name: string
} & {
	[K in keyof HologramParamMap]?: `${K}: ${HologramParamMap[K]}`
}

export const play_playlist = z.object({
	orchestration: z.string(),
	name: z.string(),
	head_index: z.number(),
})

export const transport_control_play = z.object({
	orchestration: z.string(),
})

export const transport_control_pause = z.object({
	orchestration: z.string(),
})

export const transport_control_next = z.object({
	orchestration: z.string(),
})

export const transport_control_previous = z.object({
	orchestration: z.string(),
})

export const transport_control_seek_to_index = z.object({
	orchestration: z.string(),
	index: z.number(),
})
