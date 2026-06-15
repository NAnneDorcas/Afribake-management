import { useState } from 'react'
import { Search } from 'lucide-react'
import { activityLogs } from '../../data/products'

const moduleColors: Record<string, string> = {
  Auth: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Production: 'bg-afri-gold-100 text-afri-gold-700 dark:bg-afri-gold-900/30 dark:text-afri-gold-400',
  Inventory: 'bg-afri-brown-100 text-afri-brown-700 dark:bg-afri-brown-700/50 dark:text-afri-brown-300',
  Packing: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Sales: 'bg-afri-terracotta-100 text-afri-terracotta-700 dark:bg-afri-terracotta-900/30 dark:text-afri-terracotta-400',
}

export default function ActivityLogsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [moduleFilter, setModuleFilter] = useState('all')

  const filteredLogs = activityLogs.filter(log => {
    if (moduleFilter !== 'all' && log.module !== moduleFilter) return false
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      if (!log.action.toLowerCase().includes(query) &&
          !log.worker_name.toLowerCase().includes(query)) {
        return false
      }
    }
    return true
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-afri-cream-200">
          Activity Logs
        </h1>
        <p className="text-gray-500 dark:text-afri-cream-400">
          Track all bakery operations and changes
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search logs..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-afri-earth-600 rounded-lg bg-white dark:bg-afri-earth-700 text-gray-900 dark:text-afri-cream-200"
          />
        </div>
        <select
          value={moduleFilter}
          onChange={e => setModuleFilter(e.target.value)}
          className="px-4 py-2 border border-gray-200 dark:border-afri-earth-600 rounded-lg bg-white dark:bg-afri-earth-700 text-gray-900 dark:text-afri-cream-200"
        >
          <option value="all">All Modules</option>
          <option value="Auth">Auth</option>
          <option value="Production">Production</option>
          <option value="Inventory">Inventory</option>
          <option value="Packing">Packing</option>
          <option value="Sales">Sales</option>
        </select>
      </div>

      {/* Logs Table */}
      <div className="bg-white dark:bg-afri-earth-800 rounded-xl border border-gray-200 dark:border-afri-earth-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-afri-earth-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-afri-cream-400 uppercase tracking-wider">
                Timestamp
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-afri-cream-400 uppercase tracking-wider">
                Worker
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-afri-cream-400 uppercase tracking-wider">
                Action
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-afri-cream-400 uppercase tracking-wider">
                Module
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-afri-earth-700">
            {filteredLogs.map(log => {
              const { date, time } = formatDate(log.created_at)
              return (
                <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-afri-earth-700/50">
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <span className="font-medium text-gray-900 dark:text-afri-cream-200">
                        {date}
                      </span>
                      <span className="text-gray-500 dark:text-afri-cream-400 ml-2">
                        {time}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-afri-gold-100 dark:bg-afri-gold-900/30 flex items-center justify-center">
                        <span className="text-sm font-medium text-afri-gold-600">
                          {log.worker_name.charAt(0)}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900 dark:text-afri-cream-200">
                        {log.worker_name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-afri-cream-400">
                    {log.action}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${moduleColors[log.module] || 'bg-gray-100 text-gray-700'}`}>
                      {log.module}
                    </span>
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
