// Approved poster watermark (2026-08-30): diagonal "OUCH · oouucchh.com"
// repeats everywhere, plus one logo placed per poster where it doesn't fight
// the art. Reads clean originals from private-originals/posters, writes the
// web files (main + card + thumbnail) into media/. Run after adding posters:
//   NODE_PATH=node_modules node scripts/watermark-posters.mjs
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

const ORIG = 'private-originals/posters'
const logoB64 = fs.readFileSync('public/brand/logo-white.png').toString('base64')

// ly = logo vertical centre (fraction of height); false = art has its own logo.
// New posters default to 0.5 — add an entry here if that sits on the artwork's words.
const PLACE = {
  'Wild Soul': false,
  'Butterfly Scream': 0.5,
  'Spiral Garden': 0.5,
  'Let Joy Find You': 0.82,
  'Sun Moon Spiral': 0.5,
  'Zero Given': 0.5,
  'Shine Ur Vibe': 0.5,
  'Trust The Flow': 0.82,
  'Be Kind': 0.14,
  'You Are Enough': 0.78,
  'Dream Big Start Small': 0.1,
  'Grow Anyway': 0.8,
  'Progress Not Perfection': 0.8,
  'Make Space For What Matters': 0.85,
  'Every Day Is A New Beginning': 0.8,
}

function overlaySvg(W, H, ly) {
  // One big logo is enough on its own; the small diagonal repeats appear
  // only when there is no big logo (founder's rule — never both).
  if (ly !== false) {
    const logoW = Math.round(W * 0.62), logoH = Math.round(logoW * 0.30)
    const logo = `<image x="${(W - logoW) / 2}" y="${Math.round(H * ly - logoH / 2)}" width="${logoW}" height="${logoH}" opacity="0.62" xlink:href="data:image/png;base64,${logoB64}"/>`
    return `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">${logo}</svg>`
  }
  const marks = []
  const stepX = Math.round(W * 0.38), stepY = Math.round(H * 0.16)
  let row = 0
  for (let y = Math.round(stepY / 2); y < H + stepY; y += stepY, row++) {
    const off = (row % 2) ? Math.round(stepX / 2) : 0
    for (let x = off - stepX; x < W + stepX; x += stepX) {
      marks.push(`<text x="${x}" y="${y}" text-anchor="middle" font-family="Start Story" font-size="${Math.round(W * 0.05)}" fill="#ffffff" fill-opacity="0.3" transform="rotate(-28 ${x} ${y})">OUCH · oouucchh.com</text>`)
    }
  }
  return `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">${marks.join('')}</svg>`
}

const rows = execSync(
  `sqlite3 ouch.db "SELECT filename, width, height, sizes_card_filename, sizes_thumbnail_filename FROM media"`
).toString().trim().split('\n').map((l) => l.split('|'))

let done = 0
for (const f of fs.readdirSync(ORIG)) {
  const base = f.replace(/\.(jpe?g|png)$/i, '')
  const row = rows.find((r) => r[0].replace(/\.(jpe?g|png)$/i, '') === base)
  if (!row) { console.log('no media row, skipping:', f); continue }
  const [filename, w, h, card, thumb] = row
  const W = +w, H = +h
  const ly = base in PLACE ? PLACE[base] : 0.5
  // sharp applies resize before composite regardless of call order, so the
  // overlay is rasterised to final size first (two-pass rule).
  const overlay = await sharp(Buffer.from(overlaySvg(W, H, ly))).resize(W, H, { fit: 'fill' }).png().toBuffer()
  const main = await sharp(path.join(ORIG, f)).rotate().resize(W, H, { fit: 'cover' })
    .composite([{ input: overlay, blend: 'exclusion' }]).jpeg({ quality: 82 }).toBuffer()
  fs.writeFileSync(path.join('media', filename), main)
  if (card) fs.writeFileSync(path.join('media', card), await sharp(main).resize(768, 768, { fit: 'cover' }).jpeg({ quality: 82 }).toBuffer())
  if (thumb) fs.writeFileSync(path.join('media', thumb), await sharp(main).resize(400, 400, { fit: 'cover' }).jpeg({ quality: 80 }).toBuffer())
  done++
}
console.log('watermarked', done, 'posters')
