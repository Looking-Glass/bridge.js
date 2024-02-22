import { z } from "zod";
import * as schema from "../schemas/schema.hologram";
/**Create a new Quilt Hologram */
export declare class QuiltHologram {
    uri: string;
    type: "quilt";
    settings: z.infer<typeof schema.QuiltHologramArgs>;
    constructor(args: {
        uri: string;
        settings: z.infer<typeof schema.QuiltHologramArgs>;
    });
}
/**Create a new RGBD Hologram */
export declare class RGBDHologram {
    uri: string;
    type: "rgbd";
    settings: z.infer<typeof schema.RGBDHologramArgs>;
    constructor(args: {
        uri: string;
        settings: z.infer<typeof schema.RGBDHologramArgs>;
    });
}
/**Allow the user to create a hologram manually based on type,
 * this is useful for when we want to allow the end user to create a hologram themselves via a UI interface  */
export declare function hologramFactory<T extends keyof schema.HologramClasses>({ uri, type, settings, }: {
    uri: string;
    type: T;
    settings: schema.HologramSettings[T];
}): QuiltHologram | RGBDHologram;
export type HologramType = QuiltHologram | RGBDHologram;
