'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const links = [
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(249,247,244,0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid #E5E0D9',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '60px',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: '22px',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            color: '#1C1C1A',
            textDecoration: 'none',
          }}
        >
          Logan Freeth
        </Link>

        {/* Desktop nav */}
        <nav
          style={{ display: 'flex', gap: '4px', alignItems: 'center' }}
          aria-label="Main navigation"
        >
          {links.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: 'var(--font-inter), system-ui, sans-serif',
                  fontSize: '13px',
                  fontWeight: active ? 600 : 500,
                  color: active ? '#1C1C1A' : '#6E6B67',
                  textDecoration: 'none',
                  padding: '6px 14px',
                  borderRadius: '6px',
                  background: active ? '#F1EDE8' : 'transparent',
                  transition: 'background 0.15s ease, color 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.background = '#F1EDE8'
                    e.currentTarget.style.color = '#1C1C1A'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = '#6E6B67'
                  }
                }}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            color: '#1C1C1A',
          }}
          className="mobile-menu-btn"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {menuOpen ? (
              <>
                <line x1="4" y1="4" x2="18" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="18" y1="4" x2="4" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </>
            ) : (
              <>
                <line x1="3" y1="7" x2="19" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="3" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="3" y1="17" x2="19" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <nav
          style={{
            borderTop: '1px solid #E5E0D9',
            padding: '12px 28px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
          aria-label="Mobile navigation"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: '15px',
                fontWeight: 500,
                color: pathname === link.href ? '#1C1C1A' : '#6E6B67',
                textDecoration: 'none',
                padding: '10px 0',
                borderBottom: '1px solid #F1EDE8',
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}

      <style>{`
        @media (max-width: 640px) {
          .mobile-menu-btn { display: block !important; }
          nav[aria-label="Main navigation"] { display: none !important; }
        }
      `}</style>
    </header>
  )
}
