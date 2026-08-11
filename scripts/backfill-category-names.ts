/**
 * Re-save every product so the auto-filled `categoryName` (used by the admin
 * list view) is populated on existing records.
 *
 * Run: node --env-file=.env --import tsx scripts/backfill-category-names.ts
 */
import { getPayload } from 'payload'

import config from '../src/payload.config'

async function run() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({ collection: 'products', limit: 500, depth: 0 })

  for (const product of docs) {
    await payload.update({
      collection: 'products',
      id: product.id,
      data: {},
      draft: false,
    })
  }

  console.log(`Backfilled category names on ${docs.length} product(s).`)
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
