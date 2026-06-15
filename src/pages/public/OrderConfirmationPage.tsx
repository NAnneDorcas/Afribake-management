import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { CheckCircle, Calendar, Clock, MapPin } from 'lucide-react'

export default function OrderConfirmationPage() {
  const location = useLocation()
  const navigate = useNavigate()

  const { orderNumber, pickupDate, pickupTime, total } = (location.state as any) || {}

  useEffect(() => {
    if (!orderNumber) {
      navigate('/')
    }
  }, [orderNumber, navigate])

  if (!orderNumber) return null

  return (
    <div className="min-h-screen bg-afri-cream-100 dark:bg-afri-earth-800 flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full">
        <div className="bg-white dark:bg-afri-earth-700 rounded-2xl p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>

          <h1 className="font-display text-2xl font-bold text-afri-brown-700 dark:text-afri-cream-200 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-gray-600 dark:text-afri-cream-400 mb-6">
            Thank you for your order. We've received your request.
          </p>

          {/* Order Details */}
          <div className="bg-afri-cream-100 dark:bg-afri-earth-800 rounded-xl p-6 mb-6">
            <p className="text-sm text-gray-500 dark:text-afri-cream-400 mb-1">Order Number</p>
            <p className="text-2xl font-bold text-afri-terracotta-500 mb-4">{orderNumber}</p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 justify-center">
                <Calendar className="w-5 h-5 text-afri-gold-500" />
                <span className="text-gray-700 dark:text-afri-cream-300">{pickupDate}</span>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <Clock className="w-5 h-5 text-afri-gold-500" />
                <span className="text-gray-700 dark:text-afri-cream-300">Pickup at {pickupTime}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-afri-cream-200 dark:border-afri-earth-700">
              <p className="text-sm text-gray-500 dark:text-afri-cream-400">Total</p>
              <p className="text-xl font-bold text-afri-brown-700 dark:text-afri-cream-200">
                ${total.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Pickup Info */}
          <div className="bg-afri-gold-50 dark:bg-afri-gold-900/20 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3 justify-center mb-2">
              <MapPin className="w-5 h-5 text-afri-gold-600" />
              <span className="font-medium text-afri-brown-700 dark:text-afri-cream-200">
                Pickup Location
              </span>
            </div>
            <p className="text-sm text-gray-700 dark:text-afri-cream-300">
              AfriBake Bakery
              <br />
              123 Bakery Lane, African Quarter
            </p>
          </div>

          {/* Contact */}
          <p className="text-sm text-gray-600 dark:text-afri-cream-400 mb-6">
            Questions? Contact us at{' '}
            <a href="tel:+15551234567" className="text-afri-terracotta-500 hover:underline">
              +1 (555) 123-4567
            </a>
          </p>

          <Link to="/" className="btn-primary">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  )
}
