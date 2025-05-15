import { Workflow } from "@/core/models/node";

export const workflows =
    [{
        id: "greeting-flow",
        nodes: [
            { id: "1", type: "http", parameters: { url: "https://www.google.com", method: "GET" }, next: "2" },
            {
                id: "2", type: "function", parameters: {
                    code: `
                console.log(env);
                return {
                    message: "Hello World",
                    num: 123,
                    bool: true,
                }`},
                next: "3"
            },
            {
                id: "3", type: "condition", parameters: {
                    expression: "bool == false", trueNext: "4", falseNext: "5"
                }
            },
            { id: "4", type: "http", parameters: { url: "https://catfact.ninja/fact", method: "GET" } },
            { id: "5", type: "http", parameters: { url: "https://api.agify.io/?name=sanjay", method: "GET" }, next: "6" },
            { id: "6", type: "http", parameters: { url: "https://api.agify.io/?name=devgprakash@gmail.com", method: "GET" }, next: "7" },
            { id: "7", type: "email", parameters: { to: "{{data.name}}", displayName: "devp", subject: "Test n8n lite - gpflow", body: "<strong>It works!</strong>", replyTo:"sanjayprakashsl2@gmail.com" }}
        ],
    }] as Workflow[]; 