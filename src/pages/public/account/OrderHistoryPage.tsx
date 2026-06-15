import { Link } from 'react-router-dom'
import { RotateCcw, Calendar, Clock } from 'lucide-react'

const mockOrders = [
  {
    id: '1',
    orderNumber: 'AFB-1001',
    status: 'ready_for_pickup',
    total: 19.00,
    pickupDate: '2024-06-15',
    pickupTime: '09:00',
    items: [
      { productId: '1', productName: 'Puff Puff', quantity: 4, price: 2.50 },
      { productId: '3', productName: 'Meat Pie', quantity: 2, price: 4.50 }
    ]
  },
  {
    id: '2',
    orderNumber: 'AFB-0998',
    status: 'completed',
    total: 15.00,
    pickupDate: '2024-06-10',
    pickupTime: '11:00',
    items: [
      { productId: '6', productName: 'Coconut Bread', quantity: 1, price: 6.00 },
      { productId: '2', productName: 'Chin Chin', quantity: 3, price: 3.00 }
    ]
  }
]

const statusColors: Record<string, string> = {
  pending: 'bg-afri-gold-100 text-afri-gold-700',
  confirmed: 'bg-afri-gold-100 text-afri-gold-700',
  in_preparation: 'bg-afri-brown-100 text-afri-brown-700',
  ready_for_pickup: 'bg-afri-terracotta-100 text-afri-terracotta-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700'
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
  const upcomingOrders = mockOrders.filter(o => ['pending', 'confirmed', 'in_preparation', 'ready_for_pickup'].includes(o.status))
  const pastOrders = mockOrders.filter(o => ['completed', 'cancelled'].includes(o.status))

  return (
    <div className="space-y-6">
      {/* Upcoming Orders */}
      <div className="bg-white dark:bg-afri-earth-700 rounded-xl p-6">
        <h2 className="font-display text-xl font-bold text-afri-brown-700 dark:text-afri-cream-200 mb-6">
          Upcoming Orders
        </h2>

        {upcomingOrders.length === 0 ? (
          <p className="text-afri-earth-600 dark:text-afri-cream-400 text-center py-8">
            No upcoming orders.
          </p>
        ) : (
          <div className="space-y-4">
            {upcomingOrders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>

      {/* Past Orders */}
      <div className="bg-white dark:bg-afri-earth-700 rounded-xl p-6">
        <h2 className="font-display text-xl font-bold text-afri-brown-700 dark:text-afri-cream-200 mb-6">
          Order History
        </h2>

        {pastOrders.length === 0 ? (
          <p className="text-afri-earth-600 dark:text-afri-cream-400 text-center py-8">
            No past orders.
          </p>
        ) : (
          <div className="space-y-4">
            {pastOrders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function OrderCard({ order }: { order: typeof mockOrders[0] }) {
  return (
    <div className="border border-afri-earth-200 dark:border-afri-earth-600 rounded-lg p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <p className="font-medium text-afri-brown-700 dark:text-afri-cream-200">
            Order #{order.orderNumber}
          </p>
          <div className="flex items-center gap-4 text-sm text-afri-earth-600 dark:text-afri-cream-400 mt-1">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {order.pickupDate}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {order.pickupTime}
            </span>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status]}`}>
          {statusLabels[order.status]}
        </span>
      </div>

      <div className="border-t border-afri-earth-200 dark:border-afri-earth-600 pt-4">
        <div className="space-y-2 mb-4">
          {order.items.map(item => (
            <div key={item.productId} className="flex justify-between text-sm">
              <span className="text-afri-earth-600 dark:text-afri-cream-400">
                {item.quantity}x {item.productName}
              </span>
              <span className="text-afri-brown-700 dark:text-afri-cream-200">
                ${(item.quantity * item.price).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <p className="font-semibold text-afri-brown-700 dark:text-afri-cream-200">
            Total: ${order.total.toFixed(2)}
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
