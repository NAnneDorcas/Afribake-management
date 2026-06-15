import { useEffect } from 'react'
import { Repeat, Plus, Edit, Trash2 } from 'lucide-react'
import { useCustomer } from '../../../contexts/AuthContext'
import { useRecurringOrders } from '../../../lib/orders'
import { supabase } from '../../../lib/supabase'

interface RecurringOrder {
  id: string
  frequency: 'weekly' | 'monthly'
  day_of_week: number | null
  day_of_month: number | null
  pickup_time: string
  is_active: boolean
  recurring_order_items: {
    product_id: string
    product_name: string
    quantity: number
  }[]
}

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default function RecurringOrdersPage() {
  const { user } = useCustomer()
  const { recurringOrders, isLoading, fetchRecurringOrders } = useRecurringOrders()

  useEffect(() => {
    if (user) {
      fetchRecurringOrders(user.id)
    }
  }, [user])

  const handleToggleActive = async (orderId: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('recurring_orders')
        .update({ is_active: !isActive })
        .eq('id', orderId)

      if (error) throw error
      if (user) {
        fetchRecurringOrders(user.id)
      }
    } catch (err) {
      console.error('Error toggling recurring order:', err)
    }
  }

  const handleDelete = async (orderId: string) => {
    if (!confirm('Are you sure you want to delete this recurring order?')) return

    try {
      const { error } = await supabase
        .from('recurring_orders')
        .delete()
        .eq('id', orderId)

      if (error) throw error
      if (user) {
        fetchRecurringOrders(user.id)
      }
    } catch (err) {
      console.error('Error deleting recurring order:', err)
    }
  }

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
    <div className="bg-white dark:bg-afri-earth-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl font-bold text-afri-brown-700 dark:text-afri-cream-200">
          Recurring Orders
        </h2>
        <button className="btn-primary text-sm py-2">
          <Plus className="w-4 h-4 mr-1" />
          Add New
        </button>
      </div>

      {recurringOrders.length === 0 ? (
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
          {recurringOrders.map((order: RecurringOrder) => (
            <div
              key={order.id}
              className="border border-afri-earth-200 dark:border-afri-earth-600 rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-medium text-afri-brown-700 dark:text-afri-cream-200">
                    {order.frequency === 'weekly'
                      ? `Every ${dayNames[order.day_of_week || 0]}`
                      : `${getOrdinal(order.day_of_month || 1)} of every month`}
                  </p>
                  <p className="text-sm text-afri-earth-500 dark:text-afri-cream-400">
                    Pickup at {order.pickup_time}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  order.is_active
                    ? 'bg-afri-gold-100 text-afri-gold-700'
                    : 'bg-afri-earth-100 text-afri-earth-600 dark:bg-afri-earth-600 dark:text-afri-cream-400'
                }`}>
                  {order.is_active ? 'Active' : 'Paused'}
                </span>
              </div>

              <div className="border-t border-afri-earth-200 dark:border-afri-earth-600 pt-4">
                <p className="text-sm font-medium text-afri-brown-700 dark:text-afri-cream-200 mb-2">
                  Items:
                </p>
                {order.recurring_order_items.map((item, idx) => (
                  <p key={idx} className="text-sm text-afri-earth-600 dark:text-afri-cream-400">
                    {item.quantity}x {item.product_name}
                  </p>
                ))}
              </div>

              <div className="flex gap-2 mt-4">
                <button className="btn-outline text-sm py-2">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => handleToggleActive(order.id, order.is_active)}
                  className="btn-outline text-sm py-2"
                >
                  {order.is_active ? 'Pause' : 'Resume'}
                </button>
                <button
                  onClick={() => handleDelete(order.id)}
                  className="btn-outline text-sm py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function getOrdinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}
