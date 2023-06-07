import { z } from "zod"

export const QuiltHologramArgs = z.object({
	rows: z.number(),
	columns: z.number(),
	aspect: z.number(),
	viewCount: z.number(),
})

export const RGBDHologramArgs = z.object({
	rows: z.number(),
	columns: z.number(),
	aspect: z.number(),
	viewCount: z.number(),
	depth_loc: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]),
	depth_inversion: z.union([z.literal(0), z.literal(1)]),
	chroma_depth: z.union([z.literal(0), z.literal(1)]),
	depthiness: z.number(),
	focus: z.number().optional(),
	depth_cutoff: z.literal(1).optional(),
	zoom: z.number().optional(),
})

export class QuiltHologram {
	public uri: string
	public type: "quilt"
	public settings: z.infer<typeof QuiltHologramArgs>

	constructor(args: { uri: string; settings: z.infer<typeof QuiltHologramArgs> }) {
		this.uri = args.uri
		this.type = "quilt"
		this.settings = args.settings
	}
}

export class RGBDHologram {
	public uri: string
	public type: "rgbd"
	public settings: z.infer<typeof RGBDHologramArgs>

	constructor(args: { uri: string; settings: z.infer<typeof RGBDHologramArgs> }) {
		this.uri = args.uri
		this.type = "rgbd"
		this.settings = args.settings
	}
}

export type Hologram = QuiltHologram | RGBDHologram
