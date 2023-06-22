import {z} from "zod"
import {numberRange} from "./schema.utils"
import { QuiltHologram, RGBDHologram } from ".."
import { DEPTHINESS } from './defaults';

const hologramTypeSchema = z.union([z.literal("quilt"), z.literal("rgbd")])

export type hologramTypes = z.infer<typeof hologramTypeSchema>

export const QuiltHologramArgs = z.object({
	rows: z.number(),
	columns: z.number(),
	aspect: z.number(),
	viewCount: z.number(),
})

export const RGBDHologramArgs = z.object({
	aspect: z.number(),
	depth_loc: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]),
	depth_inversion: z.union([z.literal(0), z.literal(1)]),
	chroma_depth: z.union([z.literal(0), z.literal(1)]),
    /**Depthiness can be a value between 0.1 and 1 */
	depthiness: DEPTHINESS,
	focus: z.number().optional(),
	depth_cutoff: z.union([z.literal(1), z.literal(0)]).optional(),
	zoom: numberRange(0.1,1)
})

export interface HologramClasses {
    quilt: QuiltHologram;
    rgbd: RGBDHologram;
}

export const hologramMap: { [type in keyof HologramClasses]: any } = {
    quilt: QuiltHologramArgs,
    rgbd: RGBDHologramArgs,
};

export type HologramSettings = {
    quilt: z.infer<typeof QuiltHologramArgs>,
    rgbd: z.infer<typeof RGBDHologramArgs>
}