import { useState, useCallback } from "react";
import { Message, ApiError } from "@/types/chat";
import { chatService } from "@/services/chat.service";
import { useAuthStore } from "@/store/auth.store";

export interface UseChatOptions {
  api?: string;
  initialMessages?: Message[];
  initialInput?: string;
  onResponse?: (response: Response) => void | Promise<void>;
  onFinish?: (message: Message) => void | Promise<void>;
  onError?: (error: ApiError) => void | Promise<void>;
}

export function useChat({
  initialMessages = [],
  initialInput = "",
  onResponse,
  onFinish,
  onError,
}: UseChatOptions = {}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState(initialInput);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const { user } = useAuthStore();

  if (!user) {
    throw new Error("User is not authenticated");
  }

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setInput(e.target.value);
    },
    []
  );

  const handleSubmit = useCallback(
    async (
      e?: React.FormEvent<HTMLFormElement>,
      options?: {
        user_id: string;
        session_id: string;
        question: string;
        experimental_attachments?: FileList;
      }
    ) => {
      e?.preventDefault();

      if (!input.trim() || !options) {
        return;
      }

      setIsLoading(true);
      setError(null);

      const userMessage: Message = {
        id: Date.now(),
        role: "user",
        content: input,
        user_id: options?.user_id,
        session_id: options?.session_id,
        question: input,
        answer: "",
      };

      // Optimistically add user message to state
      setMessages((messages) => [...messages, userMessage]);
      setInput("");

      try {
        const response = await chatService.sendMessage({
          question: input,
          user_id: options.user_id,
          session_id: options.session_id,
          system_instruction: "You are a helpful assistant.",
        });

        const assistantMessage: Message = {
          id: Date.now(),
          role: "assistant",
          content: response.data,
          user_id: options.user_id,
          session_id: options.session_id,
          question: input,
          answer: response.data,
        };

        setMessages((messages) => [...messages, assistantMessage]);

        if (onFinish) {
          await onFinish(assistantMessage);
        }
      } catch (err) {
        const error = err as ApiError;
        setError(error);
        if (onError) {
          await onError(error);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [input, onFinish, onError]
  );

  const reload = useCallback(
    async (options?: { userId: string; sessionId: string }) => {
      if (messages.length === 0 || !options) return;

      setIsLoading(true);
      setError(null);

      const lastUserMessage = messages[messages.length - 2];

      try {
        const response = await chatService.sendMessage({
          question: lastUserMessage.question,
          user_id: options.userId,
          session_id: options.sessionId,
          system_instruction: "You are a helpful assistant.",
        });

        const assistantMessage: Message = {
          id: Date.now(),
          role: "assistant",
          content: response.data,
          user_id: options.userId,
          session_id: options.sessionId,
          question: lastUserMessage.question,
          answer: response.data,
        };

        setMessages((messages) => [...messages.slice(0, -1), assistantMessage]);

        if (onFinish) {
          await onFinish(assistantMessage);
        }
      } catch (err) {
        const error = err as ApiError;
        setError(error);
        if (onError) {
          await onError(error);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [messages, onFinish, onError]
  );

  return {
    messages,
    error,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    isLoading,
    reload,
    setMessages,
  };
}
