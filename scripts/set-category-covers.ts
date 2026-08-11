/**
 * Attach the founder's branded category images (src/assets/covers/cat-*.png)
 * to their Payload categories, replacing earlier stock photos.
 *
 * Run: node --env-file=.env --import tsx scripts/set-category-covers.ts
 */
import path from 'path'
import { getPayload } from 'payload'

import config from '../src/payload.config'

const COVERS: Record<string, { file: string; alt: string }> = {
  ear: { file: 'cat-ear.png', alt: 'Curated ear stack with gold hoops and studs' },
  nose: { file: 'cat-nose.png', alt: 'Gold septum ring and curated ear piercings' },
  'lip-labret': { file: 'cat-lip.png', alt: 'Centre labret stud with stacked ear hoops' },
  barbells: { file: 'cat-barbells.png', alt: 'Curved and straight barbells in gold and steel' },
  'rings-hoops': { file: 'cat-hoops.png', alt: 'Gold and silver hoops and segment rings' },
  aftercare: { file: 'cat-sets.png', alt: 'Curated jewellery flat lay' },
  'tools-supplies': { file: 'cat-studs.png', alt: 'Gemstone and charm studs flat lay' },
}

async function run() {
  const payload = await getPayload({ config })
  const coverDir = path.resolve('src/assets/covers')

  for (const [slug, cover] of Object.entries(COVERS)) {
    const { docs } = await payload.find({
      collection: 'categories',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    const category = docs[0]
    if (!category) {
      console.warn(`– no category "${slug}" — skipped`)
      continue
    }

    const media = await payload.create({
      collection: 'media',
      data: { alt: cover.alt },
      filePath: path.join(coverDir, cover.file),
    })
    await payload.update({
      collection: 'categories',
      id: category.id,
      data: { image: media.id },
    })
    console.log(`✓ ${slug} → ${cover.file}`)
  }

  console.log('Category covers updated')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
