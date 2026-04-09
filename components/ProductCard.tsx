import Image from 'next/image'
import Link from 'next/link'
import type { UnifiedProduct } from '@/lib/products'
import { formatPrice } from '@/lib/products'

const SOURCE_LABELS: Record<string, string> = {
  gelato: 'Gelato',
  printify: 'Printify',
  handmade: 'Handmade',
}

const SOURCE_COLOURS: Record<string, { bg: string; text: string }> = {
  gelato: { bg: '#F0E8DC', text: '#8A6A3A' },
  printify: { bg: '#E8EDF5', text: '#3A5A8A' },
  handmade: { bg: '#E8F0EC', text: '#3A6A4A' },
}

interface ProductCardProps {
  product: UnifiedProduct
}

export default function ProductCard({ product }: ProductCardProps) {
  const isExternal = product.source !== 'handmade'
  const href = isExternal
    ? (product.externalUrl ?? '#')
    : `/product/${product.slug}`

  const sourceColour = SOURCE_COLOURS[product.source]
  const coverImage = product.images[0] ?? 'https://placehold.co/600x800/E8E2D9/6E6B67?text=No+Image'

  return (
    <article
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
      }}
    >
      {/* Image */}
      <Link
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        style={{ display: 'block', textDecoration: 'none', overflow: 'hidden', borderRadius: '6px' }}
        aria-label={product.title}
        className="card-image-link"
      >
        <div
          style={{
            position: 'relative',
            aspectRatio: '3 / 4',
            background: '#F1EDE8',
            overflow: 'hidden',
            borderRadius: '6px',
          }}
        >
          <Image
            src={coverImage}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{
              objectFit: 'cover',
              transition: 'transform 0.45s cubic-bezier(0.22,1,0.36,1)',
            }}
            className="card-img"
          />
          {/* Source badge */}
          <span
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              background: sourceColour.bg,
              color: sourceColour.text,
              padding: '3px 8px',
              borderRadius: '4px',
              backdropFilter: 'blur(8px)',
            }}
          >
            {SOURCE_LABELS[product.source]}
          </span>
          {/* Out of stock overlay */}
          {product.source === 'handmade' && product.stock === 0 && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(249,247,244,0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-inter), system-ui, sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#6E6B67',
                }}
              >
                Sold Out
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Meta */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <Link
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          style={{ textDecoration: 'none' }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: '18px',
              fontWeight: 600,
              letterSpacing: '-0.015em',
              color: '#1C1C1A',
              lineHeight: 1.3,
              margin: 0,
            }}
          >
            {product.title}
          </h3>
        </Link>
        <p
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            color: '#6E6B67',
            margin: 0,
          }}
        >
          {formatPrice(product.price, product.currency)}
        </p>
      </div>

      <style>{`
        .card-image-link:hover .card-img {
          transform: scale(1.05);
        }
      `}</style>
    </article>
  )
}
