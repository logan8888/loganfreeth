import type { Metadata } from 'next'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Logan Freeth.',
}

export default function ContactPage() {
  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', padding: '64px 28px 96px' }}>
      <div style={{ marginBottom: '48px' }}>
        <span
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.13em',
            textTransform: 'uppercase',
            color: '#B8956A',
            display: 'block',
            marginBottom: '16px',
          }}
        >
          Get in touch
        </span>
        <h1
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            lineHeight: 1.05,
            color: '#1C1C1A',
            marginBottom: '16px',
          }}
        >
          Contact
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '15px',
            lineHeight: 1.78,
            color: '#6E6B67',
          }}
        >
          Questions about an order, a commission, or just want to say hello? Use the form
          below or drop me an email directly.
        </p>
      </div>

      <ContactForm />
    </div>
  )
}
