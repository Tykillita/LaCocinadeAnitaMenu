// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos TypeScript para tu base de datos
export interface Order {
  id: string
  customer_name: string
  customer_phone: string
  customer_address: string
  delivery_date?: string
  payment_method: 'Yappy' | 'Efectivo' | 'Transferencia' | 'Cheque'
  special_notes?: string
  total_amount: number
  order_date: string
  status: 'pending' | 'confirmed' | 'preparing' | 'delivered' | 'cancelled'
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  item_id: string
  item_name: string
  quantity: number
  unit_price: number
  subtotal: number
  notes?: string
  created_at: string
}

export interface OrderWithItems extends Order {
  items: OrderItem[]
}