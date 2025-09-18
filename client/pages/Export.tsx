import React from "react";
import { TopNav } from "@/components/CineAI/TopNav";
import { Sidebar } from "@/components/CineAI/Sidebar";
import { ExportView } from "@/components/CineAI/ExportView";

export default function Export() {
  return (
    <div className="h-screen bg-[hsl(var(--cine-bg))] text-[hsl(var(--cine-text))] overflow-hidden cine-dark">
      <TopNav />
      <div className="flex h-[calc(100vh-3.5rem)]">
        <Sidebar activeItem="export" />
        <ExportView />
      </div>
    </div>
  );
}
