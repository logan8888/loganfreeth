/**
 * POST /api/checkout
 *
 * Creates a Stripe Checkout Session for a handmade product and redirects
 * the customer to the Stripe-hosted payment page.
 *
 * TODO: Add your Stripe keys to .env.local before using this.
 * TODO: After payment, update stock in your JSON or CMS (Stripe webhook recommended).
 */

import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getProductBySlug, getAllProducts } from '@/lib/products'

// Initialise Stripe — will throw clearly if the key is missing
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2024-06-20',
})

export async function POST(req: NextRequest) {
  // Guard: key not configured
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: 'Stripe is not configured. Add STRIPE_SECRET_KEY to .env.local.' },
      { status: 503 }
    )
  }

  let productId: string | null = null

  // Support both JSON body and form-encoded body
  const contentType = req.headers.get('content-type') ?? ''
  if (contentType.includes('application/json')) {
    const body = await req.json()
    productId = body.productId ?? null
  } else {
    const formData = await req.formData()
    productId = formData.get('productId') as string | null
  }

  if (!productId) {
    return NextResponse.json({ error: 'Missing productId' }, { status: 400 })
  }

  // Find product — search by id (not slug) since we store id in the form
  const allProducts = await getAllProducts()
  const product = allProducts.find((p) => p.id === productId)

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 })
  }

  if (product.source !== 'handmade') {
    return NextResponse.json(
      { error: 'Only handmade products use Stripe checkout' },
      { status: 400 }
    )
  }

  if (product.stock === 0) {
    return NextResponse.json({ error: 'This product is sold out' }, { status: 400 })
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: product.currency.toLowerCase(),
            unit_amount: product.price, // already in pence
            product_data: {
              name: product.title,
              description: product.description,
              images: product.images.slice(0, 1), // Stripe accepts up to 8 but 1 is fine
              metadata: {
                product_id: product.id,
                source: 'handmade',
              },
            },
          },
        },
      ],
      // TODO: Create a /order-confirmed page to show a success message
      success_url: `${siteUrl}/product/${product.slug}?checkout=success`,
      cancel_url: `${siteUrl}/product/${product.slug}?checkout=cancelled`,
      // TODO: Enable shipping address collection if you need to ship
      // shipping_address_collection: { allowed_countries: ['GB'] },
      metadata: {
        product_id: product.id,
        product_slug: product.slug,
      },
    })

    if (!session.url) {
      return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
    }

    // Redirect to Stripe
    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    console.error('[Stripe] Checkout error:', err)
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
