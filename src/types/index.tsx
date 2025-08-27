/**
 * Represents a single menu item available for order.
 */
export interface MenuItem {
  /** Unique identifier for the menu item. */
  id: string;
  /** Name of the menu item. */
  name: string;
  /** Description of the menu item. */
  description: string;
  /** Base price of the menu item. */
  price: number;
  /** Category the menu item belongs to (e.g., 'Platos Fuertes', 'Bebidas'). */
  category: string;
  /** Optional URL for an image of the menu item. */
  image?: string;
  /** Indicates if the menu item is currently available. */
  available: boolean;
  /** Indicates if the menu item has multiple options (e.g., different sizes, flavors). */
  hasOptions?: boolean;
  /** An array of available options if `hasOptions` is true. */
  options?: MenuItemOption[];
}

/**
 * Represents an option for a menu item that has variations.
 */
export interface MenuItemOption {
  /** Unique identifier for the menu item option. */
  id: string;
  /** Name of the option (e.g., 'Small', 'Large', 'With Cheese'). */
  name: string;
  /** Price of this specific option. */
  price: number;
  /** Optional description for the option. */
  description?: string;
}

/**
 * Represents an item that has been added to a customer's order.
 */
export interface OrderItem {
  /** Unique identifier for the order item (can be a combination of MenuItem ID and Option ID). */
  id: string;
  /** The menu item details for this order item. */
  menuItem: MenuItem;
  /** The quantity of this specific menu item ordered. */
  quantity: number;
  /** Optional special notes provided by the customer for this item. */
  notes?: string;
}

/**
 * Represents a complete customer order.
 */
export interface Order {
  /** Unique identifier for the order. */
  id: string;
  /** An array of items included in the order. */
  items: OrderItem[];
  /** The total price of the entire order. */
  total: number;
  /** Optional name of the customer who placed the order. */
  customerName?: string;
  /** Optional phone number of the customer. */
  customerPhone?: string;
  /** The current status of the order. */
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered';
  /** The date and time when the order was created. */
  createdAt: Date;
}

/**
 * Represents a menu category.
 */
export interface Category {
  /** Unique identifier for the category. */
  id: string;
  /** Name of the category (e.g., 'Entradas', 'Postres'). */
  name: string;
  /** Optional icon associated with the category. */
  icon?: string;
}