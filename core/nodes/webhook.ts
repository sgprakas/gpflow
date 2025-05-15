import { BaseNode } from "./base";

export class WebhookNode extends BaseNode<"webhook"> {
    async execute(input: any) {
        try {

            return this.success<"webhook">({
                url: input.url,
                method: input.method,
                body: input.body,
                headers: input.headers,
            }, {
                context: {
                    url: input.url,
                    method: input.method,
                    body: input.body,
                    headers: input.headers,
                }
            })

        } catch (error) {
            console.error(error);
            return this.failure(error);
        }
    }
}