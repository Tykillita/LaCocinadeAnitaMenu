// src/lib/orders.ts
import { supabase } from '@/utils/supabase'
import type { Order, OrderItem, OrderWithItems } from '@/utils/supabase'

export interface CreateOrderData {
  customer_name: string
  customer_phone: string
  customer_address: string
  delivery_date?: string
  payment_method: 'Yappy' | 'Efectivo' | 'Transferencia' | 'Cheque'
  special_notes?: string
  items: {
    item_id: string
    item_name: string
    quantity: number
    unit_price: number
    notes?: string
  }[]
}

/**
 * Crea un nuevo pedido con sus items
 */
export async function createOrder(orderData: CreateOrderData): Promise<{ success: boolean; order?: Order; error?: string }> {
  try {
    // Calcular el total
    const total_amount = orderData.items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0)

    // Crear el pedido principal
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([
        {
          customer_name: orderData.customer_name,
          customer_phone: orderData.customer_phone,
          customer_address: orderData.customer_address,
          delivery_date: orderData.delivery_date || null,
          payment_method: orderData.payment_method,
          special_notes: orderData.special_notes || null,
          total_amount: total_amount
        }
      ])
      .select()
      .single()

    if (orderError) {
      console.error('Error creating order:', orderError)
      return { success: false, error: orderError.message }
    }

    // Crear los items del pedido
    const orderItems = orderData.items.map(item => ({
      order_id: order.id,
      item_id: item.item_id,
      item_name: item.item_name,
      quantity: item.quantity,
      unit_price: item.unit_price,
      subtotal: item.quantity * item.unit_price,
      notes: item.notes || null
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)

    if (itemsError) {
      console.error('Error creating order items:', itemsError)
      // Si falla crear los items, eliminar el pedido creado
      await supabase.from('orders').delete().eq('id', order.id)
      return { success: false, error: itemsError.message }
    }

    return { success: true, order }
  } catch (error) {
    console.error('Unexpected error:', error)
    return { success: false, error: 'Error inesperado al crear el pedido' }
  }
}

/**
 * Obtiene pedidos por rango de fechas
 */
export async function getOrdersByDateRange(startDate: string, endDate: string): Promise<OrderWithItems[]> {
  const { data, error } = await supabase
    .from('orders_with_items')
    .select('*')
    .gte('order_date', startDate)
    .lte('order_date', endDate)
    .order('order_date', { ascending: false })

  if (error) {
    console.error('Error fetching orders:', error)
    return []
  }

  return data || []
}

/**
 * Obtiene pedidos del día actual
 */
export async function getTodayOrders(): Promise<OrderWithItems[]> {
  const today = new Date().toISOString().split('T')[0]
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  
  return getOrdersByDateRange(today, tomorrow)
}

/**
 * Actualiza el estado de un pedido
 */
export async function updateOrderStatus(orderId: string, status: Order['status']): Promise<boolean> {
  const { error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId)

  if (error) {
    console.error('Error updating order status:', error)
    return false
  }

  return true
}