import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, User, AlertCircle, CheckCircle } from 'lucide-react'
import { useCustomer } from '../../contexts/AuthContext'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register } = useCustomer()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setIsLoading(true)

    try {
      await register(formData.email, formData.password, formData.name)
      setSuccess(true)
      setTimeout(() => {
        navigate('/account')
      }, 2000)
    } catch (err: any) {
      console.error('Registration error:', err)
      if (err.message?.includes('already registered')) {
        setError('An account with this email already exists.')
      } else if (err.message?.includes('invalid email')) {
        setError('Please enter a valid email address.')
      } else if (err.message?.includes('password')) {
        setError('Password is too weak. Please use at least 6 characters.')
      } else {
        setError(err.message || 'Unable to create account. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-afri-cream-100 dark:bg-afri-earth-800 px-4">
        <div className="max-w-md w-full">
          <div className="bg-white dark:bg-afri-earth-700 rounded-xl p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="font-display text-2xl font-bold text-afri-brown-700 dark:text-afri-cream-200 mb-2">
              Account Created!
            </h2>
            <p className="text-afri-earth-600 dark:text-afri-cream-400 mb-4">
              Welcome to AfriBake. Redirecting you to your account...
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-afri-cream-100 dark:bg-afri-earth-800 px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="font-display text-3xl font-bold text-afri-brown-700 dark:text-afri-cream-200">
            AfriBake
          </Link>
          <h1 className="font-display text-2xl font-bold text-afri-brown-700 dark:text-afri-cream-200 mt-6">
            Create Account
          </h1>
          <p className="text-afri-earth-600 dark:text-afri-cream-400 mt-2">
            Join AfriBake for a personalized experience.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-afri-earth-700 rounded-xl p-6 space-y-6">
          {error && (
            <div className="flex items-center gap-3 bg-afri-terracotta-50 dark:bg-afri-terracotta-900/20 border border-afri-terracotta-200 dark:border-afri-terracotta-700 rounded-lg p-3 text-sm text-afri-terracotta-600 dark:text-afri-terracotta-400">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              {error}
            </div>
          )}

          {/* Name */}
          <div>
            <label className="label" htmlFor="name">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-afri-earth-400" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="input pl-10"
                placeholder="John Doe"
                required
                autoComplete="name"
              />
            </div>
          </div>

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
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input pl-10"
                placeholder="you@example.com"
                required
                autoComplete="email"
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
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="input pl-10 pr-10"
                placeholder="Min. 6 characters"
                required
                autoComplete="new-password"
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

          {/* Confirm Password */}
          <div>
            <label className="label" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-afri-earth-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="input pl-10"
                placeholder="Confirm password"
                required
                autoComplete="new-password"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>

          {/* Login Link */}
          <p className="text-center text-afri-earth-600 dark:text-afri-cream-400">
            Already have an account?{' '}
            <Link to="/login" className="text-afri-terracotta-500 hover:text-afri-terracotta-600 font-medium">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
