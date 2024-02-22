/**
 * provide a fallback in case we're unable to connect to bridge.
 * This class uses HoloPlay Core to see if the older API endpoint used in HoloPlay Service is available.
 */
export declare class Fallback {
    private holoPlayClient;
    ws: WebSocket;
    versionPromise: Promise<string> | string;
    constructor();
    messageCallback(message: any): Promise<void>;
    getLegacyVersion(): Promise<string>;
    errorCallback(): void;
}
