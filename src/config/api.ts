export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL,
  // You can add more API related configuration here
  endpoints: {
    signup: '/user/signup',
    login: '/user/login',
    // Add more endpoints as needed
  }
}; 