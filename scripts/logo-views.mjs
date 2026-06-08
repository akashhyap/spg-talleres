// Vistas del logo: "Taller Isidro Pons" + "SPG TALLERES" + rueda dentada.
// Salida -> /tmp/spg-logos/*.png
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const C = {
  b500: '#2e69b4', b600: '#1f5197', b700: '#1a4179', b900: '#122a4d', b950: '#0c1c34',
  b100: '#d7e7f7', acc: '#f1880f', acc4: '#f7a528', slate: '#64748b', white: '#ffffff',
};

const grad = `<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.b600}"/><stop offset="1" stop-color="${C.b900}"/></linearGradient></defs>`;

// Rueda dentada sólida (disco + dientes + cubo hueco + centro)
function cog(cx, cy, rOut, teeth, disc, hole, center) {
  let t = '';
  const tw = rOut * 0.3, tl = rOut * 0.5;
  for (let i = 0; i < teeth; i++) {
    const a = (i * 360) / teeth;
    t += `<rect x="${cx - tw / 2}" y="${cy - rOut}" width="${tw}" height="${tl}" rx="${tw * 0.35}" fill="${disc}" transform="rotate(${a} ${cx} ${cy})"/>`;
  }
  return `${t}<circle cx="${cx}" cy="${cy}" r="${rOut * 0.82}" fill="${disc}"/><circle cx="${cx}" cy="${cy}" r="${rOut * 0.4}" fill="${hole}"/><circle cx="${cx}" cy="${cy}" r="${rOut * 0.17}" fill="${center}"/>`;
}
// Rueda dentada de contorno (para dentro de una placa)
function cogOutline(cx, cy, rOut, teeth, color, sw) {
  let t = '';
  const tw = rOut * 0.26, tl = rOut * 0.42;
  for (let i = 0; i < teeth; i++) {
    const a = (i * 360) / teeth;
    t += `<rect x="${cx - tw / 2}" y="${cy - rOut}" width="${tw}" height="${tl}" rx="${tw * 0.4}" fill="${color}" transform="rotate(${a} ${cx} ${cy})"/>`;
  }
  return `${t}<circle cx="${cx}" cy="${cy}" r="${rOut * 0.72}" fill="none" stroke="${color}" stroke-width="${sw}"/><circle cx="${cx}" cy="${cy}" r="${rOut * 0.22}" fill="${color}"/>`;
}

function wordmark(x, cy, dark) {
  const main = dark ? C.white : C.b900;
  const sub = dark ? C.b100 : C.b500;
  return `<text x="${x}" y="${cy - 4}" font-family="Arial,sans-serif" font-size="25" font-weight="600" fill="${main}">Taller Isidro Pons</text>
  <text x="${x + 1}" y="${cy + 16}" font-family="Arial,sans-serif" font-size="11" font-weight="400" letter-spacing="3.5" fill="${sub}">SPG TALLERES</text>`;
}

function view({ file, title, mark, favMark, markCx = 108 }) {
  const W = 940, H = 300;
  const wmX = markCx + 52;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <rect width="${W}" height="${H}" fill="#f8fafc"/>
    <text x="40" y="34" font-family="Arial,sans-serif" font-size="18" font-weight="800" fill="${C.b900}">${title}</text>
    ${grad}
    <!-- claro -->
    <rect x="40" y="52" width="560" height="92" rx="14" fill="#ffffff" stroke="#e2e8f0"/>
    ${mark(98, false)}
    ${wordmark(wmX, 98, false)}
    <!-- oscuro -->
    <rect x="40" y="158" width="560" height="92" rx="14" fill="${C.b950}"/>
    ${mark(204, true)}
    ${wordmark(wmX, 204, true)}
    <!-- favicons -->
    <text x="650" y="70" font-family="Arial,sans-serif" font-size="11" font-weight="700" letter-spacing="1.5" fill="${C.slate}">FAVICON</text>
    <g transform="translate(650 82)">${favMark(48)}</g>
    <g transform="translate(712 98)">${favMark(32)}</g>
    <g transform="translate(756 106)">${favMark(16)}</g>
    <text x="650" y="172" font-family="Arial,sans-serif" font-size="10" fill="${C.slate}">48 · 32 · 16 px</text>
  </svg>`;
  return sharp(Buffer.from(svg)).png().toFile(`/tmp/spg-logos/${file}`);
}

const favTile = (s) => `<g>${grad}<rect width="${s}" height="${s}" rx="${s * 0.22}" fill="url(#bg)"/>${cogOutline(s / 2, s / 2, s * 0.36, 8, C.acc4, s * 0.045)}</g>`;
const favSolidAcc = (s) => `<g><rect width="${s}" height="${s}" rx="${s * 0.22}" fill="#ffffff" stroke="#e2e8f0"/>${cog(s / 2, s / 2, s * 0.38, 8, C.acc, '#ffffff', C.b700)}</g>`;
const favSolidNavy = (s) => `<g><rect width="${s}" height="${s}" rx="${s * 0.22}" fill="#ffffff" stroke="#e2e8f0"/>${cog(s / 2, s / 2, s * 0.38, 8, C.b700, '#ffffff', C.acc)}</g>`;

await mkdir('/tmp/spg-logos', { recursive: true });

// T1: rueda navy sólida, centro ámbar, sin placa
await view({
  file: 'V1-navy.png',
  title: 'Vista 1 — Rueda dentada navy (sin placa)',
  mark: (cy, dark) => cog(98, cy, 30, 9, dark ? C.white : C.b700, dark ? C.b950 : '#ffffff', C.acc),
  favMark: favSolidNavy,
});
// T2: rueda dentada ámbar sólida, centro navy, sin placa
await view({
  file: 'V2-ambar.png',
  title: 'Vista 2 — Rueda dentada ámbar (sin placa)',
  mark: (cy, dark) => cog(98, cy, 30, 9, C.acc, dark ? C.b950 : '#ffffff', dark ? C.white : C.b700),
  favMark: favSolidAcc,
});
// T3: rueda en placa (badge) navy con engranaje ámbar de contorno
await view({
  file: 'V3-placa.png',
  title: 'Vista 3 — Rueda en placa (badge) navy + engranaje ámbar',
  mark: (cy) => `<g transform="translate(72 ${cy - 30})">${grad}<rect width="60" height="60" rx="15" fill="url(#bg)"/>${cogOutline(30, 30, 22, 9, C.acc4, 3)}</g>`,
  favMark: favTile,
});

console.log('ok');
