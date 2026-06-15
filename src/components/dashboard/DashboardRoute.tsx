import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useWorker } from '../../contexts/WorkerContext'

interface DashboardRouteProps {
  children: ReactNode
}

export default function DashboardRoute({ children }: DashboardRouteProps) {
  const { isAuthenticated } = useWorker()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/staff" state={{ from: location }} replace />
  }

  return <>{children}</>
}
