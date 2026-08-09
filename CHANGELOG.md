# Changelog

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
