/**
 * Rotating accent styles so grids read multi-color. Literal class strings only —
 * Tailwind's scanner must see them. Index with `i % ACCENTS.length`.
 */
export const ACCENTS = [
  {
    text: 'text-accent',
    hoverText: 'hover:text-accent',
    border: 'hover:border-accent',
    cardBorder: 'border-accent/40',
    glow: 'from-accent/20',
    tile: 'bg-accent/10',
  },
  {
    text: 'text-tangerine',
    hoverText: 'hover:text-tangerine',
    border: 'hover:border-tangerine',
    cardBorder: 'border-tangerine/40',
    glow: 'from-tangerine/20',
    tile: 'bg-tangerine/10',
  },
  {
    text: 'text-sun',
    hoverText: 'hover:text-sun',
    border: 'hover:border-sun',
    cardBorder: 'border-sun/50',
    glow: 'from-sun/25',
    tile: 'bg-sun/15',
  },
  {
    text: 'text-lime',
    hoverText: 'hover:text-lime',
    border: 'hover:border-lime',
    cardBorder: 'border-lime/40',
    glow: 'from-lime/20',
    tile: 'bg-lime/10',
  },
  {
    text: 'text-violet',
    hoverText: 'hover:text-violet',
    border: 'hover:border-violet',
    cardBorder: 'border-violet/40',
    glow: 'from-violet/20',
    tile: 'bg-violet/10',
  },
  {
    text: 'text-coral',
    hoverText: 'hover:text-coral',
    border: 'hover:border-coral',
    cardBorder: 'border-coral/40',
    glow: 'from-coral/20',
    tile: 'bg-coral/10',
  },
] as const

/** Deterministic accent for an entity id, stable across pages. */
export const accentFor = (id: number) => ACCENTS[Math.abs(id) % ACCENTS.length]

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
