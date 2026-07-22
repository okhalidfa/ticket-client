'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';

export default function TicketFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [from, setFrom] = useState(searchParams.get('from') || '');
    const [to, setTo] = useState(searchParams.get('to') || '');
    const [transportType, setTransportType] = useState(searchParams.get('transportType') || '');
    const [sort, setSort] = useState(searchParams.get('sort') || '');

    const applyFilters = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (from) params.set('from', from);
        if (to) params.set('to', to);
        if (transportType) params.set('transportType', transportType);
        if (sort) params.set('sort', sort);
        params.set('page', '1');
        router.push(`/tickets?${params.toString()}`);
    };

    return (
        <form onSubmit={applyFilters} className="card mb-8 grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 lg:grid-cols-5">
            <input
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="From location"
                className="input-field"
            />
            <input
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="To location"
                className="input-field"
            />
            <select value={transportType} onChange={(e) => setTransportType(e.target.value)} className="input-field">
                <option value="">All Transport Types</option>
                <option value="Bus">Bus</option>
                <option value="Train">Train</option>
                <option value="Launch">Launch</option>
                <option value="Plane">Plane</option>
            </select>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="input-field">
                <option value="">Sort by Price</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
            </select>
            <button type="submit" className="btn-primary flex items-center justify-center gap-2">
                <Search size={16} /> Search
            </button>
        </form>
    );
}
