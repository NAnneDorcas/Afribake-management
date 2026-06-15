import { useState } from 'react'
import { Plus, Edit, Search, AlertTriangle, Package, ArrowDownToLine } from 'lucide-react'
import { inventoryItems } from '../../data/products'

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState<'all' | 'ingredient' | 'packaging'>('all')

  const filteredItems = inventoryItems.filter(item => {
    if (filter !== 'all' && item.category !== filter) return false
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const lowStock = inventoryItems.filter(i => i.current_stock <= i.minimum_stock)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-afri-cream-200">
            Inventory Management
          </h1>
          <p className="text-gray-500 dark:text-afri-cream-400">
            Track ingredients and packaging materials
          </p>
        </div>
        <div className="flex gap-2">
          <button className="btn-outline">
            <ArrowDownToLine className="w-5 h-5 mr-2" />
            Adjust Stock
          </button>
          <button className="btn-primary">
            <Plus className="w-5 h-5 mr-2" />
            Add Item
          </button>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStock.length > 0 && (
        <div className="bg-afri-terracotta-50 dark:bg-afri-terracotta-900/20 rounded-xl p-4 border border-afri-terracotta-200 dark:border-afri-terracotta-800">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-afri-terracotta-500" />
            <span className="font-medium text-afri-terracotta-700 dark:text-afri-terracotta-400">
              {lowStock.length} items low on stock
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {lowStock.map(item => (
              <span
                key={item.id}
                className="text-sm bg-white dark:bg-afri-earth-800 px-3 py-1 rounded-full text-afri-terracotta-600 dark:text-afri-terracotta-400"
              >
                {item.name} ({item.current_stock} {item.unit})
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search inventory..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-afri-earth-600 rounded-lg bg-white dark:bg-afri-earth-700 text-gray-900 dark:text-afri-cream-200"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              filter === 'all'
                ? 'bg-afri-terracotta-500 text-white'
                : 'bg-gray-100 dark:bg-afri-earth-700 text-gray-700 dark:text-afri-cream-300 hover:bg-gray-200 dark:hover:bg-afri-earth-600'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('ingredient')}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
              filter === 'ingredient'
                ? 'bg-afri-terracotta-500 text-white'
                : 'bg-gray-100 dark:bg-afri-earth-700 text-gray-700 dark:text-afri-cream-300 hover:bg-gray-200 dark:hover:bg-afri-earth-600'
            }`}
          >
            <Package className="w-4 h-4" />
            Ingredients
          </button>
          <button
            onClick={() => setFilter('packaging')}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
              filter === 'packaging'
                ? 'bg-afri-terracotta-500 text-white'
                : 'bg-gray-100 dark:bg-afri-earth-700 text-gray-700 dark:text-afri-cream-300 hover:bg-gray-200 dark:hover:bg-afri-earth-600'
            }`}
          >
            <Package className="w-4 h-4" />
            Packaging
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white dark:bg-afri-earth-800 rounded-xl border border-gray-200 dark:border-afri-earth-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-afri-earth-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-afri-cream-400 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-afri-cream-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-afri-cream-400 uppercase tracking-wider">
                  Current Stock
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-afri-cream-400 uppercase tracking-wider">
                  Minimum
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
              {filteredItems.map(item => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-afri-earth-700/50">
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900 dark:text-afri-cream-200">
                      {item.name}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600 dark:text-afri-cream-400 capitalize">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`font-semibold ${
                      item.current_stock <= item.minimum_stock
                        ? 'text-afri-terracotta-500'
                        : 'text-gray-900 dark:text-afri-cream-200'
                    }`}>
                      {item.current_stock} {item.unit}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-gray-600 dark:text-afri-cream-400">
                    {item.minimum_stock} {item.unit}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {item.current_stock <= item.minimum_stock ? (
                      <span className="px-2 py-1 rounded text-xs font-medium bg-afri-terracotta-100 text-afri-terracotta-700 dark:bg-afri-terracotta-900/30 dark:text-afri-terracotta-400">
                        Low Stock
                      </span>
                    ) : item.current_stock <= item.minimum_stock * 1.5 ? (
                      <span className="px-2 py-1 rounded text-xs font-medium bg-afri-gold-100 text-afri-gold-700 dark:bg-afri-gold-900/30 dark:text-afri-gold-400">
                        Warning
                      </span>
                    ) : (
                      <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        Good
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 text-gray-400 hover:text-afri-terracotta-500">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-blue-500 ml-2">
                      <ArrowDownToLine className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
