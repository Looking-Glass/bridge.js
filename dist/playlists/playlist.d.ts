import { HologramType } from "../components/hologram";
import { RGBDPlaylistItem, QuiltPlaylistItem } from "./playlistItems";
export type PlaylistItemType = QuiltPlaylistItem | RGBDPlaylistItem;
export interface PlaylistType {
    name: string;
    loop: boolean;
    items: PlaylistItemType[];
}
export interface getPlayPlaylistJsonArgs {
    orchestration: string;
    head: number;
}
export interface PlaylistArgs {
    /** display */
    head?: number;
}
/**
 * Playlist class
 * @class
 *
 */
export declare class Playlist {
    name: string;
    loop: boolean;
    items: PlaylistItemType[];
    orchestration: string;
    constructor(args: {
        name: string;
        loop: boolean;
        items?: HologramType[];
        orchestration: string;
    });
    setName(name: string): void;
    addItem(hologram: HologramType): PlaylistItemType | undefined;
    addPlaylistItemToBridge(item: PlaylistItemType): Promise<boolean>;
    removeItem(item: PlaylistItemType): void;
    clearItems(): void;
    /**
     * gets the object for the current playlist that is currently being played
     * @param orchestration
     * @param head
     * @returns
     */
    getCurrent({ orchestration, head }: getPlayPlaylistJsonArgs): {
        orchestration: string;
        name: string;
        head_index: number;
    };
    /**
     * create the json object for the playlist instance
     * @param orchestration
     * @returns
     */
    getInstance(orchestration: string): {
        orchestration: string;
        name: string;
        loop: boolean;
    };
    /**
     * this function will play a playlist on a Looking Glass display
     * the playlist must be created and populated with content before calling this function
     * @param playlist
     * @param head
     * @returns
     */
    play({ head }?: PlaylistArgs): Promise<boolean>;
}
