// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Dominio del sitio. Configurable por variable de entorno para no tener que
// tocar el código al cambiar de entorno:
//   - Producción:  SITE_URL=https://www.tudominio.es npm run build
//   - Staging:     SITE_URL=https://<tu-app>.cloudwaysapps.com npm run build
//                  (así el canonical es auto-referencial y Lighthouse no penaliza)
// Si no se define, se usa el dominio definitivo provisional.
const SITE = process.env.SITE_URL || 'https://www.tallerisidropons.es';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  trailingSlash: 'ignore',
  build: {
    // Incrusta el CSS en el HTML: elimina la petición de CSS que bloquea el
    // renderizado y permite descubrir las fuentes de inmediato (sin cadena).
    inlineStylesheets: 'always',
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
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
