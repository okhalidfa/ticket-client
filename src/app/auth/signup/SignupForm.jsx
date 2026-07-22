'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signUp, signIn } from '@/lib/auth-client';

export default function SignupForm() {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
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

        const { error: signUpError } = await signUp.email({
            name: form.name,
            email: form.email,
            password: form.password
        });

        if (signUpError) {
            setError(signUpError.message || 'Something went wrong');
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
                <label className="mb-1 block text-sm font-medium">Full Name</label>
                <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="input-field"
                    placeholder="John Doe"
                />
            </div>

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
                    minLength={6}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="input-field"
                    placeholder="••••••••"
                />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? 'Creating account...' : 'Create Account'}
            </button>

            <div className="relative py-2 text-center text-xs text-slate-400">
                <span className="bg-white px-2 dark:bg-slate-900">OR</span>
            </div>

            <button type="button" onClick={handleGoogleSignIn} className="btn-outline w-full">
                Continue with Google
            </button>

            <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                Already have an account? <Link href="/auth/signin" className="font-semibold text-brand-600">Login</Link>
            </p>
        </form>
    );
}
