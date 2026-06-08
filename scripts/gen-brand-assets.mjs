// Genera los recursos de marca con la rueda dentada (logo V1):
//   public/favicon.svg          (vectorial, navegadores modernos)
//   public/favicon-16.png       (fallback PNG)
//   public/favicon-32.png       (fallback PNG)
//   public/favicon.ico          (Safari antiguo, /favicon.ico, marcadores)
//   public/apple-touch-icon.png (iOS / pantalla de inicio, 180x180)
//   public/logo.svg             (lockup horizontal para OG / schema)
import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pub = (f) => resolve(root, 'public', f);

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

const bgDefs = `<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1f5197"/><stop offset="1" stop-color="#122a4d"/></linearGradient></defs>`;

// Favicon: placa navy redondeada + rueda ámbar
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  ${bgDefs}
  <rect width="32" height="32" rx="7" fill="url(#bg)"/>
  ${cog(16, 16, 11, 9, '#f7a524', '#1a4179', '#ffffff')}
</svg>
`;

// Apple touch icon: a sangre completa (iOS añade las esquinas redondeadas)
const appleSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" width="180" height="180">
  ${bgDefs}
  <rect width="180" height="180" fill="url(#bg)"/>
  ${cog(90, 90, 58, 9, '#f7a524', '#1a4179', '#ffffff')}
</svg>
`;

// Logo horizontal (OG / schema): rueda navy + lockup
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 80" width="360" height="80" role="img" aria-label="Taller Isidro Pons - SPG Talleres">
  ${cog(40, 40, 26, 9, '#1a4179', '#ffffff', '#f1880f')}
  <text x="78" y="40" font-family="'Segoe UI', Arial, sans-serif" font-size="23" font-weight="600" fill="#122a4d">Taller Isidro Pons</text>
  <text x="79" y="59" font-family="'Segoe UI', Arial, sans-serif" font-size="10.5" font-weight="400" letter-spacing="4" fill="#2e69b4">SPG TALLERES</text>
</svg>
`;

await writeFile(pub('favicon.svg'), faviconSvg);
await writeFile(pub('logo.svg'), logoSvg);

const png32 = await sharp(Buffer.from(faviconSvg)).resize(32, 32).png().toBuffer();
const png16 = await sharp(Buffer.from(faviconSvg)).resize(16, 16).png().toBuffer();
await writeFile(pub('favicon-32.png'), png32);
await writeFile(pub('favicon-16.png'), png16);
await sharp(Buffer.from(appleSvg)).resize(180, 180).png().toFile(pub('apple-touch-icon.png'));
await writeFile(pub('favicon.ico'), await pngToIco([png16, png32]));

console.log('✓ favicon.svg, favicon.ico, favicon-16/32.png, apple-touch-icon.png, logo.svg');
