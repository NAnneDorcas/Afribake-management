import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ShoppingCart, Sun, Moon, User } from 'lucide-react'
import { useCart } from '../../contexts/CartContext'
import { useTheme } from '../../contexts/ThemeContext'
import { useCustomer } from '../../contexts/AuthContext'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { itemCount } = useCart()
  const { theme, toggleTheme } = useTheme()
  const { customer, isAuthenticated } = useCustomer()
  const location = useLocation()

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' }
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-afri-earth-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-display text-2xl md:text-3xl font-bold text-afri-brown-700 dark:text-afri-cream-200">
              AfriBake
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(link.to)
                    ? 'text-afri-terracotta-500'
                    : 'text-afri-earth-600 hover:text-afri-terracotta-500 dark:text-afri-cream-300 dark:hover:text-afri-terracotta-400'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-afri-cream-200 dark:hover:bg-afri-earth-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-afri-earth-600" />
              ) : (
                <Sun className="w-5 h-5 text-afri-gold-400" />
              )}
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 rounded-lg hover:bg-afri-cream-200 dark:hover:bg-afri-earth-700 transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-afri-earth-700 dark:text-afri-cream-300" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-afri-terracotta-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Auth */}
            {isAuthenticated ? (
              <Link
                to="/account"
                className="hidden sm:flex items-center space-x-2 p-2 rounded-lg hover:bg-afri-cream-200 dark:hover:bg-afri-earth-700 transition-colors"
              >
                <User className="w-5 h-5 text-afri-earth-700 dark:text-afri-cream-300" />
                <span className="text-sm font-medium text-afri-earth-700 dark:text-afri-cream-300">
                  {customer?.name?.split(' ')[0] || 'Account'}
                </span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="hidden sm:inline-flex btn-primary text-sm py-2 px-4"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-afri-cream-200 dark:hover:bg-afri-earth-700 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-afri-earth-700 dark:text-afri-cream-300" />
              ) : (
                <Menu className="w-6 h-6 text-afri-earth-700 dark:text-afri-cream-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-afri-cream-200 dark:border-afri-earth-700">
            <nav className="flex flex-col space-y-3">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg ${
                    isActive(link.to)
                      ? 'bg-afri-terracotta-50 text-afri-terracotta-600 dark:bg-afri-earth-700 dark:text-afri-terracotta-400'
                      : 'text-afri-earth-600 hover:bg-afri-cream-200 dark:text-afri-cream-300 dark:hover:bg-afri-earth-700'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {isAuthenticated ? (
                <Link
                  to="/account"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-2 text-sm font-medium rounded-lg text-afri-earth-600 hover:bg-afri-cream-200 dark:text-afri-cream-300 dark:hover:bg-afri-earth-700"
                >
                  My Account
                </Link>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-2 text-sm font-medium rounded-lg text-afri-earth-600 hover:bg-afri-cream-200 dark:text-afri-cream-300 dark:hover:bg-afri-earth-700"
                >
                  Login / Register
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
