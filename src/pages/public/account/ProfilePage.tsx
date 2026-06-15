import { useState } from 'react'
import { useCustomer } from '../../../contexts/AuthContext'

export default function ProfilePage() {
  const { customer, updateProfile } = useCustomer()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: customer?.name || '',
    email: customer?.email || '',
    phone: customer?.phone || '',
    preferred_pickup_time: customer?.preferred_pickup_time || ''
  })

  const handleSave = async () => {
    try {
      await updateProfile({
        name: formData.name,
        phone: formData.phone,
        preferred_pickup_time: formData.preferred_pickup_time
      })
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to update profile', error)
    }
  }

  return (
    <div className="bg-white dark:bg-afri-earth-700 rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-display text-xl font-bold text-afri-brown-700 dark:text-afri-cream-200">
          Profile Information
        </h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="btn-outline text-sm py-2"
          >
            Edit Profile
          </button>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="label">Full Name</label>
          {isEditing ? (
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="input"
            />
          ) : (
            <p className="text-afri-brown-700 dark:text-afri-cream-200 py-3">
              {formData.name || 'Not set'}
            </p>
          )}
        </div>

        <div>
          <label className="label">Email Address</label>
          <p className="text-afri-brown-700 dark:text-afri-cream-200 py-3">
            {formData.email}
          </p>
        </div>

        <div>
          <label className="label">Phone Number</label>
          {isEditing ? (
            <input
              type="tel"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              className="input"
              placeholder="+1 (555) 123-4567"
            />
          ) : (
            <p className="text-afri-brown-700 dark:text-afri-cream-200 py-3">
              {formData.phone || 'Not set'}
            </p>
          )}
        </div>

        <div>
          <label className="label">Preferred Pickup Time</label>
          {isEditing ? (
            <select
              value={formData.preferred_pickup_time}
              onChange={e => setFormData({ ...formData, preferred_pickup_time: e.target.value })}
              className="input"
            >
              <option value="">No preference</option>
              <option value="morning">Morning (8am - 11am)</option>
              <option value="midday">Midday (11am - 2pm)</option>
              <option value="afternoon">Afternoon (2pm - 5pm)</option>
            </select>
          ) : (
            <p className="text-afri-brown-700 dark:text-afri-cream-200 py-3">
              {formData.preferred_pickup_time || 'No preference'}
            </p>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="flex gap-3 mt-6 pt-6 border-t border-afri-earth-200 dark:border-afri-earth-600">
          <button onClick={handleSave} className="btn-primary">
            Save Changes
          </button>
          <button onClick={() => setIsEditing(false)} className="btn-outline">
            Cancel
          </button>
        </div>
      )}

      {/* Danger Zone */}
      <div className="mt-8 pt-6 border-t border-afri-earth-200 dark:border-afri-earth-600">
        <h3 className="font-medium text-afri-brown-700 dark:text-afri-cream-200 mb-4">
          Password
        </h3>
        <button className="btn-outline">
          Change Password
        </button>
      </div>
    </div>
  )
}
