'use client';

import React, { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { MenuItem } from '@/types';

/**
 * OrderForm component displays the current items in the user's order,
 * allows removal of items, and provides navigation to the menu and payment screens.
 */
export const OrderForm: React.FC = () => {
  /**
   * Destructures state and actions from the global Zustand store.
   * `orderItems`: The list of items currently in the order.
   * `removeFromOrder`: Function to remove an item from the order.
   * `setCurrentScreen`: Function to change the active screen in the application.
   * `getOrderTotal`: Function to calculate the total price of all items in the order.
   */
  const { orderItems, removeFromOrder, setCurrentScreen, getOrderTotal } = useStore();
  /**
   * State to track if the menu logo image has finished loading.
   */
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  
  /**
   * Effect hook to pre-load the menu logo image.
   * Sets `imageLoaded` to true once the image has successfully loaded.
   */
  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = "/images/La cocina de anita logo cosido 2 (sin fondo).png";
  }, []);
  
  /**
   * Handles navigating back to the 'menu' screen.
   */
  const handleBackToMenu = () => {
    setCurrentScreen('menu');
  };
  
  /**
   * Handles navigating to the 'payment' screen.
   */
  const handleProceedToPayment = () => {
    setCurrentScreen('payment');
  };
  
  return (
    <div className="container">
      <div className="menu-screen">
        {/* Button to navigate back to the Menu Screen */}
        <button
          className="back-btn"
          onClick={handleBackToMenu}
          aria-label="Volver al menú"
        >
          ← Volver al Menú
        </button>
                
        {/* Header section, consistent with the MenuScreen for branding */}
        <header className="menu-header">
          <img
            src="/images/La cocina de anita logo cosido 2 (sin fondo).png"
            style={{width: '80px', height: '80px', margin: '0 auto 15px', display: 'block'}}
            alt="La Cocina de Anita Logo"
            loading="lazy"
            className={imageLoaded ? 'loaded' : ''}
          />
          <h1 className="menu-title">Tu Orden</h1>
          <p className="menu-subtitle order-subtitle">
            {orderItems.length === 0
              ? 'Aún no has agregado items a tu orden'
              : 'Revisa y confirma los items de tu orden'
            }
          </p>
        </header>
        
        <div className="card mb-20">
          {orderItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted">No hay items en tu orden</p>
            </div>
          ) : (
            <>
              {orderItems.map((orderItem, index) => (
                <div key={index} className="menu-item mb-10">
                  <div className="item-info">
                    <h3 className="item-name">{orderItem.item.name}</h3>
                    <p className="item-description">{orderItem.item.description}</p>
                    <div className="item-price">Cantidad: {orderItem.quantity}</div>
                    {orderItem.notes && (
                      <div className="item-notes">Notas: {orderItem.notes}</div>
                    )}
                  </div>
                  <div className="item-actions">
                    <div className="item-price">${(orderItem.item.price * orderItem.quantity).toFixed(2)}</div>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromOrder(index)}
                      aria-label={`Eliminar ${orderItem.item.name} de la orden`}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="order-total">
                <div className="total-label">Total:</div>
                <div className="total-amount">${getOrderTotal().toFixed(2)}</div>
              </div>
            </>
          )}
        </div>
        
        <div className="order-actions">
          <button className="btn btn-secondary" onClick={handleBackToMenu}>
            ← Volver
          </button>
          {orderItems.length > 0 && (
            <button className="btn" onClick={handleProceedToPayment}>
              Mandar Orden →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};