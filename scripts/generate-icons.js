import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas } from 'canvas';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create the icons directory if it doesn't exist
const iconsDir = path.join(__dirname, '../public/icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Function to create a simple icon
function createIcon(size, filename) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Fill background
  ctx.fillStyle = '#1e3a8a';
  ctx.fillRect(0, 0, size, size);
  
  // Draw a simple "SS" text
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${size * 0.5}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('SS', size / 2, size / 2);
  
  // Save the image
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(iconsDir, filename), buffer);
  console.log(`Created ${filename}`);
}

// Create icons of different sizes
const sizes = [
  { size: 16, filename: 'favicon.ico' },
  { size: 72, filename: 'icon-72x72.png' },
  { size: 96, filename: 'icon-96x96.png' },
  { size: 128, filename: 'icon-128x128.png' },
  { size: 144, filename: 'icon-144x144.png' },
  { size: 152, filename: 'icon-152x152.png' },
  { size: 192, filename: 'icon-192x192.png' },
  { size: 384, filename: 'icon-384x384.png' },
  { size: 512, filename: 'icon-512x512.png' },
  { size: 512, filename: 'maskable-icon.png' }
];

sizes.forEach(({ size, filename }) => {
  createIcon(size, filename);
});

console.log('All icons generated successfully!'); 