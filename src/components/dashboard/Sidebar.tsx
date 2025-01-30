import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  BarChart2, 
  FolderKanban, 
  FileText, 
  Settings 
} from "lucide-react";

const sidebarLinks = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
    color: "text-blue-500",
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: Users,
    color: "text-green-500",
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart2,
    color: "text-purple-500",
  },
  {
    title: "Projects",
    href: "/dashboard/projects",
    icon: FolderKanban,
    color: "text-orange-500",
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: FileText,
    color: "text-yellow-500",
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    color: "text-red-500",
  },
] as const;

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 border-r min-h-[calc(100vh-4rem)] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {sidebarLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "flex items-center rounded-lg px-3 py-2 text-sm transition-colors",
                  location.pathname === link.href
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted group"
                )}
              >
                <link.icon 
                  className={cn(
                    "mr-2 h-4 w-4",
                    location.pathname === link.href 
                      ? "text-primary-foreground" 
                      : link.color
                  )} 
                />
                <span className="group-hover:translate-x-1 transition-transform">
                  {link.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 