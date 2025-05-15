import { NodeInput } from "../models/node";
import { BaseNode } from "./base";
import jexl from "jexl";

export class ConditionNode extends BaseNode<"condition"> {

    async execute(input: NodeInput) {
        try {
            console.log("Evaluating condition",input);
            const result: boolean = await jexl.eval(this.params.expression, input);

            return this.success<"condition">({
                result
            }, {
                next: result ? this.params.trueNext : this.params.falseNext,
            })

        } catch (error) {
            console.error(error);
            return this.failure(error);
        }
    }
}