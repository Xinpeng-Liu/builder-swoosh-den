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
      id: "1",
      timestamp: "Just now",
      status: "processing",
      title: "Lab Discovery Scene",
      description: "Alex's laboratory scene anomaly"
    },
    {
      id: "2", 
      timestamp: "5 hours ago",
      status: "error",
      title: "Scene 6 Generation",
      description: "Failed"
    },
    {
      id: "3",
      timestamp: "3 hours ago", 
      status: "success",
      title: "Scene 5 Generation",
      description: "Approved"
    },
    {
      id: "4",
      timestamp: "2 hours ago",
      status: "success", 
      title: "Scene 1 Generation",
      description: "Approved"
    }
  ];

  const generationStats: GenerationStat[] = [
    { label: "Total Clips", value: 5 },
    { label: "Successful", value: 3 },
    { label: "Failed", value: 1 },
    { label: "Processing", value: 1 }
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
                  
                  <div className="p-2 bg-[hsl(var(--cine-card))] rounded-md space-y-1">
                    <div className="h-4 bg-[hsl(var(--cine-border))] rounded opacity-20" />
                    <div className="h-4 bg-[hsl(var(--cine-border))] rounded opacity-20" />
                    <div className="h-4 bg-[hsl(var(--cine-border))] rounded opacity-20 w-3/4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Generation Stats */}
      <div className="mb-8">
        <h4 className="text-sm font-medium text-white mb-3">Generation Stats</h4>
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
            <span className="text-xs text-[hsl(var(--cine-text-muted))]">Quality</span>
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
            <span className="text-xs text-[hsl(var(--cine-text-muted))]">Creativity</span>
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
            <span className="text-xs text-[hsl(var(--cine-text-muted))]">Style Consistency</span>
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
