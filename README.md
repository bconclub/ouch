# Ouch — Piercing E-commerce Platform

E-commerce storefront + admin panel for piercings and piercing supplies.

**Stack:** Next.js 16 (App Router) · Payload CMS 3 · SQLite · Tailwind CSS 4 · TypeScript

## How it works

- **Storefront** — dark-themed catalogue at `/`: shop with category/material filters, search and sorting, product pages with variants, cart, and checkout.
- **Checkout → WhatsApp** — placing an order saves it in the database and takes the customer to WhatsApp with a pre-filled order message sent to the store's number. Payment is arranged in chat. (A payment gateway can slot in later — orders already carry `paymentMethod` / `paymentStatus` fields.)
- **Admin panel** — `/admin` (Payload CMS): manage products, categories, orders, media, and site settings (store name, WhatsApp number, announcement bar) without touching code.

## Getting started

```bash
npm install
cp .env.example .env   # then set a strong PAYLOAD_SECRET
npm run seed           # first admin user + sample catalogue
npm run dev
```

- Storefront: http://localhost:3000
- Admin: http://localhost:3000/admin

Default admin (created by seed): `admin@ouch.store` / `OuchAdmin@123` — **change this password after first login.**

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run seed` | Seed admin user, categories, sample products, settings (skips existing data) |
| `npm run generate:types` | Regenerate `src/payload-types.ts` after changing collections |
| `npm run generate:importmap` | Regenerate the admin import map after adding admin UI components |

## Project layout

```
src/
├── payload.config.ts        # Payload config: collections, SQLite adapter
├── collections/             # Products, Categories, Orders, Media, Users
├── globals/SiteSettings.ts  # WhatsApp number, branding, announcement bar
├── app/
│   ├── (payload)/           # /admin + Payload REST/GraphQL API (generated)
│   └── (frontend)/          # storefront pages (home, shop, product, cart, checkout, order)
├── components/              # storefront UI
├── lib/                     # cart context, queries, WhatsApp message builder
└── seed.ts                  # sample data seed
```

## Notes

- Database is a local SQLite file (`ouch.db`, gitignored). For production, swap `@payloadcms/db-sqlite` for Postgres (`@payloadcms/db-postgres`) or point the SQLite adapter at Turso — one adapter change in `payload.config.ts`.
- Uploaded images live in `/media` (gitignored).
- The WhatsApp order number lives in **Admin → Site Settings**, editable without redeploying.
