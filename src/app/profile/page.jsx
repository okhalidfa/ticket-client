'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { useSession, updateUser } from '@/lib/auth-client';

export default function ProfilePage() {
    const { data: session } = useSession();
    const router = useRouter();
    const user = session?.user;

    const [name, setName] = useState(user?.name || '');
    const [photoUrl, setPhotoUrl] = useState(user?.image || '');
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');

    const initials = name
        ? name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
        : '';

    const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage('');
    try {
        const { data, error } = await updateUser({
            name: name,
            image: photoUrl,
        });

        if (error) throw new Error(error.message);

        setMessage('Profile updated successfully.');
    } catch (err) {
        console.error(err);
        setMessage('Something went wrong. Please try again.');
    } finally {
        setIsSaving(false);
    }
};
    return (
        <div className="mx-auto max-w-lg px-4 py-12 text-center">
            {photoUrl ? (
                <img
                    src={photoUrl}
                    alt={name}
                    className="mx-auto h-24 w-24 rounded-full object-cover"
                />
            ) : (
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-brand-500 text-2xl font-semibold text-white">
                    {initials}
                </div>
            )}

            <h1 className="mt-4 text-2xl font-bold">Profile Management</h1>
            <p className="mt-1 text-brand-600">{user?.email}</p>

            <form onSubmit={handleSave} className="mt-8 rounded-2xl border border-slate-200 p-6 text-left dark:border-slate-800">
                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Name
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mb-4 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900"
                />

                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Photo URL
                </label>
                <input
                    type="text"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    placeholder="https://..."
                    className="mb-6 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900"
                />

                <button
                    type="submit"
                    disabled={isSaving}
                    className="w-full rounded-lg bg-brand-600 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60"
                >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                </button>

                {message && (
                    <p className="mt-3 text-center text-sm text-slate-600 dark:text-slate-400">{message}</p>
                )}
            </form>
        </div>
    );
}
