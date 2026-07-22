'use client';

import { updateTicketStatus } from '@/lib/actions/tickets';

const statusStyles = {
    pending: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
    approved: 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400',
    rejected: 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400'
};

export default function ManageTicketsTable({ tickets }) {
    return (
        <div className="card overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="border-b border-slate-200 text-slate-500 dark:border-slate-800 dark:text-slate-400">
                    <tr>
                        <th className="px-5 py-4">Title</th>
                        <th className="px-5 py-4">Vendor</th>
                        <th className="px-5 py-4">Route</th>
                        <th className="px-5 py-4">Price</th>
                        <th className="px-5 py-4">Status</th>
                        <th className="px-5 py-4">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map((ticket) => (
                        <tr key={ticket._id} className="border-b border-slate-100 last:border-0 dark:border-slate-800">
                            <td className="px-5 py-4">{ticket.title}</td>
                            <td className="px-5 py-4">{ticket.vendorEmail}</td>
                            <td className="px-5 py-4">{ticket.fromLocation} → {ticket.toLocation}</td>
                            <td className="px-5 py-4 font-semibold">${ticket.price}</td>
                            <td className="px-5 py-4">
                                <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyles[ticket.verificationStatus]}`}>
                                    {ticket.verificationStatus}
                                </span>
                            </td>
                            <td className="px-5 py-4">
                                {ticket.verificationStatus === 'pending' ? (
                                    <div className="flex gap-2">
                                        <button onClick={() => updateTicketStatus(ticket._id, 'approved')} className="btn-primary px-3 py-1.5 text-xs">
                                            Approve
                                        </button>
                                        <button onClick={() => updateTicketStatus(ticket._id, 'rejected')} className="btn-outline px-3 py-1.5 text-xs">
                                            Reject
                                        </button>
                                    </div>
                                ) : (
                                    <span className="text-xs text-slate-400">Reviewed</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
