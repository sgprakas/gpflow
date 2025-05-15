import { FunctionWorker } from "../workers/worker";
import { BaseNode } from "./base";

export class FunctionNode extends BaseNode<"function"> {
    async execute(input: any) {
        try {

            const { code } = this.params

            const result = await FunctionWorker.run<"function">({
                code,
                input,
                env: process.env
            })

            return this.success<"function">(result, {
                context: result.result
            })

        } catch (error) {
            console.error(error);
            return this.failure(error);
        }
    }
}