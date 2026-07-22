import Link from 'next/link';

export default function ForbiddenPage() {
    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
            <h1 className="text-6xl font-bold text-brand-600">403</h1>
            <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">You don&apos;t have permission to access this page.</p>
            <Link href="/" className="btn-primary mt-8">Back to Home</Link>
        </div>
    );
}
