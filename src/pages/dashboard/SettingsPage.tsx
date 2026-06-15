import { useState } from 'react'
import { Save, Clock, Calendar, MapPin, Phone, Mail, Store } from 'lucide-react'
import { useWorker } from '../../contexts/WorkerContext'

export default function SettingsPage() {
  const { currentWorker } = useWorker()
  const [saved, setSaved] = useState(false)

  const [settings, setSettings] = useState({
    bakery_name: 'AfriBake',
    address: '123 Bakery Lane, African Quarter, City 12345',
    phone: '+1 (555) 123-4567',
    email: 'hello@afribake.com',
    pickup_days: ['Monday', 'Tuesday', 'Wednesday', ' Thursday', 'Friday', 'Saturday', 'Sunday'],
    pickup_start_time: '08:00',
    pickup_end_time: '17:00',
    max_orders_per_slot: '10',
    same_day_cutoff: '14:00',
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const isOwner = currentWorker?.role === 'owner'

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-afri-cream-200">
            Settings
          </h1>
          <p className="text-gray-500 dark:text-afri-cream-400">
            Configure bakery information and operations
          </p>
        </div>
        {saved && (
          <div className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-sm font-medium">
            Settings saved!
          </div>
        )}
      </div>

      {/* Bakery Information */}
      <div className="bg-white dark:bg-afri-earth-800 rounded-xl p-6 border border-gray-200 dark:border-afri-earth-700">
        <div className="flex items-center gap-3 mb-6">
          <Store className="w-5 h-5 text-afri-terracotta-500" />
          <h2 className="font-semibold text-gray-900 dark:text-afri-cream-200">
            Bakery Information
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="label">Bakery Name</label>
            <input
              type="text"
              value={settings.bakery_name}
              onChange={e => setSettings({ ...settings, bakery_name: e.target.value })}
              className="input"
              disabled={!isOwner}
            />
          </div>
          <div>
            <label className="label">Contact Phone</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                value={settings.phone}
                onChange={e => setSettings({ ...settings, phone: e.target.value })}
                className="input pl-10"
                disabled={!isOwner}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className="label">Address</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={settings.address}
                onChange={e => setSettings({ ...settings, address: e.target.value })}
                className="input pl-10"
                disabled={!isOwner}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className="label">Contact Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={settings.email}
                onChange={e => setSettings({ ...settings, email: e.target.value })}
                className="input pl-10"
                disabled={!isOwner}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Pickup Scheduling */}
      <div className="bg-white dark:bg-afri-earth-800 rounded-xl p-6 border border-gray-200 dark:border-afri-earth-700">
        <div className="flex items-center gap-3 mb-6">
          <Clock className="w-5 h-5 text-afri-terracotta-500" />
          <h2 className="font-semibold text-gray-900 dark:text-afri-cream-200">
            Pickup Scheduling
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="label">Pickup Start Time</label>
            <input
              type="time"
              value={settings.pickup_start_time}
              onChange={e => setSettings({ ...settings, pickup_start_time: e.target.value })}
              className="input"
              disabled={!isOwner}
            />
          </div>
          <div>
            <label className="label">Pickup End Time</label>
            <input
              type="time"
              value={settings.pickup_end_time}
              onChange={e => setSettings({ ...settings, pickup_end_time: e.target.value })}
              className="input"
              disabled={!isOwner}
            />
          </div>
          <div>
            <label className="label">Time Slot Duration (minutes)</label>
            <select className="input" disabled={!isOwner}>
              <option>60 minutes</option>
              <option>30 minutes</option>
            </select>
          </div>
          <div>
            <label className="label">Max Orders Per Slot</label>
            <input
              type="number"
              value={settings.max_orders_per_slot}
              onChange={e => setSettings({ ...settings, max_orders_per_slot: e.target.value })}
              className="input"
              disabled={!isOwner}
            />
          </div>
          <div>
            <label className="label">Same-Day Pickup Cutoff</label>
            <input
              type="time"
              value={settings.same_day_cutoff}
              onChange={e => setSettings({ ...settings, same_day_cutoff: e.target.value })}
              className="input"
              disabled={!isOwner}
            />
          </div>
        </div>

        {/* Pickup Days */}
        <div className="mt-6">
          <label className="label mb-3">Available Pickup Days</label>
          <div className="flex flex-wrap gap-2">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
              <label
                key={day}
                className={`px-4 py-2 rounded-lg border cursor-pointer transition-colors ${
                  !isOwner ? 'opacity-50 cursor-not-allowed' : ''
                } ${
                  settings.pickup_days.includes(day)
                    ? 'bg-afri-terracotta-50 border-afri-terracotta-500 text-afri-terracotta-700 dark:bg-afri-terracotta-900/30 dark:text-afri-terracotta-400'
                    : 'border-gray-200 dark:border-afri-earth-600 text-gray-700 dark:text-afri-cream-300 hover:bg-gray-50 dark:hover:bg-afri-earth-700'
                }`}
              >
                <input
                  type="checkbox"
                  className="hidden"
                  checked={settings.pickup_days.includes(day)}
                  onChange={() => {}}
                  disabled={!isOwner}
                />
                {day.slice(0, 3)}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Product Preparation Times */}
      <div className="bg-white dark:bg-afri-earth-800 rounded-xl p-6 border border-gray-200 dark:border-afri-earth-700">
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="w-5 h-5 text-afri-terracotta-500" />
          <h2 className="font-semibold text-gray-900 dark:text-afri-cream-200">
            Product Preparation Times
          </h2>
        </div>

        <p className="text-sm text-gray-600 dark:text-afri-cream-400 mb-4">
          Configure how much advance notice each product category requires.
        </p>

        <div className="space-y-3">
          {[
            { name: 'Pastries (Puff Puff, Chin Chin)', time: 'Same Day' },
            { name: 'Pies (Meat Pie, Fish Roll)', time: 'Same Day' },
            { name: 'Breads', time: 'Same Day' },
            { name: 'Desserts', time: 'Same Day' },
            { name: 'Celebration Cakes', time: '48 Hours' },
            { name: 'Wedding Cakes', time: '72 Hours' },
            { name: 'Catering Orders', time: '24 Hours' },
          ].map(item => (
            <div
              key={item.name}
              className="flex items-center justify-between py-3 px-4 bg-gray-50 dark:bg-afri-earth-700 rounded-lg"
            >
              <span className="text-gray-700 dark:text-afri-cream-300">{item.name}</span>
              <select
                className="input w-40 py-1"
                defaultValue={item.time}
                disabled={!isOwner}
              >
                <option>Same Day</option>
                <option>4 Hours</option>
                <option>12 Hours</option>
                <option>24 Hours</option>
                <option>48 Hours</option>
                <option>72 Hours</option>
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      {isOwner && (
        <button onClick={handleSave} className="btn-primary">
          <Save className="w-5 h-5 mr-2" />
          Save Settings
        </button>
      )}

      {!isOwner && (
        <p className="text-sm text-gray-500 dark:text-afri-cream-400">
          Only the owner can modify settings.
        </p>
      )}
    </div>
  )
}
