'use client';

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { menuItems, categories } from '@/lib/menu-data';
import { MenuItem, MenuItemOption } from '@/types';

/**
 * MenuScreen component displays the menu items, allows filtering by category,
 * and provides functionality to add items to the order.
 * It also includes a modal for selecting item options and quantity.
 */
export const MenuScreen: React.FC = () => {
  /**
   * State to manage the currently selected category for filtering menu items.
   */
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  /**
   * State to hold the menu item currently selected for adding to the order.
   */
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  /**
   * State to hold the selected option for a menu item that has multiple options.
   */
  const [selectedOption, setSelectedOption] = useState<MenuItemOption | null>(null);
  /**
   * State to manage the quantity of the selected menu item to be added to the order.
   */
  const [quantity, setQuantity] = useState<number>(1);
  /**
   * State to store any special notes or preferences for the selected menu item.
   */
  const [notes, setNotes] = useState<string>('');
  /**
   * State to track if the menu logo image has finished loading.
   */
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  
  /**
   * Destructures functions from the global Zustand store for order management and screen navigation.
   */
  const { addToOrder, setCurrentScreen, getOrderItemCount } = useStore();
  
  /**
   * Calculates the total number of items currently in the order.
   */
  const orderItemCount = getOrderItemCount();
  
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
   * Memoized computation for filtering menu items based on the `selectedCategory`.
   * Re-calculates only when `selectedCategory` changes, optimizing performance.
   */
  const filteredItems = useMemo(() => {
    return selectedCategory === 'All'
      ? menuItems
      : menuItems.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);
  
  /**
   * Memoized list of unique categories, including an "All" option.
   * Ensures the category list is stable across re-renders.
   */
  const uniqueCategories = useMemo(() => ['All', ...categories], []);
  
  /**
   * Memoized computation for the total price of the currently selected item(s).
   * Accounts for item options and quantity.
   */
  const totalPrice = useMemo(() => {
    if (!selectedItem) return 0;
    const basePrice = selectedItem.hasOptions && selectedOption
      ? selectedOption.price
      : selectedItem.price;
    return basePrice * quantity;
  }, [selectedItem, selectedOption, quantity]);
  
  /**
   * Handles adding the selected item (with its options, quantity, and notes) to the order.
   * Resets the selection and quantity states after adding.
   */
  const handleAddToOrder = useCallback(() => {
    if (selectedItem) {
      if (selectedItem.hasOptions && selectedOption) {
        // Create a new menu item with the selected option to store in the order
        const itemWithOption = {
          ...selectedItem,
          id: `${selectedItem.id}-${selectedOption.id}`, // Unique ID for item with option
          name: `${selectedItem.name} - ${selectedOption.name}`,
          price: selectedOption.price,
          description: selectedOption.description || selectedItem.description
        };
        addToOrder(itemWithOption, quantity, notes);
      } else {
        addToOrder(selectedItem, quantity, notes);
      }
      
      // Reset form states after adding to order
      setSelectedItem(null);
      setSelectedOption(null);
      setQuantity(1);
      setNotes('');
    }
  }, [selectedItem, selectedOption, quantity, notes, addToOrder]);
  
  /**
   * Navigates the user to the 'order' screen.
   */
  const handleViewOrder = useCallback(() => {
    setCurrentScreen('order');
  }, [setCurrentScreen]);
  
  /**
   * Navigates the user back to the 'welcome' screen.
   */
  const handleBackToWelcome = useCallback(() => {
    setCurrentScreen('welcome');
  }, [setCurrentScreen]);
  
  /**
   * Handles changes to the quantity of the selected item.
   * Ensures quantity stays within a valid range (min 1 or 10 for "Hallaca x Decena", max 99).
   * @param {boolean} increment - True to increase quantity, false to decrease.
   */
  const handleQuantityChange = useCallback((increment: boolean) => {
    setQuantity(prev => {
      // Special handling for "Hallaca x Decena" to start at 10
      const minQuantity = selectedOption?.name === "Hallaca x Decena" ? 10 : 1;
      let newQuantity: number;
      if (!increment && prev === minQuantity) {
        newQuantity = prev; // Prevent decrementing below minQuantity if already at min
      } else {
        newQuantity = increment ? prev + 1 : prev - 1;
      }
      return Math.max(minQuantity, Math.min(99, newQuantity)); // Limit quantity between min and 99
    });
  }, [selectedOption]);
 
  /**
   * Handles the selection of a menu item, opening the "Add to Order" modal.
   * Resets selected option, quantity, and notes for the new item.
   * @param {MenuItem} item - The menu item that was selected.
   */
  const handleItemSelect = useCallback((item: MenuItem) => {
    setSelectedItem(item);
    setSelectedOption(null); // Reset option when selecting a new item
    setQuantity(item.name === "Hallaca x Decena" ? 10 : 1); // Set initial quantity based on item name
    setNotes(''); // Clear any previous notes
  }, []);
  
  /**
   * Closes the "Add to Order" modal and resets all related states.
   */
  const handleModalClose = useCallback(() => {
    setSelectedItem(null);
    setSelectedOption(null);
    setQuantity(1);
    setNotes('');
  }, []);
  
  return (
    <div className="container">
      <div className="menu-screen">
        {/* Button to navigate back to the Welcome Screen */}
        <button
          className="back-btn"
          onClick={handleBackToWelcome}
          aria-label="Volver a la pantalla de bienvenida"
        >
          ← Volver
        </button>
                
        <header className="menu-header">
          {/* Menu logo image */}
          <img
            src="/images/La cocina de anita logo cosido 2 (sin fondo).png"
            style={{width: '80px', height: '80px', margin: '0 auto 15px', display: 'block'}}
            alt="La Cocina de Anita Logo"
            loading="lazy"
            className={imageLoaded ? 'loaded' : ''}
          />
          <h1 className="menu-title">Menú de la Semana</h1>
          <p className="menu-subtitle">Selecciona los items que deseas agregar a tu orden</p>
          <div className="order-summary">
            {/* Displays the current number of items in the order */}
            <span className="order-count">
              Orden: {orderItemCount} {orderItemCount === 1 ? 'item' : 'items'}
            </span>
            {/* Button to navigate to the Order screen */}
            <button
              className="view-order-btn"
              onClick={handleViewOrder}
              aria-label={`Ver orden con ${orderItemCount} items`}
            >
              Ver Orden →
            </button>
          </div>
        </header>
        
        {/* Navigation for category filtering */}
        <nav className="category-filter" role="tablist" aria-label="Filtrar por categoría">
          {uniqueCategories.map((category) => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
              role="tab"
              aria-selected={selectedCategory === category}
              aria-label={`Mostrar ${category}`}
            >
              {category}
            </button>
          ))}
        </nav>
        
        {/* Main section displaying menu items */}
        <main className="menu-items" role="main">
          {filteredItems.length === 0 ? (
            <div className="no-items-message">
              <p>No hay items disponibles en esta categoría.</p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <article
                key={item.id}
                className={`menu-item ${!item.available ? 'unavailable' : ''}`}
                onClick={() => item.available && handleItemSelect(item)}
                role="button"
                tabIndex={item.available ? 0 : -1}
                aria-label={`${item.name} - ${item.hasOptions ? 'Dos opciones de precio disponibles' : `$${item.price.toFixed(2)}`} - ${item.available ? 'Disponible' : 'No disponible'}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    item.available && handleItemSelect(item);
                  }
                }}
              >
                <div className="item-info">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-description">{item.description}</p>
                  <div className="item-price">
                    {item.hasOptions ? (
                      <span className="price-options-text">Dos opciones de precio disponibles</span>
                    ) : (
                      `$${item.price.toFixed(2)}`
                    )}
                  </div>
                </div>
                <div
                  className={`item-status ${item.available ? 'available' : 'unavailable'}`}
                  aria-label={item.available ? 'Disponible' : 'No disponible'}
                >
                  {item.available ? '✓' : '✗'}
                </div>
              </article>
            ))
          )}
        </main>
      </div>
      
      {/* Add to Order Modal */}
      {selectedItem && (
        <div
          className="modal-overlay"
          onClick={handleModalClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="modal-title">Agregar a la Orden</h2>
            <h3>{selectedItem.name}</h3>
            <p>{selectedItem.description}</p>
            
            {selectedItem.hasOptions ? (
              <>
                <div className="options-section">
                  <label htmlFor="options-select">Selecciona una opción:</label>
                  <div className="options-grid" role="radiogroup" aria-labelledby="options-label">
                    {selectedItem.options?.map((option) => (
                      <div
                        key={option.id}
                        className={`option-item ${selectedOption?.id === option.id ? 'selected' : ''}`}
                        onClick={() => {
                          setSelectedOption(option);
                          setQuantity(option.name === "Hallaca x Decena" ? 10 : 1);
                        }}
                        role="radio"
                        aria-checked={selectedOption?.id === option.id}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setSelectedOption(option);
                            setQuantity(option.name === "Hallaca x Decena" ? 10 : 1);
                          }
                        }}
                      >
                        <div className="option-info">
                          <h4>{option.name}</h4>
                          <p>{option.description}</p>
                          <div className="option-price">${option.price.toFixed(2)}</div>
                        </div>
                        <div className="option-select">
                          {selectedOption?.id === option.id ? '✓' : ''}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {selectedOption && (
                  <div className="quantity-selector">
                    <label htmlFor="quantity-controls">Cantidad:</label>
                    <div className="quantity-controls" id="quantity-controls">
                      <button
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(false)}
                        aria-label="Reducir cantidad"
                        type="button"
                      >
                        -
                      </button>
                      <span className="quantity-display" aria-live="polite">{quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(true)}
                        aria-label="Aumentar cantidad"
                        type="button"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="quantity-selector">
                  <label>Precio: ${selectedItem.price.toFixed(2)}</label>
                  <label htmlFor="quantity-controls-simple">Cantidad:</label>
                  <div className="quantity-controls" id="quantity-controls-simple">
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(false)}
                      aria-label="Reducir cantidad"
                      type="button"
                    >
                      -
                    </button>
                    <span className="quantity-display" aria-live="polite">{quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(true)}
                      aria-label="Aumentar cantidad"
                      type="button"
                    >
                      +
                    </button>
                  </div>
                </div>
              </>
            )}
            
            <div className="notes-section">
              <label htmlFor="notes-textarea">Notas especiales:</label>
              <textarea
                id="notes-textarea"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="text-input"
                rows={3}
                placeholder="Alguna preferencia especial?"
                maxLength={200}
                aria-describedby="notes-help"
              />
              <small id="notes-help" className="notes-help">
                {notes.length}/200 caracteres
              </small>
            </div>
            
            <div className="modal-actions">
              <button
                className="btn"
                onClick={handleAddToOrder}
                disabled={selectedItem.hasOptions && !selectedOption}
                type="button"
                aria-label={`Agregar ${quantity} ${quantity === 1 ? 'unidad' : 'unidades'} por $${totalPrice.toFixed(2)}`}
              >
                Agregar - ${totalPrice.toFixed(2)}
              </button>
              <button
                className="btn btn-secondary"
                onClick={handleModalClose}
                type="button"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};