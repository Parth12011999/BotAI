import { createApiService, handleApiError } from '@/lib/axios';
import { 
  SignupRequest, 
  SignupResponse, 
  LoginRequest, 
  LoginResponse, 
  LogoutRequest,
  LogoutResponse,
} from '@/types/auth';

export const authService = createApiService<SignupRequest | LoginRequest | LogoutRequest>('/user');

export const auth = {
  signup: async (data: SignupRequest) => {
    try {
      return await authService.post<SignupResponse>('/signup', data);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  login: async (data: LoginRequest) => {
    try {
      return await authService.post<LoginResponse>('/login', data);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  logout: async (data: LogoutRequest) => {
    try {
      return await authService.post<LogoutResponse>('/logout', data);
    } catch (error) {
      throw handleApiError(error);
    }
  },
};