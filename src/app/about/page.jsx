import { Bus, ShieldCheck, Clock, Users } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white">
                    <Bus size={30} />
                </div>
                <h1 className="mt-6 text-4xl font-bold">About TicketBari</h1>
                <p className="mx-auto mt-4 max-w-2xl text-slate-500 dark:text-slate-400">
                    TicketBari connects travelers with trusted bus, train, launch and flight operators across the
                    country, making it simple to search, compare and book tickets in a few clicks.
                </p>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-3">
                <div className="card p-6 text-center">
                    <ShieldCheck className="mx-auto mb-4 text-brand-500" size={32} />
                    <h3 className="mb-2 font-semibold">Verified Vendors</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Every ticket goes through admin approval before it reaches you.
                    </p>
                </div>
                <div className="card p-6 text-center">
                    <Clock className="mx-auto mb-4 text-brand-500" size={32} />
                    <h3 className="mb-2 font-semibold">Real-Time Booking</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Live countdowns and instant status updates on every booking.
                    </p>
                </div>
                <div className="card p-6 text-center">
                    <Users className="mx-auto mb-4 text-brand-500" size={32} />
                    <h3 className="mb-2 font-semibold">Built For Everyone</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Separate dashboards for travelers, vendors and admins.
                    </p>
                </div>
            </div>
        </div>
    );
}
