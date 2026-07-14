---
name: noctip-ui
description: Use when creating, modifying, or reviewing UI components for Noctip. Contains design system rules, color palette, component patterns, Tailwind conventions, and accessibility requirements. Trigger keywords: component, UI, styles, Tailwind, design, colors, layout, responsive, mobile, animation.
---

# Noctip UI Skill

## When to use
Use this skill when working on any UI component, page, or visual element of the Noctip project. This includes:
- Creating new components
- Modifying existing components
- Styling changes
- Responsive design
- Animations
- Accessibility fixes

## Design Rules

### Colors (always use these exact values)
```
Background:     #080c12
Surface:        #0d1219
Elevated:       #111720
Primary:        #10BFD8
Text:           #f2eee7
Text secondary: #8791a1
Text muted:     #6b7785
Border:         rgba(255,255,255,0.06)
Border hover:   rgba(255,255,255,0.12)
```

### Component Patterns

**Card:**
```tsx
className="rounded-2xl border border-white/[0.06] bg-[#0d1219] 
           transition-all duration-300 
           hover:border-white/[0.12] 
           hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]"
```

**Primary Button (white):**
```tsx
className="rounded-full bg-white px-8 py-4 text-[15px] font-bold text-[#080c12]
           transition-all duration-300 hover:-translate-y-0.5 
           hover:shadow-[0_8px_40px_rgba(255,255,255,0.15)]
           min-h-[52px]"
```

**Secondary Button (outline):**
```tsx
className="rounded-full border border-white/10 px-8 py-4 text-[15px] 
           font-medium text-[#b8c4d0]
           transition-all duration-300 hover:border-white/25 hover:text-white
           min-h-[52px]"
```

**Badge:**
```tsx
className="rounded-full bg-[#10BFD8]/15 px-2.5 py-0.5 
           text-[10px] font-bold uppercase tracking-wide text-[#10BFD8]"
```

### Animation Pattern (Framer Motion)
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-40px' }}
  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
>
```

### Mobile First
- Design for 375px first
- Use horizontal scroll for mobile carousels
- Minimum touch target: 44x44px
- Sticky CTA at bottom for product pages

### i18n
- Always use `useLocale()` for language detection
- Always use `useTranslations()` or hardcoded es/en objects
- Never hardcode user-facing text without i18n support

### Accessibility
- Minimum contrast ratio: 4.5:1 for text
- All images need alt text
- Form inputs need visible labels
- Focus states must be visible
- Skip-to-content link for keyboard navigation
