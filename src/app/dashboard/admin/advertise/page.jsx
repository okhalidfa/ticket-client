import { requireRole } from '@/lib/core/session';
import { getAdminTickets } from '@/lib/api/tickets';
import AdvertiseTable from '@/components/dashboard/AdvertiseTable';

export default async function AdvertiseTicketsPage() {
    await requireRole('admin');
    const tickets = (await getAdminTickets()) || [];
    const approvedTickets = tickets.filter((ticket) => ticket.verificationStatus === 'approved');

    return (
        <div>
            <h1 className="mb-6 text-2xl font-bold">Advertise Tickets</h1>
            <AdvertiseTable tickets={approvedTickets} />
        </div>
    );
}
