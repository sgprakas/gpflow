import React from "react";
import { Sidebar } from "@/components/layout/sidebar";

export default function WorkflowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 ml-16 transition-all duration-300 ease-in-out">
        {children}
      </main>
    </div>
  );
}