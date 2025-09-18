import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface PlotPoint {
  id: string;
  title: string;
  type: "Dialogue" | "Action";
  description: string;
  character?: string;
  dialogue?: string;
  storyBeat?: string;
}

interface EditPlotPanelProps {
  plotPoint: PlotPoint;
  onClose: () => void;
  onPlotPointUpdate: (plotPoint: PlotPoint) => void;
}

export function EditPlotPanel({ plotPoint, onClose, onPlotPointUpdate }: EditPlotPanelProps) {
  const [editedPlotPoint, setEditedPlotPoint] = useState<PlotPoint>(plotPoint);

  const handleInputChange = (field: keyof PlotPoint, value: string) => {
    const updated = { ...editedPlotPoint, [field]: value };
    setEditedPlotPoint(updated);
    onPlotPointUpdate(updated);
  };

  const characters = [
    "Maya", "Alex", "Dr. Chen", "Victor", "Cipher", "Nova", "Narrator"
  ];

  return (
    <div className="h-full bg-[hsl(var(--cine-bg))] flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-[hsl(var(--cine-border))] flex items-center justify-between">
        <h2 className="text-xl font-normal text-white font-['Lexend']">
          Edit Plot Point
        </h2>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-[hsl(var(--cine-card))] transition-colors"
        >
          <X className="w-5 h-5 text-[hsl(var(--cine-text-muted))]" />
        </button>
      </div>

      {/* Form */}
      <div className="flex-1 p-6 overflow-y-auto">
        <form className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-[hsl(var(--cine-text-secondary))]">
              Title
            </Label>
            <Input
              id="title"
              value={editedPlotPoint.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="bg-[hsl(var(--cine-card))] border-[hsl(var(--cine-border))] text-white"
              placeholder="Enter plot point title..."
            />
          </div>

          {/* Story Beat */}
          <div className="space-y-2">
            <Label htmlFor="storyBeat" className="text-sm font-medium text-[hsl(var(--cine-text-secondary))]">
              Story Beat
            </Label>
            <Textarea
              id="storyBeat"
              value={editedPlotPoint.storyBeat || ""}
              onChange={(e) => handleInputChange('storyBeat', e.target.value)}
              className="bg-[hsl(var(--cine-card))] border-[hsl(var(--cine-border))] text-white min-h-[100px] resize-none"
              placeholder="Describe the story purpose and significance of this plot point..."
            />
          </div>

          {/* Dialogue */}
          <div className="space-y-2">
            <Label htmlFor="dialogue" className="text-sm font-medium text-[hsl(var(--cine-text-secondary))]">
              Dialogue
            </Label>
            <Textarea
              id="dialogue"
              value={editedPlotPoint.dialogue || ""}
              onChange={(e) => handleInputChange('dialogue', e.target.value)}
              className="bg-[hsl(var(--cine-card))] border-[hsl(var(--cine-border))] text-white min-h-[120px] resize-none"
              placeholder="Enter character dialogue..."
            />
          </div>

          {/* Character Selection (for dialogue) */}
          {editedPlotPoint.type === "Dialogue" && (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[hsl(var(--cine-text-secondary))]">
                Character
              </Label>
              <Select
                value={editedPlotPoint.character || ""}
                onValueChange={(value) => handleInputChange('character', value)}
              >
                <SelectTrigger className="bg-[hsl(var(--cine-card))] border-[hsl(var(--cine-border))] text-white">
                  <SelectValue placeholder="Select character..." />
                </SelectTrigger>
                <SelectContent className="bg-[hsl(var(--cine-card))] border-[hsl(var(--cine-border))]">
                  {characters.map((character) => (
                    <SelectItem key={character} value={character}>
                      {character}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Type */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-[hsl(var(--cine-text-secondary))]">
              Type
            </Label>
            <Select
              value={editedPlotPoint.type}
              onValueChange={(value) => handleInputChange('type', value as "Dialogue" | "Action")}
            >
              <SelectTrigger className="bg-[hsl(var(--cine-card))] border-[hsl(var(--cine-border))] text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[hsl(var(--cine-card))] border-[hsl(var(--cine-border))]">
                <SelectItem value="Dialogue">Dialogue</SelectItem>
                <SelectItem value="Action">Action</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-[hsl(var(--cine-text-secondary))]">
              Description
            </Label>
            <Textarea
              id="description"
              value={editedPlotPoint.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="bg-[hsl(var(--cine-card))] border-[hsl(var(--cine-border))] text-white min-h-[100px] resize-none"
              placeholder="Describe what happens in this plot point..."
            />
          </div>
        </form>
      </div>

      {/* Footer Actions */}
      <div className="p-6 border-t border-[hsl(var(--cine-border))] flex gap-3">
        <Button
          variant="outline"
          onClick={onClose}
          className="flex-1 bg-[hsl(var(--cine-border))] border-[hsl(var(--cine-border))] text-white hover:bg-[hsl(var(--cine-border))]/80"
        >
          Cancel
        </Button>
        <Button
          className="flex-1 bg-[hsl(var(--cine-purple))] hover:bg-[hsl(var(--cine-purple))]/90 text-white"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
