/**
 * Replace the sample catalogue with real products built from the founder's own
 * photography. Deletes every existing product (and its sample photos), then
 * creates the real ones.
 *
 * Dry run:  node --env-file=.env --import tsx scripts/rebuild-catalogue.ts
 * Apply:    node --env-file=.env --import tsx scripts/rebuild-catalogue.ts --yes
 */
import path from 'path'
import { getPayload } from 'payload'

import config from '../src/payload.config'

const CONFIRM = process.argv.includes('--yes')

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

type NewProduct = {
  title: string
  image: string
  alt: string
  categorySlug: string
  material?: 'titanium' | 'surgical-steel' | 'gold' | 'niobium' | 'silicone' | 'other'
  gauge?: string
  size?: string
  price: number
  featured?: boolean
  description: string
  variants?: { label: string; inStock?: boolean }[]
}

// NOTE: prices below are placeholders — set the real ones in the admin.
const PRODUCTS: NewProduct[] = [
  {
    title: 'Flat Back Labret Stud — CZ',
    image: 'src/assets/products/titanium-flat-back-labret-stud.png',
    alt: 'Flat back labret stud with a bezel-set cubic zirconia',
    categorySlug: 'lip-labret',
    material: 'titanium',
    gauge: '16g (1.2mm)',
    price: 899,
    featured: true,
    description:
      'A bezel-set cubic zirconia on an implant-grade flat back post. Sits flush and catches the light — made for labret, helix, tragus and conch placements.',
    variants: [{ label: '6mm post' }, { label: '8mm post' }, { label: '10mm post' }],
  },
  {
    title: 'Hoop Set',
    image: 'src/assets/covers/cat-hoops.png',
    alt: 'Gold and silver hoops — twisted, beaded, chunky and pavé styles',
    categorySlug: 'rings-hoops',
    material: 'gold',
    price: 1499,
    featured: true,
    description:
      'Timeless hoops, made to effortlessly elevate. Twisted, beaded, chunky and pavé styles in gold, rose gold and steel — wear them solo or stack the whole lobe.',
    variants: [{ label: 'Gold' }, { label: 'Rose Gold' }, { label: 'Silver' }],
  },
  {
    title: 'Stud Set',
    image: 'src/assets/covers/cat-studs.png',
    alt: 'Gemstone, pearl, opal and star studs',
    categorySlug: 'ear',
    material: 'titanium',
    gauge: '16g (1.2mm)',
    price: 1299,
    featured: true,
    description:
      'Delicate studs, perfect for everyday expression. Gemstones, pearls, opals, moons and stars — the pieces that turn a few piercings into a curation.',
  },
  {
    title: 'Charm Set',
    image: 'src/assets/covers/cat-sets.png',
    alt: 'Charm drops, chains and gemstone pendants in gold',
    categorySlug: 'rings-hoops',
    material: 'gold',
    price: 1699,
    featured: true,
    description:
      'Beautiful drops that move with your energy. Charms, chains and gemstone pendants that clip onto your hoops and change the whole mood of a stack.',
  },
  {
    title: 'Barbell Collection',
    image: 'src/assets/covers/cat-barbells.png',
    alt: 'Curved and straight barbells with CZ, opal and gemstone ends',
    categorySlug: 'barbells',
    material: 'surgical-steel',
    gauge: '14g (1.6mm)',
    price: 1199,
    description:
      'Curved and straight barbells in gold, rose gold and steel, finished with CZ, opal and gemstone ends. For navel, tongue and cartilage placements.',
    variants: [{ label: 'Curved (navel)' }, { label: 'Straight (tongue)' }],
  },
]

async function run() {
  const payload = await getPayload({ config })

  const { docs: existing } = await payload.find({ collection: 'products', limit: 500, depth: 1 })

  console.log(`Existing products to remove: ${existing.length}`)
  for (const p of existing) console.log(`  − ${p.title}`)
  console.log(`\nProducts to create: ${PRODUCTS.length}`)
  for (const p of PRODUCTS) console.log(`  + ${p.title}  (₹${p.price} — placeholder)`)

  if (!CONFIRM) {
    console.log('\nDry run only. Re-run with --yes to apply.')
    process.exit(0)
  }

  // Remove old products and the photos that belonged to them.
  const mediaIds = new Set<number>()
  for (const p of existing) {
    for (const entry of p.images ?? []) {
      const image = entry.image
      if (typeof image === 'number') mediaIds.add(image)
      else if (image && typeof image === 'object' && 'id' in image) mediaIds.add(image.id)
    }
    await payload.delete({ collection: 'products', id: p.id })
  }
  for (const id of mediaIds) {
    await payload.delete({ collection: 'media', id }).catch(() => {
      /* still used elsewhere (e.g. a category cover) */
    })
  }
  console.log(`\nRemoved ${existing.length} product(s).`)

  // Create the real catalogue.
  for (const item of PRODUCTS) {
    const { docs: cats } = await payload.find({
      collection: 'categories',
      where: { slug: { equals: item.categorySlug } },
      limit: 1,
    })
    if (!cats[0]) {
      console.warn(`  ! no category "${item.categorySlug}" — skipping ${item.title}`)
      continue
    }

    const media = await payload.create({
      collection: 'media',
      data: { alt: item.alt },
      filePath: path.resolve(item.image),
    })

    await payload.create({
      collection: 'products',
      data: {
        title: item.title,
        description: richText(item.description),
        images: [{ image: media.id }],
        category: cats[0].id,
        material: item.material,
        gauge: item.gauge,
        size: item.size,
        price: item.price,
        variants: item.variants?.map((v) => ({ ...v, inStock: v.inStock ?? true })),
        inStock: true,
        featured: item.featured ?? false,
        _status: 'published',
      },
    })
    console.log(`  ✓ ${item.title}`)
  }

  console.log('\nCatalogue rebuilt. Set real prices in Admin → Products.')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
