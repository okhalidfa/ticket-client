'use client';

import { acceptBooking, rejectBooking } from '@/lib/actions/bookings';

export default function RequestedBookingsTable({ bookings }) {
    return (
        <div className="card overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="border-b border-slate-200 text-slate-500 dark:border-slate-800 dark:text-slate-400">
                    <tr>
                        <th className="px-5 py-4">User</th>
                        <th className="px-5 py-4">Ticket Title</th>
                        <th className="px-5 py-4">Quantity</th>
                        <th className="px-5 py-4">Total Price</th>
                        <th className="px-5 py-4">Status</th>
                        <th className="px-5 py-4">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking._id} className="border-b border-slate-100 last:border-0 dark:border-slate-800">
                            <td className="px-5 py-4">
                                <p className="font-medium">{booking.userName}</p>
                                <p className="text-xs text-slate-400">{booking.userEmail}</p>
                            </td>
                            <td className="px-5 py-4">{booking.ticketTitle}</td>
                            <td className="px-5 py-4">{booking.bookingQuantity}</td>
                            <td className="px-5 py-4 font-semibold">${booking.totalPrice}</td>
                            <td className="px-5 py-4 capitalize">{booking.status}</td>
                            <td className="px-5 py-4">
                                {booking.status === 'pending' ? (
                                    <div className="flex gap-2">
                                        <button onClick={() => acceptBooking(booking._id)} className="btn-primary px-3 py-1.5 text-xs">
                                            Accept
                                        </button>
                                        <button onClick={() => rejectBooking(booking._id)} className="btn-outline px-3 py-1.5 text-xs">
                                            Reject
                                        </button>
                                    </div>
                                ) : (
                                    <span className="text-xs text-slate-400">No action</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {bookings.length === 0 && <p className="p-8 text-center text-slate-500">No booking requests yet.</p>}
        </div>
    );
}
