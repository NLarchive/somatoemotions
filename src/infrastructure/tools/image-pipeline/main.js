import sharp from 'sharp';
import path from 'node:path';
import { access, mkdir, readFile, writeFile, rename, rm } from 'node:fs/promises';
export function canonicalPaths(key) {
  if (typeof key !== 'string' || !/^(face|action|somatic)\/[a-z0-9][a-z0-9_-]*$/.test(key))
    throw Error('Unsafe image key');
  return { jpg: `images/jpg/${key}.jpg`, webp: `images/${key}.webp` };
}
export async function importGenerated({ key, source, root = process.cwd() }) {
  const paths = canonicalPaths(key);
  const jpg = path.resolve(root, paths.jpg),
    webp = path.resolve(root, paths.webp);
  const exists = async (file) => {
    try {
      await access(file);
      return true;
    } catch (e) {
      if (e.code !== 'ENOENT') throw e;
      return false;
    }
  };
  const hasJpg = await exists(jpg),
    hasWebp = await exists(webp);
  if (hasWebp) throw Error(`Output already exists: ${webp}`);
  await mkdir(path.dirname(jpg), { recursive: true });
  await mkdir(path.dirname(webp), { recursive: true });
  const jpgTmp = jpg + '.partial',
    webpTmp = webp + '.partial';
  try {
    const jpgBuffer = await sharp(await readFile(source), { limitInputPixels: 40000000 })
      .flatten({ background: '#fff' })
      .jpeg({ quality: 94 })
      .toBuffer();
    if (hasJpg && !(await readFile(jpg)).equals(jpgBuffer))
      throw Error('Existing JPEG does not match the generated source');
    const webpBuffer = await sharp(jpgBuffer).webp({ quality: 80 }).toBuffer();
    await sharp(webpBuffer).raw().toBuffer();
    const m = await sharp(webpBuffer).metadata();
    if (!hasJpg) await writeFile(jpgTmp, jpgBuffer);
    await writeFile(webpTmp, webpBuffer);
    if (!hasJpg) await rename(jpgTmp, jpg);
    await rename(webpTmp, webp);
    return { ...paths, width: m.width, height: m.height };
  } finally {
    await rm(jpgTmp, { force: true });
    await rm(webpTmp, { force: true });
  }
}
export async function convertLocal(inputs) {
  if (!Array.isArray(inputs) || !inputs.length || inputs.length > 100)
    throw Error('Supply 1 to 100 image paths');
  const outputs = inputs.map((file) =>
    path.join(path.dirname(file), path.parse(file).name + '.webp'),
  );
  if (new Set(outputs.map((x) => path.resolve(x).toLowerCase())).size !== outputs.length)
    throw Error('Duplicate output');
  for (const out of outputs) {
    try {
      await access(out);
      throw Error('Output already exists');
    } catch (e) {
      if (e.code !== 'ENOENT') throw e;
    }
  }
  // Decode the complete batch before creating any output.
  const buffers = [];
  for (const file of inputs) {
    const buffer = await readFile(file);
    await sharp(buffer, { limitInputPixels: 40000000 }).metadata();
    buffers.push(buffer);
  }
  const results = [];
  try {
    for (const [i, buffer] of buffers.entries()) {
      const body = await sharp(buffer, { limitInputPixels: 40000000 })
        .webp({ quality: 80 })
        .toBuffer();
      await writeFile(outputs[i], body, { flag: 'wx' });
      results.push(outputs[i]);
    }
    return results;
  } catch (error) {
    for (const file of results) await rm(file, { force: true });
    throw error;
  }
}
export function run({ key }) {
  return canonicalPaths(key);
}
