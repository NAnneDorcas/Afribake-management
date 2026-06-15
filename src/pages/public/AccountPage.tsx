import { Routes, Route, NavLink } from 'react-router-dom'
import { User, Package, Heart, Repeat, LogOut } from 'lucide-react'
import { useCustomer } from '../../contexts/AuthContext'
import ProfilePage from './account/ProfilePage'
import OrderHistoryPage from './account/OrderHistoryPage'
import FavoritesPage from './account/FavoritesPage'
import RecurringOrdersPage from './account/RecurringOrdersPage'

const navItems = [
  { to: '/account', icon: User, label: 'Profile', end: true },
  { to: '/account/orders', icon: Package, label: 'Order History' },
  { to: '/account/favorites', icon: Heart, label: 'Favorites' },
  { to: '/account/recurring', icon: Repeat, label: 'Recurring Orders' }
]

export default function AccountPage() {
  const { customer, logout } = useCustomer()

  return (
    <div className="min-h-screen bg-afri-cream-100 dark:bg-afri-earth-800">
      {/* Header */}
      <div className="bg-afri-brown-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-afri-cream-100">
            My Account
          </h1>
          <p className="mt-2 text-afri-cream-300">
            {customer?.email || 'Manage your account'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="bg-white dark:bg-afri-earth-700 rounded-xl p-2 space-y-1">
              {navItems.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-afri-terracotta-50 dark:bg-afri-terracotta-900/20 text-afri-terracotta-600 dark:text-afri-terracotta-400'
                        : 'text-afri-earth-600 dark:text-afri-cream-400 hover:bg-afri-cream-200 dark:hover:bg-afri-earth-600'
                    }`
                  }
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              ))}
              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-afri-earth-600 dark:text-afri-cream-400 hover:bg-afri-cream-200 dark:hover:bg-afri-earth-600 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <Routes>
              <Route index element={<ProfilePage />} />
              <Route path="orders" element={<OrderHistoryPage />} />
              <Route path="favorites" element={<FavoritesPage />} />
              <Route path="recurring" element={<RecurringOrdersPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}
