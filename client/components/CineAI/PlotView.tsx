import { Plus, Download, Eye, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PlotPoint {
  id: string;
  title: string;
  type: "Dialogue" | "Action";
  description: string;
  character?: string;
  dialogue?: string;
  storyBeat?: string;
}

interface PlotViewProps {
  plotPoints: PlotPoint[];
  onPlotPointSelect: (plotPoint: PlotPoint) => void;
  selectedPlotPointId?: string;
}

const typeColors: Record<string, string> = {
  "Dialogue": "bg-blue-500",
  "Action": "bg-orange-500",
};

export function PlotView({ plotPoints, onPlotPointSelect, selectedPlotPointId }: PlotViewProps) {
  return (
    <div className="h-full bg-[hsl(var(--cine-bg))] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-[hsl(var(--cine-border))] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="text-[hsl(var(--cine-text-muted))] hover:text-white p-2">
            <Download className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-[hsl(var(--cine-text-muted))] hover:text-white p-2">
            <Eye className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-[hsl(var(--cine-text-muted))]">Sort:</span>
          <select className="bg-transparent text-[hsl(var(--cine-text-muted))] text-sm border-none outline-none">
            <option>Manual</option>
            <option>Chronological</option>
            <option>Character</option>
          </select>
          <Button 
            className="bg-[hsl(var(--cine-purple))] hover:bg-[hsl(var(--cine-purple))]/90 text-white h-8 px-3 gap-2"
            size="sm"
          >
            <Plus className="w-3 h-3.5" />
            New Plot
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-[hsl(var(--cine-border))]">
        <input
          type="text"
          placeholder="Search plot points..."
          className="w-full bg-[hsl(var(--cine-card))] border border-[hsl(var(--cine-border))] rounded-md px-3 py-2 text-sm text-white placeholder:text-[hsl(var(--cine-text-muted))]"
        />
      </div>

      {/* Plot Points List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-3">
          {plotPoints.map((plotPoint, index) => (
            <PlotPointCard
              key={plotPoint.id}
              plotPoint={plotPoint}
              index={index + 1}
              isSelected={plotPoint.id === selectedPlotPointId}
              onClick={() => onPlotPointSelect(plotPoint)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface PlotPointCardProps {
  plotPoint: PlotPoint;
  index: number;
  isSelected: boolean;
  onClick: () => void;
}

function PlotPointCard({ plotPoint, index, isSelected, onClick }: PlotPointCardProps) {
  const typeColor = typeColors[plotPoint.type] || "bg-gray-500";

  return (
    <div 
      className={cn(
        "p-3 rounded-lg border cursor-pointer transition-all hover:border-[hsl(var(--cine-purple))]/50",
        "bg-[hsl(var(--cine-sidebar))]",
        isSelected 
          ? "border-[hsl(var(--cine-blue))]" 
          : "border-[hsl(var(--cine-border))]"
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-[hsl(var(--cine-card))] flex items-center justify-center text-xs text-[hsl(var(--cine-text-secondary))]">
            {index}
          </span>
          <h3 className="text-white font-medium text-sm">
            {plotPoint.title}
          </h3>
        </div>
        <button className="p-1 rounded hover:bg-[hsl(var(--cine-card))] transition-colors">
          <MoreHorizontal className="w-3 h-3 text-[hsl(var(--cine-text-muted))]" />
        </button>
      </div>

      {/* Description */}
      <p className="text-xs text-[hsl(var(--cine-text-muted))] mb-3 line-clamp-2">
        {plotPoint.description}
      </p>

      {/* Type Tag */}
      <div className="flex items-center justify-between">
        <span className={cn(
          "inline-block px-2 py-1 rounded text-xs text-white",
          typeColor
        )}>
          {plotPoint.type}
        </span>
        
        {plotPoint.character && (
          <span className="text-xs text-[hsl(var(--cine-text-muted))]">
            {plotPoint.character}
          </span>
        )}
      </div>
    </div>
  );
}
