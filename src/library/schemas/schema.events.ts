import { z } from "zod"
import * as schema from "./schema"
import { orchestration } from "./schema.responses"

const MonitorConnect = "Monitor Connect"
const MonitorDisconnect = "Monitor Disconnect"
// const ProgressStart = "Progress Start"
// const ProgressCompletion = "Progress Completion"
const ProgressUpdate = "Progress Update"
const PlaylistInstance = "Playlist Instance"
const PlaylistInsert = "Playlist Insert"
const PlaylistDelete = "Playlist Delete"
// const SyncPlayPlaylist = "Sync/Play Playlist"
// const SyncPlayPlaylistComplete = "Sync/Play Playlist Complete"
// const SyncPlayPlaylistCancelled = "Sync/Play Playlist Cancelled"
const TransportControlPause = "Transport Control Pause"
const TransportControlPlay = "Transport Control Play"
const TransportControlNext = "Transport Control Next"
const TransportControlPrevious = "Transport Control Previous"
const NewItemPlaying = "New Item Playing"

type EventType =
	| "Monitor Connect"
	| "Monitor Disconnect"
	// | "Progress Start"
	// | "Progress Completion"
	| "Progress Update"
	| "Playlist Instance"
	| "Playlist Insert"
	| "Playlist Delete"
	// | "Sync/Play Playlist"
	// | "Sync/Play Playlist Complete"
	// | "Sync/Play Playlist Cancelled"
	| "Transport Control Pause"
	| "Transport Control Play"
	| "Transport Control Next"
	| "Transport Control Previous"
	| "New Item Playing"

const event = (e: EventType) =>
	z.object({
		name: schema.name,
		type: schema.wstring,
		value: z.literal(e),
	})

const monitorConnected = z.object({
	event: event(MonitorConnect),
	head_index: schema.unsigned_int,
	height: schema.unsigned_int,
	hw: schema.wstring,
	hw_long_name: schema.wstring,
	hw_short_name: schema.wstring,
	made_by_looking_glass: schema.wstring,
	message: schema.wstring,
	name: schema.wstring,
	width: schema.unsigned_int,
	x: schema.int,
	y: schema.int,
})

const monitorDisconnected = z.object({
	event: event(MonitorDisconnect),
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
	event: event(ProgressUpdate),
	message: schema.wstring,
	progress: schema.float,
	progress_type: schema.wstring,
})

const insertPlaylist = z.object({
	event: event(PlaylistInsert),
	index: schema.unsigned_int,
	message: schema.wstring,
	uri: schema.wstring,
})

const playlistInstance = z.object({
	event: event(PlaylistInstance),
	message: schema.wstring,
	name: schema.wstring,
})

const deletePlaylist = z.object({
	event: event(PlaylistDelete),
	message: schema.wstring,
	name: schema.wstring,
})

const transportControlEvent = z.object({
	event: z.union([
		event(TransportControlPause),
		event(TransportControlPlay),
		event(TransportControlNext),
		event(TransportControlPrevious),
	]),
	message: schema.wstring,
	name: schema.wstring,
})

const newItemPlaying = z.object({
	event: event(NewItemPlaying),
	index: schema.unsigned_int,
	playlist_name: schema.wstring,
})

/**
 * events contain the same payload structure, up until the value of the payload
 * this is a helper type to make it easier to define the payload of each event
 */
const PayloadResponse = <T extends z.ZodType<any, any>>(valueSchema: T) =>
	z.object({
		name: schema.name,
		orchestration: orchestration,
		payload: z.object({
			name: schema.name,
			type: schema.variant_map,
			value: valueSchema,
		}),
		status: schema.status,
	})

export const monitorConnectResponse = PayloadResponse(monitorConnected)
export const monitorDisconnectResponse = PayloadResponse(monitorDisconnected)
export const progressUpdateResponse = PayloadResponse(progressUpdate)
export const insertPlaylistResponse = PayloadResponse(insertPlaylist)
export const instancePlaylistResponse = PayloadResponse(playlistInstance)
export const deletePlaylistResponse = PayloadResponse(deletePlaylist)
export const transportControlResponse = PayloadResponse(transportControlEvent)
export const newItemPlayingResponse = PayloadResponse(newItemPlaying)

// export const all_events = z.union([monitorConnectResponse, progressUpdateResponse])

export type BridgeEventMap = {
	"Monitor Connect": z.infer<typeof monitorConnectResponse>
	"Monitor Disconnect": z.infer<typeof monitorDisconnectResponse>
	"Progress Start": z.infer<typeof progressUpdateResponse>
	"Progress Completion": z.infer<typeof progressUpdateResponse>
	"Progress Update": z.infer<typeof progressUpdateResponse>
	"Playlist Instance": z.infer<typeof instancePlaylistResponse>
	"Playlist Insert": z.infer<typeof insertPlaylistResponse>
	"Playlist Delete": z.infer<typeof deletePlaylistResponse>
	"Sync/Play Playlist": z.infer<typeof progressUpdateResponse>
	"Sync/Play Playlist Complete": z.infer<typeof progressUpdateResponse>
	"Sync/Play Playlist Cancelled": z.infer<typeof progressUpdateResponse>
	"Transport Control Pause": z.infer<typeof transportControlResponse>
	"Transport Control Play": z.infer<typeof transportControlResponse>
	"Transport Control Next": z.infer<typeof transportControlResponse>
	"Transport Control Previous": z.infer<typeof transportControlResponse>
	"New Item Playing": z.infer<typeof newItemPlayingResponse>
	// "All Events": all_events,
	/**CUSTOM CLIENT EVENTS BELOW THESE ARE NOT PART OF BRIDGE */
	"Bridge Connected": z.infer<typeof progressUpdateResponse>
	"Bridge Disconnected": z.infer<typeof progressUpdateResponse>
}

export type BridgeEventKey = keyof BridgeEventMap
