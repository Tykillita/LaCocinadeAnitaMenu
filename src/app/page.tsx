'use client';

import React, { useRef } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { MenuScreen } from '@/components/MenuScreen';
import { OrderForm } from '@/components/OrderForm';
import PaymentInfo from '@/components/PaymentInfo';
import { useStore } from '@/lib/store';

/**
 * The main Home component for the application.
 * This component manages the display of different screens (welcome, menu, order, payment)
 * using a global store and applies transition animations between them.
 *
 * @returns {JSX.Element} The rendered Home page with screen transitions.
 */
export default function Home() {
  /**
   * Retrieves the current screen state from the global Zustand store.
   * This determines which component is currently visible.
   */
  const currentScreen = useStore((state) => state.currentScreen);

  /**
   * Refs for each screen component to enable CSSTransition to apply animations correctly.
   * CSSTransition requires a nodeRef for each child it animates.
   */
  const welcomeRef = useRef(null);
  const menuRef = useRef(null);
  const orderRef = useRef(null);
  const paymentRef = useRef(null);

  return (
    /**
     * TransitionGroup manages the mounting and unmounting of components,
     * allowing CSSTransition to apply enter and exit animations.
     */
    <TransitionGroup className="screen-transition-group">
      {currentScreen === 'welcome' && (
        /**
         * CSSTransition for the WelcomeScreen.
         * Applies 'fade' classNames for transitions over 800ms.
         */
        <CSSTransition nodeRef={welcomeRef} key="welcome" classNames="fade" timeout={800}>
          <div ref={welcomeRef} className="screen-transition-wrapper">
            <WelcomeScreen />
          </div>
        </CSSTransition>
      )}
      {currentScreen === 'menu' && (
        /**
         * CSSTransition for the MenuScreen.
         * Applies 'fade' classNames for transitions over 800ms.
         */
        <CSSTransition nodeRef={menuRef} key="menu" classNames="fade" timeout={800}>
          <div ref={menuRef} className="screen-transition-wrapper">
            <MenuScreen />
          </div>
        </CSSTransition>
      )}
      {currentScreen === 'order' && (
        /**
         * CSSTransition for the OrderForm.
         * Applies 'fade' classNames for transitions over 800ms.
         */
        <CSSTransition nodeRef={orderRef} key="order" classNames="fade" timeout={800}>
          <div ref={orderRef} className="screen-transition-wrapper">
            <OrderForm />
          </div>
        </CSSTransition>
      )}
      {currentScreen === 'payment' && (
        /**
         * CSSTransition for the PaymentInfo screen.
         * Applies 'fade' classNames for transitions over 800ms.
         */
        <CSSTransition nodeRef={paymentRef} key="payment" classNames="fade" timeout={800}>
          <div ref={paymentRef} className="screen-transition-wrapper">
            <PaymentInfo />
          </div>
        </CSSTransition>
      )}
    </TransitionGroup>
  );
}