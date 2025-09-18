import { useState } from "react";
import { Sidebar } from "@/components/CineAI/Sidebar";
import { CharactersView } from "@/components/CineAI/CharactersView";
import { EditCharacterPanel } from "@/components/CineAI/EditCharacterPanel";
import { TopNav } from "@/components/CineAI/TopNav";

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

export default function Characters() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [isEditPanelOpen, setIsEditPanelOpen] = useState(false);

  const mockCharacters: Character[] = [
    {
      id: "1",
      name: "Nova Chen",
      role: "Protagonist",
      imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/c2f5b30ad60115d9f5e9e5d57b1d2de29dacfb46?width=192",
      appearance: "Cybernetic officer with determined expression. Short hair with cybernetic enhancements.",
      personality: ["Determined", "Brave", "Tech-savvy"],
      voice: "Clear and confident",
      actions: ["Investigation", "Combat", "Hacking"],
      details: {
        hairColor: "Short hair",
        occupation: "Cybernetic",
      },
    },
    {
      id: "2", 
      name: "Victor Crane",
      role: "Antagonist",
      imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/c2f5b30ad60115d9f5e9e5d57b1d2de29dacfb46?width=192",
      appearance: "Elderly businessman with calculating expression and formal suit.",
      personality: ["Calculating", "Ruthless", "Intelligent"],
      voice: "Deep and commanding",
      actions: ["Manipulation", "Strategy", "Intimidation"],
      details: {
        occupation: "Central",
        status: "Suit",
      },
    },
    {
      id: "3",
      name: "Dr. Elias Grey", 
      role: "Mentor",
      imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/c2f5b30ad60115d9f5e9e5d57b1d2de29dacfb46?width=192",
      appearance: "Elderly scientist with wise eyes and grey beard. Often seen in research attire.",
      personality: ["Wise", "Patient", "Knowledgeable"],
      voice: "Warm and measured",
      actions: ["Research", "Teaching", "Analysis"],
      details: {
        occupation: "Elderly",
        status: "Elderly",
      },
    },
    {
      id: "4",
      name: "Maya Rodriguez",
      role: "Supporting",
      imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/c2f5b30ad60115d9f5e9e5d57b1d2de29dacfb46?width=192", 
      appearance: "Data tech specialist with confident demeanor and modern styling.",
      personality: ["Confident", "Loyal", "Skilled"],
      voice: "Energetic and clear",
      actions: ["Data Analysis", "Support", "Communication"],
      details: {
        occupation: "Data Lab",
      },
    },
    {
      id: "5",
      name: "Cipher",
      role: "Supporting", 
      imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/c2f5b30ad60115d9f5e9e5d57b1d2de29dacfb46?width=192",
      appearance: "A mysterious figure always wearing a dark hoodie that obscures most of their face. Slim build, moves with purpose and agility. Often seen in the shadows of neon-lit streets. Has a cybernetic implant visible on one hand.",
      personality: ["Mysterious", "Intelligent", "Resourceful"],
      voice: "Low and distorted",
      actions: ["Hacking", "Stealth", "Fighting", "Analyzing", "Running"],
      details: {
        occupation: "Hacker",
        status: "Mysterious",
      },
    },
  ];

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
    setIsEditPanelOpen(true);
  };

  const handleEditCharacter = (character: Character) => {
    setSelectedCharacter(character);
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
        <Sidebar activeItem="characters" />
        
        {/* Main Content Area */}
        <div className="flex flex-1">
          {/* Characters View */}
          <div className="flex-1">
            <CharactersView 
              characters={mockCharacters} 
              onCharacterSelect={handleCharacterSelect}
              selectedCharacterId={selectedCharacter?.id}
            />
          </div>
          
          {/* Edit Panel */}
          {isEditPanelOpen && selectedCharacter && (
            <div className="w-96 border-l border-[hsl(var(--cine-border))]">
              <EditCharacterPanel 
                character={selectedCharacter} 
                onClose={handleCloseEdit}
                onCharacterUpdate={(updatedCharacter) => setSelectedCharacter(updatedCharacter)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
