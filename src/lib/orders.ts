import { useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Order, OrderItem } from '../types'

export interface OrderWithItems extends Order {
  id: string
  items: OrderItem[]
}

function generateOrderNumber(): string {
  return 'AFB-' + (1000 + Math.floor(Math.random() * 9000))
}

export function useOrders() {
  const [orders, setOrders] = useState<OrderWithItems[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchOrders = async (userId: string) => {
    try {
      setIsLoading(true)
      const { data, error: fetchError } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            id,
            product_id,
            product_name,
            quantity,
            price
          )
        `)
        .eq('customer_id', userId)
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      const ordersWithItems = data?.map(order => ({
        ...order,
        items: order.order_items || []
      })) || []

      setOrders(ordersWithItems)
    } catch (err) {
      console.error('Error fetching orders:', err)
      setError('Unable to load orders')
    } finally {
      setIsLoading(false)
    }
  }

  const createOrder = async (
    userId: string,
    customerName: string,
    customerEmail: string,
    customerPhone: string,
    items: { productId: string; productName: string; quantity: number; price: number }[],
    pickupDate: string,
    pickupTime: string,
    notes?: string
  ): Promise<OrderWithItems> => {
    const orderNumber = generateOrderNumber()
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    // Create the order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        customer_id: userId,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        total,
        status: 'pending',
        pickup_date: pickupDate,
        pickup_time: pickupTime,
        notes
      })
      .select()
      .single()

    if (orderError) throw orderError

    // Create order items
    const orderItems = items.map(item => ({
      order_id: order.id,
      product_id: item.productId,
      product_name: item.productName,
      quantity: item.quantity,
      price: item.price
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)

    if (itemsError) throw itemsError

    return {
      ...order,
      items: items.map(item => ({
        product_id: item.productId,
        product_name: item.productName,
        quantity: item.quantity,
        price: item.price
      }))
    }
  }

  return {
    orders,
    isLoading,
    error,
    fetchOrders,
    createOrder
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchFavorites = async (userId: string) => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('favorites')
        .select('product_id')
        .eq('customer_id', userId)

      if (error) throw error

      setFavorites(data?.map(f => f.product_id) || [])
    } catch (err) {
      console.error('Error fetching favorites:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const addFavorite = async (userId: string, productId: string) => {
    const { error } = await supabase
      .from('favorites')
      .insert({ customer_id: userId, product_id: productId })

    if (error) throw error
    setFavorites(prev => [...prev, productId])
  }

  const removeFavorite = async (userId: string, productId: string) => {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('customer_id', userId)
      .eq('product_id', productId)

    if (error) throw error
    setFavorites(prev => prev.filter(id => id !== productId))
  }

  const toggleFavorite = async (userId: string, productId: string) => {
    if (favorites.includes(productId)) {
      await removeFavorite(userId, productId)
    } else {
      await addFavorite(userId, productId)
    }
  }

  return {
    favorites,
    isLoading,
    fetchFavorites,
    addFavorite,
    removeFavorite,
    toggleFavorite
  }
}

export function useRecurringOrders() {
  const [recurringOrders, setRecurringOrders] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchRecurringOrders = async (userId: string) => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('recurring_orders')
        .select(`
          *,
          recurring_order_items (*)
        `)
        .eq('customer_id', userId)
        .order('created_at', { ascending: false })

      if (error) throw error
      setRecurringOrders(data || [])
    } catch (err) {
      console.error('Error fetching recurring orders:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    recurringOrders,
    isLoading,
    fetchRecurringOrders
  }
}
