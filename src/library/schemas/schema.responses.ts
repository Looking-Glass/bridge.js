import { z } from "zod"
import * as schema from "./schema"

// possible types that can be returned by bridge.

export const version = z.object({
	name: schema.name,
	// the payload value is unique to each bridge response.
	payload: schema.wstring,
	status: schema.status,
})

export const orchestration = z.object({
	name: schema.name,
	payload: z.object({
		name: schema.name,
		type: schema.wstring,
		value: z.string(),
	}),
	status: schema.status,
})

export const play_playlist = z.object({
	name: schema.name,
	orchestration: orchestration,
	payload: z.object({
		name: schema.name,
		type: schema.variant_map,
		value: z.object({
			id: schema.wstring.optional(),
			message: schema.wstring,
		}),
	}),
	status: schema.status,
})

export const instance_playlist = z.object({
	name: schema.name,
	orchestration: orchestration,
	payload: z.object({
		name: schema.name,
		type: schema.variant_map,
		value: z.object({
			name: schema.wstring,
		}),
	}),
	status: schema.status,
})

export const insert_playlist_entry = z.object({
	name: schema.name,
	orchestration: orchestration,
	payload: z.object({
		name: schema.name,
		type: schema.variant_map,
		value: z.object({
			index: schema.wstring,
		}),
	}),
	status: schema.status,
})

export const delete_playlist = z.object({
	name: schema.name,
	orchestration: orchestration,
	payload: z.object({
		name: schema.name,
		type: schema.variant_map,
		value: z.object({
			name: schema.wstring,
		}),
	}),
	status: schema.status,
})

export const show_window = z.object({
	name: schema.name,
	orchestration: orchestration,
	status: schema.status,
})

const displayItem = z.object({
	name: schema.name,
	type: schema.variant_map,
	value: z.object({
		calibration: schema.wstring,
		defaultQuilt: schema.wstring,
		hardwareVersion: schema.wstring,
		hwid: schema.wstring,
		index: schema.unsigned_int,
		state: schema.wstring,
		windowCoords: z.object({
			name: schema.name,
			type: schema.int2,
			value: z.object({
				x: z.number(),
				y: z.number(),
			}),
		}),
	}),
})

export const available_output_devices = z.object({
	name: schema.name,
	orchestration: orchestration,
	payload: z.object({
		name: schema.name,
		type: schema.variant_map,
		value: z.record(displayItem).optional(),
	}),
	status: schema.status,
})

export const instance_studio_playlist = z.object({
	name: schema.name,
	orchestration: orchestration,
	payload: z.object({
		name: schema.name,
		type: schema.variant_map,
		value: z.object({
			name: schema.wstring,
		}),
	}),
	status: schema.status,
})

export const update_playlist_entry = z.object({
	name: schema.name,
	orchestration: orchestration,
	status: schema.status,
})

export const update_current_entry = z.object({
	name: schema.name,
	orchestration: orchestration,
	status: schema.status,
})

export const get_autostart_playlist = z.object({
	name: schema.name,
	orchestration: orchestration,
	payload: z.object({
		name: schema.name,
		type: schema.variant_map,
		value: z.object({
			playlist_name: schema.wstring,
			playlist_path: schema.wstring,
		}),
	}),
	status: schema.status,
})

export const set_autostart_playlist = z.object({
	name: schema.name,
	orchestration: orchestration,
	payload: z.object({
		name: schema.name,
		type: schema.variant_map,
		value: z.object({
			playlist_name: schema.wstring,
		}),
	}),
	status: schema.status,
})

export const set_named_autostart_playlist = z.object({
	name: schema.name,
	orchestration: orchestration,
	payload: z.object({
		name: schema.name,
		type: schema.variant_map,
		value: z.object({
			playlist_name: schema.wstring,
		}),
	}),
	status: schema.status,
})

export const transport_control_play = z.object({
	name: schema.name,
	orchestration: orchestration,
	status: schema.status,
})

export const transport_control_pause = z.object({
	name: schema.name,
	orchestration: orchestration,
	status: schema.status,
})

export const transport_control_next = z.object({
	name: schema.name,
	orchestration: orchestration,
	status: schema.status,
})

export const transport_control_previous = z.object({
	name: schema.name,
	orchestration: orchestration,
	status: schema.status,
})

export const transport_control_seek_to_index = z.object({
	name: schema.name,
	orchestration: orchestration,
	status: schema.status,
})
