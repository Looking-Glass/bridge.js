import * as z from "zod"

export const name = z.string()

// const boolean = z.literal("BOOLEAN")
// const char = z.literal("CHAR")
// const short = z.literal("SHORT")
// const unsigned_short = z.literal("UNSIGNED_SHORT")
export const unsigned_int = z.object({
	name: name,
	type: z.literal("UNSIGNED_INT"),
	value: z.number(),
})

export const int = z.object({
	name: name,
	type: z.literal("INT"),
	value: z.number(),
})

// const long = z.literal("LONG")
export const float = z.object({
	name: name,
	type: z.literal("FLOAT"),
	value: z.number(),
})

// const double = z.literal("DOUBLE")
export const int2 = z.literal("INT2")
// const int3 = z.literal("INT3")
// const int4 = z.literal("INT4")
// const float2 = z.literal("FLOAT2")
// const float3 = z.literal("FLOAT3")
// const float4 = z.literal("FLOAT4")
// const float4x4 = z.literal("FLOAT4X4")
// const string = z.literal("STRING")
export const wstring = z.object({
	name: name,
	type: z.literal("WSTRING"),
	value: z.string(),
})

export const variant_map = z.literal("VARIANT_MAP")

// possible types that can be returned by bridge' status object.
export const completion = z.literal("Completion")
export const unknown = z.literal("UnknownOrchestration")
export const pending = z.literal("Pending")
export const failure = z.literal("Failure")
// these types exist, but haven't been seen in the wild.

// export const NotImplemented = z.literal("NotImplemented")
// export const aborted = z.literal("Aborted")
// export const fileNotFound = z.literal("FileNotFound")
// export const invalidCast = z.literal("InvalidCast")
// export const errorInParams = z.literal("ErrorInParams")
// export const inComplete = z.literal("Incomplete")
// export const inTearDown = z.literal("InTeardown")
// export const verbNotFound = z.literal("VerbNotFound")
// export const unknownWork = z.literal("UnknownWork")
// export const unknownPlaylist = z.literal("UnknownPlaylist")
// export const objectDelted = z.literal("ObjectDeleted")
// export const framesExhausted = z.literal("FramesExhausted")

export const status = z.object({
	name: name,
	type: wstring,
	value: z.union([completion, pending, failure, unknown]),
})
