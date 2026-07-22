import { cookies } from 'next/headers';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function POST(request) {
    const { email } = await request.json();

    const res = await fetch(`${baseUrl}/api/jwt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    });
    const data = await res.json();

    const cookieStore = await cookies();
    cookieStore.set('access-token', data.token, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/'
    });

    return Response.json({ success: true });
}

export async function DELETE() {
    const cookieStore = await cookies();
    cookieStore.delete('access-token');
    return Response.json({ success: true });
}
