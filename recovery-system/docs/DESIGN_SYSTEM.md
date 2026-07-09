# Sistema de Diseño Noctip

## Identidad Visual
- **Tema:** Oscuro premium (no black puro, sino azul oscuro profundo)
- **Estilo:** Minimalista, limpio, Apple/Nothing/WHOOP-like
- **Sensación:** Confianza, premium, tecnología accesible

## Paleta de Colores

### Backgrounds
```css
bg-base:       #080c12    /* Fondo principal de la web */
bg-surface:    #0d1219    /* Cards, paneles laterales */
bg-elevated:   #111720    /* Elementos elevados, inputs */
bg-overlay:    rgba(8,12,18,0.9)  /* Headers con blur */
```

### Acentos
```css
primary:       #10BFD8    /* Cyan — botones, links, acentos */
primary-10:    rgba(16,191,216,0.1)   /* Fondos sutiles */
primary-15:    rgba(16,191,216,0.15)  /* Badges */
primary-20:    rgba(16,191,216,0.2)   /* Bordes activos */
```

### Texto
```css
text-primary:  #f2eee7    /* Texto principal — cálido, no blanco puro */
text-heading:  #f6f2eb    /* Headings — ligeramente más cálido */
text-secondary:#8791a1    /* Texto secundario */
text-muted:    #6b7785    /* Texto apagado, labels */
text-dim:      #5a6678    /* Texto muy apagado */
```

### Bordes
```css
border:        rgba(255,255,255,0.06)   /* Bordes sutiles */
border-hover:  rgba(255,255,255,0.12)   /* Bordes hover */
border-focus:  rgba(255,255,255,0.2)    /* Bordes focus/activo */
```

### Estados
```css
success:       emerald-400  /* Añadido al carrito, éxito */
warning:       amber-300    /* Urgencia, ofertas, -40% */
error:         red-400      /* Errores */
```

## Tipografía

### Escala
```css
Hero title:    clamp(2.6rem, 9vw, 5.5rem)  /* Móvil grande → Desktop */
Section title: clamp(1.8rem, 4vw, 3rem)
Product title: clamp(1.8rem, 4vw, 3rem)
Card title:    14px
Body:          14px (móvil) / 17px (desktop)
Small:         12px
Micro:         10-11px (badges, labels)
```

### Propiedades
```css
Headings:  font-bold tracking-[-0.04em] leading-[0.9]
Body:      leading-[1.5] (móvil) / leading-[1.7] (desktop)
Labels:    uppercase tracking-[0.12em] font-semibold
```

## Espaciados

### Mobile (375px)
```css
Page padding:   px-4 (16px)
Section gap:    py-16 (64px)
Card gap:       gap-3 (12px)
Element gap:    gap-2-3 (8-12px)
```

### Desktop (1440px)
```css
Max width:      max-w-[1280px]
Page padding:   px-6 (24px)
Section gap:    py-28 (112px)
Card gap:       gap-5 (20px)
```

## Componentes

### Cards
```tsx
className="rounded-2xl border border-white/[0.06] bg-[#0d1219] 
           transition-all duration-300 
           hover:border-white/[0.12] 
           hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]"
```

### Botones Primarios
```tsx
// Botón blanco (CTA principal)
className="rounded-full bg-white px-8 py-4 text-[15px] font-bold text-[#080c12]
           transition-all duration-300 
           hover:-translate-y-0.5 
           hover:shadow-[0_8px_40px_rgba(255,255,255,0.15)]
           min-h-[52px]"

// Botón secundario (outline)
className="rounded-full border border-white/10 px-8 py-4 text-[15px] 
           font-medium text-[#b8c4d0]
           transition-all duration-300 
           hover:border-white/25 hover:text-white
           min-h-[52px]"
```

### Badges
```tsx
// Badge de producto (Más vendido, Nuevo, etc.)
className="rounded-full bg-[#10BFD8]/15 px-2.5 py-0.5 
           text-[10px] font-bold uppercase tracking-wide text-[#10BFD8]"

// Badge de descuento
className="rounded-full bg-[#10BFD8]/20 backdrop-blur-md 
           border border-[#10BFD8]/30 px-3 py-1.5 
           text-[12px] font-bold text-[#10BFD8]"
```

### Trust Badges
```tsx
className="flex items-center gap-1.5 rounded-full 
           border border-white/10 bg-white/[0.04] 
           px-3 py-1.5 text-[11px] font-medium text-[#b8c4d0]"
```

## Patrones de Layout

### Mobile First
- Siempre diseñar para 375px primero
- Horizontal scroll en carruseles móviles
- Sticky CTA en bottom para fichas de producto
- Botones mínimo 44x44px (accesibilidad)

### Desktop
- Max-width: 1280px centrado
- Grid de 2-4 columnas para productos
- Sticky sidebar para info de producto
- Header fijo con blur

### Breakpoints Tailwind
```css
sm:  640px   /* Tableta pequeña */
md:  768px   /* Tableta */
lg:  1024px  /* Desktop pequeño */
xl:  1280px  /* Desktop */
2xl: 1536px  /* Desktop grande */
```

## Animaciones (Framer Motion)

### Patrón estándar
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-40px' }}
  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
>
```

### Elementos staggered
```tsx
transition={{ delay: idx * 0.08, duration: 0.5 }}
```

### Hover effects
```tsx
// En cards con Link
className="group block"
// Dentro: group-hover:scale-[1.03], group-hover:text-white
```

## Accesibilidad (WCAG 2.2)

### Requisitos mínimos
- Contraste texto/fondo: mínimo 4.5:1
- Tamaño texto: 16px mínimo en móvil
- Botones: 44x44px mínimo
- Focus visible: outline en elementos interactivos
- Alt texts: siempre en imágenes informativas
- Labels: siempre visibles en formularios
- Skip to content: para navegación por teclado
