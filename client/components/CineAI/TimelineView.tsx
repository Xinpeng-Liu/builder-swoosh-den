import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search, ZoomIn, Scissors, Trash2, Copy, Layers, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TimelineProject, TimelineClip } from "@/pages/Timeline";

interface TimelineViewProps {
  project: TimelineProject;
  selectedClip: TimelineClip | null;
  onProjectUpdate: (project: TimelineProject) => void;
  onClipSelect: (clip: TimelineClip | null) => void;
}

export function TimelineView({ project, selectedClip, onProjectUpdate, onClipSelect }: TimelineViewProps) {
  const [playheadPosition, setPlayheadPosition] = useState(113); // Default position from design
  const [isDragging, setIsDragging] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const clipLibrary = [
    {
      id: "lib1",
      title: "Intro Scene",
      subtitle: "Scene 1",
      duration: "0:12",
      imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/59f920e0aee4f7ce86a3073f0e6740fda36185a0?width=272"
    },
    {
      id: "lib2", 
      title: "Character Reveal",
      subtitle: "Scene 1",
      duration: "0:18",
      imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/73fc9d3fdbb5da1f24fa2fcdb3320353c96b6a92?width=272"
    },
    {
      id: "lib3",
      title: "Conflict",
      subtitle: "Scene 2", 
      duration: "0:15",
      imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/3e1ec6bcb35cdd2d55f17a21fda92affdfa15a7c?width=272"
    },
    {
      id: "lib4",
      title: "Resolution",
      subtitle: "Scene 3",
      duration: "0:20", 
      imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/59f920e0aee4f7ce86a3073f0e6740fda36185a0?width=272"
    },
    {
      id: "lib5",
      title: "Epilogue",
      subtitle: "Scene 3",
      duration: "0:10",
      imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/73fc9d3fdbb5da1f24fa2fcdb3320353c96b6a92?width=272"
    }
  ];

  const timeMarkers = ["0:00", "0:10", "0:20", "0:30", "0:40", "0:50", "1:00", "1:10", "1:20", "1:30", "1:40", "1:50", "2:00"];

  const handleAddTrack = () => {
    console.log("Add track clicked");
  };

  const handlePlayheadDrag = (e: React.MouseEvent) => {
    setIsDragging(true);
    const rect = e.currentTarget.parentElement?.getBoundingClientRect();
    if (rect) {
      const newPosition = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      setPlayheadPosition(newPosition);

      // Calculate time based on position
      const timePercentage = newPosition / rect.width;
      const newTime = timePercentage * project.duration;

      // Update project current time
      onProjectUpdate({
        ...project,
        currentTime: newTime
      });
    }
  };

  const getClipWidth = (duration: string) => {
    const seconds = parseFloat(duration.split(":")[1]) + parseFloat(duration.split(":")[0]) * 60;
    return (seconds / 120) * 800; // Assuming 800px timeline width for 2 minutes
  };

  const getClipPosition = (startTime: number) => {
    return (startTime / 120) * 800;
  };

  const handleTimelineAction = (action: string) => {
    if (!selectedClip) {
      console.log(`No clip selected for action: ${action}`);
      return;
    }

    switch (action) {
      case "cut":
        // Split clip at current playhead position
        console.log(`Cutting clip ${selectedClip.title} at ${project.currentTime}s`);
        break;
      case "delete":
        // Remove selected clip from timeline
        const updatedTracks = { ...project.tracks };
        updatedTracks[selectedClip.type] = updatedTracks[selectedClip.type].filter(
          clip => clip.id !== selectedClip.id
        );
        onProjectUpdate({
          ...project,
          tracks: updatedTracks
        });
        onClipSelect(null as any);
        break;
      case "copy":
        // Copy selected clip
        console.log(`Copying clip ${selectedClip.title}`);
        break;
      case "layers":
        // Show/hide layer controls
        console.log("Toggle layer controls");
        break;
      default:
        console.log(`Timeline action: ${action}`);
    }
  };

  const handleClipLibraryAction = (action: string) => {
    if (action === "generate") {
      console.log("Generate new clip");
    }
  };

  return (
    <div className="flex flex-col h-full bg-[hsl(var(--cine-bg))]">
      {/* Timeline Header */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-normal text-white">Timeline</h2>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleAddTrack}
              className="text-[hsl(var(--cine-text-muted))] hover:text-white"
            >
              <Plus className="w-3 h-3.5 mr-2" />
              Add Track
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <Search className="w-3.5 h-3.5 text-[hsl(var(--cine-text-muted))]" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <ZoomIn className="w-3.5 h-3.5 text-[hsl(var(--cine-text-muted))]" />
            </Button>
          </div>
        </div>

        {/* Time Ruler */}
        <div className="bg-[hsl(var(--cine-sidebar))] border border-[hsl(var(--cine-border))] rounded-t-md px-4 py-2">
          <div className="flex justify-between text-xs text-[hsl(var(--cine-text-muted))]">
            {timeMarkers.map((time) => (
              <span key={time}>{time}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Tracks */}
      <div className="flex-1 mx-4 border-l border-r border-[hsl(var(--cine-border))] bg-[hsl(var(--cine-sidebar))] relative">
        {/* Video Track */}
        <div className="flex border-b border-[hsl(var(--cine-border))] h-24">
          <div className="w-20 bg-[hsl(var(--cine-card))] border-r border-[hsl(var(--cine-border))] flex items-center justify-center">
            <span className="text-sm font-medium text-[hsl(var(--cine-text-muted))]">Video</span>
          </div>
          <div
            className={cn(
              "flex-1 relative p-2 transition-colors",
              isDragOver && "bg-purple-500/10 border-2 border-dashed border-purple-500"
            )}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={(e) => {
              setIsDragOver(false);
              e.preventDefault();
              try {
                const clipData = JSON.parse(e.dataTransfer.getData("application/json"));
                const rect = e.currentTarget.getBoundingClientRect();
                const dropPosition = e.clientX - rect.left;
                const dropTime = (dropPosition / rect.width) * project.duration;

                const newClip: TimelineClip = {
                  ...clipData,
                  id: `v_${Date.now()}`,
                  startTime: Math.max(0, dropTime),
                  track: 0
                };

                const updatedTracks = {
                  ...project.tracks,
                  video: [...project.tracks.video, newClip]
                };

                onProjectUpdate({
                  ...project,
                  tracks: updatedTracks
                });
              } catch (error) {
                console.error("Error dropping clip:", error);
              }
            }}
          >
            {project.tracks.video.map((clip) => (
              <div
                key={clip.id}
                className={cn(
                  "absolute top-2 h-20 bg-[hsl(var(--cine-border))] border border-[hsl(var(--cine-card))] rounded-md overflow-hidden cursor-pointer",
                  selectedClip?.id === clip.id && "ring-2 ring-purple-500"
                )}
                style={{
                  left: `${getClipPosition(clip.startTime)}px`,
                  width: `${getClipWidth(clip.duration)}px`
                }}
                onClick={() => onClipSelect(clip)}
              >
                <div className="relative h-14 bg-[hsl(var(--cine-card))]">
                  {clip.imageUrl && (
                    <img 
                      src={clip.imageUrl} 
                      alt={clip.title}
                      className="w-full h-full object-cover opacity-70"
                    />
                  )}
                </div>
                <div className="px-1 py-1 flex justify-between items-center text-xs">
                  <span className="text-[hsl(var(--cine-text-muted))] truncate">{clip.title}</span>
                  <span className="text-[hsl(var(--cine-text-muted))]">{clip.duration}</span>
                </div>
              </div>
            ))}
            {/* Transition markers */}
            <div className="absolute top-8 left-36 w-2 h-8 bg-orange-500 rounded-sm"></div>
            <div className="absolute top-8 left-80 w-2 h-8 bg-orange-500 rounded-sm"></div>
          </div>
        </div>

        {/* Audio Track */}
        <div className="flex border-b border-[hsl(var(--cine-border))] h-20">
          <div className="w-20 bg-[hsl(var(--cine-card))] border-r border-[hsl(var(--cine-border))] flex items-center justify-center">
            <span className="text-sm font-medium text-[hsl(var(--cine-text-muted))]">Audio</span>
          </div>
          <div className="flex-1 relative p-2">
            {project.tracks.audio.map((clip) => (
              <div
                key={clip.id}
                className="absolute top-2 h-16 bg-[hsl(var(--cine-border))] border border-[hsl(var(--cine-card))] rounded-md overflow-hidden"
                style={{
                  left: `${getClipPosition(clip.startTime)}px`,
                  width: `${getClipWidth(clip.duration) * 4}px` // Audio clips are longer
                }}
              >
                <div className="h-10 bg-[hsl(var(--cine-card))] flex items-center justify-center">
                  <div className="flex items-center justify-center">
                    {/* Audio waveform visualization */}
                    <svg width="80" height="16" viewBox="0 0 81 16" className="text-purple-500">
                      <path 
                        d="M0.25 8C2.91667 5.33333 5.58333 5.33333 8.25 8C10.9167 10.6667 13.5833 10.6667 16.25 8C18.9167 5.33333 21.5833 5.33333 24.25 8C26.9167 10.6667 29.5833 10.6667 32.25 8C34.9167 5.33333 37.5833 5.33333 40.25 8C42.9167 10.6667 45.5833 10.6667 48.25 8C50.9167 5.33333 53.5833 5.33333 56.25 8C58.9167 10.6667 61.5833 10.6667 64.25 8C66.9167 5.33333 69.5833 5.33333 72.25 8C74.9167 10.6667 77.5833 10.6667 80.25 8" 
                        stroke="currentColor" 
                        strokeWidth="0.8" 
                        fill="none"
                      />
                    </svg>
                  </div>
                </div>
                <div className="px-1 py-1 flex justify-between items-center text-xs">
                  <span className="text-[hsl(var(--cine-text-muted))] truncate">{clip.title}</span>
                  <span className="text-[hsl(var(--cine-text-muted))]">{clip.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Text Track */}
        <div className="flex border-b border-[hsl(var(--cine-border))] h-20">
          <div className="w-20 bg-[hsl(var(--cine-card))] border-r border-[hsl(var(--cine-border))] flex items-center justify-center">
            <span className="text-sm font-medium text-[hsl(var(--cine-text-muted))]">Text</span>
          </div>
          <div className="flex-1 relative p-2">
            {project.tracks.text.map((clip) => (
              <div
                key={clip.id}
                className="absolute top-2 h-16 bg-[hsl(var(--cine-border))] border border-[hsl(var(--cine-card))] rounded-md overflow-hidden"
                style={{
                  left: `${getClipPosition(clip.startTime) + 25}px`,
                  width: `${getClipWidth(clip.duration)}px`
                }}
              >
                <div className="h-10 bg-blue-500/20 flex items-center justify-center px-2">
                  <span className="text-xs text-blue-100 truncate">{clip.content}</span>
                </div>
                <div className="px-1 py-1 flex justify-between items-center text-xs">
                  <span className="text-[hsl(var(--cine-text-muted))] truncate">{clip.title}</span>
                  <span className="text-[hsl(var(--cine-text-muted))]">{clip.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Playhead */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-purple-500 cursor-col-resize z-10"
          style={{ left: `${playheadPosition}px` }}
          onMouseDown={handlePlayheadDrag}
        >
          <div className="w-6 h-6 bg-purple-500 -translate-x-3 -translate-y-3 absolute"></div>
        </div>
      </div>

      {/* Timeline Controls */}
      <div className="mx-4 px-4 py-2 bg-[hsl(var(--cine-sidebar))] border-l border-r border-b border-[hsl(var(--cine-border))] rounded-b-md">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => handleTimelineAction("cut")}
            className="p-2 text-[hsl(var(--cine-text-muted))] hover:text-white"
          >
            <Scissors className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => handleTimelineAction("delete")}
            className="p-2 text-[hsl(var(--cine-text-muted))] hover:text-white"
          >
            <Trash2 className="w-3.5 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => handleTimelineAction("copy")}
            className="p-2 text-[hsl(var(--cine-text-muted))] hover:text-white"
          >
            <Copy className="w-4 h-4" />
          </Button>
          <div className="flex-1"></div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => handleTimelineAction("layers")}
            className="p-2 text-[hsl(var(--cine-text-muted))] hover:text-white"
          >
            <Layers className="w-5 h-4" />
          </Button>
        </div>
      </div>

      {/* Clip Library */}
      <div className="border-t border-[hsl(var(--cine-border))] bg-[hsl(var(--cine-sidebar))] p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white font-medium">Clip Library</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[hsl(var(--cine-text-muted))]">Drag clips to timeline</span>
            <Button variant="ghost" size="sm" className="p-2">
              <ChevronDown className="w-4 h-4 text-[hsl(var(--cine-text-muted))]" />
            </Button>
          </div>
        </div>
        
        <div className="flex gap-4 overflow-x-auto">
          {clipLibrary.map((clip) => (
            <div
              key={clip.id}
              className="min-w-34 bg-[hsl(var(--cine-card))] rounded-md overflow-hidden cursor-grab hover:bg-[hsl(var(--cine-card))]/80 transition-colors"
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("application/json", JSON.stringify({
                  ...clip,
                  type: "video"
                }));
              }}
            >
              <div className="relative h-20">
                <img
                  src={clip.imageUrl}
                  alt={clip.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-1 right-1 bg-black/80 px-1 py-0.5 rounded text-xs text-white">
                  {clip.duration}
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/20 transition-colors">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-8 h-8 rounded-full bg-[hsl(var(--cine-card))] text-[hsl(var(--cine-text-muted))] hover:text-white"
                    onClick={() => console.log(`Play clip: ${clip.title}`)}
                  >
                    <svg width="14" height="16" viewBox="0 0 12 16" fill="none">
                      <path d="M2.28125 1.21872C1.81875 0.934346 1.2375 0.924971 0.765625 1.1906C0.29375 1.45622 0 1.95622 0 2.49997V13.5C0 14.0437 0.29375 14.5437 0.765625 14.8093C1.2375 15.075 1.81875 15.0625 2.28125 14.7812L11.2812 9.28122C11.7281 9.00935 12 8.52497 12 7.99997C12 7.47497 11.7281 6.99372 11.2812 6.71872L2.28125 1.21872Z" fill="white"/>
                    </svg>
                  </Button>
                </div>
              </div>
              <div className="p-2">
                <h4 className="text-xs font-medium text-white truncate">{clip.title}</h4>
                <p className="text-xs text-[hsl(var(--cine-text-muted))]">{clip.subtitle}</p>
              </div>
            </div>
          ))}
          
          {/* Add New Clip Button */}
          <div className="min-w-34 bg-[hsl(var(--cine-card))] rounded-md border-2 border-dashed border-[hsl(var(--cine-card))] flex flex-col items-center justify-center h-44">
            <Button 
              variant="ghost" 
              onClick={() => handleClipLibraryAction("generate")}
              className="flex flex-col items-center gap-2 h-full text-[hsl(var(--cine-text-muted))] hover:text-white"
            >
              <div className="w-10 h-10 rounded-full bg-[hsl(var(--cine-border))] flex items-center justify-center">
                <Plus className="w-3.5 h-4 text-[hsl(var(--cine-text-muted))]" />
              </div>
              <span className="text-xs text-center">Generate New Clip</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
