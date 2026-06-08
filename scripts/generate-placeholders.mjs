/**
 * Genera imágenes de marcador de posición (placeholder) con sharp.
 * ⚠️ El cliente debe sustituirlas por fotografías reales del taller.
 *
 *   - src/assets/hero-taller.jpg
 *   - src/assets/fachada-taller.jpg
 *   - src/assets/equipo-taller.jpg
 *   - public/og-image.jpg
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function svg(w, h, title, subtitle) {
  return Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1a4179"/>
      <stop offset="1" stop-color="#0c1c34"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <circle cx="${w * 0.82}" cy="${h * 0.2}" r="${h * 0.28}" fill="#ffffff" opacity="0.04"/>
  <circle cx="${w * 0.15}" cy="${h * 0.85}" r="${h * 0.3}" fill="#f1880f" opacity="0.07"/>
  <g transform="translate(${w / 2 - 26} ${h * 0.32}) scale(2.1)" fill="none" stroke="#f9bd52" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
  </g>
  <text x="50%" y="${h * 0.62}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${Math.round(h * 0.075)}" font-weight="800" fill="#ffffff">${esc(title)}</text>
  <text x="50%" y="${h * 0.72}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${Math.round(h * 0.04)}" font-weight="600" fill="#b3cfee">${esc(subtitle)}</text>
</svg>`);
}

const jobs = [
  { path: 'src/assets/hero-taller.jpg', w: 1200, h: 900, t: 'Taller Isidro Pons', s: 'Foto del interior del taller (placeholder)' },
  { path: 'src/assets/fachada-taller.jpg', w: 1200, h: 800, t: 'Fachada del taller', s: 'Carrer Joan Mestre 42, Palma (placeholder)' },
  { path: 'src/assets/equipo-taller.jpg', w: 1000, h: 1100, t: 'Nuestro equipo', s: 'Foto del equipo / taller (placeholder)' },
  { path: 'public/og-image.jpg', w: 1200, h: 630, t: 'Taller Isidro A. Pons · Palma', s: 'Mecánica · Neumáticos · ITV · desde 1925' },
];

for (const j of jobs) {
  const out = resolve(root, j.path);
  await mkdir(dirname(out), { recursive: true });
  await sharp(svg(j.w, j.h, j.t, j.s)).jpeg({ quality: 82, mozjpeg: true }).toFile(out);
  console.log('✓ generada', j.path);
}
