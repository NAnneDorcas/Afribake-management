import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Trash2, ShoppingCart } from 'lucide-react'
import { useCustomer } from '../../../contexts/AuthContext'
import { useFavorites } from '../../../lib/orders'
import { supabase } from '../../../lib/supabase'
import { useCart } from '../../../contexts/CartContext'

interface Product {
  id: string
  name: string
  slug: string
  price: number
  image_url: string
}

export default function FavoritesPage() {
  const { user } = useCustomer()
  const { favorites, isLoading, fetchFavorites, removeFavorite } = useFavorites()
  const { addToCart } = useCart()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchFavorites(user.id)
    }
  }, [user])

  useEffect(() => {
    const fetchProducts = async () => {
      if (favorites.length === 0) {
        setProducts([])
        setLoading(false)
        return
      }

      try {
        const { data, error } = await supabase
          .from('products')
          .select('id, name, slug, price, image_url')
          .in('id', favorites)

        if (error) throw error
        setProducts(data || [])
      } catch (err) {
        console.error('Error fetching products:', err)
      } finally {
        setLoading(false)
      }
    }

    if (!isLoading) {
      fetchProducts()
    }
  }, [favorites, isLoading])

  const handleRemove = async (productId: string) => {
    if (!user) return
    try {
      await removeFavorite(user.id, productId)
      setProducts(prev => prev.filter(p => p.id !== productId))
    } catch (err) {
      console.error('Error removing favorite:', err)
    }
  }

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image_url: product.image_url,
      description: '',
      short_description: '',
      category: 'african-pastries',
      ingredients: [],
      allergens: [],
      preparation_lead_time: 0,
      same_day_available: true,
      is_active: true,
      created_at: ''
    }, 1)
  }

  if (isLoading || loading) {
    return (
      <div className="bg-white dark:bg-afri-earth-700 rounded-xl p-6">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-afri-terracotta-500"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-afri-earth-700 rounded-xl p-6">
      <h2 className="font-display text-xl font-bold text-afri-brown-700 dark:text-afri-cream-200 mb-6">
        Favorites
      </h2>

      {products.length === 0 ? (
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
          {products.map(product => (
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
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="p-2 text-afri-earth-400 hover:text-afri-terracotta-500 rounded-lg hover:bg-afri-cream-200 dark:hover:bg-afri-earth-600"
                  title="Add to cart"
                >
                  <ShoppingCart className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleRemove(product.id)}
                  className="p-2 text-afri-earth-400 hover:text-red-500 rounded-lg hover:bg-afri-cream-200 dark:hover:bg-afri-earth-600"
                  title="Remove from favorites"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
