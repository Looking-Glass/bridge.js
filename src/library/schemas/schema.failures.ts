import { z } from "zod"
import { wstring, variant_map, status } from "./schema"
import { orchestration } from "./schema.responses"

export const play_playist_failure = z.object({
	name: z.string(),
	orchestration: orchestration,
	payload: z.object({
		name: z.string(),
		type: variant_map,
		value: z.object({
			message: wstring,
		}),
	}),
	status: status,
})
