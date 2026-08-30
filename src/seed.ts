/**
 * Seed script — run with: npm run seed
 * Creates the first admin user, categories, sample products (with generated
 * placeholder images), and default site settings. Safe to re-run: skips
 * anything that already exists.
 */
import fs from 'fs'
import os from 'os'
import path from 'path'
import { getPayload } from 'payload'
import sharp from 'sharp'

import config from './payload.config'

const ADMIN_EMAIL = 'admin@ouch.store'
const ADMIN_PASSWORD = 'OuchAdmin@123'

const PALETTES: [string, string][] = [
  ['#fdeef5', '#f43f8e'],
  ['#fdefe2', '#f97316'],
  ['#fdf6dc', '#f5b81c'],
  ['#e5f6f3', '#14b8a6'],
  ['#efe9fb', '#8b5cf6'],
  ['#fdeaea', '#ef4444'],
]

const richText = (text: string) => ({
  root: {
    type: 'root',
    children: [
      {
        type: 'paragraph',
        version: 1,
        children: [{ type: 'text', text, version: 1 }],
      },
    ],
    direction: null,
    format: '' as const,
    indent: 0,
    version: 1,
  },
})

async function makePlaceholder(label: string, index: number, outDir: string): Promise<string> {
  const [bg, accent] = PALETTES[index % PALETTES.length]
  const initials = label
    .split(/\s+/)
    .filter((w) => /^[a-z0-9]/i.test(w))
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200">
  <defs>
    <radialGradient id="g" cx="50%" cy="40%" r="80%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="${bg}"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="1200" fill="url(#g)"/>
  <circle cx="600" cy="520" r="230" fill="none" stroke="${accent}" stroke-width="16" opacity="0.85"/>
  <circle cx="600" cy="282" r="34" fill="${accent}"/>
  <circle cx="806" cy="412" r="16" fill="#f5b81c"/>
  <circle cx="398" cy="640" r="12" fill="#8b5cf6"/>
  <text x="600" y="560" font-family="Georgia, serif" font-size="150" font-weight="600" fill="#1c1410" text-anchor="middle" dominant-baseline="middle">${initials}</text>
</svg>`
  const file = path.join(outDir, `${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`)
  await sharp(Buffer.from(svg)).png().toFile(file)
  return file
}

const CATEGORIES = [
  { name: 'Ear', description: 'Studs, tunnels, and everything for lobes, helix, tragus & conch.' },
  { name: 'Nose', description: 'Nose studs, septum clickers, and nostril rings.' },
  { name: 'Lip & Labret', description: 'Labret studs and lip rings in every gauge.' },
  { name: 'Barbells', description: 'Straight, curved, industrial, navel and tongue barbells.' },
  { name: 'Rings & Hoops', description: 'Segment rings, captive bead rings, and seamless hoops.' },
  { name: 'Aftercare', description: 'Saline sprays and cleansers to keep piercings healing right.' },
  { name: 'Tools & Supplies', description: 'Professional needles, forceps, and studio supplies.' },
]

type SeedProduct = {
  title: string
  category: string
  price: number
  compareAtPrice?: number
  material?: 'titanium' | 'surgical-steel' | 'gold' | 'niobium' | 'silicone' | 'other'
  gauge?: string
  size?: string
  featured?: boolean
  description: string
  variants?: { label: string; price?: number; inStock?: boolean }[]
}

const PRODUCTS: SeedProduct[] = [
  {
    title: 'Titanium Flat Back Labret Stud',
    category: 'Lip & Labret',
    price: 649,
    material: 'titanium',
    gauge: '16g (1.2mm)',
    featured: true,
    description:
      'Implant-grade ASTM F-136 titanium labret with a comfortable flat back. Threadless push-pin top — ideal for lip, helix, tragus and conch piercings.',
    variants: [
      { label: '6mm post' },
      { label: '8mm post' },
      { label: '10mm post', price: 699 },
    ],
  },
  {
    title: 'Septum Clicker — Gold Crescent',
    category: 'Nose',
    price: 1299,
    compareAtPrice: 1599,
    material: 'gold',
    gauge: '16g (1.2mm)',
    size: '8mm',
    featured: true,
    description:
      'PVD gold-plated septum clicker with a hinged crescent design. Snaps shut securely — no fiddling, no pinching.',
  },
  {
    title: 'Surgical Steel Nose Stud — Prong Set CZ',
    category: 'Nose',
    price: 349,
    material: 'surgical-steel',
    gauge: '20g (0.8mm)',
    description:
      '316L surgical steel nose stud with a prong-set clear cubic zirconia. L-bend post stays put all day.',
    variants: [
      { label: '1.5mm gem' },
      { label: '2mm gem' },
      { label: '2.5mm gem' },
    ],
  },
  {
    title: 'Titanium Segment Ring',
    category: 'Rings & Hoops',
    price: 799,
    material: 'titanium',
    gauge: '16g (1.2mm)',
    featured: true,
    description:
      'Seamless hinged segment ring in implant-grade titanium. Clicks closed with zero gap — perfect for septum, daith, and helix.',
    variants: [
      { label: '8mm' },
      { label: '10mm' },
      { label: '12mm', price: 849 },
    ],
  },
  {
    title: 'Captive Bead Ring — Surgical Steel',
    category: 'Rings & Hoops',
    price: 299,
    material: 'surgical-steel',
    gauge: '14g (1.6mm)',
    description:
      'Classic 316L captive bead ring. Polished mirror finish, snug bead fit. A staple for any piercing.',
    variants: [{ label: '10mm' }, { label: '12mm' }],
  },
  {
    title: 'Industrial Barbell — Arrow',
    category: 'Barbells',
    price: 899,
    compareAtPrice: 1099,
    material: 'surgical-steel',
    gauge: '14g (1.6mm)',
    size: '38mm',
    featured: true,
    description:
      'Industrial scaffold barbell with arrow ends. 316L surgical steel, externally threaded balls included.',
  },
  {
    title: 'Curved Navel Barbell — Opal Drop',
    category: 'Barbells',
    price: 1199,
    material: 'titanium',
    gauge: '14g (1.6mm)',
    size: '10mm',
    featured: true,
    description:
      'Titanium curved barbell with a synthetic opal dangle. Anodised finish available in multiple shades.',
    variants: [
      { label: 'White Opal' },
      { label: 'Blue Opal' },
      { label: 'Purple Opal', inStock: false },
    ],
  },
  {
    title: 'Tongue Barbell — Titanium',
    category: 'Barbells',
    price: 749,
    material: 'titanium',
    gauge: '14g (1.6mm)',
    size: '16mm',
    description:
      'Straight titanium barbell sized for tongue piercings. Smooth internally threaded ends for safe insertion.',
  },
  {
    title: 'Ear Tunnel Plugs — Black PVD (Pair)',
    category: 'Ear',
    price: 599,
    material: 'surgical-steel',
    description:
      'Screw-fit flesh tunnels in black PVD-coated steel. Sold as a pair. Double-flared comfort edges.',
    variants: [
      { label: '6mm' },
      { label: '8mm' },
      { label: '10mm' },
      { label: '12mm' },
    ],
  },
  {
    title: 'Helix Stud — Trinity Gem Cluster',
    category: 'Ear',
    price: 899,
    compareAtPrice: 999,
    material: 'titanium',
    gauge: '16g (1.2mm)',
    featured: true,
    description:
      'Three-gem cluster top on a threadless titanium post. Catches light with every turn of your head.',
  },
  {
    title: 'Gold Hoop Nose Ring — Seamless',
    category: 'Nose',
    price: 499,
    material: 'gold',
    gauge: '20g (0.8mm)',
    size: '7mm',
    description:
      'Delicate seamless gold-plated hoop. Bend-to-open closure for a barely-there look.',
  },
  {
    title: 'Niobium Daith Heart Ring',
    category: 'Ear',
    price: 1099,
    material: 'niobium',
    gauge: '16g (1.2mm)',
    description:
      'Heart-shaped daith ring in hypoallergenic niobium with an iridescent anodised finish.',
  },
  {
    title: 'Saline Piercing Aftercare Spray 100ml',
    category: 'Aftercare',
    price: 449,
    material: 'other',
    featured: true,
    description:
      'Sterile isotonic saline spray for cleansing new and healing piercings. Fine mist, no-touch application. Fragrance and preservative free.',
  },
  {
    title: 'Piercing Aftercare Foam Cleanser',
    category: 'Aftercare',
    price: 549,
    material: 'other',
    description:
      'Gentle foaming cleanser formulated for healing piercings. Removes crusties without irritation.',
  },
  {
    title: 'Sterile Piercing Needles — 10 Pack',
    category: 'Tools & Supplies',
    price: 899,
    material: 'surgical-steel',
    description:
      'Individually blister-packed, EO-sterilised tri-bevel piercing needles. Professional use only.',
    variants: [
      { label: '14g' },
      { label: '16g' },
      { label: '18g' },
    ],
  },
  {
    title: 'Slotted Pennington Forceps',
    category: 'Tools & Supplies',
    price: 1499,
    material: 'surgical-steel',
    description:
      'Autoclavable slotted Pennington forceps, 15cm. Ratchet lock with smooth jaw action for precise tissue handling.',
  },
  {
    title: 'Nitrile Gloves — Black, Box of 100',
    category: 'Tools & Supplies',
    price: 699,
    material: 'other',
    description:
      'Powder-free black nitrile examination gloves. Textured fingertips for grip during procedures.',
    variants: [
      { label: 'S' },
      { label: 'M' },
      { label: 'L' },
    ],
  },
]

async function run() {
  const payload = await getPayload({ config })

  // Admin user
  const users = await payload.find({ collection: 'users', limit: 1 })
  if (users.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD },
    })
    payload.logger.info(`Created admin user ${ADMIN_EMAIL}`)
  }

  // Site settings
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      storeName: 'Ouch',
      tagline: 'Self-expression, curated.',
      whatsappNumber: '',
      announcement: 'Free shipping on orders over ₹999',
      currencySymbol: '₹',
    },
  })
  payload.logger.info('Site settings saved')

  const existingProducts = await payload.find({ collection: 'products', limit: 1 })
  if (existingProducts.totalDocs > 0) {
    payload.logger.info('Products already exist — skipping product seed')
    process.exit(0)
  }

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ouch-seed-'))

  // Categories
  const categoryIds: Record<string, number> = {}
  for (const [i, cat] of CATEGORIES.entries()) {
    const img = await makePlaceholder(cat.name, i, tmpDir)
    const media = await payload.create({
      collection: 'media',
      data: { alt: `${cat.name} category` },
      filePath: img,
    })
    const doc = await payload.create({
      collection: 'categories',
      data: {
        name: cat.name,
        description: cat.description,
        image: media.id,
        displayOrder: i,
      },
    })
    categoryIds[cat.name] = doc.id
    payload.logger.info(`Created category: ${cat.name}`)
  }

  // Products
  for (const [i, p] of PRODUCTS.entries()) {
    const img = await makePlaceholder(p.title, i, tmpDir)
    const media = await payload.create({
      collection: 'media',
      data: { alt: p.title },
      filePath: img,
    })
    await payload.create({
      collection: 'products',
      data: {
        title: p.title,
        description: richText(p.description),
        images: [{ image: media.id }],
        category: categoryIds[p.category],
        material: p.material,
        gauge: p.gauge,
        size: p.size,
        price: p.price,
        compareAtPrice: p.compareAtPrice,
        variants: p.variants?.map((v) => ({ ...v, inStock: v.inStock ?? true })),
        inStock: true,
        featured: p.featured ?? false,
        _status: 'published',
      },
    })
    payload.logger.info(`Created product: ${p.title}`)
  }

  fs.rmSync(tmpDir, { recursive: true, force: true })
  payload.logger.info('Seed complete ✔')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
