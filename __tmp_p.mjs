import sharp from 'sharp';
const p = process.argv[2] + '/';
for (const n of ['p-work','p-pricing']) {
  const m = await sharp(p + n + '.png').metadata();
  await sharp(p + n + '.png').resize({ width: 1100 }).jpeg({ quality: 84 }).toFile(p + n + '.jpg');
  console.log(n, m.width, m.height);
}
