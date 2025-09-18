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
  "Antagonist": "bg-red-500", 
  "Mentor": "bg-orange-500",
  "Supporting": "bg-green-500",
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
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-[hsl(var(--cine-text-muted))] hover:text-white p-1">
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-[hsl(var(--cine-text-muted))] hover:text-white p-1">
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-[hsl(var(--cine-text-muted))]">Filter: Role</span>
            <Button variant="ghost" size="sm" className="text-[hsl(var(--cine-text-muted))] hover:text-white p-1">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
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
      <div className="grid grid-cols-2 gap-6">
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            isSelected={character.id === selectedCharacterId}
            onClick={() => onCharacterSelect(character)}
          />
        ))}
        
        {/* Add New Character Card */}
        <div className="flex flex-col items-center justify-center p-8 rounded-lg border-2 border-dashed border-[hsl(var(--cine-border))] hover:border-[hsl(var(--cine-purple))]/50 cursor-pointer transition-colors group">
          <Plus className="w-6 h-6 text-[hsl(var(--cine-text-muted))] group-hover:text-[hsl(var(--cine-purple))] mb-2" />
          <span className="text-sm text-[hsl(var(--cine-text-muted))] group-hover:text-white">
            Add New Character
          </span>
          <p className="text-xs text-[hsl(var(--cine-text-muted))] mt-1 text-center">
            Create a new character for your film
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
        "relative p-4 rounded-lg border cursor-pointer transition-all hover:border-[hsl(var(--cine-purple))]/50",
        "bg-[hsl(var(--cine-sidebar))]",
        isSelected 
          ? "border-[hsl(var(--cine-blue))]" 
          : "border-[hsl(var(--cine-border))]"
      )}
      onClick={onClick}
    >
      {/* Options Menu */}
      <button className="absolute top-3 right-3 p-1 rounded hover:bg-[hsl(var(--cine-card))] transition-colors">
        <MoreHorizontal className="w-4 h-4 text-[hsl(var(--cine-text-muted))]" />
      </button>

      {/* Character Image */}
      <div className="w-full h-48 rounded bg-[hsl(var(--cine-card))] mb-4 overflow-hidden">
        <img 
          src={character.imageUrl} 
          alt={character.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Character Info */}
      <div className="space-y-3">
        {/* Name and Role */}
        <div>
          <h3 className="text-white font-medium text-lg mb-1">
            {character.name}
          </h3>
          <span className={cn(
            "inline-block px-2 py-1 rounded text-xs text-white",
            roleColor
          )}>
            {character.role}
          </span>
        </div>

        {/* Details */}
        {character.details && (
          <div className="space-y-1">
            {character.details.hairColor && (
              <div className="text-xs text-[hsl(var(--cine-text-muted))]">
                {character.details.hairColor}
              </div>
            )}
            {character.details.occupation && (
              <div className="text-xs text-[hsl(var(--cine-text-muted))]">
                {character.details.occupation}
              </div>
            )}
            {character.details.status && (
              <div className="text-xs text-[hsl(var(--cine-text-muted))]">
                {character.details.status}
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="text-xs bg-[hsl(var(--cine-card))] border-[hsl(var(--cine-border))] text-[hsl(var(--cine-text-secondary))] hover:bg-[hsl(var(--cine-card))]/80 hover:text-white"
          >
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
}
