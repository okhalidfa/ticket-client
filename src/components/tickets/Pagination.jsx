'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function Pagination({ currentPage, totalPages }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const goToPage = (page) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        router.push(`/tickets?${params.toString()}`);
    };

    if (totalPages <= 1) return null;

    return (
        <div className="mt-10 flex justify-center gap-2">
            <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium disabled:opacity-40 dark:border-slate-700"
            >
                Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`h-10 w-10 rounded-lg text-sm font-medium ${page === currentPage ? 'bg-brand-500 text-white' : 'border border-slate-200 dark:border-slate-700'}`}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium disabled:opacity-40 dark:border-slate-700"
            >
                Next
            </button>
        </div>
    );
}
