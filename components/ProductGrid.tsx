import ProductCard from './ProductCard'
import type { UnifiedProduct } from '@/lib/products'

interface ProductGridProps {
  products: UnifiedProduct[]
  emptyMessage?: string
}

export default function ProductGrid({
  products,
  emptyMessage = 'No products found.',
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '80px 0',
          color: '#9E9A95',
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
          fontSize: '15px',
        }}
      >
        {emptyMessage}
      </div>
    )
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '40px 28px',
      }}
      className="product-grid"
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}

      <style>{`
        @media (max-width: 1024px) {
          .product-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 580px) {
          .product-grid {
            grid-template-columns: 1fr !important;
            gap: 32px 0 !important;
          }
        }
      `}</style>
    </div>
  )
}
