'use client';

import { useState } from 'react';
import Swal from 'sweetalert2';
import { updateTicket, deleteTicket } from '@/lib/actions/tickets';

const statusStyles = {
    pending: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
    approved: 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400',
    rejected: 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400'
};

export default function VendorTicketCard({ ticket }) {
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState({
        title: ticket.title,
        price: ticket.price,
        quantity: ticket.quantity,
        departureAt: ticket.departureAt?.slice(0, 16)
    });
    const isRejected = ticket.verificationStatus === 'rejected';

    const handleUpdate = async (e) => {
        e.preventDefault();
        await updateTicket(ticket._id, {
            ...ticket,
            title: form.title,
            price: form.price,
            quantity: form.quantity,
            departureAt: form.departureAt
        });
        setIsEditing(false);
        Swal.fire('Updated', 'Ticket details updated.', 'success');
    };

    const handleDelete = async () => {
        const confirm = await Swal.fire({
            title: 'Delete this ticket?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it'
        });
        if (confirm.isConfirmed) {
            await deleteTicket(ticket._id);
        }
    };

    return (
        <div className="card flex flex-col overflow-hidden">
            <img src={ticket.image} alt={ticket.title} className="h-40 w-full object-cover" />
            <div className="flex flex-1 flex-col gap-2 p-5">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{ticket.title}</h3>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyles[ticket.verificationStatus]}`}>
                        {ticket.verificationStatus}
                    </span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">{ticket.fromLocation} → {ticket.toLocation}</p>
                <p className="text-sm font-semibold">${ticket.price} · {ticket.quantity} left</p>

                <div className="mt-auto flex gap-2 pt-3">
                    <button onClick={() => setIsEditing(true)} disabled={isRejected} className="btn-outline flex-1 disabled:opacity-40">
                        Update
                    </button>
                    <button onClick={handleDelete} disabled={isRejected} className="btn-primary flex-1 disabled:opacity-40">
                        Delete
                    </button>
                </div>
            </div>

            {isEditing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <form onSubmit={handleUpdate} className="card w-full max-w-md space-y-4 p-6">
                        <h2 className="text-lg font-bold">Update Ticket</h2>
                        <input
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            className="input-field"
                            placeholder="Title"
                        />
                        <input
                            type="number"
                            value={form.price}
                            onChange={(e) => setForm({ ...form, price: e.target.value })}
                            className="input-field"
                            placeholder="Price"
                        />
                        <input
                            type="number"
                            value={form.quantity}
                            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                            className="input-field"
                            placeholder="Quantity"
                        />
                        <input
                            type="datetime-local"
                            value={form.departureAt}
                            onChange={(e) => setForm({ ...form, departureAt: e.target.value })}
                            className="input-field"
                        />
                        <div className="flex gap-3">
                            <button type="button" onClick={() => setIsEditing(false)} className="btn-outline flex-1">Cancel</button>
                            <button type="submit" className="btn-primary flex-1">Save</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
