import { z } from "zod";

export const WebhookBodySchema = z.object({
    payload: z.any().optional(),
});

export type WebhookBody = z.infer<typeof WebhookBodySchema>;