import { MenuItem } from '@/types';

/**
 * Defines the categories available for menu items.
 * These categories are used for filtering and organizing the menu.
 */
export const categories = [
  'Entradas',      // Appetizers
  'Platos Fuertes', // Main Courses
  'Salsas',        // Sauces
  'Postres',       // Desserts
  'Bebidas'        // Beverages
];

/**
 * An array of MenuItem objects representing the available food and drink items on the menu.
 * Each item includes details such as ID, name, description, price, category, availability,
 * and optional sub-options for items with variations.
 */
export const menuItems: MenuItem[] = [
  /*
   * Example of a commented-out menu item.
   * This item is currently not available or is a placeholder for future additions.
   {
     id: '🍝 dish-pasta-costilla',
     name: 'Pasta corta con Salsa de Costilla de Cerdo',
     description: 'Pasta corta con salsa de costilla de cerdo, pan de ajo y tajada',
     price: 5.00,
     category: 'Platos Fuertes',
     available: true
   },
  */
  {
    id: 'dish-lasagna',
    name: '🍝 Lasagna (Pasticho)',
    description: 'Capas de pasta con salsa bolognesa, queso y bechamel',
    price: 6.00,
    category: 'Platos Fuertes',
    available: true
  },
  {
    id: 'dish-hallaca',
    name: '🫔 Hallaca Venezolana',
    description: 'Masa de maíz rellena con guiso, envuelta en hoja de plátano',
    price: 3.00,
    category: 'Platos Fuertes',
    available: true,
    hasOptions: true,
    options: [
      {
        id: 'hallaca-individual',
        name: 'Hallaca Individual',
        price: 3.00,
        description: 'Hallaca tradicional con relleno de cerdo y pollo'
      },
      {
        id: 'hallaca-decena',
        name: 'Hallaca x Decena',
        price: 2.50,
        description: 'Hallaca tradicional con relleno de cerdo y pollo'
      }
    ]
  },
  {
    id: 'dish-milanesa-pollo',
    name: '🍗 Milanesa de Pollo',
    description: 'Milanesa de pollo acompañada de arroz, lentejas y tajada',
    price: 5.00,
    category: 'Platos Fuertes',
    available: true
  },
  {
    id: 'sauce-bolognesa',
    name: '🍝 Salsa Bolognesa',
    description: 'Salsa clásica con carne molida y tomate (24 oz)',
    price: 5.00,
    category: 'Salsas',
    available: true
  },
  {
    id: 'sauce-napoli',
    name: '🍅 Salsa Napoli',
    description: 'Salsa tradicional italiana de tomate (24 oz)',
    price: 4.00,
    category: 'Salsas',
    available: true
  },
  {
    id: 'sauce-costilla',
    name: '🥩 Salsa Napoli con Costilla de Cerdo',
    description: 'Salsa rica en sabor con costilla de cerdo (24 oz)',
    price: 6.00,
    category: 'Salsas',
    available: true
  },
  {
    id: 'dessert-maracuya',
    name: '🥭 Dulce de Maracuyá (Parchita)',
    description: 'Dulce artesanal típico de la región andina, hecho con maracuyá (Parchita).',
    price: 2.00,
    category: 'Postres',
    available: true
},
{
    id: 'dessert-marquesa',
    name: '🍫 Marquesa de Chocolate',
    description: 'Dulce artesanal típico de la región andina, hecho con chocolate.',
    price: 2.00,
    category: 'Postres',
    available: true
},
{
    id: "dessert-arroz-con-leche",
    name: "🍚 Arroz con leche",
    description: "Postre tradicional cremoso hecho con arroz, leche y canela.",
    price: 2.00,
    category: "Postres",
    available: true
},
  /*
   * Example of a commented-out menu item.
   * This item is currently not available / is a placeholder for future additions.
   {
     id: '8',
     name: 'Refresco',
     description: 'Coca-Cola, Sprite, Fanta (355ml)',
     price: 2.50,
     category: 'Bebidas',
     available: true
   },
  */
];