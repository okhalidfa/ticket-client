import Link from 'next/link';
import { MapPin, Ticket, Bus } from 'lucide-react';

export default function TicketCard({ ticket, showRoute = false }) {
    return (
        <div className="card flex flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-lg">
            <img src={ticket.image} alt={ticket.title} className="h-48 w-full object-cover" />
            <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex items-center justify-between">
                    <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                        {ticket.transportType}
                    </span>
                    <span className="text-lg font-bold text-brand-600">${ticket.price}</span>
                </div>

                <h3 className="line-clamp-1 text-lg font-semibold">{ticket.title}</h3>

                {showRoute && (
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <MapPin size={14} />
                        {ticket.fromLocation} → {ticket.toLocation}
                    </div>
                )}

                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <Ticket size={14} />
                    {ticket.quantity} tickets left
                </div>

                {ticket.departureAt && (
                    <p className="text-xs text-slate-400">
                        Departs {new Date(ticket.departureAt).toLocaleString()}
                    </p>
                )}

                {ticket.perks?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {ticket.perks.slice(0, 3).map((perk) => (
                            <span key={perk} className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                                {perk}
                            </span>
                        ))}
                    </div>
                )}

                <Link href={`/tickets/${ticket._id}`} className="btn-primary mt-auto w-full">
                    See Details
                </Link>
            </div>
        </div>
    );
}
