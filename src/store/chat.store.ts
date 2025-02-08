import { create } from "zustand";
import { Message, ChatSession } from "@/types/chat";

interface ChatState {
  sessions: ChatSession[];
  currentSession: ChatSession | null;
  messages: Message[];
  isLoading: boolean;
  setCurrentSession: (session: ChatSession) => void;
  addMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
  setIsLoading: (loading: boolean) => void;
  setSessions: (sessions: ChatSession[]) => void;
  addSession: (session: ChatSession) => void;
  deleteSession: (sessionId: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  sessions: [],
  currentSession: null,
  messages: [],
  isLoading: false,
  setCurrentSession: (session) => set({ currentSession: session }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setMessages: (messages) => set({ messages }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setSessions: (sessions) => set({ sessions }),
  addSession: (session) => 
    set((state) => ({ 
      sessions: [...state.sessions, session],
      currentSession: session 
    })),
  deleteSession: (sessionId) =>
    set((state) => ({
      sessions: state.sessions.filter((s) => s.id !== sessionId),
      currentSession: state.currentSession?.id === sessionId ? null : state.currentSession,
      messages: state.currentSession?.id === sessionId ? [] : state.messages,
    })),
})); 