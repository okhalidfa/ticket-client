'use server';

import { revalidatePath } from 'next/cache';
import { serverMutation } from '../core/server';

export const updateUserRole = async (id, role) => {
    const result = await serverMutation(`/api/users/${id}/role`, { role }, 'PATCH');
    revalidatePath('/dashboard/admin/users');
    return result;
};

export const markUserAsFraud = async (id) => {
    const result = await serverMutation(`/api/users/${id}/fraud`, {}, 'PATCH');
    revalidatePath('/dashboard/admin/users');
    return result;
};
