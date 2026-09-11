import sharp from 'sharp';
const p = process.argv[2] + '/';
for (const n of ['open','p-process','p-contact']) {
  await sharp(p + n + '.png').resize({ width: 1050 }).jpeg({ quality: 85 }).toFile(p + n + '.jpg');
}
console.log('ok');
