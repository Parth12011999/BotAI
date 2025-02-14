import axios, { InternalAxiosRequestConfig } from 'axios'

// Create base API configuration
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL,
  endpoints: {
    signup: '/user/signup',
    login: '/user/login',
    logout: '/user/logout',
    chat: '/chat/question_answer',
    chatHistory: '/chat/get_chat_history',
  }
} as const;

// Create axios instance
export const api = axios.create({
  baseURL: API_CONFIG.baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('auth-storage')
    if (token) {
      const parsedToken = JSON.parse(token)
      if (parsedToken?.state?.user?.token) {
        config.headers.Authorization = `Bearer ${parsedToken.state.user.token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth storage and redirect to login
      localStorage.removeItem('auth-storage')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
) 