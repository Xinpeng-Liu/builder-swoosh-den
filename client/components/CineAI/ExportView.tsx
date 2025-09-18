import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Play,
  HelpCircle,
  Film,
  Image as ImageIcon,
  Video,
  Music,
  Tv,
  Camera,
  Plus,
  ChevronRight,
  FolderOpen,
  FileText,
  Download,
  Share2,
  Trash2
} from "lucide-react";
import { cn } from "@/lib/utils";

export function ExportView() {
  const [selectedPreset, setSelectedPreset] = useState("mp4-1080p");
  const [fileName, setFileName] = useState("Echoes_of_Tomorrow_v1");
  const [outputLocation, setOutputLocation] = useState("/Users/username/Documents/Films");
  const [videoBitrate, setVideoBitrate] = useState([8]);
  const [audioBitrate, setAudioBitrate] = useState([256]);
  const [includeProjectDetails, setIncludeProjectDetails] = useState(true);
  const [includeAIParams, setIncludeAIParams] = useState(true);
  const [includeSceneDesc, setIncludeSceneDesc] = useState(false);
  const [enableHDR, setEnableHDR] = useState(false);
  const [includeSubtitles, setIncludeSubtitles] = useState(true);
  const [addWatermark, setAddWatermark] = useState(false);

  const exportPresets = [
    {
      id: "mp4-1080p",
      name: "MP4 1080p",
      description: "High quality, standard format",
      icon: <Film className="w-4 h-4 text-blue-500" />,
      resolution: "1920 × 1080",
      format: "MP4 (H.264)",
      size: "65 MB",
      recommended: true
    },
    {
      id: "gif-preview",
      name: "GIF Preview", 
      description: "For social media sharing",
      icon: <ImageIcon className="w-4 h-4 text-pink-500" />,
      resolution: "720 × 405",
      format: "Animated GIF",
      size: "15 MB"
    },
    {
      id: "trailer-30s",
      name: "Trailer 30s",
      description: "Short teaser version", 
      icon: <Video className="w-4 h-4 text-orange-500" />,
      resolution: "1080 × 1080",
      format: "MP4 (H.264)",
      size: "22 MB"
    }
  ];

  const exportHistory = [
    {
      filename: "Echoes_v0.9.mp4",
      time: "2h ago",
      details: "MP4 • 1080p • 58MB"
    },
    {
      filename: "Echoes_trailer.mp4", 
      time: "1d ago",
      details: "MP4 • 1080×1080 • 22MB"
    },
    {
      filename: "Echoes_preview.gif",
      time: "1d ago", 
      details: "GIF • 720×405 • 12MB"
    }
  ];

  return (
    <div className="flex-1 flex">
      {/* Main Content */}
      <div className="flex-1 p-8 bg-[hsl(var(--cine-bg))] overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-normal text-white">Export Your Film</h2>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <HelpCircle className="w-4 h-4" />
            </Button>
          </div>

          {/* Film Preview */}
          <div className="p-6 bg-[hsl(var(--cine-sidebar))] border border-[hsl(var(--cine-border))] rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-white">Film Preview</h3>
              <Button size="sm" className="bg-[hsl(var(--cine-card))] hover:bg-[hsl(var(--cine-card))]/80">
                <Play className="w-3 h-3 mr-2" />
                Play Preview
              </Button>
            </div>
            
            <div className="relative bg-gray-800 rounded-lg overflow-hidden mb-4">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/181f2fa6864913008ced0da0abd3164bf7486f6f?width=1596" 
                alt="Film preview"
                className="w-full h-[449px] object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button size="lg" className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm">
                  <Play className="w-6 h-6 text-white ml-1" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-1">Duration</h4>
                <p className="text-white">2:45</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-1">Resolution</h4>
                <p className="text-white">1920 × 1080 (16:9)</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-1">Estimated Size</h4>
                <p className="text-white">~65 MB</p>
              </div>
            </div>
          </div>

          {/* Export Presets */}
          <div className="p-6 bg-[hsl(var(--cine-sidebar))] border border-[hsl(var(--cine-border))] rounded-xl">
            <h3 className="text-lg font-medium text-white mb-4">Export Presets</h3>
            <div className="grid grid-cols-3 gap-4">
              {exportPresets.map((preset) => (
                <div
                  key={preset.id}
                  className={cn(
                    "p-4 rounded-lg border-2 cursor-pointer transition-colors",
                    selectedPreset === preset.id
                      ? "border-blue-500 bg-[hsl(var(--cine-card))]"
                      : "border-[hsl(var(--cine-border))] bg-[hsl(var(--cine-card))] hover:border-gray-500"
                  )}
                  onClick={() => setSelectedPreset(preset.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[hsl(var(--cine-card))] rounded-md flex items-center justify-center">
                        {preset.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{preset.name}</h4>
                        <p className="text-xs text-gray-400">{preset.description}</p>
                      </div>
                    </div>
                    {preset.recommended && (
                      <Badge className="bg-blue-500 text-white text-xs">
                        Recommended
                      </Badge>
                    )}
                  </div>
                  
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Resolution:</span>
                      <span className="text-white">{preset.resolution}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Format:</span>
                      <span className="text-white">{preset.format}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Est. Size:</span>
                      <span className="text-white">{preset.size}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Export Settings */}
          <div className="p-6 bg-[hsl(var(--cine-sidebar))] border border-[hsl(var(--cine-border))] rounded-xl">
            <h3 className="text-lg font-medium text-white mb-4">Export Settings</h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                {/* File Name */}
                <div>
                  <Label className="text-sm font-medium text-gray-400 mb-1">File Name</Label>
                  <Input
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    className="bg-[hsl(var(--cine-card))] border-[hsl(var(--cine-border))] text-white"
                  />
                </div>

                {/* Output Location */}
                <div>
                  <Label className="text-sm font-medium text-gray-400 mb-1">Output Location</Label>
                  <div className="flex">
                    <Input
                      value={outputLocation}
                      onChange={(e) => setOutputLocation(e.target.value)}
                      className="bg-[hsl(var(--cine-card))] border-[hsl(var(--cine-border))] text-gray-400 rounded-r-none"
                    />
                    <Button size="sm" className="bg-[hsl(var(--cine-card))] rounded-l-none border-l-0">
                      <FolderOpen className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Include Metadata */}
                <div>
                  <Label className="text-sm font-medium text-gray-400 mb-2">Include Metadata</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={includeProjectDetails}
                        onCheckedChange={setIncludeProjectDetails}
                      />
                      <label className="text-sm text-gray-300">Project details</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={includeAIParams}
                        onCheckedChange={setIncludeAIParams}
                      />
                      <label className="text-sm text-gray-300">AI generation parameters</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={includeSceneDesc}
                        onCheckedChange={setIncludeSceneDesc}
                      />
                      <label className="text-sm text-gray-300">Scene descriptions</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {/* Quality Settings */}
                <div>
                  <Label className="text-sm font-medium text-gray-400 mb-3">Quality Settings</Label>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-300">Video Bitrate</span>
                        <span className="text-sm text-gray-300">{videoBitrate[0]} Mbps</span>
                      </div>
                      <Slider
                        value={videoBitrate}
                        onValueChange={setVideoBitrate}
                        max={20}
                        step={1}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-300">Audio Quality</span>
                        <span className="text-sm text-gray-300">{audioBitrate[0]} kbps</span>
                      </div>
                      <Slider
                        value={audioBitrate}
                        onValueChange={setAudioBitrate}
                        max={320}
                        min={128}
                        step={32}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Advanced Options */}
                <div>
                  <Label className="text-sm font-medium text-gray-400 mb-2">Advanced Options</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={enableHDR}
                        onCheckedChange={setEnableHDR}
                      />
                      <label className="text-sm text-gray-300">Enable HDR</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={includeSubtitles}
                        onCheckedChange={setIncludeSubtitles}
                      />
                      <label className="text-sm text-gray-300">Include subtitles</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={addWatermark}
                        onCheckedChange={setAddWatermark}
                      />
                      <label className="text-sm text-gray-300">Add watermark</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Export Button */}
          <div className="p-6 bg-[hsl(var(--cine-sidebar))] border border-[hsl(var(--cine-border))] rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-white">Ready to Export</h3>
                <p className="text-sm text-gray-400">Your film will be exported with the selected settings</p>
              </div>
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600 px-8">
                <FileText className="w-4 h-4 mr-2" />
                Export Film
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Share Options Sidebar */}
      <div className="w-64 bg-[hsl(var(--cine-sidebar))] border-l border-[hsl(var(--cine-border))] p-4">
        <h3 className="text-sm font-medium text-gray-400 mb-4">Share Options</h3>
        
        {/* Share Directly */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-white mb-3">Share Directly</h4>
          <div className="space-y-3">
            <Button variant="ghost" className="w-full justify-between bg-[hsl(var(--cine-card))] hover:bg-[hsl(var(--cine-card))]/80">
              <div className="flex items-center gap-3">
                <Music className="w-3.5 h-4 text-white" />
                <span className="text-gray-200">TikTok</span>
              </div>
              <ChevronRight className="w-3 h-3 text-gray-400" />
            </Button>
            <Button variant="ghost" className="w-full justify-between bg-[hsl(var(--cine-card))] hover:bg-[hsl(var(--cine-card))]/80">
              <div className="flex items-center gap-3">
                <Tv className="w-4.5 h-4 text-red-500" />
                <span className="text-gray-200">YouTube</span>
              </div>
              <ChevronRight className="w-3 h-3 text-gray-400" />
            </Button>
            <Button variant="ghost" className="w-full justify-between bg-[hsl(var(--cine-card))] hover:bg-[hsl(var(--cine-card))]/80">
              <div className="flex items-center gap-3">
                <Camera className="w-3.5 h-4 text-pink-500" />
                <span className="text-gray-200">Instagram</span>
              </div>
              <ChevronRight className="w-3 h-3 text-gray-400" />
            </Button>
            <Button variant="ghost" className="w-full justify-start bg-[hsl(var(--cine-card))] hover:bg-[hsl(var(--cine-card))]/80">
              <Plus className="w-3.5 h-4 text-purple-500 mr-3" />
              <span className="text-gray-200">Add Platform</span>
            </Button>
          </div>
        </div>

        {/* Export History */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-white">Export History</h4>
            <Button variant="link" size="sm" className="text-blue-500 text-xs p-0 h-auto">
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {exportHistory.map((item, index) => (
              <div key={index} className="p-3 bg-[hsl(var(--cine-card))] rounded-md">
                <div className="flex items-center justify-between mb-1">
                  <h5 className="text-sm font-medium text-white truncate">{item.filename}</h5>
                  <span className="text-xs text-gray-400">{item.time}</span>
                </div>
                <div className="text-xs text-gray-400 mb-2">{item.details}</div>
                <div className="flex items-center gap-2 text-xs">
                  <Button variant="link" size="sm" className="text-blue-500 p-0 h-auto">
                    Download
                  </Button>
                  <span className="text-gray-500">|</span>
                  <Button variant="link" size="sm" className="text-gray-300 p-0 h-auto">
                    Share
                  </Button>
                  <span className="text-gray-500">|</span>
                  <Button variant="link" size="sm" className="text-gray-300 p-0 h-auto">
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
