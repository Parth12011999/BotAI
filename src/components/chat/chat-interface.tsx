import { useEffect } from "react";
import { Chat } from "@/components/ui/chat";
import { useChat } from "@/hooks/use-chat";
import { useChatStore } from "@/store/chat.store";
import { chatService } from "@/services/chat.service";
import { useAuthStore } from "@/store/auth.store";
import { toast } from "sonner";

// Update the type definition to accept a Promise return type and include experimental_attachments
type OnSubmitHandler = (
  event?: React.FormEvent<HTMLFormElement>,
  options?: {
    user_id: string;
    session_id: string;
    question: string;
    experimental_attachments?: FileList;
  }
) => Promise<void>;

// Or alternatively, if you're using this as a prop type:
interface ChatInterfaceProps {
  onSubmit: (
    event?: React.FormEvent<HTMLFormElement>,
    options?: {
      user_id: string;
      session_id: string;
      question: string;
      experimental_attachments?: FileList;
    }
  ) => Promise<void>;
  // ... other props
}

export function ChatInterface() {
  const { user } = useAuthStore();
  const { currentSession, messages: storeMessages, setMessages: setStoreMessages, setIsLoading } = useChatStore();

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
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
    const loadChatHistory = async () => {
      if (!user || !currentSession) return;

      try {
        const response = await chatService.getChatHistory({
          user_id: user.id,
          session_id: currentSession.id,
        });

        if (response.success) {
          const formattedMessages = response.data.map((msg) => ({
            ...msg,
            role: msg.role,
            content: msg.role === "user" ? msg.question : msg.answer,
          }));
          setMessages(formattedMessages);
          setStoreMessages(formattedMessages);
        }
      } catch (error) {
        toast.error("Failed to load chat history");
        console.error("Failed to load chat history:", error);
      }
    };

    loadChatHistory();
  }, [currentSession, user, setMessages, setStoreMessages]);

  if (!currentSession) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">Select a chat to start messaging</p>
      </div>
    );
  }

  return (
    <Chat
      messages={messages}
      input={input}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      isGenerating={isLoading}
      error={error?.message}
      className="flex-1 p-4"
    />
  );
} 