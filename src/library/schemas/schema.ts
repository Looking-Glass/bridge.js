import * as z from "zod"

// const boolean = z.literal("BOOLEAN")
// const char = z.literal("CHAR")
// const short = z.literal("SHORT")
// const unsigned_short = z.literal("UNSIGNED_SHORT")
export const unsigned_int = z.literal("UNSIGNED_INT")
export const int = z.literal("INT")
// const long = z.literal("LONG")
export const float = z.literal("FLOAT")
// const double = z.literal("DOUBLE")
export const int2 = z.literal("INT2")
// const int3 = z.literal("INT3")
// const int4 = z.literal("INT4")
// const float2 = z.literal("FLOAT2")
// const float3 = z.literal("FLOAT3")
// const float4 = z.literal("FLOAT4")
// const float4x4 = z.literal("FLOAT4X4")
// const string = z.literal("STRING")
export const wstring = z.literal("WSTRING")
export const variant_map = z.literal("VARIANT_MAP")

// possible types that can be returned by bridge' status object.
export const completion = z.literal("Completion")
export const unknown = z.literal("UnknownOrchestration")
export const pending = z.literal("Pending")
export const failure = z.literal("Failure")

export const name = z.string()

export const status = z.object({
	name: name,
	type: wstring,
	value: z.union([completion, pending, failure, unknown]),
})
