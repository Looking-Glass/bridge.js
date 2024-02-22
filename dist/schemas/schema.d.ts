import * as z from "zod";
export declare const unsigned_int: z.ZodLiteral<"UNSIGNED_INT">;
export declare const int: z.ZodLiteral<"INT">;
export declare const float: z.ZodLiteral<"FLOAT">;
export declare const int2: z.ZodLiteral<"INT2">;
export declare const wstring: z.ZodLiteral<"WSTRING">;
export declare const variant_map: z.ZodLiteral<"VARIANT_MAP">;
export declare const completion: z.ZodLiteral<"Completion">;
export declare const unknown: z.ZodLiteral<"UnknownOrchestration">;
export declare const pending: z.ZodLiteral<"Pending">;
export declare const failure: z.ZodLiteral<"Failure">;
export declare const name: z.ZodString;
export declare const status: z.ZodObject<{
    name: z.ZodString;
    type: z.ZodLiteral<"WSTRING">;
    value: z.ZodUnion<[z.ZodLiteral<"Completion">, z.ZodLiteral<"Pending">, z.ZodLiteral<"Failure">, z.ZodLiteral<"UnknownOrchestration">]>;
}, "strip", z.ZodTypeAny, {
    value: "Completion" | "UnknownOrchestration" | "Pending" | "Failure";
    name: string;
    type: "WSTRING";
}, {
    value: "Completion" | "UnknownOrchestration" | "Pending" | "Failure";
    name: string;
    type: "WSTRING";
}>;
