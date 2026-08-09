// Crop brand assets out of the design mockup into public/brand/.
// Run: node scripts/crop-brand-assets.mjs "<path-to-mockup.png>"
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const src = process.argv[2]
if (!src) {
  console.error('Usage: node scripts/crop-brand-assets.mjs <mockup.png>')
  process.exit(1)
}

const outDir = path.resolve('public/brand')
fs.mkdirSync(outDir, { recursive: true })

// Regions in the 1024x1536 mockup
const CROPS = [
  { name: 'hero-portrait', left: 470, top: 75, width: 554, height: 453 },
  { name: 'tile-hoops', left: 290, top: 738, width: 145, height: 192 },
  { name: 'tile-studs', left: 436, top: 738, width: 144, height: 192 },
  { name: 'tile-curves', left: 581, top: 738, width: 143, height: 192 },
  { name: 'tile-dangles', left: 725, top: 738, width: 144, height: 192 },
  { name: 'tile-specials', left: 870, top: 738, width: 154, height: 192 },
  { name: 'studio-neon', left: 0, top: 995, width: 470, height: 290 },
  { name: 'studio-smiley', left: 770, top: 995, width: 254, height: 95 },
  { name: 'studio-tray', left: 770, top: 1097, width: 254, height: 93 },
  { name: 'studio-wall', left: 770, top: 1196, width: 254, height: 89 },
]

for (const { name, ...region } of CROPS) {
  const file = path.join(outDir, `${name}.png`)
  await sharp(src).extract(region).png().toFile(file)
  console.log(`✓ ${name}.png`)
}
console.log('All brand assets cropped to public/brand/')
