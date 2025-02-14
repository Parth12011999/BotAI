import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/store/auth.store";

// Create axios instance with default config
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const state = useAuthStore.getState();
    const token = state.user?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // Handle 401 Unauthorized responses
    if (error.response?.status === 401) {
      // Clear auth state and redirect to login
      useAuthStore.getState().logout();
      localStorage.removeItem("auth-storage");
      window.location.href = "/login";
      return Promise.reject(error);
    }

    // Handle 403 Forbidden responses
    if (error.response?.status === 403) {
      // Handle forbidden access
      return Promise.reject(
        new Error("You do not have permission to access this resource")
      );
    }

    // Handle network errors
    if (!error.response) {
      return Promise.reject(
        new Error("Network error. Please check your connection")
      );
    }

    return Promise.reject(error);
  }
);

// API error handler helper
export const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    // Handle Axios errors
    const message = error.response?.data?.message || error.message;
    const status = error.response?.status;
    const details = error.response?.data?.details;

    return {
      message,
      status,
      details,
    };
  }

  // Handle other errors
  if (error instanceof Error) {
    return {
      message: error.message,
      status: 500,
    };
  }

  return {
    message: "An unexpected error occurred",
    status: 500,
  };
};

// Type for API responses
export interface ApiResponse<T> {
  success: boolean;
  message: string | null;
  data: T;
}

// API service creator helper
export const createApiService = <T extends Record<string, any>>(
  baseUrl: string
) => {
  return {
    get: async <R>(url: string) => {
      const response = await axiosInstance.get<ApiResponse<R>>(
        `${baseUrl}${url}`
      );
      return response.data;
    },
    post: async <R>(url: string, data: T) => {
      const response = await axiosInstance.post<ApiResponse<R>>(
        `${baseUrl}${url}`,
        data
      );
      return response.data;
    },
    put: async <R>(url: string, data: Partial<T>) => {
      const response = await axiosInstance.put<ApiResponse<R>>(
        `${baseUrl}${url}`,
        data
      );
      return response.data;
    },
    delete: async <R>(url: string, data: Partial<T>) => {
      const response = await axiosInstance.delete<ApiResponse<R>>(
        `${baseUrl}${url}`,
        { data }
      );
      return response.data;
    },
  };
};
