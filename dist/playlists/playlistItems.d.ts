import { z } from "zod";
import { HologramType, QuiltHologram, RGBDHologram } from "../components/hologram";
import { insert_playlist_entry } from "../schemas/schema.requests";
export interface PlaylistItemArgs {
    orchestration: string;
    name: string;
    index: number;
    tag: string | undefined;
    id: string;
    uri: string;
    rows: number;
    cols: number;
    aspect: number;
    view_count: number;
    durationMS: number;
    isRGBD: 0 | 1;
    depth_loc: 0 | 1 | 2 | 3;
    depth_inversion: 0 | 1;
    chroma_depth: 0 | 1;
    depthiness: number;
    crop_pos_x: number | undefined;
    crop_pos_y: number | undefined;
    zoom: number;
}
/**Playist items are what we actually end up sending to Bridge.
 * These are managed by the Playlist class, and should not be called externally.
 * We take the hologram object the user creates and prepare it to be added to a playlist with the toBridge function. */
declare class PlaylistItem {
    orchestration: string;
    hologram: HologramType;
    id: number;
    index: number;
    playlistName: string;
    tag: string | undefined;
    constructor(args: {
        hologram: HologramType;
        id: number;
        index: number;
        playlistName: string;
        orchestration: string;
    });
    toBridge(): z.infer<typeof insert_playlist_entry> | never;
}
export declare class QuiltPlaylistItem extends PlaylistItem {
    constructor(args: {
        hologram: QuiltHologram;
        id: number;
        index: number;
        playlistName: string;
        orchestration: string;
    });
}
export declare class RGBDPlaylistItem extends PlaylistItem {
    constructor(args: {
        hologram: RGBDHologram;
        id: number;
        index: number;
        playlistName: string;
        orchestration: string;
    });
}
export {};
