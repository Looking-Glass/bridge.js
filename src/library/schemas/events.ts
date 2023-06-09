import { z } from "zod"
import * as schema from "./schema"

export const BridgeEvent = z.union([
	z.literal("Monitor Connect"),
	z.literal("Monitor Disconnect"),
	z.literal("Progress Start"),
	z.literal("Progress Completion"),
	z.literal("Progress Update"),
	z.literal("Playlist Instance"),
	z.literal("Playlist Insert"),
	z.literal("Playlist Delete"),
	z.literal("Sync/Play Playlist"),
	z.literal("Sync/Play Playlist Complete"),
	z.literal("Sync/Play Playlist Cancelled"),
	// z.literal("All Events"),
])

const monitorConnected = z.object({
	event: z.object({
		name: schema.name,
		type: schema.wstring,
		value: BridgeEvent,
	}),
	head_index: z.object({
		name: schema.name,
		type: schema.unsigned_int,
		value: z.number(),
	}),
	height: z.object({
		name: schema.name,
		type: schema.unsigned_int,
		value: z.number(),
	}),
	hw: z.object({
		name: schema.name,
		type: schema.wstring,
		value: z.string(),
	}),
	hw_long_name: z.object({
		name: schema.name,
		type: schema.wstring,
		value: z.string(),
	}),
	hw_short_name: z.object({
		name: schema.name,
		type: schema.wstring,
		value: z.string(),
	}),
	made_by_looking_glass: z.object({
		name: schema.name,
		type: schema.wstring,
		value: z.string(),
	}),
	message: z.object({
		name: schema.name,
		type: schema.wstring,
		value: z.string(),
	}),
	name: z.object({
		name: schema.name,
		type: schema.wstring,
		value: z.string(),
	}),
	width: z.object({
		name: schema.name,
		type: schema.unsigned_int,
		value: z.number(),
	}),
	x: z.object({
		name: schema.name,
		type: schema.int,
		value: z.number(),
	}),
	y: z.object({
		name: schema.name,
		type: schema.int,
		value: z.number(),
	}),
})

const progressUpdate = z.object({
	event: z.object({
		name: schema.name,
		type: schema.wstring,
		value: BridgeEvent,
	}),
	message: z.object({
		name: schema.name,
		type: schema.wstring,
		value: z.string(),
	}),
	progress: z.object({
		name: schema.name,
		type: schema.float,
		value: z.number(),
	}),
	progress_type: z.object({
		name: schema.name,
		type: schema.wstring,
		value: z.string(),
	}),
})

const insertPlaylist = z.object({
	event: z.object({
		name: schema.name,
		type: schema.wstring,
		value: BridgeEvent,
	}),
	index: z.object({
		name: schema.name,
		type: schema.unsigned_int,
		value: z.number(),
	}),
	message: z.object({
		name: schema.name,
		type: schema.wstring,
		value: z.string(),
	}),
	uri: z.object({
		name: schema.name,
		type: schema.wstring,
		value: z.string(),
	}),
})

const playlistInstance = z.object({
	event: z.object({
		name: schema.name,
		type: schema.wstring,
		value: BridgeEvent,
	}),
	message: z.object({
		name: schema.name,
		type: schema.wstring,
		value: z.string(),
	}),
	name: z.object({
		name: schema.name,
		type: schema.wstring,
		value: z.string(),
	}),
})

const deletePlaylist = z.object({
	event: z.object({
		name: schema.name,
		type: schema.wstring,
		value: BridgeEvent,
	}),
	message: z.object({
		name: schema.name,
		type: schema.wstring,
		value: z.string(),
	}),
	name: z.object({
		name: schema.name,
		type: schema.wstring,
		value: z.string(),
	}),
})

/**
 * events contain the same payload structure, up until the value of the payload
 * this is a helper type to make it easier to define the payload of each event
 */
const PayloadResponse = <T extends z.ZodType<any, any>>(valueSchema: T) =>
	z.object({
		name: schema.name,
		orchestration: z.object({
			name: schema.name,
			type: schema.wstring,
			value: z.string(),
		}),
		payload: z.object({
			name: schema.name,
			type: schema.variant_map,
			value: valueSchema,
		}),
	})

export const monitorConnectResponse = PayloadResponse(monitorConnected)
export const progressUpdateResponse = PayloadResponse(progressUpdate)
export const insertPlaylistResponse = PayloadResponse(insertPlaylist)
export const instancePlaylistResponse = PayloadResponse(playlistInstance)
export const deletePlaylistResponse = PayloadResponse(deletePlaylist)

// export const all_events = z.union([monitorConnectResponse, progressUpdateResponse])

export type BridgeEventMap = {
	"Monitor Connect": z.infer<typeof monitorConnectResponse>
	"Monitor Disconnect": z.infer<typeof progressUpdateResponse>
	"Progress Start": z.infer<typeof progressUpdateResponse>
	"Progress Completion": z.infer<typeof progressUpdateResponse>
	"Progress Update": z.infer<typeof progressUpdateResponse>
	"Playlist Instance": z.infer<typeof instancePlaylistResponse>
	"Playlist Insert": z.infer<typeof insertPlaylistResponse>
	"Playlist Delete": z.infer<typeof deletePlaylistResponse>
	"Sync/Play Playlist": z.infer<typeof progressUpdateResponse>
	"Sync/Play Playlist Complete": z.infer<typeof progressUpdateResponse>
	"Sync/Play Playlist Cancelled": z.infer<typeof progressUpdateResponse>
	// "All Events": all_events,
}

export type BridgeEventKey = keyof BridgeEventMap
