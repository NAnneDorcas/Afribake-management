import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'
import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer className="bg-afri-brown-800 text-afri-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-display text-2xl font-bold text-afri-cream-100">
              AfriBake
            </h3>
            <p className="text-afri-cream-300 text-sm">
              Authentic African breads, pastries and desserts handcrafted daily with love and tradition.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-afri-cream-100">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/shop" className="text-afri-cream-300 hover:text-afri-gold-400 text-sm transition-colors">
                Shop
              </Link>
              <Link to="/about" className="text-afri-cream-300 hover:text-afri-gold-400 text-sm transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="text-afri-cream-300 hover:text-afri-gold-400 text-sm transition-colors">
                Contact
              </Link>
              <Link to="/account" className="text-afri-cream-300 hover:text-afri-gold-400 text-sm transition-colors">
                My Account
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-afri-cream-100 mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 mt-0.5 text-afri-gold-400 flex-shrink-0" />
                <span className="text-afri-cream-300">123 Bakery Lane, African Quarter, City 12345</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-afri-gold-400 flex-shrink-0" />
                <span className="text-afri-cream-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-afri-gold-400 flex-shrink-0" />
                <span className="text-afri-cream-300">hello@afribake.com</span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="space-y-4">
            <h4 className="font-semibold text-afri-cream-100">Opening Hours</h4>
            <ul className="space-y-2 text-sm text-afri-cream-300">
              <li className="flex justify-between">
                <span>Mon - Fri</span>
                <span>7:00 AM - 7:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span>8:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>9:00 AM - 5:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-afri-brown-700">
          <div className="max-w-md mx-auto text-center">
            <h4 className="font-semibold text-afri-cream-100 mb-4">
              Subscribe to Our Newsletter
            </h4>
            {subscribed ? (
              <p className="text-afri-gold-400 text-sm">Thank you for subscribing!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg bg-afri-brown-700 border border-afri-brown-600 text-afri-cream-200 placeholder-afri-cream-400 focus:ring-2 focus:ring-afri-gold-400 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-afri-gold-500 text-afri-brown-800 font-medium rounded-lg hover:bg-afri-gold-400 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-afri-brown-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex space-x-4">
            <a href="#" className="p-2 rounded-full bg-afri-brown-700 hover:bg-afri-brown-600 transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 rounded-full bg-afri-brown-700 hover:bg-afri-brown-600 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 rounded-full bg-afri-brown-700 hover:bg-afri-brown-600 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
          <p className="text-sm text-afri-cream-400">
            © {new Date().getFullYear()} AfriBake. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
