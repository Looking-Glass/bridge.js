import { numberRange } from "./schema.utils"

/**for certain values we need defaults in order to define our type schemas and also clamp values.
 * This helps prevent sending bridge values that are out of range.
 */

export const ASPECT = {
	min: 0.1,
	max: 10,
	range: numberRange(0.1, 10),
}

export const DEPTHINESS = {
	min: 0.1,
	max: 2,
	range: numberRange(0.1, 2),
}

export const ZOOM = {
	min: 0.1,
	max: 2,
	range: numberRange(0.1, 2),
}

export const FOCUS = {
	min: 0.01,
	max: 1,
	range: numberRange(0.01, 1),
}

export const QUILT_ROWS = {
	min: 1,
	max: 50,
	range: numberRange(1, 50),
}

export const QUILT_COLS = {
	min: 1,
	max: 50,
	range: numberRange(1, 50),
}
export const QUILT_VIEW_COUNT = {
	min: 1,
	max: 2500,
	range: numberRange(1, 2500),
}
