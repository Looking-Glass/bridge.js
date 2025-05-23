import { z } from "zod";
export declare const version: z.ZodObject<{
    name: z.ZodString;
    payload: z.ZodObject<{
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
    payload: {
        value: string;
        name: string;
        type: "WSTRING";
    };
    name: string;
    status: {
        value: "Completion" | "UnknownOrchestration" | "Pending" | "Failure";
        name: string;
        type: "WSTRING";
    };
}, {
    payload: {
        value: string;
        name: string;
        type: "WSTRING";
    };
    name: string;
    status: {
        value: "Completion" | "UnknownOrchestration" | "Pending" | "Failure";
        name: string;
        type: "WSTRING";
    };
}>;
export declare const orchestration: z.ZodObject<{
    name: z.ZodString;
    payload: z.ZodObject<{
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
    payload: {
        value: string;
        name: string;
        type: "WSTRING";
    };
    name: string;
    status: {
        value: "Completion" | "UnknownOrchestration" | "Pending" | "Failure";
        name: string;
        type: "WSTRING";
    };
}, {
    payload: {
        value: string;
        name: string;
        type: "WSTRING";
    };
    name: string;
    status: {
        value: "Completion" | "UnknownOrchestration" | "Pending" | "Failure";
        name: string;
        type: "WSTRING";
    };
}>;
export declare const play_playlist: z.ZodObject<{
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
            id: z.ZodOptional<z.ZodObject<{
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
            }>>;
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
            id?: {
                value: string;
                name: string;
                type: "WSTRING";
            } | undefined;
        }, {
            message: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            id?: {
                value: string;
                name: string;
                type: "WSTRING";
            } | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        value: {
            message: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            id?: {
                value: string;
                name: string;
                type: "WSTRING";
            } | undefined;
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
            id?: {
                value: string;
                name: string;
                type: "WSTRING";
            } | undefined;
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
            id?: {
                value: string;
                name: string;
                type: "WSTRING";
            } | undefined;
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
            id?: {
                value: string;
                name: string;
                type: "WSTRING";
            } | undefined;
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
export declare const instance_playlist: z.ZodObject<{
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
        }, {
            name: {
                value: string;
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
export declare const insert_playlist_entry: z.ZodObject<{
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
            index: z.ZodObject<{
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
                value: string;
                name: string;
                type: "WSTRING";
            };
        }, {
            index: {
                value: string;
                name: string;
                type: "WSTRING";
            };
        }>;
    }, "strip", z.ZodTypeAny, {
        value: {
            index: {
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
export declare const delete_playlist: z.ZodObject<{
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
        }, {
            name: {
                value: string;
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
export declare const show_window: z.ZodObject<{
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
    name: string;
    status: {
        value: "Completion" | "UnknownOrchestration" | "Pending" | "Failure";
        name: string;
        type: "WSTRING";
    };
}>;
export declare const available_output_devices: z.ZodObject<{
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
        value: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            name: z.ZodString;
            type: z.ZodLiteral<"VARIANT_MAP">;
            value: z.ZodObject<{
                calibration: z.ZodObject<{
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
                defaultQuilt: z.ZodObject<{
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
                displayProblems: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                    name: z.ZodLiteral<"displayProblems">;
                    type: z.ZodLiteral<"VARIANT_MAP">;
                    value: z.ZodRecord<z.ZodString, z.ZodObject<{
                        name: z.ZodString;
                        type: z.ZodLiteral<"WSTRING">;
                        value: z.ZodObject<{
                            errorType: z.ZodObject<{
                                name: z.ZodString;
                                type: z.ZodLiteral<"WSTRING">;
                                value: z.ZodUnion<[z.ZodLiteral<"invalidResolution">, z.ZodLiteral<"invalidScale">, z.ZodLiteral<"invalidOrientation">, z.ZodLiteral<"invalidBitDepth">]>;
                            }, "strip", z.ZodTypeAny, {
                                value: "invalidResolution" | "invalidScale" | "invalidOrientation" | "invalidBitDepth";
                                name: string;
                                type: "WSTRING";
                            }, {
                                value: "invalidResolution" | "invalidScale" | "invalidOrientation" | "invalidBitDepth";
                                name: string;
                                type: "WSTRING";
                            }>;
                            expectedX: z.ZodObject<{
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
                            expectedY: z.ZodOptional<z.ZodObject<{
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
                            }>>;
                            observeredX: z.ZodObject<{
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
                            observeredY: z.ZodOptional<z.ZodObject<{
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
                            }>>;
                        }, "strip", z.ZodTypeAny, {
                            errorType: {
                                value: "invalidResolution" | "invalidScale" | "invalidOrientation" | "invalidBitDepth";
                                name: string;
                                type: "WSTRING";
                            };
                            expectedX: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            };
                            observeredX: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            };
                            expectedY?: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            } | undefined;
                            observeredY?: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            } | undefined;
                        }, {
                            errorType: {
                                value: "invalidResolution" | "invalidScale" | "invalidOrientation" | "invalidBitDepth";
                                name: string;
                                type: "WSTRING";
                            };
                            expectedX: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            };
                            observeredX: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            };
                            expectedY?: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            } | undefined;
                            observeredY?: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            } | undefined;
                        }>;
                    }, "strip", z.ZodTypeAny, {
                        value: {
                            errorType: {
                                value: "invalidResolution" | "invalidScale" | "invalidOrientation" | "invalidBitDepth";
                                name: string;
                                type: "WSTRING";
                            };
                            expectedX: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            };
                            observeredX: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            };
                            expectedY?: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            } | undefined;
                            observeredY?: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            } | undefined;
                        };
                        name: string;
                        type: "WSTRING";
                    }, {
                        value: {
                            errorType: {
                                value: "invalidResolution" | "invalidScale" | "invalidOrientation" | "invalidBitDepth";
                                name: string;
                                type: "WSTRING";
                            };
                            expectedX: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            };
                            observeredX: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            };
                            expectedY?: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            } | undefined;
                            observeredY?: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            } | undefined;
                        };
                        name: string;
                        type: "WSTRING";
                    }>>;
                }, "strip", z.ZodTypeAny, {
                    value: Record<string, {
                        value: {
                            errorType: {
                                value: "invalidResolution" | "invalidScale" | "invalidOrientation" | "invalidBitDepth";
                                name: string;
                                type: "WSTRING";
                            };
                            expectedX: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            };
                            observeredX: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            };
                            expectedY?: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            } | undefined;
                            observeredY?: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            } | undefined;
                        };
                        name: string;
                        type: "WSTRING";
                    }>;
                    name: "displayProblems";
                    type: "VARIANT_MAP";
                }, {
                    value: Record<string, {
                        value: {
                            errorType: {
                                value: "invalidResolution" | "invalidScale" | "invalidOrientation" | "invalidBitDepth";
                                name: string;
                                type: "WSTRING";
                            };
                            expectedX: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            };
                            observeredX: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            };
                            expectedY?: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            } | undefined;
                            observeredY?: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            } | undefined;
                        };
                        name: string;
                        type: "WSTRING";
                    }>;
                    name: "displayProblems";
                    type: "VARIANT_MAP";
                }>>>;
                hardwareVersion: z.ZodObject<{
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
                hwid: z.ZodObject<{
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
                state: z.ZodObject<{
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
                windowCoords: z.ZodObject<{
                    name: z.ZodString;
                    type: z.ZodLiteral<"INT2">;
                    value: z.ZodObject<{
                        x: z.ZodNumber;
                        y: z.ZodNumber;
                    }, "strip", z.ZodTypeAny, {
                        x: number;
                        y: number;
                    }, {
                        x: number;
                        y: number;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    value: {
                        x: number;
                        y: number;
                    };
                    name: string;
                    type: "INT2";
                }, {
                    value: {
                        x: number;
                        y: number;
                    };
                    name: string;
                    type: "INT2";
                }>;
            }, "strip", z.ZodTypeAny, {
                hwid: {
                    value: string;
                    name: string;
                    type: "WSTRING";
                };
                hardwareVersion: {
                    value: string;
                    name: string;
                    type: "WSTRING";
                };
                index: {
                    value: number;
                    name: string;
                    type: "UNSIGNED_INT";
                };
                state: {
                    value: string;
                    name: string;
                    type: "WSTRING";
                };
                windowCoords: {
                    value: {
                        x: number;
                        y: number;
                    };
                    name: string;
                    type: "INT2";
                };
                calibration: {
                    value: string;
                    name: string;
                    type: "WSTRING";
                };
                defaultQuilt: {
                    value: string;
                    name: string;
                    type: "WSTRING";
                };
                displayProblems?: Record<string, {
                    value: Record<string, {
                        value: {
                            errorType: {
                                value: "invalidResolution" | "invalidScale" | "invalidOrientation" | "invalidBitDepth";
                                name: string;
                                type: "WSTRING";
                            };
                            expectedX: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            };
                            observeredX: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            };
                            expectedY?: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            } | undefined;
                            observeredY?: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            } | undefined;
                        };
                        name: string;
                        type: "WSTRING";
                    }>;
                    name: "displayProblems";
                    type: "VARIANT_MAP";
                }> | undefined;
            }, {
                hwid: {
                    value: string;
                    name: string;
                    type: "WSTRING";
                };
                hardwareVersion: {
                    value: string;
                    name: string;
                    type: "WSTRING";
                };
                index: {
                    value: number;
                    name: string;
                    type: "UNSIGNED_INT";
                };
                state: {
                    value: string;
                    name: string;
                    type: "WSTRING";
                };
                windowCoords: {
                    value: {
                        x: number;
                        y: number;
                    };
                    name: string;
                    type: "INT2";
                };
                calibration: {
                    value: string;
                    name: string;
                    type: "WSTRING";
                };
                defaultQuilt: {
                    value: string;
                    name: string;
                    type: "WSTRING";
                };
                displayProblems?: Record<string, {
                    value: Record<string, {
                        value: {
                            errorType: {
                                value: "invalidResolution" | "invalidScale" | "invalidOrientation" | "invalidBitDepth";
                                name: string;
                                type: "WSTRING";
                            };
                            expectedX: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            };
                            observeredX: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            };
                            expectedY?: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            } | undefined;
                            observeredY?: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            } | undefined;
                        };
                        name: string;
                        type: "WSTRING";
                    }>;
                    name: "displayProblems";
                    type: "VARIANT_MAP";
                }> | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            value: {
                hwid: {
                    value: string;
                    name: string;
                    type: "WSTRING";
                };
                hardwareVersion: {
                    value: string;
                    name: string;
                    type: "WSTRING";
                };
                index: {
                    value: number;
                    name: string;
                    type: "UNSIGNED_INT";
                };
                state: {
                    value: string;
                    name: string;
                    type: "WSTRING";
                };
                windowCoords: {
                    value: {
                        x: number;
                        y: number;
                    };
                    name: string;
                    type: "INT2";
                };
                calibration: {
                    value: string;
                    name: string;
                    type: "WSTRING";
                };
                defaultQuilt: {
                    value: string;
                    name: string;
                    type: "WSTRING";
                };
                displayProblems?: Record<string, {
                    value: Record<string, {
                        value: {
                            errorType: {
                                value: "invalidResolution" | "invalidScale" | "invalidOrientation" | "invalidBitDepth";
                                name: string;
                                type: "WSTRING";
                            };
                            expectedX: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            };
                            observeredX: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            };
                            expectedY?: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            } | undefined;
                            observeredY?: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            } | undefined;
                        };
                        name: string;
                        type: "WSTRING";
                    }>;
                    name: "displayProblems";
                    type: "VARIANT_MAP";
                }> | undefined;
            };
            name: string;
            type: "VARIANT_MAP";
        }, {
            value: {
                hwid: {
                    value: string;
                    name: string;
                    type: "WSTRING";
                };
                hardwareVersion: {
                    value: string;
                    name: string;
                    type: "WSTRING";
                };
                index: {
                    value: number;
                    name: string;
                    type: "UNSIGNED_INT";
                };
                state: {
                    value: string;
                    name: string;
                    type: "WSTRING";
                };
                windowCoords: {
                    value: {
                        x: number;
                        y: number;
                    };
                    name: string;
                    type: "INT2";
                };
                calibration: {
                    value: string;
                    name: string;
                    type: "WSTRING";
                };
                defaultQuilt: {
                    value: string;
                    name: string;
                    type: "WSTRING";
                };
                displayProblems?: Record<string, {
                    value: Record<string, {
                        value: {
                            errorType: {
                                value: "invalidResolution" | "invalidScale" | "invalidOrientation" | "invalidBitDepth";
                                name: string;
                                type: "WSTRING";
                            };
                            expectedX: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            };
                            observeredX: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            };
                            expectedY?: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            } | undefined;
                            observeredY?: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            } | undefined;
                        };
                        name: string;
                        type: "WSTRING";
                    }>;
                    name: "displayProblems";
                    type: "VARIANT_MAP";
                }> | undefined;
            };
            name: string;
            type: "VARIANT_MAP";
        }>>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: "VARIANT_MAP";
        value?: Record<string, {
            value: {
                hwid: {
                    value: string;
                    name: string;
                    type: "WSTRING";
                };
                hardwareVersion: {
                    value: string;
                    name: string;
                    type: "WSTRING";
                };
                index: {
                    value: number;
                    name: string;
                    type: "UNSIGNED_INT";
                };
                state: {
                    value: string;
                    name: string;
                    type: "WSTRING";
                };
                windowCoords: {
                    value: {
                        x: number;
                        y: number;
                    };
                    name: string;
                    type: "INT2";
                };
                calibration: {
                    value: string;
                    name: string;
                    type: "WSTRING";
                };
                defaultQuilt: {
                    value: string;
                    name: string;
                    type: "WSTRING";
                };
                displayProblems?: Record<string, {
                    value: Record<string, {
                        value: {
                            errorType: {
                                value: "invalidResolution" | "invalidScale" | "invalidOrientation" | "invalidBitDepth";
                                name: string;
                                type: "WSTRING";
                            };
                            expectedX: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            };
                            observeredX: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            };
                            expectedY?: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            } | undefined;
                            observeredY?: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            } | undefined;
                        };
                        name: string;
                        type: "WSTRING";
                    }>;
                    name: "displayProblems";
                    type: "VARIANT_MAP";
                }> | undefined;
            };
            name: string;
            type: "VARIANT_MAP";
        }> | undefined;
    }, {
        name: string;
        type: "VARIANT_MAP";
        value?: Record<string, {
            value: {
                hwid: {
                    value: string;
                    name: string;
                    type: "WSTRING";
                };
                hardwareVersion: {
                    value: string;
                    name: string;
                    type: "WSTRING";
                };
                index: {
                    value: number;
                    name: string;
                    type: "UNSIGNED_INT";
                };
                state: {
                    value: string;
                    name: string;
                    type: "WSTRING";
                };
                windowCoords: {
                    value: {
                        x: number;
                        y: number;
                    };
                    name: string;
                    type: "INT2";
                };
                calibration: {
                    value: string;
                    name: string;
                    type: "WSTRING";
                };
                defaultQuilt: {
                    value: string;
                    name: string;
                    type: "WSTRING";
                };
                displayProblems?: Record<string, {
                    value: Record<string, {
                        value: {
                            errorType: {
                                value: "invalidResolution" | "invalidScale" | "invalidOrientation" | "invalidBitDepth";
                                name: string;
                                type: "WSTRING";
                            };
                            expectedX: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            };
                            observeredX: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            };
                            expectedY?: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            } | undefined;
                            observeredY?: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            } | undefined;
                        };
                        name: string;
                        type: "WSTRING";
                    }>;
                    name: "displayProblems";
                    type: "VARIANT_MAP";
                }> | undefined;
            };
            name: string;
            type: "VARIANT_MAP";
        }> | undefined;
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
        name: string;
        type: "VARIANT_MAP";
        value?: Record<string, {
            value: {
                hwid: {
                    value: string;
                    name: string;
                    type: "WSTRING";
                };
                hardwareVersion: {
                    value: string;
                    name: string;
                    type: "WSTRING";
                };
                index: {
                    value: number;
                    name: string;
                    type: "UNSIGNED_INT";
                };
                state: {
                    value: string;
                    name: string;
                    type: "WSTRING";
                };
                windowCoords: {
                    value: {
                        x: number;
                        y: number;
                    };
                    name: string;
                    type: "INT2";
                };
                calibration: {
                    value: string;
                    name: string;
                    type: "WSTRING";
                };
                defaultQuilt: {
                    value: string;
                    name: string;
                    type: "WSTRING";
                };
                displayProblems?: Record<string, {
                    value: Record<string, {
                        value: {
                            errorType: {
                                value: "invalidResolution" | "invalidScale" | "invalidOrientation" | "invalidBitDepth";
                                name: string;
                                type: "WSTRING";
                            };
                            expectedX: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            };
                            observeredX: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            };
                            expectedY?: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            } | undefined;
                            observeredY?: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            } | undefined;
                        };
                        name: string;
                        type: "WSTRING";
                    }>;
                    name: "displayProblems";
                    type: "VARIANT_MAP";
                }> | undefined;
            };
            name: string;
            type: "VARIANT_MAP";
        }> | undefined;
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
        name: string;
        type: "VARIANT_MAP";
        value?: Record<string, {
            value: {
                hwid: {
                    value: string;
                    name: string;
                    type: "WSTRING";
                };
                hardwareVersion: {
                    value: string;
                    name: string;
                    type: "WSTRING";
                };
                index: {
                    value: number;
                    name: string;
                    type: "UNSIGNED_INT";
                };
                state: {
                    value: string;
                    name: string;
                    type: "WSTRING";
                };
                windowCoords: {
                    value: {
                        x: number;
                        y: number;
                    };
                    name: string;
                    type: "INT2";
                };
                calibration: {
                    value: string;
                    name: string;
                    type: "WSTRING";
                };
                defaultQuilt: {
                    value: string;
                    name: string;
                    type: "WSTRING";
                };
                displayProblems?: Record<string, {
                    value: Record<string, {
                        value: {
                            errorType: {
                                value: "invalidResolution" | "invalidScale" | "invalidOrientation" | "invalidBitDepth";
                                name: string;
                                type: "WSTRING";
                            };
                            expectedX: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            };
                            observeredX: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            };
                            expectedY?: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            } | undefined;
                            observeredY?: {
                                value: number;
                                name: string;
                                type: "FLOAT";
                            } | undefined;
                        };
                        name: string;
                        type: "WSTRING";
                    }>;
                    name: "displayProblems";
                    type: "VARIANT_MAP";
                }> | undefined;
            };
            name: string;
            type: "VARIANT_MAP";
        }> | undefined;
    };
    name: string;
    status: {
        value: "Completion" | "UnknownOrchestration" | "Pending" | "Failure";
        name: string;
        type: "WSTRING";
    };
}>;
export declare const instance_studio_playlist: z.ZodObject<{
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
        }, {
            name: {
                value: string;
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
export declare const update_playlist_entry: z.ZodObject<{
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
    name: string;
    status: {
        value: "Completion" | "UnknownOrchestration" | "Pending" | "Failure";
        name: string;
        type: "WSTRING";
    };
}>;
export declare const update_current_entry: z.ZodObject<{
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
    name: string;
    status: {
        value: "Completion" | "UnknownOrchestration" | "Pending" | "Failure";
        name: string;
        type: "WSTRING";
    };
}>;
export declare const get_autostart_playlist: z.ZodObject<{
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
            playlist_path: z.ZodObject<{
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
            playlist_name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            playlist_path: {
                value: string;
                name: string;
                type: "WSTRING";
            };
        }, {
            playlist_name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            playlist_path: {
                value: string;
                name: string;
                type: "WSTRING";
            };
        }>;
    }, "strip", z.ZodTypeAny, {
        value: {
            playlist_name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            playlist_path: {
                value: string;
                name: string;
                type: "WSTRING";
            };
        };
        name: string;
        type: "VARIANT_MAP";
    }, {
        value: {
            playlist_name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            playlist_path: {
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
            playlist_name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            playlist_path: {
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
            playlist_name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
            playlist_path: {
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
export declare const set_autostart_playlist: z.ZodObject<{
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
        }, "strip", z.ZodTypeAny, {
            playlist_name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
        }, {
            playlist_name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
        }>;
    }, "strip", z.ZodTypeAny, {
        value: {
            playlist_name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
        };
        name: string;
        type: "VARIANT_MAP";
    }, {
        value: {
            playlist_name: {
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
            playlist_name: {
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
            playlist_name: {
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
export declare const set_named_autostart_playlist: z.ZodObject<{
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
        }, "strip", z.ZodTypeAny, {
            playlist_name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
        }, {
            playlist_name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
        }>;
    }, "strip", z.ZodTypeAny, {
        value: {
            playlist_name: {
                value: string;
                name: string;
                type: "WSTRING";
            };
        };
        name: string;
        type: "VARIANT_MAP";
    }, {
        value: {
            playlist_name: {
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
            playlist_name: {
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
            playlist_name: {
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
export declare const transport_control_play: z.ZodObject<{
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
    name: string;
    status: {
        value: "Completion" | "UnknownOrchestration" | "Pending" | "Failure";
        name: string;
        type: "WSTRING";
    };
}>;
export declare const transport_control_pause: z.ZodObject<{
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
    name: string;
    status: {
        value: "Completion" | "UnknownOrchestration" | "Pending" | "Failure";
        name: string;
        type: "WSTRING";
    };
}>;
export declare const transport_control_next: z.ZodObject<{
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
    name: string;
    status: {
        value: "Completion" | "UnknownOrchestration" | "Pending" | "Failure";
        name: string;
        type: "WSTRING";
    };
}>;
export declare const transport_control_previous: z.ZodObject<{
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
    name: string;
    status: {
        value: "Completion" | "UnknownOrchestration" | "Pending" | "Failure";
        name: string;
        type: "WSTRING";
    };
}>;
export declare const transport_control_seek_to_index: z.ZodObject<{
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
    name: string;
    status: {
        value: "Completion" | "UnknownOrchestration" | "Pending" | "Failure";
        name: string;
        type: "WSTRING";
    };
}>;
