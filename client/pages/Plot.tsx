import { useState } from "react";
import { Sidebar } from "@/components/CineAI/Sidebar";
import { PlotView } from "@/components/CineAI/PlotView";
import { EditPlotPanel } from "@/components/CineAI/EditPlotPanel";
import { ScriptPreview } from "@/components/CineAI/ScriptPreview";
import { TopNav } from "@/components/CineAI/TopNav";

interface PlotPoint {
  id: string;
  title: string;
  type: "Dialogue" | "Action";
  description: string;
  character?: string;
  dialogue?: string;
  storyBeat?: string;
}

export default function Plot() {
  const [selectedPlotPoint, setSelectedPlotPoint] = useState<PlotPoint | null>(null);
  const [isEditPanelOpen, setIsEditPanelOpen] = useState(false);

  const mockPlotPoints: PlotPoint[] = [
    {
      id: "1",
      title: "Opening Scene: City Skyline",
      type: "Action",
      description: "A panoramic view of the futuristic city skyline. Narrator introduces the setting and time period.",
      storyBeat: "Establishes the futuristic setting and introduces the world.",
    },
    {
      id: "2", 
      title: "Character Introduction: Maya",
      type: "Dialogue",
      description: "Maya sits at her desk, surrounded by holographic displays. She's working on a complex algorithm that could potentially solve the energy crisis that has been plaguing the city for decades.",
      character: "Maya",
      dialogue: "MAYA: (to herself) Just one more variable and this should work. The quantum fluctuations need to be stabilized at exactly the right moment...",
      storyBeat: "Introduces Maya as a brilliant scientist working on solving the energy crisis.",
    },
    {
      id: "3",
      title: "Conflict Introduction", 
      type: "Action",
      description: "An alert flashes across Maya's screen. Security breach detected in the central database.",
      storyBeat: "Introduces the main conflict - a security breach that threatens Maya's research.",
    },
    {
      id: "4",
      title: "Character Introduction: Alex",
      type: "Dialogue", 
      description: "Alex enters the room, visibly concerned. He's the head of security and Maya's long-time friend.",
      character: "Alex",
      dialogue: "ALEX: Maya, we have a problem. Someone's infiltrated our quantum firewall. The quantum fluctuations in your research could be at risk.",
      storyBeat: "Introduces Alex as Maya's ally and establishes the urgency of the situation.",
    },
    {
      id: "5",
      title: "Rising Action",
      type: "Action",
      description: "Maya and Alex rush to the server room. Lights flicker as they approach. Something is very wrong.",
      storyBeat: "Escalates the tension as our protagonists rush to address the crisis.",
    },
    {
      id: "6",
      title: "Discovery", 
      type: "Dialogue",
      description: "They find an unknown device connected to the main terminal. Maya recognizes the technology.",
      character: "Maya",
      dialogue: "MAYA: This technology... I've seen it before. It's from the old quantum research facility that was shut down years ago.",
      storyBeat: "Reveals a connection to past events and deepens the mystery.",
    },
  ];

  useState(() => {
    // Set the selected plot point to "Character Introduction: Maya" by default
    const mayaIntro = mockPlotPoints.find(point => point.title === "Character Introduction: Maya");
    if (mayaIntro) {
      setSelectedPlotPoint(mayaIntro);
      setIsEditPanelOpen(true);
    }
  });

  const handlePlotPointSelect = (plotPoint: PlotPoint) => {
    setSelectedPlotPoint(plotPoint);
    setIsEditPanelOpen(true);
  };

  const handleEditPlotPoint = (plotPoint: PlotPoint) => {
    setSelectedPlotPoint(plotPoint);
    setIsEditPanelOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditPanelOpen(false);
  };

  return (
    <div className="h-screen bg-[hsl(var(--cine-bg))] text-[hsl(var(--cine-text))] overflow-hidden cine-dark">
      {/* Top Navigation */}
      <TopNav />
      
      {/* Main Layout */}
      <div className="flex h-[calc(100vh-56px)]">
        {/* Sidebar */}
        <Sidebar activeItem="plot" />
        
        {/* Main Content Area */}
        <div className="flex flex-1">
          {/* Plot View */}
          <div className="w-96 border-r border-[hsl(var(--cine-border))]">
            <PlotView 
              plotPoints={mockPlotPoints} 
              onPlotPointSelect={handlePlotPointSelect}
              selectedPlotPointId={selectedPlotPoint?.id}
            />
          </div>
          
          {/* Edit Panel */}
          {isEditPanelOpen && selectedPlotPoint && (
            <div className="flex-1 border-r border-[hsl(var(--cine-border))]">
              <EditPlotPanel 
                plotPoint={selectedPlotPoint} 
                onClose={handleCloseEdit}
                onPlotPointUpdate={(updatedPlotPoint) => setSelectedPlotPoint(updatedPlotPoint)}
              />
            </div>
          )}
          
          {/* Script Preview Panel */}
          {selectedPlotPoint && (
            <div className="w-80 bg-[hsl(var(--cine-sidebar))]">
              <ScriptPreview plotPoint={selectedPlotPoint} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
