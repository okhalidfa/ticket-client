import { protectedFetch } from '../core/server';

export const getAllUsers = async () => {
    return protectedFetch('/api/users');
};

export const getTransactions = async (email) => {
    return protectedFetch(`/api/transactions?email=${email}`);
};

export const getVendorStats = async (email) => {
    return protectedFetch(`/api/vendor/stats?email=${email}`);
};
