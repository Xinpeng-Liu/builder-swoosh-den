import { useState } from "react";
import { Sidebar } from "@/components/CineAI/Sidebar";
import { TimelineView } from "@/components/CineAI/TimelineView";
import { FilmSettingsPanel } from "@/components/CineAI/FilmSettingsPanel";
import { TopNav } from "@/components/CineAI/TopNav";

export interface TimelineClip {
  id: string;
  title: string;
  duration: string;
  startTime: number;
  type: "video" | "audio" | "text";
  imageUrl?: string;
  content?: string;
  track: number;
}

export interface TimelineProject {
  id: string;
  clips: TimelineClip[];
  duration: number;
  currentTime: number;
  zoom: number;
  tracks: {
    video: TimelineClip[];
    audio: TimelineClip[];
    text: TimelineClip[];
  };
}

export default function Timeline() {
  const [project, setProject] = useState<TimelineProject>({
    id: "1",
    clips: [],
    duration: 120, // 2 minutes
    currentTime: 0,
    zoom: 1,
    tracks: {
      video: [
        {
          id: "v1",
          title: "Intro",
          duration: "0:12",
          startTime: 0,
          type: "video",
          imageUrl:
            "https://api.builder.io/api/v1/image/assets/TEMP/deebe1890a8fb2369001b1e06c69bc3c38d16ebb?width=240",
          track: 0,
        },
        {
          id: "v2",
          title: "Character Reveal",
          duration: "0:18",
          startTime: 12,
          type: "video",
          imageUrl:
            "https://api.builder.io/api/v1/image/assets/TEMP/7b0343683de98db8125f0dd33a12fd3a08798d85?width=354",
          track: 0,
        },
        {
          id: "v3",
          title: "Conflict",
          duration: "0:15",
          startTime: 30,
          type: "video",
          imageUrl:
            "https://api.builder.io/api/v1/image/assets/TEMP/6c96c4e2a321414f9037ddd7a5c2f3a29a8d0817?width=289",
          track: 0,
        },
      ],
      audio: [
        {
          id: "a1",
          title: "Background Score",
          duration: "0:45",
          startTime: 0,
          type: "audio",
          track: 0,
        },
      ],
      text: [
        {
          id: "t1",
          title: "Title",
          content: "Year 2150",
          duration: "0:08",
          startTime: 5,
          type: "text",
          track: 0,
        },
        {
          id: "t2",
          title: "Subtitle",
          content: "The last hope...",
          duration: "0:10",
          startTime: 45,
          type: "text",
          track: 0,
        },
      ],
    },
  });

  const [selectedClip, setSelectedClip] = useState<TimelineClip | null>(null);

  const handleTimelineUpdate = (updatedProject: TimelineProject) => {
    setProject(updatedProject);
  };

  const handleClipSelect = (clip: TimelineClip | null) => {
    setSelectedClip(clip);
  };

  return (
    <div className="h-screen bg-[hsl(var(--cine-bg))] text-[hsl(var(--cine-text))] overflow-hidden cine-dark">
      {/* Top Navigation */}
      <TopNav />

      {/* Main Layout */}
      <div className="flex h-[calc(100vh-56px)]">
        {/* Sidebar */}
        <Sidebar activeItem="timeline" />

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col">
          {/* Timeline View */}
          <div className="flex-1">
            <TimelineView
              project={project}
              selectedClip={selectedClip}
              onProjectUpdate={handleTimelineUpdate}
              onClipSelect={handleClipSelect}
            />
          </div>
        </div>

        {/* Film Settings Panel */}
        <div className="w-72 bg-[hsl(var(--cine-sidebar))]">
          <FilmSettingsPanel
            project={project}
            onProjectUpdate={handleTimelineUpdate}
          />
        </div>
      </div>
    </div>
  );
}
