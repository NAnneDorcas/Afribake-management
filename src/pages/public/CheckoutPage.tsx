import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, Clock, Check, ChevronLeft } from 'lucide-react'
import { useCart } from '../../contexts/CartContext'
import { format, addDays, isSameDay, startOfToday } from 'date-fns'

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
]

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { items, total, clearCart } = useCart()

  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const today = startOfToday()
  const next14Days = Array.from({ length: 14 }, (_, i) => addDays(today, i))

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate order submission
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Generate order number
    const orderNumber = `AFB-${Math.floor(1000 + Math.random() * 9000)}`

    // Clear cart and navigate to confirmation
    clearCart()
    navigate('/order-confirmation', {
      state: {
        orderNumber,
        pickupDate: selectedDate ? format(selectedDate, 'EEEE, MMMM d') : '',
        pickupTime: selectedTime,
        total
      }
    })
  }

  if (items.length === 0) {
    navigate('/cart')
    return null
  }

  return (
    <div className="min-h-screen bg-afri-cream-100 dark:bg-afri-earth-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <h1 className="font-display text-3xl font-bold text-afri-brown-700 dark:text-afri-cream-200 mb-8">
          Checkout
        </h1>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {[
            { num: 1, label: 'Pickup Time' },
            { num: 2, label: 'Your Details' },
            { num: 3, label: 'Confirm' }
          ].map((s, i) => (
            <div key={s.num} className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                  step >= s.num
                    ? 'bg-afri-terracotta-500 text-white'
                    : 'bg-afri-earth-200 dark:bg-afri-earth-600 text-afri-earth-500'
                }`}
              >
                {step > s.num ? <Check className="w-5 h-5" /> : s.num}
              </div>
              <span
                className={`hidden sm:block ml-2 text-sm ${
                  step >= s.num
                    ? 'text-afri-brown-700 dark:text-afri-cream-200 font-medium'
                    : 'text-afri-earth-500'
                }`}
              >
                {s.label}
              </span>
              {i < 2 && (
                <div
                  className={`w-12 sm:w-24 h-0.5 mx-2 sm:mx-4 ${
                    step > s.num ? 'bg-afri-terracotta-500' : 'bg-afri-earth-200 dark:bg-afri-earth-600'
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Pickup Time */}
          {step === 1 && (
            <div className="bg-white dark:bg-afri-earth-700 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="w-5 h-5 text-afri-terracotta-500" />
                <h2 className="font-semibold text-lg text-afri-brown-700 dark:text-afri-cream-200">
                  Select Pickup Date & Time
                </h2>
              </div>

              {/* Date Selection */}
              <div className="mb-6">
                <label className="label">Pickup Date</label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {next14Days.map(date => (
                    <button
                      key={date.toISOString()}
                      type="button"
                      onClick={() => setSelectedDate(date)}
                      className={`p-3 rounded-lg text-center transition-colors ${
                        selectedDate && isSameDay(date, selectedDate)
                          ? 'bg-afri-terracotta-500 text-white'
                          : 'bg-afri-cream-200 dark:bg-afri-earth-600 hover:bg-afri-cream-300 dark:hover:bg-afri-earth-500'
                      }`}
                    >
                      <div className="text-xs font-medium text-afri-earth-500 dark:text-afri-cream-400">
                        {format(date, 'EEE')}
                      </div>
                      <div className="text-sm font-semibold text-afri-brown-700 dark:text-afri-cream-200">
                        {format(date, 'd')}
                      </div>
                      <div className="text-xs text-afri-earth-500 dark:text-afri-cream-400">
                        {format(date, 'MMM')}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div>
                  <label className="label">Pickup Time</label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {timeSlots.map(time => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`flex items-center justify-center gap-2 p-3 rounded-lg transition-colors ${
                          selectedTime === time
                            ? 'bg-afri-terracotta-500 text-white'
                            : 'bg-afri-cream-200 dark:bg-afri-earth-600 hover:bg-afri-cream-300 dark:hover:bg-afri-earth-500'
                        }`}
                      >
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-medium text-afri-brown-700 dark:text-afri-cream-200">
                          {time}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <div className="bg-white dark:bg-afri-earth-700 rounded-xl p-6 space-y-6">
              {/* Pickup Summary */}
              <div className="bg-afri-terracotta-50 dark:bg-afri-terracotta-900/20 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-afri-terracotta-500" />
                  <span className="font-medium text-afri-brown-700 dark:text-afri-cream-200">
                    {selectedDate && format(selectedDate, 'EEEE, MMMM d, yyyy')}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-afri-earth-600 dark:text-afri-cream-400">
                  <Clock className="w-4 h-4" />
                  <span>Pickup at {selectedTime}</span>
                </div>
              </div>

              <div className="text-afri-brown-700 dark:text-afri-cream-200 font-medium mb-4">
                Your Information
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="label">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="input"
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="label">Order Notes (Optional)</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="input min-h-[100px]"
                    placeholder="Any special requests or instructions..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Confirm */}
          {step === 3 && (
            <div className="bg-white dark:bg-afri-earth-700 rounded-xl p-6 space-y-6">
              <h2 className="font-semibold text-lg text-afri-brown-700 dark:text-afri-cream-200">
                Review Your Order
              </h2>

              {/* Order Items */}
              <div className="space-y-3">
                {items.map(item => (
                  <div key={item.product.id} className="flex justify-between items-center pb-3 border-b border-afri-earth-200 dark:border-afri-earth-600">
                    <div>
                      <span className="font-medium text-afri-brown-700 dark:text-afri-cream-200">
                        {item.product.name}
                      </span>
                      <span className="text-afri-earth-500 dark:text-afri-cream-400 ml-2">
                        x{item.quantity}
                      </span>
                    </div>
                    <span className="font-medium text-afri-brown-700 dark:text-afri-cream-200">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Pickup Details */}
              <div className="bg-afri-cream-200 dark:bg-afri-earth-600 rounded-lg p-4">
                <h3 className="font-medium text-afri-brown-700 dark:text-afri-cream-200 mb-2">
                  Pickup Details
                </h3>
                <p className="text-afri-earth-600 dark:text-afri-cream-400">
                  {selectedDate && format(selectedDate, 'EEEE, MMMM d, yyyy')}
                  <br />
                  Time: {selectedTime}
                </p>
              </div>

              {/* Customer Details */}
              <div className="bg-afri-cream-200 dark:bg-afri-earth-600 rounded-lg p-4">
                <h3 className="font-medium text-afri-brown-700 dark:text-afri-cream-200 mb-2">
                  Contact Information
                </h3>
                <p className="text-afri-earth-600 dark:text-afri-cream-400">
                  {formData.name}
                  <br />
                  {formData.email}
                  <br />
                  {formData.phone}
                </p>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center text-lg border-t border-afri-earth-200 dark:border-afri-earth-600 pt-4">
                <span className="font-semibold text-afri-brown-700 dark:text-afri-cream-200">
                  Total
                </span>
                <span className="font-bold text-afri-brown-700 dark:text-afri-cream-200">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center pt-4">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex items-center text-afri-earth-600 dark:text-afri-cream-400 hover:text-afri-terracotta-500"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                Back
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                disabled={(step === 1 && (!selectedDate || !selectedTime)) || (step === 2 && (!formData.name || !formData.email || !formData.phone))}
                className="btn-primary ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary ml-auto disabled:opacity-50"
              >
                {isSubmitting ? 'Placing Order...' : 'Place Order'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
