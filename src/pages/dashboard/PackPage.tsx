import { useState } from 'react'
import { Package, Check } from 'lucide-react'
import { productionItems } from '../../data/products'

export default function PackPage() {
  const [items, setItems] = useState(
    productionItems
      .filter(item => item.produced > 0)
      .map(item => ({
        ...item,
        packed: 0
      }))
  )

  const handleUpdatePacked = (id: string, packed: number) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, packed: Math.min(packed, item.produced) } : item
    ))
  }

  const handlePackAll = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, packed: item.produced } : item
    ))
  }

  const totalPending = items.reduce((sum, item) => sum + (item.produced - item.packed), 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-afri-cream-200">
            Packaging Tracking
          </h1>
          <p className="text-gray-500 dark:text-afri-cream-400">
            Track packaged items ready for pickup
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500 dark:text-afri-cream-400">Pending Items</p>
          <p className="text-2xl font-bold text-afri-terracotta-500">{totalPending}</p>
        </div>
      </div>

      {/* Items to Pack */}
      <div className="bg-white dark:bg-afri-earth-800 rounded-xl border border-gray-200 dark:border-afri-earth-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-afri-earth-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-afri-cream-400 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-afri-cream-400 uppercase tracking-wider">
                Produced
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-afri-cream-400 uppercase tracking-wider">
                Packed
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-afri-cream-400 uppercase tracking-wider">
                Remaining
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-afri-cream-400 uppercase tracking-wider">
                Progress
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-afri-cream-400 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-afri-earth-700">
            {items.map(item => {
              const remaining = item.produced - item.packed
              const progress = (item.packed / item.produced) * 100

              return (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-afri-earth-700/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-afri-gold-100 dark:bg-afri-gold-900/30 flex items-center justify-center">
                        <Package className="w-5 h-5 text-afri-gold-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-afri-cream-200">
                          {item.product_name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-afri-cream-400">
                          Pickup: {item.pickup_date}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center font-medium text-gray-900 dark:text-afri-cream-200">
                    {item.produced}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <input
                      type="number"
                      value={item.packed}
                      onChange={e => handleUpdatePacked(item.id, parseInt(e.target.value) || 0)}
                      className="w-20 px-3 py-2 text-center border border-gray-200 dark:border-afri-earth-600 rounded-lg bg-white dark:bg-afri-earth-700 text-gray-900 dark:text-afri-cream-200"
                      min="0"
                      max={item.produced}
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`font-semibold ${
                      remaining === 0
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-afri-terracotta-500'
                    }`}>
                      {remaining}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full">
                      <div className="h-2 bg-gray-200 dark:bg-afri-earth-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${remaining === 0 ? 'bg-green-500' : 'bg-afri-terracotta-500'} transition-all duration-500`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {remaining > 0 ? (
                      <button
                        onClick={() => handlePackAll(item.id)}
                        className="btn-outline text-sm py-2 flex items-center gap-2"
                      >
                        <Package className="w-4 h-4" />
                        Pack All
                      </button>
                    ) : (
                      <span className="flex items-center justify-end text-green-600 dark:text-green-400 font-medium">
                        <Check className="w-4 h-4 mr-1" />
                        Done
                      </span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
