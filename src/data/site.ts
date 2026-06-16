/**
 * Datos centrales del negocio.
 *
 * Los valores EDITABLES viven en `site.json` (para que el Portal CMS pueda
 * editarlos sin tocar código). Este archivo solo los carga y CALCULA los campos
 * derivados (enlaces de teléfono y WhatsApp), de modo que al cambiar el teléfono
 * en `site.json` se actualizan todos los enlaces automáticamente.
 *
 * El NAP (Nombre, Dirección, Teléfono) debe coincidir EXACTAMENTE con la ficha
 * de Google Business Profile.  ⚠️ Email aún provisional.
 */
import data from './site.json';

// Teléfono para enlaces tel: (sin espacios) y número para wa.me (sin "+").
const phoneHref = data.phone.replace(/\s+/g, '');
const waNumber = phoneHref.replace(/^\+/, '');
const whatsapp = `https://wa.me/${waNumber}`;
const whatsappCta = `${whatsapp}?text=${encodeURIComponent(data.whatsappMessage)}`;

export const site = {
  ...data,
  phoneHref,
  social: { ...data.social, whatsapp },
  whatsappCta,
};

export type Site = typeof site;
