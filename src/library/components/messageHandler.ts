import { BridgeClient } from ".."
import { BridgeEventMap } from "../schemas/schema.events"

export abstract class MessageHandler<E extends keyof BridgeEventMap> {
	public bridgeEventName: E
	public client: BridgeClient

	constructor(args: { bridgeEventName: E; client: BridgeClient }) {
		this.bridgeEventName = args.bridgeEventName
		this.client = args.client
		this.client.addEventListener(this.bridgeEventName, this.handle.bind(this))
	}

	abstract handle(message: BridgeEventMap[E]): void
}

export class MonitorConnectedMessageHandler extends MessageHandler<"Monitor Connect"> {
	constructor(args: { client: BridgeClient }) {
		super({ bridgeEventName: "Monitor Connect", client: args.client })
	}

	handle(message: BridgeEventMap["Monitor Connect"]): void {
		this.client.log("%c Monitor Connect ", "color: aqua; font-weight: bold; border: solid;", message)
	}
}

export class MonitorDisconnectedMessageHandler extends MessageHandler<"Monitor Disconnect"> {
	constructor(args: { client: BridgeClient }) {
		super({ bridgeEventName: "Monitor Disconnect", client: args.client })
	}

	handle(message: BridgeEventMap["Monitor Disconnect"]): void {
		this.client.log("%c Monitor Disconnect ", "color: aqua; font-weight: bold; border: solid;", message)
	}
}

export class TransportControlPauseMessageHandler extends MessageHandler<"Transport Control Pause"> {
	constructor(args: { client: BridgeClient }) {
		super({ bridgeEventName: "Transport Control Pause", client: args.client })
	}

	handle(message: BridgeEventMap["Transport Control Pause"]): void {
		this.client.log("%c Transport Control Pause ", "color: aqua; font-weight: bold; border: solid;", message)
	}
}

export class TransportControlPlayMessageHandler extends MessageHandler<"Transport Control Play"> {
	constructor(args: { client: BridgeClient }) {
		super({ bridgeEventName: "Transport Control Play", client: args.client })
	}

	handle(message: BridgeEventMap["Transport Control Play"]): void {
		this.client.log("%c Transport Control Play ", "color: aqua; font-weight: bold; border: solid;", message)
	}
}

export class TransportControlNextMessageHandler extends MessageHandler<"Transport Control Next"> {
	constructor(args: { client: BridgeClient }) {
		super({ bridgeEventName: "Transport Control Next", client: args.client })
	}

	handle(message: BridgeEventMap["Transport Control Next"]): void {
		this.client.log("%c Transport Control Next ", "color: aqua; font-weight: bold; border: solid;", message)
	}
}

export class TransportControlPreviousMessageHandler extends MessageHandler<"Transport Control Previous"> {
	constructor(args: { client: BridgeClient }) {
		super({ bridgeEventName: "Transport Control Previous", client: args.client })
	}

	handle(message: BridgeEventMap["Transport Control Previous"]): void {
		this.client.log(
			"%c Transport Control Previous ",
			"color: aqua; font-weight: bold; border: solid;",
			message
		)
	}
}

export class ProgressStartMessageHandler extends MessageHandler<"Progress Start"> {
	constructor(args: { client: BridgeClient }) {
		super({ bridgeEventName: "Progress Start", client: args.client })
	}

	handle(message: BridgeEventMap["Progress Start"]): void {
		this.client.log("%c Progress Start ", "color: aqua; font-weight: bold; border: solid;", message)
	}
}

export class ProgressCompletionMessageHandler extends MessageHandler<"Progress Completion"> {
	constructor(args: { client: BridgeClient }) {
		super({ bridgeEventName: "Progress Completion", client: args.client })
	}

	handle(message: BridgeEventMap["Progress Completion"]): void {
		this.client.log(message)
	}
}

export class ProgressUpdateMessageHandler extends MessageHandler<"Progress Update"> {
	constructor(args: { client: BridgeClient }) {
		super({ bridgeEventName: "Progress Update", client: args.client })
	}

	handle(message: BridgeEventMap["Progress Update"]): void {
		this.client.log(
			"%c Progress Update ",
			"color: aqua; font-weight: bold; border: solid;",
			message.payload.value.progress_type,
			message.payload.value.progress.value
		)
	}
}

export class PlaylistInstanceMessageHandler extends MessageHandler<"Playlist Instance"> {
	constructor(args: { client: BridgeClient }) {
		super({ bridgeEventName: "Playlist Instance", client: args.client })
	}

	handle(message: BridgeEventMap["Playlist Instance"]): void {
		this.client.log("%c Playlist Instance ", "color: aqua; font-weight: bold; border: solid;", message)
	}
}

export class PlaylistInsertMessageHandler extends MessageHandler<"Playlist Insert"> {
	constructor(args: { client: BridgeClient }) {
		super({ bridgeEventName: "Playlist Insert", client: args.client })
	}

	handle(message: BridgeEventMap["Playlist Insert"]): void {
		this.client.log("%c Playlist Insert ", "color: aqua; font-weight: bold; border: solid;", message)
	}
}

export class PlaylistDeleteMessageHandler extends MessageHandler<"Playlist Delete"> {
	constructor(args: { client: BridgeClient }) {
		super({ bridgeEventName: "Playlist Delete", client: args.client })
	}

	handle(message: BridgeEventMap["Playlist Delete"]): void {
		this.client.log("%c Playlist Delete ", "color: aqua; font-weight: bold; border: solid;", message)
	}
}

export class SyncPlayPlaylistMessageHandler extends MessageHandler<"Sync/Play Playlist"> {
	constructor(args: { client: BridgeClient }) {
		super({ bridgeEventName: "Sync/Play Playlist", client: args.client })
	}

	handle(message: BridgeEventMap["Sync/Play Playlist"]): void {
		this.client.log(message)
	}
}

export class SyncPlayPlaylistCompleteMessageHandler extends MessageHandler<"Sync/Play Playlist Complete"> {
	constructor(args: { client: BridgeClient }) {
		super({ bridgeEventName: "Sync/Play Playlist Complete", client: args.client })
	}

	handle(message: BridgeEventMap["Sync/Play Playlist Complete"]): void {
		this.client.log(message)
	}
}

export class SyncPlayPlaylistCancelledMessageHandler extends MessageHandler<"Sync/Play Playlist Cancelled"> {
	constructor(args: { client: BridgeClient }) {
		super({ bridgeEventName: "Sync/Play Playlist Cancelled", client: args.client })
	}

	handle(message: BridgeEventMap["Sync/Play Playlist Cancelled"]): void {
		this.client.log(message)
	}
}

export class NewItemPlayingMessageHandler extends MessageHandler<"New Item Playing"> {
	constructor(args: { client: BridgeClient }) {
		super({ bridgeEventName: "New Item Playing", client: args.client })
	}

	handle(message: BridgeEventMap["New Item Playing"]): void {
		this.client.log("%c New Item Playing ", "color: aqua; font-weight: bold; border: solid;", message)

		let index = this.client.currentPlaylistIndex
		let playlistName = this.client.playlists?.[index]?.name
		let playlistItemIndex = this.client.currentPlaylistItemIndex

		if (
			message.payload.value.playlist_name.value == playlistName &&
			message.payload.value.index.value == playlistItemIndex
		) {
			this.client.isCastPending = false
		}
	}
}

export class AllEventsMessageHandler extends MessageHandler<keyof BridgeEventMap> {
	constructor(args: { client: BridgeClient }) {
		super({ bridgeEventName: "All Events", client: args.client })
	}

	handle(message: BridgeEventMap["All Events"]): void {
		
		if (message.payload.value.event.value ==="Progress Update") return

		this.client.log(`%c ${message.payload.value.event.value}`, "color: BlueViolet; font-weight: bold; border: solid;", message)
	}
}
