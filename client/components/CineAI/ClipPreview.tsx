import { Button } from "@/components/ui/button";
import { Clock, CheckCircle, XCircle, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ClipProject } from "@/pages/Clips";

interface ClipPreviewProps {
  project: ClipProject;
}

interface GenerationHistoryItem {
  id: string;
  timestamp: string;
  status: "success" | "error" | "processing";
  title: string;
  description: string;
  length?: string;
  resolution?: string;
  size?: string;
}

interface GenerationStat {
  label: string;
  value: string | number;
}

export function ClipPreview({ project }: ClipPreviewProps) {
  const generationHistory: GenerationHistoryItem[] = [
    {
      id: "gh_009",
      timestamp: "Just now",
      status: "processing",
      title: "Character Intro — Nova at Neon Alley",
      description: "Rendering 1080p MP4 with Cyberpunk + Steadicam shots…",
      length: "0:18",
      resolution: "1920×1080",
      size: "—",
    },
    {
      id: "gh_008",
      timestamp: "18 min ago",
      status: "success",
      title: "Chase Through Market — Cipher POV",
      description: "Wide → Tracking → Close Up. Looks sharp with HDR enabled.",
      length: "0:22",
      resolution: "1920×1080",
      size: "28 MB",
    },
    {
      id: "gh_007",
      timestamp: "1 hr ago",
      status: "success",
      title: "Victor’s Monologue — Warehouse",
      description: "Low-angle + High contrast noir. Approved for timeline.",
      length: "0:15",
      resolution: "1920×1080",
      size: "19 MB",
    },
    {
      id: "gh_006",
      timestamp: "2 hr ago",
      status: "error",
      title: "Drone Establishing Shot",
      description: "Aerial shot failed checksum. Retrying suggested.",
      length: "0:08",
      resolution: "3840×2160",
      size: "—",
    },
    {
      id: "gh_005",
      timestamp: "Yesterday",
      status: "success",
      title: "Maya Tech Lab Insert",
      description: "Macro board detail + rack focus. Graded teal/orange.",
      length: "0:12",
      resolution: "1920×1080",
      size: "14 MB",
    },
  ];

  const generationStats: GenerationStat[] = [
    { label: "Total Clips", value: 5 },
    { label: "Successful", value: 3 },
    { label: "Failed", value: 1 },
    { label: "Processing", value: 1 },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <div className="w-3 h-3 rounded-full bg-green-500" />;
      case "error":
        return <div className="w-3 h-3 rounded-full bg-red-500" />;
      case "processing":
        return <div className="w-3 h-3 rounded-full bg-purple-500" />;
      default:
        return <div className="w-3 h-3 rounded-full bg-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-500";
      case "error":
        return "text-red-500";
      case "processing":
        return "text-purple-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="h-full flex flex-col p-5">
      {/* Generation History */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-[hsl(var(--cine-text-muted))] mb-4">
          Generation History
        </h3>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-[hsl(var(--cine-border))] ml-1.5" />

          <div className="space-y-4">
            {generationHistory.map((item, index) => (
              <div key={item.id} className="relative pl-8">
                {/* Timeline dot */}
                <div className="absolute left-0 top-1.5">
                  {getStatusIcon(item.status)}
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <span className="text-xs text-[hsl(var(--cine-text-muted))]">
                    {item.timestamp}
                  </span>

                  <div className="p-3 bg-[hsl(var(--cine-card))] rounded-md space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm text-white font-medium truncate pr-2">
                        {item.title}
                      </h4>
                      <span
                        className={cn(
                          "text-xs capitalize",
                          getStatusColor(item.status),
                        )}
                      >
                        {item.status}
                      </span>
                    </div>
                    <p className="text-xs text-[hsl(var(--cine-text-muted))] leading-4">
                      {item.description}
                    </p>
                    <div className="flex gap-2 pt-1">
                      {item.length && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-[hsl(var(--cine-border))]/30 text-[hsl(var(--cine-text-secondary))]">
                          {item.length}
                        </span>
                      )}
                      {item.resolution && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-[hsl(var(--cine-border))]/30 text-[hsl(var(--cine-text-secondary))]">
                          {item.resolution}
                        </span>
                      )}
                      {item.size && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-[hsl(var(--cine-border))]/30 text-[hsl(var(--cine-text-secondary))]">
                          {item.size}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Generation Stats */}
      <div className="mb-8">
        <h4 className="text-sm font-medium text-white mb-3">
          Generation Stats
        </h4>
        <div className="space-y-2">
          {generationStats.map((stat, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm text-[hsl(var(--cine-text-muted))]">
                {stat.label}
              </span>
              <span className="text-sm text-white font-medium">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Generation Settings */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-white">Generation Settings</h4>

        {/* Quality Slider */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-xs text-[hsl(var(--cine-text-muted))]">
              Quality
            </span>
            <span className="text-xs text-purple-500">High</span>
          </div>
          <div className="w-full h-1.5 bg-[hsl(var(--cine-border))] rounded-full">
            <div
              className="h-full bg-purple-500 rounded-full"
              style={{ width: "80%" }}
            />
          </div>
        </div>

        {/* Creativity Slider */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-xs text-[hsl(var(--cine-text-muted))]">
              Creativity
            </span>
            <span className="text-xs text-purple-500">Medium</span>
          </div>
          <div className="w-full h-1.5 bg-[hsl(var(--cine-border))] rounded-full">
            <div
              className="h-full bg-purple-500 rounded-full"
              style={{ width: "60%" }}
            />
          </div>
        </div>

        {/* Style Consistency Slider */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-xs text-[hsl(var(--cine-text-muted))]">
              Style Consistency
            </span>
            <span className="text-xs text-purple-500">High</span>
          </div>
          <div className="w-full h-1.5 bg-[hsl(var(--cine-border))] rounded-full">
            <div
              className="h-full bg-purple-500 rounded-full"
              style={{ width: "85%" }}
            />
          </div>
        </div>

        {/* Advanced Settings Button */}
        <div className="pt-2">
          <Button
            variant="secondary"
            size="sm"
            className="w-full bg-[hsl(var(--cine-border))] hover:bg-[hsl(var(--cine-card))] text-[hsl(var(--cine-text-muted))] border-0"
          >
            <Settings className="w-4 h-4 mr-2" />
            Advanced Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
