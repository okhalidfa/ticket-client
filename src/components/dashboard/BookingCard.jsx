'use client';

import { useState } from 'react';
import Swal from 'sweetalert2';
import { MapPin } from 'lucide-react';
import CountdownTimer from '@/components/tickets/CountdownTimer';
import { cancelBooking } from '@/lib/actions/bookings';

const statusStyles = {
    pending: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
    accepted: 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
    rejected: 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400',
    paid: 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400'
};

export default function BookingCard({ booking }) {
    const [loading, setLoading] = useState(false);
    const isPassed = new Date(booking.departureAt) < new Date();

    const handlePayNow = async () => {
        setLoading(true);
        const res = await fetch('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                bookingId: booking._id,
                ticketTitle: booking.ticketTitle,
                totalPrice: booking.totalPrice
            })
        });
        const data = await res.json();
        window.location.href = data.url;
    };

    const handleCancel = async () => {
        const confirm = await Swal.fire({
            title: 'Cancel this booking?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, cancel it'
        });
        if (confirm.isConfirmed) {
            await cancelBooking(booking._id);
        }
    };

    return (
        <div className="card flex flex-col overflow-hidden">
            <img src={booking.image} alt={booking.ticketTitle} className="h-40 w-full object-cover" />
            <div className="flex flex-1 flex-col gap-2 p-5">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{booking.ticketTitle}</h3>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyles[booking.status]}`}>
                        {booking.status}
                    </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <MapPin size={14} /> {booking.fromLocation} → {booking.toLocation}
                </div>

                <p className="text-sm text-slate-500 dark:text-slate-400">Quantity: {booking.bookingQuantity}</p>
                <p className="text-sm font-semibold">Total: ${booking.totalPrice}</p>
                <p className="text-xs text-slate-400">Departs {new Date(booking.departureAt).toLocaleString()}</p>

                {booking.status !== 'rejected' && !isPassed && (
                    <CountdownTimer departureAt={booking.departureAt} />
                )}

                <div className="mt-auto flex gap-2 pt-3">
                    {booking.status === 'pending' && (
                        <button onClick={handleCancel} className="btn-outline flex-1">Cancel</button>
                    )}
                    {booking.status === 'accepted' && !isPassed && (
                        <button onClick={handlePayNow} disabled={loading} className="btn-primary flex-1">
                            {loading ? 'Redirecting...' : 'Pay Now'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
