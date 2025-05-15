import { workflows } from "@/test/workflow";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {

        const result = workflows

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