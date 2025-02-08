import { cn } from "@/lib/utils";
import { useChatStore } from "@/store/chat.store";
import { ChatSession } from "@/types/chat";
import { MoreVertical, Trash2 } from "lucide-react";
import { CreateBotDialog } from "./create-bot-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export function ChatSidebar() {
  const { sessions, currentSession, setCurrentSession, deleteSession } = useChatStore();

  const handleSessionClick = (session: ChatSession) => {
    setCurrentSession(session);
  };

  const handleDeleteSession = (sessionId: string) => {
    deleteSession(sessionId);
    toast.success("Bot deleted successfully");
  };

  return (
    <div className="w-80 border-r bg-muted/10">
      <div className="flex h-14 items-center justify-between px-4 border-b">
        <h2 className="text-lg font-semibold">My Bots</h2>
        <CreateBotDialog />
      </div>
        <div className="p-2 space-y-2">
          {sessions.map((session) => (
            <div
              key={session.id}
              className={cn(
                "group flex items-center justify-between px-4 py-2 rounded-lg hover:bg-muted/50 transition-colors",
                currentSession?.id === session.id && "bg-muted"
              )}
            >
              <button
                onClick={() => handleSessionClick(session)}
                className="flex-1 text-left"
              >
                <div className="font-medium">{session.name}</div>
                {session.last_message && (
                  <div className="text-sm text-muted-foreground truncate">
                    {session.last_message}
                  </div>
                )}
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-muted rounded">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() => handleDeleteSession(session.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Bot
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
          {sessions.length === 0 && (
            <div className="px-4 py-8 text-center text-muted-foreground">
              <p>No bots created yet</p>
              <p className="text-sm">Create your first bot to get started</p>
            </div>
          )}
        </div>
    </div>
  );
} 