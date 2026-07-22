import { serverFetch, protectedFetch } from '../core/server';

export const getTickets = async (queryString = '') => {
    return serverFetch(`/api/tickets?${queryString}`);
};

export const getTicketById = async (id) => {
    return serverFetch(`/api/tickets/${id}`);
};

export const getVendorTickets = async (email) => {
    return protectedFetch(`/api/vendor/tickets?email=${email}`);
};

export const getAdminTickets = async () => {
    return protectedFetch('/api/admin/tickets');
};
