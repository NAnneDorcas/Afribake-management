import { Link } from 'react-router-dom'
import { ShoppingCart, Eye, ArrowRight } from 'lucide-react'
import { products } from '../../data/products'
import { useCart } from '../../contexts/CartContext'

interface ProductCardProps {
  product: typeof products[0]
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart(product, 1)
  }

  return (
    <div className="card group">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.same_day_available && (
            <span className="bg-afri-terracotta-500 text-white text-xs font-medium px-2 py-1 rounded">
              Same Day
            </span>
          )}
          {!product.same_day_available && product.preparation_lead_time >= 24 && (
            <span className="bg-afri-brown-700 text-white text-xs font-medium px-2 py-1 rounded">
              {product.preparation_lead_time >= 48 ? '48hr Notice' : '24hr Notice'}
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link
            to={`/product/${product.slug}`}
            className="p-2 bg-white/90 rounded-lg hover:bg-white shadow-sm"
          >
            <Eye className="w-5 h-5 text-afri-brown-700" />
          </Link>
          <button
            onClick={handleAddToCart}
            className="p-2 bg-afri-terracotta-500 rounded-lg hover:bg-afri-terracotta-600 shadow-sm"
          >
            <ShoppingCart className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <p className="text-xs font-medium text-afri-terracotta-500 uppercase tracking-wide mb-1">
          {product.category.replace('-', ' ')}
        </p>
        <h3 className="font-display text-lg font-semibold text-afri-brown-700 dark:text-afri-cream-200 mb-1">
          <Link to={`/product/${product.slug}`} className="hover:text-afri-terracotta-500 transition-colors">
            {product.name}
          </Link>
        </h3>
        <p className="text-sm text-afri-earth-500 dark:text-afri-cream-400 mb-3 line-clamp-2">
          {product.short_description}
        </p>
        <div className="flex items-center justify-between">
          <p className="font-semibold text-lg text-afri-brown-700 dark:text-afri-cream-200">
            ${product.price.toFixed(2)}
          </p>
          <Link
            to={`/product/${product.slug}`}
            className="text-sm font-medium text-afri-terracotta-500 hover:text-afri-terracotta-600 flex items-center"
          >
            Details
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}
