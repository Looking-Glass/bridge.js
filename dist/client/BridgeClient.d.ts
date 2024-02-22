import { Display } from "../components/displays";
import { BridgeEventSource } from "../components/eventsource";
import { Playlist } from "../playlists/playlist";
import { HologramType } from "../components/hologram";
import { BridgeEventMap } from "../schemas/schema.events";
import { HologramParamMap } from "../schemas/schema.parameters";
import * as schema from "../schemas/schema.responses";
import { z } from "zod";
import { Fallback } from "../components/fallback";
import { BridgeVersion } from "../components/types";
export declare class BridgeClient {
    /** The name of the current orchestration */
    private orchestration;
    /** A boolean that stores if the Bridge session is valid or not
     *  If the orchestration is not valid, some functions will not work
     */
    isConnected: boolean;
    /**A boolean for checking the status of the current disconnect event */
    isDisconnecting: boolean;
    /**An array containing the connected Looking Glass Displays */
    private displays;
    /**an Array containing Playlists, we store this to easily switch between multiple playlists */
    playlists: Playlist[] | undefined;
    /** The index of playlists that is currently active */
    currentPlaylistIndex: number;
    /**The index of the playlist Item that is currently active */
    currentPlaylistItemIndex: number;
    /** the instance of the client that we create, BridgeClient is a singleton, there can only be one */
    static instance: BridgeClient;
    static fallback: Fallback | undefined;
    /** The websocket connection to Bridge's Event Source, this returns information from Bridge */
    static eventsource: BridgeEventSource;
    /**control how often we log to the console, 3 is everything, 0 is nothing */
    static verbosity: 0 | 1 | 2 | 3;
    /**store if we're currently in the middle of a cast */
    isCastPending: boolean;
    /**the version of the Looking Glass Driver that's running */
    version: BridgeVersion;
    private currentHologram;
    /**a boolean for whether a disconnect was triggered automatically or manually */
    manualDisconnect: boolean;
    playState: "PLAYING" | "PAUSED" | "STOPPED";
    constructor();
    static getInstance(): BridgeClient;
    /**
     * A helper function to check and see if Looking Glass Bridge is running or not.
     * @returns boolean, true if Bridge is running, false if Bridge is not running
     */
    status(): Promise<boolean>;
    /**
     * Attempt to connect to Looking Glass Bridge.
     * @returns
     */
    connect(): Promise<{
        success: boolean;
        response: {
            version: BridgeVersion;
            orchestration: string;
        };
    }>;
    /**
     * Creates an orchestration called "default" if one does not already exist.
     * @returns string, the name of the current orchestration
     */
    createOrchestration(name: string): Promise<{
        success: boolean;
        response: null | string;
    }>;
    /**
     * Disconnect from Looking Glass Bridge, free up resources.
     */
    disconnect(): Promise<{
        success: boolean;
    }>;
    /**
     * changes the state of the Looking Glass Bridge Window
     * @param showWindow boolean, true to show the Looking Glass window, false to hide the Looking Glass window
     * @returns
     */
    showWindow(showWindow: boolean): Promise<{
        success: boolean;
        response: z.infer<typeof schema.show_window> | null;
    }>;
    /**
     * A helper function to get the version of Looking Glass Bridge that is running.
     * @returns string of the version of Looking Glass Bridge that is running
     */
    getVersion(): Promise<{
        success: boolean;
        response: BridgeVersion;
    }>;
    /**
     * A helper function to get the version of the Looking Glass Bridge API
     * @returns the current version of the Looking Glass API
     */
    apiVersion(): Promise<{
        success: boolean;
        response: BridgeVersion;
    }>;
    /**
     * QueryDisplays finds all displays that are connected to the computer,
     * searches for Looking Glass displays, and returns them as an array of Display objects
     * @returns the display object
     */
    getDisplays(): Promise<{
        success: boolean;
        response: Display[] | null;
    }>;
    /**Delete the instance of the playlist from Bridge, this will stop the playlist from playing if it's active. */
    deletePlaylist(playlist: Playlist): Promise<{
        success: boolean;
        response: z.infer<typeof schema.delete_playlist> | null;
    }>;
    /**
     * This function will allow you to cast a single hologram to the Looking Glass
     * @param hologram
     */
    cast(hologram: HologramType): Promise<{
        success: boolean;
    }>;
    getCurrentPlaylist(): Playlist | undefined;
    playRemotePlaylist(holograms: HologramType[], index?: number): Promise<{
        success: boolean;
    }>;
    /**Play a Playlist created by Looking Glass Studio, requires the full path to the playlist.json file. */
    playStudioPlaylist(playlistPath: string): Promise<{
        success: boolean;
        response: z.infer<typeof schema.play_playlist> | null;
    }>;
    /**stop playing the studio playlist */
    stopStudioPlaylist(): Promise<{
        success: boolean;
    }>;
    /**Get the current playlist that is set to start automatically */
    getAutoStartPlaylist(): Promise<{
        success: boolean;
        response: z.infer<typeof schema.get_autostart_playlist> | null;
    }>;
    /**Choose a Playlist that exists on the local file system to set as the start up playlist */
    setAutoStartPlaylist(args: {
        playlistName: string;
        playlistPath: string;
    }): Promise<{
        success: boolean;
        response: z.infer<typeof schema.set_autostart_playlist> | null;
    }>;
    /**set a playlist to auto-start, requires that all files are local on the system */
    createAutoStartPlaylist(args: {
        playlist: Playlist;
    }): Promise<{
        success: boolean;
        response: z.infer<typeof schema.set_named_autostart_playlist> | null;
    }>;
    /**Play the currently instanced playlist */
    play(): Promise<{
        success: boolean;
        response: z.infer<typeof schema.transport_control_play> | null;
    }>;
    /**Pause the currently playing playlist */
    pause(): Promise<{
        success: boolean;
        response: z.infer<typeof schema.transport_control_pause> | null;
    }>;
    /**Got to the next playlist item */
    next(): Promise<{
        success: boolean;
        response: z.infer<typeof schema.transport_control_next> | null;
    }>;
    /**Go to the previous playlist item */
    previous(): Promise<{
        success: boolean;
        response: z.infer<typeof schema.transport_control_previous> | null;
    }>;
    /**Seek to a specific item in a playlist */
    seek(index: number): Promise<{
        success: boolean;
        response: z.infer<typeof schema.transport_control_seek_to_index> | null;
    }>;
    /**
     * Connect to Looking Glass Bridge's EventSource.
     * The event source is a websocket connection that will send events from Bridge to the client.
     * @returns the bridge event source
     */
    private subscribeToEvents;
    /**
     * Adds an event listener that returns a message from Bridge's websocket based event source.
     * @param event the event to listen for
     * @param MessageHandler the function to call when the event is received
     */
    addEventListener<T extends keyof BridgeEventMap>(event: T, MessageHandler: (event: BridgeEventMap[T]) => void): Promise<void>;
    removeEventListener<T extends keyof BridgeEventMap>(event: T, MessageHandler: (event: BridgeEventMap[T]) => void): Promise<void>;
    /**Update the parameters of the current hologram */
    updateCurrentHologram<T extends keyof HologramParamMap>({ name, parameter, value, }: {
        name: string;
        parameter: T;
        value: HologramParamMap[T];
    }): Promise<{
        success: boolean;
        response: z.infer<typeof schema.update_current_entry> | null;
    }>;
    getCurrentHologram(): HologramType | undefined;
    getVerbosity(): 0 | 2 | 1 | 3;
    /**
     *Set the level of console logging that Bridge.js library will do.
     * @param verbosity 0 = no logging, 1 = errors only, 2 = only bridge values, 3 = full bridge response
     */
    setVerbosity(verbosity: 0 | 1 | 2 | 3): void;
    /**Asbtraction for logging with verbosity setting */
    log(...messages: unknown[]): void;
    /**Asbtraction for logging with verbosity setting */
    warn(...messages: unknown[]): void;
    /**Asbtraction for logging with verbosity setting */
    error(...messages: unknown[]): void;
    /**
     * helper function for determining if the version of Bridge is valid.
     * @returns boolean, true if the version is compatible, false if not
     */
    private isVersionCompatible;
}
