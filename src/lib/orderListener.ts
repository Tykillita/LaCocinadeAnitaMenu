// src/hooks/useOrderListener.ts
import React, { useEffect, useRef } from 'react'
import { createOrder, type CreateOrderData } from '../lib/orders'

// Tipo para los datos del evento personalizado
interface OrderEventData {
  orderData: CreateOrderData
  whatsappMessage: string
  whatsappUrl: string
}

/**
 * Hook personalizado para manejar el listener de pedidos
 */
export function useOrderListener() {
  const listenerActiveRef = useRef(false)

  useEffect(() => {
    if (listenerActiveRef.current) return

    const handleOrderSubmission = async (event: CustomEvent<OrderEventData>) => {
      console.log('📋 Pedido capturado por listener:', event.detail)
      
      try {
        const { orderData, whatsappMessage, whatsappUrl } = event.detail
        
        // Mostrar notificación de que se está guardando
        showNotification('💾 Guardando pedido...', 'info')
        
        // Guardar en la base de datos
        const result = await createOrder(orderData)
        
        if (result.success) {
          console.log('✅ Pedido guardado exitosamente:', result.order)
          showNotification('✅ Pedido guardado exitosamente', 'success')
          
          // Enviar evento de confirmación
          window.dispatchEvent(new CustomEvent('orderSaved', {
            detail: { 
              success: true, 
              order: result.order,
              originalData: event.detail
            }
          }))
          
        } else {
          console.error('❌ Error guardando pedido:', result.error)
          showNotification(`❌ Error: ${result.error}`, 'error')
          
          // Enviar evento de error
          window.dispatchEvent(new CustomEvent('orderSaved', {
            detail: { 
              success: false, 
              error: result.error,
              originalData: event.detail
            }
          }))
        }
        
      } catch (error) {
        console.error('❌ Error inesperado:', error)
        showNotification('❌ Error inesperado al guardar', 'error')
      }
    }

    // Agregar listener
    window.addEventListener('orderSubmission', handleOrderSubmission as EventListener)
    listenerActiveRef.current = true
    console.log('📋 Order listener iniciado')

    // Cleanup
    return () => {
      window.removeEventListener('orderSubmission', handleOrderSubmission as EventListener)
      listenerActiveRef.current = false
      console.log('📋 Order listener detenido')
    }
  }, [])

  /**
   * Función para disparar el evento de envío de pedido
   */
  const dispatchOrderSubmission = (
    orderData: CreateOrderData, 
    whatsappMessage: string, 
    whatsappUrl: string
  ) => {
    const event = new CustomEvent('orderSubmission', {
      detail: {
        orderData,
        whatsappMessage,
        whatsappUrl
      }
    })
    
    window.dispatchEvent(event)
  }

  return {
    dispatchOrder: dispatchOrderSubmission
  }
}

/**
 * Función utilitaria para mostrar notificaciones
 */
function showNotification(message: string, type: 'info' | 'success' | 'error'): void {
  // Crear elemento de notificación
  const notification = document.createElement('div')
  notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full`
  
  // Estilos según el tipo
  switch (type) {
    case 'success':
      notification.className += ' bg-green-500 text-white'
      break
    case 'error':
      notification.className += ' bg-red-500 text-white'
      break
    case 'info':
      notification.className += ' bg-blue-500 text-white'
      break
  }
  
  notification.textContent = message
  document.body.appendChild(notification)
  
  // Animar entrada
  setTimeout(() => {
    notification.classList.remove('translate-x-full')
  }, 100)
  
  // Auto-eliminar después de 3 segundos
  setTimeout(() => {
    notification.classList.add('translate-x-full')
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification)
      }
    }, 300)
  }, 3000)
}