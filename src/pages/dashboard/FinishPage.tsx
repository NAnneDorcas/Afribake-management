import { useState } from 'react'
import { Check, ChevronUp, ChevronDown } from 'lucide-react'
import { productionItems } from '../../data/products'

export default function FinishPage() {
  const [items, setItems] = useState(productionItems)

  const handleUpdateProduced = (id: string, produced: number) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, produced: Math.min(produced, item.total_quantity) } : item
    ))
  }

  const handleStartBatch = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, status: 'in_progress' } : item
    ))
  }

  const handleCompleteBatch = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, status: 'completed' } : item
    ))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-afri-cream-200">
          Production Tracking
        </h1>
        <p className="text-gray-500 dark:text-afri-cream-400">
          Track production progress for scheduled items
        </p>
      </div>

      {/* Production Cards */}
      <div className="space-y-4">
        {items.map(item => {
          const remaining = item.total_quantity - item.produced
          const progress = (item.produced / item.total_quantity) * 100

          return (
            <div
              key={item.id}
              className="bg-white dark:bg-afri-earth-800 rounded-xl p-6 border border-gray-200 dark:border-afri-earth-700"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-afri-cream-200">
                      {item.product_name}
                    </h3>
                    <StatusBadge status={item.status} />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-afri-cream-400 mb-4">
                    Pickup: {item.pickup_date}
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-afri-cream-400">
                        Produced: {item.produced}/{item.total_quantity}
                      </span>
                      <span className="font-medium text-gray-800 dark:text-afri-cream-200">
                        {progress.toFixed(0)}%
                      </span>
                    </div>
                    <div className="h-3 bg-gray-200 dark:bg-afri-earth-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-afri-terracotta-500 transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleUpdateProduced(item.id, Math.max(0, item.produced - 5))}
                      className="p-2 bg-gray-100 dark:bg-afri-earth-700 rounded-lg hover:bg-gray-200 dark:hover:bg-afri-earth-600"
                    >
                      <ChevronDown className="w-4 h-4 text-gray-600 dark:text-afri-cream-400" />
                    </button>
                    <input
                      type="number"
                      value={item.produced}
                      onChange={e => handleUpdateProduced(item.id, parseInt(e.target.value) || 0)}
                      className="w-20 px-3 py-2 text-center border border-gray-200 dark:border-afri-earth-600 rounded-lg bg-white dark:bg-afri-earth-700 text-gray-900 dark:text-afri-cream-200"
                      min="0"
                      max={item.total_quantity}
                    />
                    <button
                      onClick={() => handleUpdateProduced(item.id, Math.min(item.total_quantity, item.produced + 5))}
                      className="p-2 bg-gray-100 dark:bg-afri-earth-700 rounded-lg hover:bg-gray-200 dark:hover:bg-afri-earth-600"
                    >
                      <ChevronUp className="w-4 h-4 text-gray-600 dark:text-afri-cream-400" />
                    </button>
                    <span className="ml-2 text-gray-600 dark:text-afri-cream-400">
                      Remaining: <span className="font-semibold text-gray-800 dark:text-afri-cream-200">{remaining}</span>
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {item.status === 'planned' && (
                    <button
                      onClick={() => handleStartBatch(item.id)}
                      className="btn-primary"
                    >
                      Start Production
                    </button>
                  )}
                  {item.status === 'in_progress' && (
                    <button
                      onClick={() => handleCompleteBatch(item.id)}
                      className="btn-primary flex items-center gap-2"
                    >
                      <Check className="w-5 h-5" />
                      Complete
                    </button>
                  )}
                  {item.status === 'completed' && (
                    <span className="text-green-600 dark:text-green-400 flex items-center font-medium gap-2">
                      <Check className="w-5 h-5" />
                      Completed
                    </span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
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
