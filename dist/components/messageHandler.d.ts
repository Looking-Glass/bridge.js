import { BridgeClient } from "..";
import { BridgeEventMap } from "../schemas/schema.events";
export declare abstract class MessageHandler<E extends keyof BridgeEventMap> {
    bridgeEventName: E;
    client: BridgeClient;
    constructor(args: {
        bridgeEventName: E;
        client: BridgeClient;
    });
    abstract handle(message: BridgeEventMap[E]): void;
}
export declare class MonitorConnectedMessageHandler extends MessageHandler<"Monitor Connect"> {
    constructor(args: {
        client: BridgeClient;
    });
    handle(message: BridgeEventMap["Monitor Connect"]): void;
}
export declare class MonitorDisconnectedMessageHandler extends MessageHandler<"Monitor Disconnect"> {
    constructor(args: {
        client: BridgeClient;
    });
    handle(message: BridgeEventMap["Monitor Disconnect"]): void;
}
export declare class TransportControlPauseMessageHandler extends MessageHandler<"Transport Control Pause"> {
    constructor(args: {
        client: BridgeClient;
    });
    handle(message: BridgeEventMap["Transport Control Pause"]): void;
}
export declare class TransportControlPlayMessageHandler extends MessageHandler<"Transport Control Play"> {
    constructor(args: {
        client: BridgeClient;
    });
    handle(message: BridgeEventMap["Transport Control Play"]): void;
}
export declare class TransportControlNextMessageHandler extends MessageHandler<"Transport Control Next"> {
    constructor(args: {
        client: BridgeClient;
    });
    handle(message: BridgeEventMap["Transport Control Next"]): void;
}
export declare class TransportControlPreviousMessageHandler extends MessageHandler<"Transport Control Previous"> {
    constructor(args: {
        client: BridgeClient;
    });
    handle(message: BridgeEventMap["Transport Control Previous"]): void;
}
export declare class ProgressStartMessageHandler extends MessageHandler<"Progress Start"> {
    constructor(args: {
        client: BridgeClient;
    });
    handle(message: BridgeEventMap["Progress Start"]): void;
}
export declare class ProgressCompletionMessageHandler extends MessageHandler<"Progress Completion"> {
    constructor(args: {
        client: BridgeClient;
    });
    handle(message: BridgeEventMap["Progress Completion"]): void;
}
export declare class ProgressUpdateMessageHandler extends MessageHandler<"Progress Update"> {
    constructor(args: {
        client: BridgeClient;
    });
    handle(message: BridgeEventMap["Progress Update"]): void;
}
export declare class PlaylistInstanceMessageHandler extends MessageHandler<"Playlist Instance"> {
    constructor(args: {
        client: BridgeClient;
    });
    handle(message: BridgeEventMap["Playlist Instance"]): void;
}
export declare class PlaylistInsertMessageHandler extends MessageHandler<"Playlist Insert"> {
    constructor(args: {
        client: BridgeClient;
    });
    handle(message: BridgeEventMap["Playlist Insert"]): void;
}
export declare class PlaylistDeleteMessageHandler extends MessageHandler<"Playlist Delete"> {
    constructor(args: {
        client: BridgeClient;
    });
    handle(message: BridgeEventMap["Playlist Delete"]): void;
}
export declare class SyncPlayPlaylistMessageHandler extends MessageHandler<"Sync/Play Playlist"> {
    constructor(args: {
        client: BridgeClient;
    });
    handle(message: BridgeEventMap["Sync/Play Playlist"]): void;
}
export declare class SyncPlayPlaylistCompleteMessageHandler extends MessageHandler<"Sync/Play Playlist Complete"> {
    constructor(args: {
        client: BridgeClient;
    });
    handle(message: BridgeEventMap["Sync/Play Playlist Complete"]): void;
}
export declare class SyncPlayPlaylistCancelledMessageHandler extends MessageHandler<"Sync/Play Playlist Cancelled"> {
    constructor(args: {
        client: BridgeClient;
    });
    handle(message: BridgeEventMap["Sync/Play Playlist Cancelled"]): void;
}
export declare class NewItemPlayingMessageHandler extends MessageHandler<"New Item Playing"> {
    constructor(args: {
        client: BridgeClient;
    });
    handle(message: BridgeEventMap["New Item Playing"]): void;
}
