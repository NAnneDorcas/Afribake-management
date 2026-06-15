import { Link } from 'react-router-dom'
import { ShoppingBag, DollarSign, ChefHat, Package, AlertTriangle, TrendingUp, ArrowRight } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { demoOrders, productionItems, inventoryItems } from '../../data/products'

const weeklyRevenue = [
  { day: 'Mon', revenue: 890 },
  { day: 'Tue', revenue: 1200 },
  { day: 'Wed', revenue: 1450 },
  { day: 'Thu', revenue: 1100 },
  { day: 'Fri', revenue: 1680 },
  { day: 'Sat', revenue: 2340 },
  { day: 'Sun', revenue: 1560 },
]

const productData = [
  { name: 'Puff Puff', value: 320, color: '#D45142' },
  { name: 'Meat Pie', value: 180, color: '#834529' },
  { name: 'Chin Chin', value: 150, color: '#FBBF24' },
  { name: 'Coconut Bread', value: 90, color: '#8A6241' },
  { name: 'Others', value: 120, color: '#C4A484' },
]

export default function DashboardHome() {
  const todayOrders = demoOrders.filter(o => o.pickup_date === '2024-06-15')
  const totalRevenue = demoOrders.reduce((sum, o) => sum + o.total, 0)
  const productsToBake = productionItems.filter(p => p.status !== 'completed').reduce((sum, p) => sum + p.total_quantity, 0)
  const packedItems = productionItems.reduce((sum, p) => sum + p.produced, 0)
  const lowStockItems = inventoryItems.filter(i => i.current_stock <= i.minimum_stock)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-afri-cream-200">Dashboard</h1>
          <p className="text-gray-500 dark:text-afri-cream-400">Overview of bakery operations</p>
        </div>
        <p className="text-sm text-gray-500 dark:text-afri-cream-400">
          Saturday, June 15, 2024
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard
          title="Today's Orders"
          value={todayOrders.length}
          subtitle={`${todayOrders.filter(o => o.status === 'pending').length} pending`}
          icon={ShoppingBag}
          color="terracotta"
          href="/dashboard/sales"
        />
        <KPICard
          title="Revenue Today"
          value={`$${totalRevenue.toFixed(0)}`}
          subtitle="+12% from yesterday"
          icon={DollarSign}
          color="gold"
        />
        <KPICard
          title="Products to Bake"
          value={productsToBake}
          subtitle="Scheduled for today"
          icon={ChefHat}
          color="brown"
          href="/dashboard/prep"
        />
        <KPICard
          title="Packed Products"
          value={packedItems}
          subtitle="This morning"
          icon={Package}
          color="green"
          href="/dashboard/pack"
        />
        <KPICard
          title="Inventory Alerts"
          value={lowStockItems.length}
          subtitle="Items low in stock"
          icon={AlertTriangle}
          color="red"
          href="/dashboard/inventory"
        />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Revenue */}
        <div className="bg-white dark:bg-afri-earth-800 rounded-xl p-6 border border-gray-200 dark:border-afri-earth-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-gray-800 dark:text-afri-cream-200">Weekly Revenue</h2>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="day" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Bar dataKey="revenue" fill="#D45142" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Product Performance */}
        <div className="bg-white dark:bg-afri-earth-800 rounded-xl p-6 border border-gray-200 dark:border-afri-earth-700">
          <h2 className="font-semibold text-gray-800 dark:text-afri-cream-200 mb-6">
            Product Performance
          </h2>
          <div className="flex">
            <div className="w-48 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={productData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    dataKey="value"
                  >
                    {productData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 pl-4">
              <div className="space-y-2">
                {productData.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-600 dark:text-afri-cream-400 flex-1">
                      {item.name}
                    </span>
                    <span className="text-sm font-medium text-gray-800 dark:text-afri-cream-200">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Overview & Recent */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Orders by Status */}
        <div className="bg-white dark:bg-afri-earth-800 rounded-xl p-6 border border-gray-200 dark:border-afri-earth-700">
          <h2 className="font-semibold text-gray-800 dark:text-afri-cream-200 mb-6">
            Orders by Status
          </h2>
          <div className="space-y-3">
            <StatusBar label="Pending" count={demoOrders.filter(o => o.status === 'pending').length} total={demoOrders.length} color="gold" />
            <StatusBar label="In Preparation" count={demoOrders.filter(o => o.status === 'in_preparation').length} total={demoOrders.length} color="brown" />
            <StatusBar label="Ready for Pickup" count={demoOrders.filter(o => o.status === 'ready_for_pickup').length} total={demoOrders.length} color="terracotta" />
            <StatusBar label="Completed" count={demoOrders.filter(o => o.status === 'completed').length} total={demoOrders.length} color="green" />
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white dark:bg-afri-earth-800 rounded-xl p-6 border border-gray-200 dark:border-afri-earth-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-gray-800 dark:text-afri-cream-200">
              Recent Orders
            </h2>
            <Link
              to="/dashboard/sales"
              className="text-sm text-afri-terracotta-500 hover:text-afri-terracotta-600 flex items-center"
            >
              View all
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="space-y-3">
            {demoOrders.slice(0, 4).map(order => (
              <div
                key={order.id}
                className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-afri-earth-700 last:border-0"
              >
                <div>
                  <p className="font-medium text-sm text-gray-800 dark:text-afri-cream-200">
                    {order.order_number}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-afri-cream-400">
                    {order.customer_name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm text-gray-800 dark:text-afri-cream-200">
                    ${order.total.toFixed(2)}
                  </p>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-afri-gold-100 text-afri-gold-700 dark:bg-afri-gold-900/30 dark:text-afri-gold-400">
                    {order.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <div className="bg-afri-terracotta-50 dark:bg-afri-terracotta-900/20 rounded-xl p-6 border border-afri-terracotta-200 dark:border-afri-terracotta-800">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-afri-terracotta-500" />
            <h2 className="font-semibold text-afri-terracotta-700 dark:text-afri-terracotta-400">
              Low Stock Alerts
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {lowStockItems.map(item => (
              <div
                key={item.id}
                className="bg-white dark:bg-afri-earth-800 rounded-lg p-3 flex items-center justify-between"
              >
                <span className="font-medium text-gray-800 dark:text-afri-cream-200">
                  {item.name}
                </span>
                <span className="text-sm text-afri-terracotta-600 dark:text-afri-terracotta-400">
                  {item.current_stock} {item.unit}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function KPICard({
  title, value, subtitle, icon: Icon, color, href
}: {
  title: string
  value: string | number
  subtitle: string
  icon: React.ElementType
  color: string
  href?: string
}) {
  const colorClasses: Record<string, string> = {
    terracotta: 'bg-afri-terracotta-100 dark:bg-afri-terracotta-900/30 text-afri-terracotta-500',
    gold: 'bg-afri-gold-100 dark:bg-afri-gold-900/30 text-afri-gold-500',
    brown: 'bg-afri-brown-100 dark:bg-afri-brown-700/50 text-afri-brown-600',
    green: 'bg-green-100 dark:bg-green-900/30 text-green-600',
    red: 'bg-red-100 dark:bg-red-900/30 text-red-500',
  }

  const content = (
    <div className="bg-white dark:bg-afri-earth-800 rounded-xl p-5 border border-gray-200 dark:border-afri-earth-700">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-500 dark:text-afri-cream-400">{title}</span>
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-900 dark:text-afri-cream-200">{value}</p>
      <p className="text-sm text-gray-500 dark:text-afri-cream-400 mt-1">{subtitle}</p>
    </div>
  )

  if (href) {
    return <Link to={href} className="block hover:shadow-lg transition-shadow">{content}</Link>
  }

  return content
}

function StatusBar({ label, count, total, color }: { label: string; count: number; total: number; color: string }) {
  const percentage = (count / total) * 100
  const colorClasses: Record<string, string> = {
    gold: 'bg-afri-gold-400',
    brown: 'bg-afri-brown-600',
    terracotta: 'bg-afri-terracotta-500',
    green: 'bg-green-500',
  }

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600 dark:text-afri-cream-400">{label}</span>
        <span className="font-medium text-gray-800 dark:text-afri-cream-200">{count}</span>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-afri-earth-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${colorClasses[color]} rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
