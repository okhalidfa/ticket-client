'use server';

import { revalidatePath } from 'next/cache';
import { serverMutation } from '../core/server';

export const createBooking = async (bookingData) => {
    return serverMutation('/api/bookings', bookingData);
};

export const acceptBooking = async (id) => {
    const result = await serverMutation(`/api/bookings/${id}/accept`, {}, 'PATCH');
    revalidatePath('/dashboard/vendor/bookings');
    revalidatePath('/dashboard/user/bookings');
    return result;
};

export const rejectBooking = async (id) => {
    const result = await serverMutation(`/api/bookings/${id}/reject`, {}, 'PATCH');
    revalidatePath('/dashboard/vendor/bookings');
    revalidatePath('/dashboard/user/bookings');
    return result;
};

export const cancelBooking = async (id) => {
    const result = await serverMutation(`/api/bookings/${id}`, {}, 'DELETE');
    revalidatePath('/dashboard/user/bookings');
    return result;
};

export const confirmPayment = async (paymentData) => {
    const result = await serverMutation('/api/payments', paymentData);
    revalidatePath('/dashboard/user/bookings');
    revalidatePath('/dashboard/user/transactions');
    return result;
}; 