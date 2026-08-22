# 🔀 Context Handoff — Ouch (piercing e-commerce) — 2026-08-22

## Goal / what we are doing
Ship the founder's piercing/jewellery store: Next.js 16 + Payload CMS 3.87.1 storefront with WhatsApp checkout (+91 72599 56780), homepage replicating THE FOUNDER'S OWN final design (numbered black/paper sections). User is submitting the site NOW — 1-hour deadline pressure; work strictly section-by-section, one thing at a time.

## Project facts
- Repo: https://github.com/bconclub/ouch · Branch: main · Deploy: Vercel → https://oouucchh.com (DNS connected)
- Deploy flow: push to main → Vercel auto-build. Vercel MCP: team_ha49zkxrYmn1QCTQCQlgGgNr / project prj_kv1U7SEcFwRdxW4ExSIjz8uGAOuD (get_runtime_errors works; NO env-var write tool exists)
- Live now: UP AND WORKING at 384cb6f — self-contained demo deploy (SQLite DB + images bundled into the serverless functions via outputFileTracingIncludes; demo fallback secret in payload.config). Verified via screenshots 2026-08-22. Read-only: live admin editing/orders bookkeeping need the real Turso DB + env vars later; checkout still hands to WhatsApp fine.
- Local dev: preview_start name "ouch-dev" → http://localhost:3000; admin at /admin (email admin@ouch.store, seeded password — user told to change it; never write it in files)
- DB: local SQLite ouch.db (gitignored) — 5 categories (dainty-nostrils, ear-stacks, septum-vibes, body-sparks, studs-gems), 6 products, ALL PRICES PLACEHOLDER

## State right now
- On origin/main: 384cb6f "Self-contained Vercel demo: bundle SQLite DB + catalogue images"
- Uncommitted: none · Unpushed: none
- Work queue: see `.claude/state/todo.md` (refreshed 2026-08-22) — 2 pending, 4 blocked, 0 deferred

## What shipped this thread (newest first)
- 74375ad — shop + product detail restyled: paper paint-tile ProductCard, marker/poster headings
- 7a9703a — Space Grotesk site-wide body font (user's explicit choice)
- 596c334 — FINAL homepage: hero "NOT JUST HOLES / WHOLE VIBE" + founder cutout on PaintBurst w/ parallax, 01 zones (paper), 02 studs (black), 03 posters, INFO trust bar, 04 connect footer
- eb0f5bb — Vercel Blob storage (gated on BLOB_READ_WRITE_TOKEN)
- 6616df0 — Vercel build fixes: force-dynamic storefront, lazy payload config, Turso-ready adapter

## Blocked (waiting on the user)
- Real production DB (Turso) + PAYLOAD_SECRET + BLOB_READ_WRITE_TOKEN in Vercel — needed later for live admin editing; user sets env vars themself (never paste tokens to Claude). Also ROTATE the demo fallback secret in src/payload.config.ts then.
- After that: seed prod DB (rerun scripts/ against prod DATABASE_URL) + media to Blob
- Real prices; real poster artworks; confirm footer contacts; hero reference video never arrived

## Conventions to follow (memories by name)
- [[ouch-brand-direction]] — modern Bangalore urban artisanal; NEVER bridal/traditional; when founder gives an image use the IMAGE ONLY, never restyle palette from it; founder's own photo is the hero
- [[ouch-env-quirks]] — payload CLI broken in this shell; npm scripts via tsx (node --env-file=.env --import tsx)
- FILE-DROP RULE: founder drops assets in media/ SUBFOLDERS (media/Ouch Skye/, media/Category images/, media/product images/) — ls them ALL directly, NO mtime filters, enough depth. Chat images never reach the filesystem.
- Push: git -c credential.helper= -c 'credential.helper=!/usr/local/bin/gh auth git-credential' push (gh authed as bconclub; keychain has wrong user)
- Voice-to-text user: "session" = section, "print page" ≈ front/product page. Under deadline: fix one section, verify, push, then next.
- Design language: band-black/band-paper sections, text-poster (Luckiest Guy) + text-marker (Permanent Marker), Space Grotesk body, Paint.tsx SVG kit (BrushStroke/PaintBurst/BrushMaskedPhoto…), chip-arrow
- Dev quirks: browser-pane screenshots can be stale when hidden (verify via computed styles); rm -rf .next/dev/cache/images after overwriting an image file

## Links
- Repo: https://github.com/bconclub/ouch
- Live: https://oouucchh.com (500 until env vars set)
- Local: http://localhost:3000 · Admin: http://localhost:3000/admin

## ▶️ Start here in the new thread
Site is LIVE and submitted at https://oouucchh.com (read-only demo). Next: real prices (all placeholders), posters section artworks, then the real Turso DB + env vars to enable live admin editing (and rotate the demo fallback secret).
