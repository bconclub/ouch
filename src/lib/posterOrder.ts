import type { Product } from '@/payload-types'

/**
 * Running order for the poster wall, measured from the artwork itself:
 * dark and vibrant prints lead (scored on saturation minus lightness), and
 * the wall flows from black-and-loud down to the soft pale pieces.
 * Anything not listed keeps its natural (newest-first) position at the end.
 */
const ORDER = [
  'Dream Big Start Small',
  'Butterfly Scream',
  'Shine Ur Vibe',
  'Wild Soul',
  'Spiral Garden',
  'Sun Moon Spiral',
  'Zero Given',
  'Let Joy Find You',
  'Progress Not Perfection',
  'Make Space For What Matters',
  'Trust The Flow',
  'You Are Enough',
  'Be Kind',
  'Grow Anyway',
  'Every Day Is A New Beginning',
]

export function orderPosters(posters: Product[]): Product[] {
  const rank = (p: Product) => {
    const i = ORDER.indexOf(p.title)
    return i === -1 ? ORDER.length : i
  }
  return [...posters].sort((a, b) => rank(a) - rank(b))
}
