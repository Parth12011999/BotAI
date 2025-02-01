export interface LoginRequest {
  user_name: string;
  password: string;
}

export interface LoginResponse {
  response: string;
  user_id: string;
  session_id: string;
  user_name: string;
  user_email: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string | null;
  data: T;
}

export interface User {
  id: string;
  username: string;
  email: string;
  sessionId: string;
}

export interface SignupRequest {
  name: string;
  user_name: string;
  password: string;
  confirmPassword: string;
  email: string;
  phone?: string;
}

export interface SignupResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    name: string;
    email: string;
    user_name: string;
  };
}

export interface ApiError {
  status: number;
  message: string;
  details?: Record<string, string[]>;
}

export interface LogoutRequest {
  user_id: string;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
} 