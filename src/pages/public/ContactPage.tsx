import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-afri-cream-100 dark:bg-afri-earth-800">
      <div className="bg-afri-brown-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-afri-cream-100 mb-4">
            Contact Us
          </h1>
          <p className="text-afri-cream-300 max-w-2xl">
            Have a question or want to place a custom order? We'd love to hear from you.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-white dark:bg-afri-earth-700 rounded-xl p-6">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-afri-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-afri-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="font-display text-2xl font-bold text-afri-brown-700 dark:text-afri-cream-200 mb-2">
                  Thank You!
                </h2>
                <p className="text-afri-earth-600 dark:text-afri-cream-400 mb-6">
                  We've received your message and will get back to you soon.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false)
                    setFormData({ name: '', email: '', subject: '', message: '' })
                  }}
                  className="btn-outline"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label" htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="input"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="label" htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="input"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="label" htmlFor="subject">Subject</label>
                  <select
                    id="subject"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    className="input"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="order">Order Inquiry</option>
                    <option value="custom">Custom Order Request</option>
                    <option value="catering">Catering Request</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="label" htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="input min-h-[150px]"
                    placeholder="How can we help you?"
                    required
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-afri-earth-700 rounded-xl p-6">
              <h2 className="font-display text-xl font-bold text-afri-brown-700 dark:text-afri-cream-200 mb-6">
                Contact Information
              </h2>
              <div className="space-y-4">
                <AddressInfo
                  icon="location"
                  label="Address"
                  value="123 Bakery Lane, African Quarter, City 12345"
                />
                <AddressInfo
                  icon="phone"
                  label="Phone"
                  value="+1 (555) 123-4567"
                />
                <AddressInfo
                  icon="email"
                  label="Email"
                  value="hello@afribake.com"
                />
              </div>
            </div>

            <div className="bg-white dark:bg-afri-earth-700 rounded-xl p-6">
              <h2 className="font-display text-xl font-bold text-afri-brown-700 dark:text-afri-cream-200 mb-6">
                Opening Hours
              </h2>
              <div className="space-y-3 text-afri-earth-600 dark:text-afri-cream-400">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>7:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>9:00 AM - 5:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AddressInfo({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-lg bg-afri-terracotta-50 dark:bg-afri-terracotta-900/30 flex items-center justify-center flex-shrink-0">
        {icon === 'location' && (
          <svg className="w-5 h-5 text-afri-terracotta-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        )}
        {icon === 'phone' && (
          <svg className="w-5 h-5 text-afri-terracotta-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        )}
        {icon === 'email' && (
          <svg className="w-5 h-5 text-afri-terracotta-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        )}
      </div>
      <div>
        <p className="text-sm text-afri-earth-500 dark:text-afri-cream-400">{label}</p>
        <p className="text-afri-brown-700 dark:text-afri-cream-200">{value}</p>
      </div>
    </div>
  )
}
