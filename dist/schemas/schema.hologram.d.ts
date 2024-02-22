import { z } from "zod";
import { QuiltHologram, RGBDHologram } from "..";
export declare const hologramTypeSchema: z.ZodUnion<[z.ZodLiteral<"quilt">, z.ZodLiteral<"rgbd">]>;
export type hologramTypes = z.infer<typeof hologramTypeSchema>;
export declare const QuiltHologramArgs: z.ZodObject<{
    rows: z.ZodNumber;
    columns: z.ZodNumber;
    aspect: z.ZodNumber;
    viewCount: z.ZodNumber;
    focus: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    rows: number;
    aspect: number;
    columns: number;
    viewCount: number;
    focus?: number | undefined;
}, {
    rows: number;
    aspect: number;
    columns: number;
    viewCount: number;
    focus?: number | undefined;
}>;
export declare const RGBDHologramArgs: z.ZodObject<{
    /**Aspect Ratio of the hologram,
     * this should match the source image you provide, not the RGBD Pair */
    aspect: z.ZodNumber;
    /**Where are the holograms located?
     * 0 Top
     * 1 Bottom
     * 2 Right
     * 3 Left */
    depth_loc: z.ZodUnion<[z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>]>;
    /**Is the Depth inverted? 0 for false, 1 for true */
    depth_inversion: z.ZodUnion<[z.ZodLiteral<0>, z.ZodLiteral<1>]>;
    /**Is the depth map chroma or grayscale? 0 for false, 1 for true */
    chroma_depth: z.ZodUnion<[z.ZodLiteral<0>, z.ZodLiteral<1>]>;
    /**Depthiness can be a value between 0.1 and 2 */
    depthiness: z.ZodEffects<z.ZodNumber, number, number>;
    /**Controls the Focus of the hologram */
    focus: z.ZodOptional<z.ZodNumber>;
    /**Whether or not to cutoff depth beyond a certain point. 0 for false, 1 for true */
    depth_cutoff: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<1>, z.ZodLiteral<0>]>>;
    /**Zoom can be between 0.1 and 2 */
    zoom: z.ZodEffects<z.ZodNumber, number, number>;
}, "strip", z.ZodTypeAny, {
    zoom: number;
    depth_loc: 0 | 2 | 1 | 3;
    depth_inversion: 0 | 1;
    chroma_depth: 0 | 1;
    depthiness: number;
    aspect: number;
    focus?: number | undefined;
    depth_cutoff?: 0 | 1 | undefined;
}, {
    zoom: number;
    depth_loc: 0 | 2 | 1 | 3;
    depth_inversion: 0 | 1;
    chroma_depth: 0 | 1;
    depthiness: number;
    aspect: number;
    focus?: number | undefined;
    depth_cutoff?: 0 | 1 | undefined;
}>;
export interface HologramClasses {
    quilt: QuiltHologram;
    rgbd: RGBDHologram;
}
export declare const hologramMap: {
    [type in keyof HologramClasses]: any;
};
export type HologramSettings = {
    quilt: z.infer<typeof QuiltHologramArgs>;
    rgbd: z.infer<typeof RGBDHologramArgs>;
};
