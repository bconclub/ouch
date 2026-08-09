/**
 * Replace generated placeholder images with real, commercially-licensed stock
 * photos from Openverse (CC0 / CC-BY family). Falls back silently to the
 * existing placeholder when no usable photo is found.
 *
 * Run: node --env-file=.env --import tsx scripts/fetch-stock-images.ts
 */
import fs from 'fs'
import os from 'os'
import path from 'path'
import { getPayload } from 'payload'
import sharp from 'sharp'

import config from '../src/payload.config'

const UA = 'OuchCatalogueSetup/1.0 (contact: admin@ouch.store)'
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

const PRODUCT_QUERIES: Record<string, string> = {
  'titanium-flat-back-labret-stud': 'labret stud piercing jewelry',
  'septum-clicker-gold-crescent': 'septum ring nose piercing gold',
  'surgical-steel-nose-stud-prong-set-cz': 'nose stud piercing gem',
  'titanium-segment-ring': 'segment ring piercing jewelry',
  'captive-bead-ring-surgical-steel': 'captive bead ring piercing',
  'industrial-barbell-arrow': 'industrial barbell ear piercing',
  'curved-navel-barbell-opal-drop': 'navel piercing belly ring',
  'tongue-barbell-titanium': 'tongue piercing barbell',
  'ear-tunnel-plugs-black-pvd-pair': 'ear tunnel plug gauge',
  'helix-stud-trinity-gem-cluster': 'helix ear piercing stud',
  'gold-hoop-nose-ring-seamless': 'gold nose ring hoop',
  'niobium-daith-heart-ring': 'daith heart piercing ring',
  'saline-piercing-aftercare-spray-100ml': 'saline spray bottle',
  'piercing-aftercare-foam-cleanser': 'foam cleanser pump bottle',
  'sterile-piercing-needles-10-pack': 'sterile needles medical',
  'slotted-pennington-forceps': 'surgical forceps steel',
  'nitrile-gloves-black-box-of-100': 'black nitrile gloves',
}

const CATEGORY_QUERIES: Record<string, string> = {
  ear: 'ear piercings earrings close up',
  nose: 'nose piercing jewelry',
  'lip-labret': 'lip piercing labret',
  barbells: 'barbell piercing jewelry',
  'rings-hoops': 'gold hoop earrings',
  aftercare: 'saline spray skincare bottle',
  'tools-supplies': 'piercing needle tools',
}

type OpenverseResult = {
  url: string
  title?: string
  filetype?: string | null
  license: string
}

async function searchOpenverse(query: string): Promise<OpenverseResult[]> {
  const params = new URLSearchParams({
    q: query,
    license_type: 'commercial',
    category: 'photograph',
    per_page: '8',
  })
  const res = await fetch(`https://api.openverse.org/v1/images/?${params}`, {
    headers: { 'User-Agent': UA },
    signal: AbortSignal.timeout(20000),
  })
  if (!res.ok) throw new Error(`openverse ${res.status}`)
  const json = (await res.json()) as { results: OpenverseResult[] }
  return json.results ?? []
}

async function downloadSquare(url: string, outFile: string): Promise<boolean> {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': UA },
      signal: AbortSignal.timeout(25000),
    })
    if (!res.ok) return false
    const buf = Buffer.from(await res.arrayBuffer())
    if (buf.length < 10_000) return false // tiny/broken file
    await sharp(buf)
      .rotate()
      .resize(1200, 1200, { fit: 'cover', position: 'attention' })
      .png()
      .toFile(outFile)
    return true
  } catch {
    return false
  }
}

async function fetchImageFor(query: string, outFile: string): Promise<boolean> {
  try {
    const results = await searchOpenverse(query)
    for (const r of results) {
      if (await downloadSquare(r.url, outFile)) return true
    }
  } catch (err) {
    console.warn(`  search failed for "${query}": ${(err as Error).message}`)
  }
  return false
}

async function run() {
  const payload = await getPayload({ config })
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ouch-stock-'))
  let replaced = 0
  let skipped = 0

  const { docs: products } = await payload.find({ collection: 'products', limit: 100, depth: 0 })
  for (const product of products) {
    const query = product.slug ? PRODUCT_QUERIES[product.slug] : undefined
    if (!query) continue
    const outFile = path.join(tmpDir, `${product.slug}-photo.png`)
    process.stdout.write(`product ${product.slug} … `)
    if (await fetchImageFor(query, outFile)) {
      const media = await payload.create({
        collection: 'media',
        data: { alt: product.title },
        filePath: outFile,
      })
      await payload.update({
        collection: 'products',
        id: product.id,
        data: { images: [{ image: media.id }] },
      })
      replaced++
      console.log('✓ replaced')
    } else {
      skipped++
      console.log('– kept placeholder')
    }
    await sleep(3200) // stay under anonymous Openverse rate limits
  }

  const { docs: categories } = await payload.find({ collection: 'categories', limit: 100, depth: 0 })
  for (const cat of categories) {
    const query = cat.slug ? CATEGORY_QUERIES[cat.slug] : undefined
    if (!query) continue
    const outFile = path.join(tmpDir, `${cat.slug}-photo.png`)
    process.stdout.write(`category ${cat.slug} … `)
    if (await fetchImageFor(query, outFile)) {
      const media = await payload.create({
        collection: 'media',
        data: { alt: `${cat.name} category` },
        filePath: outFile,
      })
      await payload.update({
        collection: 'categories',
        id: cat.id,
        data: { image: media.id },
      })
      replaced++
      console.log('✓ replaced')
    } else {
      skipped++
      console.log('– kept placeholder')
    }
    await sleep(3200)
  }

  fs.rmSync(tmpDir, { recursive: true, force: true })
  console.log(`Done: ${replaced} images replaced, ${skipped} kept placeholders`)
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
