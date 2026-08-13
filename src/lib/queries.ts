import { getPayload, type Where } from 'payload'
import { cache } from 'react'

// Imported lazily so the Payload config (which requires PAYLOAD_SECRET and a
// reachable database) is only evaluated when a request actually queries it —
// never at build time.
export const getPayloadClient = cache(async () => {
  const config = (await import('@payload-config')).default
  return getPayload({ config })
})

export const getSiteSettings = cache(async () => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'site-settings' })
})

export const getCategories = cache(async () => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'categories',
    sort: 'displayOrder',
    limit: 100,
  })
  return docs
})

export const getCategoryBySlug = cache(async (slug: string) => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'categories',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return docs[0] ?? null
})

export const getProductBySlug = cache(async (slug: string) => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })
  return docs[0] ?? null
})

export const getFeaturedProducts = cache(async () => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'products',
    where: { featured: { equals: true } },
    depth: 2,
    limit: 8,
    sort: '-createdAt',
  })
  return docs
})

export type ProductQuery = {
  category?: string // category slug
  material?: string
  search?: string
  sort?: 'newest' | 'price-asc' | 'price-desc'
  page?: number
}

export async function queryProducts({ category, material, search, sort, page }: ProductQuery) {
  const payload = await getPayloadClient()

  const and: Where[] = []
  if (category) {
    const cat = await getCategoryBySlug(category)
    and.push({ category: { equals: cat?.id ?? -1 } })
  }
  if (material) {
    and.push({ material: { equals: material } })
  }
  if (search) {
    and.push({ title: { like: search } })
  }

  const sortMap = {
    newest: '-createdAt',
    'price-asc': 'price',
    'price-desc': '-price',
  } as const

  return payload.find({
    collection: 'products',
    where: and.length ? { and } : undefined,
    depth: 2,
    limit: 12,
    page: page ?? 1,
    sort: sortMap[sort ?? 'newest'],
  })
}
