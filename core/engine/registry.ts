import { ConditionNode } from "../nodes/condition";
import { DelayNode } from "../nodes/delay";
import { EmailNode } from "../nodes/email";
import { FunctionNode } from "../nodes/function";
import { HttpNode } from "../nodes/http";
import { WebhookNode } from "../nodes/webhook";
import { NodeFactory } from "./factory";

export class NodeRegistry {
    private static isRegistered = false;

    static registerAll() {
        if (this.isRegistered) return;
        this.isRegistered = true;

        NodeFactory.register("http", HttpNode);
        NodeFactory.register("webhook", WebhookNode);
        NodeFactory.register("function", FunctionNode);
        NodeFactory.register("delay", DelayNode);
        NodeFactory.register("condition", ConditionNode);
        NodeFactory.register("email", EmailNode);
    }
}