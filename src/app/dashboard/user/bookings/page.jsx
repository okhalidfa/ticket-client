import { redirect } from 'next/navigation';
import { requireRole } from '@/lib/core/session';
import { getUserBookings } from '@/lib/api/bookings';
import { confirmPayment } from '@/lib/actions/bookings';
import BookingCard from '@/components/dashboard/BookingCard';
 
export default async function MyBookingsPage({ searchParams }) {
    const user = await requireRole('user');
    const params = await searchParams;

    if (params.bookingId && params.session_id) {
        await confirmPayment({
            bookingId: params.bookingId,
            transactionId: params.session_id
        });
        redirect('/dashboard/user/bookings');
    }

    const bookings = (await getUserBookings(user.email)) || [];

    return (
        <div>
            <h1 className="mb-6 text-2xl font-bold">My Booked Tickets</h1>
            {bookings.length === 0 ? (
                <p className="text-slate-500">You haven&apos;t booked any tickets yet.</p>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {bookings.map((booking) => (
                        <BookingCard key={booking._id} booking={booking} />
                    ))}
                </div>
            )}
        </div>
    );
}
