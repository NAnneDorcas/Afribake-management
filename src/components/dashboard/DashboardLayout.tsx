import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import {
  Home, ChefHat, BookOpen, Package, CheckSquare, Box,
  ShoppingCart, BarChart3, Users, FileText, Settings,
  LogOut, Menu, X, Sun, Moon, ChevronDown
} from 'lucide-react'
import { useWorker } from '../../contexts/WorkerContext'
import { useTheme } from '../../contexts/ThemeContext'

const navItems = [
  { to: '/dashboard', icon: Home, label: 'Dashboard', end: true },
  { to: '/dashboard/prep', icon: ChefHat, label: 'Prep' },
  { to: '/dashboard/recipes', icon: BookOpen, label: 'Recipes' },
  { to: '/dashboard/inventory', icon: Package, label: 'Inventory' },
  { to: '/dashboard/finish', icon: CheckSquare, label: 'Finish' },
  { to: '/dashboard/pack', icon: Box, label: 'Pack' },
  { to: '/dashboard/sales', icon: ShoppingCart, label: 'Sales' },
  { to: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/dashboard/workers', icon: Users, label: 'Workers', ownerOnly: true },
  { to: '/dashboard/activity-logs', icon: FileText, label: 'Activity Logs' },
  { to: '/dashboard/settings', icon: Settings, label: 'Settings' },
]

export default function DashboardLayout() {
  const navigate = useNavigate()
  const { currentWorker, logout } = useWorker()
  const { theme, toggleTheme } = useTheme()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/staff')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-afri-earth-900">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white dark:bg-afri-earth-800 border-b border-gray-200 dark:border-afri-earth-700">
        <div className="flex items-center justify-between px-4 h-16">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-afri-earth-700"
          >
            <Menu className="w-6 h-6 text-gray-600 dark:text-afri-cream-300" />
          </button>
          <div className="flex items-center">
            <span className="font-display text-xl font-bold text-afri-brown-700 dark:text-afri-cream-200">
              AfriBake
            </span>
          </div>
          <div className="w-10" />
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/50"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-afri-earth-800 border-r border-gray-200 dark:border-afri-earth-700 transform transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-afri-earth-700">
          <span className="font-display text-xl font-bold text-afri-brown-700 dark:text-afri-cream-200">
            AfriBake
          </span>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-afri-earth-700"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-afri-cream-300" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-8rem)]">
          {navItems.map(item => {
            if (item.ownerOnly && currentWorker?.role !== 'owner') return null

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-afri-terracotta-50 dark:bg-afri-terracotta-900/20 text-afri-terracotta-600 dark:text-afri-terracotta-400'
                      : 'text-gray-600 dark:text-afri-cream-400 hover:bg-gray-100 dark:hover:bg-afri-earth-700'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            )
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-afri-earth-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-gray-600 dark:text-afri-cream-400 hover:bg-gray-100 dark:hover:bg-afri-earth-700 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Desktop Header */}
        <header className="hidden lg:flex items-center justify-between h-16 px-6 bg-white dark:bg-afri-earth-800 border-b border-gray-200 dark:border-afri-earth-700">
          <h1 className="font-semibold text-gray-800 dark:text-afri-cream-200">
            Staff Dashboard
          </h1>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-afri-earth-700"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-600" />
              ) : (
                <Sun className="w-5 h-5 text-afri-gold-400" />
              )}
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-afri-earth-700"
              >
                <div className="w-8 h-8 rounded-full bg-afri-terracotta-100 dark:bg-afri-terracotta-900/30 flex items-center justify-center">
                  <span className="text-sm font-medium text-afri-terracotta-600 dark:text-afri-terracotta-400">
                    {currentWorker?.name?.charAt(0)}
                  </span>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-800 dark:text-afri-cream-200">
                    {currentWorker?.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-afri-cream-400 capitalize">
                    {currentWorker?.role}
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {isProfileOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsProfileOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-afri-earth-700 rounded-lg shadow-lg border border-gray-200 dark:border-afri-earth-600 z-20">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-4 py-3 text-sm text-gray-700 dark:text-afri-cream-300 hover:bg-gray-50 dark:hover:bg-afri-earth-600"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6 pt-20 lg:pt-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
