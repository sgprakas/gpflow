import { z } from "zod";

export const WorkflowParamsSchema = z.object({
    workflowId: z.string().min(1),
});

export type WorkflowParams = z.infer<typeof WorkflowParamsSchema>;