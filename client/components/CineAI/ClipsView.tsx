import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Palette, User, BookOpen, Camera, Film, Maximize, Square, Circle, Eye, Video, Monitor, Smartphone, Tablet, Aperture, Focus, Move3d, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ClipProject, ClipElement, CameraShot, VisualStyle } from "@/pages/Clips";

interface ClipsViewProps {
  project: ClipProject;
  onProjectUpdate: (project: ClipProject) => void;
}

export function ClipsView({ project, onProjectUpdate }: ClipsViewProps) {
  const [activeTab, setActiveTab] = useState<"scenes" | "characters" | "plotBeats">("scenes");

  const cameraShots: CameraShot[] = [
    { id: "wide", name: "Wide", icon: <Maximize className="w-3 h-5" /> },
    { id: "medium", name: "Medium", icon: <Square className="w-3 h-5" /> },
    { id: "closeup", name: "Close Up", icon: <Circle className="w-3.5 h-5" /> },
    { id: "extreme", name: "Extreme", icon: <Eye className="w-4 h-5" /> },
    { id: "over", name: "Over", icon: <Focus className="w-3.5 h-5" /> },
    { id: "low", name: "Low", icon: <Move3d className="w-3.5 h-5" /> },
    { id: "high", name: "High", icon: <Layers className="w-4 h-5" /> },
    { id: "tracking", name: "Tracking", icon: <Video className="w-4 h-5" /> },
    { id: "tilted", name: "Tilted", icon: <Monitor className="w-3 h-5" /> },
    { id: "handheld", name: "Handheld", icon: <Smartphone className="w-3 h-5" /> },
    { id: "steadicam", name: "Steadicam", icon: <Tablet className="w-3 h-5" /> },
    { id: "macro", name: "Macro", icon: <Aperture className="w-3 h-5" /> },
    { id: "aerial", name: "Aerial", icon: <Camera className="w-3.5 h-5" /> },
    { id: "underwater", name: "Underwater", icon: <Film className="w-3 h-5" /> },
    { id: "dolly", name: "Dolly", icon: <Monitor className="w-3 h-5" /> },
    { id: "zoom", name: "Zoom", icon: <Focus className="w-3 h-5" /> },
  ];

  const visualStyles: VisualStyle[] = [
    { id: "cinematic", name: "Cinematic" },
    { id: "noir", name: "Noir" },
    { id: "cyberpunk", name: "Cyberpunk" },
    { id: "fantasy", name: "Fantasy" },
    { id: "cartoon", name: "Cartoon" },
    { id: "realistic", name: "Realistic" },
    { id: "dark", name: "Dark" },
    { id: "light", name: "Light" },
  ];

  const mockScenes = [
    { id: "1", title: "Futuristic City", imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/dfe9dab9ac4d667b29a86b0d6ef29dab1153e28c?width=116" },
    { id: "2", title: "Laboratory", imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/a75c8c807cc2b335f7498d9afa932903260741f5?width=116" },
    { id: "3", title: "Dark City", imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/6ec4fcbe7e6693b641dc0207f0840887d55642c4?width=116" },
  ];

  const mockCharacters = [
    { id: "1", title: "Nova Chen", imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/5821b6aa396b0511f311c392689060b59165fad7?width=116" },
    { id: "2", title: "Victor Crane", imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/327c573275f90714e5fc082eb19efa30fb5af628?width=116" },
    { id: "3", title: "Dr. Elias Grey", imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/a4e4a4142936de335afe5db4326fa663156cf842?width=116" },
    { id: "4", title: "Maya Rodriguez", imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/bfab3bf8103c4269e3dc36705e7b3b4d55de5f86?width=116" },
    { id: "5", title: "Cipher", imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/9c9f023457482aacb444e53278bc0ce55e5370a5?width=116" },
  ];

  const mockPlotBeats = [
    { id: "1", title: "Opening Scene" },
    { id: "2", title: "Character Introduction" },
    { id: "3", title: "Conflict Emerges" },
  ];

  const handleDropZoneClick = (type: "scene" | "character" | "plotBeat") => {
    // For now, just set a mock element
    const mockData = {
      scene: { id: "1", type: "scene" as const, title: "Futuristic City", imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/dfe9dab9ac4d667b29a86b0d6ef29dab1153e28c?width=116" },
      character: { id: "1", type: "character" as const, title: "Nova Chen", imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/5821b6aa396b0511f311c392689060b59165fad7?width=116" },
      plotBeat: { id: "1", type: "plotBeat" as const, title: "Opening Scene" }
    };

    onProjectUpdate({
      ...project,
      [type]: mockData[type]
    });
  };

  const handleItemSelect = (item: any, type: "scene" | "character" | "plotBeat") => {
    const element: ClipElement = {
      id: item.id,
      type,
      title: item.title,
      imageUrl: item.imageUrl
    };

    onProjectUpdate({
      ...project,
      [type]: element
    });
  };

  const handleCameraShotToggle = (shotId: string) => {
    const updatedShots = project.cameraShots.find(s => s.id === shotId)
      ? project.cameraShots.filter(s => s.id !== shotId)
      : [...project.cameraShots, cameraShots.find(s => s.id === shotId)!];
    
    onProjectUpdate({
      ...project,
      cameraShots: updatedShots
    });
  };

  const handleStyleToggle = (styleId: string) => {
    const updatedStyles = project.visualStyles.find(s => s.id === styleId)
      ? project.visualStyles.filter(s => s.id !== styleId)
      : [...project.visualStyles, visualStyles.find(s => s.id === styleId)!];
    
    onProjectUpdate({
      ...project,
      visualStyles: updatedStyles
    });
  };

  const handleSliderChange = (key: "temperatureValue" | "qualityValue" | "lengthValue", value: number) => {
    onProjectUpdate({
      ...project,
      [key]: value
    });
  };

  const handleGenerateClip = () => {
    // Check if all required elements are present
    if (!project.scene || !project.character || !project.plotBeat) {
      alert("Please select a scene, character, and plot beat before generating a clip.");
      return;
    }

    // Show generation progress (in a real app, this would trigger actual generation)
    alert(`Generating clip with:\nScene: ${project.scene.title}\nCharacter: ${project.character.title}\nPlot Beat: ${project.plotBeat.title}\nCamera Shots: ${project.cameraShots.length}\nStyles: ${project.visualStyles.length}`);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-5">
        <h2 className="text-xl font-normal text-white mb-4">Clip Builder Canvas</h2>
        
        {/* Drop Zones */}
        <div className="flex gap-4 mb-6">
          <div
            className={cn(
              "w-42 h-36 p-4 flex flex-col items-center justify-center border-2 rounded-lg cursor-pointer transition-colors",
              project.scene
                ? "border-purple-500 bg-purple-500/10"
                : "border-dashed border-[hsl(var(--cine-border))] bg-[hsl(var(--cine-sidebar))] hover:border-purple-500"
            )}
            onClick={() => handleDropZoneClick("scene")}
          >
            {project.scene && project.scene.imageUrl ? (
              <img src={project.scene.imageUrl} alt={project.scene.title} className="w-full h-full object-cover rounded-md" />
            ) : (
              <>
                <Palette className="w-6 h-6 text-[hsl(var(--cine-text-muted))] mb-2" />
                <span className="text-sm text-[hsl(var(--cine-text-muted))] text-center mb-2">
                  {project.scene ? project.scene.title : "Drop Scene Here"}
                </span>
                {!project.scene && (
                  <span className="text-xs text-purple-500">or Click to Select</span>
                )}
              </>
            )}
          </div>

          <div
            className={cn(
              "w-42 h-36 p-4 flex flex-col items-center justify-center border-2 rounded-lg cursor-pointer transition-colors",
              project.character
                ? "border-purple-500 bg-purple-500/10"
                : "border-dashed border-[hsl(var(--cine-border))] bg-[hsl(var(--cine-sidebar))] hover:border-purple-500"
            )}
            onClick={() => handleDropZoneClick("character")}
          >
            {project.character && project.character.imageUrl ? (
              <img src={project.character.imageUrl} alt={project.character.title} className="w-full h-full object-cover rounded-md" />
            ) : (
              <>
                <User className="w-5 h-6 text-[hsl(var(--cine-text-muted))] mb-2" />
                <span className="text-sm text-[hsl(var(--cine-text-muted))] text-center mb-2">
                  {project.character ? project.character.title : "Drop Character Here"}
                </span>
                {!project.character && (
                  <span className="text-xs text-purple-500">or Click to Select</span>
                )}
              </>
            )}
          </div>

          <div
            className={cn(
              "w-42 h-36 p-4 flex flex-col items-center justify-center border-2 rounded-lg cursor-pointer transition-colors",
              project.plotBeat
                ? "border-purple-500 bg-purple-500/10"
                : "border-dashed border-[hsl(var(--cine-border))] bg-[hsl(var(--cine-sidebar))] hover:border-purple-500"
            )}
            onClick={() => handleDropZoneClick("plotBeat")}
          >
            <BookOpen className="w-7 h-6 text-[hsl(var(--cine-text-muted))] mb-2" />
            <span className="text-sm text-[hsl(var(--cine-text-muted))] text-center">
              {project.plotBeat ? project.plotBeat.title : "Drop Plot Beat Here"}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[hsl(var(--cine-border))] mb-4">
          <button
            onClick={() => setActiveTab("scenes")}
            className={cn(
              "px-4 py-2 text-sm font-medium border-b-2",
              activeTab === "scenes"
                ? "text-white border-purple-500"
                : "text-[hsl(var(--cine-text-muted))] border-transparent hover:text-white"
            )}
          >
            Scenes
          </button>
          <button
            onClick={() => setActiveTab("characters")}
            className={cn(
              "px-4 py-2 text-sm font-medium border-b-2",
              activeTab === "characters"
                ? "text-white border-purple-500"
                : "text-[hsl(var(--cine-text-muted))] border-transparent hover:text-white"
            )}
          >
            Characters
          </button>
          <button
            onClick={() => setActiveTab("plotBeats")}
            className={cn(
              "px-4 py-2 text-sm font-medium border-b-2",
              activeTab === "plotBeats"
                ? "text-white border-purple-500"
                : "text-[hsl(var(--cine-text-muted))] border-transparent hover:text-white"
            )}
          >
            Plot Beats
          </button>
        </div>

        {/* Tab Content */}
        <div className="h-32 p-4 bg-[hsl(var(--cine-sidebar))] border border-[hsl(var(--cine-border))] rounded-lg mb-6">
          <div className="flex gap-3">
            {activeTab === "scenes" && mockScenes.map((scene) => (
              <div
                key={scene.id}
                className="w-29 h-30 bg-[hsl(var(--cine-card))] rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-purple-500 transition-all"
                onClick={() => handleItemSelect(scene, "scene")}
              >
                <img src={scene.imageUrl} alt={scene.title} className="w-full h-full object-cover" />
              </div>
            ))}
            {activeTab === "characters" && mockCharacters.map((character) => (
              <div
                key={character.id}
                className="w-29 h-30 bg-[hsl(var(--cine-card))] rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-purple-500 transition-all"
                onClick={() => handleItemSelect(character, "character")}
              >
                <img src={character.imageUrl} alt={character.title} className="w-full h-full object-cover" />
              </div>
            ))}
            {activeTab === "plotBeats" && mockPlotBeats.map((plotBeat) => (
              <div
                key={plotBeat.id}
                className="w-29 h-30 bg-[hsl(var(--cine-card))] rounded-lg p-2 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-purple-500 transition-all"
                onClick={() => handleItemSelect(plotBeat, "plotBeat")}
              >
                <span className="text-xs text-center text-[hsl(var(--cine-text-muted))]">{plotBeat.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Camera Shots */}
      <div className="px-5 mb-6">
        <div className="p-4 bg-[hsl(var(--cine-sidebar))] border border-[hsl(var(--cine-border))] rounded-lg">
          <h3 className="text-sm font-medium text-white mb-3">Camera Shots</h3>
          <div className="grid grid-cols-8 gap-2">
            {cameraShots.map((shot) => (
              <Button
                key={shot.id}
                variant="outline"
                size="sm"
                onClick={() => handleCameraShotToggle(shot.id)}
                className={cn(
                  "h-18 flex flex-col items-center gap-1 border-[hsl(var(--cine-border))] bg-[hsl(var(--cine-card))]",
                  project.cameraShots.find(s => s.id === shot.id)
                    ? "border-purple-500 text-purple-500"
                    : "text-[hsl(var(--cine-text-muted))] hover:text-white"
                )}
              >
                {shot.icon}
                <span className="text-xs">{shot.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Visual Style & Mood */}
      <div className="px-5 mb-6">
        <div className="p-4 bg-[hsl(var(--cine-sidebar))] border border-[hsl(var(--cine-border))] rounded-lg">
          <h3 className="text-sm font-medium text-white mb-3">Visual Style & Mood</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {visualStyles.map((style) => (
              <Button
                key={style.id}
                variant="outline"
                size="sm"
                onClick={() => handleStyleToggle(style.id)}
                className={cn(
                  "border-[hsl(var(--cine-border))] bg-[hsl(var(--cine-card))]",
                  project.visualStyles.find(s => s.id === style.id)
                    ? "border-purple-500 text-purple-500"
                    : "text-[hsl(var(--cine-text-muted))] hover:text-white"
                )}
              >
                {style.name}
              </Button>
            ))}
          </div>
          
          {/* Temperature Slider */}
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-[hsl(var(--cine-text-muted))]">Temperature</span>
            <span className="text-sm text-purple-500">Warm</span>
          </div>
          <div className="w-full h-2 bg-gray-300 rounded-full mb-4">
            <div 
              className="h-full bg-purple-500 rounded-full" 
              style={{ width: `${project.temperatureValue * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <div className="px-5 pb-5">
        <Button
          onClick={handleGenerateClip}
          className="w-full h-15 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-normal text-lg shadow-lg"
        >
          <Film className="w-5 h-5 mr-3" />
          Generate Clip
        </Button>
      </div>
    </div>
  );
}
