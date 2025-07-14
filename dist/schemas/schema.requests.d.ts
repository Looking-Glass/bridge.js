import { z } from "zod";
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
    durationMS: z.ZodNumber;
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
    index: number;
    name: string;
    id: number;
    focus: number;
    aspect: number;
    cols: number;
    rows: number;
    crop_pos_x: number;
    crop_pos_y: number;
    uri: string;
    view_count: number;
    durationMS: number;
    isRGBD: 0 | 1;
    zoom?: number | undefined;
    depth_loc?: 0 | 2 | 1 | 3 | undefined;
    depth_inversion?: 0 | 1 | undefined;
    chroma_depth?: 0 | 1 | undefined;
    depthiness?: number | undefined;
    tag?: string | undefined;
}, {
    orchestration: string;
    index: number;
    name: string;
    id: number;
    focus: number;
    aspect: number;
    cols: number;
    rows: number;
    crop_pos_x: number;
    crop_pos_y: number;
    uri: string;
    view_count: number;
    durationMS: number;
    isRGBD: 0 | 1;
    zoom?: number | undefined;
    depth_loc?: 0 | 2 | 1 | 3 | undefined;
    depth_inversion?: 0 | 1 | undefined;
    chroma_depth?: 0 | 1 | undefined;
    depthiness?: number | undefined;
    tag?: string | undefined;
}>;
export declare const update_playlist_entry: z.ZodObject<z.objectUtil.extendShape<{
    orchestration: z.ZodString;
    playlistName: z.ZodString;
    playlistIndex: z.ZodNumber;
}, Record<("zoom" | "filter_mode" | "gaussian_sigma" | "depth_loc" | "depth_inversion" | "chroma_depth" | "depthiness") | ("focus" | "aspect" | "cols" | "rows" | "crop_pos_x" | "crop_pos_y" | "depth_cutoff"), z.ZodOptional<z.ZodString>>>, "strip", z.ZodTypeAny, {
    orchestration: string;
    playlistName: string;
    playlistIndex: number;
    focus?: string | undefined;
    aspect?: string | undefined;
    cols?: string | undefined;
    rows?: string | undefined;
    crop_pos_x?: string | undefined;
    crop_pos_y?: string | undefined;
    zoom?: string | undefined;
    filter_mode?: string | undefined;
    gaussian_sigma?: string | undefined;
    depth_loc?: string | undefined;
    depth_inversion?: string | undefined;
    chroma_depth?: string | undefined;
    depthiness?: string | undefined;
    depth_cutoff?: string | undefined;
}, {
    orchestration: string;
    playlistName: string;
    playlistIndex: number;
    focus?: string | undefined;
    aspect?: string | undefined;
    cols?: string | undefined;
    rows?: string | undefined;
    crop_pos_x?: string | undefined;
    crop_pos_y?: string | undefined;
    zoom?: string | undefined;
    filter_mode?: string | undefined;
    gaussian_sigma?: string | undefined;
    depth_loc?: string | undefined;
    depth_inversion?: string | undefined;
    chroma_depth?: string | undefined;
    depthiness?: string | undefined;
    depth_cutoff?: string | undefined;
}>;
export declare const update_current_entry: z.ZodObject<z.objectUtil.extendShape<{
    orchestration: z.ZodString;
    name: z.ZodString;
}, Record<("zoom" | "filter_mode" | "gaussian_sigma" | "depth_loc" | "depth_inversion" | "chroma_depth" | "depthiness") | ("focus" | "aspect" | "cols" | "rows" | "crop_pos_x" | "crop_pos_y" | "depth_cutoff"), z.ZodOptional<z.ZodString>>>, "strip", z.ZodTypeAny, {
    orchestration: string;
    name: string;
    focus?: string | undefined;
    aspect?: string | undefined;
    cols?: string | undefined;
    rows?: string | undefined;
    crop_pos_x?: string | undefined;
    crop_pos_y?: string | undefined;
    zoom?: string | undefined;
    filter_mode?: string | undefined;
    gaussian_sigma?: string | undefined;
    depth_loc?: string | undefined;
    depth_inversion?: string | undefined;
    chroma_depth?: string | undefined;
    depthiness?: string | undefined;
    depth_cutoff?: string | undefined;
}, {
    orchestration: string;
    name: string;
    focus?: string | undefined;
    aspect?: string | undefined;
    cols?: string | undefined;
    rows?: string | undefined;
    crop_pos_x?: string | undefined;
    crop_pos_y?: string | undefined;
    zoom?: string | undefined;
    filter_mode?: string | undefined;
    gaussian_sigma?: string | undefined;
    depth_loc?: string | undefined;
    depth_inversion?: string | undefined;
    chroma_depth?: string | undefined;
    depthiness?: string | undefined;
    depth_cutoff?: string | undefined;
}>;
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
