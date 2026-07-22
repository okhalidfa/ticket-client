import { stripe } from '@/lib/stripe';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export async function POST(request) {
    const booking = await request.json();

    const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: { name: booking.ticketTitle },
                    unit_amount: Math.round(booking.totalPrice * 100)
                },
                quantity: 1
            }
        ],
        success_url: `${siteUrl}/dashboard/user/bookings?bookingId=${booking.bookingId}&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${siteUrl}/dashboard/user/bookings`
    });

    return Response.json({ url: session.url });
}
