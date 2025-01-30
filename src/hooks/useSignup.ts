import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/auth';
import { SignupRequest, ApiError } from '@/types/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useSignup = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: SignupRequest) => authService.signup(data),
    onSuccess: () => {
      toast.success('Account created successfully', {
        description: 'You can now login with your credentials',
      });
      navigate('/login');
    },
    onError: (error: ApiError) => {
      toast.error('Error creating account', {
        description: error.message || 'Something went wrong',
      });
    },
  });
}; 