import { Maximize2 } from "lucide-react";

interface PlotPoint {
  id: string;
  title: string;
  type: "Dialogue" | "Action";
  description: string;
  character?: string;
  dialogue?: string;
  storyBeat?: string;
}

interface ScriptPreviewProps {
  plotPoint: PlotPoint;
}

export function ScriptPreview({ plotPoint }: ScriptPreviewProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-[hsl(var(--cine-border))] flex items-center justify-between">
        <h3 className="text-sm font-medium text-[hsl(var(--cine-text-muted))]">
          Script Preview
        </h3>
        <button className="p-1 rounded hover:bg-[hsl(var(--cine-card))] transition-colors">
          <Maximize2 className="w-4 h-4 text-[hsl(var(--cine-text-muted))]" />
        </button>
      </div>

      {/* Script Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-6">
          {/* Story Context */}
          <div className="space-y-3">
            <h4 className="text-xs font-medium text-[hsl(var(--cine-text-secondary))] uppercase tracking-wide">
              ECHOES OF TOMORROW
            </h4>
            <div className="text-xs text-[hsl(var(--cine-text-muted))]">
              FADE IN:
            </div>
          </div>

          {/* Scene Description */}
          <div className="space-y-2">
            <div className="text-xs font-medium text-[hsl(var(--cine-text-secondary))]">
              EXT. FUTURISTIC CITY - NIGHT
            </div>
            <p className="text-xs text-[hsl(var(--cine-text-muted))] leading-relaxed">
              A panoramic view of the futuristic city skyline. Towering spires reach into the cloudy sky. Neon lights flicker between the massive concrete bridges. Flying vehicles move swiftly through set flight paths.
            </p>
          </div>

          {/* Narrator Section */}
          <div className="space-y-2">
            <div className="text-xs font-medium text-[hsl(var(--cine-text-secondary))]">
              NARRATOR (V.O.)
            </div>
            <p className="text-xs text-[hsl(var(--cine-text-muted))] leading-relaxed">
              In the year 2150, humanity stands at crossroads...
            </p>
          </div>

          {/* Scene Transition */}
          <div className="space-y-2">
            <div className="text-xs font-medium text-[hsl(var(--cine-text-secondary))]">
              INT. RESEARCH LAB - NIGHT
            </div>
          </div>

          {/* Character Information */}
          <div className="space-y-3">
            <div className="text-xs font-medium text-[hsl(var(--cine-text-secondary))]">
              MAYA (28)
            </div>
            <p className="text-xs text-[hsl(var(--cine-text-muted))] leading-relaxed">
              Brilliant and determined, sits at her desk surrounded by holographic displays. Her eyes scanning for threats.
            </p>
          </div>

          {/* Current Plot Point */}
          {plotPoint.type === "Dialogue" && plotPoint.dialogue && (
            <div className="p-3 bg-[hsl(var(--cine-card))] rounded-md border-l-2 border-[hsl(var(--cine-blue))]">
              <div className="text-xs font-medium text-[hsl(var(--cine-text-secondary))] mb-2">
                {plotPoint.character?.toUpperCase() || "CHARACTER"}
              </div>
              <p className="text-xs text-[hsl(var(--cine-text-secondary))] leading-relaxed">
                {plotPoint.dialogue}
              </p>
            </div>
          )}

          {plotPoint.type === "Action" && (
            <div className="p-3 bg-[hsl(var(--cine-card))] rounded-md border-l-2 border-[hsl(var(--cine-orange))]">
              <p className="text-xs text-[hsl(var(--cine-text-secondary))] leading-relaxed">
                {plotPoint.description}
              </p>
            </div>
          )}

          {/* Additional Context */}
          <div className="space-y-2">
            <p className="text-xs text-[hsl(var(--cine-text-muted))] leading-relaxed">
              An alert flashes across Maya's screen. Security breach detected in the central database. The expression shifts from concentration to concern.
            </p>
          </div>

          {/* Character Details */}
          <div className="space-y-3">
            <div className="text-xs font-medium text-[hsl(var(--cine-text-secondary))]">
              ALEX (32)
            </div>
            <p className="text-xs text-[hsl(var(--cine-text-muted))] leading-relaxed">
              Head of security, eyes alert. Maya, we have a problem. Someone's infiltrated our quantum firewall.
            </p>
          </div>

          {/* Story Beat Information */}
          {plotPoint.storyBeat && (
            <div className="mt-6 pt-4 border-t border-[hsl(var(--cine-border))]">
              <div className="text-xs font-medium text-[hsl(var(--cine-text-secondary))] mb-2">
                Story Beat
              </div>
              <p className="text-xs text-[hsl(var(--cine-text-muted))] leading-relaxed">
                {plotPoint.storyBeat}
              </p>
            </div>
          )}

          {/* Technical Notes */}
          <div className="mt-6 pt-4 border-t border-[hsl(var(--cine-border))]">
            <div className="text-xs font-medium text-[hsl(var(--cine-text-secondary))] mb-2">
              Technical Notes
            </div>
            <div className="space-y-1 text-xs text-[hsl(var(--cine-text-muted))]">
              <p>• Camera: Wide establishing shot</p>
              <p>• Lighting: Neon reflections, dramatic shadows</p>
              <p>• Audio: Ambient city sounds, electronic hum</p>
              <p>• VFX: Holographic UI elements, particle effects</p>
            </div>
          </div>

          {/* Character Notes */}
          <div className="mt-4">
            <div className="text-xs font-medium text-[hsl(var(--cine-text-secondary))] mb-2">
              Character Arc
            </div>
            <div className="space-y-1 text-xs text-[hsl(var(--cine-text-muted))]">
              <p><strong>MAYA:</strong> Transitions from focused researcher to concerned protector of her work.</p>
              <p><strong>ALEX:</strong> Establishes himself as Maya's trusted ally and security expert.</p>
            </div>
          </div>

          {/* Continuation */}
          <div className="mt-6 text-xs text-[hsl(var(--cine-text-muted))]">
            Maya and Alex rush to the server room to investigate the security breach...
          </div>
        </div>
      </div>
    </div>
  );
}
