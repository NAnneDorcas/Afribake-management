import { Product, Category, Testimonial } from '../types'

export const categories: Category[] = [
  {
    id: 'african-pastries',
    name: 'African Pastries',
    description: 'Traditional fried and baked treats',
    image_url: 'https://images.pexels.com/photos/461429/pexels-photo-461429.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'african-breads',
    name: 'African Breads',
    description: 'Freshly baked artisanal breads',
    image_url: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'desserts',
    name: 'Desserts',
    description: 'Sweet African-inspired treats',
    image_url: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'event-catering',
    name: 'Event Catering',
    description: 'Perfect for your special occasions',
    image_url: 'https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'celebration-cakes',
    name: 'Celebration Cakes',
    description: 'Custom cakes for celebrations',
    image_url: 'https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
]

export const products: Product[] = [
  {
    id: '1',
    name: 'Puff Puff',
    slug: 'puff-puff',
    description: 'Traditional Nigerian fried dough balls, light and fluffy inside with a golden crispy exterior. Made fresh daily with our special yeast dough.',
    short_description: 'Classic Nigerian fried dough balls',
    price: 2.50,
    image_url: 'https://images.pexels.com/photos/461429/pexels-photo-461429.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'african-pastries',
    ingredients: ['Flour', 'Yeast', 'Sugar', 'Nutmeg', 'Salt', 'Vegetable Oil'],
    allergens: ['Gluten'],
    preparation_lead_time: 2,
    same_day_available: true,
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Chin Chin',
    slug: 'chin-chin',
    description: 'Crunchy, sweet Nigerian snack made from fried pastry dough. Perfectly spiced with nutmeg and lightly glazed.',
    short_description: 'Crunchy sweet Nigerian snack',
    price: 3.00,
    image_url: 'https://images.pexels.com/photos/873811/pexels-photo-873811.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'african-pastries',
    ingredients: ['Flour', 'Butter', 'Sugar', 'Eggs', 'Nutmeg', 'Milk', 'Vegetable Oil'],
    allergens: ['Gluten', 'Eggs', 'Dairy'],
    preparation_lead_time: 3,
    same_day_available: true,
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Meat Pie',
    slug: 'meat-pie',
    description: 'Flaky pastry filled with seasoned ground beef and vegetables. A West African favorite, perfect for a hearty snack.',
    short_description: 'Flaky pastry with seasoned beef',
    price: 4.50,
    image_url: 'https://images.pexels.com/photos/1600727/pexels-photo-1600727.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'african-pastries',
    ingredients: ['Flour', 'Butter', 'Ground Beef', 'Onions', 'Carrots', 'Potatoes', 'Spices'],
    allergens: ['Gluten', 'Dairy'],
    preparation_lead_time: 4,
    same_day_available: true,
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Fish Roll',
    slug: 'fish-roll',
    description: 'Crispy pastry roll filled with spiced fish and onions. Golden and savory, a beloved Nigerian street food.',
    short_description: 'Crispy pastry with spiced fish',
    price: 4.00,
    image_url: 'https://images.pexels.com/photos/209540/pexels-photo-209540.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'african-pastries',
    ingredients: ['Flour', 'Butter', 'Fish', 'Onions', 'Peppers', 'Spices', 'Vegetable Oil'],
    allergens: ['Gluten', 'Dairy', 'Fish'],
    preparation_lead_time: 3,
    same_day_available: true,
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Sausage Roll',
    slug: 'sausage-roll',
    description: 'Golden puff pastry wrapped around seasoned sausage meat. A perfect blend of African and European pastry traditions.',
    short_description: 'Golden pastry with spiced sausage',
    price: 4.00,
    image_url: 'https://images.pexels.com/photos/2232433/pexels-photo-2232433.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'african-pastries',
    ingredients: ['Flour', 'Butter', 'Sausage', 'Onions', 'Herbs', 'Spices'],
    allergens: ['Gluten', 'Dairy'],
    preparation_lead_time: 3,
    same_day_available: true,
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Coconut Bread',
    slug: 'coconut-bread',
    description: 'Soft, sweet bread loaded with fresh coconut. A tropical twist on traditional bread, moist and flavorful.',
    short_description: 'Sweet bread with fresh coconut',
    price: 6.00,
    image_url: 'https://images.pexels.com/photos/177504/pexels-photo-177504.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'african-breads',
    ingredients: ['Flour', 'Coconut', 'Sugar', 'Butter', 'Eggs', 'Yeast', 'Coconut Milk'],
    allergens: ['Gluten', 'Dairy', 'Eggs'],
    preparation_lead_time: 4,
    same_day_available: true,
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '7',
    name: 'Plantain Cake',
    slug: 'plantain-cake',
    description: 'Moist cake made with overripe plantains, giving it a natural sweetness and unique African flavor profile.',
    short_description: 'Moist cake with ripe plantains',
    price: 7.50,
    image_url: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'desserts',
    ingredients: ['Plantains', 'Flour', 'Butter', 'Sugar', 'Eggs', 'Cinnamon', 'Nutmeg'],
    allergens: ['Gluten', 'Dairy', 'Eggs'],
    preparation_lead_time: 5,
    same_day_available: true,
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '8',
    name: 'African Celebration Cake',
    slug: 'african-celebration-cake',
    description: 'Stunning celebration cake featuring African-inspired flavors and decorations. Custom designs for birthdays, weddings, and special events.',
    short_description: 'Custom African-inspired celebration cake',
    price: 85.00,
    image_url: 'https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'celebration-cakes',
    ingredients: ['Flour', 'Butter', 'Sugar', 'Eggs', 'Vanilla', 'Hibiscus', 'Baobab', 'Cream'],
    allergens: ['Gluten', 'Dairy', 'Eggs'],
    preparation_lead_time: 48,
    same_day_available: false,
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '9',
    name: 'Agege Bread',
    slug: 'agege-bread',
    description: 'Traditional Nigerian bread known for its soft, chewy texture. Perfect for breakfast or as a sandwich bread.',
    short_description: 'Traditional soft Nigerian bread',
    price: 5.00,
    image_url: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'african-breads',
    ingredients: ['Flour', 'Sugar', 'Yeast', 'Butter', 'Salt'],
    allergens: ['Gluten', 'Dairy'],
    preparation_lead_time: 4,
    same_day_available: true,
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '10',
    name: 'Kuli Kuli Cookies',
    slug: 'kuli-kuli-cookies',
    description: 'Crunchy cookies made with ground peanut, inspired by traditional Nigerian peanut snack. Rich and nutty.',
    short_description: 'Peanut-based crunchy cookies',
    price: 4.00,
    image_url: 'https://images.pexels.com/photos/873811/pexels-photo-873811.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'desserts',
    ingredients: ['Peanuts', 'Flour', 'Sugar', 'Butter', 'Eggs', 'Vanilla'],
    allergens: ['Gluten', 'Peanuts', 'Dairy', 'Eggs'],
    preparation_lead_time: 3,
    same_day_available: true,
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '11',
    name: 'Party Pack',
    slug: 'party-pack',
    description: 'Assorted African pastries perfect for events. Includes puff puff, chin chin, meat pies, and sausage rolls.',
    short_description: 'Assorted pastries for events',
    price: 45.00,
    image_url: 'https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'event-catering',
    ingredients: ['Various pastries', 'Fried items', 'Baked items'],
    allergens: ['Gluten', 'Dairy', 'Eggs', 'Fish'],
    preparation_lead_time: 24,
    same_day_available: false,
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '12',
    name: 'Wedding Cake',
    slug: 'wedding-cake',
    description: 'Elegant multi-tiered wedding cake with African-inspired decorations and flavors. Custom consultations available.',
    short_description: 'Custom multi-tiered wedding cake',
    price: 350.00,
    image_url: 'https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'celebration-cakes',
    ingredients: ['Flour', 'Butter', 'Sugar', 'Eggs', 'Fondant', 'African Spices'],
    allergens: ['Gluten', 'Dairy', 'Eggs'],
    preparation_lead_time: 72,
    same_day_available: false,
    is_active: true,
    created_at: new Date().toISOString()
  }
]

export const testimonials: Testimonial[] = [
  {
    id: '1',
    customer_name: 'Amara O.',
    rating: 5,
    comment: 'The best puff puff I have had outside of Nigeria! Reminds me of home. Fresh and perfectly made every time.',
    created_at: '2024-02-15T10:00:00Z'
  },
  {
    id: '2',
    customer_name: 'Kwame A.',
    rating: 5,
    comment: 'Ordered the party pack for my daughter\'s birthday and everyone loved it. Authentic flavors and beautiful presentation.',
    created_at: '2024-03-02T14:30:00Z'
  },
  {
    id: '3',
    customer_name: 'Chioma N.',
    rating: 5,
    comment: 'Their meat pies are incredible. The pastry is perfectly flaky and the filling is seasoned just right. My go-to for African pastries.',
    created_at: '2024-03-18T09:15:00Z'
  },
  {
    id: '4',
    customer_name: 'David M.',
    rating: 4,
    comment: 'Great variety of African breads and pastries. The coconut bread is my favorite. Pickup was easy and on time.',
    created_at: '2024-04-05T16:45:00Z'
  },
  {
    id: '5',
    customer_name: 'Fatima H.',
    rating: 5,
    comment: 'Had them make our wedding cake and it was absolutely stunning. The African-inspired decorations were perfect for our theme.',
    created_at: '2024-04-22T11:20:00Z'
  }
]

export const workers = [
  { id: '1', name: 'Anne', role: 'owner' as const, pin: '1234', is_active: true },
  { id: '2', name: 'Marie', role: 'worker' as const, pin: '5678', is_active: true },
  { id: '3', name: 'Joseph', role: 'worker' as const, pin: '9012', is_active: true },
  { id: '4', name: 'Sarah', role: 'worker' as const, pin: '3456', is_active: true }
]

export const inventoryItems = [
  { id: '1', name: 'Flour', current_stock: 50, unit: 'kg', minimum_stock: 20, category: 'ingredient' as const },
  { id: '2', name: 'Sugar', current_stock: 30, unit: 'kg', minimum_stock: 15, category: 'ingredient' as const },
  { id: '3', name: 'Butter', current_stock: 15, unit: 'kg', minimum_stock: 10, category: 'ingredient' as const },
  { id: '4', name: 'Eggs', current_stock: 200, unit: 'units', minimum_stock: 100, category: 'ingredient' as const },
  { id: '5', name: 'Yeast', current_stock: 2, unit: 'kg', minimum_stock: 1, category: 'ingredient' as const },
  { id: '6', name: 'Vegetable Oil', current_stock: 25, unit: 'liters', minimum_stock: 10, category: 'ingredient' as const },
  { id: '7', name: 'Ground Beef', current_stock: 10, unit: 'kg', minimum_stock: 5, category: 'ingredient' as const },
  { id: '8', name: 'Coconut', current_stock: 8, unit: 'kg', minimum_stock: 4, category: 'ingredient' as const },
  { id: '9', name: 'Pastry Boxes (Small)', current_stock: 150, unit: 'units', minimum_stock: 50, category: 'packaging' as const },
  { id: '10', name: 'Pastry Boxes (Large)', current_stock: 80, unit: 'units', minimum_stock: 30, category: 'packaging' as const },
  { id: '11', name: 'Cake Boxes', current_stock: 25, unit: 'units', minimum_stock: 10, category: 'packaging' as const },
  { id: '12', name: 'Paper Bags', current_stock: 300, unit: 'units', minimum_stock: 100, category: 'packaging' as const }
]

export const recipes = [
  {
    id: '1',
    product_id: '1',
    product_name: 'Puff Puff',
    yield_quantity: 30,
    ingredients: [
      { ingredient_id: '1', ingredient_name: 'Flour', quantity: 500, unit: 'g' },
      { ingredient_id: '2', ingredient_name: 'Sugar', quantity: 100, unit: 'g' },
      { ingredient_id: '5', ingredient_name: 'Yeast', quantity: 10, unit: 'g' },
      { ingredient_id: '6', ingredient_name: 'Vegetable Oil', quantity: 500, unit: 'ml' }
    ],
    instructions: 'Mix flour, sugar, yeast, and warm water. Let rise for 1 hour. Heat oil and drop spoonfuls of batter. Fry until golden brown.'
  },
  {
    id: '2',
    product_id: '3',
    product_name: 'Meat Pie',
    yield_quantity: 12,
    ingredients: [
      { ingredient_id: '1', ingredient_name: 'Flour', quantity: 400, unit: 'g' },
      { ingredient_id: '3', ingredient_name: 'Butter', quantity: 200, unit: 'g' },
      { ingredient_id: '7', ingredient_name: 'Ground Beef', quantity: 500, unit: 'g' }
    ],
    instructions: 'Make pastry dough with flour and butter. Prepare beef filling with spices. Roll out dough, fill, seal, and bake at 180°C for 25 minutes.'
  }
]

export const demoOrders = [
  {
    id: '1',
    order_number: 'AFB-1001',
    customer_name: 'Amara Okonkwo',
    customer_email: 'amara@email.com',
    customer_phone: '+1 555-0101',
    items: [
      { product_id: '1', product_name: 'Puff Puff', quantity: 4, price: 2.50 },
      { product_id: '3', product_name: 'Meat Pie', quantity: 2, price: 4.50 }
    ],
    total: 19.00,
    status: 'ready_for_pickup' as const,
    pickup_date: '2024-06-15',
    pickup_time: '09:00',
    notes: 'Please call when ready',
    created_at: '2024-06-14T08:00:00Z'
  },
  {
    id: '0',
    order_number: 'AFB-0995',
    customer_name: 'David Mensah',
    customer_email: 'david@email.com',
    customer_phone: '+1 555-0100',
    items: [
      { product_id: '1', product_name: 'Puff Puff', quantity: 10, price: 2.50 }
    ],
    total: 25.00,
    status: 'completed' as const,
    pickup_date: '2024-06-14',
    pickup_time: '10:00',
    created_at: '2024-06-13T08:00:00Z'
  },
  {
    id: '2',
    order_number: 'AFB-1002',
    customer_name: 'Kwame Asante',
    customer_email: 'kwame@email.com',
    customer_phone: '+1 555-0102',
    items: [
      { product_id: '6', product_name: 'Coconut Bread', quantity: 1, price: 6.00 },
      { product_id: '2', product_name: 'Chin Chin', quantity: 3, price: 3.00 }
    ],
    total: 15.00,
    status: 'in_preparation' as const,
    pickup_date: '2024-06-15',
    pickup_time: '11:00',
    created_at: '2024-06-14T10:30:00Z'
  },
  {
    id: '3',
    order_number: 'AFB-1003',
    customer_name: 'Fatima Hassan',
    customer_email: 'fatima@email.com',
    customer_phone: '+1 555-0103',
    items: [
      { product_id: '11', product_name: 'Party Pack', quantity: 2, price: 45.00 }
    ],
    total: 90.00,
    status: 'pending' as const,
    pickup_date: '2024-06-16',
    pickup_time: '14:00',
    notes: 'For birthday party',
    created_at: '2024-06-13T15:00:00Z'
  }
]

export const productionItems = [
  { id: '1', product_id: '1', product_name: 'Puff Puff', website_orders: 30, market_orders: 20, extra_quantity: 10, total_quantity: 60, produced: 45, pickup_date: '2024-06-15', status: 'in_progress' as const },
  { id: '2', product_id: '3', product_name: 'Meat Pie', website_orders: 15, market_orders: 10, extra_quantity: 5, total_quantity: 30, produced: 30, pickup_date: '2024-06-15', status: 'completed' as const },
  { id: '3', product_id: '2', product_name: 'Chin Chin', website_orders: 20, market_orders: 15, extra_quantity: 5, total_quantity: 40, produced: 20, pickup_date: '2024-06-15', status: 'in_progress' as const },
  { id: '4', product_id: '6', product_name: 'Coconut Bread', website_orders: 10, market_orders: 5, extra_quantity: 3, total_quantity: 18, produced: 0, pickup_date: '2024-06-16', status: 'planned' as const }
]

export const activityLogs = [
  { id: '1', worker_id: '1', worker_name: 'Anne', action: 'Logged in', module: 'Auth', created_at: '2024-06-15T06:00:00Z' },
  { id: '2', worker_id: '2', worker_name: 'Marie', action: 'Started production: Puff Puff', module: 'Production', created_at: '2024-06-15T06:30:00Z' },
  { id: '3', worker_id: '3', worker_name: 'Joseph', action: 'Updated inventory: Flour -5kg', module: 'Inventory', created_at: '2024-06-15T07:00:00Z' },
  { id: '4', worker_id: '4', worker_name: 'Sarah', action: 'Packed order AFB-1001', module: 'Packing', created_at: '2024-06-15T08:00:00Z' }
]
