import { BaseNode } from "./base";

export class DelayNode extends BaseNode<"delay"> {

    private convertToMs(duration: number, unit: "seconds" | "minutes" | "hours" | "days"): number {
        switch (unit) {
            case "seconds":
                return duration * 1000;
            case "minutes":
                return duration * 1000 * 60;
            case "hours":
                return duration * 1000 * 60 * 60;
            case "days":
                return duration * 1000 * 60 * 60 * 24;
            default:
                throw new Error("Invalid unit");
        }
    }

    async execute() {
        try {

            const { duration, unit } = this.params;

            const ms = this.convertToMs(duration, unit);
            await new Promise(resolve => setTimeout(resolve, ms));

            return this.success<"delay">({
                waitedMs: ms
            })

        } catch (error) {
            console.error(error);
            return this.failure(error);
        }
    }
}