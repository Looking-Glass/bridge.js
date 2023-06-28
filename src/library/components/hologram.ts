import { z } from "zod"
import * as schema from "../schemas/schema.hologram"

/**Create a new Quilt Hologram */
export class QuiltHologram {
	public uri: string
	public type: "quilt"
	public settings: z.infer<typeof schema.QuiltHologramArgs>

	constructor(args: { uri: string; settings: z.infer<typeof schema.QuiltHologramArgs> }) {
		this.uri = args.uri
		this.type = "quilt"
		this.settings = args.settings
	}
}

/**Create a new RGBD Hologram */
export class RGBDHologram {
	public uri: string
	public type: "rgbd"
	public settings: z.infer<typeof schema.RGBDHologramArgs>

	constructor(args: { uri: string; settings: z.infer<typeof schema.RGBDHologramArgs> }) {
		this.uri = args.uri
		this.type = "rgbd"
		this.settings = args.settings
	}
}

/**Allow the user to create a hologram manually based on type,
 * this is useful for when we want to allow the end user to create a hologram themselves via a UI interface  */
export function HologramFactory<T extends keyof schema.HologramClasses>({
	uri,
	type,
	settings,
}: {
	uri: string
	type: T
	settings: schema.HologramSettings[T]
}) {
	const ArgsSchema = schema.hologramMap[type]
	ArgsSchema.safeParse(settings)
	switch (type) {
		case "quilt":
			return new QuiltHologram({ uri, settings: settings as z.infer<typeof schema.QuiltHologramArgs> })
		case "rgbd":
			return new RGBDHologram({ uri, settings: settings as z.infer<typeof schema.RGBDHologramArgs> })
		default:
			throw new Error(`Invalid type: ${type}`)
	}
}

export type HologramType = QuiltHologram | RGBDHologram
