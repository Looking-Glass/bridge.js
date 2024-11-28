import { z } from "zod";
import { HologramParamMap } from "./schema.parameters";
export declare const version: z.ZodObject<{}, "strict", z.ZodTypeAny, {}, {}>;
export declare const orchestration: z.ZodObject<{}, "strict", z.ZodTypeAny, {}, {}>;
export declare const show_window: z.ZodObject<{
    orchestration: z.ZodString;
    show_window: z.ZodBoolean;
    head_index: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    orchestration: string;
    show_window: boolean;
    head_index: number;
}, {
    orchestration: string;
    show_window: boolean;
    head_index: number;
}>;
export declare const instance_studio_playlist: z.ZodObject<{
    orchestration: z.ZodString;
    name: z.ZodString;
    playlist_path: z.ZodString;
    loop: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    orchestration: string;
    name: string;
    playlist_path: string;
    loop: boolean;
}, {
    orchestration: string;
    name: string;
    playlist_path: string;
    loop: boolean;
}>;
export declare const get_autostart_playlist: z.ZodObject<{
    orchestration: z.ZodString;
    head_index: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    orchestration: string;
    head_index: number;
}, {
    orchestration: string;
    head_index: number;
}>;
export declare const set_autostart_playlist: z.ZodObject<{
    orchestration: z.ZodString;
    head_index: z.ZodNumber;
    playlist_name: z.ZodString;
    playlist_path: z.ZodString;
}, "strip", z.ZodTypeAny, {
    orchestration: string;
    playlist_name: string;
    playlist_path: string;
    head_index: number;
}, {
    orchestration: string;
    playlist_name: string;
    playlist_path: string;
    head_index: number;
}>;
export declare const set_named_autostart_playlist: z.ZodObject<{
    orchestration: z.ZodString;
    head_index: z.ZodNumber;
    playlist_name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    orchestration: string;
    playlist_name: string;
    head_index: number;
}, {
    orchestration: string;
    playlist_name: string;
    head_index: number;
}>;
export declare const available_output_devices: z.ZodObject<{
    orchestration: z.ZodString;
}, "strip", z.ZodTypeAny, {
    orchestration: string;
}, {
    orchestration: string;
}>;
export declare const delete_playlist: z.ZodObject<{
    orchestration: z.ZodString;
    name: z.ZodString;
    loop: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    orchestration: string;
    name: string;
    loop: boolean;
}, {
    orchestration: string;
    name: string;
    loop: boolean;
}>;
export declare const instance_playlist: z.ZodObject<{
    orchestration: z.ZodString;
    name: z.ZodString;
    loop: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    orchestration: string;
    name: string;
    loop: boolean;
}, {
    orchestration: string;
    name: string;
    loop: boolean;
}>;
export declare const insert_playlist_entry: z.ZodObject<{
    orchestration: z.ZodString;
    name: z.ZodString;
    id: z.ZodNumber;
    index: z.ZodNumber;
    uri: z.ZodString;
    focus: z.ZodNumber;
    rows: z.ZodNumber;
    cols: z.ZodNumber;
    aspect: z.ZodNumber;
    view_count: z.ZodNumber;
    crop_pos_x: z.ZodNumber;
    crop_pos_y: z.ZodNumber;
    isRGBD: z.ZodUnion<[z.ZodLiteral<0>, z.ZodLiteral<1>]>;
    depth_loc: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>]>>;
    depth_inversion: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<0>, z.ZodLiteral<1>]>>;
    chroma_depth: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<0>, z.ZodLiteral<1>]>>;
    depthiness: z.ZodOptional<z.ZodNumber>;
    zoom: z.ZodOptional<z.ZodNumber>;
    tag: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    orchestration: string;
    name: string;
    id: number;
    index: number;
    focus: number;
    aspect: number;
    cols: number;
    rows: number;
    crop_pos_x: number;
    crop_pos_y: number;
    uri: string;
    view_count: number;
    isRGBD: 0 | 1;
    zoom?: number | undefined;
    depth_loc?: 0 | 2 | 1 | 3 | undefined;
    depth_inversion?: 0 | 1 | undefined;
    chroma_depth?: 0 | 1 | undefined;
    depthiness?: number | undefined;
    tag?: string | undefined;
}, {
    orchestration: string;
    name: string;
    id: number;
    index: number;
    focus: number;
    aspect: number;
    cols: number;
    rows: number;
    crop_pos_x: number;
    crop_pos_y: number;
    uri: string;
    view_count: number;
    isRGBD: 0 | 1;
    zoom?: number | undefined;
    depth_loc?: 0 | 2 | 1 | 3 | undefined;
    depth_inversion?: 0 | 1 | undefined;
    chroma_depth?: 0 | 1 | undefined;
    depthiness?: number | undefined;
    tag?: string | undefined;
}>;
export type update_playlist_entry = {
    orchestration: string;
    playlistName: string;
    playlistIndex: number;
} & {
    [K in keyof HologramParamMap]?: `${K}: ${HologramParamMap[K]}`;
};
export type update_current_entry = {
    orchestration: string;
    name: string;
} & {
    [K in keyof HologramParamMap]?: `${K}: ${HologramParamMap[K]}`;
};
export declare const play_playlist: z.ZodObject<{
    orchestration: z.ZodString;
    name: z.ZodString;
    head_index: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    orchestration: string;
    name: string;
    head_index: number;
}, {
    orchestration: string;
    name: string;
    head_index: number;
}>;
export declare const transport_control_play: z.ZodObject<{
    orchestration: z.ZodString;
}, "strip", z.ZodTypeAny, {
    orchestration: string;
}, {
    orchestration: string;
}>;
export declare const transport_control_pause: z.ZodObject<{
    orchestration: z.ZodString;
}, "strip", z.ZodTypeAny, {
    orchestration: string;
}, {
    orchestration: string;
}>;
export declare const transport_control_next: z.ZodObject<{
    orchestration: z.ZodString;
}, "strip", z.ZodTypeAny, {
    orchestration: string;
}, {
    orchestration: string;
}>;
export declare const transport_control_previous: z.ZodObject<{
    orchestration: z.ZodString;
}, "strip", z.ZodTypeAny, {
    orchestration: string;
}, {
    orchestration: string;
}>;
export declare const transport_control_seek_to_index: z.ZodObject<{
    orchestration: z.ZodString;
    index: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    orchestration: string;
    index: number;
}, {
    orchestration: string;
    index: number;
}>;
