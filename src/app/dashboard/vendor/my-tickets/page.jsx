import { requireRole } from '@/lib/core/session';
import { getVendorTickets } from '@/lib/api/tickets';
import VendorTicketCard from '@/components/dashboard/VendorTicketCard';

export default async function MyAddedTicketsPage() {
    const user = await requireRole('vendor');
    const tickets = (await getVendorTickets(user.email)) || [];

    return (
        <div>
            <h1 className="mb-6 text-2xl font-bold">My Added Tickets</h1>
            {tickets.length === 0 ? (
                <p className="text-slate-500">You haven&apos;t added any tickets yet.</p>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {tickets.map((ticket) => (
                        <VendorTicketCard key={ticket._id} ticket={ticket} />
                    ))}
                </div>
            )}
        </div>
    );
}
