import { protectedFetch } from '../core/server';

export const getUserBookings = async (email) => {
    return protectedFetch(`/api/bookings?email=${email}`, {
        cache: 'no-store',
    });
};

export const getVendorBookings = async (vendorEmail) => {
    return protectedFetch(`/api/bookings?vendorEmail=${vendorEmail}`, {
        cache: 'no-store',
    });
};