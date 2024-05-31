import { numberRange } from "./schema.utils"

/**for certain values we need defaults in order to define our type schemas and also clamp values.
 * This helps prevent sending bridge values that are out of range.
 */

export type NumberType = "int" | "float"

export interface defaults {
	min: number
	max: number
	range: ReturnType<typeof numberRange>
	type: NumberType
	defaultValue: number
}

export const ASPECT: defaults = {
	min: 0.1,
	max: 10,
	range: numberRange(0.1, 10),
	type: "float",
	defaultValue: 1,
}

export const DEPTHINESS: defaults = {
	min: 0.1,
	max: 4,
	range: numberRange(0.1, 4),
	type: "float",
	defaultValue: 1.5,
}

export const DEPTH_CUTOFF: defaults = {
	min: 0,
	max: 1,
	range: numberRange(0, 1),
	type: "float",
	defaultValue: 0,
}

export const CROP_POS_X: defaults = {
	min: -2,
	max: 2,
	range: numberRange(-2, 2),
	type: "float",
	defaultValue: 0,
}

export const CROP_POS_Y: defaults = {
	min: -2,
	max: 2,
	range: numberRange(-2, 2),
	type: "float",
	defaultValue: 0,
}

export const ZOOM: defaults = {
	min: 0.1,
	max: 4,
	range: numberRange(0.1, 4),
	type: "float",
	defaultValue: 0,
}

export const FOCUS: defaults = {
	min: -0.05,
	max: 0.05,
	range: numberRange(-0.05, 0.05),
	type: "float",
	defaultValue: 0,
}

export const QUILT_ROWS: defaults = {
	min: 1,
	max: 50,
	range: numberRange(1, 50),
	type: "int",
	defaultValue: 5,
}

export const QUILT_COLS: defaults = {
	min: 1,
	max: 50,
	range: numberRange(1, 50),
	type: "int",
	defaultValue: 9
}
export const QUILT_VIEW_COUNT: defaults = {
	min: 1,
	max: 2500,
	range: numberRange(1, 2500),
	type: "int",
	defaultValue: 45
}

export const GAUSSIAN_SIGMA: defaults = {
	min: -0.5,
	max: 0.5,
	range: numberRange(-0.5, 0.5),
	type: "float",
	defaultValue: 0.01,
}

export const FILTER_MODE: defaults = {
	min: 0,
	max: 3,
	range: numberRange(0, 3),
	type: "int",
	defaultValue: 2,
}
