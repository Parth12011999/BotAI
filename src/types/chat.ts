export interface Message {
  id?: number;
  user_id: string;
  session_id: string;
  question: string;
  answer: string;
  created_at?: string;
  updated_at?: string;
  role: "user" | "assistant";
  content: string;
}

export interface ChatSession {
  id: string;
  name: string;
  bot_type: string;
  created_at: string;
  last_message?: string;
}

export interface QuestionRequest {
  question: string;
  user_id: string;
  session_id: string;
  system_instruction: string;
}

export interface ChatHistoryRequest {
  user_id: string;
  session_id: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: null | string;
  data: T;
}

export interface ApiError {
  status: number;
  message: string;
  details?: Record<string, string[]>;
} 