// Mock visual del HERO propuesto (conversion-focused) -> /tmp/spg-logos/*.png
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const C = {
  b50: '#eef5fc', b100: '#d7e7f7', b200: '#b3cfee', b500: '#2e69b4', b600: '#1f5197',
  b700: '#1a4179', b900: '#122a4d', b950: '#0c1c34', acc: '#f1880f', acc4: '#f7a524',
  slate400: '#94a3b8', slate500: '#64748b', slate600: '#475569', slate700: '#334155',
  white: '#ffffff', green: '#16a34a', line: '#e2e8f0',
};

function cog(cx, cy, rOut, n, disc, hole, center) {
  const tw = rOut * 0.3, tl = rOut * 0.5; let t = '';
  for (let i = 0; i < n; i++) { const a = (i * 360) / n; t += `<rect x="${cx - tw / 2}" y="${cy - rOut}" width="${tw}" height="${tl}" rx="${tw * 0.35}" fill="${disc}" transform="rotate(${a} ${cx} ${cy})"/>`; }
  return `${t}<circle cx="${cx}" cy="${cy}" r="${rOut * 0.82}" fill="${disc}"/><circle cx="${cx}" cy="${cy}" r="${rOut * 0.4}" fill="${hole}"/><circle cx="${cx}" cy="${cy}" r="${rOut * 0.17}" fill="${center}"/>`;
}
const T = (x, y, s, w, fill, txt, extra = '') => `<text x="${x}" y="${y}" font-family="Arial, sans-serif" font-size="${s}" font-weight="${w}" fill="${fill}" ${extra}>${txt}</text>`;
const stars = (x, y, s) => {
  let out = ''; for (let i = 0; i < 5; i++) out += `<text x="${x + i * (s * 1.05)}" y="${y}" font-family="Arial" font-size="${s}" fill="${i < 4 ? C.acc4 : C.b200}">★</text>`; return out;
};
const pill = (x, y, w, h, txt, ic = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="#fff" stroke="${C.line}"/>${ic}${T(x + (ic ? 34 : 16), y + h / 2 + 5, 14, 700, C.b700, txt)}`;

function desktop() {
  const W = 1320, H = 760, gx = 72;
  const grad = `<defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.b50}"/><stop offset="1" stop-color="#ffffff"/></linearGradient>
    <linearGradient id="img" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.b600}"/><stop offset="1" stop-color="${C.b950}"/></linearGradient>
  </defs>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  ${grad}
  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <!-- estado en vivo -->
  ${pill(gx, 56, 232, 36, 'Abierto ahora · cierra 16:00', `<circle cx="${gx + 18}" cy="74" r="5" fill="${C.green}"/>`)}

  <!-- titular -->
  ${T(gx, 165, 56, 800, C.b900, 'Reparamos tu coche')}
  ${T(gx, 225, 56, 800, C.b900, 'sin sorpresas en ' )}
  ${T(gx + 488, 225, 56, 800, C.b600, 'Palma')}

  <!-- subtítulo -->
  ${T(gx, 282, 19, 400, C.slate600, 'Mantenimiento, frenos, neumáticos, diagnosis y preparación de la ITV.')}
  ${T(gx, 310, 19, 400, C.slate600, 'Taller multimarca de la red SPG Talleres, con garantía y presupuesto')}
  ${T(gx, 338, 19, 400, C.slate600, 'claro antes de empezar. Pide cita en 1 minuto.')}

  <!-- CTAs -->
  <rect x="${gx}" y="372" width="288" height="60" rx="14" fill="${C.b600}"/>
  ${cog(gx + 34, 402, 13, 9, '#fff', C.b600, C.acc4)}
  ${T(gx + 58, 409, 17, 700, '#fff', 'Pedir cita por WhatsApp')}
  <rect x="${gx + 304}" y="372" width="210" height="60" rx="14" fill="#fff" stroke="${C.b200}"/>
  ${T(gx + 330, 409, 17, 700, C.b700, '📞  971 27 33 88')}

  <!-- barra de confianza -->
  <g transform="translate(${gx} 472)">
    ${stars(0, 14, 18)} ${T(96, 18, 16, 800, C.b900, '4,3')} ${T(124, 18, 14, 400, C.slate500, '· 37 reseñas Google')}
    <line x1="290" y1="0" x2="290" y2="22" stroke="${C.line}"/>
    ${T(308, 18, 15, 700, C.b800 || C.b700, 'Desde 1925')}
    <line x1="420" y1="0" x2="420" y2="22" stroke="${C.line}"/>
    ${T(438, 18, 15, 700, C.b700, 'Garantía SPG')}
    <line x1="560" y1="0" x2="560" y2="22" stroke="${C.line}"/>
    ${T(578, 18, 15, 700, C.b700, 'Multimarca')}
  </g>

  <!-- accesos rápidos a servicios -->
  ${['Mantenimiento', 'Frenos', 'Neumáticos', 'Diagnosis', 'Pre-ITV'].map((s, i) => {
    const w = s.length * 9 + 28; let x = gx; for (let j = 0; j < i; j++) x += (['Mantenimiento', 'Frenos', 'Neumáticos', 'Diagnosis', 'Pre-ITV'][j].length * 9 + 28) + 10;
    return `<rect x="${x}" y="528" width="${w}" height="36" rx="18" fill="${C.b50}" stroke="${C.b100}"/>${T(x + 14, 551, 13, 600, C.b700, s)}`;
  }).join('')}

  <!-- imagen -->
  <rect x="772" y="70" width="476" height="468" rx="24" fill="url(#img)"/>
  <circle cx="1180" cy="150" r="120" fill="#ffffff" opacity="0.05"/>
  ${cog(1010, 250, 34, 9, C.acc4, C.b700, '#fff')}
  ${T(1010, 340, 22, 700, '#fff', 'Foto real del taller', 'text-anchor="middle"')}
  ${T(1010, 366, 13, 400, C.b100, '(sustituir por foto del cliente)', 'text-anchor="middle"')}

  <!-- tarjeta flotante: reseñas Google -->
  <rect x="980" y="96" width="250" height="74" rx="16" fill="#fff" stroke="${C.line}"/>
  ${T(1000, 128, 26, 800, C.b900, '4,3')} ${stars(1044, 124, 15)}
  ${T(1000, 152, 12, 400, C.slate500, '37 reseñas verificadas en Google')}

  <!-- tarjeta flotante: garantía -->
  <rect x="740" y="470" width="250" height="74" rx="16" fill="#fff" stroke="${C.line}"/>
  <rect x="758" y="488" width="40" height="40" rx="11" fill="${C.b600}"/>
  ${T(770, 514, 20, 700, '#fff', '✓')}
  ${T(810, 504, 15, 800, C.b900, 'Garantía SPG')}
  ${T(810, 526, 12, 400, C.slate500, 'Piezas y mano de obra')}

  <!-- nota -->
  ${T(gx, 660, 13, 700, C.slate400, 'MOCK — propuesta de nuevo hero (conversion-focused)')}
</svg>`;
}

function mobile() {
  const W = 392, H = 800, gx = 22;
  const grad = `<defs><linearGradient id="bg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.b50}"/><stop offset="1" stop-color="#ffffff"/></linearGradient><linearGradient id="img2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.b600}"/><stop offset="1" stop-color="${C.b950}"/></linearGradient></defs>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  ${grad}<rect width="${W}" height="${H}" fill="url(#bg2)"/>
  <!-- barra superior simulada -->
  <rect x="0" y="0" width="${W}" height="56" fill="#fff"/>
  ${cog(34, 28, 13, 9, C.b700, '#fff', C.acc)}
  ${T(54, 26, 14, 700, C.b900, 'Taller Isidro Pons')}
  ${T(54, 40, 8, 600, C.b500, 'SPG TALLERES', 'letter-spacing="2"')}
  ${pill(gx, 76, 210, 32, 'Abierto ahora · cierra 16:00', `<circle cx="${gx + 16}" cy="92" r="4.5" fill="${C.green}"/>`)}
  ${T(gx, 150, 30, 800, C.b900, 'Reparamos tu')}
  ${T(gx, 186, 30, 800, C.b900, 'coche en Palma')}
  ${T(gx, 224, 14, 400, C.slate600, 'Mantenimiento, frenos, neumáticos,')}
  ${T(gx, 244, 14, 400, C.slate600, 'diagnosis e ITV. Garantía SPG.')}
  <!-- imagen -->
  <rect x="${gx}" y="266" width="348" height="180" rx="18" fill="url(#img2)"/>
  ${cog(196, 340, 26, 9, C.acc4, C.b700, '#fff')}
  ${T(196, 392, 13, 600, '#fff', 'Foto real del taller', 'text-anchor="middle"')}
  <!-- confianza -->
  ${stars(gx, 484, 16)} ${T(gx + 92, 488, 15, 800, C.b900, '4,3')} ${T(gx + 118, 488, 12, 400, C.slate500, '· 37 Google')}
  ${T(gx + 232, 488, 13, 700, C.b700, 'Desde 1925')}
  <!-- nota -->
  ${T(gx, 560, 12, 700, C.slate400, 'Barra fija inferior (siempre visible):')}
  <!-- sticky bottom bar -->
  <rect x="0" y="720" width="${W}" height="80" fill="#fff"/>
  <line x1="0" y1="720" x2="${W}" y2="720" stroke="${C.line}"/>
  <rect x="16" y="740" width="172" height="44" rx="12" fill="#fff" stroke="${C.b200}"/>
  ${T(48, 768, 15, 700, C.b700, '📞 Llamar')}
  <rect x="204" y="740" width="172" height="44" rx="12" fill="${C.b600}"/>
  ${cog(228, 762, 11, 9, '#fff', C.b600, C.acc4)}
  ${T(248, 768, 15, 700, '#fff', 'WhatsApp')}
</svg>`;
}

await mkdir('/tmp/spg-logos', { recursive: true });
await sharp(Buffer.from(desktop())).png().toFile('/tmp/spg-logos/hero-desktop.png');
await sharp(Buffer.from(mobile())).png().toFile('/tmp/spg-logos/hero-mobile.png');
console.log('ok');
