import { createContext, useContext, useState, ReactNode } from 'react'
import { workers } from '../data/products'

interface Worker {
  id: string
  name: string
  role: 'owner' | 'worker'
}

interface WorkerContextType {
  currentWorker: Worker | null
  isAuthenticated: boolean
  selectedProfile: Worker | null
  selectProfile: (worker: Worker) => void
  login: (pin: string) => boolean
  logout: () => void
  error: string | null
}

const WorkerContext = createContext<WorkerContextType | undefined>(undefined)

export function WorkerProvider({ children }: { children: ReactNode }) {
  const [currentWorker, setCurrentWorker] = useState<Worker | null>(() => {
    const saved = localStorage.getItem('afribake-worker')
    return saved ? JSON.parse(saved) : null
  })
  const [selectedProfile, setSelectedProfile] = useState<Worker | null>(null)
  const [error, setError] = useState<string | null>(null)

  const selectProfile = (worker: Worker) => {
    setSelectedProfile(worker)
    setError(null)
  }

  const login = (pin: string): boolean => {
    if (!selectedProfile) {
      setError('Please select a profile')
      return false
    }

    const worker = workers.find(w => w.id === selectedProfile.id)
    if (!worker || worker.pin !== pin) {
      setError('Invalid PIN. Please try again.')
      return false
    }

    const workerData: Worker = {
      id: worker.id,
      name: worker.name,
      role: worker.role
    }
    setCurrentWorker(workerData)
    localStorage.setItem('afribake-worker', JSON.stringify(workerData))
    setError(null)
    return true
  }

  const logout = () => {
    setCurrentWorker(null)
    setSelectedProfile(null)
    localStorage.removeItem('afribake-worker')
  }

  return (
    <WorkerContext.Provider
      value={{
        currentWorker,
        isAuthenticated: !!currentWorker,
        selectedProfile,
        selectProfile,
        login,
        logout,
        error
      }}
    >
      {children}
    </WorkerContext.Provider>
  )
}

export function useWorker() {
  const context = useContext(WorkerContext)
  if (!context) {
    throw new Error('useWorker must be used within a WorkerProvider')
  }
  return context
}
