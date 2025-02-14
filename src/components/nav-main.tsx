"use client";

import { Collapsible } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Trash2Icon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { CreateBotDialog } from "./chat/create-bot-dialog";
import { DeleteBotDialog } from "./chat/delete-bot-dialog";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bot } from "@/services/bot";
import { useAuthStore } from "@/store/auth.store";
import { useState } from "react";
import { botKeys } from "@/lib/query-keys";

export interface NavMainProps {
  items: {
    bot_id: string;
    title: string;
    url: string;
    category: string;
    isActive?: boolean;
    description?: string;
  }[];
}

export function NavMain({ items }: NavMainProps) {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const [selectedBot, setSelectedBot] = useState<{
    bot_id: string;
    name: string;
  } | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { mutate: deleteBot, isPending: isDeleting } = useMutation({
    mutationFn: (botId: string) => bot.delete(botId),
    onSuccess: (response) => {
      toast.success("Bot deleted successfully");
      queryClient.invalidateQueries({
        queryKey: botKeys.lists(),
      });
      setShowDeleteDialog(false);
      setSelectedBot(null);
      return response;
    },
    onError: (error) => {
      if (error.message?.includes("JWT token")) {
        toast.error("Session expired", {
          description: "Please login again",
        });
        useAuthStore.getState().logout();
        localStorage.removeItem("auth-storage");
        window.location.href = "/login";
        return;
      }

      toast.error("Failed to delete bot", {
        description: error.message || "Please try again later",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: botKeys.lists(),
      });
    },
  });

  const handleDeleteClick = (
    bot_id: string,
    name: string,
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error("Please login to delete bots");
      return;
    }

    setSelectedBot({ bot_id, name });
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (selectedBot) {
      deleteBot(selectedBot.bot_id);
    }
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-base flex justify-between items-center">
        <p>My Bots</p>
        <CreateBotDialog />
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.bot_id} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={item.title}>
                <div className="flex justify-between h-auto items-center py-0.5">
                  <div className="grid grid-rows-2 h-auto !gap-2">
                    <p className="text-base font-semibold">{item.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.category}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) =>
                      handleDeleteClick(item.bot_id, item.title, e)
                    }
                    disabled={isDeleting}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {isDeleting && selectedBot?.bot_id === item.bot_id ? (
                      <Loader2 className="h-4 w-4 animate-spin text-destructive" />
                    ) : (
                      <Trash2Icon className="h-4 w-4 text-destructive hover:text-destructive/80" />
                    )}
                  </Button>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>

      {selectedBot && (
        <DeleteBotDialog
          open={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
          onConfirm={handleConfirmDelete}
          isDeleting={isDeleting}
          botName={selectedBot.name}
        />
      )}
    </SidebarGroup>
  );
}
