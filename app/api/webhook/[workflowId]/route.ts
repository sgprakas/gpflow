import { WebhookBodySchema } from "@/schemas/webhook";
import { WorkflowParamsSchema } from "@/schemas/workflow";
import { workflows } from "@/test/workflow";
import { NodeRegistry, WorkflowEngine } from "@gpflow/engine";
import { NextRequest, NextResponse } from "next/server";

NodeRegistry.registerAll();

interface WebHookParams {
    workflowId: string;
}

export async function POST(req: NextRequest, { params }: { params: Promise<WebHookParams> }) {
    try {
        const body = await req.json();
        const parameters = await params;

        const parsedParams = WorkflowParamsSchema.safeParse(parameters);
        if (!parsedParams.success) {
            return NextResponse.json({ error: parsedParams.error }, { status: 400 });
        }

        const parsedBody = WebhookBodySchema.safeParse(body);
        if (!parsedBody.success) {
            return NextResponse.json({ error: parsedBody.error }, { status: 400 });
        }

        const { workflowId } = parsedParams.data;
        const { payload } = parsedBody.data;
        const workflow = workflows.find((wf) => wf.id === workflowId);

        if (!workflow) {
            return NextResponse.json(
                { error: "Workflow not found" },
                { status: 404 }
            );
        }

        (async () => {
            try {
                const engine = new WorkflowEngine(workflow);
                await engine.run({
                    url: req.url,
                    method: req.method,
                    body: payload,
                    headers: req.headers,
                });
            } catch (error) {
                console.error("Workflow execution failed:", error);
            }
        })();

        return new NextResponse(null, { status: 200 });

    } catch (error) {
        const err = error as Error;
        return NextResponse.json(
            {
                status: "error",
                message: err.message,
                stack: err.stack,
            },
            { status: 500 }
        );

    }
}