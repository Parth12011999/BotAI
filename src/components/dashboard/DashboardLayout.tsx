import { ChatSidebar } from "../chat/chat-sidebar";
import { ChatInterface } from "../chat/chat-interface";

export function DashboardLayout() {
  return (
    <div className="flex h-screen max-w-screen">
      <ChatSidebar />
      <main className="flex-1 flex flex-col">
        <ChatInterface />
      </main>
    </div>
  );
} 