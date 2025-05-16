"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

interface Workflow {
  id: string;
  name: string;
  company: string;
  status: "on" | "off";
  created: string;
  modified: string;
}

const staticWorkflows: Workflow[] = [
  {
    id: "social-media-posts",
    name: "Social Media Posts",
    company: "Company A",
    status: "off",
    created: "2022-01-15",
    modified: "2022-02-05"
  },
  {
    id: "lead-qualification",
    name: "Lead Qualification",
    company: "Company B",
    status: "on",
    created: "2022-03-20",
    modified: "2022-04-10"
  },
  {
    id: "order-fulfillment",
    name: "Order Fulfillment",
    company: "Company A",
    status: "off",
    created: "2022-05-05",
    modified: "2022-05-01"
  },
  {
    id: "email-marketing",
    name: "Email Marketing",
    company: "Company B",
    status: "off",
    created: "2022-07-10",
    modified: "2022-08-05"
  },
  {
    id: "inventory-management-1",
    name: "Inventory Management",
    company: "Company A",
    status: "on",
    created: "2022-04-15",
    modified: "2022-10-10"
  },
  {
    id: "inventory-management-2",
    name: "Inventory Management",
    company: "Company A",
    status: "on",
    created: "2022-04-15",
    modified: "2022-10-10"
  }
];

export default function WorkflowPage() {
  const totalWorkflows = {
    total: staticWorkflows.length,
    active: staticWorkflows.filter(w => w.status === "on").length
  };

  return (
    <div className="flex h-screen font-sans">
      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent tracking-tight">
                Workflows
              </h1>
              <div className="flex items-center gap-4 text-sm font-medium tracking-wide">
                <span className="text-gray-500">{totalWorkflows.total - totalWorkflows.active} inactive</span>
                <span className="text-indigo-600">{totalWorkflows.active} active</span>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={() => {/* Add workflow logic */}}
              className={cn(
                "w-fit group flex items-center gap-2",
                "bg-white hover:bg-indigo-600 border-indigo-200",
                "text-indigo-600 hover:text-white font-medium tracking-wide",
                "transition-all duration-200 ease-in-out"
              )}
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
                className="transition-transform group-hover:rotate-90"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add workflow
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {staticWorkflows.map((workflow) => (
                <Card
                  key={workflow.id}
                  className={cn(
                    "transition-all duration-200 group",
                    "hover:shadow-lg hover:shadow-indigo-100/50",
                    "border hover:border-indigo-300",
                    workflow.status === "on" 
                      ? "bg-gradient-to-br from-indigo-50 to-violet-50 border-indigo-200" 
                      : "bg-white hover:bg-gray-50/50"
                  )}
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        workflow.status === "on" 
                          ? "bg-indigo-500" 
                          : "bg-gray-300"
                      )} />
                      <span className={cn(
                        "text-sm font-medium tracking-wide",
                        workflow.status === "on" 
                          ? "text-indigo-600" 
                          : "text-gray-500"
                      )}>
                        {workflow.company}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "rounded-full w-8 h-8",
                        "hover:bg-indigo-100 transition-colors",
                        workflow.status === "on" 
                          ? "text-indigo-600" 
                          : "text-gray-400 hover:text-indigo-500"
                      )}
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
                        className="transition-transform group-hover:scale-110"
                      >
                        <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                        <line x1="12" y1="2" x2="12" y2="12"></line>
                      </svg>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <h3 className={cn(
                      "text-xl font-semibold mb-2 tracking-tight",
                      workflow.status === "on" 
                        ? "text-indigo-900" 
                        : "text-gray-700"
                    )}>
                      {workflow.name}
                    </h3>
                    <div className="text-sm space-y-1 tracking-wide">
                      <p className="text-gray-500">Created: {workflow.created}</p>
                      <p className="text-gray-500">Modified: {workflow.modified}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}