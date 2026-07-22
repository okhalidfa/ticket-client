import HeroSlider from '@/components/home/HeroSlider';
import { PopularRoutes, WhyChooseUs } from '@/components/home/ExtraSections';
import TicketCard from '@/components/tickets/TicketCard';
import { getTickets } from '@/lib/api/tickets';

export default async function HomePage() {
    const advertised = (await getTickets('advertised=true&limit=6')) || [];
    const latest = (await getTickets('limit=8')) || [];

    return (
        <div>
            <HeroSlider />

            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <h2 className="mb-10 text-center text-3xl font-bold">Featured Tickets</h2>
                {advertised.length === 0 ? (
                    <p className="text-center text-slate-500 dark:text-slate-400">No advertised tickets yet.</p>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {advertised.map((ticket) => (
                            <TicketCard key={ticket._id} ticket={ticket} />
                        ))}
                    </div>
                )}
            </section>

            <PopularRoutes />

            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <h2 className="mb-10 text-center text-3xl font-bold">Latest Tickets</h2>
                {latest.length === 0 ? (
                    <p className="text-center text-slate-500 dark:text-slate-400">No tickets available yet.</p>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {latest.map((ticket) => (
                            <TicketCard key={ticket._id} ticket={ticket} />
                        ))}
                    </div>
                )}
            </section>

            <WhyChooseUs />
        </div>
    );
}
