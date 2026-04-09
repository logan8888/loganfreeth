import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Logan Freeth — Wall Art, Prints & Sculpture',
    template: '%s | Logan Freeth',
  },
  description:
    'Original wall art prints, apparel, and handmade CNC wood sculptures by Logan Freeth. Ships from the UK.',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://loganfreeth.com',
    siteName: 'Logan Freeth',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
