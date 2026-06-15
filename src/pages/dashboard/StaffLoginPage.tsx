import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from 'lucide-react'
import { useWorker } from '../../contexts/WorkerContext'
import { workers } from '../../data/products'

export default function StaffLoginPage() {
  const navigate = useNavigate()
  const { selectedProfile, selectProfile, login, error } = useWorker()
  const [pin, setPin] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handlePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const success = login(pin)
    if (success) {
      navigate('/dashboard')
    }

    setIsLoading(false)
  }

  const handlePinChange = (value: string) => {
    if (value.length <= 4 && /^\d*$/.test(value)) {
      setPin(value)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-afri-brown-900 to-afri-brown-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-afri-gold-400 mb-6">
            <span className="font-display text-2xl font-bold text-afri-brown-900">A</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-afri-cream-100 mb-2">
            AfriBake Staff
          </h1>
          <p className="text-afri-cream-400">
            Sign in to access the dashboard
          </p>
        </div>

        {!selectedProfile ? (
          // Profile Selection
          <div className="bg-afri-earth-700/50 backdrop-blur-sm rounded-2xl p-6 border border-afri-earth-600">
            <h2 className="font-semibold text-afri-cream-200 mb-4 text-center">
              Select Your Profile
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {workers.filter(w => w.is_active).map(worker => (
                <button
                  key={worker.id}
                  onClick={() => selectProfile(worker)}
                  className="p-4 bg-afri-earth-700 hover:bg-afri-earth-600 border border-afri-earth-600 rounded-xl transition-colors"
                >
                  <div className="w-16 h-16 rounded-full bg-afri-terracotta-500/20 flex items-center justify-center mx-auto mb-3">
                    <User className="w-8 h-8 text-afri-terracotta-400" />
                  </div>
                  <p className="font-medium text-afri-cream-200">{worker.name}</p>
                  <p className="text-xs text-afri-cream-400 capitalize">{worker.role}</p>
                </button>
              ))}
            </div>
            <p className="text-center text-afri-cream-500 text-sm mt-4">
              Not listed? Contact your manager.
            </p>
          </div>
        ) : (
          // PIN Entry
          <div className="bg-afri-earth-700/50 backdrop-blur-sm rounded-2xl p-6 border border-afri-earth-600">
            <button
              onClick={() => selectProfile(null as any)}
              className="text-afri-cream-400 hover:text-afri-cream-200 text-sm mb-4"
            >
              ← Back to profiles
            </button>

            <div className="text-center mb-6">
              <div className="w-20 h-20 rounded-full bg-afri-terracotta-500/20 flex items-center justify-center mx-auto mb-3">
                <User className="w-10 h-10 text-afri-terracotta-400" />
              </div>
              <p className="font-medium text-afri-cream-200">{selectedProfile.name}</p>
              <p className="text-sm text-afri-cream-400 capitalize">{selectedProfile.role}</p>
            </div>

            <form onSubmit={handlePinSubmit}>
              <label className="block text-sm text-afri-cream-400 mb-2 text-center">
                Enter your PIN
              </label>

              <div className="flex justify-center gap-2 mb-4">
                {[0, 1, 2, 3].map(i => (
                  <div
                    key={i}
                    className="w-12 h-14 rounded-lg bg-afri-earth-800 border border-afri-earth-600 flex items-center justify-center"
                  >
                    <span className="text-2xl font-semibold text-afri-cream-200">
                      {pin[i] ? '•' : ''}
                    </span>
                  </div>
                ))}
              </div>

              {error && (
                <p className="text-afri-terracotta-400 text-sm text-center mb-4">{error}</p>
              )}

              {/* Number Pad */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, 'del'].map((num, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      if (num === null) return
                      if (num === 'del') {
                        setPin(pin.slice(0, -1))
                      } else {
                        handlePinChange(pin + num.toString())
                      }
                    }}
                    className={`h-12 rounded-lg font-semibold transition-colors ${
                      num === null
                        ? 'invisible'
                        : num === 'del'
                        ? 'bg-afri-earth-700 text-afri-cream-400 hover:bg-afri-earth-600'
                        : 'bg-afri-earth-700 text-afri-cream-200 hover:bg-afri-earth-600'
                    }`}
                  >
                    {num === 'del' ? '⌫' : num}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                disabled={pin.length !== 4 || isLoading}
                className="w-full py-3 bg-afri-terracotta-500 text-white font-semibold rounded-lg hover:bg-afri-terracotta-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </div>
        )}

        {/* Public Link */}
        <p className="text-center mt-8">
          <a
            href="/"
            className="text-afri-cream-500 hover:text-afri-cream-300 text-sm"
          >
            Return to public website →
          </a>
        </p>
      </div>
    </div>
  )
}
