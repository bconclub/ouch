import type { Product } from '@/payload-types'

/**
 * Hand-picked running order for the poster wall: lead with a bold, colourful
 * piece, then alternate loud and soft so the grid never clumps into one mood.
 * Anything not listed keeps its natural (newest-first) position at the end.
 */
const ORDER = [
  'Wild Soul',
  'Dream Big Start Small',
  'Trust The Flow',
  'Shine Ur Vibe',
  'Make Space For What Matters',
  'Let Joy Find You',
  'Zero Given',
  'Be Kind',
  'Butterfly Scream',
  'Breathe Let Go Be Here',
  'Sun Moon Spiral',
  'You Are Enough',
  'Spiral Garden',
  'Grow Anyway',
  'Every Day Is A New Beginning',
  'Focus On The Good',
  'Progress Not Perfection',
]

export function orderPosters(posters: Product[]): Product[] {
  const rank = (p: Product) => {
    const i = ORDER.indexOf(p.title)
    return i === -1 ? ORDER.length : i
  }
  return [...posters].sort((a, b) => rank(a) - rank(b))
}
