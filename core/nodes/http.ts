import { TemplateParser } from "../engine/parser";
import { NodeInput } from "../models/node";
import { IHttpParams } from "../models/params";
import { BaseNode } from "./base";

export class HttpNode extends BaseNode<"http"> {
	async execute(input: NodeInput, env: Record<string, string>) {

		try {
			const context = { input, env };

			const { method = "GET" } = this.params;

			const parsed = TemplateParser.parse(this.params, context) as IHttpParams;

			const res = await fetch(parsed.url, {
				method,
				body: method !== "GET" ? JSON.stringify(parsed.body) : undefined,
				headers: parsed.headers,
			});

			let data;

			const contentType = res.headers.get('content-type');

			if (res.ok) {
				if (contentType && contentType.includes('application/json')) {
					data = await res.json();
				} else {
					data = await res.text();
				}
			} else {
				const errorText = contentType?.includes('application/json')
					? (await res.json()).message
					: await res.text();

				throw new Error(`Request failed: ${errorText}`);
			}

			return this.success<"http">({
				statusCode: res.status,
				data,
			}, {
				context: {
					statusCode: res.status,
					data,
				}
			});
		} catch (error) {
			console.error(error);
			return this.failure(error);
		}
	}
}
