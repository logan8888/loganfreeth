# loganfreeth.com — Shop

Gallery-style e-commerce site for wall art prints, apparel, and handmade CNC wood sculptures.  
Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Stripe.

---

## Tech stack

| Layer | Tool |
|-------|------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + inline styles |
| Fonts | Inter (body) · Cormorant Garamond (display) |
| Payments | Stripe Checkout |
| Print-on-demand | Gelato + Printify |
| Handmade products | `data/handmade-products.json` |

---

## Quick start

### 1. Install dependencies

```bash
cd loganfreeth-shop
npm install
```

### 2. Set up environment variables

```bash
cp .env.local.example .env.local
```

Then open `.env.local` and fill in your keys:

| Variable | Where to find it |
|----------|-----------------|
| `GELATO_API_KEY` | Gelato dashboard → Settings → API |
| `GELATO_STORE_ID` | Gelato dashboard store URL |
| `PRINTIFY_API_KEY` | printify.com/app/account/api-access |
| `PRINTIFY_SHOP_ID` | printify.com dashboard URL |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | dashboard.stripe.com/apikeys |
| `STRIPE_SECRET_KEY` | dashboard.stripe.com/apikeys |
| `NEXT_PUBLIC_SITE_URL` | Your live domain (e.g. `https://loganfreeth.com`) |

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## How products work

### Source 1 — Gelato (wall art prints)

- Products are fetched from the Gelato API at build time and cached for 5 minutes.
- Clicking a Gelato product redirects to Gelato's hosted checkout.
- Integration: `lib/gelato.ts`

**If no products appear:** check that `GELATO_API_KEY` and `GELATO_STORE_ID` are set, and that
your products are published in your Gelato store.

### Source 2 — Printify (apparel)

- Products are fetched from the Printify API at build time.
- Clicking a Printify product opens their checkout in a new tab.
- Integration: `lib/printify.ts`

**Finding your Shop ID:** once your `PRINTIFY_API_KEY` is set, call:
```
GET https://api.printify.com/v1/shops.json
Authorization: Bearer YOUR_KEY
```

### Source 3 — Handmade items

- Defined in `data/handmade-products.json` — edit this file to add/remove/update items.
- Checkout is handled locally via Stripe.
- Integration: `lib/products.ts` + `app/api/checkout/route.ts`

**Prices are stored in pence (GBP smallest unit).** So £185 = `18500`.

**To add a handmade product:**
```json
{
  "id": "hm-004",
  "slug": "my-new-piece",
  "title": "My New Piece",
  "description": "Description here.",
  "price": 15000,
  "currency": "GBP",
  "images": ["/images/my-piece.jpg"],
  "category": "sculpture",
  "stock": 1,
  "dimensions": "40cm × 30cm × 3cm",
  "material": "Solid Oak"
}
```

Categories: `wall-art` | `apparel` | `sculpture`

---

## Stripe setup

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Add your publishable and secret keys to `.env.local`
3. Test payments using Stripe's test card: `4242 4242 4242 4242`
4. Go live by switching to your live keys

**Stock management:** When a handmade item sells, decrement `stock` in
`data/handmade-products.json`. For automated stock updates, set up a Stripe webhook
pointing to a new route (e.g. `POST /api/webhook/stripe`).

---

## Folder structure

```
loganfreeth-shop/
├── app/
│   ├── layout.tsx           Root layout (Nav + Footer)
│   ├── page.tsx             Home page
│   ├── globals.css          Global styles
│   ├── shop/
│   │   └── page.tsx         Shop page (filterable by category)
│   ├── product/
│   │   └── [slug]/
│   │       └── page.tsx     Individual product page
│   ├── about/
│   │   └── page.tsx         About page
│   ├── contact/
│   │   └── page.tsx         Contact form
│   └── api/
│       └── checkout/
│           └── route.ts     Stripe checkout API route
├── components/
│   ├── Nav.tsx              Sticky navigation
│   ├── Footer.tsx           Footer
│   ├── ProductCard.tsx      Individual product card
│   └── ProductGrid.tsx      Responsive 3-column grid
├── lib/
│   ├── gelato.ts            Gelato API fetch + transform
│   ├── printify.ts          Printify API fetch + transform
│   └── products.ts          Unified product type + merge logic
├── data/
│   └── handmade-products.json   Your handmade inventory
├── public/                  Static assets (add your images here)
├── .env.local.example       Environment variable template
├── next.config.ts           Next.js config (image domains)
├── tailwind.config.ts       Tailwind config + design tokens
└── tsconfig.json
```

---

## Deploy

### Vercel (recommended)

```bash
npm install -g vercel
vercel
```

Add your environment variables in the Vercel dashboard under Project → Settings → Environment Variables.

### Netlify

```bash
npm run build
```

Set `output: 'export'` in `next.config.ts` if deploying as static (note: API routes won't work in static mode — use Netlify Functions instead).

---

## TODO checklist

- [ ] Add `GELATO_API_KEY` + `GELATO_STORE_ID` to `.env.local`
- [ ] Add `PRINTIFY_API_KEY` + `PRINTIFY_SHOP_ID` to `.env.local`
- [ ] Add Stripe keys to `.env.local`
- [ ] Replace placeholder images on Home and About pages with real photos
- [ ] Add your real products to `data/handmade-products.json`
- [ ] Wire up the Contact form (`app/contact/page.tsx`) to an email service
- [ ] Add `/order-confirmed` page for post-Stripe redirect
- [ ] Set up Stripe webhook for automated stock decrement
- [ ] Add images to `/public/images/` for handmade products
- [ ] Update `next.config.ts` image domains if Gelato uses a different CDN hostname
