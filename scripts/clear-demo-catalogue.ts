/**
 * Delete the 17 sample products (and their sample photos) so the shop is empty
 * and ready for real stock. Categories, orders, brand images and site settings
 * are left untouched.
 *
 * Dry run (default, shows what would go):
 *   node --env-file=.env --import tsx scripts/clear-demo-catalogue.ts
 * Actually delete:
 *   node --env-file=.env --import tsx scripts/clear-demo-catalogue.ts --yes
 */
import { getPayload } from 'payload'

import config from '../src/payload.config'

const CONFIRM = process.argv.includes('--yes')

async function run() {
  const payload = await getPayload({ config })

  const { docs: products } = await payload.find({
    collection: 'products',
    limit: 500,
    depth: 1,
  })

  if (products.length === 0) {
    console.log('No products found — nothing to clear.')
    process.exit(0)
  }

  console.log(`${products.length} product(s) would be deleted:`)
  for (const p of products) console.log(`  · ${p.title}`)

  if (!CONFIRM) {
    console.log('\nDry run only. Re-run with --yes to actually delete them.')
    process.exit(0)
  }

  // Collect the media attached to these products so sample photos go too.
  const mediaIds = new Set<number>()
  for (const p of products) {
    for (const entry of p.images ?? []) {
      const image = entry.image
      if (typeof image === 'number') mediaIds.add(image)
      else if (image && typeof image === 'object' && 'id' in image) mediaIds.add(image.id)
    }
  }

  for (const p of products) {
    await payload.delete({ collection: 'products', id: p.id })
  }
  console.log(`Deleted ${products.length} product(s).`)

  let removedMedia = 0
  for (const id of mediaIds) {
    try {
      await payload.delete({ collection: 'media', id })
      removedMedia++
    } catch {
      // Still referenced elsewhere (e.g. a category cover) — leave it alone.
    }
  }
  console.log(`Deleted ${removedMedia} sample photo(s).`)
  console.log('Shop is empty and ready for real products.')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
