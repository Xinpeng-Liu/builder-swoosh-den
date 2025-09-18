import { useState } from "react";
import { Sidebar } from "@/components/CineAI/Sidebar";
import { ClipsView } from "@/components/CineAI/ClipsView";
import { ClipPreview } from "@/components/CineAI/ClipPreview";
import { TopNav } from "@/components/CineAI/TopNav";

export interface ClipElement {
  id: string;
  type: "scene" | "character" | "plotBeat";
  title: string;
  description?: string;
  imageUrl?: string;
}

export interface CameraShot {
  id: string;
  name: string;
  icon: React.ReactNode;
  selected?: boolean;
}

export interface VisualStyle {
  id: string;
  name: string;
  selected?: boolean;
}

export interface ClipProject {
  id: string;
  scene?: ClipElement;
  character?: ClipElement;
  plotBeat?: ClipElement;
  cameraShots: CameraShot[];
  visualStyles: VisualStyle[];
  temperatureValue: number;
  qualityValue: number;
  lengthValue: number;
}

export default function Clips() {
  const [currentProject, setCurrentProject] = useState<ClipProject>({
    id: "1",
    cameraShots: [],
    visualStyles: [],
    temperatureValue: 0.7,
    qualityValue: 0.8,
    lengthValue: 15,
  });

  return (
    <div className="h-screen bg-[hsl(var(--cine-bg))] text-[hsl(var(--cine-text))] overflow-hidden cine-dark">
      {/* Top Navigation */}
      <TopNav />
      
      {/* Main Layout */}
      <div className="flex h-[calc(100vh-56px)]">
        {/* Sidebar */}
        <Sidebar activeItem="clips" />
        
        {/* Main Content Area */}
        <div className="flex flex-1">
          {/* Clips View */}
          <div className="flex-1 border-r border-[hsl(var(--cine-border))] overflow-y-auto">
            <ClipsView 
              project={currentProject}
              onProjectUpdate={setCurrentProject}
            />
          </div>
          
          {/* Clip Preview Panel */}
          <div className="w-96 bg-[hsl(var(--cine-sidebar))] overflow-y-auto">
            <ClipPreview project={currentProject} />
          </div>
        </div>
      </div>
    </div>
  );
}
