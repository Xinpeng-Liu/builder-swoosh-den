import { Plus, MoreHorizontal, Filter, Grid3X3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

interface CharactersViewProps {
  characters: Character[];
  onCharacterSelect: (character: Character) => void;
  selectedCharacterId?: string;
}

const roleColors: Record<string, string> = {
  "Protagonist": "bg-blue-500",
  "Antagonist": "bg-pink-500", 
  "Mentor": "bg-orange-500",
  "Ally": "bg-green-500",
  "Supporting": "bg-purple-500",
};

export function CharactersView({ characters, onCharacterSelect, selectedCharacterId }: CharactersViewProps) {
  return (
    <div className="h-full bg-[hsl(var(--cine-bg))] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-normal text-white font-['Lexend']">
            Characters
          </h2>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            className="bg-[hsl(var(--cine-purple))] hover:bg-[hsl(var(--cine-purple))]/90 text-white h-8 px-4 gap-2"
            size="sm"
          >
            <Plus className="w-3 h-3.5" />
            New Character
          </Button>
        </div>
      </div>

      {/* Characters Grid */}
      <div className="grid grid-cols-3 gap-6">
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            isSelected={character.id === selectedCharacterId}
            onClick={() => onCharacterSelect(character)}
          />
        ))}
        
        {/* Add New Character Card */}
        <div className="flex flex-col items-center justify-center p-8 rounded-xl border-2 border-dashed border-[hsl(var(--cine-border))] hover:border-[hsl(var(--cine-purple))]/50 cursor-pointer transition-colors group bg-[hsl(var(--cine-sidebar))]">
          <div className="w-12 h-12 rounded-full bg-[hsl(var(--cine-card))] flex items-center justify-center mb-3 group-hover:bg-[hsl(var(--cine-purple))]/20 transition-colors">
            <Plus className="w-4.5 h-5 text-[hsl(var(--cine-purple))]" />
          </div>
          <span className="text-sm font-medium text-white mb-1">
            Add New Character
          </span>
          <p className="text-xs text-[hsl(var(--cine-text-muted))] text-center leading-4">
            Create a new character<br />for your film
          </p>
        </div>
      </div>
    </div>
  );
}

interface CharacterCardProps {
  character: Character;
  isSelected: boolean;
  onClick: () => void;
}

function CharacterCard({ character, isSelected, onClick }: CharacterCardProps) {
  const roleColor = roleColors[character.role] || "bg-gray-500";

  return (
    <div 
      className={cn(
        "relative rounded-xl border cursor-pointer transition-all hover:border-[hsl(var(--cine-purple))]/50",
        "bg-[hsl(var(--cine-sidebar))]",
        isSelected 
          ? "border-[hsl(var(--cine-purple))]" 
          : "border-[hsl(var(--cine-border))]"
      )}
      onClick={onClick}
    >
      {/* Character Image */}
      <div className="relative w-full h-48 rounded-t-xl overflow-hidden bg-[hsl(var(--cine-card))]">
        <img 
          src={character.imageUrl} 
          alt={character.name}
          className="w-full h-full object-cover"
        />
        {/* Role Badge */}
        <div className="absolute top-2 right-2">
          <span className={cn(
            "inline-block px-2 py-1 rounded-full text-xs text-white font-medium",
            roleColor
          )}>
            {character.role}
          </span>
        </div>
      </div>

      {/* Character Info */}
      <div className="p-4">
        {/* Name */}
        <h3 className="text-white font-medium text-base mb-3">
          {character.name}
        </h3>

        {/* Personality Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {character.personality.slice(0, 3).map((trait, index) => (
            <span
              key={index}
              className="inline-block px-2 py-1 rounded text-xs bg-[hsl(var(--cine-card))] text-gray-300"
            >
              {trait}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <Button
            size="sm"
            variant="ghost"
            className="text-xs text-[hsl(var(--cine-purple))] hover:text-[hsl(var(--cine-purple))]/80 hover:bg-transparent p-0 h-auto"
          >
            Edit
          </Button>
          
          <button className="p-1 rounded hover:bg-[hsl(var(--cine-card))] transition-colors">
            <MoreHorizontal className="w-4 h-4 text-[hsl(var(--cine-text-muted))]" />
          </button>
        </div>
      </div>
    </div>
  );
}
