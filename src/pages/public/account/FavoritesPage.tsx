import { Link } from 'react-router-dom'
import { Heart, Trash2 } from 'lucide-react'
import { products } from '../../../data/products'

const mockFavorites = products.slice(0, 4)

export default function FavoritesPage() {
  return (
    <div className="bg-white dark:bg-afri-earth-700 rounded-xl p-6">
      <h2 className="font-display text-xl font-bold text-afri-brown-700 dark:text-afri-cream-200 mb-6">
        Favorites
      </h2>

      {mockFavorites.length === 0 ? (
        <div className="text-center py-8">
          <Heart className="w-12 h-12 text-afri-earth-400 mx-auto mb-4" />
          <p className="text-afri-earth-600 dark:text-afri-cream-400 mb-4">
            No favorites yet.
          </p>
          <Link to="/shop" className="btn-primary">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {mockFavorites.map(product => (
            <div
              key={product.id}
              className="flex gap-4 p-4 border border-afri-earth-200 dark:border-afri-earth-600 rounded-lg"
            >
              <img
                src={product.image_url}
                alt={product.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <Link
                  to={`/product/${product.slug}`}
                  className="font-medium text-afri-brown-700 dark:text-afri-cream-200 hover:text-afri-terracotta-500"
                >
                  {product.name}
                </Link>
                <p className="text-sm text-afri-earth-500 dark:text-afri-cream-400 mt-1">
                  ${product.price.toFixed(2)}
                </p>
              </div>
              <button className="p-2 text-afri-earth-400 hover:text-afri-terracotta-500">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
