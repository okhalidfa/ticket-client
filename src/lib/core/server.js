import { redirect } from 'next/navigation';
import { getUserToken } from './session';



const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const authHeader = async () => {
    const token = await getUserToken();
    return token ? { authorization: `Bearer ${token}` } : {};
};

export const serverFetch = async (path) => {
    try {
        const res = await fetch(`${baseUrl}${path}`, { cache: 'no-store' });
        return await handleStatusCode(res);
    } catch (error) {
        console.error('serverFetch failed:', error.message);
        return null;
    }
};

export const protectedFetch = async (path) => {
    try {
        const res = await fetch(`${baseUrl}${path}`, {
            headers: await authHeader(),
            cache: 'no-store'
        });
        return await handleStatusCode(res);
    } catch (error) {
        console.error('protectedFetch failed:', error.message);
        return null;
    }
};

export const serverMutation = async (path, data, method = 'POST') => {
    try {
        const res = await fetch(`${baseUrl}${path}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...await authHeader()
            },
            body: JSON.stringify(data)
        });
        return await handleStatusCode(res);
    } catch (error) {
        console.error('serverMutation failed:', error.message);
        return { success: false, message: 'Could not reach the server. Please make sure the API server is running.' };
    }
};

const handleStatusCode = async (res) => {
    if (res.status === 401) {
        redirect('/unauthorized');
    }
    if (res.status === 403) {
        redirect('/forbidden');
    }
    return res.json();
};
