import { requireRole } from '@/lib/core/session';
import { getAdminTickets } from '@/lib/api/tickets';
import ManageTicketsTable from '@/components/dashboard/ManageTicketsTable';
  
export default async function ManageTicketsPage() {
    await requireRole('admin');
    const tickets = (await getAdminTickets()) || [];

    return (
        <div>
            <h1 className="mb-6 text-2xl font-bold">Manage Tickets</h1>
            <ManageTicketsTable tickets={tickets} />
        </div>
    );
}
