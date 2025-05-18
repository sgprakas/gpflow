"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import FlowEditor from "@/components/canvas/flow-editor";
import { ReactFlowProvider } from '@xyflow/react';
import { useState } from "react";

export default function WorkflowEditorPage() {
    const params = useParams();
    const workflowId = params.workflowId as string;
    const [isActive, setIsActive] = useState(false);
    
    return (
        <div className="fixed inset-0 flex flex-col ml-16">
            <div className="flex items-center justify-between px-6 py-3 border-b bg-white/80 backdrop-blur-sm relative z-40">
                <div className="flex items-center">
                    <input 
                        type="text"
                        placeholder="Untitled Flow"
                        className="text-xl font-semibold bg-transparent border-none outline-none focus:ring-0 text-gray-800 placeholder:text-gray-400"
                        defaultValue="Untitled Flow"
                    />
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <label htmlFor="workflow-status" className="text-sm text-gray-500">
                            Active
                        </label>
                        <Switch 
                            id="workflow-status"
                            checked={isActive}
                            onCheckedChange={setIsActive}
                            className="data-[state=checked]:bg-indigo-600"
                        />
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-300 transition-colors"
                        onClick={() => {
                            // Implement share functionality
                            console.log('Share clicked');
                        }}
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                            <polyline points="16 6 12 2 8 6" />
                            <line x1="12" y1="2" x2="12" y2="15" />
                        </svg>
                        Share
                    </Button>
                </div>
            </div>
            <div className="flex-1 relative">
                <ReactFlowProvider>
                    <FlowEditor />
                </ReactFlowProvider>
            </div>
        </div>
    );
}