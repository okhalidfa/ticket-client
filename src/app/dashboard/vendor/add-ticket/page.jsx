import { requireRole } from '@/lib/core/session';
import AddTicketForm from './AddTicketForm';

export default async function AddTicketPage() {
    const user = await requireRole('vendor');

    return (
        <div>
            <h1 className="mb-6 text-2xl font-bold">Add Ticket</h1>
            <AddTicketForm user={user} />
        </div>
    );
}
