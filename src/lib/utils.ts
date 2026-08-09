const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

export const formatPrice = (amount: number): string => inr.format(amount)

export type MediaLike =
  | number
  | null
  | undefined
  | {
      url?: string | null
      alt?: string
      sizes?: {
        thumbnail?: { url?: string | null } | null
        card?: { url?: string | null } | null
        hero?: { url?: string | null } | null
      } | null
    }

export function mediaUrl(media: MediaLike, size?: 'thumbnail' | 'card' | 'hero'): string | null {
  if (!media || typeof media === 'number') return null
  if (size) {
    const sized = media.sizes?.[size]?.url
    if (sized) return sized
  }
  return media.url ?? null
}

export function mediaAlt(media: MediaLike, fallback = ''): string {
  if (!media || typeof media === 'number') return fallback
  return media.alt || fallback
}
