import flowBus from "@/core/engine/eventbus";
import { WorkflowParamsSchema } from "@/schemas/workflow";
import { NextRequest, NextResponse } from "next/server";

interface WorkflowUpdatesParams {
    workflowId: string;
}

export async function GET(req: NextRequest, { params }: { params: Promise<WorkflowUpdatesParams> }) {
    const parameters = await params;
    const parsedParams = WorkflowParamsSchema.safeParse(parameters);
    if (!parsedParams.success) {
        return NextResponse.json({ error: parsedParams.error }, { status: 400 });
    }

    const { workflowId } = parsedParams.data;

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
        start(controller) {
            const send = (data: any) => {
                controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
            };

            const unsubscribe = flowBus.subscribe(workflowId, send);

            req.signal.addEventListener('abort', () => {
                unsubscribe();
                controller.close();
            });
        },
    });

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
        },
    });
}