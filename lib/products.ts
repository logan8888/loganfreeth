/**
 * Unified product layer
 *
 * Merges products from Gelato, Printify, and the local handmade JSON into
 * a single consistent shape used throughout the app.
 */

import { fetchGelatoProducts } from './gelato'
import { fetchPrintifyProducts } from './printify'
import handmadeData from '@/data/handmade-products.json'

// ─── Unified product type ─────────────────────────────────────────────────────

export type ProductSource = 'gelato' | 'printify' | 'handmade'
export type ProductCategory = 'wall-art' | 'apparel' | 'sculpture'

export interface UnifiedProduct {
  id: string
  slug: string
  title: string
  description: string
  /** Price in smallest currency unit (pence for GBP) */
  price: number
  currency: string
  images: string[]
  category: ProductCategory
  source: ProductSource
  /** For Gelato/Printify: the external checkout URL. For handmade: null (uses Stripe). */
  externalUrl: string | null
  /** Only present for handmade products */
  stock?: number
  dimensions?: string
  material?: string
}

// ─── Handmade product JSON shape ──────────────────────────────────────────────

interface HandmadeProductJson {
  id: string
  slug: string
  title: string
  description: string
  price: number
  currency: string
  images: string[]
  category: string
  stock: number
  dimensions?: string
  material?: string
}

// ─── Transform handmade JSON → UnifiedProduct ────────────────────────────────

function transformHandmadeProduct(raw: HandmadeProductJson): UnifiedProduct {
  return {
    id: raw.id,
    slug: raw.slug,
    title: raw.title,
    description: raw.description,
    price: raw.price,
    currency: raw.currency,
    images: raw.images,
    category: raw.category as ProductCategory,
    source: 'handmade',
    externalUrl: null,
    stock: raw.stock,
    dimensions: raw.dimensions,
    material: raw.material,
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

/** Fetch all products from all sources, merged into a single array. */
export async function getAllProducts(): Promise<UnifiedProduct[]> {
  const [gelatoProducts, printifyProducts] = await Promise.all([
    fetchGelatoProducts(),
    fetchPrintifyProducts(),
  ])

  const handmadeProducts = (handmadeData as HandmadeProductJson[]).map(
    transformHandmadeProduct
  )

  return [...gelatoProducts, ...printifyProducts, ...handmadeProducts]
}

/** Get products filtered by category. */
export async function getProductsByCategory(
  category: ProductCategory
): Promise<UnifiedProduct[]> {
  const all = await getAllProducts()
  return all.filter((p) => p.category === category)
}

/** Find a single product by slug. Returns null if not found. */
export async function getProductBySlug(slug: string): Promise<UnifiedProduct | null> {
  const all = await getAllProducts()
  return all.find((p) => p.slug === slug) ?? null
}

/** Format a price (in pence) to a human-readable string e.g. "£185.00" */
export function formatPrice(pence: number, currency = 'GBP'): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(pence / 100)
}
