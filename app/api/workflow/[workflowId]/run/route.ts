import { WorkflowParamsSchema } from "@/schemas/workflow";
import { workflows } from "@/test/workflow";
import { NodeRegistry, WorkflowEngine } from "@gpflow/engine";
import { NextRequest, NextResponse } from "next/server";

NodeRegistry.registerAll();

interface WorkflowRunParams {
    workflowId: string;
}

export async function POST(req: NextRequest, { params }: { params: Promise<WorkflowRunParams>} ) {
    try {
        const parameters = await params;
        const parsedParams = WorkflowParamsSchema.safeParse(parameters);
        if (!parsedParams.success) {
            return NextResponse.json({ error: parsedParams.error }, { status: 400 });
        }

        const { workflowId } = parsedParams.data;
        const workflow = workflows.find((wf) => wf.id === workflowId);

        if (!workflow) {
            return NextResponse.json(
                { error: "Workflow not found" },
                { status: 404 }
            );
        }

        const engine = new WorkflowEngine(workflow);
        const result = await engine.run();

        return NextResponse.json({ status: "success", result }, { status: 200 });

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