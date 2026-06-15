import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { RotateCcw, Calendar, Clock, Package } from 'lucide-react'
import { useCustomer } from '../../../contexts/AuthContext'
import { useOrders } from '../../../lib/orders'
import type { OrderWithItems } from '../../../lib/orders'

const statusColors: Record<string, string> = {
  pending: 'bg-afri-gold-100 text-afri-gold-700 dark:bg-afri-gold-900/30 dark:text-afri-gold-400',
  confirmed: 'bg-afri-gold-100 text-afri-gold-700 dark:bg-afri-gold-900/30 dark:text-afri-gold-400',
  in_preparation: 'bg-afri-brown-100 text-afri-brown-700 dark:bg-afri-brown-700/50 dark:text-afri-brown-300',
  ready_for_pickup: 'bg-afri-terracotta-100 text-afri-terracotta-700 dark:bg-afri-terracotta-900/30 dark:text-afri-terracotta-400',
  completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
}

const statusLabels: Record<string, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  in_preparation: 'In Preparation',
  ready_for_pickup: 'Ready for Pickup',
  completed: 'Completed',
  cancelled: 'Cancelled'
}

export default function OrderHistoryPage() {
  const { user } = useCustomer()
  const { orders, isLoading, fetchOrders } = useOrders()

  useEffect(() => {
    if (user) {
      fetchOrders(user.id)
    }
  }, [user])

  const upcomingStatuses = ['pending', 'confirmed', 'in_preparation', 'ready_for_pickup']
  const upcomingOrders = orders.filter(o => upcomingStatuses.includes(o.status))
  const pastOrders = orders.filter(o => !upcomingStatuses.includes(o.status))

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-afri-earth-700 rounded-xl p-6">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-afri-terracotta-500"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Upcoming Orders */}
      <div className="bg-white dark:bg-afri-earth-700 rounded-xl p-6">
        <h2 className="font-display text-xl font-bold text-afri-brown-700 dark:text-afri-cream-200 mb-6">
          Upcoming Orders
        </h2>

        {upcomingOrders.length === 0 ? (
          <div className="text-center py-8">
            <Package className="w-12 h-12 text-afri-earth-400 mx-auto mb-4" />
            <p className="text-afri-earth-600 dark:text-afri-cream-400 mb-4">
              No upcoming orders.
            </p>
            <Link to="/shop" className="btn-primary">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingOrders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>

      {/* Past Orders */}
      {pastOrders.length > 0 && (
        <div className="bg-white dark:bg-afri-earth-700 rounded-xl p-6">
          <h2 className="font-display text-xl font-bold text-afri-brown-700 dark:text-afri-cream-200 mb-6">
            Order History
          </h2>

          <div className="space-y-4">
            {pastOrders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function OrderCard({ order }: { order: OrderWithItems }) {
  return (
    <div className="border border-afri-earth-200 dark:border-afri-earth-600 rounded-lg p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <p className="font-medium text-afri-brown-700 dark:text-afri-cream-200">
            Order #{order.order_number}
          </p>
          <div className="flex items-center gap-4 text-sm text-afri-earth-600 dark:text-afri-cream-400 mt-1">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {order.pickup_date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {order.pickup_time}
            </span>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status]}`}>
          {statusLabels[order.status]}
        </span>
      </div>

      <div className="border-t border-afri-earth-200 dark:border-afri-earth-600 pt-4">
        <div className="space-y-2 mb-4">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between text-sm">
              <span className="text-afri-earth-600 dark:text-afri-cream-400">
                {item.quantity}x {item.product_name}
              </span>
              <span className="text-afri-brown-700 dark:text-afri-cream-200">
                ${(item.quantity * item.price).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <p className="font-semibold text-afri-brown-700 dark:text-afri-cream-200">
            Total: ${Number(order.total).toFixed(2)}
          </p>
          <div className="flex gap-2">
            {order.status === 'completed' && (
              <Link to="/shop" className="btn-outline text-sm py-2">
                <RotateCcw className="w-4 h-4 mr-1" />
                Order Again
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
