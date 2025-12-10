# 🔒 VALTREX - Sneakers Premium Multimarca

Tienda online multimarca de sneakers premium con máxima seguridad y privacidad. Envío discreto, pago 100% cifrado SSL y autenticación de productos garantizada. Nike, Adidas, Balenciaga, Gucci, Off-White, Prada y más marcas exclusivas.

## 🎯 Demo en Vivo

🌐 **[https://valtre.onrender.com/](https://valtre.onrender.com/)**

## 🚀 Despliegue en Render (backend y frontend)

- Backend Render: `https://valtre-backend.onrender.com` (service id: `srv-d4mvuvchg0os73c7n47g`).
- Frontend debe tener `REACT_APP_API_URL=https://valtre-backend.onrender.com` en las env vars de Render.
- Backend env vars mínimas: `ADMIN_API_KEY`, `STRIPE_SECRET_KEY`, `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` (usa `\n`), opcional `SENDGRID_API_KEY`, `SENDER_EMAIL`, `STRIPE_WEBHOOK_SECRET`.
- Seed de stock en Firestore (requiere `ADMIN_API_KEY`):
```bash
curl -X POST https://valtre-backend.onrender.com/admin/seed-products \
  -H "x-admin-key: <ADMIN_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{"defaultStock":25}'
```
- Alternativa (Windows/PowerShell):
  ```pwsh
  $env:ADMIN_API_KEY="<ADMIN_API_KEY>"
  ./scripts/seed_products.ps1 -ApiBase "https://valtre-backend.onrender.com" -DefaultStock 25
  ```


## 🔐 Seguridad y Confianza

- 🛡️ **SSL Seguro**: Pago 100% cifrado con certificado SSL
- 🚀 **Envío Discreto**: Entrega rápida 24-48h sin información visible
- ✅ **100% Auténtico**: Todos los productos con garantía de autenticidad verificada
- 🔒 **Privacidad Total**: Datos protegidos, sin tracking de ubicación
- 💳 **Múltiples Métodos de Pago**: VISA, Mastercard, Apple Pay, PayPal, Google Pay, Crypto
- 🏦 **Pago Seguro**: Procesamiento bancario certificado PCI DSS

## ✨ Características Principales

- 🏆 **15 Marcas Premium**: Nike, Adidas, Balenciaga, Gucci, Off-White, Prada, Alexander McQueen, Golden Goose, New Balance, Versace, Salomon, Veja, Rick Owens, Converse
- 👟 **30 Modelos Exclusivos**: Desde Jordan 1 hasta Balenciaga Triple S
- 💎 **Precios de Lujo**: Productos desde 109€ hasta 1299€
- 🎨 **Diseño Moderno y Responsive**: Interfaz elegante adaptada a todos los dispositivos
- 🛒 **Carrito de Compras**: Sistema completo con gestión de productos y tallas
- 💝 **Lista de Deseos (Wishlist)**: Guarda tus sneakers favoritas con persistencia en localStorage
- 🔐 **Autenticación con Firebase**: Login y registro de usuarios con encriptación
- 🔍 **Filtros por Marca**: Búsqueda inteligente por marca, precio y ordenamiento
- 💳 **Checkout Completo**: Proceso de pago paso a paso con validaciones de seguridad
- 🎯 **Animaciones Suaves**: Transiciones con Framer Motion para UX premium
- 🏷️ **Secciones Destacadas**: Novedades, Ofertas y Productos Populares
- 🎨 **Tema Personalizado**: Diseño minimalista negro con badges de confianza
- 📱 **100% Responsive**: Optimizado para móvil, tablet y escritorio
- 🔒 **Privacidad Total**: Sin información de ubicación visible, envíos anónimos
- 🐳 **Docker Ready**: Configuración completa para despliegue con Docker y Nginx

## 👟 Catálogo por Marcas

### Nike (4 modelos)
- Air Jordan 1 Chicago - 189.99€
- Dunk Low Panda - 129.99€
- TN Triple Black - 199.99€
- Travis Scott Jordan 1 - 899.99€

### Adidas (4 modelos)
- Yeezy Boost 350 V2 Zebra - 399.99€
- Samba OG - 119.99€
- Gazelle Bold Pink - 139.99€
- Bad Bunny Campus - 449.99€

### Balenciaga (3 modelos)
- Triple S Clear Sole - 1099.99€
- Speed Trainer Black - 799.99€
- Track LED - 1299.99€

### Gucci (3 modelos)
- Ace Bee Embroidery - 699.99€
- Rhyton Vintage - 899.99€
- Screener Leather - 749.99€

### Marcas Premium
- **Off-White**: Out Of Office, Odsy-1000
- **Prada**: Cloudbust Thunder, America's Cup
- **Alexander McQueen**: Oversized, Tread Slick Boot
- **Golden Goose**: Superstar, Mid Star Leopard
- **New Balance**: 550, 2002R
- **Versace**: Chain Reaction
- **Salomon**: XT-6, CDG Speedcross
- **Rick Owens**: DRKSHDW Ramones
- **Veja**: V-10 Eco-Luxury
- **Converse**: CDG Play Chuck 70

## 🚀 Tecnologías Utilizadas

- **React 19.2** - Framework principal
- **React Router DOM** - Navegación entre páginas
- **Firebase** - Autenticación y base de datos
- **Framer Motion** - Animaciones y transiciones
- **Tailwind CSS** - Estilos y diseño responsive
- **Lucide React** - Iconos modernos
- **Context API** - Gestión de estado global

## 📦 Instalación

1. **Clonar el repositorio**
```bash
git clone [URL_DEL_REPOSITORIO]
cd misProyectos
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar Firebase**
   - Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
   - Copia tus credenciales en `src/firebase/config.js`

4. **Iniciar el servidor de desarrollo**
```bash
npm start
```

La aplicación se abrirá en [http://localhost:3000](http://localhost:3000)

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Header.jsx      # Barra de navegación
│   ├── ProductCard.jsx # Tarjeta de producto
│   ├── CartSidebar.jsx # Panel lateral del carrito
│   └── ...
├── pages/              # Páginas principales
│   ├── HomePage.jsx    # Página de inicio
│   ├── ProductPage.jsx # Catálogo de productos
│   ├── ProductDetailPage.jsx # Detalle del producto
│   ├── CheckoutPage.jsx # Proceso de compra
│   └── ...
├── context/            # Context API para estado global
│   ├── CartContext.jsx # Estado del carrito
│   └── AuthContext.jsx # Estado de autenticación
├── data/               # Datos de la aplicación
│   └── products.js     # Catálogo de productos
├── firebase/           # Configuración de Firebase
│   └── config.js
└── App.jsx            # Componente principal
```

## 🎯 Funcionalidades Detalladas

### 🏠 Página de Inicio
- Hero section con búsqueda
- Filtros por categoría (Camisetas, Pantalones, Chaquetas, etc.)
- Ordenamiento por precio, nombre y novedades
- Filtros de rango de precio
- Grid responsive de productos

### 🛍️ Catálogo de Productos
- 15+ productos en diferentes categorías
- Información detallada de cada producto
- Imágenes de alta calidad
- Etiquetas de "NUEVO" y descuentos
- Indicadores de colores disponibles

### 📱 Detalle de Producto
- Galería de imágenes con miniaturas
- Selector de tallas interactivo
- Selector de cantidad
- Información de envío y devoluciones
- Productos relacionados
- Sistema de reseñas
- Guía de tallas
- Botón de favoritos y compartir

### 🛒 Carrito de Compras
- Sidebar deslizante
- Vista detallada de productos
- Gestión de cantidades
- Cálculo automático de totales
- Persistencia en localStorage

### 💳 Checkout
- Proceso en 3 pasos:
  1. Información de envío
  2. Método de pago
  3. Confirmación de pedido
- Validación de formularios
- Opciones de envío (estándar, express, urgente)
- Resumen del pedido en tiempo real
- Confirmación visual con número de pedido

## 🎨 Catálogo de Productos

El proyecto incluye 15 productos distribuidos en 5 categorías:

- **Camisetas**: Básicas, Oversize, Estampadas
- **Pantalones**: Jeans, Cargo, Chinos
- **Chaquetas**: Denim, Bomber, Parka
- **Sudaderas**: Hoodie, Crewneck, Zip
- **Accesorios**: Gorras, Mochilas, Cinturones

## 🔧 Scripts Disponibles

### `npm start`
Inicia el servidor de desarrollo en [http://localhost:3000](http://localhost:3000)

### `npm test`
Ejecuta los tests en modo interactivo

### `npm run build`
Crea una versión optimizada para producción en la carpeta `build`

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
