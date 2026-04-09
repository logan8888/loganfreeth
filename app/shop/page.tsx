import type { Metadata } from 'next'
import { getAllProducts } from '@/lib/products'
import type { ProductCategory } from '@/lib/products'
import ProductGrid from '@/components/ProductGrid'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Browse all wall art prints, apparel, and handmade CNC wood sculptures.',
}

// Allow category filter via query param ?category=wall-art|apparel|sculpture
interface ShopPageProps {
  searchParams: { category?: string }
}

const CATEGORIES: { key: ProductCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'wall-art', label: 'Wall Art' },
  { key: 'apparel', label: 'Apparel' },
  { key: 'sculpture', label: 'Sculpture' },
]

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const allProducts = await getAllProducts()

  const activeCategory = searchParams.category as ProductCategory | undefined
  const filtered =
    activeCategory && activeCategory !== 'all'
      ? allProducts.filter((p) => p.category === activeCategory)
      : allProducts

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '56px 28px 80px' }}>
      {/* Header */}
      <div style={{ marginBottom: '44px' }}>
        <h1
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            lineHeight: 1.05,
            color: '#1C1C1A',
            marginBottom: '8px',
          }}
        >
          Shop
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '15px',
            color: '#6E6B67',
            lineHeight: 1.7,
          }}
        >
          {allProducts.length} products — wall art, apparel &amp; handmade sculpture.
        </p>
      </div>

      {/* Category filter */}
      <nav
        aria-label="Filter by category"
        style={{ display: 'flex', gap: '8px', marginBottom: '44px', flexWrap: 'wrap' }}
      >
        {CATEGORIES.map((cat) => {
          const isActive =
            cat.key === 'all'
              ? !activeCategory || activeCategory === 'all'
              : activeCategory === cat.key

          return (
            <Link
              key={cat.key}
              href={cat.key === 'all' ? '/shop' : `/shop?category=${cat.key}`}
              style={{
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: '13px',
                fontWeight: isActive ? 600 : 500,
                padding: '8px 18px',
                borderRadius: '6px',
                border: isActive ? '1.5px solid #1C1C1A' : '1.5px solid #E5E0D9',
                background: isActive ? '#1C1C1A' : 'transparent',
                color: isActive ? '#F9F7F4' : '#6E6B67',
                textDecoration: 'none',
                transition: 'all 0.15s ease',
              }}
            >
              {cat.label}
            </Link>
          )
        })}
      </nav>

      {/* Grid */}
      <ProductGrid
        products={filtered}
        emptyMessage={
          activeCategory
            ? `No ${activeCategory} products yet — check back soon.`
            : 'No products yet. Add your API keys to .env.local to load products.'
        }
      />
    </div>
  )
}
