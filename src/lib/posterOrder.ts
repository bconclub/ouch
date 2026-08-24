import type { Product } from '@/payload-types'

/**
 * Wild Soul always opens the wall — it is the signature piece. Everything
 * after it reshuffles on every visit, but never at random: each print was
 * measured for saturation and lightness, and the loud/dark pieces are
 * interleaved one-for-one with the quiet/pale ones, so the order is fresh
 * each refresh while the vibrant prints stay spread evenly across the grid
 * instead of clumping into a block.
 */
const LEAD = 'Wild Soul'

const LOUD = new Set([
  'Dream Big Start Small',
  'Butterfly Scream',
  'Shine Ur Vibe',
  'Wild Soul',
  'Spiral Garden',
  'Sun Moon Spiral',
  'Zero Given',
])

function shuffle<T>(items: T[]): T[] {
  const a = [...items]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function orderPosters(posters: Product[]): Product[] {
  const lead = posters.find((p) => p.title === LEAD)
  const rest = posters.filter((p) => p.title !== LEAD)
  const loud = shuffle(rest.filter((p) => LOUD.has(p.title)))
  const quiet = shuffle(rest.filter((p) => !LOUD.has(p.title)))

  // Lead with a loud one, then alternate; whichever list runs out first,
  // the remainder simply follows.
  const out: Product[] = lead ? [lead] : []
  for (let i = 0; i < Math.max(loud.length, quiet.length); i++) {
    if (loud[i]) out.push(loud[i])
    if (quiet[i]) out.push(quiet[i])
  }
  return out
}
