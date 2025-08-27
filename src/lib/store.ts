import { create } from 'zustand';
import { MenuItem } from '@/types';

/**
 * Represents a single item within the user's order.
 */
interface OrderItem {
  /** The menu item being ordered. */
  item: MenuItem;
  /** The quantity of the item ordered. */
  quantity: number;
  /** Any special notes or customizations for the item. */
  notes: string;
}

/**
 * Defines the structure of the global state managed by the Zustand store.
 */
interface StoreState {
  /** The currently active screen in the application. */
  currentScreen: 'welcome' | 'menu' | 'order' | 'payment';
  /** An array of items currently in the user's order. */
  orderItems: OrderItem[];
  /**
   * Sets the current active screen of the application.
   * @param {'welcome' | 'menu' | 'order' | 'payment'} screen - The name of the screen to navigate to.
   */
  setCurrentScreen: (screen: 'welcome' | 'menu' | 'order' | 'payment') => void;
  /**
   * Adds a new item to the order.
   * @param {MenuItem} item - The menu item to add.
   * @param {number} quantity - The quantity of the item.
   * @param {string} notes - Any special notes for the item.
   */
  addToOrder: (item: MenuItem, quantity: number, notes: string) => void;
  /**
   * Removes an item from the order by its index.
   * @param {number} index - The index of the item to remove.
   */
  removeFromOrder: (index: number) => void;
  /**
   * Calculates and returns the total number of individual items in the order.
   * @returns {number} The total count of items.
   */
  getOrderItemCount: () => number;
  /**
   * Calculates and returns the total price of all items in the order.
   * @returns {number} The total price.
   */
  getOrderTotal: () => number;
  /**
   * Clears all items from the current order.
   */
  clearOrder: () => void;
}

/**
 * A Zustand store for managing the application's global state,
 * including the current screen and the user's order.
 */
export const useStore = create<StoreState>((set, get) => ({
  /**
   * The initial screen displayed to the user.
   */
  currentScreen: 'welcome',
  /**
   * The initial empty array for storing order items.
   */
  orderItems: [],
  
  /**
   * Action to set the current active screen.
   * @param {'welcome' | 'menu' | 'order' | 'payment'} screen - The screen to navigate to.
   */
  setCurrentScreen: (screen) => set({ currentScreen: screen }),
  
  /**
   * Action to add an item to the order.
   * @param {MenuItem} item - The menu item to add.
   * @param {number} quantity - The quantity of the item.
   * @param {string} notes - Any special notes for the item.
   */
  addToOrder: (item, quantity, notes) => set((state) => ({
    orderItems: [...state.orderItems, { item, quantity, notes }]
  })),
  
  /**
   * Action to remove an item from the order based on its index.
   * @param {number} index - The index of the item to remove.
   */
  removeFromOrder: (index) => set((state) => ({
    orderItems: state.orderItems.filter((_, i) => i !== index)
  })),
  
  /**
   * Selector to get the total count of all items in the order.
   * @returns {number} The total number of items.
   */
  getOrderItemCount: () => {
    const { orderItems } = get();
    return orderItems.reduce((count, item) => count + item.quantity, 0);
  },
  
  /**
   * Selector to get the total price of all items in the order.
   * @returns {number} The total price.
   */
  getOrderTotal: () => {
    const { orderItems } = get();
    return orderItems.reduce((total, item) => total + (item.item.price * item.quantity), 0);
  },
  
  /**
   * Action to clear all items from the order.
   */
  clearOrder: () => set({ orderItems: [] })
}));