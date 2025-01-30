import axios, { AxiosError } from 'axios';
import { API_CONFIG } from '@/config/api';
import { 
  SignupRequest, 
  SignupResponse, 
  ApiError, 
  LoginRequest, 
  ApiResponse,
  LoginResponse 
} from '@/types/auth';

const api = axios.create({
  baseURL: API_CONFIG.baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {
  login: async (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    try {
      const response = await api.post<ApiResponse<LoginResponse>>(
        API_CONFIG.endpoints.login,
        data
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw {
          status: error.response?.status || 500,
          message: error.response?.data?.message || 'Invalid credentials',
          details: error.response?.data?.details,
        } as ApiError;
      }
      throw {
        status: 500,
        message: 'An unexpected error occurred',
      } as ApiError;
    }
  },

  signup: async (data: SignupRequest): Promise<SignupResponse> => {
    try {
      const response = await api.post<SignupResponse>(
        API_CONFIG.endpoints.signup,
        data
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw {
          status: error.response?.status || 500,
          message: error.response?.data?.message || 'An error occurred during signup',
          details: error.response?.data?.details,
        } as ApiError;
      }
      throw {
        status: 500,
        message: 'An unexpected error occurred',
      } as ApiError;
    }
  },

  logout: async (): Promise<void> => {
    try {
      await api.post(API_CONFIG.endpoints.logout);
    } catch (error) {
      console.error('Logout failed:', error);
      // Still clear local state even if server logout fails
      throw error;
    }
  },
};