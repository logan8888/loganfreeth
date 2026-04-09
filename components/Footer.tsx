import Link from 'next/link'

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid #E5E0D9',
        padding: '48px 28px',
        marginTop: '80px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '32px',
        }}
      >
        {/* Brand */}
        <div>
          <p
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: '20px',
              fontWeight: 700,
              color: '#1C1C1A',
              letterSpacing: '-0.025em',
              marginBottom: '6px',
            }}
          >
            Logan Freeth
          </p>
          <p
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '13px',
              color: '#9E9A95',
              lineHeight: 1.6,
            }}
          >
            Wall art, apparel &amp; handmade sculptures.<br />
            Made in the UK.
          </p>
        </div>

        {/* Links */}
        <nav
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
          aria-label="Footer navigation"
        >
          {[
            { href: '/shop', label: 'Shop' },
            { href: '/about', label: 'About' },
            { href: '/contact', label: 'Contact' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: '13px',
                color: '#6E6B67',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div
        style={{
          maxWidth: '1200px',
          margin: '32px auto 0',
          paddingTop: '24px',
          borderTop: '1px solid #F1EDE8',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '12px',
            color: '#9E9A95',
          }}
        >
          &copy; {new Date().getFullYear()} Logan Freeth. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
