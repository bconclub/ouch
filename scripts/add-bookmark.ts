/**
 * Adds bookmark image files to the Bookmarks category (creates it if needed).
 * Price 0 — bookmarks show "It's cooking" like posters, never a price.
 * Usage: node --env-file=.env --import tsx scripts/add-bookmark.ts <file...>
 */
import fs from 'fs'
import path from 'path'

import { getPayloadClient } from '../src/lib/queries'

function titleFromFile(file: string): string {
  const base = path.basename(file).replace(/\.[a-z]+$/i, '')
  const cleaned = base.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim()
  return cleaned.replace(/(^|\s)(\w)/g, (_m, pre, c) => pre + c.toUpperCase())
}

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

async function run() {
  const files = process.argv.slice(2)
  if (!files.length) {
    console.error('Pass bookmark image paths')
    process.exit(1)
  }
  const payload = await getPayloadClient()
  let category = (
    await payload.find({ collection: 'categories', where: { slug: { equals: 'bookmarks' } }, limit: 1, overrideAccess: true })
  ).docs[0]
  if (!category) {
    category = await payload.create({
      collection: 'categories',
      overrideAccess: true,
      data: {
        name: 'Little Reminders',
        slug: 'bookmarks',
        description: 'Bookmarks with big feelings. Still cooking — prices land with the launch.',
      },
    })
    console.log('created Bookmarks category:', category.id)
  }

  for (const file of files) {
    const title = titleFromFile(file)
    const media = await payload.create({
      collection: 'media',
      overrideAccess: true,
      data: { alt: `${title} — Ouch bookmark` },
      filePath: path.resolve(file),
    })
    await payload.create({
      collection: 'products',
      overrideAccess: true,
      data: {
        title,
        slug: slugify(title),
        price: 0,
        category: category.id,
        images: [{ image: media.id }],
        _status: 'published',
      },
    })
    console.log('added bookmark:', title)
  }
}

run()
  .then(() => process.exit(0))
  .catch((e) => { console.error(e); process.exit(1) })
