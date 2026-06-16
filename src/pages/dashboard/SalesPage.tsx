import { Search, Eye } from 'lucide-react'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

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

export default function SalesPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*)
        `)
        .order('created_at', { ascending: false })

      if (error) {
        console.error(error)
        return
      }

      setOrders(data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const filteredOrders = orders.filter(order => {
    if (statusFilter !== 'all' && order.status !== statusFilter) return false

    if (searchQuery) {
      const query = searchQuery.toLowerCase()

      return (
        order.customer_name?.toLowerCase().includes(query) ||
        order.order_number?.toLowerCase().includes(query)
      )
    }

    return true
  })

  const totalRevenue = filteredOrders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  )

  if (loading) {
    return (
      <div className="p-6">
        <p>Loading orders...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-afri-cream-200">
          Sales & Orders
        </h1>
        <p className="text-gray-500 dark:text-afri-cream-400">
          Customer orders and order management
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

          <input
            type="text"
            placeholder="Search by name or order number..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-afri-earth-600 rounded-lg bg-white dark:bg-afri-earth-700 text-gray-900 dark:text-afri-cream-200"
          />
        </div>

        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-200 dark:border-afri-earth-600 rounded-lg bg-white dark:bg-afri-earth-700 text-gray-900 dark:text-afri-cream-200"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="in_preparation">In Preparation</option>
          <option value="ready_for_pickup">Ready for Pickup</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-afri-earth-800 rounded-xl p-4 border border-gray-200 dark:border-afri-earth-700">
          <p className="text-sm text-gray-500 dark:text-afri-cream-400">
            Total Orders
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-afri-cream-200">
            {filteredOrders.length}
          </p>
        </div>

        <div className="bg-white dark:bg-afri-earth-800 rounded-xl p-4 border border-gray-200 dark:border-afri-earth-700">
          <p className="text-sm text-gray-500 dark:text-afri-cream-400">
            Total Revenue
          </p>
          <p className="text-2xl font-bold text-afri-gold-600">
            ${totalRevenue.toFixed(2)}
          </p>
        </div>

        <div className="bg-white dark:bg-afri-earth-800 rounded-xl p-4 border border-gray-200 dark:border-afri-earth-700">
          <p className="text-sm text-gray-500 dark:text-afri-cream-400">
            Pending
          </p>
          <p className="text-2xl font-bold text-afri-terracotta-500">
            {filteredOrders.filter(o => o.status === 'pending').length}
          </p>
        </div>

        <div className="bg-white dark:bg-afri-earth-800 rounded-xl p-4 border border-gray-200 dark:border-afri-earth-700">
          <p className="text-sm text-gray-500 dark:text-afri-cream-400">
            Ready
          </p>
          <p className="text-2xl font-bold text-green-600">
            {filteredOrders.filter(o => o.status === 'ready_for_pickup').length}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-afri-earth-800 rounded-xl border border-gray-200 dark:border-afri-earth-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-afri-earth-700">
            <tr>
              <th className="px-6 py-3 text-left">Order</th>
              <th className="px-6 py-3 text-left">Customer</th>
              <th className="px-6 py-3 text-left">Items</th>
              <th className="px-6 py-3 text-center">Total</th>
              <th className="px-6 py-3 text-center">Pickup</th>
              <th className="px-6 py-3 text-center">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map(order => (
              <tr key={order.id}>
                <td className="px-6 py-4">
                  {order.order_number}
                </td>

                <td className="px-6 py-4">
                  <p>{order.customer_name}</p>
                  <p className="text-xs text-gray-500">
                    {order.customer_email}
                  </p>
                </td>

                <td className="px-6 py-4">
                  {(order.order_items || []).map((item: any) => (
                    <p key={item.id}>
                      {item.quantity}x {item.product_name}
                    </p>
                  ))}
                </td>

                <td className="px-6 py-4 text-center">
                  ${Number(order.total).toFixed(2)}
                </td>

                <td className="px-6 py-4 text-center">
                  <p>{order.pickup_date}</p>
                  <p className="text-xs text-gray-500">
                    {order.pickup_time}
                  </p>
                </td>

                <td className="px-6 py-4 text-center">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      statusColors[order.status]
                    }`}
                  >
                    {statusLabels[order.status]}
                  </span>
                </td>

                <td className="px-6 py-4 text-right">
                  <button className="p-1 text-gray-400 hover:text-afri-terracotta-500">
                    <Eye className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}