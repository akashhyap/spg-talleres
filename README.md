# Taller Isidro A. Pons — Sitio web (SPG Talleres, Palma)

Sitio web del **Taller Isidro A. Pons**, taller mecánico de la red SPG en Palma de Mallorca.
Construido con **Astro + Tailwind CSS**, estático, optimizado para SEO local y accesibilidad.

## Stack

- **Astro 5** (salida estática, islas mínimas de JS)
- **Tailwind CSS 4** (configuración CSS-first en `src/styles/global.css`)
- **astro:assets** `<Image>` para imágenes optimizadas (AVIF/WebP)
- **Fuentes variables autoalojadas** (Sora + Inter), subconjunto `latin`
- **@astrojs/sitemap** + datos estructurados Schema.org (`AutoRepair`, `Service`, `BreadcrumbList`, `Article`)

## Comandos

```bash
npm install            # instalar dependencias
npm run gen:images     # generar imágenes placeholder (sharp) — ejecutar antes del primer build
npm run dev            # servidor de desarrollo
npm run build          # build de producción → dist/
npm run preview        # previsualizar el build
```

> Las imágenes de `src/assets/*.jpg` y `public/og-image.jpg` son **placeholders** generados
> automáticamente. Sustitúyelas por fotos reales del taller (mismos nombres de archivo).

## Estructura

- `src/data/site.ts` — **fuente única** de datos del negocio (NAP, horario, redes…).
- `src/content/services/` — 12 páginas de servicio (Markdown). El enlazado interno se
  define con el campo `related` de cada archivo.
- `src/content/guias/` — guías informativas (sección de autoridad temática).
- `src/components/`, `src/layouts/`, `src/pages/` — UI y rutas.

## ⚠️ Pendiente de completar por el cliente

1. **Horario completo** — provisional (`Lun–Vie 8:00–16:00`) en `src/data/site.ts`.
2. **Correo electrónico** real de contacto — provisional en `src/data/site.ts`.
3. **Datos fiscales** (razón social, NIF/CIF) en las páginas legales (`aviso-legal`, `politica-de-privacidad`).
4. **Fotos reales** del taller, fachada y equipo.
5. **Dominio definitivo** — actualizar `site` en `astro.config.mjs` y en `public/robots.txt`.
6. **Formulario de contacto** — ahora envía por **WhatsApp**. Para conectar **GoHighLevel**,
   sustituir el listener `submit` en `src/components/ContactForm.astro` por el POST/embed de GHL
   (los `name` de los campos ya están preparados para el mapeo).

## Despliegue

Salida 100% estática en `dist/`. Compatible con Netlify, Vercel o Cloudflare Pages
(build: `npm run build`, directorio de publicación: `dist`).
