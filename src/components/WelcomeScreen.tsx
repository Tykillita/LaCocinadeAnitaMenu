'use client';

import React from 'react';
import { useStore } from '@/lib/store';

/**
 * WelcomeScreen component serves as the initial entry point for the application.
 * It displays the brand logo, a welcome message, and a button to start ordering.
 * It also includes links to social media.
 */
export const WelcomeScreen: React.FC = () => {
  /**
   * Function from the global Zustand store to change the currently active screen.
   */
  const setCurrentScreen = useStore((state) => state.setCurrentScreen);
  
  /**
   * Handles the action of starting a new order, navigating to the 'menu' screen.
   */
  const handleStartOrder = () => {
    setCurrentScreen('menu');
  };

  return (
    <div className="container">
      <div className="welcome-screen">
        {/* Application logo with a pulse animation */}
        <img
          src="/images/La%20cocina%20de%20anita%20logo%20cosido%202%20(sin%20fondo).png"
          className="logo pulse-animation"
          alt="La Cocina de Anita Logo"
        />
        
        {/* Main welcome title */}
        <h1 className="welcome-title">La Cocina de Anita</h1>
        {/* Dynamic subtitle with a text-flip animation */}
        <div className="welcome-subtitle">
          Comida casera con
          <div className="text-flip">
            <span>amor</span>
            <span>pasión</span>
            <span>gusto</span>
            <span>sazón</span>
            <span>detalle</span>
          </div>
        </div>
        
        {/* Button to start the ordering process */}
        <button className="btn" onClick={handleStartOrder}>🍽️ Ver Menú</button>

        {/*
          These buttons are currently commented out as they represent future features
          or alternative menu options that are not yet implemented.
        */}
        {/*
        <button className="btn" onClick={() => console.log('Sauce menu')}>🍝 Ver Menú de Salsas Envasadas</button>
        <button className="btn" onClick={() => console.log('Dessert menu')}>🍰 Ver Menú de Postres</button>
        <button className="btn btn-secondary" onClick={() => console.log('Close app')}>❌ Cerrar</button>
        */}
        
        {/* Social media links */}
        <div className="social-links">
          {/* Instagram button */}
          <button className="social-btn instagram-btn" onClick={() => window.open('https://www.instagram.com/lacocinadeanita507/', '_blank')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.073 4.948.073 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.358-2.617-6.78-6.979-6.98-1.28-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </button>
          {/* WhatsApp button */}
          <button className="social-btn whatsapp-btn" onClick={() => window.open('https://wa.me/50760000000', '_blank')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};