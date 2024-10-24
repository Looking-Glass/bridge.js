import { z } from "zod"
import * as schema from "./schema"

// possible types that can be returned by bridge.

export const version = z.object({
	name: schema.name,
	// the payload value is unique to each bridge response.
	payload: z.object({
		name: schema.name,
		type: schema.wstring,
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

const displayProblems = z.object({
	name: z.literal("displayProblems"),
	type: schema.variant_map,
	value: z.record(
		z.object({
			name: schema.name,
			type: schema.wstring,
			value: z.object({
				errorType: z.object({
					name: schema.name,
					type: schema.wstring,
					value: z.union([
						z.literal("invalidResolution"),
						z.literal("invalidScale"),
						z.literal("invalidOrientation"),
						z.literal("invalidBitDepth"),
					]),
				}),
				expectedX: z.object({
					name: schema.name,
					type: schema.float,
					value: z.number(),
				}),
				expectedY: z.object({
					name: schema.name,
					type: schema.float,
					value: z.number(),
				}).optional(),
				observeredX: z.object({
					name: schema.name,
					type: schema.float,
					value: z.number(),
				}),
				observeredY: z.object({
					name: schema.name,
					type: schema.float,
					value: z.number(),
				}).optional(),
			}),
		})
	),
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
		displayProblems: z.record(displayProblems).optional(),
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

export const instance_studio_playlist = z.object({
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

export const update_playlist_entry = z.object({
	name: schema.name,
	orchestration: z.object({
		name: schema.name,
		type: schema.wstring,
		value: z.string(),
	}),
	status: schema.status,
})

export const update_current_entry = z.object({
	name: schema.name,
	orchestration: z.object({
		name: schema.name,
		type: schema.wstring,
		value: z.string(),
	}),
	status: schema.status,
})

export const get_autostart_playlist = z.object({
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
			playlist_name: z.object({
				name: schema.name,
				type: schema.wstring,
				value: z.string(),
			}),
			playlist_path: z.object({
				name: schema.name,
				type: schema.wstring,
				value: z.string(),
			}),
		}),
	}),
	status: schema.status,
})

export const set_autostart_playlist = z.object({
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
			playlist_name: z.object({
				name: schema.name,
				type: schema.wstring,
				value: z.string(),
			}),
		}),
	}),
	status: schema.status,
})

export const set_named_autostart_playlist = z.object({
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
			playlist_name: z.object({
				name: schema.name,
				type: schema.wstring,
				value: z.string(),
			}),
		}),
	}),
	status: schema.status,
})

export const transport_control_play = z.object({
	name: schema.name,
	orchestration: z.object({
		name: schema.name,
		type: schema.wstring,
		value: z.string(),
	}),
	status: schema.status,
})

export const transport_control_pause = z.object({
	name: schema.name,
	orchestration: z.object({
		name: schema.name,
		type: schema.wstring,
		value: z.string(),
	}),
	status: schema.status,
})

export const transport_control_next = z.object({
	name: schema.name,
	orchestration: z.object({
		name: schema.name,
		type: schema.wstring,
		value: z.string(),
	}),
	status: schema.status,
})

export const transport_control_previous = z.object({
	name: schema.name,
	orchestration: z.object({
		name: schema.name,
		type: schema.wstring,
		value: z.string(),
	}),
	status: schema.status,
})

export const transport_control_seek_to_index = z.object({
	name: schema.name,
	orchestration: z.object({
		name: schema.name,
		type: schema.wstring,
		value: z.string(),
	}),
	status: schema.status,
})
