import {z} from "zod"
import { wstring, variant_map, status } from './schema';

export const play_playist_failure = z.object({
    name: z.string(),
    orchestration: z.object({
        name: z.string(),
        type: wstring,
        value: z.string()
    }),
    payload: z.object({
        name: z.string(),
        type: variant_map,
        value: z.object({
            message: z.object({
                name: z.string(),
                type: wstring,
                value: z.string()
            })
        })
    }),
    status: status
})
            