# Changelog

## 2026-08-13 18:40 IST · Production storage: uploads to Vercel Blob

- Added the Vercel Blob storage adapter, enabled only when BLOB_READ_WRITE_TOKEN is present — production uploads persist instead of vanishing with each deploy; local dev keeps writing to ./media unchanged
- Documented the production env vars in .env.example
- Confirmed live error at oouucchh.com is "missing secret key": PAYLOAD_SECRET and a hosted DATABASE_URL still need to be set in Vercel

## 2026-08-12 17:45 IST · Fix production build (Vercel)

- Vercel build failed: "missing secret key" while prerendering /checkout. The storefront layout loads header/footer from Payload, so static prerendering needed PAYLOAD_SECRET and a database at build time
- Storefront routes are now `force-dynamic` (rendered per request) — /cart and /checkout are no longer prerendered
- Payload config is imported lazily in `lib/queries.ts`, so nothing evaluates it at build time
- SQLite adapter now accepts DATABASE_AUTH_TOKEN, so a hosted libSQL/Turso database can be used in production without a code change
- Verified: `next build` succeeds with PAYLOAD_SECRET and DATABASE_URL unset

## 2026-08-12 16:40 IST · Hero paint explosion + 3D parallax per reference

- New PaintBurst background recreating the reference art: purple/magenta burst left, orange/yellow right, cyan lower-right, white framing arc swashes, drips and spatter on black
- Splashes break over the figure; photo mask tightened so paint shows through the corners
- Subtle 3D parallax: paint drifts opposite the cursor, the portrait tilts toward it (disabled for reduced-motion)
- Awaiting the transparent cutout PNG for the final 1:1 foreground

## 2026-08-12 16:10 IST · Hero blends into the paint

- Founder photo now melts into the background: soft-dissolve mask on the cutout edges plus brush strokes crossing over the photo itself (pink through the hair, yellow across the chest, purple at the top corner)

## 2026-08-12 15:45 IST · The founder is the hero

- Hero image is now the founder's own photo (from media/Ouch Skye), cropped headband-to-shoulders and cut out into the painted brush mask over the stroke fan — on both dark and light versions
- Source preserved at src/assets/covers/hero-founder-src.jpeg

## 2026-08-12 15:10 IST · Dark version is now THE site; tiles colour-washed like the mockup

- Dark is the default for every new visitor (light remains one smiley-click away)
- Collection tiles now use colour-washed monochrome photos per the mockup — pink studs, purple ear, teal rings, orange barbells, lime gems (two-pass greyscale+tint pipeline)
- Dark CTA corrected to a cyan brush OUTLINE with cyan text; "Bold pieces. Good vibes." line cyan in dark
- Purple paint drips + extra smiley on the hero's right edge per the mockup; stamp heart now reads dark-on-light like the mock

## 2026-08-12 14:40 IST · Dark-mode splash fix, true black, no transition flash

- Fixed: page-edge neon splashes were painting behind the page background (stacking-context bug) — dark mode looked plain. Now visible as in the mockup
- Dark background corrected to true black (#080808) per the mockup
- Removed the body colour transition that could freeze as a gray frame in embedded previews

## 2026-08-12 14:10 IST · Mockup-fidelity pass: painted cutout hero, brush pills, exact treatments

- Hero photo is now an organic dry-brush cutout (SVG clip path) with strokes wrapping behind and a yellow stroke overlapping its lower edge — no more rectangular frame
- CTA buttons are rough painted brush-pill shapes (black in light, cyan in dark) instead of clean capsules
- Headline tightened to the mock: per-line tilts, larger STUDS., thick tapered pink underline, tick doodles flanking "HEY DUDE,"
- Page-edge neon splash backdrop in dark mode
- Collection heading skewed marker-italic on the pink band; tiles get per-tile tilts and per-colour neon glow rims in dark
- Vibe banner: ink heart added at right per mock
- Footer: "Different." in pink marker with underline + heart, marker-italic Let's Connect / Journal headings, distressed static STAY REAL stamp (was spinning), proper shopping-bag icon in header

## 2026-08-12 13:30 IST · "Check These Studs" homepage, pixel-close, light + dark

- Homepage rebuilt to the founder's two mockups with a light/dark toggle (smiley button in the header; choice persists, no flash on reload)
- Hand-built paint vector kit (`Paint.tsx`): hard-edged dry-brush strokes, spray splashes, paint drips — plus new doodles (smiley, lightning, peace, squiggle, ticks)
- Hero: stacked HEY DUDE / CHECK / THESE / STUDS. headline with per-theme colors, marker-highlighted "stand out", portrait over layered brush strokes, black pill CTA (cyan outline in dark)
- Collection: heading on a pink brush band; five painted tiles with the funky names — labels under tiles (light) / painted onto tiles (dark)
- Stats row (1000+ / 3000+ / 5+ / Premium & Sterile) — clean with dividers in light, colored paint panels in dark
- Vibe banner: peace sign + "Not just holes. It's a whole vibe." on a pink/yellow brush band (light) or neon spray (dark)
- Footer per mockup: LET'S CONNECT (@ouch.piercings, hello@ouchjewellery.com, www.ouchjewellery.com — display values, confirm before launch), Journal, rotating STAY REAL stamp
- Categories renamed to the brand's funky names: Dainty Nostrils, Ear Stacks, Septum Vibes, Body Sparks, Studs & Gems (Aftercare + Tools retired, products reassigned)
- New fonts: Luckiest Guy (poster) + Permanent Marker (marker) + Inter
- Dark-mode sweep across inner pages; nine new product photos added to tracked assets for future listings

## 2026-08-11 17:40 IST · Catalogue rebuilt on the founder's own photography; all mockup imagery removed

- Deleted the 17 sample products and every stock/mockup photo attached to them
- Created five real products from the founder's images, using the brand's own copy: Flat Back Labret Stud — CZ, Hoop Set, Stud Set, Charm Set, Barbell Collection (prices are placeholders, to be set in the admin)
- Every image on the site now comes from the founder's shoot: hero deck, studio carousel, category covers, product photos, and the Ouch-vibe band
- Removed all mockup files from the project: brand mockups, poster covers (with the fake printed logo), tile/studio crops, and 32 orphaned stock photos from the media library
- Only the real logo and the Ouch Skye photography remain in `public/brand/`

## 2026-08-11 17:25 IST · Transparent header, borderless photo cards, first real product photo

- Header is now fully transparent over the hero: no white bar, the gradient runs straight up behind it, with the logo, nav and icons in white
- On scroll (and on every other page) it fades to the cream blurred bar with the dark logo so it stays readable over light content
- Removed the white polaroid borders from the hero photo cards — images now sit edge to edge
- Founder's first real product photo (flat-back labret with bezel-set CZ) attached to "Titanium Flat Back Labret Stud"

## 2026-08-11 17:15 IST · Hero image is now a fanned, shuffling photo deck

- Replaced the single hero card with a collage of five overlapping photo cards, fanned at different angles and depths (ear stack, hoops, studs, barbells, curated sets)
- The deck auto-shuffles every ~4s, pauses on hover, and advances on click; respects prefers-reduced-motion
- New `PhotoFan` component drives it, so photos can be swapped in one list

## 2026-08-11 17:00 IST · Hero switched to a craft-focused ear-stack close-up

- The previous hero used a portrait of a model from the brand shoot, which read as though it were the founder. Replaced with a tight close-up of a curated ear stack (helix, conch, rook, lobe) from the same shoot — shows the work itself, no identity question
- Portrait crop removed from the project

## 2026-08-11 16:50 IST · Hero uses the founder's own portrait; fake logo removed from the site

- The hero was showing a poster image with an AI-generated "OUCH PIERCING STUDIO" mark printed on it — not the real brand logo. Replaced with a clean, logo-free portrait crop of the founder (nostril, septum, labret and full ear stack visible)
- No poster image with the printed mark is used anywhere on the site now; the real logo appears only as the header/footer wordmark
- Hero card reshaped to the new portrait crop (644x880)

## 2026-08-11 16:05 IST · Logo restored to the founder's original file

- Reverted the logo to the exact file the founder supplied (`src/assets/logo-original.png`) — the previous one was a low-resolution crop lifted off a poster, where the tiny "PIERCING STUDIO" line was illegible at header size
- Processed at native resolution (1411×378, transparent) instead of upscaled; ink and white variants
- Header logo enlarged (h-9 / h-11 on desktop), footer to h-9, favicon rebuilt from the real mark
- Poster version kept at `src/assets/logo-studio-poster.png` in case the studio lockup is wanted later


## 2026-08-11 15:45 IST · Admin set up for day-to-day product management

- Photo uploads no longer block on alt text — it's auto-filled from the file name (still editable); focal point cropping enabled
- Products list now shows a photo thumbnail, category, price, stock and status; searchable by title, category, gauge and size
- Category column fixed: relationship columns don't resolve on draft-enabled collections, so the category name is now stored alongside the product (auto-maintained, sortable, searchable)
- Plain-English hints on every product field, and a Preview button that opens the live product page
- Admin sidebar grouped: Catalogue (Products, Categories, Media) · Shop (Orders) · Settings (Users)
- `MANAGING-THE-SHOP.md` written for the founder — adding products, stock, orders, settings
- New scripts: `npm run clear-demo` (dry-run by default) to remove the 17 sample products, `npm run covers` to re-apply brand category covers
- Verified end-to-end: upload without alt → create → publish → appears on shop and in search

## 2026-08-11 15:45 IST · Founder's studio photography as category images

- All ten "Ouch Skye" studio images added as tracked assets and mapped to categories: ear stack → Ear, septum portrait → Nose, labret portrait → Lip & Labret, barbell flat-lay → Barbells, hoops flat-lay → Rings & Hoops, jewellery flat-lay → Aftercare, studs flat-lay → Tools & Supplies
- Studio carousel now uses the founder's photography (Ear Curations, Nose, Face, Body, Curated Sets)
- Reverted hero colors to the vibrant red-orange-gold gradient — only the guide poster image was meant to change, not the palette
- `scripts/set-category-covers.ts` added so covers can be re-applied any time


## 2026-08-11 15:30 IST · Founder's brand posters wired in

- Six branded section covers (Piercing Guide, Face, Body, Nose, Ear Curations, Curated Sets) added as tracked assets and wired in: guide poster is the hero card, the other five drive the studio carousel
- Real OUCH Piercing Studio ink-splat logo extracted from the posters — now in header, footer (white variant), and favicon
- Hero rethemed to the posters' parchment/terracotta/olive palette with founder copy: "Express your story. Wear your energy." + "You do you."
- Instagram set to @ouch_piercing in site settings
- User-facing: home page now runs on the founder's actual brand system

## 2026-08-10 00:15 IST · Full-saturation hero

- Hero background changed from pale wash to a saturated color statement: deep red → orange → gold gradient with green and violet glows
- "Pierce Your Story" now in cream-white script with gold swoosh and doodles, soft warm drop shadow
- Portrait re-cut with +35% saturation and framed as a rotated white-border sticker card with deep shadow
- User-facing: the first screen is now unmistakably vibrant instead of white/cream

## 2026-08-09 23:40 IST · Rasta hero: fine-art braids portrait + red-gold-green wash

- Hero image replaced with a dramatic B&W fine-art braids portrait (David Rosen Photography, CC BY 2.0, credited)
- Hero watercolor wash shifted to Rasta tones: deep red → marigold → gold → green
- User-facing: first screen now carries a Rasta-vibe, artisanal energy

## 2026-08-09 23:05 IST · Real Indian vibe: real hero photo + hotter washes

- Replaced the AI hero portrait with a real photograph: Indian bride with nath, jhumkas and gold choker (CC BY 2.0, credited in ATTRIBUTIONS.md)
- Hero and footer watercolor washes boosted to full Indian vibrancy — marigold, rani pink, peacock teal, turmeric
- Added ATTRIBUTIONS.md covering hero + Openverse catalogue photos
- User-facing: home page reads unmistakably Indian and much more vibrant

## 2026-08-09 21:45 IST · v2 mockup sections + real logo + stock photos

- Rebuilt the first three home sections one-to-one with the second mockup: "Pierce Your Story" calligraphic hero with yellow swoosh, crown/heart/star/scratch doodle vectors, "CURATED PIERCINGS. TIMELESS YOU." eyebrow, black pill "Explore Collection →"
- Values strip: Premium Materials / Skin-Safe / Styled for You / Hygienic & Professional with colored line icons, per-item swoosh underlines, divider lines, and script "Feel good. Look great."
- "OUR PIERCING STUDIO" scrollable card carousel with paint-swash script chips (Ear Curations, Nose, Face, Body, Curated Sets)
- "THE OUCH VIBE — Safe. Stylish. Yours." band matching the mockup's fourth section
- Header now matches the mockup nav (Piercings · Jewellery · Studio · Journal · About + search/heart/bag icons)
- The user's exact OUCH logo wordmark processed (white background removed; ink + white variants) and used in header, footer, and favicon
- Real licensed stock photos (Openverse, commercial-use) pulled for products and categories; pastel placeholder retained only where no photo was found
- User-facing: home page now mirrors the approved mockup with real branding

## 2026-08-09 21:20 IST · Rebrand to the mockup: light cream theme + brand assets

- Full pivot from dark theme to the user's mockup: warm cream base, watercolor gradient washes, confetti-dot OUCH logo (SVG recreation), Fraunces serif + Caveat script + Inter type system
- Hero rebuilt: logo, script "Self-expression, curated." with gradient + squiggle underline, portrait photo cropped from the mockup, black pill CTAs
- New home sections: values strip (Express/Curate/Craft/Energize/Elevate icon columns), curated-collection category tiles using jewelry crops from the mockup, studio band with neon-sign photos, gradient footer wash + dark base bar
- Product/category cards restyled light with pastel image tiles and rounded corners; all CTAs now black pills
- Placeholder catalogue images regenerated in light pastel style; DB reseeded; `/brand/**` added to next/image localPatterns
- Fixed: gradient text + squiggle underline conflict made script words invisible; stale Next dev image cache served old dark images
- User-facing: the whole site now matches the shared brand mockup

## 2026-08-09 20:35 IST · Fire/Rasta palette (more vibrant, no rainbow)

- Palette shifted from rainbow (pink/cyan/violet) to fire & Rasta tones: hot red, orange, gold, green on a warm near-black base
- Hero glows, gradient headlines, CTA gradients and the announcement bar all now sweep red→orange→gold→green
- Category accent cycling now uses the four warm colors; variant picker highlights in gold, Aftercare CTA in green
- Regenerated all placeholder catalogue images in warm tones to match (database reseeded — previous test order cleared)
- User-facing: hotter, more saturated look; no cool blue/purple anywhere

## 2026-08-09 20:05 IST · Vibrant multi-color redesign

- Replaced the single pink-on-black accent with a six-color palette (pink, cyan, lime, violet, sun-yellow, tangerine) defined as theme tokens in `styles.css`
- Animated rainbow announcement bar and footer trim; rainbow-gradient logo wordmark and headline moments (hero "sting", Featured, Shop All, 404)
- Each category gets a stable accent color used consistently across nav links, home category cards, product-card labels, and category page headings
- Primary CTAs (Shop All, Add to cart, Checkout, Place order) use an animated pink→violet→cyan gradient
- User-facing: the whole storefront reads vibrant/multi-color instead of one-color
