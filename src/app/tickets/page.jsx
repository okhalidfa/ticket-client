import { Suspense } from 'react';
import TicketCard from '@/components/tickets/TicketCard';
import TicketFilters from '@/components/tickets/TicketFilters';
import Pagination from '@/components/tickets/Pagination';
import { getTickets } from '@/lib/api/tickets';

export default async function AllTicketsPage({ searchParams }) {
    const params = await searchParams;
    const page = parseInt(params.page) || 1;
    const perPage = 9;

    const query = new URLSearchParams({
        page: page.toString(),
        perPage: perPage.toString()
    });

    if (params.from) query.set('from', params.from);
    if (params.to) query.set('to', params.to);
    if (params.transportType) query.set('transportType', params.transportType);
    if (params.sort) query.set('sort', params.sort);

    const { total, tickets } = (await getTickets(query.toString())) || { total: 0, tickets: [] };
    const totalPages = Math.ceil(total / perPage);

    return (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <h1 className="mb-8 text-3xl font-bold">All Tickets</h1>
            <Suspense fallback={null}>
                <TicketFilters />
            </Suspense>

            {tickets.length === 0 ? (
                <p className="py-20 text-center text-slate-500">No tickets found for your search.</p>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {tickets.map((ticket) => (
                        <TicketCard key={ticket._id} ticket={ticket} showRoute />
                    ))}
                </div>
            )}

            <Suspense fallback={null}>
                <Pagination currentPage={page} totalPages={totalPages} />
            </Suspense>
        </div>
    );
}
