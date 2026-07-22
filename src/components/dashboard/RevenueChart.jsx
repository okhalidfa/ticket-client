'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function RevenueChart({ stats }) {
    const data = [
        { name: 'Added', value: stats.totalAdded },
        { name: 'Sold', value: stats.totalSold },
        { name: 'Revenue ($)', value: stats.totalRevenue }
    ];

    return (
        <div className="card p-6">
            <h2 className="mb-4 text-lg font-semibold">Overview Chart</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#f97316" radius={[8, 8, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
