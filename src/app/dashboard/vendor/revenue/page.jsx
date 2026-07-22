import { Ticket, ShoppingBag, DollarSign } from 'lucide-react';
import { requireRole } from '@/lib/core/session';
import { getVendorStats } from '@/lib/api/users';
import StatCard from '@/components/dashboard/StatCard';
import RevenueChart from '@/components/dashboard/RevenueChart';

export default async function RevenueOverviewPage() {
    const user = await requireRole('vendor');
    const stats = (await getVendorStats(user.email)) || { totalAdded: 0, totalSold: 0, totalRevenue: 0 };

    return (
        <div>
            <h1 className="mb-6 text-2xl font-bold">Revenue Overview</h1>
            <div className="mb-8 grid gap-6 sm:grid-cols-3">
                <StatCard label="Tickets Added" value={stats.totalAdded} icon={Ticket} />
                <StatCard label="Tickets Sold" value={stats.totalSold} icon={ShoppingBag} />
                <StatCard label="Total Revenue" value={`$${stats.totalRevenue}`} icon={DollarSign} />
            </div>
            <RevenueChart stats={stats} />
        </div>
    );
}
