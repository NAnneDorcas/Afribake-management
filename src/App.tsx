import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './contexts/CartContext'
import { CustomerProvider } from './contexts/AuthContext'
import { WorkerProvider } from './contexts/WorkerContext'
import { ThemeProvider } from './contexts/ThemeContext'

// Public Pages
import Layout from './components/public/Layout'
import HomePage from './pages/public/HomePage'
import ShopPage from './pages/public/ShopPage'
import ProductPage from './pages/public/ProductPage'
import CartPage from './pages/public/CartPage'
import CheckoutPage from './pages/public/CheckoutPage'
import LoginPage from './pages/public/LoginPage'
import RegisterPage from './pages/public/RegisterPage'
import AccountPage from './pages/public/AccountPage'
import AboutPage from './pages/public/AboutPage'
import ContactPage from './pages/public/ContactPage'
import OrderConfirmationPage from './pages/public/OrderConfirmationPage'

// Dashboard Pages
import DashboardLayout from './components/dashboard/DashboardLayout'
import StaffLoginPage from './pages/dashboard/StaffLoginPage'
import DashboardHome from './pages/dashboard/DashboardHome'
import PrepPage from './pages/dashboard/PrepPage'
import RecipesPage from './pages/dashboard/RecipesPage'
import InventoryPage from './pages/dashboard/InventoryPage'
import FinishPage from './pages/dashboard/FinishPage'
import PackPage from './pages/dashboard/PackPage'
import SalesPage from './pages/dashboard/SalesPage'
import AnalyticsPage from './pages/dashboard/AnalyticsPage'
import WorkersPage from './pages/dashboard/WorkersPage'
import ActivityLogsPage from './pages/dashboard/ActivityLogsPage'
import SettingsPage from './pages/dashboard/SettingsPage'

// Protected Routes
import ProtectedRoute from './components/shared/ProtectedRoute'
import DashboardRoute from './components/dashboard/DashboardRoute'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <CartProvider>
          <CustomerProvider>
            <WorkerProvider>
              <Routes>
                {/* Public Website Routes */}
                <Route path="/" element={<Layout />}>
                  <Route index element={<HomePage />} />
                  <Route path="shop" element={<ShopPage />} />
                  <Route path="product/:slug" element={<ProductPage />} />
                  <Route path="cart" element={<CartPage />} />
                  <Route path="checkout" element={<CheckoutPage />} />
                  <Route path="login" element={<LoginPage />} />
                  <Route path="register" element={<RegisterPage />} />
                  <Route path="about" element={<AboutPage />} />
                  <Route path="contact" element={<ContactPage />} />
                  <Route path="order-confirmation" element={<OrderConfirmationPage />} />
                  <Route
                    path="account/*"
                    element={
                      <ProtectedRoute>
                        <AccountPage />
                      </ProtectedRoute>
                    }
                  />
                </Route>

                {/* Staff Dashboard Routes - Completely Separate */}
                <Route path="/staff" element={<StaffLoginPage />} />
                <Route
                  path="/dashboard"
                  element={
                    <DashboardRoute>
                      <DashboardLayout />
                    </DashboardRoute>
                  }
                >
                  <Route index element={<DashboardHome />} />
                  <Route path="prep" element={<PrepPage />} />
                  <Route path="recipes" element={<RecipesPage />} />
                  <Route path="inventory" element={<InventoryPage />} />
                  <Route path="finish" element={<FinishPage />} />
                  <Route path="pack" element={<PackPage />} />
                  <Route path="sales" element={<SalesPage />} />
                  <Route path="analytics" element={<AnalyticsPage />} />
                  <Route path="workers" element={<WorkersPage />} />
                  <Route path="activity-logs" element={<ActivityLogsPage />} />
                  <Route path="settings" element={<SettingsPage />} />
                </Route>
              </Routes>
            </WorkerProvider>
          </CustomerProvider>
        </CartProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
