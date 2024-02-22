import { z } from "zod";
import * as BridgeResponse from "../schemas/schema.responses";
export interface OrchestrationArgs {
    name: string;
    orchestration: string;
}
/**
 * this function will attempt to enter an orchestration
 * @param name
 * @returns
 */
export declare function tryEnterOrchestration({ name, orchestration }: OrchestrationArgs): Promise<{
    success: boolean;
    response: z.infer<typeof BridgeResponse.orchestration> | null;
}>;
export declare function tryExitOrchestration(orchestration: string): Promise<{
    success: boolean;
    response: z.infer<typeof BridgeResponse.orchestration> | null;
}>;
