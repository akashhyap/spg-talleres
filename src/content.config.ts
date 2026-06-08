import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Colección "services" — páginas de servicio (sección núcleo del mapa temático).
 * El enlazado interno se define de forma estructural con el campo `related`.
 */
const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    shortTitle: z.string(),
    // Meta description (≈ 150-160 caracteres)
    description: z.string(),
    // Entradilla visible en la página y en las tarjetas
    summary: z.string(),
    icon: z.string(),
    order: z.number(),
    featured: z.boolean().default(false),
    // Slugs de servicios relacionados (enlazado contextual)
    related: z.array(z.string()).default([]),
    keywords: z.array(z.string()).default([]),
  }),
});

/**
 * Colección "guias" — contenido informativo (sección externa / autoridad temática).
 * Da soporte a las páginas de servicio mediante enlaces contextuales.
 */
const guias = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guias' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    summary: z.string(),
    publishDate: z.coerce.date(),
    relatedServices: z.array(z.string()).default([]),
    keywords: z.array(z.string()).default([]),
  }),
});

export const collections = { services, guias };
