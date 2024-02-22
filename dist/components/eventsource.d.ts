import { BridgeEventMap } from "../schemas/schema.events";
export type MessageHandlerType = {
    [event in keyof BridgeEventMap]?: ((payload: BridgeEventMap[event]) => void)[];
};
/**
 * Attempt to establish a connection to Looking Glass Bridge's websocket connection.
 * the websocket connection will send events from Bridge to the client.
 * @param orchestration
 * @returns
 */
export declare class BridgeEventSource {
    eventSource: any;
    MessageHandler: MessageHandlerType;
    ws: WebSocket | undefined;
    constructor();
    /**
     * adds a new message handler object to the BridgeEventSource class
     * @param event the event name to listen for
     * @param MessageHandler the function to call when the event is received
     */
    addMessageHandler<K extends keyof BridgeEventMap>({ event, MessageHandler, }: {
        event: K;
        MessageHandler: (payload: BridgeEventMap[K]) => void;
    }): void;
    removeMessageHandler<K extends keyof BridgeEventMap>({ event, MessageHandler, }: {
        event: K;
        MessageHandler: (payload: BridgeEventMap[K]) => void;
    }): void;
    private callMessageHandler;
    connectEvent(): void;
    disconnectEvent(): void;
    connectToBridgeEventSource(orchestration: string): Promise<{
        success: boolean;
    }>;
}
