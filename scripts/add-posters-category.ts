import { getPayloadClient } from '../src/lib/queries'

async function run() {
  const payload = await getPayloadClient()
  const existing = await payload.find({
    collection: 'categories',
    where: { slug: { equals: 'posters' } },
    limit: 1,
    overrideAccess: true,
  })
  if (existing.docs.length) {
    console.log('Posters category already exists:', existing.docs[0].id)
    return
  }
  const cat = await payload.create({
    collection: 'categories',
    overrideAccess: true,
    data: {
      name: 'Wall Posters',
      slug: 'posters',
      description: 'Art that talks back. Every poster ₹333, flat.',
    },
  })
  console.log('Created Posters category:', cat.id)
}

run()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
