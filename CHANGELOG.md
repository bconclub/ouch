# Changelog

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
