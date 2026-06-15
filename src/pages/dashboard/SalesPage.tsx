import { Search, Eye } from 'lucide-react'
import { useState } from 'react'
import { demoOrders } from '../../data/products'

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
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredOrders = demoOrders.filter(order => {
    if (statusFilter !== 'all' && order.status !== statusFilter) return false
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      if (!order.customer_name.toLowerCase().includes(query) &&
          !order.order_number.toLowerCase().includes(query)) {
        return false
      }
    }
    return true
  })

  const totalRevenue = filteredOrders.reduce((sum, o) => sum + o.total, 0)

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

      {/* Filters */}
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
        </select>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-afri-earth-800 rounded-xl p-4 border border-gray-200 dark:border-afri-earth-700">
          <p className="text-sm text-gray-500 dark:text-afri-cream-400">Total Orders</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-afri-cream-200">{filteredOrders.length}</p>
        </div>
        <div className="bg-white dark:bg-afri-earth-800 rounded-xl p-4 border border-gray-200 dark:border-afri-earth-700">
          <p className="text-sm text-gray-500 dark:text-afri-cream-400">Total Revenue</p>
          <p className="text-2xl font-bold text-afri-gold-600">${totalRevenue.toFixed(0)}</p>
        </div>
        <div className="bg-white dark:bg-afri-earth-800 rounded-xl p-4 border border-gray-200 dark:border-afri-earth-700">
          <p className="text-sm text-gray-500 dark:text-afri-cream-400">Pending</p>
          <p className="text-2xl font-bold text-afri-terracotta-500">{filteredOrders.filter(o => o.status === 'pending').length}</p>
        </div>
        <div className="bg-white dark:bg-afri-earth-800 rounded-xl p-4 border border-gray-200 dark:border-afri-earth-700">
          <p className="text-sm text-gray-500 dark:text-afri-cream-400">Ready</p>
          <p className="text-2xl font-bold text-green-600">{filteredOrders.filter(o => o.status === 'ready_for_pickup').length}</p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-afri-earth-800 rounded-xl border border-gray-200 dark:border-afri-earth-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-afri-earth-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-afri-cream-400 uppercase tracking-wider">
                Order
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-afri-cream-400 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-afri-cream-400 uppercase tracking-wider">
                Items
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-afri-cream-400 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-afri-cream-400 uppercase tracking-wider">
                Pickup
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-afri-cream-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-afri-cream-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-afri-earth-700">
            {filteredOrders.map(order => (
              <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-afri-earth-700/50">
                <td className="px-6 py-4">
                  <p className="font-medium text-gray-900 dark:text-afri-cream-200">
                    {order.order_number}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <p className="font-medium text-gray-900 dark:text-afri-cream-200">
                    {order.customer_name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-afri-cream-400">
                    {order.customer_email}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600 dark:text-afri-cream-400">
                    {order.items.map(item => (
                      <p key={item.product_id}>
                        {item.quantity}x {item.product_name}
                      </p>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-center font-semibold text-gray-900 dark:text-afri-cream-200">
                  ${order.total.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-center">
                  <p className="font-medium text-gray-900 dark:text-afri-cream-200">{order.pickup_date}</p>
                  <p className="text-xs text-gray-500 dark:text-afri-cream-400">{order.pickup_time}</p>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[order.status]}`}>
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
