import { Plus, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Scene {
  id: string;
  title: string;
  location: string;
  timeOfDay: string;
  atmosphere: string;
  keywords: string[];
  imageUrl: string;
  description: string;
  isSelected?: boolean;
}

interface ScenesViewProps {
  scenes: Scene[];
  onSceneSelect: (scene: Scene) => void;
  selectedSceneId?: string;
}

const atmosphereColors: Record<string, string> = {
  "Mysterious": "bg-purple-500",
  "Cheerful": "bg-pink-500",
  "Eerie": "bg-purple-500",
  "Romantic": "bg-pink-500",
  "Tense": "bg-orange-500",
};

const timeColors: Record<string, string> = {
  "Night": "bg-blue-500",
  "Morning": "bg-orange-500",
  "Evening": "bg-blue-500",
  "Day": "bg-blue-500",
};

export function ScenesView({ scenes, onSceneSelect, selectedSceneId }: ScenesViewProps) {
  return (
    <div className="h-full bg-[hsl(var(--cine-bg))] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-normal text-white font-['Lexend']">
          Scenes
        </h2>
        <Button 
          className="bg-[hsl(var(--cine-purple))] hover:bg-[hsl(var(--cine-purple))]/90 text-white h-8 px-4 gap-2"
          size="sm"
        >
          <Plus className="w-3 h-3.5" />
          New Scene
        </Button>
      </div>

      {/* Scenes Grid */}
      <div className="space-y-4">
        {scenes.map((scene) => (
          <SceneCard
            key={scene.id}
            scene={scene}
            isSelected={scene.id === selectedSceneId}
            onClick={() => onSceneSelect(scene)}
          />
        ))}
      </div>
    </div>
  );
}

interface SceneCardProps {
  scene: Scene;
  isSelected: boolean;
  onClick: () => void;
}

function SceneCard({ scene, isSelected, onClick }: SceneCardProps) {
  const atmosphereColor = atmosphereColors[scene.atmosphere] || "bg-gray-500";
  const timeColor = timeColors[scene.timeOfDay] || "bg-gray-500";

  return (
    <div 
      className={cn(
        "p-4 rounded-lg border cursor-pointer transition-all hover:border-[hsl(var(--cine-purple))]/50",
        "bg-[hsl(var(--cine-sidebar))]",
        isSelected 
          ? "border-[hsl(var(--cine-blue))]" 
          : "border-[hsl(var(--cine-border))]"
      )}
      onClick={onClick}
    >
      <div className="flex gap-4">
        {/* Scene Image */}
        <div className="w-24 h-24 rounded bg-[hsl(var(--cine-card))] overflow-hidden flex-shrink-0">
          <img 
            src={scene.imageUrl} 
            alt={scene.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Scene Info */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3 className="text-white font-medium mb-1">
            {scene.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1 mb-3 text-[hsl(var(--cine-text-muted))]">
            <MapPin className="w-2.5 h-3" />
            <span className="text-xs">{scene.location}</span>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2 mb-3">
            <span className={cn(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs",
              "bg-[hsl(var(--cine-card))] text-[hsl(var(--cine-text-secondary))]"
            )}>
              <Clock className="w-3 h-3" />
              <div className={cn("w-1.5 h-1.5 rounded-full", timeColor)} />
              {scene.timeOfDay}
            </span>
            <span className={cn(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs",
              "bg-[hsl(var(--cine-card))] text-[hsl(var(--cine-text-secondary))]"
            )}>
              <div className={cn("w-1.5 h-1.5 rounded-full", atmosphereColor)} />
              {scene.atmosphere}
            </span>
          </div>

          {/* Keywords */}
          <div className="text-xs text-[hsl(var(--cine-text-muted))]">
            Keywords: {scene.keywords.join(", ")}
          </div>
        </div>
      </div>
    </div>
  );
}
