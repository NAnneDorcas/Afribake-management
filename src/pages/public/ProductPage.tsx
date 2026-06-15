import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShoppingCart, Minus, Plus, ArrowLeft, Clock, AlertTriangle } from 'lucide-react'
import { products } from '../../data/products'
import { useCart } from '../../contexts/CartContext'

export default function ProductPage() {
  const { slug } = useParams()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  const product = products.find(p => p.slug === slug)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-afri-cream-100 dark:bg-afri-earth-800">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-afri-brown-700 dark:text-afri-cream-200 mb-4">
            Product Not Found
          </h1>
          <Link to="/shop" className="btn-primary">
            Back to Shop
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
  }

  const incrementQuantity = () => setQuantity(prev => prev + 1)
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1))

  const earliestPickup = product.same_day_available
    ? 'Available today'
    : product.preparation_lead_time >= 48
    ? 'Available in 48+ hours'
    : 'Available in 24+ hours'

  return (
    <div className="min-h-screen bg-afri-cream-100 dark:bg-afri-earth-800">
      {/* Breadcrumb */}
      <div className="bg-afri-cream-200 dark:bg-afri-earth-700 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/shop"
            className="inline-flex items-center text-sm text-afri-earth-600 dark:text-afri-cream-400 hover:text-afri-terracotta-500"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shop
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                {product.same_day_available && (
                  <span className="bg-afri-terracotta-500 text-white text-sm font-medium px-3 py-1 rounded-full">
                    Same Day Pickup
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-afri-terracotta-500 uppercase tracking-wide mb-2">
                {product.category.replace('-', ' ')}
              </p>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-afri-brown-700 dark:text-afri-cream-200 mb-3">
                {product.name}
              </h1>
              <p className="text-2xl font-semibold text-afri-brown-600 dark:text-afri-gold-400">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <p className="text-afri-earth-600 dark:text-afri-cream-400 leading-relaxed">
              {product.description}
            </p>

            {/* Pickup Info */}
            <div className="flex items-center gap-3 p-4 rounded-lg bg-afri-cream-200 dark:bg-afri-earth-700">
              <Clock className="w-5 h-5 text-afri-terracotta-500" />
              <div>
                <p className="text-sm font-medium text-afri-brown-700 dark:text-afri-cream-200">
                  {earliestPickup}
                </p>
                <p className="text-xs text-afri-earth-500 dark:text-afri-cream-400">
                  {product.same_day_available
                    ? 'Order before 2pm for same-day pickup'
                    : `Requires ${product.preparation_lead_time} hours notice`}
                </p>
              </div>
            </div>

            {/* Ingredients */}
            <div>
              <h3 className="font-medium text-afri-brown-700 dark:text-afri-cream-200 mb-2">
                Ingredients
              </h3>
              <p className="text-sm text-afri-earth-600 dark:text-afri-cream-400">
                {product.ingredients.join(', ')}
              </p>
            </div>

            {/* Allergens */}
            {product.allergens.length > 0 && (
              <div className="flex items-start gap-3 p-4 rounded-lg bg-afri-gold-100 dark:bg-afri-gold-900/20 border border-afri-gold-200 dark:border-afri-gold-700">
                <AlertTriangle className="w-5 h-5 text-afri-gold-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-afri-brown-700 dark:text-afri-cream-200">
                    Contains Allergens
                  </p>
                  <p className="text-xs text-afri-earth-600 dark:text-afri-cream-400 mt-1">
                    {product.allergens.join(', ')}
                  </p>
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-afri-earth-200 dark:border-afri-earth-600 rounded-lg">
                <button
                  onClick={decrementQuantity}
                  className="p-3 hover:bg-afri-cream-200 dark:hover:bg-afri-earth-600 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium text-afri-brown-700 dark:text-afri-cream-200">
                  {quantity}
                </span>
                <button
                  onClick={incrementQuantity}
                  className="p-3 hover:bg-afri-cream-200 dark:hover:bg-afri-earth-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 btn-primary"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </button>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center pt-4 border-t border-afri-earth-200 dark:border-afri-earth-700">
              <span className="text-afri-earth-600 dark:text-afri-cream-400">Total:</span>
              <span className="text-xl font-semibold text-afri-brown-700 dark:text-afri-cream-200">
                ${(product.price * quantity).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
