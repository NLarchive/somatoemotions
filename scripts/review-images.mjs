import sharp from 'sharp';
import { readdir, mkdir, readFile, writeFile } from 'node:fs/promises';
const files = (await readdir('images/face')).filter((x) => x.endsWith('-full-face.webp')).sort();
await mkdir('.cache/review', { recursive: true });
const composites = [];
for (const [i, name] of files.entries()) {
  const thumb = await sharp(await readFile('images/face/' + name))
    .resize(300, 300, { fit: 'contain', background: '#fff' })
    .toBuffer();
  const label = Buffer.from(
    `<svg width="300" height="36"><rect width="300" height="36" fill="#fff"/><text x="10" y="24" fill="#222" font-size="18">${name.replace('-full-face.webp', '')}</text></svg>`,
  );
  const x = (i % 4) * 300,
    y = Math.floor(i / 4) * 336;
  composites.push({ input: thumb, left: x, top: y }, { input: label, left: x, top: y + 300 });
}
await sharp({
  create: {
    width: 1200,
    height: Math.ceil(files.length / 4) * 336,
    channels: 3,
    background: '#eee',
  },
})
  .composite(composites)
  .png()
  .toFile('.cache/review/composite-faces.png');
console.log('Contact sheet: .cache/review/composite-faces.png');
