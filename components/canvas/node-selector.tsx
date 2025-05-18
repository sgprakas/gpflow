import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

const nodeTypes = [
    {
        label: "HTTP Request",
        type: "http",
        description: "Make HTTP requests to external services",
        icon: (
            <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            >
                <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
        ),
    },
    {
        label: "Function",
        type: "function",
        description: "Execute custom JavaScript functions",
        icon: (
            <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            >
                <path d="M8 16l2.879-2.879m0 0a3 3 0 104.242-4.242 3 3 0 00-4.242 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
    {
        label: "Webhook",
        type: "webhook",
        description: "Create webhook endpoints",
        icon: (
            <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            >
                <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
        ),
    },
    {
        label: "Condition",
        type: "condition",
        description: "Add conditional logic to your workflow",
        icon: (
            <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            >
                <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
    {
        label: "Delay",
        type: "delay",
        description: "Add time delay to your workflow",
        icon: (
            <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            >
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
    {
        label: "Email",
        type: "email",
        description: "Send emails in your workflow",
        icon: (
            <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            >
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
    },
];

export function NodeSelector({ onSelect }: { onSelect: (type: string) => void }) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className="h-16 w-16 rounded-full p-0 bg-indigo-50 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300 relative z-50"
                >
                    <svg
                        className="!h-8 !w-8 text-indigo-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M12 4v16m8-8H4" />
                    </svg>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 z-50" align="center" sideOffset={5}>
                <Command>
                    <CommandInput placeholder="Search nodes..." />
                    <CommandList>
                        <CommandEmpty>No nodes found.</CommandEmpty>
                        <CommandGroup>
                            {nodeTypes.map((node) => (
                                <CommandItem
                                    key={node.type}
                                    onSelect={() => onSelect(node.type)}
                                    className="flex items-center gap-2 p-2 cursor-pointer hover:bg-indigo-50 select-none"
                                >
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50">
                                        {node.icon}
                                    </div>
                                    <div>
                                        <p className="font-medium">{node.label}</p>
                                        <p className="text-sm text-slate-500">{node.description}</p>
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}