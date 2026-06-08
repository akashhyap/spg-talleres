// Genera una hoja comparativa de conceptos de logo -> /tmp/spg-logos/*.png
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const C = {
  b500: '#2e69b4', b600: '#1f5197', b700: '#1a4179', b900: '#122a4d', b950: '#0c1c34',
  b100: '#d7e7f7', acc: '#f1880f', acc4: '#f7a528', slate: '#64748b', white: '#ffffff',
};

// engranaje (gear) como círculo + dientes
function gear(cx, cy, rOut, teeth, toothW, toothLen, color, sw) {
  let t = '';
  for (let i = 0; i < teeth; i++) {
    const a = (i * 360) / teeth;
    t += `<rect x="${cx - toothW / 2}" y="${cy - rOut - toothLen + 2}" width="${toothW}" height="${toothLen}" rx="${toothW / 2}" fill="${color}" transform="rotate(${a} ${cx} ${cy})"/>`;
  }
  return `${t}<circle cx="${cx}" cy="${cy}" r="${rOut - 2}" fill="none" stroke="${color}" stroke-width="${sw}"/>`;
}

const grad = `<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.b600}"/><stop offset="1" stop-color="${C.b900}"/></linearGradient></defs>`;

// ---- MARCAS (badges) ----
function markGear(s = 76) {
  const r = s / 2;
  return `<g>${grad}<rect width="${s}" height="${s}" rx="18" fill="url(#bg)"/>${gear(r, r, 25, 9, 5, 8, C.acc4, 3)}<text x="${r}" y="${r + 8}" text-anchor="middle" font-family="Arial,sans-serif" font-size="24" font-weight="800" fill="${C.white}">IP</text></g>`;
}
function markRoundel(s = 80) {
  const r = s / 2;
  return `<g><circle cx="${r}" cy="${r}" r="${r - 1}" fill="${C.b700}" stroke="${C.acc4}" stroke-width="2.5"/><circle cx="${r}" cy="${r}" r="${r - 9}" fill="none" stroke="#ffffff" stroke-opacity="0.25" stroke-width="1"/><text x="${r}" y="${r - 8}" text-anchor="middle" font-family="Arial,sans-serif" font-size="8" font-weight="700" letter-spacing="2" fill="${C.acc4}">DESDE</text><text x="${r}" y="${r + 11}" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" font-weight="800" fill="${C.white}">1925</text><text x="${r}" y="${r + 25}" text-anchor="middle" font-family="Arial,sans-serif" font-size="7.5" font-weight="700" letter-spacing="1.5" fill="${C.b100}">PALMA</text></g>`;
}
function markPiston(s = 76) {
  const r = s / 2;
  // bar de acento + engranaje pequeño (estilo moderno)
  return `<g>${grad}<rect width="${s}" height="${s}" rx="18" fill="url(#bg)"/>${gear(r, r - 6, 16, 8, 4.5, 6, C.acc4, 2.5)}<rect x="${r - 13}" y="${r + 14}" width="26" height="5" rx="2.5" fill="${C.acc}"/><text x="${r}" y="${r + 9}" text-anchor="middle" font-family="Arial,sans-serif" font-size="15" font-weight="800" fill="${C.white}">IP</text></g>`;
}

function wordmark(x, y, dark, tagline) {
  const main = dark ? C.b900 : C.white;
  const sub = dark ? C.b500 : C.b100;
  return `<text x="${x}" y="${y}" font-family="Arial,sans-serif" font-size="25" font-weight="800" fill="${main}">Taller Isidro Pons</text><text x="${x + 1}" y="${y + 18}" font-family="Arial,sans-serif" font-size="10" font-weight="700" letter-spacing="2.2" fill="${sub}">${tagline}</text>`;
}

function concept({ file, title, mark, markSize, tagline, favMark }) {
  const W = 1000, H = 430;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <rect width="${W}" height="${H}" fill="#f8fafc"/>
    <text x="40" y="40" font-family="Arial,sans-serif" font-size="20" font-weight="800" fill="${C.b900}">${title}</text>

    <!-- sobre fondo claro -->
    <text x="40" y="78" font-family="Arial,sans-serif" font-size="11" font-weight="700" letter-spacing="1.5" fill="${C.slate}">CABECERA (FONDO CLARO)</text>
    <rect x="40" y="90" width="620" height="110" rx="14" fill="#ffffff" stroke="#e2e8f0"/>
    <g transform="translate(70 ${145 - markSize / 2})">${mark}</g>
    ${wordmark(70 + markSize + 22, 150, true, tagline)}

    <!-- sobre fondo oscuro -->
    <text x="40" y="248" font-family="Arial,sans-serif" font-size="11" font-weight="700" letter-spacing="1.5" fill="${C.slate}">PIE / CABECERA (FONDO OSCURO)</text>
    <rect x="40" y="260" width="620" height="110" rx="14" fill="${C.b950}"/>
    <g transform="translate(70 ${315 - markSize / 2})">${mark}</g>
    ${wordmark(70 + markSize + 22, 320, false, tagline)}

    <!-- favicons -->
    <text x="710" y="78" font-family="Arial,sans-serif" font-size="11" font-weight="700" letter-spacing="1.5" fill="${C.slate}">FAVICON</text>
    <g transform="translate(710 95)">${favMark(48)}</g>
    <g transform="translate(772 111)">${favMark(32)}</g>
    <g transform="translate(816 119)">${favMark(16)}</g>
    <text x="710" y="185" font-family="Arial,sans-serif" font-size="10" fill="${C.slate}">48 · 32 · 16 px</text>
  </svg>`;
  return sharp(Buffer.from(svg)).png().toFile(`/tmp/spg-logos/${file}`);
}

// favicons simplificados por concepto
const favGear = (s) => `<g>${grad}<rect width="${s}" height="${s}" rx="${s * 0.22}" fill="url(#bg)"/>${gear(s / 2, s / 2, s * 0.34, 8, s * 0.07, s * 0.11, C.acc4, s * 0.04)}${s >= 28 ? `<text x="${s / 2}" y="${s / 2 + s * 0.12}" text-anchor="middle" font-family="Arial,sans-serif" font-size="${s * 0.34}" font-weight="800" fill="#fff">IP</text>` : ''}</g>`;
const favRoundel = (s) => `<g><circle cx="${s / 2}" cy="${s / 2}" r="${s / 2 - 1}" fill="${C.b700}" stroke="${C.acc4}" stroke-width="${s * 0.05}"/><text x="${s / 2}" y="${s / 2 + s * 0.18}" text-anchor="middle" font-family="Arial,sans-serif" font-size="${s * 0.42}" font-weight="800" fill="#fff">${s >= 28 ? '25' : '25'}</text></g>`;
const favTile = (s) => `<g>${grad}<rect width="${s}" height="${s}" rx="${s * 0.22}" fill="url(#bg)"/><text x="${s / 2}" y="${s / 2 + s * 0.18}" text-anchor="middle" font-family="Arial,sans-serif" font-size="${s * 0.5}" font-weight="800" fill="#fff">IP</text></g>`;

await mkdir('/tmp/spg-logos', { recursive: true });
await concept({ file: 'A-engranaje.png', title: 'Opción A — Emblema con engranaje (cue mecánico)', mark: markGear(76), markSize: 76, tagline: 'MECÁNICA · PALMA · DESDE 1925', favMark: favGear });
await concept({ file: 'B-roundel.png', title: 'Opción B — Sello heredado «1925» (confianza/tradición)', mark: markRoundel(80), markSize: 80, tagline: 'TALLER MECÁNICO · PALMA', favMark: favRoundel });
await concept({ file: 'C-moderno.png', title: 'Opción C — Moderno: engranaje + barra de acento', mark: markPiston(76), markSize: 76, tagline: 'MECÁNICA · PALMA · DESDE 1925', favMark: favTile });
console.log('ok');
