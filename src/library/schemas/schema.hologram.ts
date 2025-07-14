import { z } from "zod"
import { QuiltHologram, RGBDHologram } from ".."
import { DEPTHINESS, ZOOM } from "./defaults"

export const hologramTypeSchema = z.union([z.literal("quilt"), z.literal("rgbd")])

export type hologramTypes = z.infer<typeof hologramTypeSchema>

export const QuiltHologramArgs = z.object({
	rows: z.number(),
	columns: z.number(),
	crop_pos_x: z.number().optional(),
	crop_pos_y: z.number().optional(),
	aspect: z.number(),
	viewCount: z.number(),
	duration: z.number().optional(),
	focus: z.number().optional(),
	zoom: z.number().optional(),
	tag: z.string().optional(),
})

export const RGBDHologramArgs = z.object({
	rows: z.number().optional(),
	columns: z.number().optional(),
	crop_pos_x: z.number().optional(),
	crop_pos_y: z.number().optional(),
	duration: z.number().optional(),
	/**Aspect Ratio of the hologram,
	 * this should match the source image you provide, not the RGBD Pair */
	aspect: z.number(),
	/**Where are the holograms located?
	 * 0 Top
	 * 1 Bottom
	 * 2 Right
	 * 3 Left */
	depth_loc: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]),
	/**Is the Depth inverted? 0 for false, 1 for true */
	depth_inversion: z.union([z.literal(0), z.literal(1)]),
	/**Is the depth map chroma or grayscale? 0 for false, 1 for true */
	chroma_depth: z.union([z.literal(0), z.literal(1)]),
	/**Depthiness can be a value between 0.1 and 2 */
	depthiness: DEPTHINESS.range,
	/**Controls the Focus of the hologram */
	focus: z.number().optional(),
	/**Whether or not to cutoff depth beyond a certain point. 0 for false, 1 for true */
	depth_cutoff: z.union([z.literal(1), z.literal(0)]).optional(),
	/**Zoom can be between 0.1 and 2 */
	zoom: ZOOM.range,
	tag: z.string().optional(),
})

export interface HologramClasses {
	quilt: QuiltHologram
	rgbd: RGBDHologram
}

export const hologramMap: { [type in keyof HologramClasses]: any } = {
	quilt: QuiltHologramArgs,
	rgbd: RGBDHologramArgs,
}

export type HologramSettings = {
	quilt: z.infer<typeof QuiltHologramArgs>
	rgbd: z.infer<typeof RGBDHologramArgs>
}
