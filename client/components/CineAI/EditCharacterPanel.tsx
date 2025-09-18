import { useState } from "react";
import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface Character {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  appearance: string;
  personality: string[];
  voice: string;
  actions: string[];
  details?: {
    hairColor?: string;
    occupation?: string;
    status?: string;
  };
}

interface EditCharacterPanelProps {
  character: Character;
  onClose: () => void;
  onCharacterUpdate: (character: Character) => void;
}

export function EditCharacterPanel({ character, onClose, onCharacterUpdate }: EditCharacterPanelProps) {
  const [editedCharacter, setEditedCharacter] = useState<Character>(character);
  const [newPersonalityTag, setNewPersonalityTag] = useState("");
  const [voiceVolume, setVoiceVolume] = useState([0.08]);

  const availableActions = [
    "Hacking", "Stealth", "Fighting", "Analyzing", "Running", "Investigation", 
    "Combat", "Manipulation", "Strategy", "Intimidation", "Research", "Teaching", 
    "Analysis", "Data Analysis", "Support", "Communication"
  ];

  const handleInputChange = (field: keyof Character, value: any) => {
    const updated = { ...editedCharacter, [field]: value };
    setEditedCharacter(updated);
    onCharacterUpdate(updated);
  };

  const handleAddPersonalityTag = () => {
    if (newPersonalityTag.trim() && !editedCharacter.personality.includes(newPersonalityTag.trim())) {
      const updated = {
        ...editedCharacter,
        personality: [...editedCharacter.personality, newPersonalityTag.trim()]
      };
      setEditedCharacter(updated);
      onCharacterUpdate(updated);
      setNewPersonalityTag("");
    }
  };

  const handleRemovePersonalityTag = (tag: string) => {
    const updated = {
      ...editedCharacter,
      personality: editedCharacter.personality.filter(p => p !== tag)
    };
    setEditedCharacter(updated);
    onCharacterUpdate(updated);
  };

  const handleActionToggle = (action: string, checked: boolean) => {
    const updated = {
      ...editedCharacter,
      actions: checked 
        ? [...editedCharacter.actions, action]
        : editedCharacter.actions.filter(a => a !== action)
    };
    setEditedCharacter(updated);
    onCharacterUpdate(updated);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddPersonalityTag();
    }
  };

  return (
    <div className="h-full bg-[hsl(var(--cine-bg))] flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-[hsl(var(--cine-border))] flex items-center justify-between">
        <h2 className="text-xl font-normal text-white font-['Lexend']">
          Edit Character
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
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-[hsl(var(--cine-text-secondary))]">
              Name
            </Label>
            <Input
              id="name"
              value={editedCharacter.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="bg-[hsl(var(--cine-card))] border-[hsl(var(--cine-border))] text-white"
            />
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-[hsl(var(--cine-text-secondary))]">
              Role
            </Label>
            <Select
              value={editedCharacter.role}
              onValueChange={(value) => handleInputChange('role', value)}
            >
              <SelectTrigger className="bg-[hsl(var(--cine-card))] border-[hsl(var(--cine-border))] text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[hsl(var(--cine-card))] border-[hsl(var(--cine-border))]">
                <SelectItem value="Protagonist">Protagonist</SelectItem>
                <SelectItem value="Antagonist">Antagonist</SelectItem>
                <SelectItem value="Supporting">Supporting</SelectItem>
                <SelectItem value="Mentor">Mentor</SelectItem>
                <SelectItem value="Ally">Ally</SelectItem>
                <SelectItem value="Comic Relief">Comic Relief</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Appearance */}
          <div className="space-y-2">
            <Label htmlFor="appearance" className="text-sm font-medium text-[hsl(var(--cine-text-secondary))]">
              Appearance
            </Label>
            <Textarea
              id="appearance"
              value={editedCharacter.appearance}
              onChange={(e) => handleInputChange('appearance', e.target.value)}
              className="bg-[hsl(var(--cine-card))] border-[hsl(var(--cine-border))] text-white min-h-[80px] resize-none"
              placeholder="Describe the character's physical appearance..."
            />
          </div>

          {/* Personality Tags */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-[hsl(var(--cine-text-secondary))]">
              Personality Tags
            </Label>
            
            {/* Current Tags */}
            <div className="flex flex-wrap gap-2">
              {editedCharacter.personality.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[hsl(var(--cine-purple))] text-white text-xs"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemovePersonalityTag(tag)}
                    className="ml-1 hover:text-gray-300 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            
            {/* Add Tag */}
            <div className="text-sm text-[hsl(var(--cine-text-muted))]">
              Add new personality trait
            </div>
            <div className="flex gap-0">
              <Input
                placeholder="Add trait"
                value={newPersonalityTag}
                onChange={(e) => setNewPersonalityTag(e.target.value)}
                onKeyPress={handleKeyPress}
                className="bg-[hsl(var(--cine-card))] border-[hsl(var(--cine-border))] text-white rounded-r-none border-r-0"
              />
              <Button
                type="button"
                onClick={handleAddPersonalityTag}
                className="bg-[hsl(var(--cine-border))] hover:bg-[hsl(var(--cine-border))]/80 text-white rounded-l-none px-4"
                disabled={!newPersonalityTag.trim()}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Voice */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-[hsl(var(--cine-text-secondary))]">
              Voice
            </Label>
            <Select
              value={editedCharacter.voice}
              onValueChange={(value) => handleInputChange('voice', value)}
            >
              <SelectTrigger className="bg-[hsl(var(--cine-card))] border-[hsl(var(--cine-border))] text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[hsl(var(--cine-card))] border-[hsl(var(--cine-border))]">
                <SelectItem value="Low and distorted">Low and distorted</SelectItem>
                <SelectItem value="Clear and confident">Clear and confident</SelectItem>
                <SelectItem value="Deep and commanding">Deep and commanding</SelectItem>
                <SelectItem value="Warm and measured">Warm and measured</SelectItem>
                <SelectItem value="Energetic and clear">Energetic and clear</SelectItem>
              </SelectContent>
            </Select>
            
            {/* Volume Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[hsl(var(--cine-text-muted))]">Volume</span>
                <span className="text-xs text-[hsl(var(--cine-text-secondary))]">{(voiceVolume[0] * 100).toFixed(0)}%</span>
              </div>
              <Slider
                value={voiceVolume}
                onValueChange={setVoiceVolume}
                max={1}
                step={0.01}
                className="w-full"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-[hsl(var(--cine-text-secondary))]">
              Actions
            </Label>
            <div className="space-y-2">
              {availableActions.map((action) => (
                <div key={action} className="flex items-center space-x-2">
                  <Checkbox
                    id={action}
                    checked={editedCharacter.actions.includes(action)}
                    onCheckedChange={(checked) => handleActionToggle(action, checked as boolean)}
                    className="border-[hsl(var(--cine-border))] data-[state=checked]:bg-[hsl(var(--cine-purple))]"
                  />
                  <Label
                    htmlFor={action}
                    className="text-sm text-[hsl(var(--cine-text-secondary))] cursor-pointer"
                  >
                    {action}
                  </Label>
                </div>
              ))}
              
              {/* Add Action */}
              <button
                type="button"
                className="flex items-center gap-2 text-sm text-[hsl(var(--cine-purple))] hover:text-[hsl(var(--cine-purple))]/80 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Action
              </button>
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
          Save Character
        </Button>
      </div>

      {/* Character Profile Preview */}
      <div className="p-6 border-t border-[hsl(var(--cine-border))] bg-[hsl(var(--cine-sidebar))]">
        <h4 className="text-sm font-medium text-white mb-3">
          Character Profile Preview
        </h4>
        <div className="flex gap-4">
          <div className="w-16 h-16 rounded bg-[hsl(var(--cine-card))] overflow-hidden flex-shrink-0">
            <img 
              src={editedCharacter.imageUrl} 
              alt={editedCharacter.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h5 className="text-white font-medium mb-1">{editedCharacter.name}</h5>
            <span className="inline-block px-2 py-0.5 rounded text-xs text-white bg-[hsl(var(--cine-purple))] mb-2">
              {editedCharacter.role}
            </span>
            <p className="text-xs text-[hsl(var(--cine-text-muted))] line-clamp-2">
              {editedCharacter.appearance}
            </p>
            {editedCharacter.personality.length > 0 && (
              <div className="mt-2">
                <span className="text-xs font-medium text-[hsl(var(--cine-text-secondary))]">Personality</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {editedCharacter.personality.slice(0, 3).map((trait) => (
                    <span key={trait} className="text-xs text-[hsl(var(--cine-text-muted))]">
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {editedCharacter.actions.length > 0 && (
              <div className="mt-2">
                <span className="text-xs font-medium text-[hsl(var(--cine-text-secondary))]">Key Actions</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {editedCharacter.actions.slice(0, 3).map((action) => (
                    <span key={action} className="text-xs text-[hsl(var(--cine-text-muted))]">
                      {action}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
