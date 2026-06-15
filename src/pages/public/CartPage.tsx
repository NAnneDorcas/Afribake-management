import { Link } from 'react-router-dom'
import { ShoppingCart, Minus, Plus, Trash2, ArrowRight } from 'lucide-react'
import { useCart } from '../../contexts/CartContext'

export default function CartPage() {
  const { items, total, updateQuantity, removeFromCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-afri-cream-100 dark:bg-afri-earth-800 px-4">
        <ShoppingCart className="w-16 h-16 text-afri-earth-400 mb-4" />
        <h1 className="font-display text-2xl font-bold text-afri-brown-700 dark:text-afri-cream-200 mb-4">
          Your Cart is Empty
        </h1>
        <p className="text-afri-earth-600 dark:text-afri-cream-400 mb-6 text-center">
          Looks like you haven't added any products yet.
        </p>
        <Link to="/shop" className="btn-primary">
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-afri-cream-100 dark:bg-afri-earth-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-display text-3xl font-bold text-afri-brown-700 dark:text-afri-cream-200 mb-8">
          Shopping Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <div
                key={item.product.id}
                className="bg-white dark:bg-afri-earth-700 rounded-xl p-4 flex gap-4"
              >
                <img
                  src={item.product.image_url}
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold text-afri-brown-700 dark:text-afri-cream-200">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-afri-earth-500 dark:text-afri-cream-400">
                        ${item.product.price.toFixed(2)} each
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 text-afri-earth-400 hover:text-afri-terracotta-500"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-afri-earth-200 dark:border-afri-earth-600 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-2 hover:bg-afri-cream-200 dark:hover:bg-afri-earth-600 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center font-medium text-afri-brown-700 dark:text-afri-cream-200">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-2 hover:bg-afri-cream-200 dark:hover:bg-afri-earth-600 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="font-semibold text-afri-brown-700 dark:text-afri-cream-200">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-afri-earth-700 rounded-xl p-6 sticky top-24">
              <h2 className="font-display text-xl font-bold text-afri-brown-700 dark:text-afri-cream-200 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-afri-earth-600 dark:text-afri-cream-400">
                  <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-afri-earth-600 dark:text-afri-cream-400">
                  <span>Pickup</span>
                  <span className="text-afri-terracotta-500 font-medium">Free</span>
                </div>
                <div className="h-px bg-afri-earth-200 dark:bg-afri-earth-600"></div>
                <div className="flex justify-between text-lg font-semibold text-afri-brown-700 dark:text-afri-cream-200">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="btn-primary w-full"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>

              <Link
                to="/shop"
                className="block text-center text-sm text-afri-terracotta-500 hover:text-afri-terracotta-600 mt-4"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
