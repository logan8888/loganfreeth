/**
 * Gelato API Integration
 *
 * Docs: https://dashboard.gelato.com/docs/ecommerce/
 *
 * Required env vars:
 *   GELATO_API_KEY  — your Gelato API key
 *   GELATO_STORE_ID — your Gelato store ID
 *
 * TODO: Once you have your API key, copy .env.local.example → .env.local and fill in the values.
 * TODO: Verify the exact product list endpoint for your Gelato plan — some plans use
 *       /v1/stores/{storeId}/products, others use /v1/products. Adjust GELATO_PRODUCTS_URL below.
 */

import type { UnifiedProduct } from './products'

const GELATO_API_BASE = 'https://ecommerce.gelatoapis.com/v1'

// ─── Raw Gelato types (simplified — extend as needed) ─────────────────────────

interface GelatoProductVariant {
  id: string
  title: string
  price: number // in smallest currency unit (pence/cents)
  currency: string
  imageSrc?: string
  available: boolean
}

interface GelatoProductRaw {
  id: string
  title: string
  description: string
  variants: GelatoProductVariant[]
  images: Array<{ src: string }>
  productType?: string
  tags?: string[]
  onlineStoreUrl?: string
}

interface GelatoProductsResponse {
  products: GelatoProductRaw[]
  pageSize?: number
  page?: number
}

// ─── Map Gelato category tags to our unified categories ──────────────────────

function mapGelatoCategory(product: GelatoProductRaw): UnifiedProduct['category'] {
  const tags = (product.tags ?? []).map((t) => t.toLowerCase())
  const type = (product.productType ?? '').toLowerCase()

  if (tags.includes('wall-art') || tags.includes('print') || type.includes('print')) {
    return 'wall-art'
  }
  if (tags.includes('apparel') || tags.includes('t-shirt') || type.includes('apparel')) {
    return 'apparel'
  }
  return 'wall-art' // default for Gelato (most products are prints)
}

// ─── Transform a raw Gelato product → UnifiedProduct ─────────────────────────

function transformGelatoProduct(raw: GelatoProductRaw): UnifiedProduct {
  const firstVariant = raw.variants[0]
  const slug = raw.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

  return {
    id: `gelato-${raw.id}`,
    slug: `gelato-${slug}-${raw.id.slice(0, 6)}`,
    title: raw.title,
    description: raw.description ?? '',
    price: firstVariant?.price ?? 0,
    currency: firstVariant?.currency ?? 'GBP',
    images: raw.images.map((img) => img.src),
    category: mapGelatoCategory(raw),
    source: 'gelato',
    // Gelato products check out on their hosted storefront
    externalUrl: raw.onlineStoreUrl ?? null,
  }
}

// ─── Public fetch function ────────────────────────────────────────────────────

export async function fetchGelatoProducts(): Promise<UnifiedProduct[]> {
  const apiKey = process.env.GELATO_API_KEY
  const storeId = process.env.GELATO_STORE_ID

  // Return empty array gracefully when keys are not configured yet
  if (!apiKey || !storeId) {
    console.warn(
      '[Gelato] GELATO_API_KEY or GELATO_STORE_ID not set — skipping Gelato products.'
    )
    return []
  }

  try {
    // TODO: Confirm this endpoint matches your Gelato plan.
    //       Some accounts use /v1/products (no store prefix). Check your Gelato docs.
    const url = `${GELATO_API_BASE}/stores/${storeId}/products`

    const res = await fetch(url, {
      headers: {
        'X-AUTH-TOKEN': apiKey,
        'Content-Type': 'application/json',
      },
      // Revalidate every 5 minutes in production
      next: { revalidate: 300 },
    })

    if (!res.ok) {
      console.error(`[Gelato] API error: ${res.status} ${res.statusText}`)
      return []
    }

    const data: GelatoProductsResponse = await res.json()
    return (data.products ?? []).map(transformGelatoProduct)
  } catch (err) {
    console.error('[Gelato] Failed to fetch products:', err)
    return []
  }
}
