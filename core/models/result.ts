/**
 * Base Result
 */

import { HTTPMethodType } from "./common"


type Error = {
  message: string
  stack?: string
}

export const CONFIG_SYMBOL = Symbol("executionConfig");

export type ExecutionConfig  = {
  next?: string;
  context?: Record<string, any>;
}

export interface ExecutionSuccess<T> {
  status: "SUCCESS"
  executionTime?: number
  [CONFIG_SYMBOL]?: ExecutionConfig
  data: T
}

export interface ExecutionFailure {
  status: "FAILED"
  executionTime?: number
  [CONFIG_SYMBOL]?: ExecutionConfig
  error: Error
}

export type ExecutionResult<T> = ExecutionSuccess<T> | ExecutionFailure

/**
 * Node Result
 */

/**
 * HTTP Node Result Params
 */

export interface IHttpResult {
  statusCode: number
  data: any
}


/**
 * GPT Node Result Params
 */

export interface IGPTResult {
  response: string;
}

/**
 * Delay Node Result Params
 */

export interface IDelayResult {
  waitedMs: number;
}


/**
 * Condition Node Result Params
 */

export interface IConditionResult {
  result: boolean;
}


/**
 * Function Node Result Params
 */

export interface IFunctionResult {
  result: any;
}


/**
 * Database Node Type Params
 */

export interface IDatabaseResult {

}



/**
 * Webhook Node Type Params
 */

export interface IWebhookResult {
  url: string;
  method: HTTPMethodType;
  body?: any;
  query?: Record<string, string | string[]>;
  headers?: Record<string, string>;
}


/**
 * Email Node Type Params
 */

export interface IEmailResult {
  message: string
}