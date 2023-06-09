import { z } from "zod"
import * as schema from "./schema"

// possible types that can be returned by bridge.

export const version = z.object({
	name: schema.name,
	payload: z.object({
		name: schema.name,
		type: schema.wstring,
		// the payload value is unique to each bridge response.
		value: z.string(),
	}),
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
	orchestration: z.object({
		name: schema.name,
		type: schema.wstring,
		value: z.string(),
	}),
	payload: z.object({
		name: schema.name,
		type: schema.variant_map,
		value: z.object({
			id: z
				.object({
					name: schema.name,
					type: schema.wstring,
					value: z.string(),
				})
				.optional(),
			message: z.object({
				name: schema.name,
				type: schema.wstring,
				value: z.string(),
			}),
		}),
	}),
	status: schema.status,
})

export const instance_playlist = z.object({
	name: schema.name,
	orchestration: z.object({
		name: schema.name,
		type: schema.wstring,
		value: z.string(),
	}),
	payload: z.object({
		name: schema.name,
		type: schema.variant_map,
		value: z.object({
			name: z.object({
				name: schema.name,
				type: schema.wstring,
				value: z.string(),
			}),
		}),
	}),
	status: schema.status,
})

export const insert_playlist_entry = z.object({
	name: schema.name,
	orchestration: z.object({
		name: schema.name,
		type: schema.wstring,
		value: z.string(),
	}),
	payload: z.object({
		name: schema.name,
		type: schema.variant_map,
		value: z.object({
			index: z.object({
				name: schema.name,
				type: schema.wstring,
				value: z.string(),
			}),
		}),
	}),
	status: schema.status,
})

export const delete_playlist = z.object({
	name: schema.name,
	orchestration: z.object({
		name: schema.name,
		type: schema.wstring,
		value: z.string(),
	}),
	payload: z.object({
		name: schema.name,
		type: schema.variant_map,
		value: z.object({
			name: z.object({
				name: schema.name,
				type: schema.wstring,
				value: z.string(),
			}),
		}),
	}),
	status: schema.status,
})

export const show_window = z.object({
	name: schema.name,
	orchestration: z.object({
		name: schema.name,
		type: schema.wstring,
		value: z.string(),
	}),
	status: schema.status,
})

const displayItem = z.object({
	name: schema.name,
	type: schema.variant_map,
	value: z.object({
		calibration: z.object({
			name: schema.name,
			type: schema.wstring,
			value: z.string(),
		}),
		defaultQuilt: z.object({
			name: schema.name,
			type: schema.wstring,
			value: z.string(),
		}),
		hardwareVersion: z.object({
			name: schema.name,
			type: schema.wstring,
			value: z.string(),
		}),
		hwid: z.object({
			name: schema.name,
			type: schema.wstring,
			value: z.string(),
		}),
		index: z.object({
			name: schema.name,
			type: schema.unsigned_int,
			value: z.number(),
		}),
		state: z.object({
			name: schema.name,
			type: schema.wstring,
			value: z.string(),
		}),
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
	orchestration: z.object({
		name: schema.name,
		type: schema.wstring,
		value: z.string(),
	}),
	payload: z.object({
		name: schema.name,
		type: schema.variant_map,
		value: z.record(displayItem).optional(),
	}),
	status: schema.status,
})
