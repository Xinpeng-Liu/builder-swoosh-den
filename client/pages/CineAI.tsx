import { useState } from "react";
import { Sidebar } from "@/components/CineAI/Sidebar";
import { ScenesView } from "@/components/CineAI/ScenesView";
import { EditPanel } from "@/components/CineAI/EditPanel";
import { PreviewPanel } from "@/components/CineAI/PreviewPanel";
import { TopNav } from "@/components/CineAI/TopNav";

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

export default function CineAI() {
  const [selectedScene, setSelectedScene] = useState<Scene | null>(null);
  const [isEditPanelOpen, setIsEditPanelOpen] = useState(false);

  const mockScenes: Scene[] = [
    {
      id: "1",
      title: "Neon Alleyway",
      location: "Downtown District",
      timeOfDay: "Night",
      atmosphere: "Mysterious",
      keywords: ["cyberpunk", "rain", "neon", "urban"],
      imageUrl:
        "https://api.builder.io/api/v1/image/assets/TEMP/dfe9dab9ac4d667b29a86b0d6ef29dab1153e28c?width=192",
      description:
        "A cyberpunk alleyway with neon lights reflecting off wet pavement.",
    },
    {
      id: "2",
      title: "Morning Cafe",
      location: "Riverside Cafe",
      timeOfDay: "Morning",
      atmosphere: "Cheerful",
      keywords: ["coffee", "sunlight", "conversation", "warm"],
      imageUrl:
        "https://api.builder.io/api/v1/image/assets/TEMP/a75c8c807cc2b335f7498d9afa932903260741f5?width=192",
      description:
        "A cozy cafe interior in the morning. Warm sunlight streams through large windows, creating golden patches on wooden tables. The atmosphere is cheerful and inviting. A few customers engage in quiet conversation over steaming cups of coffee. The warm tones of the cafe create a sense of comfort and relaxation.",
      isSelected: true,
    },
    {
      id: "3",
      title: "Abandoned Lab",
      location: "Research Facility",
      timeOfDay: "Evening",
      atmosphere: "Eerie",
      keywords: ["abandoned", "science", "discovery", "dust"],
      imageUrl:
        "https://api.builder.io/api/v1/image/assets/TEMP/6ec4fcbe7e6693b641dc0207f0840887d55642c4?width=192",
      description:
        "An abandoned research laboratory with dusty equipment and flickering lights.",
    },
    {
      id: "4",
      title: "Sunset Beach",
      location: "Crescent Bay",
      timeOfDay: "Evening",
      atmosphere: "Romantic",
      keywords: ["sunset", "ocean", "silhouette", "waves"],
      imageUrl:
        "https://api.builder.io/api/v1/image/assets/TEMP/0d4d92b573fbe9a4a2a42a97edc3425c1acb84e2?width=192",
      description:
        "A romantic beach scene at sunset with waves gently lapping the shore.",
    },
    {
      id: "5",
      title: "The Verdict",
      location: "Central Courthouse",
      timeOfDay: "Day",
      atmosphere: "Tense",
      keywords: ["justice", "drama", "testimony", "decision"],
      imageUrl:
        "https://api.builder.io/api/v1/image/assets/TEMP/4a844ca2f2303c3243018573a12f605c1d099f53?width=192",
      description:
        "A tense courtroom scene during a dramatic verdict announcement.",
    },
  ];

  useState(() => {
    // Set the selected scene to "Morning Cafe" by default
    const morningCafe = mockScenes.find(
      (scene) => scene.title === "Morning Cafe",
    );
    if (morningCafe) {
      setSelectedScene(morningCafe);
    }
  });

  const handleSceneSelect = (scene: Scene) => {
    setSelectedScene(scene);
    setIsEditPanelOpen(true);
  };

  const handleEditScene = (scene: Scene) => {
    setSelectedScene(scene);
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
        <Sidebar activeItem="scenes" />

        {/* Main Content Area */}
        <div className="flex flex-1">
          {/* Scenes View */}
          <div className="flex-1 border-r border-[hsl(var(--cine-border))]">
            <ScenesView
              scenes={mockScenes}
              onSceneSelect={handleSceneSelect}
              selectedSceneId={selectedScene?.id}
            />
          </div>

          {/* Edit Panel */}
          {isEditPanelOpen && selectedScene && (
            <div className="w-96 border-r border-[hsl(var(--cine-border))]">
              <EditPanel
                scene={selectedScene}
                onClose={handleCloseEdit}
                onSceneUpdate={(updatedScene) => setSelectedScene(updatedScene)}
              />
            </div>
          )}

          {/* Preview Panel */}
          {selectedScene && (
            <div className="w-64 bg-[hsl(var(--cine-sidebar))]">
              <PreviewPanel scene={selectedScene} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
