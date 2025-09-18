import { useState } from "react";
import { X, Upload, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

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

interface EditPanelProps {
  scene: Scene;
  onClose: () => void;
  onSceneUpdate: (scene: Scene) => void;
}

export function EditPanel({ scene, onClose, onSceneUpdate }: EditPanelProps) {
  const [editedScene, setEditedScene] = useState<Scene>(scene);
  const [newKeyword, setNewKeyword] = useState("");

  const handleInputChange = (field: keyof Scene, value: string) => {
    const updated = { ...editedScene, [field]: value };
    setEditedScene(updated);
    onSceneUpdate(updated);
  };

  const handleAddKeyword = () => {
    if (newKeyword.trim() && !editedScene.keywords.includes(newKeyword.trim())) {
      const updated = {
        ...editedScene,
        keywords: [...editedScene.keywords, newKeyword.trim()]
      };
      setEditedScene(updated);
      onSceneUpdate(updated);
      setNewKeyword("");
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    const updated = {
      ...editedScene,
      keywords: editedScene.keywords.filter(k => k !== keyword)
    };
    setEditedScene(updated);
    onSceneUpdate(updated);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddKeyword();
    }
  };

  return (
    <div className="h-full bg-[hsl(var(--cine-bg))] flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-[hsl(var(--cine-border))]">
        <h2 className="text-xl font-normal text-white font-['Lexend']">
          Edit Scene
        </h2>
      </div>

      {/* Form */}
      <div className="flex-1 p-6 overflow-y-auto">
        <form className="space-y-6">
          {/* Title */}
          <div className="space-y-1">
            <Label htmlFor="title" className="text-sm font-medium text-[hsl(var(--cine-text-secondary))]">
              Title
            </Label>
            <Input
              id="title"
              value={editedScene.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="bg-[hsl(var(--cine-card))] border-[hsl(var(--cine-border))] text-white h-10.5"
            />
          </div>

          {/* Location */}
          <div className="space-y-1">
            <Label htmlFor="location" className="text-sm font-medium text-[hsl(var(--cine-text-secondary))]">
              Location
            </Label>
            <Input
              id="location"
              value={editedScene.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="bg-[hsl(var(--cine-card))] border-[hsl(var(--cine-border))] text-white h-10.5"
            />
          </div>

          {/* Time of Day */}
          <div className="space-y-1">
            <Label className="text-sm font-medium text-[hsl(var(--cine-text-secondary))]">
              Time of Day
            </Label>
            <Select
              value={editedScene.timeOfDay}
              onValueChange={(value) => handleInputChange('timeOfDay', value)}
            >
              <SelectTrigger className="bg-[hsl(var(--cine-card))] border-[hsl(var(--cine-border))] text-white h-10.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[hsl(var(--cine-card))] border-[hsl(var(--cine-border))]">
                <SelectItem value="Morning">Morning</SelectItem>
                <SelectItem value="Day">Day</SelectItem>
                <SelectItem value="Evening">Evening</SelectItem>
                <SelectItem value="Night">Night</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Atmosphere */}
          <div className="space-y-1">
            <Label className="text-sm font-medium text-[hsl(var(--cine-text-secondary))]">
              Atmosphere
            </Label>
            <Select
              value={editedScene.atmosphere}
              onValueChange={(value) => handleInputChange('atmosphere', value)}
            >
              <SelectTrigger className="bg-[hsl(var(--cine-card))] border-[hsl(var(--cine-border))] text-white h-10.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[hsl(var(--cine-card))] border-[hsl(var(--cine-border))]">
                <SelectItem value="Cheerful">Cheerful</SelectItem>
                <SelectItem value="Mysterious">Mysterious</SelectItem>
                <SelectItem value="Eerie">Eerie</SelectItem>
                <SelectItem value="Romantic">Romantic</SelectItem>
                <SelectItem value="Tense">Tense</SelectItem>
                <SelectItem value="Peaceful">Peaceful</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Keywords */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-[hsl(var(--cine-text-secondary))]">
              Keywords
            </Label>
            
            {/* Current Keywords */}
            <div className="flex flex-wrap gap-2">
              {editedScene.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[hsl(var(--cine-card))] text-[hsl(var(--cine-text-secondary))] text-xs"
                >
                  {keyword}
                  <button
                    type="button"
                    onClick={() => handleRemoveKeyword(keyword)}
                    className="ml-1 hover:text-white transition-colors"
                  >
                    <X className="w-2.5 h-3" />
                  </button>
                </span>
              ))}
            </div>
            
            {/* Add Keyword */}
            <div className="flex gap-0">
              <Input
                placeholder="Add keyword"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="bg-[hsl(var(--cine-card))] border-[hsl(var(--cine-border))] text-white rounded-r-none border-r-0 placeholder:text-[hsl(var(--cine-text-muted))]"
              />
              <Button
                type="button"
                onClick={handleAddKeyword}
                className="bg-[hsl(var(--cine-border))] hover:bg-[hsl(var(--cine-border))]/80 text-white rounded-l-none px-3"
                disabled={!newKeyword.trim()}
              >
                Add
              </Button>
            </div>
          </div>

          {/* Scene Image */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-[hsl(var(--cine-text-secondary))]">
              Scene Image
            </Label>
            
            {/* Image Preview */}
            <div className="p-2 bg-[hsl(var(--cine-card))] border border-[hsl(var(--cine-border))] rounded-md">
              <div className="w-full h-44 bg-[hsl(var(--cine-sidebar))] rounded overflow-hidden">
                <img 
                  src={editedScene.imageUrl} 
                  alt={editedScene.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1 bg-[hsl(var(--cine-border))] border-[hsl(var(--cine-border))] text-white hover:bg-[hsl(var(--cine-border))]/80 gap-2"
              >
                <Upload className="w-3.5 h-3.5" />
                Upload
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1 bg-[hsl(var(--cine-border))] border-[hsl(var(--cine-border))] text-white hover:bg-[hsl(var(--cine-border))]/80 gap-2"
              >
                <Sparkles className="w-4 h-3.5" />
                Generate
              </Button>
            </div>
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
          Save Scene
        </Button>
      </div>
    </div>
  );
}
