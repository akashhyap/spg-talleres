// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// URL del sitio. ⚠️ PUNTO ÚNICO DE CAMBIO: cuando se contrate el dominio
// definitivo, basta con cambiar este valor (o definir la variable de entorno
// SITE_URL) y reconstruir. Afecta a canonical, sitemap y Open Graph.
//   p. ej.:  SITE_URL=https://www.tudominio.es npm run build
// Por ahora se usa la URL actual de Cloudways para que el canonical sea
// auto-referencial y no penalice en las auditorías SEO.
const SITE = process.env.SITE_URL || 'https://phpstack-186938-6474031.cloudwaysapps.com';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  trailingSlash: 'ignore',
  build: {
    // Incrusta el CSS en el HTML: elimina la petición de CSS que bloquea el
    // renderizado y permite descubrir las fuentes de inmediato (sin cadena).
    inlineStylesheets: 'always',
  },
  // Prefetch desactivado: tras el proxy de Cloudways las peticiones de prefetch
  // salían por http:// y el navegador las bloqueaba (Mixed Content), generando
  // errores en consola que penalizaban "Best Practices". El prefetch quedaba
  // además inutilizado al estar bloqueado. Si en el dominio definitivo el HTTPS
  // se gestiona correctamente, puede reactivarse.
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap({
      i18n: undefined,
      filter: (page) => !page.includes('/404'),
    }),
  ],
});
