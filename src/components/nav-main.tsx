import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { botKeys } from "@/lib/query-keys";
import { bot } from "@/services/bot";
import { useAuthStore } from "@/store/auth.store";
import { Bot } from "@/types/chat";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { CreateBotDialog } from "./chat/create-bot-dialog";
import { DeleteBotDialog } from "./chat/delete-bot-dialog";
import { Link } from "react-router-dom";

export interface NavMainProps {
  items: Bot[] | undefined;
}

type CategoryWithBots = {
  category: string;
  bots: Bot[];
};

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

  const sortAndGroupByCategory = (data: Bot[]) => {
    // First, sort the data based on category
    const sortedData = [...data].sort((a, b) =>
      a.category.localeCompare(b.category)
    );

    // Group the sorted data by category
    const groupedData = sortedData.reduce<Record<string, CategoryWithBots>>(
      (acc, item) => {
        // Check if the category already exists in the accumulator
        if (!acc[item.category]) {
          acc[item.category] = { category: item.category, bots: [] };
        }
        // Push the current item into the corresponding category's bots array
        acc[item.category].bots.push(item);
        return acc;
      },
      {}
    );

    // Return an array of the grouped categories
    return Object.values(groupedData);
  };

  // Call the function
  const groupByCategory: CategoryWithBots[] = items
    ? sortAndGroupByCategory(items)
    : [];

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-base flex h-16 justify-between items-center">
        <p>My Bots</p>
        <CreateBotDialog />
      </SidebarGroupLabel>
      <SidebarMenu>
        {groupByCategory?.map((item) => (
          <SidebarMenuItem key={item.category}>
            <SidebarMenuButton>
              <span className="font-medium capitalize">{item.category}</span>
            </SidebarMenuButton>
            {item.bots?.length ? (
              <SidebarMenuSub>
                {item.bots?.map((item) => (
                  <SidebarMenuSubItem key={item?.name}>
                    <SidebarMenuSubButton
                      className="flex gap-2 items-center w-full justify-between"
                      isActive={!!item?.isactive}
                    >
                      <Link 
                        to={`/chat/${item.bot_id}`} 
                        className="flex-1 text-left"
                        onClick={(e) => e.stopPropagation()}
                        state={{
                          botDetails: item
                        }}
                      >
                        {item.name}
                      </Link>
                      <Trash2Icon
                        className="cursor-pointer hover:text-destructive"
                        size={16}
                        onClick={(e) => handleDeleteClick(item.bot_id, item.name, e)}
                      />
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            ) : null}
          </SidebarMenuItem>
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
