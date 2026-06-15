import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { TrendingUp, Users, ShoppingCart, Calendar, Sparkles } from 'lucide-react'

const revenueData = [
  { month: 'Jan', revenue: 12500, orders: 85 },
  { month: 'Feb', revenue: 14800, orders: 102 },
  { month: 'Mar', revenue: 16200, orders: 118 },
  { month: 'Apr', revenue: 18500, orders: 132 },
  { month: 'May', revenue: 21000, orders: 145 },
  { month: 'Jun', revenue: 23400, orders: 158 },
]

const pickupDayData = [
  { day: 'Monday', orders: 45 },
  { day: 'Tuesday', orders: 52 },
  { day: 'Wednesday', orders: 58 },
  { day: 'Thursday', orders: 55 },
  { day: 'Friday', orders: 72 },
  { day: 'Saturday', orders: 95 },
  { day: 'Sunday', orders: 68 },
]

const pickupTimeData = [
  { time: '8-9am', count: 25 },
  { time: '9-10am', count: 42 },
  { time: '10-11am', count: 58 },
  { time: '11-12pm', count: 45 },
  { time: '12-1pm', count: 30 },
  { time: '1-2pm', count: 22 },
  { time: '2-3pm', count: 18 },
  { time: '3-4pm', count: 15 },
  { time: '4-5pm', count: 12 },
]

const topProducts = [
  { name: 'Puff Puff',销量: 850, revenue: 2125 },
  { name: 'Meat Pie',销量: 420, revenue: 1890 },
  { name: 'Coconut Bread',销量: 380, revenue: 2280 },
  { name: 'Chin Chin',销量: 320, revenue: 960 },
  { name: 'Fish Roll',销量: 280, revenue: 1120 },
]

const customerGrowth = [
  { month: 'Jan', customers: 85 },
  { month: 'Feb', customers: 112 },
  { month: 'Mar', customers: 145 },
  { month: 'Apr', customers: 178 },
  { month: 'May', customers: 205 },
  { month: 'Jun', customers: 248 },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-afri-cream-200">
          Analytics Dashboard
        </h1>
        <p className="text-gray-500 dark:text-afri-cream-400">
          Insights and performance metrics
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-afri-earth-800 rounded-xl p-4 border border-gray-200 dark:border-afri-earth-700">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <span className="text-sm text-gray-500 dark:text-afri-cream-400">Monthly Revenue</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-afri-cream-200">$23,400</p>
          <p className="text-xs text-green-500">+11.4% from last month</p>
        </div>
        <div className="bg-white dark:bg-afri-earth-800 rounded-xl p-4 border border-gray-200 dark:border-afri-earth-700">
          <div className="flex items-center gap-2 mb-2">
            <ShoppingCart className="w-5 h-5 text-afri-terracotta-500" />
            <span className="text-sm text-gray-500 dark:text-afri-cream-400">Total Orders</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-afri-cream-200">1,245</p>
          <p className="text-xs text-gray-500 dark:text-afri-cream-400">Lifetime</p>
        </div>
        <div className="bg-white dark:bg-afri-earth-800 rounded-xl p-4 border border-gray-200 dark:border-afri-earth-700">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-gray-500 dark:text-afri-cream-400">Customers</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-afri-cream-200">248</p>
          <p className="text-xs text-blue-500">+43 new this month</p>
        </div>
        <div className="bg-white dark:bg-afri-earth-800 rounded-xl p-4 border border-gray-200 dark:border-afri-earth-700">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-afri-gold-500" />
            <span className="text-sm text-gray-500 dark:text-afri-cream-400">Avg Order Value</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-afri-cream-200">$24.80</p>
          <p className="text-xs text-green-500">+$2.30 from last month</p>
        </div>
      </div>

      {/* Revenue Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-afri-earth-800 rounded-xl p-6 border border-gray-200 dark:border-afri-earth-700">
          <h2 className="font-semibold text-gray-800 dark:text-afri-cream-200 mb-4">
            Revenue Trend
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Area type="monotone" dataKey="revenue" stroke="#D45142" fill="#D45142" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-afri-earth-800 rounded-xl p-6 border border-gray-200 dark:border-afri-earth-700">
          <h2 className="font-semibold text-gray-800 dark:text-afri-cream-200 mb-4">
            Orders Trend
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Line type="monotone" dataKey="orders" stroke="#FBBF24" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Pickup Analytics */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-afri-earth-800 rounded-xl p-6 border border-gray-200 dark:border-afri-earth-700">
          <h2 className="font-semibold text-gray-800 dark:text-afri-cream-200 mb-4">
            Orders by Pickup Day
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pickupDayData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis type="number" stroke="#6B7280" fontSize={12} />
                <YAxis dataKey="day" type="category" stroke="#6B7280" fontSize={12} width={80} />
                <Bar dataKey="orders" fill="#D45142" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-gray-500 dark:text-afri-cream-400 mt-2">
            Saturday is your busiest day with 95 orders
          </p>
        </div>

        <div className="bg-white dark:bg-afri-earth-800 rounded-xl p-6 border border-gray-200 dark:border-afri-earth-700">
          <h2 className="font-semibold text-gray-800 dark:text-afri-cream-200 mb-4">
            Peak Pickup Hours
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pickupTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="time" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Bar dataKey="count" fill="#FBBF24" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-gray-500 dark:text-afri-cream-400 mt-2">
            Peak hours: 10-11am with 58 pickups
          </p>
        </div>
      </div>

      {/* Top Products & Customer Growth */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-afri-earth-800 rounded-xl p-6 border border-gray-200 dark:border-afri-earth-700">
          <h2 className="font-semibold text-gray-800 dark:text-afri-cream-200 mb-4">
            Top Products
          </h2>
          <div className="space-y-3">
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center gap-4">
                <span className="w-6 h-6 rounded-full bg-afri-terracotta-100 dark:bg-afri-terracotta-900/30 text-afri-terracotta-600 dark:text-afri-terracotta-400 flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-afri-cream-200">{product.name}</p>
                  <p className="text-xs text-gray-500 dark:text-afri-cream-400">{product.销量} sold</p>
                </div>
                <p className="font-semibold text-gray-900 dark:text-afri-cream-200">
                  ${product.revenue.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-afri-earth-800 rounded-xl p-6 border border-gray-200 dark:border-afri-earth-700">
          <h2 className="font-semibold text-gray-800 dark:text-afri-cream-200 mb-4">
            Customer Growth
          </h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={customerGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Line type="monotone" dataKey="customers" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* AI Insights Placeholder */}
      <div className="bg-gradient-to-r from-afri-gold-50 to-afri-terracotta-50 dark:from-afri-gold-900/20 dark:to-afri-terracotta-900/20 rounded-xl p-6 border border-afri-gold-200 dark:border-afri-gold-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-afri-gold-100 dark:bg-afri-gold-900/40 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-afri-gold-600" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 dark:text-afri-cream-200">
              AI Insights
            </h2>
            <p className="text-xs text-gray-600 dark:text-afri-cream-400">
              Coming soon - intelligent production forecasting
            </p>
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-white/50 dark:bg-afri-earth-800/50 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-800 dark:text-afri-cream-200">
              Production Forecast
            </p>
            <p className="text-xs text-gray-600 dark:text-afri-cream-400 mt-1">
              Predict demand based on trends
            </p>
          </div>
          <div className="bg-white/50 dark:bg-afri-earth-800/50 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-800 dark:text-afri-cream-200">
              Inventory Suggestions
            </p>
            <p className="text-xs text-gray-600 dark:text-afri-cream-400 mt-1">
              Smart restocking recommendations
            </p>
          </div>
          <div className="bg-white/50 dark:bg-afri-earth-800/50 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-800 dark:text-afri-cream-200">
              Sales Insights
            </p>
            <p className="text-xs text-gray-600 dark:text-afri-cream-400 mt-1">
              Identify growth opportunities
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
