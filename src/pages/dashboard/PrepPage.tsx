import { useState } from 'react'
import { Plus, Pencil, Trash2, Calendar } from 'lucide-react'
import { productionItems } from '../../data/products'
import { format, addDays, isSameDay, startOfToday } from 'date-fns'

export default function PrepPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(startOfToday())
  const [_showAddModal, setShowAddModal] = useState(false)

  const next7Days = Array.from({ length: 7 }, (_, i) => addDays(startOfToday(), i))

  const filteredItems = productionItems.filter(item =>
    item.pickup_date === format(selectedDate, 'yyyy-MM-dd')
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-afri-cream-200">
            Production Planning
          </h1>
          <p className="text-gray-500 dark:text-afri-cream-400">
            Plan and track daily production
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Product
        </button>
      </div>

      {/* Date Filter */}
      <div className="bg-white dark:bg-afri-earth-800 rounded-xl p-4 border border-gray-200 dark:border-afri-earth-700">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-afri-terracotta-500" />
          <span className="font-medium text-gray-800 dark:text-afri-cream-200">
            Select Pickup Date
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {next7Days.map(date => (
            <button
              key={date.toISOString()}
              onClick={() => setSelectedDate(date)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isSameDay(date, selectedDate)
                  ? 'bg-afri-terracotta-500 text-white'
                  : 'bg-gray-100 dark:bg-afri-earth-700 text-gray-700 dark:text-afri-cream-300 hover:bg-gray-200 dark:hover:bg-afri-earth-600'
              }`}
            >
              <span className="block text-xs opacity-75">{format(date, 'EEE')}</span>
              <span className="block">{format(date, 'MMM d')}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Production Table */}
      <div className="bg-white dark:bg-afri-earth-800 rounded-xl border border-gray-200 dark:border-afri-earth-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-afri-earth-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-afri-cream-400 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-afri-cream-400 uppercase tracking-wider">
                  Website Orders
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-afri-cream-400 uppercase tracking-wider">
                  Market Orders
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-afri-cream-400 uppercase tracking-wider">
                  Extra
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-afri-cream-400 uppercase tracking-wider">
                  Total
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
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500 dark:text-afri-cream-400">
                    No production planned for this date.
                  </td>
                </tr>
              ) : (
                filteredItems.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-afri-earth-700/50">
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900 dark:text-afri-cream-200">
                        {item.product_name}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600 dark:text-afri-cream-400">
                      {item.website_orders}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600 dark:text-afri-cream-400">
                      {item.market_orders}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input
                        type="number"
                        defaultValue={item.extra_quantity}
                        className="w-16 px-2 py-1 text-center border border-gray-200 dark:border-afri-earth-600 rounded bg-white dark:bg-afri-earth-700 text-gray-900 dark:text-afri-cream-200"
                        min="0"
                      />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-2 py-1 bg-afri-terracotta-100 dark:bg-afri-terracotta-900/30 text-afri-terracotta-700 dark:text-afri-terracotta-400 rounded font-semibold">
                        {item.total_quantity}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1 text-gray-400 hover:text-afri-terracotta-500">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-500 ml-2">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-afri-earth-800 rounded-xl p-4 border border-gray-200 dark:border-afri-earth-700">
          <p className="text-sm text-gray-500 dark:text-afri-cream-400">Total Website Orders</p>
          <p className="text-2xl font-bold text-afri-terracotta-500">
            {filteredItems.reduce((sum, i) => sum + i.website_orders, 0)}
          </p>
        </div>
        <div className="bg-white dark:bg-afri-earth-800 rounded-xl p-4 border border-gray-200 dark:border-afri-earth-700">
          <p className="text-sm text-gray-500 dark:text-afri-cream-400">Total Market Orders</p>
          <p className="text-2xl font-bold text-afri-brown-600">
            {filteredItems.reduce((sum, i) => sum + i.market_orders, 0)}
          </p>
        </div>
        <div className="bg-white dark:bg-afri-earth-800 rounded-xl p-4 border border-gray-200 dark:border-afri-earth-700">
          <p className="text-sm text-gray-500 dark:text-afri-cream-400">Total to Produce</p>
          <p className="text-2xl font-bold text-afri-gold-600">
            {filteredItems.reduce((sum, i) => sum + i.total_quantity, 0)}
          </p>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    planned: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
    in_progress: 'bg-afri-gold-100 text-afri-gold-700 dark:bg-afri-gold-900/30 dark:text-afri-gold-400',
    completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  }

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${styles[status]}`}>
      {status.replace('_', ' ')}
    </span>
  )
}
