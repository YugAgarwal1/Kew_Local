const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/images');

function convertToWebP() {
  const files = fs.readdirSync(imagesDir, { recursive: true });
  
  files.forEach(file => {
    if (typeof file !== 'string') return;
    
    const filePath = path.join(imagesDir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) return;
    
    const ext = path.extname(file).toLowerCase();
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') return;
    
    const webpPath = filePath.replace(ext, '.webp');
    
    if (fs.existsSync(webpPath)) {
      console.log(`Skipping ${file} (WebP already exists)`);
      return;
    }
    
    console.log(`Converting ${file} to WebP...`);
    
    sharp(filePath)
      .webp({ quality: 85 })
      .toFile(webpPath)
      .then(() => {
        const originalSize = stat.size;
        const webpSize = fs.statSync(webpPath).size;
        const savings = ((1 - webpSize / originalSize) * 100).toFixed(1);
        console.log(`✓ ${file} → ${path.basename(webpPath)} (${savings}% smaller)`);
      })
      .catch(err => {
        console.error(`Error converting ${file}:`, err);
      });
  });
}

convertToWebP();
