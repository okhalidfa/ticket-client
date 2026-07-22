import { redirect } from 'next/navigation';
import { cookies, headers } from 'next/headers';
import { auth } from '../auth';

export const getUserSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    return session?.user || null;
};

export const getUserToken = async () => {
    const cookieStore = await cookies();
    return cookieStore.get('access-token')?.value || null;
};

export const requireLogin = async () => {
    const user = await getUserSession();
    if (!user) {
        redirect('/auth/signin');
    }
    return user;
};

export const requireRole = async (role) => {
    const user = await requireLogin();
    if (user.role !== role) {
        redirect('/unauthorized');
    }
    return user;
};
