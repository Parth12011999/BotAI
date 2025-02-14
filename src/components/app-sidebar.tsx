import { api } from "@/config/api";
import { useQuery } from "@tanstack/react-query";
import { Bot, LifeBuoy, Send } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/store/auth.store";
import { botKeys } from "@/lib/query-keys";

interface Bot {
  id: number;
  bot_id: string;
  user_id: string;
  name: string;
  category: string;
  instruction: string;
  isactive: number;
  created_at: string;
  updated_at: string | null;
}

interface BotListResponse {
  success: boolean;
  message: string | null;
  data: Bot[];
}

const navSecondary = [
  {
    title: "Support",
    url: "#",
    icon: LifeBuoy,
  },
  {
    title: "Feedback",
    url: "#",
    icon: Send,
  },
] as const;

const botApi = {
  list: async (): Promise<BotListResponse> => {
    const response = await api.get("/chat/bot/list");
    return response.data;
  },
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuthStore();

  const {
    data: botList,
    isLoading,
    error,
  } = useQuery({
    queryKey: botKeys.list(user?.id ?? ""),
    queryFn: () => botApi.list(),
    enabled: !!user,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
    select: (data) => data.data,
    onError: (error: Error) => {
      toast.error("Failed to load bots", {
        description: error.message,
      });
    },
  });

  console.log(botList);
  


  const formattedBots = React.useMemo(() => {
    if (!botList) return [];

    return botList.map((bot) => ({
      bot_id: bot.bot_id,
      title: bot.name,
      url: `/chat/${bot.bot_id}`,
      category: bot.category,
      isActive: bot.isactive === 1,
      description: bot.instruction,
    }));
  }, [botList]);

  return (
    <Sidebar
      className="top-[--header-height] !h-[calc(100svh-var(--header-height))]"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Bot className="h-5 w-5" />
                </div>
                <div className="grid grid-rows-1 flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">BOT.AI</span>
                  <span className="truncate text-xs">(v.0.0.1)</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {isLoading ? (
          <div className="space-y-2 p-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : error ? (
          <div className="p-4 text-center text-sm text-muted-foreground">
            <p>Failed to load bots</p>
            <p className="mt-1">Please try again later</p>
          </div>
        ) : (
          <NavMain items={formattedBots} />
        )}
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: user?.username || "User",
            email: user?.email || "",
            avatar: "/avatars/user.jpg",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
