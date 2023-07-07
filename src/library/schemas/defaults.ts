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
}

export const ASPECT: defaults = {
	min: 0.1,
	max: 10,
	range: numberRange(0.1, 10),
	type: "float",
}

export const DEPTHINESS: defaults = {
	min: 0.1,
	max: 4,
	range: numberRange(0.1, 4),
	type: "float",
}

export const CROP_POS_X: defaults = {
	min: -1,
	max: 1,
	range: numberRange(-1, 1),
	type: "float",
}

export const CROP_POS_Y: defaults = {
	min: -1,
	max: 1,
	range: numberRange(-1, 1),
	type: "float",
}

export const ZOOM: defaults = {
	min: 0.1,
	max: 2,
	range: numberRange(0.1, 2),
	type: "float",
}

export const FOCUS: defaults = {
	min: -0.05,
	max: 0.05,
	range: numberRange(-0.05, 0.05),
	type: "float",
}

export const QUILT_ROWS: defaults = {
	min: 1,
	max: 50,
	range: numberRange(1, 50),
	type: "int",
}

export const QUILT_COLS: defaults = {
	min: 1,
	max: 50,
	range: numberRange(1, 50),
	type: "int",
}
export const QUILT_VIEW_COUNT: defaults = {
	min: 1,
	max: 2500,
	range: numberRange(1, 2500),
	type: "int",
}
