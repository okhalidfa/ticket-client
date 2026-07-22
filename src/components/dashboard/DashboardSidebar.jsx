'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    User, Ticket, Receipt, PlusCircle, ListChecks, ClipboardList,
    BarChart3, Users, Megaphone
} from 'lucide-react';

const menus = {
    user: [
        { label: 'My Profile', href: '/dashboard/user', icon: User },
        { label: 'My Booked Tickets', href: '/dashboard/user/bookings', icon: Ticket },
        { label: 'Transaction History', href: '/dashboard/user/transactions', icon: Receipt }
    ],
    vendor: [
        { label: 'Vendor Profile', href: '/dashboard/vendor', icon: User },
        { label: 'Add Ticket', href: '/dashboard/vendor/add-ticket', icon: PlusCircle },
        { label: 'My Added Tickets', href: '/dashboard/vendor/my-tickets', icon: ListChecks },
        { label: 'Requested Bookings', href: '/dashboard/vendor/bookings', icon: ClipboardList },
        { label: 'Revenue Overview', href: '/dashboard/vendor/revenue', icon: BarChart3 }
    ],
    admin: [
        { label: 'Admin Profile', href: '/dashboard/admin', icon: User },
        { label: 'Manage Tickets', href: '/dashboard/admin/tickets', icon: ListChecks },
        { label: 'Manage Users', href: '/dashboard/admin/users', icon: Users },
        { label: 'Advertise Tickets', href: '/dashboard/admin/advertise', icon: Megaphone }
    ]
};

export default function DashboardSidebar({ role }) {
    const pathname = usePathname();
    const items = menus[role] || menus.user;

    return (
        <aside className="w-full shrink-0 border-b border-slate-200 pb-4 dark:border-slate-800 lg:w-64 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-4">
            <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-1">
                {items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 whitespace-nowrap rounded-xl px-4 py-3 text-sm font-medium transition ${
                                isActive
                                    ? 'bg-brand-500 text-white'
                                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                            }`}
                        >
                            <item.icon size={18} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
