import { requireRole } from '@/lib/core/session';
import { getVendorBookings } from '@/lib/api/bookings';
import RequestedBookingsTable from '@/components/dashboard/RequestedBookingsTable';

export default async function VendorBookingsPage() {
    const user = await requireRole('vendor');
    const bookings = (await getVendorBookings(user.email)) || [];

    return (
        <div>
            <h1 className="mb-6 text-2xl font-bold">Requested Bookings</h1>
            <RequestedBookingsTable bookings={bookings} />
        </div>
    );
}
