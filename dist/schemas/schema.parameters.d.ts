import { z } from "zod";
export declare const parameterNames: z.ZodUnion<[z.ZodLiteral<"aspect">, z.ZodLiteral<"focus">, z.ZodLiteral<"crop_pos_x">, z.ZodLiteral<"crop_pos_y">, z.ZodLiteral<"zoom">, z.ZodLiteral<"depth_loc">, z.ZodLiteral<"depth_inversion">, z.ZodLiteral<"chroma_depth">, z.ZodLiteral<"depthiness">, z.ZodLiteral<"depth_cutoff">]>;
export declare const hologramParamMap: z.ZodObject<{
    aspect: z.ZodNumber;
    focus: z.ZodOptional<z.ZodNumber>;
    crop_pos_x: z.ZodOptional<z.ZodNumber>;
    crop_pos_y: z.ZodOptional<z.ZodNumber>;
    zoom: z.ZodEffects<z.ZodNumber, number, number>;
    depth_loc: z.ZodUnion<[z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>]>;
    depth_inversion: z.ZodUnion<[z.ZodLiteral<0>, z.ZodLiteral<1>]>;
    chroma_depth: z.ZodUnion<[z.ZodLiteral<0>, z.ZodLiteral<1>]>;
    depthiness: z.ZodEffects<z.ZodNumber, number, number>;
    depth_cutoff: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<1>, z.ZodLiteral<0>]>>;
}, "strip", z.ZodTypeAny, {
    aspect: number;
    zoom: number;
    depth_loc: 0 | 2 | 1 | 3;
    depth_inversion: 0 | 1;
    chroma_depth: 0 | 1;
    depthiness: number;
    focus?: number | undefined;
    crop_pos_x?: number | undefined;
    crop_pos_y?: number | undefined;
    depth_cutoff?: 0 | 1 | undefined;
}, {
    aspect: number;
    zoom: number;
    depth_loc: 0 | 2 | 1 | 3;
    depth_inversion: 0 | 1;
    chroma_depth: 0 | 1;
    depthiness: number;
    focus?: number | undefined;
    crop_pos_x?: number | undefined;
    crop_pos_y?: number | undefined;
    depth_cutoff?: 0 | 1 | undefined;
}>;
export type HologramParamMap = z.infer<typeof hologramParamMap>;
