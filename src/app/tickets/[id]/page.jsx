import { MapPin, Clock } from 'lucide-react';
import { getTicketById } from '@/lib/api/tickets';
import { requireLogin } from '@/lib/core/session';
import CountdownTimer from '@/components/tickets/CountdownTimer';
import BookNowModal from '@/components/tickets/BookNowModal';

export default async function TicketDetailsPage({ params }) {
    const { id } = await params;
    const user = await requireLogin();
    const ticket = await getTicketById(id);

    if (!ticket) {
        return <p className="py-24 text-center text-slate-500">Ticket not found.</p>;
    }

    return (
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2">
                <img src={ticket.image} alt={ticket.title} className="h-80 w-full rounded-2xl object-cover" />

                <div>
                    <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                        {ticket.transportType}
                    </span>
                    <h1 className="mt-4 text-3xl font-bold">{ticket.title}</h1>

                    <div className="mt-4 flex items-center gap-2 text-slate-500 dark:text-slate-400">
                        <MapPin size={18} />
                        {ticket.fromLocation} → {ticket.toLocation}
                    </div>

                    <div className="mt-2 flex items-center gap-2 text-slate-500 dark:text-slate-400">
                        <Clock size={18} />
                        {new Date(ticket.departureAt).toLocaleString()}
                    </div>

                    <p className="mt-6 text-3xl font-bold text-brand-600">${ticket.price} <span className="text-base font-normal text-slate-400">/ unit</span></p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{ticket.quantity} tickets remaining</p>

                    {ticket.perks?.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {ticket.perks.map((perk) => (
                                <span key={perk} className="rounded-full bg-slate-100 px-3 py-1 text-xs dark:bg-slate-800">
                                    {perk}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="mt-6">
                        <p className="mb-2 text-sm font-semibold">Departure Countdown</p>
                        <CountdownTimer departureAt={ticket.departureAt} />
                    </div>

                    <div className="mt-8">
                        <BookNowModal ticket={ticket} user={user} />
                    </div>
                </div>
            </div>
        </div>
    );
}
