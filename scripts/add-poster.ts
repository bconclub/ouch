/**
 * Adds poster image files as ₹333 products in the Wall Posters category.
 * Usage: node --env-file=.env --import tsx scripts/add-poster.ts <file...> 
 */
import fs from 'fs'
import path from 'path'

import { getPayloadClient } from '../src/lib/queries'

const PRICE = 333

function titleFromFile(file: string): string {
  const base = path.basename(file).replace(/\.[a-z]+$/i, '')
  const cleaned = base.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim()
  // Capitalise word starts, but leave letters after an apostrophe alone (Won't, You're)
  return cleaned.replace(/(^|\s)(\w)/g, (_m, pre, c) => pre + c.toUpperCase())
}

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

async function run() {
  const files = process.argv.slice(2)
  if (!files.length) {
    console.error('Pass poster image paths')
    process.exit(1)
  }
  const payload = await getPayloadClient()
  const cats = await payload.find({
    collection: 'categories',
    where: { slug: { equals: 'posters' } },
    limit: 1,
    overrideAccess: true,
  })
  const category = cats.docs[0]
  if (!category) throw new Error('Posters category missing — run add-posters-category.ts first')

  for (const file of files) {
    const title = titleFromFile(file)
    const slug = slugify(title)

    const media = await payload.create({
      collection: 'media',
      overrideAccess: true,
      data: { alt: `${title} — Ouch poster` },
      filePath: path.resolve(file),
    })

    const existing = await payload.find({
      collection: 'products',
      where: { slug: { equals: slug } },
      limit: 1,
      overrideAccess: true,
    })

    const data = {
      title,
      slug,
      price: PRICE,
      category: category.id,
      inStock: true,
      images: [{ image: media.id }],
      _status: 'published' as const,
    }

    if (existing.docs.length) {
      await payload.update({ collection: 'products', id: existing.docs[0].id, data, overrideAccess: true })
      console.log('updated poster:', title, '₹' + PRICE)
    } else {
      await payload.create({ collection: 'products', data, overrideAccess: true })
      console.log('added poster:', title, '₹' + PRICE)
    }

    // also copy into the public gallery folder for the homepage strip
    const dest = path.join('public/brand/posters', path.basename(file))
    fs.mkdirSync('public/brand/posters', { recursive: true })
    fs.copyFileSync(file, dest)
  }
}

run()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
