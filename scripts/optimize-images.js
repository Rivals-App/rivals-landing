const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

const MEDIA_DIR = path.join(__dirname, '../public/static/media');
const OPTIMIZED_DIR = path.join(__dirname, '../public/static/media/optimized');

// Ensure the optimized directory exists
if (!fs.existsSync(OPTIMIZED_DIR)) {
  fs.mkdirSync(OPTIMIZED_DIR, { recursive: true });
}

// Target sizes for responsive images
const SIZES = [640, 960, 1280, 1920];

async function processImage(filePath) {
  const fileName = path.basename(filePath);
  const fileExt = path.extname(fileName).toLowerCase();
  const baseName = path.basename(fileName, fileExt);
  
  // Skip already optimized images
  if (filePath.includes('optimized')) {
    return;
  }

  // Only process image files
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(fileExt)) {
    return;
  }

  console.log(`Processing: ${fileName}`);

  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    // Create WebP version at original size
    await image.webp({ quality: 80 })
      .toFile(path.join(OPTIMIZED_DIR, `${baseName}.webp`));
    
    // Create responsive variants
    for (const width of SIZES.filter(size => size < metadata.width)) {
      await image.resize({ width })
        .webp({ quality: 80 })
        .toFile(path.join(OPTIMIZED_DIR, `${baseName}-${width}.webp`));
    }
    
    console.log(`✅ Optimized: ${fileName}`);
  } catch (error) {
    console.error(`❌ Error processing ${fileName}:`, error);
  }
}

async function walkDirectory(dir) {
  const files = await readdir(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const fileStat = await stat(filePath);
    
    if (fileStat.isDirectory()) {
      await walkDirectory(filePath);
    } else {
      await processImage(filePath);
    }
  }
}

async function main() {
  console.log('Starting image optimization...');
  await walkDirectory(MEDIA_DIR);
  console.log('Image optimization complete!');
}

main().catch(console.error); 