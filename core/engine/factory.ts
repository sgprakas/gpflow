import { Node, NodeConstructor, NodeType } from "../models/node";
import { BaseNode } from "../nodes/base";

export class NodeFactory {
    private static registry: Partial<Record<NodeType, NodeConstructor<any>>> = {}

    static register<T extends NodeType>(type: T, constructor: NodeConstructor<T>) {
        this.registry[type] = constructor
    }

    static create<T extends NodeType>(node: Node<T>): BaseNode<T> {
        const constructor = this.registry[node.type] as NodeConstructor<T>
        if(!constructor) {
            throw new Error(`Node type "${node.type}" is not registered`)
        }

        return new constructor(node.id, node.parameters)
    }
}