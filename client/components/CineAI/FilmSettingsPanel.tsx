import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Download, Languages, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TimelineProject } from "@/pages/Timeline";

interface FilmSettingsPanelProps {
  project: TimelineProject;
  onProjectUpdate: (project: TimelineProject) => void;
}

export function FilmSettingsPanel({
  project,
  onProjectUpdate,
}: FilmSettingsPanelProps) {
  const [settings, setSettings] = useState({
    format: "16:9 (Widescreen)",
    autoTransitions: true,
    transitionType: "Fade",
    backgroundMusic: true,
    musicType: "Sci-Fi Ambience",
    volume: 75,
    autoSubtitles: true,
    subtitleLanguage: "English",
    exportQuality: "HD",
  });

  const handleToggle = (setting: string) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev],
    }));
  };

  const handleVolumeChange = (value: number) => {
    setSettings((prev) => ({
      ...prev,
      volume: value,
    }));
  };

  const handleExportQualityChange = (quality: string) => {
    setSettings((prev) => ({
      ...prev,
      exportQuality: quality,
    }));
  };

  const handlePreviewFilm = () => {
    console.log("Preview film");
  };

  const handleExportFilm = () => {
    console.log("Export film");
  };

  return (
    <div className="h-full flex flex-col p-4">
      {/* Film Settings Header */}
      <h3 className="text-sm font-medium text-[hsl(var(--cine-text-muted))] mb-4">
        Film Settings
      </h3>

      {/* Preview Section */}
      <div className="mb-6">
        <div className="relative w-full h-40 bg-[hsl(var(--cine-bg))] rounded-lg overflow-hidden mb-3">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/48a70a165cf8268a6397867268a107db31b76c72?width=510"
            alt="Film preview"
            className="w-full h-full object-cover"
          />
        </div>
        <Button
          onClick={handlePreviewFilm}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
        >
          <Play className="w-3 h-4 mr-2" />
          Preview Film
        </Button>
      </div>

      {/* Format */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-white mb-2">Format</h4>
        <div className="relative">
          <select
            value={settings.format}
            onChange={(e) =>
              setSettings((prev) => ({ ...prev, format: e.target.value }))
            }
            className="w-full bg-[hsl(var(--cine-card))] text-gray-300 px-3 py-1.5 rounded-md border-0 text-sm appearance-none cursor-pointer"
          >
            <option value="16:9 (Widescreen)">16:9 (Widescreen)</option>
            <option value="9:16 (Portrait)">9:16 (Portrait)</option>
            <option value="1:1 (Square)">1:1 (Square)</option>
            <option value="4:3 (Standard)">4:3 (Standard)</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Auto Transitions */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-sm font-medium text-white">Auto Transitions</h4>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.autoTransitions}
              onChange={() => handleToggle("autoTransitions")}
              className="sr-only"
            />
            <div
              className={cn(
                "w-9 h-5 rounded-full transition-colors",
                settings.autoTransitions ? "bg-purple-600" : "bg-gray-600",
              )}
            >
              <div
                className={cn(
                  "w-4 h-4 bg-white rounded-full transition-transform mt-0.5",
                  settings.autoTransitions
                    ? "translate-x-4"
                    : "translate-x-0.5",
                )}
              ></div>
            </div>
          </label>
        </div>
        <div className="relative">
          <select
            value={settings.transitionType}
            onChange={(e) =>
              setSettings((prev) => ({
                ...prev,
                transitionType: e.target.value,
              }))
            }
            className="w-full bg-[hsl(var(--cine-card))] text-gray-300 px-3 py-1.5 rounded-md border-0 text-sm appearance-none cursor-pointer"
          >
            <option value="Fade">Fade</option>
            <option value="Slide">Slide</option>
            <option value="Zoom">Zoom</option>
            <option value="Cut">Cut</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Background Music */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-sm font-medium text-white">Background Music</h4>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.backgroundMusic}
              onChange={() => handleToggle("backgroundMusic")}
              className="sr-only"
            />
            <div
              className={cn(
                "w-9 h-5 rounded-full transition-colors",
                settings.backgroundMusic ? "bg-purple-600" : "bg-gray-600",
              )}
            >
              <div
                className={cn(
                  "w-4 h-4 bg-white rounded-full transition-transform mt-0.5",
                  settings.backgroundMusic
                    ? "translate-x-4"
                    : "translate-x-0.5",
                )}
              ></div>
            </div>
          </label>
        </div>
        <div className="relative mb-3">
          <select
            value={settings.musicType}
            onChange={(e) =>
              setSettings((prev) => ({ ...prev, musicType: e.target.value }))
            }
            className="w-full bg-[hsl(var(--cine-card))] text-gray-300 px-3 py-1.5 rounded-md border-0 text-sm appearance-none cursor-pointer"
          >
            <option value="Sci-Fi Ambience">Sci-Fi Ambience</option>
            <option value="Epic Orchestral">Epic Orchestral</option>
            <option value="Electronic">Electronic</option>
            <option value="Ambient">Ambient</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
        </div>

        {/* Volume Slider */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-[hsl(var(--cine-text-muted))]">
            Volume
          </span>
          <div className="flex-1 relative">
            <div className="h-1 bg-[hsl(var(--cine-border))] rounded-full">
              <div
                className="h-1 bg-purple-500 rounded-full transition-all"
                style={{ width: `${settings.volume}%` }}
              ></div>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={settings.volume}
              onChange={(e) => handleVolumeChange(parseInt(e.target.value))}
              className="absolute inset-0 w-full h-1 opacity-0 cursor-pointer"
            />
          </div>
          <span className="text-xs text-[hsl(var(--cine-text-muted))]">
            {settings.volume}%
          </span>
        </div>
      </div>

      {/* Auto Subtitles */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-sm font-medium text-white">Auto Subtitles</h4>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.autoSubtitles}
              onChange={() => handleToggle("autoSubtitles")}
              className="sr-only"
            />
            <div
              className={cn(
                "w-9 h-5 rounded-full transition-colors",
                settings.autoSubtitles ? "bg-purple-600" : "bg-gray-600",
              )}
            >
              <div
                className={cn(
                  "w-4 h-4 bg-white rounded-full transition-transform mt-0.5",
                  settings.autoSubtitles ? "translate-x-4" : "translate-x-0.5",
                )}
              ></div>
            </div>
          </label>
        </div>

        {/* Subtitle Controls */}
        <div className="flex gap-2 mb-3">
          <Button
            variant="secondary"
            size="sm"
            className="flex-1 bg-[hsl(var(--cine-card))] text-[hsl(var(--cine-text-muted))] border-0"
          >
            Font
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="flex-1 bg-[hsl(var(--cine-card))] text-[hsl(var(--cine-text-muted))] border-0"
          >
            Color
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="flex-1 bg-[hsl(var(--cine-card))] text-[hsl(var(--cine-text-muted))] border-0"
          >
            Position
          </Button>
        </div>

        {/* Auto-translate */}
        <div className="bg-[hsl(var(--cine-card))] rounded-md p-2">
          <div className="flex items-center gap-2 mb-2">
            <Languages className="w-5 h-4 text-blue-500" />
            <span className="text-xs font-medium text-gray-200">
              Auto-translate
            </span>
          </div>
          <div className="relative">
            <select
              value={settings.subtitleLanguage}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  subtitleLanguage: e.target.value,
                }))
              }
              className="w-full bg-[hsl(var(--cine-border))] text-gray-300 px-3 py-1 rounded-md border-0 text-xs appearance-none cursor-pointer"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-2.5 h-2.5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-white mb-3">Export Options</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="quality"
              value="HD"
              checked={settings.exportQuality === "HD"}
              onChange={() => handleExportQualityChange("HD")}
              className="text-blue-500"
            />
            <span className="text-sm text-gray-300">HD (1080p)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="quality"
              value="4K"
              checked={settings.exportQuality === "4K"}
              onChange={() => handleExportQualityChange("4K")}
              className="text-blue-500"
            />
            <span className="text-sm text-gray-300">4K</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="quality"
              value="Web"
              checked={settings.exportQuality === "Web"}
              onChange={() => handleExportQualityChange("Web")}
              className="text-blue-500"
            />
            <span className="text-sm text-gray-300">Web Optimized</span>
          </label>
        </div>
      </div>

      {/* Export Button */}
      <Button
        onClick={handleExportFilm}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
      >
        <Download className="w-4.5 h-4 mr-2" />
        Export Film
      </Button>
    </div>
  );
}
