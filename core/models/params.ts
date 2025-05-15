/**
 * HTTP Node Type Params
 */

import { HTTPMethodType } from "./common";

export interface IHttpParams {
  url: string
  headers?: Record<string, string>
  method?: HTTPMethodType
  body?: any
}


/**
 * GPT Node Type Params
 */

export interface IGPTParams {
  prompt: string;
}

/**
 * Delay Node Type Params
 */

export interface IDelayParams {
  duration: number;
  unit: "seconds" | "minutes" | "hours" | "days";
}


/**
 * Condition Node Type Params
 */

export interface IConditionParams {
  expression: string;
  trueNext?: string;
  falseNext?: string;
}


/**
 * Function Node Type Params
 */

export interface IFunctionParams {
  code: string;
}


/**
 * Database Node Type Params
 */

export interface IDatabaseParams {
  db: string;
}



/**
 * Webhook Node Type Params
 */

export interface IWebhookParams {
  url: string;
  method: HTTPMethodType;
  body?: any;
  query?: Record<string, string | string[]>;
  headers?: Record<string, string>;
}


/**
 * Email Node Type Params
 */

export interface IEmailParams {
  to: string
  displayName: string
  subject: string
  body: string
  replyTo: string
}