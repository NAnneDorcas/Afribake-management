import { Link } from 'react-router-dom'
import { ArrowRight, Clock, MapPin, Phone, Truck } from 'lucide-react'
import { products, categories, testimonials } from '../../data/products'

export default function HomePage() {
  const featuredProducts = products.slice(0, 6)

  return (
    <div className="bg-afri-cream-100 dark:bg-afri-earth-800">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.pexels.com/photos/461429/pexels-photo-461429.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="African pastries"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-afri-brown-800/90 via-afri-brown-800/70 to-afri-brown-800/30"></div>
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-afri-cream-100 mb-6 leading-tight">
              Taste Africa,
              <br />
              <span className="text-afri-gold-400">Freshly Baked</span>
            </h1>
            <p className="text-lg sm:text-xl text-afri-cream-200 mb-8 leading-relaxed">
              Authentic African breads, pastries and desserts handcrafted daily with love and tradition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/shop" className="btn-primary text-center">
                Shop Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/shop?pickup=true" className="btn-outline border-afri-cream-200 text-afri-cream-200 hover:bg-afri-cream-100 hover:text-afri-brown-800 text-center">
                Order For Pickup
              </Link>
            </div>
          </div>
        </div>

        {/* Features Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-afri-brown-900/90 backdrop-blur-sm border-t border-afri-brown-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-3">
                <Truck className="w-5 h-5 text-afri-gold-400" />
                <span className="text-sm text-afri-cream-200">Easy Pickup</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-afri-gold-400" />
                <span className="text-sm text-afri-cream-200">Fresh Daily</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-afri-gold-400" />
                <span className="text-sm text-afri-cream-200">Local Bakery</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-afri-gold-400" />
                <span className="text-sm text-afri-cream-200">Custom Orders</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-afri-brown-700 dark:text-afri-cream-200 mb-4">
              Featured Products
            </h2>
            <p className="text-afri-earth-600 dark:text-afri-cream-400 max-w-2xl mx-auto">
              Discover our most loved African pastries and breads, made fresh every morning.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/shop" className="btn-secondary">
              View All Products
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 md:py-24 bg-afri-cream-200 dark:bg-afri-earth-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-afri-brown-700 dark:text-afri-cream-200 mb-4">
              Our Categories
            </h2>
            <p className="text-afri-earth-600 dark:text-afri-cream-400 max-w-2xl mx-auto">
              Explore our range of authentic African baked goods.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.slice(0, 5).map(category => (
              <Link
                key={category.id}
                to={`/shop?category=${category.id}`}
                className="group relative overflow-hidden rounded-xl aspect-[4/3]"
              >
                <img
                  src={category.image_url}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-afri-brown-900/80 via-afri-brown-900/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-xl font-bold text-afri-cream-100 mb-1">
                    {category.name}
                  </h3>
                  <p className="text-afri-cream-300 text-sm">
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-afri-brown-700 dark:text-afri-cream-200 mb-6">
                A Taste of Home,
                <br />
                Made With Love
              </h2>
              <div className="space-y-4 text-afri-earth-600 dark:text-afri-cream-400">
                <p>
                  AfriBake was born from a passion to share the authentic flavors of African baking with our community.
                  Our recipes have been passed down through generations, bringing the warmth and richness of African
                  culinary traditions to every bite.
                </p>
                <p>
                  Each product is handcrafted using traditional methods and the finest ingredients. From the
                  perfectly golden puff puff to our celebration cakes adorned with African-inspired decorations,
                  every item tells a story of heritage and craft.
                </p>
                <p>
                  Whether you're craving a nostalgic taste of home or discovering these flavors for the first time,
                  we welcome you to experience the warmth of African hospitality through our baked goods.
                </p>
              </div>
              <Link to="/about" className="inline-flex items-center text-afri-terracotta-500 font-medium mt-6 hover:text-afri-terracotta-600">
                Learn More About Us
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="AfriBake bakery"
                  className="rounded-xl shadow-xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-afri-terracotta-500 text-white p-6 rounded-xl shadow-lg">
                  <p className="text-3xl font-bold">5+</p>
                  <p className="text-sm">Years of Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-afri-brown-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-afri-cream-200 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-afri-cream-400 max-w-2xl mx-auto">
              Join thousands of happy customers who have made AfriBake their go-to bakery.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(testimonial => (
              <div
                key={testimonial.id}
                className="bg-afri-brown-700/50 backdrop-blur-sm rounded-xl p-6"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-afri-gold-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-afri-cream-300 mb-4 text-sm leading-relaxed">
                  "{testimonial.comment}"
                </p>
                <p className="text-afri-cream-100 font-medium">
                  {testimonial.customer_name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src="https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Fresh bread"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-afri-brown-800/90 to-afri-brown-800/50 flex items-center">
              <div className="max-w-xl px-8">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-afri-cream-100 mb-4">
                  Ready to Order?
                </h2>
                <p className="text-afri-cream-200 mb-6">
                  Experience the taste of authentic African baking. Order online and pick up at your convenience.
                </p>
                <Link to="/shop" className="btn-primary">
                  Start Shopping
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Product Card Component
function ProductCard({ product }: { product: typeof products[0] }) {
  return (
    <div className="card group">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          {product.same_day_available && (
            <span className="bg-afri-terracotta-500 text-white text-xs font-medium px-2 py-1 rounded">
              Same Day
            </span>
          )}
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs font-medium text-afri-terracotta-500 uppercase tracking-wide mb-1">
          {product.category.replace('-', ' ')}
        </p>
        <h3 className="font-display text-lg font-semibold text-afri-brown-700 dark:text-afri-cream-200 mb-1">
          {product.name}
        </h3>
        <p className="text-sm text-afri-earth-500 dark:text-afri-cream-400 mb-3 line-clamp-2">
          {product.short_description}
        </p>
        <div className="flex items-center justify-between">
          <p className="font-semibold text-afri-brown-700 dark:text-afri-cream-200">
            ${product.price.toFixed(2)}
          </p>
          <Link
            to={`/product/${product.slug}`}
            className="text-sm font-medium text-afri-terracotta-500 hover:text-afri-terracotta-600 flex items-center"
          >
            View
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}
