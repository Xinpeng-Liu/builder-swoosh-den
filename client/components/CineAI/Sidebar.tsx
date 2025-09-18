import {
  Image,
  Users,
  BookOpen,
  Film,
  Clock,
  Settings,
  FileText,
  Lightbulb
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  isActive?: boolean;
}

interface SidebarProps {
  activeItem?: string;
}

export function Sidebar({ activeItem: propActiveItem }: SidebarProps = {}) {
  const [activeItem, setActiveItem] = useState(propActiveItem || "scenes");

  const menuItems: SidebarItem[] = [
    {
      id: "scenes",
      label: "Scenes",
      icon: <Image className="w-4 h-4" />,
    },
    {
      id: "characters",
      label: "Characters",
      icon: <Users className="w-3.5 h-4" />,
    },
    {
      id: "plot",
      label: "Plot",
      icon: <BookOpen className="w-3.5 h-4" />,
    },
    {
      id: "clips",
      label: "Clips",
      icon: <Film className="w-4 h-4" />,
    },
    {
      id: "timeline",
      label: "Timeline",
      icon: <Clock className="w-4 h-4" />,
    },
    {
      id: "export",
      label: "Export",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="w-4 h-4" />,
    },
  ];

  const getPathForItem = (itemId: string) => {
    switch (itemId) {
      case "scenes":
        return "/cineai";
      case "characters":
        return "/characters";
      case "plot":
        return "/plot";
      case "clips":
        return "/clips";
      case "timeline":
        return "/timeline";
      case "export":
        return "/export";
      default:
        return "#";
    }
  };

  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId);
  };

  return (
    <aside className="w-56 bg-[hsl(var(--cine-sidebar))] border-r border-[hsl(var(--cine-border))] flex flex-col">
      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const href = getPathForItem(item.id);
            const isActive = (propActiveItem ? propActiveItem === item.id : activeItem === item.id) || item.isActive;
            return (
              <li key={item.id}>
                <a
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => handleItemClick(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--cine-blue))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--cine-sidebar))]",
                    isActive
                      ? "bg-[hsl(var(--cine-blue))] text-white"
                      : "text-[hsl(var(--cine-text-muted))] hover:bg-[hsl(var(--cine-card))] hover:text-white"
                  )}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  <span>{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Pro Tip Section */}
      <div className="p-3 m-3 bg-[hsl(var(--cine-card))] rounded-md">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-3 h-4 text-orange-500" />
          <span className="text-sm font-medium text-[hsl(var(--cine-text-secondary))]">
            Pro Tip
          </span>
        </div>
        <p className="text-xs text-[hsl(var(--cine-text-muted))] leading-4">
          Export in multiple formats to reach different platforms and audiences.
        </p>
      </div>
    </aside>
  );
}
