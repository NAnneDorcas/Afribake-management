import { useState } from 'react'
import { Repeat } from 'lucide-react'

export default function RecurringOrdersPage() {
  const [orders] = useState([
    {
      id: '1',
      frequency: 'weekly',
      dayOfWeek: 5,
      pickupTime: '09:00',
      items: [
        { productId: '1', productName: 'Puff Puff', quantity: 4 },
        { productId: '3', productName: 'Meat Pie', quantity: 2 }
      ],
      isActive: true
    }
  ])

  return (
    <div className="bg-white dark:bg-afri-earth-700 rounded-xl p-6">
      <h2 className="font-display text-xl font-bold text-afri-brown-700 dark:text-afri-cream-200 mb-6">
        Recurring Orders
      </h2>

      {orders.length === 0 ? (
        <div className="text-center py-8">
          <Repeat className="w-12 h-12 text-afri-earth-400 mx-auto mb-4" />
          <p className="text-afri-earth-600 dark:text-afri-cream-400 mb-4">
            No recurring orders set up yet.
          </p>
          <button className="btn-primary">
            Set Up Recurring Order
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="border border-afri-earth-200 dark:border-afri-earth-600 rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-medium text-afri-brown-700 dark:text-afri-cream-200">
                    Every Saturday
                  </p>
                  <p className="text-sm text-afri-earth-500 dark:text-afri-cream-400">
                    Pickup at {order.pickupTime}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  order.isActive
                    ? 'bg-afri-gold-100 text-afri-gold-700'
                    : 'bg-afri-earth-100 text-afri-earth-600'
                }`}>
                  {order.isActive ? 'Active' : 'Paused'}
                </span>
              </div>
              <div className="border-t border-afri-earth-200 dark:border-afri-earth-600 pt-4">
                <p className="text-sm font-medium text-afri-brown-700 dark:text-afri-cream-200 mb-2">Items:</p>
                {order.items.map(item => (
                  <p key={item.productId} className="text-sm text-afri-earth-600 dark:text-afri-cream-400">
                    {item.quantity}x {item.productName}
                  </p>
                ))}
              </div>
              <div className="flex gap-2 mt-4">
                <button className="btn-outline text-sm py-2">Edit</button>
                <button className="btn-outline text-sm py-2">
                  {order.isActive ? 'Pause' : 'Resume'}
                </button>
              </div>
            </div>
          ))}
          <button className="btn-primary w-full">
            Add New Recurring Order
          </button>
        </div>
      )}
    </div>
  )
}
