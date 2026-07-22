'use server';

import { revalidatePath } from 'next/cache';
import { serverMutation } from '../core/server';

export const createTicket = async (ticketData) => {
    const result = await serverMutation('/api/tickets', ticketData);
    revalidatePath('/dashboard/vendor/my-tickets');
    return result;
};

export const updateTicket = async (id, ticketData) => {
    const result = await serverMutation(`/api/tickets/${id}`, ticketData, 'PATCH');
    revalidatePath('/dashboard/vendor/my-tickets');
    return result;
};

export const deleteTicket = async (id) => {
    const result = await serverMutation(`/api/tickets/${id}`, {}, 'DELETE');
    revalidatePath('/dashboard/vendor/my-tickets');
    return result;
};

export const updateTicketStatus = async (id, status) => {
    const result = await serverMutation(`/api/tickets/${id}/status`, { status }, 'PATCH');
    revalidatePath('/dashboard/admin/tickets');
    return result;
};

export const toggleAdvertise = async (id, advertise) => {
    const result = await serverMutation(`/api/tickets/${id}/advertise`, { advertise }, 'PATCH');
    revalidatePath('/dashboard/admin/advertise');
    revalidatePath('/');
    return result;
};
