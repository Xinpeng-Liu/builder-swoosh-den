import {
  Folder,
  Image,
  Users,
  BookOpen,
  Film,
  Clock,
  Settings,
  Lightbulb
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const menuItems: SidebarItem[] = [
    {
      id: "projects",
      label: "Projects",
      icon: <Folder className="w-4 h-4" />,
    },
    {
      id: "library",
      label: "Library",
      icon: <Image className="w-5 h-4" />,
    },
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
      icon: <Clock className="w-4.5 h-4" />,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="w-4 h-4" />,
    },
  ];

  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId);

    // Navigate to the appropriate route
    switch (itemId) {
      case "scenes":
        navigate("/cineai");
        break;
      case "characters":
        navigate("/characters");
        break;
      case "plot":
        navigate("/plot");
        break;
      default:
        // For now, other items stay on the current page
        break;
    }
  };

  return (
    <aside className="w-56 bg-[hsl(var(--cine-sidebar))] border-r border-[hsl(var(--cine-border))] flex flex-col">
      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleItemClick(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-colors",
                  (propActiveItem ? propActiveItem === item.id : activeItem === item.id) || item.isActive
                    ? "bg-[hsl(var(--cine-card))] text-white"
                    : "text-[hsl(var(--cine-text-muted))] hover:bg-[hsl(var(--cine-card))] hover:text-white"
                )}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
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
          Create atmospheric scenes with specific lighting details to enhance the mood of your film.
        </p>
      </div>
    </aside>
  );
}
