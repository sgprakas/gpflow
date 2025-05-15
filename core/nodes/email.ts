import { TemplateParser } from "../engine/parser";
import { NodeInput } from "../models/node";
import { IEmailParams } from "../models/params";
import { BaseNode } from "./base";
import { Resend } from 'resend';

export class EmailNode extends BaseNode<"email"> {
    async execute(input: NodeInput) {
        try {
            const resend = new Resend(process.env.RESEND_API_KEY);

            const { to, subject, body, displayName, replyTo } = TemplateParser.parse(this.params, input) as IEmailParams;

            const { data, error } = await resend.emails.send({
                from: `"${displayName}" <onboarding@resend.dev>`,
                to: to,
                subject: subject,
                html: body,
                replyTo: replyTo
            });

            if (error) {
                throw new Error(error.message)
            }

            return this.success<"email">({
                message: data?.id ? `Message Sent ${data?.id}` : "Unable to send message"
            })

        } catch (error) {
            console.error(error);
            return this.failure(error);
        }
    }
}