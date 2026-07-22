'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { createBooking } from '@/lib/actions/bookings';

export default function BookNowModal({ ticket, user }) {
    const [isOpen, setIsOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const isPassed = new Date(ticket.departureAt) < new Date();
    const isSoldOut = ticket.quantity < 1;
    const isDisabled = isPassed || isSoldOut;

    const handleBook = async (e) => {
        e.preventDefault();
        setLoading(true);

        const result = await createBooking({
            ticketId: ticket._id,
            bookingQuantity: quantity,
            userName: user.name
        });

        setLoading(false);

        if (result?.insertedId) {
            setIsOpen(false);
            Swal.fire('Booked!', 'Your ticket has been requested and is pending vendor approval.', 'success');
            router.push('/dashboard/user/bookings');
        } else {
            Swal.fire('Failed', result?.message || 'Could not book this ticket.', 'error');
        }
    };

    return (
        <>
            <button onClick={() => setIsOpen(true)} disabled={isDisabled} className="btn-primary w-full sm:w-auto">
                {isSoldOut ? 'Sold Out' : isPassed ? 'Departed' : 'Book Now'}
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="card w-full max-w-md p-6">
                        <h2 className="mb-4 text-xl font-bold">Book {ticket.title}</h2>
                        <form onSubmit={handleBook} className="space-y-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium">Quantity</label>
                                <input
                                    type="number"
                                    min={1}
                                    max={ticket.quantity}
                                    value={quantity}
                                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                    className="input-field"
                                />
                                <p className="mt-1 text-xs text-slate-400">Max {ticket.quantity} tickets available</p>
                            </div>
                            <p className="text-sm font-semibold">Total: ${(ticket.price * quantity).toFixed(2)}</p>
                            <div className="flex gap-3">
                                <button type="button" onClick={() => setIsOpen(false)} className="btn-outline flex-1">
                                    Cancel
                                </button>
                                <button type="submit" disabled={loading} className="btn-primary flex-1">
                                    {loading ? 'Booking...' : 'Confirm Booking'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
