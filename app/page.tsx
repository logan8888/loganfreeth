import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getAllProducts } from '@/lib/products'
import ProductGrid from '@/components/ProductGrid'

export const metadata: Metadata = {
  title: 'Logan Freeth — Wall Art, Prints & Sculpture',
}

export default async function HomePage() {
  const allProducts = await getAllProducts()
  const featured = allProducts.slice(0, 6)

  return (
    <>
      <style>{`
        .btn-primary {
          font-family: var(--font-inter), system-ui, sans-serif;
          font-size: 14px; font-weight: 600;
          background: #1C1C1A; color: #F9F7F4;
          padding: 14px 28px; border-radius: 7px;
          text-decoration: none; display: inline-block;
          transition: transform 0.18s cubic-bezier(0.34,1.56,0.64,1);
        }
        .btn-primary:hover { transform: translateY(-2px); }
        .btn-ghost {
          font-family: var(--font-inter), system-ui, sans-serif;
          font-size: 14px; font-weight: 500;
          background: transparent; color: #6E6B67;
          padding: 14px 28px; border-radius: 7px;
          text-decoration: none; display: inline-block;
          border: 1.5px solid #E5E0D9;
          transition: transform 0.18s cubic-bezier(0.34,1.56,0.64,1);
        }
        .btn-ghost:hover { transform: translateY(-2px); }
        .cat-link {
          font-family: var(--font-inter), system-ui, sans-serif;
          font-size: 12px; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: #6E6B67; text-decoration: none;
          padding: 18px 28px; border-right: 1px solid #E5E0D9;
          transition: color 0.15s ease, background 0.15s ease;
          display: inline-block;
        }
        .cat-link:hover { color: #1C1C1A; background: #EAE5DE; }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
          .hero-image { max-width: 320px; margin: 0 auto; width: 100%; }
        }
      `}</style>

      {/* ── Hero ── */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 28px 72px' }}>
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 440px', gap: '64px', alignItems: 'center' }}
          className="hero-grid"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <span
              className="fade-up"
              style={{
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: '11px', fontWeight: 600,
                letterSpacing: '0.13em', textTransform: 'uppercase',
                color: '#B8956A', display: 'inline-block',
              }}
            >
              Artist &amp; Maker — UK
            </span>

            <h1
              className="fade-up fade-up-d1"
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(42px, 5.5vw, 76px)',
                fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.04, color: '#1C1C1A',
              }}
            >
              Prints, apparel
              <br />&amp; handmade <span style={{ color: '#B8956A' }}>sculpture</span>
            </h1>

            <p
              className="fade-up fade-up-d2"
              style={{
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: '16px', lineHeight: 1.78, color: '#6E6B67', maxWidth: '480px',
              }}
            >
              Original work by Logan Freeth — wall art prints, graphic apparel,
              and precision-made CNC wood sculptures. All handpicked or handmade in the UK.
            </p>

            <div className="fade-up fade-up-d3" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/shop" className="btn-primary">Browse the shop</Link>
              <Link href="/about" className="btn-ghost">About Logan</Link>
            </div>
          </div>

          <div
            className="fade-up fade-up-d2 hero-image"
            style={{
              position: 'relative', aspectRatio: '3 / 4',
              borderRadius: '8px', overflow: 'hidden', background: '#F1EDE8',
            }}
          >
            <Image
              src="https://placehold.co/880x1160/E8E2D9/B8956A?text=Featured+Piece"
              alt="Featured artwork by Logan Freeth"
              fill priority style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* ── Category strip ── */}
      <section style={{ borderTop: '1px solid #E5E0D9', borderBottom: '1px solid #E5E0D9', background: '#F1EDE8', padding: '0 28px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex' }}>
          <Link href="/shop?category=wall-art" className="cat-link">Wall Art</Link>
          <Link href="/shop?category=apparel" className="cat-link">Apparel</Link>
          <Link href="/shop?category=sculpture" className="cat-link">Sculpture</Link>
        </div>
      </section>

      {/* ── Featured products ── */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '72px 28px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '44px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 700,
              letterSpacing: '-0.03em', color: '#1C1C1A',
            }}
          >
            Latest work
          </h2>
          <Link
            href="/shop"
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '13px', fontWeight: 500, color: '#B8956A', textDecoration: 'none',
            }}
          >
            View all →
          </Link>
        </div>

        <ProductGrid
          products={featured}
          emptyMessage="Products loading — add your API keys to .env.local to see products here."
        />
      </section>

      {/* ── About blurb ── */}
      <section style={{ background: '#F1EDE8', borderTop: '1px solid #E5E0D9', borderBottom: '1px solid #E5E0D9', padding: '72px 28px' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <span
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '11px', fontWeight: 600,
              letterSpacing: '0.13em', textTransform: 'uppercase', color: '#B8956A',
            }}
          >
            About the maker
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 700,
              letterSpacing: '-0.03em', lineHeight: 1.12, color: '#1C1C1A',
            }}
          >
            Art, design, and craft — a lifetime of making things
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '16px', lineHeight: 1.78, color: '#6E6B67',
            }}
          >
            Based in the UK, Logan Freeth has spent decades working across art,
            design engineering, motion graphics, 3D modelling, film, and CNC
            fabrication. The shop brings that range together — prints, apparel,
            and one-of-a-kind wood sculptures made on a CNC router.
          </p>
          <div>
            <Link
              href="/about"
              style={{
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: '14px', fontWeight: 600, color: '#1C1C1A',
                textDecoration: 'underline', textUnderlineOffset: '3px',
              }}
            >
              Read more
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
