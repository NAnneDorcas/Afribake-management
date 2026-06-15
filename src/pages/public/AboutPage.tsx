import { MapPin, Phone, Mail } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-afri-cream-100 dark:bg-afri-earth-800">
      {/* Hero */}
      <div className="relative h-80">
        <img
          src="https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="AfriBake bakery"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-afri-brown-900/80 to-afri-brown-900/40 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-afri-cream-100 mb-4">
              Our Story
            </h1>
            <p className="text-xl text-afri-cream-200 max-w-2xl">
              Sharing the taste of Africa, one pastry at a time.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Story */}
          <div className="space-y-6">
            <h2 className="font-display text-3xl font-bold text-afri-brown-700 dark:text-afri-cream-200">
              From Grandma's Kitchen to Yours
            </h2>
            <p className="text-afri-earth-600 dark:text-afri-cream-400 leading-relaxed">
              AfriBake was born in 2019 when our founder Amara missed the taste of home.
              Growing up in Nigeria, she learned to bake from her grandmother, masterin g
              perfect puff puff and flaky meat pies.
            </p>
            <p className="text-afri-earth-600 dark:text-afri-cream-400 leading-relaxed">
              What started as sharing treats with friends grew into a passion for bringing
              authentic African baking to our community. Every recipe honors our heritage
              while celebrating our new home.
            </p>
            <p className="text-afri-earth-600 dark:text-afri-cream-400 leading-relaxed">
              Today, AfriBake serves hundreds of customers weekly, from those craving a
              nostalgic taste of home to those discovering African pastries for the first time.
            </p>
          </div>

          {/* Values */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-afri-earth-700 rounded-xl p-6">
              <h3 className="font-display text-xl font-semibold text-afri-brown-700 dark:text-afri-cream-200 mb-4">
                Our Values
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-afri-terracotta-100 dark:bg-afri-terracotta-900/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg text-afri-terracotta-500">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-afri-brown-700 dark:text-afri-cream-200">
                      Authenticity
                    </h4>
                    <p className="text-sm text-afri-earth-600 dark:text-afri-cream-400">
                      Traditional recipes, real ingredients, made with care.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-afri-terracotta-100 dark:bg-afri-terracotta-900/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg text-afri-terracotta-500">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-afri-brown-700 dark:text-afri-cream-200">
                      Quality
                    </h4>
                    <p className="text-sm text-afri-earth-600 dark:text-afri-cream-400">
                      Fresh ingredients, handcrafted daily, never compromised.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-afri-terracotta-100 dark:bg-afri-terracotta-900/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg text-afri-terracotta-500">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-afri-brown-700 dark:text-afri-cream-200">
                      Community
                    </h4>
                    <p className="text-sm text-afri-earth-600 dark:text-afri-cream-400">
                      Bringing people together through the love of food.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-afri-terracotta-50 dark:bg-afri-terracotta-900/20 rounded-xl p-6">
              <h3 className="font-display text-xl font-semibold text-afri-brown-700 dark:text-afri-cream-200 mb-4">
                Visit Us
              </h3>
              <div className="space-y-3 text-afri-earth-600 dark:text-afri-cream-400">
                <p className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-afri-terracotta-500" />
                  123 Bakery Lane, African Quarter, City 12345
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-afri-terracotta-500" />
                  +1 (555) 123-4567
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-afri-terracotta-500" />
                  hello@afribake.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
