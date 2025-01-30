import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/auth.store'

interface GuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: GuardProps) {
  const navigate = useNavigate()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}

// Export ProtectedRoute component for use in routes
export function ProtectedRoute({ children }: GuardProps) {
  return <AuthGuard>{children}</AuthGuard>
} 