import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { products, categories } from '../../data/products'
import ProductCard from '../../components/public/ProductCard'

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const categoryParam = searchParams.get('category') || ''
  const searchQuery = searchParams.get('search') || ''
  const priceRange = searchParams.get('price') || ''

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (!product.is_active) return false

      if (categoryParam && product.category !== categoryParam) return false

      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        if (
          !product.name.toLowerCase().includes(query) &&
          !product.description.toLowerCase().includes(query) &&
          !product.short_description.toLowerCase().includes(query)
        ) {
          return false
        }
      }

      if (priceRange) {
        const [min, max] = priceRange.split('-').map(Number)
        if (product.price < min || product.price > max) return false
      }

      return true
    })
  }, [categoryParam, searchQuery, priceRange])

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams)
    if (value) {
      newParams.set(key, value)
    } else {
      newParams.delete(key)
    }
    setSearchParams(newParams)
  }

  const clearFilters = () => {
    setSearchParams({})
  }

  return (
    <div className="min-h-screen bg-afri-cream-100 dark:bg-afri-earth-800">
      {/* Header */}
      <div className="bg-afri-brown-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-afri-cream-100 mb-4">
            Our Products
          </h1>
          <p className="text-afri-cream-300 max-w-2xl">
            Explore our collection of authentic African breads, pastries, and desserts.
            All items are made fresh daily with traditional recipes and the finest ingredients.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-afri-earth-500" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={e => updateFilter('search', e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-afri-earth-200 dark:border-afri-earth-600 bg-white dark:bg-afri-earth-700 text-afri-earth-700 dark:text-afri-cream-200 focus:ring-2 focus:ring-afri-terracotta-300 focus:outline-none"
            />
          </div>

          {/* Filter Toggle (Mobile) */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="sm:hidden flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-afri-earth-200 dark:border-afri-earth-600 bg-white dark:bg-afri-earth-700"
          >
            <SlidersHorizontal className="w-5 h-5" />
            Filters
          </button>

          {/* Desktop Filters */}
          <div className="hidden sm:flex gap-3">
            {/* Category Filter */}
            <select
              value={categoryParam}
              onChange={e => updateFilter('category', e.target.value)}
              className="px-4 py-3 rounded-lg border border-afri-earth-200 dark:border-afri-earth-600 bg-white dark:bg-afri-earth-700 text-afri-earth-700 dark:text-afri-cream-200 focus:ring-2 focus:ring-afri-terracotta-300 focus:outline-none"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* Price Filter */}
            <select
              value={priceRange}
              onChange={e => updateFilter('price', e.target.value)}
              className="px-4 py-3 rounded-lg border border-afri-earth-200 dark:border-afri-earth-600 bg-white dark:bg-afri-earth-700 text-afri-earth-700 dark:text-afri-cream-200 focus:ring-2 focus:ring-afri-terracotta-300 focus:outline-none"
            >
              <option value="">All Prices</option>
              <option value="0-5">Under $5</option>
              <option value="5-10">$5 - $10</option>
              <option value="10-50">$10 - $50</option>
              <option value="50-500">$50+</option>
            </select>
          </div>
        </div>

        {/* Mobile Filters Panel */}
        {isFilterOpen && (
          <div className="sm:hidden mb-6 p-4 rounded-lg bg-white dark:bg-afri-earth-700 border border-afri-earth-200 dark:border-afri-earth-600">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-afri-brown-700 dark:text-afri-cream-200">
                Filters
              </h3>
              <button onClick={() => setIsFilterOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="label">Category</label>
                <select
                  value={categoryParam}
                  onChange={e => updateFilter('category', e.target.value)}
                  className="input"
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">Price Range</label>
                <select
                  value={priceRange}
                  onChange={e => updateFilter('price', e.target.value)}
                  className="input"
                >
                  <option value="">All Prices</option>
                  <option value="0-5">Under $5</option>
                  <option value="5-10">$5 - $10</option>
                  <option value="10-50">$10 - $50</option>
                  <option value="50-500">$50+</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Active Filters */}
        {(categoryParam || searchQuery || priceRange) && (
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-sm text-afri-earth-500 dark:text-afri-cream-400">
              Active filters:
            </span>
            {categoryParam && (
              <button
                onClick={() => updateFilter('category', '')}
                className="inline-flex items-center gap-1 px-3 py-1 bg-afri-terracotta-100 dark:bg-afri-terracotta-900/30 text-afri-terracotta-600 dark:text-afri-terracotta-400 text-sm rounded-full"
              >
                {categories.find(c => c.id === categoryParam)?.name}
                <X className="w-3 h-3" />
              </button>
            )}
            {searchQuery && (
              <button
                onClick={() => updateFilter('search', '')}
                className="inline-flex items-center gap-1 px-3 py-1 bg-afri-terracotta-100 dark:bg-afri-terracotta-900/30 text-afri-terracotta-600 dark:text-afri-terracotta-400 text-sm rounded-full"
              >
                "{searchQuery}"
                <X className="w-3 h-3" />
              </button>
            )}
            {priceRange && (
              <button
                onClick={() => updateFilter('price', '')}
                className="inline-flex items-center gap-1 px-3 py-1 bg-afri-terracotta-100 dark:bg-afri-terracotta-900/30 text-afri-terracotta-600 dark:text-afri-terracotta-400 text-sm rounded-full"
              >
                ${priceRange.split('-')[0]} - ${priceRange.split('-')[1]}
                <X className="w-3 h-3" />
              </button>
            )}
            <button
              onClick={clearFilters}
              className="text-sm text-afri-earth-500 hover:text-afri-terracotta-500"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Results Count */}
        <p className="text-sm text-afri-earth-500 dark:text-afri-cream-400 mb-6">
          {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
        </p>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-afri-earth-500 dark:text-afri-cream-400 mb-4">
              No products found matching your criteria.
            </p>
            <button
              onClick={clearFilters}
              className="btn-outline"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
