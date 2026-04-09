/**
 * Printify API Integration
 *
 * Docs: https://developers.printify.com/
 *
 * Required env vars:
 *   PRINTIFY_API_KEY — your personal access token
 *   PRINTIFY_SHOP_ID — your Printify shop ID
 *
 * TODO: After adding your API key, you can find your shop ID by visiting:
 *   GET https://api.printify.com/v1/shops.json   (Authorization: Bearer YOUR_KEY)
 *   Or check the URL when logged into your Printify dashboard.
 *
 * TODO: Printify products redirect to an external published storefront URL.
 *       Make sure your Printify shop is connected to a sales channel (e.g. your own site
 *       via their "API" channel) and that products are published. The externalUrl field
 *       will be null if a product is not published to a channel with a public URL.
 */

import type { UnifiedProduct } from './products'

const PRINTIFY_API_BASE = 'https://api.printify.com/v1'

// ─── Raw Printify types (simplified) ─────────────────────────────────────────

interface PrintifyVariant {
  id: number
  price: number // in pence/cents
  is_enabled: boolean
}

interface PrintifyImage {
  src: string
  is_default: boolean
}

interface PrintifyProductRaw {
  id: string
  title: string
  description: string
  tags: string[]
  options: Array<{ name: string; values: string[] }>
  variants: PrintifyVariant[]
  images: PrintifyImage[]
  is_locked: boolean
  external?: {
    id: string
    handle: string
  }
}

interface PrintifyProductsResponse {
  data: PrintifyProductRaw[]
  total: number
  current_page: number
  last_page: number
  per_page: number
}

// ─── Map tags → unified category ─────────────────────────────────────────────

function mapPrintifyCategory(tags: string[]): UnifiedProduct['category'] {
  const lower = tags.map((t) => t.toLowerCase())

  if (lower.some((t) => ['t-shirt', 'tee', 'hoodie', 'apparel', 'clothing'].includes(t))) {
    return 'apparel'
  }
  if (lower.some((t) => ['wall art', 'poster', 'print', 'canvas'].includes(t))) {
    return 'wall-art'
  }
  return 'apparel' // default for Printify (most are apparel)
}

// ─── Transform raw Printify product → UnifiedProduct ─────────────────────────

function transformPrintifyProduct(raw: PrintifyProductRaw): UnifiedProduct {
  const enabledVariants = raw.variants.filter((v) => v.is_enabled)
  const lowestPrice = enabledVariants.reduce(
    (min, v) => (v.price < min ? v.price : min),
    enabledVariants[0]?.price ?? 0
  )

  const defaultImage =
    raw.images.find((img) => img.is_default)?.src ?? raw.images[0]?.src ?? ''

  const slug = raw.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

  // External URL is set when the product is published to a sales channel
  // TODO: If you're using Printify's "External/API" channel, build your own product URL here
  const externalUrl = raw.external?.handle
    ? `https://loganfreeth.com/printify/${raw.external.handle}`
    : null

  return {
    id: `printify-${raw.id}`,
    slug: `printify-${slug}-${raw.id.slice(0, 6)}`,
    title: raw.title,
    description: raw.description,
    price: lowestPrice,
    currency: 'GBP', // TODO: Printify returns prices in store currency — confirm yours
    images: raw.images.map((img) => img.src),
    category: mapPrintifyCategory(raw.tags),
    source: 'printify',
    externalUrl,
  }
}

// ─── Public fetch function ────────────────────────────────────────────────────

export async function fetchPrintifyProducts(): Promise<UnifiedProduct[]> {
  const apiKey = process.env.PRINTIFY_API_KEY
  const shopId = process.env.PRINTIFY_SHOP_ID

  if (!apiKey || !shopId) {
    console.warn(
      '[Printify] PRINTIFY_API_KEY or PRINTIFY_SHOP_ID not set — skipping Printify products.'
    )
    return []
  }

  try {
    const url = `${PRINTIFY_API_BASE}/shops/${shopId}/products.json?limit=50`

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 300 },
    })

    if (!res.ok) {
      console.error(`[Printify] API error: ${res.status} ${res.statusText}`)
      return []
    }

    const data: PrintifyProductsResponse = await res.json()

    // TODO: Add pagination if you have more than 50 products
    return (data.data ?? []).map(transformPrintifyProduct)
  } catch (err) {
    console.error('[Printify] Failed to fetch products:', err)
    return []
  }
}
