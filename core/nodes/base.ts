import { NodeInput, NodeParams, NodeResult, NodeType } from "../models/node";
import { CONFIG_SYMBOL, ExecutionConfig, ExecutionFailure, ExecutionResult } from "../models/result";

export abstract class BaseNode<T extends NodeType = NodeType> {

	protected success = <T extends NodeType>(data: NodeResult[T], config?: ExecutionConfig): ExecutionResult<NodeResult[T]> =>({
		status: "SUCCESS",
		data,
		[CONFIG_SYMBOL]: config,
	});

	protected failure = (err: unknown): ExecutionFailure => {
		if (err instanceof Error) {
			return {
				status: "FAILED",
				error: {
					message: err.message,
					stack: err.stack,
				},
			};
		}
		return {
			status: "FAILED",
			error: {
				message: "Unknown error",
				stack: "",
			},
		};
	}

	constructor(public id: string, public params: NodeParams[T]) { }
	abstract execute(
		input?: NodeInput,
		env?: Record<string, string>
	): Promise<ExecutionResult<NodeResult[T]>>;
}
