'use client';

import Swal from 'sweetalert2';
import { toggleAdvertise } from '@/lib/actions/tickets';

export default function AdvertiseTable({ tickets }) {
    const advertisedCount = tickets.filter((ticket) => ticket.isAdvertised).length;

    const handleToggle = async (ticket) => {
        const result = await toggleAdvertise(ticket._id, !ticket.isAdvertised);
        if (result?.message) {
            Swal.fire('Limit reached', result.message, 'warning');
        }
    };

    return (
        <div className="card overflow-x-auto">
            <p className="p-5 text-sm text-slate-500 dark:text-slate-400">{advertisedCount} / 6 tickets currently advertised</p>
            <table className="w-full text-left text-sm">
                <thead className="border-b border-slate-200 text-slate-500 dark:border-slate-800 dark:text-slate-400">
                    <tr>
                        <th className="px-5 py-4">Title</th>
                        <th className="px-5 py-4">Route</th>
                        <th className="px-5 py-4">Price</th>
                        <th className="px-5 py-4">Advertise</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map((ticket) => (
                        <tr key={ticket._id} className="border-b border-slate-100 last:border-0 dark:border-slate-800">
                            <td className="px-5 py-4">{ticket.title}</td>
                            <td className="px-5 py-4">{ticket.fromLocation} → {ticket.toLocation}</td>
                            <td className="px-5 py-4 font-semibold">${ticket.price}</td>
                            <td className="px-5 py-4">
                                <button
                                    onClick={() => handleToggle(ticket)}
                                    className={`h-7 w-14 rounded-full transition ${ticket.isAdvertised ? 'bg-brand-500' : 'bg-slate-300 dark:bg-slate-700'}`}
                                >
                                    <span className={`block h-6 w-6 rounded-full bg-white transition-transform ${ticket.isAdvertised ? 'translate-x-7' : 'translate-x-1'}`} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
