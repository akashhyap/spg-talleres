/**
 * Datos centrales del negocio (fuente única de verdad).
 * El NAP (Nombre, Dirección, Teléfono) debe coincidir EXACTAMENTE con la
 * ficha de Google Business Profile para mantener la coherencia en SEO local.
 *
 * ⚠️ PENDIENTE DE CONFIRMAR POR EL CLIENTE:
 *   - Horario completo (la ficha de Google solo mostraba "Cierra a las 16:00").
 *   - Email de contacto.
 *   - Servicios exactos (basados en la red SPG Talleres + ficha de Google).
 */

export const site = {
  name: 'Taller Isidro A. Pons',
  legalName: 'Taller Isidro A. Pons',
  brand: 'SPG Talleres',
  shortName: 'Taller Isidro Pons',
  foundedYear: 1925,
  tagline: 'Taller mecánico de confianza en Palma desde 1925',
  description:
    'Taller mecánico multimarca en Palma de Mallorca, miembro de la red SPG Talleres. ' +
    'Mantenimiento, mecánica, electricidad, neumáticos, diagnosis y preparación de la ITV ' +
    'con garantía y atención cercana desde 1925.',

  // NAP — debe coincidir con Google Business Profile
  phone: '+34 971 27 33 88',
  phoneHref: '+34971273388',
  // ⚠️ Email provisional — el cliente debe confirmar el correo real.
  email: 'info@tallerisidropons.es',

  address: {
    street: 'Carrer Joan Mestre, 42',
    district: 'Llevant',
    locality: 'Palma',
    region: 'Illes Balears',
    postalCode: '07005',
    country: 'ES',
    countryName: 'España',
  },

  geo: {
    latitude: 39.5746882,
    longitude: 2.663295,
  },
  plusCode: 'HMF7+V8 Palma',
  // Enlace directo a la ficha de Google Maps del negocio.
  googleMapsUrl:
    'https://www.google.com/maps/place/Spg+Talleres+Taller+Isidro+A.+Pons/@39.5746882,2.663295,17z',
  googleMapsEmbed:
    'https://www.google.com/maps?q=Carrer+Joan+Mestre+42,+07005+Palma,+Illes+Balears&output=embed',

  rating: {
    value: 4.3,
    count: 37,
  },

  // ⚠️ Horario provisional — confirmar con el cliente.
  // La ficha de Google indicaba "Cierra a las 16:00".
  openingHours: [
    { days: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'], opens: '08:00', closes: '16:00' },
  ] as const,
  openingHoursSummary: 'Lunes a viernes: 8:00 – 16:00',
  closedSummary: 'Sábados y domingos: cerrado',

  // Pagos aceptados (de la ficha de Google)
  payments: ['Tarjeta de crédito', 'Tarjeta de débito', 'Pago móvil NFC'],

  areaServed: ['Palma', 'Llevant', 'Pere Garau', 'Mallorca', 'Illes Balears'],

  social: {
    facebook: 'https://www.facebook.com/p/Taller-Isidro-Pons-desde-1925-100063571930660/',
    whatsapp: 'https://wa.me/34971273388',
  },

  // CTA de WhatsApp con mensaje predefinido
  whatsappCta:
    'https://wa.me/34971273388?text=' +
    encodeURIComponent('Hola, me gustaría pedir cita / información para mi vehículo.'),
} as const;

export type Site = typeof site;
