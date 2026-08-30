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

// Exactly ONE logo watermark per poster (founder's rule): always the logo,
// never removed, never repeated. Entries are ly (vertical centre, fraction of
// height) or [ly, scale] where scale is logo width as a fraction of poster
// width (default 0.62). Place and size it to respect each artwork; keep it
// central enough that no crop removes it. New posters default to centre.
const PLACE = {
  // Founder (2026-08-30): ONE logo per poster, in the middle. If the artwork
  // already carries a painted Ouch logo, set false — the art's own logo is
  // the one, and no watermark is added on top.
  'Wild Soul': false,
  'Butterfly Scream': false,
}

function overlaySvg(W, H, place) {
  const [ly, scale] = Array.isArray(place) ? place : [place, 0.62]
  const logoW = Math.round(W * scale), logoH = Math.round(logoW * 0.30)
  const logo = `<image x="${(W - logoW) / 2}" y="${Math.round(H * ly - logoH / 2)}" width="${logoW}" height="${logoH}" opacity="0.62" xlink:href="data:image/png;base64,${logoB64}"/>`
  return `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">${logo}</svg>`
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
  if (ly === false) {
    // the artwork's own painted logo is the watermark — ship it clean
    const main = await sharp(path.join(ORIG, f)).rotate().resize(W, H, { fit: 'cover' }).jpeg({ quality: 82 }).toBuffer()
    fs.writeFileSync(path.join('media', filename), main)
    if (card) fs.writeFileSync(path.join('media', card), await sharp(main).resize(768, 768, { fit: 'cover' }).jpeg({ quality: 82 }).toBuffer())
    if (thumb) fs.writeFileSync(path.join('media', thumb), await sharp(main).resize(400, 400, { fit: 'cover' }).jpeg({ quality: 80 }).toBuffer())
    done++
    continue
  }
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
