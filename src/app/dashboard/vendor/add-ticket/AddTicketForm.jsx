'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { createTicket } from '@/lib/actions/tickets';
import { uploadImage } from '@/lib/uploadImage';

const perkOptions = ['AC', 'WiFi', 'Breakfast', 'Charging Port', 'Reclining Seat', 'Snacks'];

export default function AddTicketForm({ user }) {
    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onSubmit = async (data) => {
        setLoading(true);

        try {
            const imageUrl = await uploadImage(data.image[0]);

            const result = await createTicket({
                title: data.title,
                fromLocation: data.fromLocation,
                toLocation: data.toLocation,
                transportType: data.transportType,
                price: data.price,
                quantity: data.quantity,
                departureAt: data.departureAt,
                perks: data.perks || [],
                image: imageUrl,
                vendorName: user.name,
                vendorEmail: user.email
            });

            if (result?.insertedId) {
                Swal.fire('Added!', 'Your ticket has been submitted for admin approval.', 'success');
                reset();
                router.push('/dashboard/vendor/my-tickets');
            } else {
                Swal.fire('Failed', result?.message || 'Could not add ticket. Try again.', 'error');
            }
        } catch (error) {
            console.error('Add ticket failed:', error);
            Swal.fire('Failed', error.message || 'Something went wrong. Try again.', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="card grid grid-cols-1 gap-5 p-8 sm:grid-cols-2">
            <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium">Ticket Title</label>
                <input {...register('title', { required: true })} className="input-field" placeholder="Dhaka to Cox's Bazar AC Bus" />
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium">From Location</label>
                <input {...register('fromLocation', { required: true })} className="input-field" placeholder="Dhaka" />
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium">To Location</label>
                <input {...register('toLocation', { required: true })} className="input-field" placeholder="Cox's Bazar" />
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium">Transport Type</label>
                <select {...register('transportType', { required: true })} className="input-field">
                    <option value="Bus">Bus</option>
                    <option value="Train">Train</option>
                    <option value="Launch">Launch</option>
                    <option value="Plane">Plane</option>
                </select>
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium">Price (per unit)</label>
                <input type="number" step="0.01" {...register('price', { required: true })} className="input-field" placeholder="850" />
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium">Ticket Quantity</label>
                <input type="number" {...register('quantity', { required: true })} className="input-field" placeholder="40" />
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium">Departure Date & Time</label>
                <input type="datetime-local" {...register('departureAt', { required: true })} className="input-field" />
            </div>

            <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium">Perks</label>
                <div className="flex flex-wrap gap-4">
                    {perkOptions.map((perk) => (
                        <label key={perk} className="flex items-center gap-2 text-sm">
                            <input type="checkbox" value={perk} {...register('perks')} className="h-4 w-4" />
                            {perk}
                        </label>
                    ))}
                </div>
            </div>

            <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium">Ticket Image</label>
                <input type="file" accept="image/*" {...register('image', { required: true })} className="input-field" />
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium">Vendor Name</label>
                <input value={user.name} readOnly className="input-field bg-slate-100 dark:bg-slate-800" />
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium">Vendor Email</label>
                <input value={user.email} readOnly className="input-field bg-slate-100 dark:bg-slate-800" />
            </div>

            <button type="submit" disabled={loading} className="btn-primary sm:col-span-2">
                {loading ? 'Adding Ticket...' : 'Add Ticket'}
            </button>
        </form>
    );
}