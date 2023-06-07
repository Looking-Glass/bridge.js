import { z } from "zod"

// possible types that can be returned by bridge.

// const boolean = z.literal("BOOLEAN")
// const char = z.literal("CHAR")
// const short = z.literal("SHORT")
// const unsigned_short = z.literal("UNSIGNED_SHORT")
const unsigned_int = z.literal("UNSIGNED_INT")
// const int = z.literal("INT")
// const long = z.literal("LONG")
// const float = z.literal("FLOAT")
// const double = z.literal("DOUBLE")
const int2 = z.literal("INT2")
// const int3 = z.literal("INT3")
// const int4 = z.literal("INT4")
// const float2 = z.literal("FLOAT2")
// const float3 = z.literal("FLOAT3")
// const float4 = z.literal("FLOAT4")
// const float4x4 = z.literal("FLOAT4X4")
// const string = z.literal("STRING")
const wstring = z.literal("WSTRING")
const variant_map = z.literal("VARIANT_MAP")

// possible types that can be returned by bridge' status object.
const completion = z.literal("Completion")
const unknown = z.literal("UnknownOrchestration")
const pending = z.literal("Pending")
const failure = z.literal("Failure")

const name = z.string()

export const status = z.object({
	name: name,
	type: wstring,
	value: z.union([completion, pending, failure, unknown]),
})

export const version = z.object({
	name: name,
	payload: z.object({
		name: name,
		type: wstring,
		// the payload value is unique to each bridge response.
		value: z.string(),
	}),
	status: status,
})

export const orchestration = z.object({
	name: name,
	payload: z.object({
		name: name,
		type: wstring,
		value: z.string(),
	}),
	status: status,
})

export const play_playlist = z.object({
	name: name,
	orchestration: z.object({
		name: name,
		type: wstring,
		value: z.string(),
	}),
	payload: z.object({
		name: name,
		type: variant_map,
		value: z.object({
			id: z
				.object({
					name: name,
					type: wstring,
					value: z.string(),
				})
				.optional(),
			message: z.object({
				name: name,
				type: wstring,
				value: z.string(),
			}),
		}),
	}),
	status: status,
})

export const instance_playlist = z.object({
	name: name,
	orchestration: z.object({
		name: name,
		type: wstring,
		value: z.string(),
	}),
	payload: z.object({
		name: name,
		type: variant_map,
		value: z.object({
			name: z.object({
				name: name,
				type: wstring,
				value: z.string(),
			}),
		}),
	}),
	status: status,
})

export const insert_playlist_entry = z.object({
	name: name,
	orchestration: z.object({
		name: name,
		type: wstring,
		value: z.string(),
	}),
	payload: z.object({
		name: name,
		type: variant_map,
		value: z.object({
			index: z.object({
				name: name,
				type: wstring,
				value: z.string(),
			}),
		}),
	}),
	status: status,
})

export const delete_playlist = z.object({
	name: name,
	orchestration: z.object({
		name: name,
		type: wstring,
		value: z.string(),
	}),
	payload: z.object({
		name: name,
		type: variant_map,
		value: z.object({
			name: z.object({
				name: name,
				type: wstring,
				value: z.string(),
			}),
		}),
	}),
	status: status,
})

export const show_window = z.object({
	name: name,
	orchestration: z.object({
		name: name,
		type: wstring,
		value: z.string(),
	}),
	status: status,
})

const displayItem = z.object({
	name: name,
	type: variant_map,
	value: z.object({
		calibration: z.object({
			name: name,
			type: wstring,
			value: z.string(),
		}),
		defaultQuilt: z.object({
			name: name,
			type: wstring,
			value: z.string(),
		}),
		hardwareVersion: z.object({
			name: name,
			type: wstring,
			value: z.string(),
		}),
		hwid: z.object({
			name: name,
			type: wstring,
			value: z.string(),
		}),
		index: z.object({
			name: name,
			type: unsigned_int,
			value: z.number(),
		}),
		state: z.object({
			name: name,
			type: wstring,
			value: z.string(),
		}),
		windowCoords: z.object({
			name: name,
			type: int2,
			value: z.object({
				x: z.number(),
				y: z.number(),
			}),
		}),
	}),
})

export const available_output_devices = z.object({
	name: name,
	orchestration: z.object({
		name: name,
		type: wstring,
		value: z.string(),
	}),
	payload: z.object({
		name: name,
		type: variant_map,
		value: z.record(displayItem).optional(),
	}),
	status: status,
})
