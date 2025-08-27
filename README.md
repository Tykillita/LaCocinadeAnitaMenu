# 🍽️ La Cocina de Anita - Sistema de Pedidos Online

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=flat&logo=whatsapp&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

Una aplicación web **moderna y elegante** para pedidos de comida con integración directa a WhatsApp. ¡Experiencia de usuario premium con diseño oscuro y animaciones fluidas!

## 🌟 Características

### 🎨 Interfaz Premium
- **Diseño Dark Mode**: Estética moderna con gradientes elegantes
- **Animaciones Fluidas**: Transiciones suaves y efectos visuales
- **Responsive Design**: Optimizado para móviles y desktop
- **UX Intuitiva**: Navegación paso a paso guiada

### 🍴 Sistema de Menú
- **Menú**: Platos principales y comida tradicional, salsas congeladas artesanales y postres caseros.
- **Personalización Completa**: Cantidades y opciones flexibles
- **Múltiples Pedidos**: Combinar diferentes tipos de productos

### 📱 Integración WhatsApp
- **Envío Automático**: Formateo profesional del pedido
- **Datos Completos**: Cliente, dirección y detalles del pedido
- **Contacto Directo**: Comunicación inmediata con el restaurante
- **Plantilla Estructurada**: Mensaje organizado y fácil de leer

### 💳 Sistema de Pagos Múltiple
- **Efectivo**: Pago contra entrega
- **Transferencia Bancaria**: Banco General incluido
- **Yappy**: Pagos móviles instantáneos
- **Información Visible**: Datos de pago siempre accesibles

## 📋 Requisitos del Sistema

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexión a internet para integración WhatsApp
- Dispositivo móvil o desktop
- WhatsApp instalado (para envío de pedidos)

## 🚀 Instalación

1. **Clona el repositorio:**
```bash
git clone https://github.com/tu-usuario/menu-app.git
cd menu-app
```

2. **Instala las dependencias:**
```bash
npm install
```

3. **Estructura de archivos necesaria:**
```
menu-app/
│
├── public/                     # Carpeta de assets públicos
│   └── images/                 # Imágenes del proyecto
│       └── La cocina de anita logo cosido 2 (sin fondo).png
├── src/                        # Código fuente de la aplicación
│   ├── app/                    # Rutas y páginas de Next.js
│   ├── components/             # Componentes React
│   ├── lib/                    # Utilidades y lógica de negocio (Zustand store, data)
│   └── types/                  # Definiciones de tipos TypeScript
├── .gitignore                  # Archivos ignorados por Git
├── package.json                # Dependencias y scripts del proyecto
├── next.config.js              # Configuración de Next.js
├── tailwind.config.js          # Configuración de Tailwind CSS
└── tsconfig.json               # Configuración de TypeScript
```

4. **Configurar las imágenes:**
- Agrega el logo del restaurante en la carpeta `public/images/`
- Asegúrate que el archivo se llame exactamente como está en el código

5. **Ejecuta la aplicación:**
```bash
npm run dev
# Luego abre http://localhost:3000 en tu navegador
```

## 🎮 Cómo Usar

### Flujo de Pedido Completo:

#### 1. **Pantalla de Bienvenida** 🏠
- Logo animado con efecto pulsante
- **Menú Completo**: Platos principales, salsas congeladas artesanales y postres caseros.
- Enlaces directos a redes sociales
- Diseño elegante con gradientes

#### 2. **Selección de Productos** 🍖

#### 3. **Personalización de Cantidades** 🔢
- **Selector Visual**: Botones + / - intuitivos
- **Límites Inteligentes**: Máximos según tipo de producto
- **Precios Dinámicos**: Cálculo automático en tiempo real
- **Validación**: Cantidades mínimas para productos especiales

#### 4. **Información del Pedido** 👤
- Especificar para quién es cada producto
- Útil para pedidos familiares o grupales
- Validación obligatoria del campo

#### 5. **Resumen y Confirmación** 📋
- Vista detallada de cada pedido
- Precio individual y total calculado
- Opción de agregar más productos

#### 6. **Datos del Cliente** 📝
- **Nombre completo**: Para personalización
- **Teléfono**: Coordinación de entrega
- **Dirección detallada**: Con referencias para delivery
- **Validación completa**: Campos obligatorios
- **Nota de Privacidad**: Datos solo para el pedido actual

#### 7. **Envío por WhatsApp** 📱
- Formato profesional automático
- Todos los datos organizados por tipo de producto
- Enlace directo a WhatsApp Business
- Mensaje listo para enviar

## 🍽️ Menú Completo Disponible


#### 🍝 Pasta Linguini a la Bolognesa - $4.00
- Pasta linguini artesanal
- Salsa bolognesa casera
- Pan de ajo incluido
- Tajada de plátano

#### 🇻🇪 Pabellón Criollo Venezolano - $5.00
- **Arroz blanco** grano suelto
- **Carne mechada** deshebrada tradicional
- **Caraotas negras** (frijoles negros)
- **Tajadas de plátano** dulce
- Plato completo tradicional venezolano

#### 🫔 Hallacas Venezolanas
**Individual - $3.00 c/u (máximo 9)**
- Masa de maíz amarillo
- Guiso de carne, pollo y cerdo
- Aceitunas, pasas y alcaparras
- Envueltas en hoja de plátano

**Por Mayor - $2.50 c/u (mínimo 10)**
- Ideal para fiestas y reuniones
- Mismo sabor tradicional
- Precio especial por cantidad
- Perfectas para eventos familiares


#### 🍝 Salsa Bolognesa - $5.00
- Carne molida premium
- Tomate fresco y especias
- Listo para calentar
- Rinde para 4-6 porciones

#### 🍅 Salsa Napoli - $5.00
- Salsa tradicional italiana
- Base de tomate puro
- Sin conservantes artificiales
- Perfecta para pastas


#### 🥭 Dulce de Maracuyá (Parchita) - $2.00
- Fruta fresca venezolana
- Textura cremosa artesanal
- Sabor tropical auténtico
- Porción individual

#### 🍋 Dulce de Limón - $2.00
- Limones frescos seleccionados
- Preparación tradicional
- Dulce casero artesanal
- Porción individual

## 💳 Métodos de Pago

### Efectivo 💵
- Pago contra entrega
- Sin comisiones adicionales
- Cambio disponible
- Método tradicional

### Transferencia Bancaria 🏦
- **Banco**: Banco General
- **Tipo**: Cuenta de Ahorro
- **Número**: 04-20-99488149-0
- Enviar comprobante por WhatsApp

### Yappy 📱
- **Número**: 6825-7958
- Pago instantáneo
- Sin comisiones
- Confirmación automática

## 🏗️ Arquitectura del Código

### Componentes Principales (React/Next.js):

- [`WelcomeScreen.tsx`](src/components/WelcomeScreen.tsx): Pantalla de bienvenida y selección inicial de productos.
- [`MenuScreen.tsx`](src/components/MenuScreen.tsx): Muestra el menú completo y permite la selección de productos.
- [`OrderForm.tsx`](src/components/OrderForm.tsx): Gestiona la personalización de cantidades, información del pedido y datos del cliente.
- [`PaymentInfo.tsx`](src/components/PaymentInfo.tsx): Muestra los métodos de pago disponibles.
- [`Button.tsx`](src/components/ui/Button.tsx), [`Card.tsx`](src/components/ui/Card.tsx), [`Icons.tsx`](src/components/ui/Icons.tsx): Componentes UI reutilizables.

### Lógica de Negocio y Estado:

- [`store.ts`](src/lib/store.ts): Gestión del estado global de la aplicación utilizando Zustand.
- [`menu-data.ts`](src/lib/menu-data.ts): Contiene la estructura de datos para el menú y productos.
- [`utils.ts`](src/lib/utils.ts): Funciones de utilidad, como el cálculo de precios y el formateo del mensaje de WhatsApp.

### Estructuras de Datos Clave:

#### `useOrderStore` (Zustand Store):
```typescript
interface OrderState {
    currentOrder: OrderItem;
    allOrders: OrderItem[];
    // ... otras propiedades de estado
    selectDish: (dishType: string) => void;
    changeQuantity: (change: number) => void;
    addAnotherOrder: () => void;
    // ... otras acciones
}
```

#### `OrderItem` Interface:
```typescript
interface OrderItem {
    id: string;
    name: string;
    type: 'dish' | 'sauce' | 'dessert'; // Tipos de producto unificados
    price: number;
    quantity: number;
    forWho?: string;
    // ... otras propiedades específicas del producto
}
```

### Optimizaciones Implementadas:

- **Gestión de Estado Centralizada**: Con Zustand para una reactividad eficiente.
- **Componentización**: Reutilización de UI y lógica.
- **Validación Inteligente**: Límites específicos por producto y campos obligatorios.
- **Cálculo Dinámico**: Precios actualizados en tiempo real.
- **UX Mejorada**: Información clara de precios y cantidades.

## 🎨 Personalización de Estilos

Este proyecto utiliza [Tailwind CSS](https://tailwindcss.com/) para la estilización. Los estilos se definen en [`globals.css`](src/app/globals.css) y se configuran en [`tailwind.config.js`](tailwind.config.js).

### Colores Temáticos por Menú (ejemplos de Tailwind):
```css
/* Definiciones en tailwind.config.js o directamente en clases */
.bg-pabellon {
    background: linear-gradient(45deg, rgba(255,193,7,0.1), rgba(220,53,69,0.1));
    border: 1px solid rgba(255,193,7,0.3);
}
/* ... otros estilos para hallacas, pasta, etc. */
```

### Elementos Visuales Mejorados:
- **Descripciones de Productos**: Información detallada bajo cada opción.
- **Precios Destacados**: Colores distintivos para precios.
- **Notas Informativas**: Cajas con información adicional.
- **Gradientes Temáticos**: Colores según el tipo de comida.

## 📱 Responsive Design

El diseño es completamente responsivo gracias a Tailwind CSS y media queries definidas en [`globals.css`](src/app/globals.css).

### Breakpoints Optimizados (ejemplo de `globals.css`):
```css
@media (max-width: 480px) {
    /* ... estilos específicos para móviles */
}
```

## 🔧 Configuración Personalizable

### Cambiar Información de Contacto:
La información de contacto de WhatsApp e Instagram se gestiona en los componentes relevantes (e.g., [`WelcomeScreen.tsx`](src/components/WelcomeScreen.tsx) o [`OrderForm.tsx`](src/components/OrderForm.tsx)).

```typescript
// Ejemplo en un componente React
const handleWhatsAppClick = () => {
    window.open('https://wa.me/50768257958', '_blank');
};
```

### Modificar Precios por Producto:
Los precios se definen en [`menu-data.ts`](src/lib/menu-data.ts) y se calculan en funciones de utilidad (e.g., en [`utils.ts`](src/lib/utils.ts) o dentro del store de Zustand).

```typescript
// Ejemplo en src/lib/menu-data.ts
export const menuItems = [
    { id: 'pasta-linguini', name: 'Pasta Linguini a la Bolognesa', price: 4.00, type: 'dish', ... },
    { id: 'salsa-bolognesa', name: 'Salsa Bolognesa', price: 5.00, type: 'sauce', ... },
    { id: 'dulce-maracuya', name: 'Dulce de Maracuyá', price: 2.00, type: 'dessert', ... },
    // ...
];
```

### Actualizar Datos de Pago:
Los datos de pago se encuentran en el componente [`PaymentInfo.tsx`](src/components/PaymentInfo.tsx).

```tsx
{/* Ejemplo en src/components/PaymentInfo.tsx */}
<div>
    <span>Yappy: </span>
    <strong>6825-7958</strong>
</div>
```

### Agregar Nuevos Productos:
Para agregar nuevos productos, se debe actualizar la estructura de datos en [`menu-data.ts`](src/lib/menu-data.ts) y, si es necesario, ajustar la lógica de renderizado en [`MenuScreen.tsx`](src/components/MenuScreen.tsx) y el cálculo de precios.

## 🐛 Solución de Problemas

### Logo no se muestra:
```bash
# Solución:
1. Verifica la ruta de la imagen en `public/images/` (e.g., `public/images/La cocina de anita logo cosido 2 (sin fondo).png`).
2. Confirma que el archivo existe y tiene el nombre exacto.
3. Revisa las referencias a la imagen en los componentes (e.g., `WelcomeScreen.tsx`).
```

### Precios no se calculan correctamente:
```bash
# Solución:
1. Verifica la lógica de cálculo de precios en `src/lib/utils.ts` o en el store de Zustand (`src/lib/store.ts`).
2. Confirma que las cantidades (`quantity`) se actualizan correctamente en el estado.
3. Revisa las definiciones de precios en `src/lib/menu-data.ts`.
```

### Selección de productos no funciona correctamente:
```bash
# Solución:
1. Revisa la lógica de selección de productos en `src/components/MenuScreen.tsx` y las acciones del store de Zustand (`src/lib/store.ts`).
2. Confirma que las variables de estado se actualizan correctamente.
```

### WhatsApp no recibe formato correcto:
```bash
# Solución:
1. Revisa la función que genera el mensaje de WhatsApp (probablemente en `src/lib/utils.ts`).
2. Verifica el encoding de caracteres especiales.
3. Confirma que el array `allOrders` en el store de Zustand contiene los datos correctos.
```

## 📦 Características Técnicas Avanzadas

### Sistema de Validación por Contexto:
- **Hallacas Individuales**: Máximo 9 unidades.
- **Hallacas Por Mayor**: Mínimo 10 unidades.
- **Productos Generales**: Sin límite específico.
- **Campos Obligatorios**: Validación progresiva en el formulario.

### Navegación Adaptativa:
- **Flujo Dinámico**: Pasos adaptativos según tipo de producto.
- **Saltos Inteligentes**: Omite pasos no aplicables.
- **Memoria de Estado**: Mantiene selecciones previas.
- **Reset Contextual**: Limpieza apropiada por menú.

### Experiencia de Usuario Mejorada:
- **Información Previa**: Descripciones detalladas.
- **Precios Visibles**: Siempre mostrados claramente.
- **Confirmaciones**: Validación en cada paso.
- **Progreso Visual**: Indicadores de avance.

## 🤝 Contribuir

### Ideas de Mejoras Sugeridas:
- 📊 **Dashboard de Ventas**
- 🎁 **Sistema de Promociones**: Descuentos y combos.
- 📍 **Zonas de Entrega**: Mapa interactivo.
- ⭐ **Sistema de Reseñas**: Feedback de clientes.
- 📧 **Notificaciones Email**: Confirmaciones automáticas.
- 📱 **PWA Completa**: App instalable.

## 📝 Changelog

### v2.0.0 (Actual)
- ✅ **Menú Unificado**: Platos principales, salsas y postres en un solo menú.
- ✅ **Productos Venezolanos**: Hallacas, Pabellón, Dulces típicos.
- ✅ **Precios Diferenciados**: Por tipo y cantidad de producto.
- ✅ **Hallacas Especiales**: Individual vs Por Mayor con precios distintos.
- ✅ **UX Mejorada**: Navegación contextual y información clara.
- ✅ **Validación Avanzada**: Límites específicos por producto.

### v1.0.0 (Anterior)
- ✅ Sistema básico de pedidos.
- ✅ Solo milanesas y pabellón.
- ✅ Integración WhatsApp básica.
- ✅ Diseño responsive inicial.

### Próximas Versiones:
- 📊 **v2.1.0**: Analytics detallados por menú.
- 🎯 **v2.2.0**: Panel administrativo web.
- 🏅 **v2.3.0**: Programa de fidelidad.

## 👨‍💻 Autor

**Tu Nombre**
- GitHub: [@tykillita](https://github.com/tykillita)
- LinkedIn: [rubenpino](https://www.linkedin.com/in/rubenpino/)
- Proyecto: [La Cocina de Anita Menu](https://github.com/tykillita/LaCocinadeAnitaMenu)

## 🙏 Agradecimientos

- 🍽️ **La Cocina de Anita**: Por la inspiración y el concepto original.
- 🇻🇪 **Cultura Gastronómica**: Por los sabores auténticos que inspiraron este proyecto.
- 📱 **WhatsApp Business**: Por facilitar la comunicación comercial.
- 🎨 **Diseño Responsivo**: Por hacer accesible la experiencia en cualquier dispositivo.
- 🌟 **Comunidad Open Source**: Por las herramientas que hacen posible este proyecto.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 📞 Contacto del Restaurante

### La Cocina de Anita
- 📱 **WhatsApp**: +507 6825-7958
- 📸 **Instagram**: [@lacocinadeanita507](https://www.instagram.com/lacocinadeanita507/)
- 🕒 **Horarios**: Consultar disponibilidad por WhatsApp
- 🚚 **Entregas**: Zona de Panamá (consultar cobertura)
- 🇻🇪 **Especialidad**: Comida casera venezolana auténtica

### Productos Destacados:
- 🫔 **Hallacas**: Disponibles todo el año
- 🇻🇪 **Pabellón**: El sabor de Venezuela en tu mesa
- 🍝 **Salsas Artesanales**: Para disfrutar en casa
- 🍯 **Postres Caseros**: Dulces tradicionales venezolanos

**¿Te gustó el proyecto? ¡Dale una ⭐ en GitHub y prueba los auténticos sabores venezolanos de La Cocina de Anita!**

¡Que aproveche! 🍽️🇻🇪✨