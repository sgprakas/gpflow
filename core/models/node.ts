import { BaseNode } from "../nodes/base";
import {
	IConditionParams,
	IDatabaseParams,
	IDelayParams,
	IEmailParams,
	IFunctionParams,
	IGPTParams,
	IHttpParams,
	IWebhookParams,
} from "./params";
import {
	IConditionResult,
	IDatabaseResult,
	IDelayResult,
	IEmailResult,
	IFunctionResult,
	IGPTResult,
	IHttpResult,
	IWebhookResult,
} from "./result";

export type NodeType = keyof NodeParams;

export interface NodeParams {
	http: IHttpParams;
	gpt: IGPTParams;
	delay: IDelayParams;
	condition: IConditionParams;
	function: IFunctionParams;
	database: IDatabaseParams;
	webhook: IWebhookParams;
	email: IEmailParams;
}

export interface NodeResult {
	http: IHttpResult;
	gpt: IGPTResult;
	delay: IDelayResult;
	condition: IConditionResult;
	function: IFunctionResult;
	database: IDatabaseResult;
	webhook: IWebhookResult;
	email: IEmailResult;
}


export type NodeInput = NodeResult[keyof NodeResult]


export type NodeConstructor<T extends NodeType> = new (
	id: string,
	params: NodeParams[T]
) => BaseNode<T>;

export interface Node<T extends NodeType = NodeType> {
	id: string;
	type: T;
	parameters: NodeParams[T];
	next?: string;
}

export interface Workflow {
	id: string;
	nodes: Node[];
}
