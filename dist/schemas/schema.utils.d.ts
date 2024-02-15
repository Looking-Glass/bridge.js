import { z } from "zod";
/**a utility to allow us to have ranges in our schemas */
export declare const numberRange: (min: number, max: number) => z.ZodEffects<z.ZodNumber, number, number>;
