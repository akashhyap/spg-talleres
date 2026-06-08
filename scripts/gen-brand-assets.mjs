// Genera public/favicon.svg y public/logo.svg con la rueda dentada (logo V1).
import { writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// Rueda dentada: dientes + disco + cubo hueco + centro
function cog(cx, cy, rOut, n, disc, hole, center) {
  const tw = rOut * 0.3, tl = rOut * 0.5;
  let teeth = '';
  for (let i = 0; i < n; i++) {
    const a = (i * 360) / n;
    teeth += `<rect x="${(cx - tw / 2).toFixed(2)}" y="${(cy - rOut).toFixed(2)}" width="${tw.toFixed(2)}" height="${tl.toFixed(2)}" rx="${(tw * 0.35).toFixed(2)}" fill="${disc}" transform="rotate(${a} ${cx} ${cy})"/>`;
  }
  return `${teeth}<circle cx="${cx}" cy="${cy}" r="${(rOut * 0.82).toFixed(2)}" fill="${disc}"/><circle cx="${cx}" cy="${cy}" r="${(rOut * 0.4).toFixed(2)}" fill="${hole}"/><circle cx="${cx}" cy="${cy}" r="${(rOut * 0.17).toFixed(2)}" fill="${center}"/>`;
}

// Favicon: placa navy + rueda ámbar (legible en pestañas claras y oscuras)
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1f5197"/><stop offset="1" stop-color="#122a4d"/></linearGradient></defs>
  <rect width="32" height="32" rx="7" fill="url(#bg)"/>
  ${cog(16, 16, 11, 9, '#f7a524', '#1a4179', '#ffffff')}
</svg>
`;

// Logo horizontal (OG / schema): rueda navy + lockup
const logo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 80" width="360" height="80" role="img" aria-label="Taller Isidro Pons - SPG Talleres">
  ${cog(40, 40, 26, 9, '#1a4179', '#ffffff', '#f1880f')}
  <text x="78" y="40" font-family="'Segoe UI', Arial, sans-serif" font-size="23" font-weight="600" fill="#122a4d">Taller Isidro Pons</text>
  <text x="79" y="59" font-family="'Segoe UI', Arial, sans-serif" font-size="10.5" font-weight="400" letter-spacing="4" fill="#2e69b4">SPG TALLERES</text>
</svg>
`;

await writeFile(resolve(root, 'public/favicon.svg'), favicon);
await writeFile(resolve(root, 'public/logo.svg'), logo);
console.log('✓ public/favicon.svg y public/logo.svg generados');
