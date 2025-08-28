'use client';

import { useState, useEffect, useMemo } from 'react';
import { useStore } from '@/lib/store';
import { CreditCardIcon, WhatsAppIcon, InstagramIcon } from '@/components/ui/Icons';
import { useOrderListener } from '../hooks/useOrderListener';

/**
 * PaymentInfo component handles the customer's information, delivery details,
 * payment method selection, and the final submission of the order via WhatsApp.
 * It also includes a dynamic notification system for user feedback.
 */
const PaymentInfo: React.FC = () => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState<'success' | 'error' | 'loading'>('success');
  const [isExiting, setIsExiting] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);
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
   * Destructures state and actions from the global Zustand store.
   * `orderItems`: The list of items currently in the order.
   * `setCurrentScreen`: Function to change the active screen in the application.
   * `clearOrder`: Function to clear all items from the order.
   * `getOrderTotal`: Function to calculate the total price of all items in the order.
   */
  const { orderItems, setCurrentScreen, clearOrder, getOrderTotal } = useStore();

  // Inicializar el listener automáticamente
  const { dispatchOrder } = useOrderListener();

  // 3. AGREGAR LISTENER para eventos de guardado exitoso:
  useEffect(() => {
    const handleOrderSaved = (event: CustomEvent) => {
      const { success, error, order } = event.detail;
      
      if (success) {
        // Pedido guardado exitosamente
        console.log('🎉 Pedido guardado con ID:', order.id);
        
        // Limpiar formulario y navegar después de un delay
        setTimeout(() => {
          clearOrder();
          setCurrentScreen('welcome');
        }, 3000); // 3 segundos para que vea las notificaciones
        
      } else {
        // Error al guardar - el usuario ya ve la notificación del listener
        console.error('💥 Error guardando pedido:', error);
      }
    };

    window.addEventListener('orderSaved', handleOrderSaved as EventListener);
    
    return () => {
      window.removeEventListener('orderSaved', handleOrderSaved as EventListener);
    };
  }, [clearOrder, setCurrentScreen]);

  /**
   * Handles navigating back to the 'order' screen.
   */
  const handleBackToOrder = () => {
    setCurrentScreen('order');
  };

  /**
   * Generates a formatted WhatsApp message containing all order details,
   * customer information, and special notes.
   * @returns {string} The complete message string for WhatsApp.
   */
  const generateWhatsAppMessage = () => {
    let message = `🍽️ *NUEVO PEDIDO - LA COCINA DE ANITA*\n\n`;
    message += `👤 *Cliente:* ${customerName}\n`;
    message += `📱 *Teléfono:* ${customerPhone}\n`;
    message += `📍 *Dirección:* ${customerAddress}\n`;
    if (selectedPaymentMethod) {
      message += `💳 *Método de Pago:* ${selectedPaymentMethod}\n`;
    }
    message += `\n`;
    
    message += `🛒 *PEDIDO:*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    
    orderItems.forEach((orderItem: any, index: number) => {
      message += `${index + 1}. ${orderItem.item.name}\n`;
      message += `   • Cantidad: ${orderItem.quantity}\n`;
      message += `   • Precio unitario: $${orderItem.item.price}\n`;
      message += `   • Subtotal: $${(+orderItem.item.price * +orderItem.quantity).toFixed(2)}\n`;
      if (orderItem.notes) {
        message += `   • Notas: ${orderItem.notes}\n`;
      }
      message += `\n`;
    });
    
    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `💰 *TOTAL: $${getOrderTotal().toFixed(2)}*\n\n`;
    
    if (specialNotes) {
      message += `📝 *Notas especiales:*\n${specialNotes}\n\n`;
    }
    
    if (deliveryDate) {
      const formattedDate = new Date(deliveryDate).toLocaleString('es-PA', {
        timeZone: 'America/Panama',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
      message += `📅 *Fecha de entrega solicitada:* ${formattedDate}\n\n`;
    }
    
    message += `¡Gracias por elegir La Cocina de Anita! 🙏`;
    
    return message;
  };

  const whatsappUrl = useMemo(() => {
    if (!customerName || !customerPhone || !customerAddress || !selectedPaymentMethod || orderItems.length === 0) {
      return '#'; // Or a default invalid link
    }
    const message = generateWhatsAppMessage();
    return `https://wa.me/50768257958?text=${encodeURIComponent(message)}`;
  }, [customerName, customerPhone, customerAddress, selectedPaymentMethod, orderItems, specialNotes, deliveryDate, generateWhatsAppMessage]);

  /**
   * Forces a DOM reflow to ensure CSS animations are triggered correctly.
   * This is crucial for smooth transitions in the popup notification.
   * @returns {Promise<void>} A promise that resolves after the reflow is forced.
   */
  const forceReflow = () => {
    return new Promise<void>((resolve) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const popup = document.querySelector('.popup-container') as HTMLElement;
            if (popup) {
              popup.offsetHeight; // Trigger reflow
              popup.style.transform = 'translateZ(0)'; // Optimize for GPU rendering
              popup.style.willChange = 'transform, opacity, filter';
              popup.style.backfaceVisibility = 'hidden';
            }
            resolve();
          });
        });
      });
    });
  };

  /**
   * Displays an animated popup notification with a given message and type.
   * Manages the animation stages for entry.
   * @param {string} message - The message to display in the popup.
   * @param {'success' | 'error' | 'loading'} type - The type of notification (determines styling).
   * @returns {Promise<void>} A promise that resolves after the popup is shown and initial animation stage is set.
   */
  const showNotificationPremium = async (message: string, type: 'success' | 'error' | 'loading') => {
    setPopupMessage(message);
    setPopupType(type);
    setAnimationStage(1); // Start entry animation
    setIsExiting(false);
    setShowPopup(true);
    
    await forceReflow(); // Ensure animation starts from correct state
    
    setTimeout(() => {
      setAnimationStage(2); // Transition to active state
    }, 600);
  };

  /**
   * Updates the message and type of an already visible popup notification.
   * Includes a brief animation for the content change.
   * @param {string} newMessage - The new message to display.
   * @param {'success' | 'error' | 'loading'} [newType='success'] - The new type of notification.
   * @returns {Promise<void>} A promise that resolves after the message is updated and animation stage is set.
   */
  const updateNotificationMessage = async (newMessage: string, newType: 'success' | 'error' | 'loading' = 'success') => {
    setAnimationStage(1); // Briefly reset animation for content change
    
    await new Promise(resolve => setTimeout(resolve, 200)); // Short delay for visual effect
    
    setPopupMessage(newMessage);
    setPopupType(newType);
    
    await forceReflow(); // Ensure animation starts from correct state
    
    setTimeout(() => {
      setAnimationStage(2); // Transition back to active state
    }, 300);
  };

  /**
   * Hides the animated popup notification.
   * Manages the animation stages for exit.
   * @returns {Promise<void>} A promise that resolves after the popup is hidden.
   */
  const hideNotificationPremium = async () => {
    setAnimationStage(3); // Start exit animation
    setIsExiting(true);
    
    await new Promise(resolve => setTimeout(resolve, 400)); // Wait for exit animation to complete
    
    setShowPopup(false);
    setIsExiting(false);
    setAnimationStage(0); // Reset animation stage
  };
/**
 * Handles the submission of the order.
 * Performs validation, displays animated notifications, sends the order via WhatsApp,
 * clears the order, and navigates back to the welcome screen.
 */
const handleOrderAndNavigate = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Preparar datos del pedido
    const orderData = {
      customer_name: customerName,
      customer_phone: customerPhone,
      customer_address: customerAddress,
      delivery_date: deliveryDate || undefined,
      payment_method: selectedPaymentMethod as 'Yappy' | 'Efectivo' | 'Transferencia' | 'Cheque',
      special_notes: specialNotes || undefined,
      items: orderItems.map((orderItem: any) => ({
        item_id: orderItem.item.id,
        item_name: orderItem.item.name,
        quantity: orderItem.quantity,
        unit_price: parseFloat(orderItem.item.price),
        notes: orderItem.notes || undefined
      }))
    };

    // Obtener el mensaje de WhatsApp y URL
    const whatsappMessage = generateWhatsAppMessage();
    const whatsappUrl = (event.target as HTMLAnchorElement).href;

    // Disparar el evento para que el listener lo capture
    dispatchOrder(orderData, whatsappMessage, whatsappUrl);
    
    // El enlace de WhatsApp se abrirá automáticamente
    // El listener se encargará de guardar los datos en segundo plano
  };


  return (
    <div className="container">
      <div className="menu-screen">
        {/* Button to navigate back to the Order screen */}
        <button className="back-btn" onClick={handleBackToOrder}>
          ← Volver a la Orden
        </button>

        {/* Menu logo image */}
        <img
          src="/images/La cocina de anita logo cosido 2 (sin fondo).png"
          style={{width: '80px', height: '80px', margin: '0 auto 15px', display: 'block'}}
          alt="La Cocina de Anita Logo"
          loading="lazy"
          className={imageLoaded ? 'loaded' : ''}
        />
        <h1 className="menu-title" style={{ marginBottom: '40px' }}>Información del Cliente y Entrega</h1>

        {/* Card displaying the current order summary */}
        <div className="card">
          <h2 className="text-primary mb-10">Tu Pedido</h2>

          {orderItems.length === 0 ? (
            <p className="text-muted">No hay items en tu orden</p>
          ) : (
            <>
              {orderItems.map((orderItem: any, index: number) => (
                <div key={index} className="menu-item mb-5">
                  <div className="item-info">
                    <h3 className="item-name">{orderItem.item.name}</h3>
                    <p className="item-description">Cantidad: {orderItem.quantity}</p>
                    {orderItem.notes && (
                      <div className="item-notes">Notas: {orderItem.notes}</div>
                    )}
                  </div>
                  <div className="item-price">
                    ${(+orderItem.item.price * +orderItem.quantity).toFixed(2)}
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

        {/* Card for customer and delivery information input */}
        <div className="card">
          <h2 className="text-muted mb-10">Información del Cliente</h2>

          <div className="form-group">
            <label htmlFor="customerName">Nombre completo: *</label>
            <input
              type="text"
              id="customerName"
              className="text-input"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Ej: María González"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="customerPhone">Número de teléfono: *</label>
            <input
              type="tel"
              id="customerPhone"
              className="text-input"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="Ej: 6825-7958"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="customerAddress">Dirección de entrega: *</label>
            <textarea
              id="customerAddress"
              className="text-input"
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              placeholder="Ej: Calle 50, Edificio Torres del Mar, Apto 5B, San Francisco"
              rows={3}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="deliveryDate">Fecha de entrega (opcional):</label>
            <input
              type="datetime-local"
              id="deliveryDate"
              className="text-input"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              min={new Date().toISOString().slice(0, 16)}
            />
          </div>

          <div className="form-group">
            <label>Método de pago a usar: *</label>
            <div className="payment-method-selector">
              {['Yappy', 'Efectivo', 'Transferencia', 'Cheque'].map((method) => (
                <button
                  key={method}
                  type="button"
                  className={`payment-method-btn ${selectedPaymentMethod === method ? 'selected' : ''}`}
                  onClick={() => setSelectedPaymentMethod(method)}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="specialNotes">Notas especiales (opcional):</label>
            <textarea
              id="specialNotes"
              className="text-input"
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              placeholder="Ej: Extra picante, entregar en la portería..."
              rows={3}
            />
          </div>
        </div>

        {/* Card displaying available payment methods and contact information */}
        <div className="card">
          <div className="payment-title-spacing">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
              <CreditCardIcon style={{ width: '24px', height: '24px', color: 'white' }} />
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>Medios de Pago</span>
            </div>
          </div>

          <div className="payment-methods">
            <div className="payment-method">
              <strong>Efectivo</strong>
              <div className="payment-icon">💰</div>
            </div>
            
            <div className="payment-method">
              <strong>Transferencia</strong>
              <div>Banco General</div>
              <div>Cta. Ahorro</div>
              <div className="account-number">04-20-99488149-0</div>
            </div>
            
            <div className="payment-method">
              <strong>Yappy</strong>
              <div className="whatsapp-number">6825-7958</div>
            </div>
          </div>

          <div className="contact-section">
            <div className="contact-divider"></div>
            <div className="contact-info">
              <a
                href="https://www.instagram.com/lacocinadeanita507"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-item"
                style={{ textDecoration: 'none', color: '#b8b8b8' }}
              >
                <InstagramIcon style={{ width: '16px', height: '16px' }} />
                <span>@lacocinadeanita507</span>
              </a>
              <a
                href={`https://wa.me/50768257958`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-item"
                style={{ textDecoration: 'none', color: '#b8b8b8' }}
              >
                <WhatsAppIcon style={{ width: '16px', height: '16px' }} />
                <span>6825-7958</span>
              </a>
            </div>
          </div>
        </div>

        {/* Action buttons for navigation and order submission */}
        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center', gap: '5px' }}>
          <button className="btn btn-secondary text-white py-1 px-2 rounded-xl text-sm" onClick={handleBackToOrder}>
            ← Volver
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn py-1 px-2 text-sm no-underline bg-green-600 hover:bg-green-700 text-white rounded-xl ${
              orderItems.length === 0 ||
              !customerName ||
              !customerPhone ||
              !customerAddress ||
              !selectedPaymentMethod
                ? 'btn-disabled' // Add a disabled-like class for styling
                : ''
            }`}
            onClick={handleOrderAndNavigate} // Call the new handler
            aria-disabled={
              orderItems.length === 0 ||
              !customerName ||
              !customerPhone ||
              !customerAddress ||
              !selectedPaymentMethod
            }
          >
            Enviar Pedido
          </a>
        </div>
      </div>

      {/* Animated popup notification for order submission status */}
      {showPopup && (
        <div className="popup-backdrop">
          <div
            className={`
              popup-container premium
              ${popupType === 'success' ? 'popup-success' :
                popupType === 'error' ? 'popup-error' :
                'popup-loading'}
              ${animationStage === 1 || animationStage === 2 ? 'popup-enter' : ''}
              ${animationStage === 3 ? 'popup-exit' : ''}
            `}
          >
            <div className="popup-content-wrapper">
              <div className="popup-header-flex">
                <div className="popup-icon-wrapper">
                  {popupType === 'success' ? (
                    <div className="popup-icon-success">
                      <svg style={{ width: '20px', height: '20px', color: 'white' }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  ) : popupType === 'error' ? (
                    <div className="popup-icon-error">
                      <svg style={{ width: '20px', height: '20px', color: 'white' }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                  ) : (
                    <div className="popup-icon-loading">
                      <svg style={{ width: '20px', height: '20px', color: 'white' }} className="animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                  )}
                </div>
                <div className="popup-text-content">
                  <h3 className={`popup-title ${popupType}`}>
                    {popupType === 'success' ? '¡Éxito!' :
                     popupType === 'error' ? 'Error' :
                     'Procesando...'}
                  </h3>
                  <p className="popup-message">
                    {popupMessage}
                  </p>
                </div>
                <div className="popup-close-button-wrapper">
                  {popupType === 'error' && (
                    <button
                      className="popup-close-button"
                      onClick={hideNotificationPremium}
                    >
                      <svg style={{ width: '20px', height: '20px' }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentInfo;