import { Copy, Film, Link, BookOpen, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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

interface PreviewPanelProps {
  scene: Scene;
}

export function PreviewPanel({ scene }: PreviewPanelProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-[hsl(var(--cine-border))]">
        <h3 className="text-sm font-medium text-[hsl(var(--cine-text-muted))]">
          Scene Preview
        </h3>
      </div>

      {/* Preview Image */}
      <div className="p-4">
        <div className="w-full h-32 bg-[hsl(var(--cine-card))] rounded-md overflow-hidden">
          <img
            src={scene.imageUrl}
            alt={scene.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Text Prompt Section */}
      <div className="px-4 pb-4">
        <h4 className="text-sm font-medium text-white mb-2">Text Prompt</h4>
        <div className="p-3 bg-[hsl(var(--cine-card))] rounded-md">
          <div className="text-xs text-[hsl(var(--cine-text-secondary))] leading-relaxed space-y-1">
            <p>A cozy cafe interior in the morning.</p>
            <p>Warm sunlight streams through</p>
            <p>large windows, creating golden</p>
            <p>patches on wooden tables. The</p>
            <p>atmosphere is cheerful and</p>
            <p>inviting. A few customers engage</p>
            <p>in quiet conversation over</p>
            <p>steaming cups of coffee. The</p>
            <p>warm tones of the cafe create a</p>
            <p>sense of comfort and relaxation.</p>
          </div>
        </div>

        {/* Copy Prompt Button */}
        <Button
          variant="outline"
          className="w-full mt-2 bg-[hsl(var(--cine-border))] border-[hsl(var(--cine-border))] text-white hover:bg-[hsl(var(--cine-border))]/80 gap-2 text-sm h-9"
        >
          <Copy className="w-3.5 h-3.5" />
          Copy Prompt
        </Button>
      </div>

      {/* Options Section */}
      <div className="px-4 pb-4">
        <h4 className="text-sm font-medium text-white mb-2">Options</h4>
        <div className="space-y-2">
          {/* Generate Clip */}
          <button className="w-full flex items-center justify-between p-2 bg-[hsl(var(--cine-card))] hover:bg-[hsl(var(--cine-card))]/80 rounded-md transition-colors group">
            <div className="flex items-center gap-2">
              <Film className="w-3.5 h-3.5 text-[hsl(var(--cine-blue))]" />
              <span className="text-sm text-[hsl(var(--cine-text-secondary))]">
                Generate Clip
              </span>
            </div>
            <ChevronRight className="w-2.5 h-3.5 text-[hsl(var(--cine-text-secondary))] group-hover:text-white transition-colors" />
          </button>

          {/* Link to Character */}
          <button className="w-full flex items-center justify-between p-2 bg-[hsl(var(--cine-card))] hover:bg-[hsl(var(--cine-card))]/80 rounded-md transition-colors group">
            <div className="flex items-center gap-2">
              <Link className="w-4.5 h-3.5 text-[hsl(var(--cine-orange))]" />
              <span className="text-sm text-[hsl(var(--cine-text-secondary))]">
                Link to Character
              </span>
            </div>
            <ChevronRight className="w-2.5 h-3.5 text-[hsl(var(--cine-text-secondary))] group-hover:text-white transition-colors" />
          </button>

          {/* Add to Plot */}
          <button className="w-full flex items-center justify-between p-2 bg-[hsl(var(--cine-card))] hover:bg-[hsl(var(--cine-card))]/80 rounded-md transition-colors group">
            <div className="flex items-center gap-2">
              <BookOpen className="w-3 h-3.5 text-[hsl(var(--cine-pink))]" />
              <span className="text-sm text-[hsl(var(--cine-text-secondary))]">
                Add to Plot
              </span>
            </div>
            <ChevronRight className="w-2.5 h-3.5 text-[hsl(var(--cine-text-secondary))] group-hover:text-white transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
}
