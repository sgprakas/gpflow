import { Node, NodeResult, NodeType, Workflow } from "../models/node";
import { CONFIG_SYMBOL, ExecutionSuccess } from "../models/result";
import { BaseNode } from "../nodes/base";
import flowBus from "./eventbus";
import { NodeFactory } from "./factory";

type NodeOutput = Record<string, any>

export class WorkflowEngine {
    constructor(private workflow: Workflow) { }

    async run(initial?: any): Promise<NodeOutput> {
        const workflowId = this.workflow.id
        const nodes = this.workflow.nodes
        const outputs: NodeOutput = {}
        const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]))

        const startNode = nodes.find(n => !nodes.some(m => m.next === n.id));
        if (!startNode) throw new Error("No valid start node found.");

        let currentNode: Node | undefined = startNode

        while (currentNode) {
            const nodeInstance = NodeFactory.create(currentNode) as BaseNode
            let input = this.resolveInputs(currentNode, outputs)?.[CONFIG_SYMBOL]?.context ?? initial;
            // Performance Calculation
            const start = performance.now();
            const output = await nodeInstance.execute(input);

            const end = performance.now();
            const executionTime = end - start;

            console.log(`Node ${currentNode.id} executed in ${executionTime} milliseconds.`);

            output.executionTime = executionTime

            flowBus.emit(workflowId, { output });

            outputs[currentNode.id] = output

            if (output.status === "FAILED") {
                console.error(`Node ${currentNode.id} failed with error: ${output.error.message}`);
                break;
            }

            const nextNodeId: string | undefined = currentNode.next ?? output[CONFIG_SYMBOL]?.next;

            currentNode = nextNodeId ? nodeMap[nextNodeId] : undefined
        }

        return outputs
    }

    private resolveInputs<T extends NodeType>(currentNode: Node<T>, outputs: NodeOutput): ExecutionSuccess<NodeResult[T]> | undefined {
        const nodes = this.workflow.nodes
        const previousNode = nodes.find(n => n.next === currentNode.id)
        return previousNode ? outputs[previousNode.id] : undefined
    }

}