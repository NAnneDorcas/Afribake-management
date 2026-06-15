import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useCustomer } from '../../contexts/AuthContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useCustomer()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const from = (location.state as any)?.from?.pathname || '/account'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await login(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      setError('Invalid email or password. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-afri-cream-100 dark:bg-afri-earth-800 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="font-display text-3xl font-bold text-afri-brown-700 dark:text-afri-cream-200">
            AfriBake
          </Link>
          <h1 className="font-display text-2xl font-bold text-afri-brown-700 dark:text-afri-cream-200 mt-6">
            Welcome Back
          </h1>
          <p className="text-afri-earth-600 dark:text-afri-cream-400 mt-2">
            Sign in to manage your orders and favorites.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-afri-earth-700 rounded-xl p-6 space-y-6">
          {error && (
            <div className="bg-afri-terracotta-50 dark:bg-afri-terracotta-900/20 border border-afri-terracotta-200 dark:border-afri-terracotta-700 rounded-lg p-3 text-sm text-afri-terracotta-600 dark:text-afri-terracotta-400">
              {error}
            </div>
          )}

          {/* Email */}
          <div>
            <label className="label" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-afri-earth-400" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="input pl-10"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="label" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-afri-earth-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="input pl-10 pr-10"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-afri-earth-400 hover:text-afri-brown-700"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-afri-terracotta-500 hover:text-afri-terracotta-600"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-afri-earth-200 dark:border-afri-earth-600"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-afri-earth-700 px-2 text-afri-earth-500">
                or
              </span>
            </div>
          </div>

          {/* Register Link */}
          <p className="text-center text-afri-earth-600 dark:text-afri-cream-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-afri-terracotta-500 hover:text-afri-terracotta-600 font-medium">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
