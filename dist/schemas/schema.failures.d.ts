import { z } from "zod";
export declare const play_playist_failure: z.ZodObject<{
    name: z.ZodString;
    orchestration: z.ZodObject<{
        name: z.ZodString;
        payload: z.ZodObject<{
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
            value: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            value: string;
            name: string;
            type: {
                value: string;
                name: string;
                type: "WSTRING";
            };
        }, {
            value: string;
            name: string;
            type: {
                value: string;
                name: string;
                type: "WSTRING";
            };
        }>;
        status: z.ZodObject<{
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
    }, "strip", z.ZodTypeAny, {
        payload: {
            value: string;
            name: string;
            type: {
                value: string;
                name: string;
                type: "WSTRING";
            };
        };
        name: string;
        status: {
            value: "Completion" | "UnknownOrchestration" | "Pending" | "Failure";
            name: string;
            type: {
                value: string;
                name: string;
                type: "WSTRING";
            };
        };
    }, {
        payload: {
            value: string;
            name: string;
            type: {
                value: string;
                name: string;
                type: "WSTRING";
            };
        };
        name: string;
        status: {
            value: "Completion" | "UnknownOrchestration" | "Pending" | "Failure";
            name: string;
            type: {
                value: string;
                name: string;
                type: "WSTRING";
            };
        };
    }>;
    payload: z.ZodObject<{
        name: z.ZodString;
        type: z.ZodLiteral<"VARIANT_MAP">;
        value: z.ZodObject<{
            message: z.ZodObject<{
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
        }, "strip", z.ZodTypeAny, {
            message: {
                value: string;
                name: string;
                type: "WSTRING";
            };
        }, {
            message: {
                value: string;
                name: string;
                type: "WSTRING";
            };
        }>;
    }, "strip", z.ZodTypeAny, {
        value: {
            message: {
                value: string;
                name: string;
                type: "WSTRING";
            };
        };
        name: string;
        type: "VARIANT_MAP";
    }, {
        value: {
            message: {
                value: string;
                name: string;
                type: "WSTRING";
            };
        };
        name: string;
        type: "VARIANT_MAP";
    }>;
    status: z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
    orchestration: {
        payload: {
            value: string;
            name: string;
            type: {
                value: string;
                name: string;
                type: "WSTRING";
            };
        };
        name: string;
        status: {
            value: "Completion" | "UnknownOrchestration" | "Pending" | "Failure";
            name: string;
            type: {
                value: string;
                name: string;
                type: "WSTRING";
            };
        };
    };
    payload: {
        value: {
            message: {
                value: string;
                name: string;
                type: "WSTRING";
            };
        };
        name: string;
        type: "VARIANT_MAP";
    };
    name: string;
    status: {
        value: "Completion" | "UnknownOrchestration" | "Pending" | "Failure";
        name: string;
        type: {
            value: string;
            name: string;
            type: "WSTRING";
        };
    };
}, {
    orchestration: {
        payload: {
            value: string;
            name: string;
            type: {
                value: string;
                name: string;
                type: "WSTRING";
            };
        };
        name: string;
        status: {
            value: "Completion" | "UnknownOrchestration" | "Pending" | "Failure";
            name: string;
            type: {
                value: string;
                name: string;
                type: "WSTRING";
            };
        };
    };
    payload: {
        value: {
            message: {
                value: string;
                name: string;
                type: "WSTRING";
            };
        };
        name: string;
        type: "VARIANT_MAP";
    };
    name: string;
    status: {
        value: "Completion" | "UnknownOrchestration" | "Pending" | "Failure";
        name: string;
        type: {
            value: string;
            name: string;
            type: "WSTRING";
        };
    };
}>;
