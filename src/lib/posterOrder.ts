import type { Product } from '@/payload-types'

/**
 * Running order for the poster wall, derived from the artwork itself: each
 * print's luminance and saturation were measured, the most colourful lead,
 * and the true dark-background prints are slotted between them so the grid
 * alternates bright / dark all the way down.
 * Anything not listed keeps its natural (newest-first) position at the end.
 */
const ORDER = [
  'Butterfly Scream',
  'Dream Big Start Small',
  'Wild Soul',
  'Zero Given',
  'Progress Not Perfection',
  'Shine Ur Vibe',
  'Let Joy Find You',
  'Sun Moon Spiral',
  'Trust The Flow',
  'Spiral Garden',
  'Make Space For What Matters',
  'You Are Enough',
  'Be Kind',
  'Grow Anyway',
  'Focus On The Good',
  'Breathe Let Go Be Here',
  'Every Day Is A New Beginning',
]

export function orderPosters(posters: Product[]): Product[] {
  const rank = (p: Product) => {
    const i = ORDER.indexOf(p.title)
    return i === -1 ? ORDER.length : i
  }
  return [...posters].sort((a, b) => rank(a) - rank(b))
}
