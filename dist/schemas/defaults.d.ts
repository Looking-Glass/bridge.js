import { numberRange } from "./schema.utils";
/**for certain values we need defaults in order to define our type schemas and also clamp values.
 * This helps prevent sending bridge values that are out of range.
 */
export type NumberType = "int" | "float";
export interface defaults {
    min: number;
    max: number;
    range: ReturnType<typeof numberRange>;
    type: NumberType;
    defaultValue: number;
}
export declare const COLUMNS: defaults;
export declare const ROWS: defaults;
export declare const ASPECT: defaults;
export declare const DEPTHINESS: defaults;
export declare const DEPTH_CUTOFF: defaults;
export declare const CROP_POS_X: defaults;
export declare const CROP_POS_Y: defaults;
export declare const ZOOM: defaults;
export declare const FOCUS: defaults;
export declare const QUILT_ROWS: defaults;
export declare const QUILT_COLS: defaults;
export declare const QUILT_VIEW_COUNT: defaults;
export declare const GAUSSIAN_SIGMA: defaults;
export declare const FILTER_MODE: defaults;
