import { useEffect } from "react";
import { Chat } from "@/components/ui/chat";
import { useChat } from "@/hooks/use-chat";
import { useChatStore } from "@/store/chat.store";
import { chatService } from "@/services/chat.service";
import { useAuthStore } from "@/store/auth.store";
import { toast } from "sonner";
import { useLocation, useParams } from "react-router-dom";

export function ChatInterface() {
  const { user } = useAuthStore();
  const {
    currentSession,
    messages: storeMessages,
    setMessages: setStoreMessages,
    setIsLoading,
    setCurrentSession,
  } = useChatStore();
  const { botId } = useParams();
  const { state } = useLocation();
  const { botDetails } = state;

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading: chatIsLoading,
    error,
    setMessages,
  } = useChat({
    api: "/chat/question_answer",
    initialMessages: storeMessages,
    onFinish: async (message) => {
      if (!user || !currentSession) return;
      setStoreMessages([...messages, message]);
      setIsLoading(false);
    },
    onError: (error) => {
      toast.error("Failed to send message");
      console.error("Chat error:", error);
    },
  });

  useEffect(() => {
    if (botDetails) {
      setCurrentSession({
        id: botDetails.bot_id,
        bot_type: botDetails.category,
        created_at: botDetails.created_at,
        name: botDetails.name,
      });
    }

    const loadChatHistory = async () => {
      if (!user || !botId) return;

      try {
        const response = await chatService.getChatHistory({
          user_id: user.id,
          bot_id: botId,
        });

        if (response.success) {
          const formattedMessages = response.data.map((msg) => ({
            ...msg,
            role: msg.role,
            content: msg.role === "user" ? msg.question : msg.answer,
          }));
          setMessages(formattedMessages);
          setStoreMessages(formattedMessages);
        } else {
          setMessages([]);
          setStoreMessages([]);
        }
      } catch (error) {
        toast.error("Failed to load chat history");
        console.error("Failed to load chat history:", error);
      }
    };

    loadChatHistory();
  }, [botDetails,botId, user, setMessages, setStoreMessages, setCurrentSession]);

  if (!currentSession) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">
          Select a chat to start messaging
        </p>
      </div>
    );
  }

  return (
    <Chat
      messages={messages}
      input={input}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      isGenerating={chatIsLoading}
      error={error?.message}
      className="flex-1 p-4"
    />
  );
}
