export interface Product {
  id: string
  name: string
  slug: string
  description: string
  short_description: string
  price: number
  image_url: string
  category: ProductCategory
  ingredients: string[]
  allergens: string[]
  preparation_lead_time: number // hours
  same_day_available: boolean
  is_active: boolean
  created_at: string
}

export type ProductCategory =
  | 'african-pastries'
  | 'african-breads'
  | 'desserts'
  | 'event-catering'
  | 'celebration-cakes'

export interface Category {
  id: ProductCategory
  name: string
  description: string
  image_url: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Customer {
  id: string
  email: string
  name: string
  phone?: string
  preferred_pickup_time?: string
  created_at: string
}

export interface Order {
  id: string
  order_number: string
  customer_id: string
  customer_name: string
  customer_email: string
  customer_phone: string
  items: OrderItem[]
  total: number
  status: OrderStatus
  pickup_date: string
  pickup_time: string
  notes?: string
  created_at: string
}

export interface OrderItem {
  product_id: string
  product_name: string
  quantity: number
  price: number
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'in_preparation'
  | 'ready_for_pickup'
  | 'completed'
  | 'cancelled'

export interface RecurringOrder {
  id: string
  customer_id: string
  frequency: 'weekly' | 'monthly'
  day_of_week?: number // 0-6 for weekly
  day_of_month?: number // 1-31 for monthly
  pickup_time: string
  items: RecurringOrderItem[]
  is_active: boolean
  created_at: string
}

export interface RecurringOrderItem {
  product_id: string
  product_name: string
  quantity: number
}

export interface Worker {
  id: string
  name: string
  role: 'owner' | 'worker'
  pin: string
  is_active: boolean
  created_at: string
}

export interface Recipe {
  id: string
  product_id: string
  product_name: string
  yield_quantity: number
  ingredients: RecipeIngredient[]
  instructions: string
  created_at: string
}

export interface RecipeIngredient {
  ingredient_id: string
  ingredient_name: string
  quantity: number
  unit: string
}

export interface InventoryItem {
  id: string
  name: string
  current_stock: number
  unit: string
  minimum_stock: number
  category: 'ingredient' | 'packaging'
  last_updated: string
}

export interface ProductionItem {
  id: string
  product_id: string
  product_name: string
  website_orders: number
  market_orders: number
  extra_quantity: number
  total_quantity: number
  produced: number
  pickup_date: string
  status: 'planned' | 'in_progress' | 'completed'
}

export interface PackedItem {
  id: string
  product_id: string
  product_name: string
  produced: number
  packed: number
  pickup_date: string
}

export interface ActivityLog {
  id: string
  worker_id: string
  worker_name: string
  action: string
  module: string
  details?: string
  created_at: string
}

export interface Testimonial {
  id: string
  customer_name: string
  rating: number
  comment: string
  created_at: string
}

export interface PickupTimeSlot {
  id: string
  start_time: string
  end_time: string
  max_orders: number
  is_active: boolean
}

export interface Settings {
  bakery_name: string
  address: string
  phone: string
  email: string
  opening_hours: {
    day: string
    open: string
    close: string
    is_closed: boolean
  }[]
  pickup_days: string[]
  pickup_start_time: string
  pickup_end_time: string
  max_orders_per_slot: number
}
