import { z } from "zod";
export declare const BridgeEvent: z.ZodUnion<[z.ZodLiteral<"Monitor Connect">, z.ZodLiteral<"Monitor Disconnect">, z.ZodLiteral<"Progress Start">, z.ZodLiteral<"Progress Completion">, z.ZodLiteral<"Progress Update">, z.ZodLiteral<"Playlist Instance">, z.ZodLiteral<"Playlist Insert">, z.ZodLiteral<"Playlist Delete">, z.ZodLiteral<"Sync/Play Playlist">, z.ZodLiteral<"Sync/Play Playlist Complete">, z.ZodLiteral<"Sync/Play Playlist Cancelled">, z.ZodLiteral<"Transport Control Pause">, z.ZodLiteral<"Transport Control Play">, z.ZodLiteral<"Transport Control Next">, z.ZodLiteral<"Transport Control Previous">, z.ZodLiteral<"All Events">]>;
export declare const monitorConnectResponse: z.ZodObject<{
    name: z.ZodString;
    orchestration: z.ZodObject<{
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
    payload: z.ZodObject<{
        name: z.ZodString;
        type: z.ZodLiteral<"VARIANT_MAP">;
        value: z.ZodObject<{
            event: z.ZodObject<{
                name: z.ZodString;
                type: z.ZodLiteral<"WSTRING">;
                value: z.ZodUnion<[z.ZodLiteral<"Monitor Connect">, z.ZodLiteral<"Monitor Disconnect">, z.ZodLiteral<"Progress Start">, z.ZodLiteral<"Progress Completion">, z.ZodLiteral<"Progress Update">, z.ZodLiteral<"Playlist Instance">, z.ZodLiteral<"Playlist Insert">, z.ZodLiteral<"Playlist Delete">, z.ZodLiteral<"Sync/Play Playlist">, z.ZodLiteral<"Sync/Play Playlist Complete">, z.ZodLiteral<"Sync/Play Playlist Cancelled">, z.ZodLiteral<"Transport Control Pause">, z.ZodLiteral<"Transport Control Play">, z.ZodLiteral<"Transport Control Next">, z.ZodLiteral<"Transport Control Previous">, z.ZodLiteral<"All Events">]>;
            }, "strip", z.ZodTypeAny, {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
                name: string;
                type: "WSTRING";
            }, {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
                name: string;
                type: "WSTRING";
            }>;
            head_index: z.ZodObject<{
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
            height: z.ZodObject<{
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
            hw: z.ZodObject<{
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
            hw_long_name: z.ZodObject<{
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
            hw_short_name: z.ZodObject<{
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
            made_by_looking_glass: z.ZodObject<{
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
            name: z.ZodObject<{
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
            width: z.ZodObject<{
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
            x: z.ZodObject<{
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
            y: z.ZodObject<{
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
        }, "strip", z.ZodTypeAny, {
            name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            message: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            x: {
                value: number;
                name: string;
                type: "INT";
            };
            y: {
                value: number;
                name: string;
                type: "INT";
            };
            head_index: {
                value: number;
                name: string;
                type: "UNSIGNED_INT";
            };
            event: {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
                name: string;
                type: "WSTRING";
            };
            height: {
                value: number;
                name: string;
                type: "UNSIGNED_INT";
            };
            hw: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            hw_long_name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            hw_short_name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            made_by_looking_glass: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            width: {
                value: number;
                name: string;
                type: "UNSIGNED_INT";
            };
        }, {
            name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            message: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            x: {
                value: number;
                name: string;
                type: "INT";
            };
            y: {
                value: number;
                name: string;
                type: "INT";
            };
            head_index: {
                value: number;
                name: string;
                type: "UNSIGNED_INT";
            };
            event: {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
                name: string;
                type: "WSTRING";
            };
            height: {
                value: number;
                name: string;
                type: "UNSIGNED_INT";
            };
            hw: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            hw_long_name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            hw_short_name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            made_by_looking_glass: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            width: {
                value: number;
                name: string;
                type: "UNSIGNED_INT";
            };
        }>;
    }, "strip", z.ZodTypeAny, {
        value: {
            name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            message: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            x: {
                value: number;
                name: string;
                type: "INT";
            };
            y: {
                value: number;
                name: string;
                type: "INT";
            };
            head_index: {
                value: number;
                name: string;
                type: "UNSIGNED_INT";
            };
            event: {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
                name: string;
                type: "WSTRING";
            };
            height: {
                value: number;
                name: string;
                type: "UNSIGNED_INT";
            };
            hw: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            hw_long_name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            hw_short_name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            made_by_looking_glass: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            width: {
                value: number;
                name: string;
                type: "UNSIGNED_INT";
            };
        };
        name: string;
        type: "VARIANT_MAP";
    }, {
        value: {
            name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            message: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            x: {
                value: number;
                name: string;
                type: "INT";
            };
            y: {
                value: number;
                name: string;
                type: "INT";
            };
            head_index: {
                value: number;
                name: string;
                type: "UNSIGNED_INT";
            };
            event: {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
                name: string;
                type: "WSTRING";
            };
            height: {
                value: number;
                name: string;
                type: "UNSIGNED_INT";
            };
            hw: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            hw_long_name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            hw_short_name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            made_by_looking_glass: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            width: {
                value: number;
                name: string;
                type: "UNSIGNED_INT";
            };
        };
        name: string;
        type: "VARIANT_MAP";
    }>;
    status: z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
    orchestration: {
        value: string;
        name: string;
        type: "WSTRING";
    };
    payload: {
        value: {
            name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            message: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            x: {
                value: number;
                name: string;
                type: "INT";
            };
            y: {
                value: number;
                name: string;
                type: "INT";
            };
            head_index: {
                value: number;
                name: string;
                type: "UNSIGNED_INT";
            };
            event: {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
                name: string;
                type: "WSTRING";
            };
            height: {
                value: number;
                name: string;
                type: "UNSIGNED_INT";
            };
            hw: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            hw_long_name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            hw_short_name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            made_by_looking_glass: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            width: {
                value: number;
                name: string;
                type: "UNSIGNED_INT";
            };
        };
        name: string;
        type: "VARIANT_MAP";
    };
    name: string;
    status: {
        value: "Completion" | "UnknownOrchestration" | "Pending" | "Failure";
        name: string;
        type: "WSTRING";
    };
}, {
    orchestration: {
        value: string;
        name: string;
        type: "WSTRING";
    };
    payload: {
        value: {
            name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            message: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            x: {
                value: number;
                name: string;
                type: "INT";
            };
            y: {
                value: number;
                name: string;
                type: "INT";
            };
            head_index: {
                value: number;
                name: string;
                type: "UNSIGNED_INT";
            };
            event: {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
                name: string;
                type: "WSTRING";
            };
            height: {
                value: number;
                name: string;
                type: "UNSIGNED_INT";
            };
            hw: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            hw_long_name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            hw_short_name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            made_by_looking_glass: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            width: {
                value: number;
                name: string;
                type: "UNSIGNED_INT";
            };
        };
        name: string;
        type: "VARIANT_MAP";
    };
    name: string;
    status: {
        value: "Completion" | "UnknownOrchestration" | "Pending" | "Failure";
        name: string;
        type: "WSTRING";
    };
}>;
export declare const progressUpdateResponse: z.ZodObject<{
    name: z.ZodString;
    orchestration: z.ZodObject<{
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
    payload: z.ZodObject<{
        name: z.ZodString;
        type: z.ZodLiteral<"VARIANT_MAP">;
        value: z.ZodObject<{
            event: z.ZodObject<{
                name: z.ZodString;
                type: z.ZodLiteral<"WSTRING">;
                value: z.ZodUnion<[z.ZodLiteral<"Monitor Connect">, z.ZodLiteral<"Monitor Disconnect">, z.ZodLiteral<"Progress Start">, z.ZodLiteral<"Progress Completion">, z.ZodLiteral<"Progress Update">, z.ZodLiteral<"Playlist Instance">, z.ZodLiteral<"Playlist Insert">, z.ZodLiteral<"Playlist Delete">, z.ZodLiteral<"Sync/Play Playlist">, z.ZodLiteral<"Sync/Play Playlist Complete">, z.ZodLiteral<"Sync/Play Playlist Cancelled">, z.ZodLiteral<"Transport Control Pause">, z.ZodLiteral<"Transport Control Play">, z.ZodLiteral<"Transport Control Next">, z.ZodLiteral<"Transport Control Previous">, z.ZodLiteral<"All Events">]>;
            }, "strip", z.ZodTypeAny, {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
                name: string;
                type: "WSTRING";
            }, {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
                name: string;
                type: "WSTRING";
            }>;
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
            progress: z.ZodObject<{
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
            progress_type: z.ZodObject<{
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
            event: {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
                name: string;
                type: "WSTRING";
            };
            progress: {
                value: number;
                name: string;
                type: "FLOAT";
            };
            progress_type: {
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
            event: {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
                name: string;
                type: "WSTRING";
            };
            progress: {
                value: number;
                name: string;
                type: "FLOAT";
            };
            progress_type: {
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
            event: {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
                name: string;
                type: "WSTRING";
            };
            progress: {
                value: number;
                name: string;
                type: "FLOAT";
            };
            progress_type: {
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
            event: {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
                name: string;
                type: "WSTRING";
            };
            progress: {
                value: number;
                name: string;
                type: "FLOAT";
            };
            progress_type: {
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
}, "strip", z.ZodTypeAny, {
    orchestration: {
        value: string;
        name: string;
        type: "WSTRING";
    };
    payload: {
        value: {
            message: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            event: {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
                name: string;
                type: "WSTRING";
            };
            progress: {
                value: number;
                name: string;
                type: "FLOAT";
            };
            progress_type: {
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
        type: "WSTRING";
    };
}, {
    orchestration: {
        value: string;
        name: string;
        type: "WSTRING";
    };
    payload: {
        value: {
            message: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            event: {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
                name: string;
                type: "WSTRING";
            };
            progress: {
                value: number;
                name: string;
                type: "FLOAT";
            };
            progress_type: {
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
        type: "WSTRING";
    };
}>;
export declare const insertPlaylistResponse: z.ZodObject<{
    name: z.ZodString;
    orchestration: z.ZodObject<{
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
    payload: z.ZodObject<{
        name: z.ZodString;
        type: z.ZodLiteral<"VARIANT_MAP">;
        value: z.ZodObject<{
            event: z.ZodObject<{
                name: z.ZodString;
                type: z.ZodLiteral<"WSTRING">;
                value: z.ZodUnion<[z.ZodLiteral<"Monitor Connect">, z.ZodLiteral<"Monitor Disconnect">, z.ZodLiteral<"Progress Start">, z.ZodLiteral<"Progress Completion">, z.ZodLiteral<"Progress Update">, z.ZodLiteral<"Playlist Instance">, z.ZodLiteral<"Playlist Insert">, z.ZodLiteral<"Playlist Delete">, z.ZodLiteral<"Sync/Play Playlist">, z.ZodLiteral<"Sync/Play Playlist Complete">, z.ZodLiteral<"Sync/Play Playlist Cancelled">, z.ZodLiteral<"Transport Control Pause">, z.ZodLiteral<"Transport Control Play">, z.ZodLiteral<"Transport Control Next">, z.ZodLiteral<"Transport Control Previous">, z.ZodLiteral<"All Events">]>;
            }, "strip", z.ZodTypeAny, {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
                name: string;
                type: "WSTRING";
            }, {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
                name: string;
                type: "WSTRING";
            }>;
            index: z.ZodObject<{
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
            uri: z.ZodObject<{
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
            index: {
                value: number;
                name: string;
                type: "UNSIGNED_INT";
            };
            uri: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            event: {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
                name: string;
                type: "WSTRING";
            };
        }, {
            message: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            index: {
                value: number;
                name: string;
                type: "UNSIGNED_INT";
            };
            uri: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            event: {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
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
            index: {
                value: number;
                name: string;
                type: "UNSIGNED_INT";
            };
            uri: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            event: {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
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
            index: {
                value: number;
                name: string;
                type: "UNSIGNED_INT";
            };
            uri: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            event: {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
                name: string;
                type: "WSTRING";
            };
        };
        name: string;
        type: "VARIANT_MAP";
    }>;
    status: z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
    orchestration: {
        value: string;
        name: string;
        type: "WSTRING";
    };
    payload: {
        value: {
            message: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            index: {
                value: number;
                name: string;
                type: "UNSIGNED_INT";
            };
            uri: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            event: {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
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
        type: "WSTRING";
    };
}, {
    orchestration: {
        value: string;
        name: string;
        type: "WSTRING";
    };
    payload: {
        value: {
            message: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            index: {
                value: number;
                name: string;
                type: "UNSIGNED_INT";
            };
            uri: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            event: {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
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
        type: "WSTRING";
    };
}>;
export declare const instancePlaylistResponse: z.ZodObject<{
    name: z.ZodString;
    orchestration: z.ZodObject<{
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
    payload: z.ZodObject<{
        name: z.ZodString;
        type: z.ZodLiteral<"VARIANT_MAP">;
        value: z.ZodObject<{
            event: z.ZodObject<{
                name: z.ZodString;
                type: z.ZodLiteral<"WSTRING">;
                value: z.ZodUnion<[z.ZodLiteral<"Monitor Connect">, z.ZodLiteral<"Monitor Disconnect">, z.ZodLiteral<"Progress Start">, z.ZodLiteral<"Progress Completion">, z.ZodLiteral<"Progress Update">, z.ZodLiteral<"Playlist Instance">, z.ZodLiteral<"Playlist Insert">, z.ZodLiteral<"Playlist Delete">, z.ZodLiteral<"Sync/Play Playlist">, z.ZodLiteral<"Sync/Play Playlist Complete">, z.ZodLiteral<"Sync/Play Playlist Cancelled">, z.ZodLiteral<"Transport Control Pause">, z.ZodLiteral<"Transport Control Play">, z.ZodLiteral<"Transport Control Next">, z.ZodLiteral<"Transport Control Previous">, z.ZodLiteral<"All Events">]>;
            }, "strip", z.ZodTypeAny, {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
                name: string;
                type: "WSTRING";
            }, {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
                name: string;
                type: "WSTRING";
            }>;
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
            name: z.ZodObject<{
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
            name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            message: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            event: {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
                name: string;
                type: "WSTRING";
            };
        }, {
            name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            message: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            event: {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
                name: string;
                type: "WSTRING";
            };
        }>;
    }, "strip", z.ZodTypeAny, {
        value: {
            name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            message: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            event: {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
                name: string;
                type: "WSTRING";
            };
        };
        name: string;
        type: "VARIANT_MAP";
    }, {
        value: {
            name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            message: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            event: {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
                name: string;
                type: "WSTRING";
            };
        };
        name: string;
        type: "VARIANT_MAP";
    }>;
    status: z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
    orchestration: {
        value: string;
        name: string;
        type: "WSTRING";
    };
    payload: {
        value: {
            name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            message: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            event: {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
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
        type: "WSTRING";
    };
}, {
    orchestration: {
        value: string;
        name: string;
        type: "WSTRING";
    };
    payload: {
        value: {
            name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            message: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            event: {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
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
        type: "WSTRING";
    };
}>;
export declare const deletePlaylistResponse: z.ZodObject<{
    name: z.ZodString;
    orchestration: z.ZodObject<{
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
    payload: z.ZodObject<{
        name: z.ZodString;
        type: z.ZodLiteral<"VARIANT_MAP">;
        value: z.ZodObject<{
            event: z.ZodObject<{
                name: z.ZodString;
                type: z.ZodLiteral<"WSTRING">;
                value: z.ZodUnion<[z.ZodLiteral<"Monitor Connect">, z.ZodLiteral<"Monitor Disconnect">, z.ZodLiteral<"Progress Start">, z.ZodLiteral<"Progress Completion">, z.ZodLiteral<"Progress Update">, z.ZodLiteral<"Playlist Instance">, z.ZodLiteral<"Playlist Insert">, z.ZodLiteral<"Playlist Delete">, z.ZodLiteral<"Sync/Play Playlist">, z.ZodLiteral<"Sync/Play Playlist Complete">, z.ZodLiteral<"Sync/Play Playlist Cancelled">, z.ZodLiteral<"Transport Control Pause">, z.ZodLiteral<"Transport Control Play">, z.ZodLiteral<"Transport Control Next">, z.ZodLiteral<"Transport Control Previous">, z.ZodLiteral<"All Events">]>;
            }, "strip", z.ZodTypeAny, {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
                name: string;
                type: "WSTRING";
            }, {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
                name: string;
                type: "WSTRING";
            }>;
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
            name: z.ZodObject<{
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
            name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            message: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            event: {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
                name: string;
                type: "WSTRING";
            };
        }, {
            name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            message: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            event: {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
                name: string;
                type: "WSTRING";
            };
        }>;
    }, "strip", z.ZodTypeAny, {
        value: {
            name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            message: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            event: {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
                name: string;
                type: "WSTRING";
            };
        };
        name: string;
        type: "VARIANT_MAP";
    }, {
        value: {
            name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            message: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            event: {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
                name: string;
                type: "WSTRING";
            };
        };
        name: string;
        type: "VARIANT_MAP";
    }>;
    status: z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
    orchestration: {
        value: string;
        name: string;
        type: "WSTRING";
    };
    payload: {
        value: {
            name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            message: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            event: {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
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
        type: "WSTRING";
    };
}, {
    orchestration: {
        value: string;
        name: string;
        type: "WSTRING";
    };
    payload: {
        value: {
            name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            message: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            event: {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
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
        type: "WSTRING";
    };
}>;
export declare const transportControlResponse: z.ZodObject<{
    name: z.ZodString;
    orchestration: z.ZodObject<{
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
    payload: z.ZodObject<{
        name: z.ZodString;
        type: z.ZodLiteral<"VARIANT_MAP">;
        value: z.ZodObject<{
            event: z.ZodObject<{
                name: z.ZodString;
                type: z.ZodLiteral<"WSTRING">;
                value: z.ZodUnion<[z.ZodLiteral<"Monitor Connect">, z.ZodLiteral<"Monitor Disconnect">, z.ZodLiteral<"Progress Start">, z.ZodLiteral<"Progress Completion">, z.ZodLiteral<"Progress Update">, z.ZodLiteral<"Playlist Instance">, z.ZodLiteral<"Playlist Insert">, z.ZodLiteral<"Playlist Delete">, z.ZodLiteral<"Sync/Play Playlist">, z.ZodLiteral<"Sync/Play Playlist Complete">, z.ZodLiteral<"Sync/Play Playlist Cancelled">, z.ZodLiteral<"Transport Control Pause">, z.ZodLiteral<"Transport Control Play">, z.ZodLiteral<"Transport Control Next">, z.ZodLiteral<"Transport Control Previous">, z.ZodLiteral<"All Events">]>;
            }, "strip", z.ZodTypeAny, {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
                name: string;
                type: "WSTRING";
            }, {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
                name: string;
                type: "WSTRING";
            }>;
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
            name: z.ZodObject<{
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
            name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            message: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            event: {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
                name: string;
                type: "WSTRING";
            };
        }, {
            name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            message: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            event: {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
                name: string;
                type: "WSTRING";
            };
        }>;
    }, "strip", z.ZodTypeAny, {
        value: {
            name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            message: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            event: {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
                name: string;
                type: "WSTRING";
            };
        };
        name: string;
        type: "VARIANT_MAP";
    }, {
        value: {
            name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            message: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            event: {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
                name: string;
                type: "WSTRING";
            };
        };
        name: string;
        type: "VARIANT_MAP";
    }>;
    status: z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
    orchestration: {
        value: string;
        name: string;
        type: "WSTRING";
    };
    payload: {
        value: {
            name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            message: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            event: {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
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
        type: "WSTRING";
    };
}, {
    orchestration: {
        value: string;
        name: string;
        type: "WSTRING";
    };
    payload: {
        value: {
            name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            message: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            event: {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
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
        type: "WSTRING";
    };
}>;
export declare const newItemPlayingResponse: z.ZodObject<{
    name: z.ZodString;
    orchestration: z.ZodObject<{
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
    payload: z.ZodObject<{
        name: z.ZodString;
        type: z.ZodLiteral<"VARIANT_MAP">;
        value: z.ZodObject<{
            event: z.ZodObject<{
                name: z.ZodString;
                type: z.ZodLiteral<"WSTRING">;
                value: z.ZodUnion<[z.ZodLiteral<"Monitor Connect">, z.ZodLiteral<"Monitor Disconnect">, z.ZodLiteral<"Progress Start">, z.ZodLiteral<"Progress Completion">, z.ZodLiteral<"Progress Update">, z.ZodLiteral<"Playlist Instance">, z.ZodLiteral<"Playlist Insert">, z.ZodLiteral<"Playlist Delete">, z.ZodLiteral<"Sync/Play Playlist">, z.ZodLiteral<"Sync/Play Playlist Complete">, z.ZodLiteral<"Sync/Play Playlist Cancelled">, z.ZodLiteral<"Transport Control Pause">, z.ZodLiteral<"Transport Control Play">, z.ZodLiteral<"Transport Control Next">, z.ZodLiteral<"Transport Control Previous">, z.ZodLiteral<"All Events">]>;
            }, "strip", z.ZodTypeAny, {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
                name: string;
                type: "WSTRING";
            }, {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
                name: string;
                type: "WSTRING";
            }>;
            index: z.ZodObject<{
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
            playlist_name: z.ZodObject<{
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
            tag: z.ZodObject<{
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
            index: {
                value: number;
                name: string;
                type: "UNSIGNED_INT";
            };
            playlist_name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            event: {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
                name: string;
                type: "WSTRING";
            };
            tag: {
                value: string;
                name: string;
                type: "WSTRING";
            };
        }, {
            index: {
                value: number;
                name: string;
                type: "UNSIGNED_INT";
            };
            playlist_name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            event: {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
                name: string;
                type: "WSTRING";
            };
            tag: {
                value: string;
                name: string;
                type: "WSTRING";
            };
        }>;
    }, "strip", z.ZodTypeAny, {
        value: {
            index: {
                value: number;
                name: string;
                type: "UNSIGNED_INT";
            };
            playlist_name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            event: {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
                name: string;
                type: "WSTRING";
            };
            tag: {
                value: string;
                name: string;
                type: "WSTRING";
            };
        };
        name: string;
        type: "VARIANT_MAP";
    }, {
        value: {
            index: {
                value: number;
                name: string;
                type: "UNSIGNED_INT";
            };
            playlist_name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            event: {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
                name: string;
                type: "WSTRING";
            };
            tag: {
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
}, "strip", z.ZodTypeAny, {
    orchestration: {
        value: string;
        name: string;
        type: "WSTRING";
    };
    payload: {
        value: {
            index: {
                value: number;
                name: string;
                type: "UNSIGNED_INT";
            };
            playlist_name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            event: {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
                name: string;
                type: "WSTRING";
            };
            tag: {
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
        type: "WSTRING";
    };
}, {
    orchestration: {
        value: string;
        name: string;
        type: "WSTRING";
    };
    payload: {
        value: {
            index: {
                value: number;
                name: string;
                type: "UNSIGNED_INT";
            };
            playlist_name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            event: {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
                name: string;
                type: "WSTRING";
            };
            tag: {
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
        type: "WSTRING";
    };
}>;
export declare const allEventsResponse: z.ZodObject<{
    name: z.ZodString;
    orchestration: z.ZodObject<{
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
    payload: z.ZodObject<{
        name: z.ZodString;
        type: z.ZodLiteral<"VARIANT_MAP">;
        value: z.ZodObject<{
            event: z.ZodObject<{
                name: z.ZodString;
                type: z.ZodLiteral<"WSTRING">;
                value: z.ZodUnion<[z.ZodLiteral<"Monitor Connect">, z.ZodLiteral<"Monitor Disconnect">, z.ZodLiteral<"Progress Start">, z.ZodLiteral<"Progress Completion">, z.ZodLiteral<"Progress Update">, z.ZodLiteral<"Playlist Instance">, z.ZodLiteral<"Playlist Insert">, z.ZodLiteral<"Playlist Delete">, z.ZodLiteral<"Sync/Play Playlist">, z.ZodLiteral<"Sync/Play Playlist Complete">, z.ZodLiteral<"Sync/Play Playlist Cancelled">, z.ZodLiteral<"Transport Control Pause">, z.ZodLiteral<"Transport Control Play">, z.ZodLiteral<"Transport Control Next">, z.ZodLiteral<"Transport Control Previous">, z.ZodLiteral<"All Events">]>;
            }, "strip", z.ZodTypeAny, {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
                name: string;
                type: "WSTRING";
            }, {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
                name: string;
                type: "WSTRING";
            }>;
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
            event: {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
                name: string;
                type: "WSTRING";
            };
        }, {
            message: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            event: {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
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
            event: {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
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
            event: {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
                name: string;
                type: "WSTRING";
            };
        };
        name: string;
        type: "VARIANT_MAP";
    }>;
    status: z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
    orchestration: {
        value: string;
        name: string;
        type: "WSTRING";
    };
    payload: {
        value: {
            message: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            event: {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
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
        type: "WSTRING";
    };
}, {
    orchestration: {
        value: string;
        name: string;
        type: "WSTRING";
    };
    payload: {
        value: {
            message: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            event: {
                value: "Monitor Connect" | "Monitor Disconnect" | "Progress Start" | "Progress Completion" | "Progress Update" | "Playlist Instance" | "Playlist Insert" | "Playlist Delete" | "Sync/Play Playlist" | "Sync/Play Playlist Complete" | "Sync/Play Playlist Cancelled" | "Transport Control Pause" | "Transport Control Play" | "Transport Control Next" | "Transport Control Previous" | "All Events";
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
        type: "WSTRING";
    };
}>;
export type BridgeEventMap = {
    "Monitor Connect": z.infer<typeof monitorConnectResponse>;
    "Monitor Disconnect": z.infer<typeof progressUpdateResponse>;
    "Progress Start": z.infer<typeof progressUpdateResponse>;
    "Progress Completion": z.infer<typeof progressUpdateResponse>;
    "Progress Update": z.infer<typeof progressUpdateResponse>;
    "Playlist Instance": z.infer<typeof instancePlaylistResponse>;
    "Playlist Insert": z.infer<typeof insertPlaylistResponse>;
    "Playlist Delete": z.infer<typeof deletePlaylistResponse>;
    "Sync/Play Playlist": z.infer<typeof progressUpdateResponse>;
    "Sync/Play Playlist Complete": z.infer<typeof progressUpdateResponse>;
    "Sync/Play Playlist Cancelled": z.infer<typeof progressUpdateResponse>;
    "Transport Control Pause": z.infer<typeof transportControlResponse>;
    "Transport Control Play": z.infer<typeof transportControlResponse>;
    "Transport Control Next": z.infer<typeof transportControlResponse>;
    "Transport Control Previous": z.infer<typeof transportControlResponse>;
    "New Item Playing": z.infer<typeof newItemPlayingResponse>;
    "All Events": z.infer<typeof allEventsResponse>;
    /**CUSTOM CLIENT EVENTS BELOW THESE ARE NOT PART OF BRIDGE */
    "Bridge Connected": z.infer<typeof progressUpdateResponse>;
    "Bridge Disconnected": z.infer<typeof progressUpdateResponse>;
};
export type BridgeEventKey = keyof BridgeEventMap;
