import { Film } from "lucide-react";

export function TopNav() {
  return (
    <header className="h-14 px-4 flex items-center justify-between border-b border-[hsl(var(--cine-border))] bg-[hsl(var(--cine-sidebar))]">
      {/* Left: Logo and Title */}
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-5 h-7 text-[hsl(var(--cine-purple))]">
          <Film className="w-5 h-5" />
        </div>
        <h1 className="text-lg font-normal text-white font-['Lexend']">
          CineAI
        </h1>
      </div>

      {/* Right: User Avatar */}
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-full bg-[hsl(var(--cine-blue))] flex items-center justify-center">
          <span className="text-sm font-medium text-white">JS</span>
        </div>
      </div>
    </header>
  );
}
