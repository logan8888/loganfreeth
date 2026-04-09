import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound, redirect } from 'next/navigation'
import { getProductBySlug, getAllProducts, formatPrice } from '@/lib/products'
import Link from 'next/link'

interface ProductPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug)
  if (!product) return { title: 'Product not found' }

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      images: product.images[0] ? [{ url: product.images[0] }] : [],
    },
  }
}

export async function generateStaticParams() {
  // Only pre-render handmade product pages — Gelato/Printify redirect externally
  const allProducts = await getAllProducts()
  return allProducts
    .filter((p) => p.source === 'handmade')
    .map((p) => ({ slug: p.slug }))
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  // Gelato / Printify — redirect to external checkout
  if (product.source !== 'handmade') {
    if (product.externalUrl) {
      redirect(product.externalUrl)
    }
    // If no external URL configured yet, fall through to show the page anyway
  }

  const coverImage =
    product.images[0] ?? 'https://placehold.co/800x1060/E8E2D9/6E6B67?text=No+Image'

  const outOfStock = product.source === 'handmade' && product.stock === 0

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '56px 28px 80px' }}>
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        style={{
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
          fontSize: '13px',
          color: '#9E9A95',
          marginBottom: '40px',
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
        }}
      >
        <Link href="/" style={{ color: '#9E9A95', textDecoration: 'none' }}>
          Home
        </Link>
        <span>/</span>
        <Link href="/shop" style={{ color: '#9E9A95', textDecoration: 'none' }}>
          Shop
        </Link>
        <span>/</span>
        <span style={{ color: '#1C1C1A' }}>{product.title}</span>
      </nav>

      {/* Product layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '64px',
          alignItems: 'start',
        }}
        className="product-layout"
      >
        {/* Image gallery */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div
            style={{
              position: 'relative',
              aspectRatio: '3 / 4',
              borderRadius: '8px',
              overflow: 'hidden',
              background: '#F1EDE8',
            }}
          >
            <Image
              src={coverImage}
              alt={product.title}
              fill
              priority
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Thumbnail strip for multiple images */}
          {product.images.length > 1 && (
            <div style={{ display: 'flex', gap: '8px' }}>
              {product.images.slice(0, 5).map((src, i) => (
                <div
                  key={i}
                  style={{
                    position: 'relative',
                    width: '64px',
                    aspectRatio: '1/1',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    background: '#F1EDE8',
                    border: i === 0 ? '2px solid #1C1C1A' : '2px solid transparent',
                  }}
                >
                  <Image
                    src={src}
                    alt={`${product.title} view ${i + 1}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="64px"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Source badge */}
          <span
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#B8956A',
            }}
          >
            {product.source === 'handmade'
              ? 'Handmade in the UK'
              : product.source === 'gelato'
              ? 'Print on Demand — Gelato'
              : 'Print on Demand — Printify'}
          </span>

          <h1
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: '#1C1C1A',
            }}
          >
            {product.title}
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: '28px',
              fontWeight: 600,
              color: '#1C1C1A',
              letterSpacing: '-0.02em',
            }}
          >
            {formatPrice(product.price, product.currency)}
          </p>

          <p
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '15px',
              lineHeight: 1.78,
              color: '#6E6B67',
            }}
          >
            {product.description}
          </p>

          {/* Handmade metadata */}
          {product.source === 'handmade' && (product.dimensions || product.material) && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                padding: '20px',
                background: '#F1EDE8',
                borderRadius: '8px',
              }}
            >
              {product.dimensions && (
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-inter), system-ui, sans-serif',
                      fontSize: '12px',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: '#9E9A95',
                      minWidth: '90px',
                    }}
                  >
                    Size
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-inter), system-ui, sans-serif',
                      fontSize: '14px',
                      color: '#1C1C1A',
                    }}
                  >
                    {product.dimensions}
                  </span>
                </div>
              )}
              {product.material && (
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-inter), system-ui, sans-serif',
                      fontSize: '12px',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: '#9E9A95',
                      minWidth: '90px',
                    }}
                  >
                    Material
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-inter), system-ui, sans-serif',
                      fontSize: '14px',
                      color: '#1C1C1A',
                    }}
                  >
                    {product.material}
                  </span>
                </div>
              )}
              {product.stock !== undefined && (
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-inter), system-ui, sans-serif',
                      fontSize: '12px',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: '#9E9A95',
                      minWidth: '90px',
                    }}
                  >
                    Stock
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-inter), system-ui, sans-serif',
                      fontSize: '14px',
                      color: outOfStock ? '#B85050' : '#3A6A4A',
                      fontWeight: 500,
                    }}
                  >
                    {outOfStock ? 'Sold out' : `${product.stock} available`}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* CTA */}
          {product.source === 'handmade' ? (
            <form action="/api/checkout" method="POST">
              <input type="hidden" name="productId" value={product.id} />
              <button
                type="submit"
                disabled={outOfStock}
                style={{
                  width: '100%',
                  fontFamily: 'var(--font-inter), system-ui, sans-serif',
                  fontSize: '15px',
                  fontWeight: 600,
                  padding: '16px 28px',
                  borderRadius: '8px',
                  border: 'none',
                  background: outOfStock ? '#E5E0D9' : '#1C1C1A',
                  color: outOfStock ? '#9E9A95' : '#F9F7F4',
                  cursor: outOfStock ? 'not-allowed' : 'pointer',
                  transition:
                    'transform 0.18s cubic-bezier(0.34,1.56,0.64,1), opacity 0.15s ease',
                }}
              >
                {outOfStock ? 'Sold out' : 'Buy now — Secure checkout'}
              </button>
              <p
                style={{
                  fontFamily: 'var(--font-inter), system-ui, sans-serif',
                  fontSize: '12px',
                  color: '#9E9A95',
                  marginTop: '10px',
                  textAlign: 'center',
                }}
              >
                Processed securely by Stripe
              </p>
            </form>
          ) : (
            // External product — this page is usually only shown if externalUrl is missing
            <a
              href={product.externalUrl ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                width: '100%',
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: '15px',
                fontWeight: 600,
                padding: '16px 28px',
                borderRadius: '8px',
                background: '#1C1C1A',
                color: '#F9F7F4',
                textDecoration: 'none',
                textAlign: 'center',
                boxSizing: 'border-box',
              }}
            >
              Buy now ↗
            </a>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .product-layout {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </div>
  )
}
