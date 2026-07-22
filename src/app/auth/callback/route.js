import { headers, cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function GET() {
    const session = await auth.api.getSession({ headers: await headers() });

    if (session?.user?.email) {
        const res = await fetch(`${baseUrl}/api/jwt`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: session.user.email })
        });
        const data = await res.json();

        const cookieStore = await cookies();
        cookieStore.set('access-token', data.token, {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7,
            path: '/'
        });
    }

    redirect('/');
}
