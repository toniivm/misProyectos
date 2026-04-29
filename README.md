# FLAGVIBE — Tienda de Productos Personalizados

FLAGVIBE es una tienda para productos personalizados: banderas, gorras, parches, llaveros y pegatinas. Diseña tu producto, añade texto o logo, y te lo entregamos listo para usar.
## Desarrollo local

1. Instala dependencias:
```
npm install
```
2. Inicia el backend (modo mock para evitar servicios externos):

PowerShell:
```
cd server
$env:SKIP_EXTERNAL='1'
npm run dev
```
3. En otra terminal, inicia el frontend:

```
cd ..
npm start
```
Abre `http://localhost:3000` (o el puerto que indique la app) para ver la tienda.

## Catálogo
El catálogo por defecto contiene productos orientados a personalización (banderas, gorras, accesorios). Puedes editar `server/src/products.js` y `src/data/products.js` para cambiar imágenes y descripciones.

## Pruebas rápidas
- Abre un producto, añade personalización (texto o imagen), añádelo al carrito.
- Ve a la página de checkout para verificar que el payload incluye el objeto `personalization` por ítem.

Si quieres que adapte el diseño visual a unas imágenes que tienes, pásame las imágenes o indícame los assets a reemplazar en `/public/img`.
## Catálogo destacado

FLAGVIBE se centra en productos personalizables: gorras, banderas, sudaderas y accesorios. El catálogo de ejemplo incluye artículos pensados para personalización (texto, logo, colores y posiciones de impresión).

- 📦 Productos: Gorras, Banderas, Sudaderas, Pegatinas, Llaveros
- 🎨 Opciones de personalización: Texto, tipografías, colores, posiciones
- 🚚 Envío: Entregas rápidas y seguimiento de pedidos

Puedes editar `server/src/products.js` y `src/data/products.js` para cambiar imágenes y descripciones de ejemplo.

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
