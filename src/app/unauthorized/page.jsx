import Link from 'next/link';

export default function UnauthorizedPage() {
    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
            <h1 className="text-6xl font-bold text-brand-600">401</h1>
            <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">You need to log in to access this page.</p>
            <Link href="/auth/signin" className="btn-primary mt-8">Go to Login</Link>
        </div>
    );
}
