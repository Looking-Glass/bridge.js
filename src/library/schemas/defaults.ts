import { numberRange } from "./schema.utils"

/**for certain values we need defaults in order to define our type schemas and also clamp values.
 * This helps prevent sending bridge values that are out of range.
 */

const ASPECT_MIN = 0.1
const ASPECT_MAX = 10
export const ASPECT = numberRange(ASPECT_MIN, ASPECT_MAX)

const DEPTHINESS_MIN = 0.1
const DEPTHINESS_MAX = 2
export const DEPTHINESS = numberRange(DEPTHINESS_MIN, DEPTHINESS_MAX)

const ZOOM_MIN = 0.1
const ZOOM_MAX = 2
export const ZOOM = numberRange(ZOOM_MIN, ZOOM_MAX)

const QUILT_ROWS_MIN = 1
const QUILT_ROWS_MAX = 50
export const QUILT_ROWS = numberRange(QUILT_ROWS_MIN, QUILT_ROWS_MAX)

const QUILT_COLS_MIN = 1
const QUILT_COLS_MAX = 50
export const QUILT_COLS = numberRange(QUILT_COLS_MIN, QUILT_COLS_MAX)

export const QUILT_VIEW_COUNT_MIN = 1
export const QUILT_VIEW_COUNT_MAX = 2500
