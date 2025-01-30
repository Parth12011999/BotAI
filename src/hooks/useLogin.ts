import { useMutation } from '@tanstack/react-query'
import { authService } from '@/services/auth'
import { LoginRequest, ApiError } from '@/types/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useAuthStore } from '@/store/auth.store'

export const useLogin = () => {
  const navigate = useNavigate()
  const setUser = useAuthStore((state) => state.setUser)

  return useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: (response) => {
      if (response.success) {
        const { data } = response;
        setUser({
          id: data.user_id,
          username: data.user_name,
          email: data.user_email,
          sessionId: data.session_id,
        });
        toast.success('Welcome back!', {
          description: data.response || 'You have successfully logged in.',
        });
        navigate('/dashboard');
      } else {
        toast.error('Login failed', {
          description: response.message || 'Invalid credentials',
        });
      }
    },
    onError: (error: ApiError) => {
      toast.error('Login failed', {
        description: error.message || 'Invalid credentials',
      });
    },
  });
}; 