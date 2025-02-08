import { AxiosError } from 'axios';
import { api } from '@/config/api';
import { API_CONFIG } from '@/config/api';
import { 
  ApiResponse, 
  ChatHistoryRequest, 
  Message, 
  QuestionRequest,
  ApiError 
} from '@/types/chat';

export const chatService = {
  sendMessage: async (data: QuestionRequest): Promise<ApiResponse<string>> => {
    try {
      const response = await api.post<ApiResponse<string>>(
        API_CONFIG.endpoints.chat,
        data
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw {
          status: error.response?.status || 500,
          message: error.response?.data?.message || 'Failed to send message',
          details: error.response?.data?.details,
        } as ApiError;
      }
      throw {
        status: 500,
        message: 'An unexpected error occurred',
      } as ApiError;
    }
  },

  getChatHistory: async (data: ChatHistoryRequest): Promise<ApiResponse<Message[]>> => {
    try {
      const response = await api.post<ApiResponse<Message[]>>(
        API_CONFIG.endpoints.chatHistory,
        data
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw {
          status: error.response?.status || 500,
          message: error.response?.data?.message || 'Failed to load chat history',
          details: error.response?.data?.details,
        } as ApiError;
      }
      throw {
        status: 500,
        message: 'An unexpected error occurred',
      } as ApiError;
    }
  },
}; 