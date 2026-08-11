# Managing the Ouch shop

Everything below happens in the admin panel — no code, no developer needed.

## Getting in

1. Start the site (once per session, in Terminal, from the project folder):

```bash
npm run dev
```

2. Open the admin: **http://localhost:3000/admin**
3. Log in: `admin@ouch.store` / `OuchAdmin@123`

**Change that password now:** click your email (bottom-left) → *Account* → set a new password.
To add a teammate: **Settings → Users → Create New**.

The shop itself is at **http://localhost:3000**.

---

## Adding a product

**Catalogue → Products → Create New**

| Field | What to put |
| --- | --- |
| Title | The product name, e.g. "Titanium Segment Ring" |
| Photos | Drag in one or more images. The first is the main photo. |
| Description | What it is, material, why it's good |
| Category | Which shop section it belongs to |
| Material / Gauge / Size | e.g. Titanium · 16g (1.2mm) · 8mm |
| Price | Just the number, e.g. `799` (₹ is added for you) |
| Compare-at price | Only if it's on sale — shows struck-through |
| Options | Sizes/colours, e.g. 6mm / 8mm / 10mm. Leave empty if there's only one version. |

Then hit **Publish** (top right).

> **Important:** a product saved as **Draft** does not appear on the site. If you can't find something in the shop, open it and check it says *Published*.

**Photos:** you can drag several images in at once. A description is filled in automatically from the file name, so you never get blocked — edit it if you want.

## Editing or hiding a product

- **Edit:** Products → click the row → change → **Save**.
- **Temporarily out of stock:** untick **In stock** (right sidebar). It stays visible but shows "Sold out" and can't be ordered.
- **Hide completely:** open the product → **Unpublish**.
- **Show on the home page:** tick **Featured** (right sidebar).
- **Preview before publishing:** the **Preview** button opens the real product page.

## Shop sections (categories)

**Catalogue → Categories.** Each has a name, a cover photo, and a display order (lower numbers appear first). To add a section, create it here, then pick it on your products.

## Orders

**Shop → Orders.** Every checkout lands here with the customer's name, phone, address and items.

The flow: customer places an order → it's saved here as **New** → they're sent to WhatsApp to confirm with you → you arrange payment in chat → update the status here as it progresses (Confirmed → Shipped → Delivered).

## Shop settings

**Globals → Site Settings:** store name, tagline, the **WhatsApp number orders go to**, the announcement bar text at the top of the site, contact email and Instagram. Changes go live immediately.

---

## Starting fresh

The shop currently holds 17 sample products. When your real stock is ready, clear them in one go:

```bash
npm run clear-demo
```

That first shows what would be deleted without touching anything. To actually delete:

```bash
npm run clear-demo -- --yes
```

Categories, brand images, orders and settings are left alone.

## Re-applying the brand category covers

```bash
npm run covers
```

## A note on going live

Right now everything runs on this Mac — the site and admin are only reachable here, and uploaded photos live in this folder. To make it public (and let you manage it from your phone), it needs hosting. Ask your developer to set that up; the code is ready and pushed to GitHub.
