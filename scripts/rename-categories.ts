/**
 * Rename the shop sections to the brand's own names, retire the two empty ones,
 * and move products to where they belong.
 *
 * Run: node --env-file=.env --import tsx scripts/rename-categories.ts --yes
 */
import { getPayload } from 'payload'

import config from '../src/payload.config'

const CONFIRM = process.argv.includes('--yes')

// oldSlug -> { name, slug, cover }
const RENAMES: Record<string, { name: string; slug: string; cover: string }> = {
  nose: { name: 'Dainty Nostrils', slug: 'dainty-nostrils', cover: 'cat-nose.png' },
  ear: { name: 'Ear Stacks', slug: 'ear-stacks', cover: 'cat-ear.png' },
  'rings-hoops': { name: 'Septum Vibes', slug: 'septum-vibes', cover: 'cat-hoops.png' },
  barbells: { name: 'Body Sparks', slug: 'body-sparks', cover: 'cat-barbells.png' },
  'lip-labret': { name: 'Studs & Gems', slug: 'studs-gems', cover: 'cat-studs.png' },
}

const RETIRE = ['aftercare', 'tools-supplies']

// Product title -> destination slug (after renaming)
const REASSIGN: Record<string, string> = {
  'Flat Back Labret Stud — CZ': 'studs-gems',
  'Stud Set': 'studs-gems',
  'Hoop Set': 'ear-stacks',
  'Charm Set': 'ear-stacks',
  'Barbell Collection': 'body-sparks',
  'Navel Barbell — Heraldic Flower, CZ & Opal': 'body-sparks',
}

async function run() {
  const payload = await getPayload({ config })

  if (!CONFIRM) {
    console.log('Would rename:')
    for (const [old, next] of Object.entries(RENAMES)) console.log(`  ${old} -> ${next.slug} (${next.name})`)
    console.log('Would retire:', RETIRE.join(', '))
    console.log('\nDry run. Re-run with --yes.')
    process.exit(0)
  }

  const order = ['dainty-nostrils', 'ear-stacks', 'septum-vibes', 'body-sparks', 'studs-gems']

  for (const [oldSlug, next] of Object.entries(RENAMES)) {
    const { docs } = await payload.find({
      collection: 'categories',
      where: { slug: { equals: oldSlug } },
      limit: 1,
    })
    const cat = docs[0]
    if (!cat) {
      console.warn(`  ! category "${oldSlug}" not found`)
      continue
    }
    await payload.update({
      collection: 'categories',
      id: cat.id,
      data: {
        name: next.name,
        slug: next.slug,
        displayOrder: order.indexOf(next.slug),
      },
    })
    console.log(`  ✓ ${oldSlug} -> ${next.slug} (${next.name})`)
  }

  // Move products before retiring anything.
  for (const [title, destSlug] of Object.entries(REASSIGN)) {
    const { docs: prods } = await payload.find({
      collection: 'products',
      where: { title: { equals: title } },
      limit: 1,
    })
    const { docs: cats } = await payload.find({
      collection: 'categories',
      where: { slug: { equals: destSlug } },
      limit: 1,
    })
    if (!prods[0] || !cats[0]) continue
    await payload.update({
      collection: 'products',
      id: prods[0].id,
      data: { category: cats[0].id },
    })
    console.log(`  → ${title} moved to ${destSlug}`)
  }

  for (const slug of RETIRE) {
    const { docs } = await payload.find({
      collection: 'categories',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    if (!docs[0]) continue
    const { totalDocs } = await payload.find({
      collection: 'products',
      where: { category: { equals: docs[0].id } },
      limit: 0,
    })
    if (totalDocs > 0) {
      console.warn(`  ! "${slug}" still has ${totalDocs} product(s) — keeping it`)
      continue
    }
    await payload.delete({ collection: 'categories', id: docs[0].id })
    console.log(`  ✗ retired ${slug}`)
  }

  console.log('\nSections updated.')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
