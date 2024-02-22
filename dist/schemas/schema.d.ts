import * as z from "zod";
export declare const name: z.ZodString;
export declare const unsigned_int: z.ZodObject<{
    name: z.ZodString;
    type: z.ZodLiteral<"UNSIGNED_INT">;
    value: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    value: number;
    name: string;
    type: "UNSIGNED_INT";
}, {
    value: number;
    name: string;
    type: "UNSIGNED_INT";
}>;
export declare const int: z.ZodObject<{
    name: z.ZodString;
    type: z.ZodLiteral<"INT">;
    value: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    value: number;
    name: string;
    type: "INT";
}, {
    value: number;
    name: string;
    type: "INT";
}>;
export declare const float: z.ZodObject<{
    name: z.ZodString;
    type: z.ZodLiteral<"FLOAT">;
    value: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    value: number;
    name: string;
    type: "FLOAT";
}, {
    value: number;
    name: string;
    type: "FLOAT";
}>;
export declare const int2: z.ZodLiteral<"INT2">;
export declare const wstring: z.ZodObject<{
    name: z.ZodString;
    type: z.ZodLiteral<"WSTRING">;
    value: z.ZodString;
}, "strip", z.ZodTypeAny, {
    value: string;
    name: string;
    type: "WSTRING";
}, {
    value: string;
    name: string;
    type: "WSTRING";
}>;
export declare const variant_map: z.ZodLiteral<"VARIANT_MAP">;
export declare const completion: z.ZodLiteral<"Completion">;
export declare const unknown: z.ZodLiteral<"UnknownOrchestration">;
export declare const pending: z.ZodLiteral<"Pending">;
export declare const failure: z.ZodLiteral<"Failure">;
export declare const status: z.ZodObject<{
    name: z.ZodString;
    type: z.ZodObject<{
        name: z.ZodString;
        type: z.ZodLiteral<"WSTRING">;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        name: string;
        type: "WSTRING";
    }, {
        value: string;
        name: string;
        type: "WSTRING";
    }>;
    value: z.ZodUnion<[z.ZodLiteral<"Completion">, z.ZodLiteral<"Pending">, z.ZodLiteral<"Failure">, z.ZodLiteral<"UnknownOrchestration">]>;
}, "strip", z.ZodTypeAny, {
    value: "Completion" | "UnknownOrchestration" | "Pending" | "Failure";
    name: string;
    type: {
        value: string;
        name: string;
        type: "WSTRING";
    };
}, {
    value: "Completion" | "UnknownOrchestration" | "Pending" | "Failure";
    name: string;
    type: {
        value: string;
        name: string;
        type: "WSTRING";
    };
}>;
