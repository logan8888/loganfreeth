import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Logan Freeth — artist, designer, and maker based in the UK. Wall art, sculpture, and apparel.',
}

export default function AboutPage() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 28px 96px' }}>
      {/* Hero row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 400px',
          gap: '72px',
          alignItems: 'start',
          marginBottom: '80px',
        }}
        className="about-grid"
      >
        {/* Copy */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <span
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.13em',
              textTransform: 'uppercase',
              color: '#B8956A',
            }}
          >
            About
          </span>

          <h1
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              color: '#1C1C1A',
            }}
          >
            A lifetime of making things
          </h1>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '16px',
              lineHeight: 1.78,
              color: '#6E6B67',
            }}
          >
            <p>
              I&apos;m Logan Freeth — based in the UK and working across a range of creative
              disciplines that spans the best part of three decades. I&apos;ve been an artist,
              design engineer, CAD designer, motion graphics artist, 3D modeller, film editor,
              and CNC fabricator. The through line is always the same: making things that didn&apos;t
              exist before.
            </p>
            <p>
              This shop brings together work from three channels. Printed wall art and apparel
              produced on demand through Gelato and Printify, and handmade sculptures that I cut
              and finish myself on a CNC router — usually from solid oak, walnut, or birch
              plywood.
            </p>
            <p>
              The handmade pieces are limited. When a piece sells out, it&apos;s gone — I don&apos;t do
              reprints of the wood work. Each one is slightly different because the material is.
            </p>
          </div>

          <div style={{ paddingTop: '8px' }}>
            <Link
              href="/shop"
              style={{
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: '14px',
                fontWeight: 600,
                background: '#1C1C1A',
                color: '#F9F7F4',
                padding: '14px 28px',
                borderRadius: '7px',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              Browse the shop
            </Link>
          </div>
        </div>

        {/* Portrait — replace with your own photo */}
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
            src="https://placehold.co/800x1060/E8E2D9/B8956A?text=Logan+Freeth"
            alt="Logan Freeth"
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>
      </div>

      {/* Skills strip */}
      <div
        style={{
          borderTop: '1px solid #E5E0D9',
          paddingTop: '56px',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: 'clamp(22px, 2.5vw, 32px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: '#1C1C1A',
            marginBottom: '36px',
          }}
        >
          Skills &amp; disciplines
        </h2>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          {[
            'Fine Art',
            'Design Engineering',
            'CAD / SolidWorks',
            'Sheet Metal',
            'Motion Graphics',
            '3D Modelling',
            'CNC Router',
            'Film Editing',
            'Interactive Media',
            'HTML / CSS',
            'Factory Layout',
          ].map((skill) => (
            <span
              key={skill}
              style={{
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: '13px',
                fontWeight: 500,
                color: '#6E6B67',
                padding: '8px 16px',
                borderRadius: '6px',
                border: '1.5px solid #E5E0D9',
                background: '#F1EDE8',
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </div>
  )
}
