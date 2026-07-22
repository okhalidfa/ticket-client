'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from '@/lib/auth-client';

export default function SigninForm() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const setToken = async (email) => {
        await fetch('/api/jwt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const { error: signInError } = await signIn.email({
            email: form.email,
            password: form.password
        });

        if (signInError) {
            setError(signInError.message || 'Invalid email or password');
            setLoading(false);
            return;
        }

        await setToken(form.email);
        router.push('/');
        router.refresh();
    };

    const handleGoogleSignIn = async () => {
        await signIn.social({ provider: 'google', callbackURL: '/auth/callback' });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600 dark:bg-red-500/10">{error}</p>}

            <div>
                <label className="mb-1 block text-sm font-medium">Email</label>
                <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="input-field"
                    placeholder="you@example.com"
                />
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium">Password</label>
                <input
                    type="password"
                    required
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="input-field"
                    placeholder="••••••••"
                />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? 'Logging in...' : 'Login'}
            </button>

            <div className="relative py-2 text-center text-xs text-slate-400">
                <span className="bg-white px-2 dark:bg-slate-900">OR</span>
            </div>

            <button type="button" onClick={handleGoogleSignIn} className="btn-outline w-full">
                Continue with Google
            </button>

            <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                Don&apos;t have an account? <Link href="/auth/signup" className="font-semibold text-brand-600">Register</Link>
            </p>
        </form>
    );
}
