import { requireLogin } from '@/lib/core/session';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';

export default async function DashboardLayout({ children }) {
    const user = await requireLogin();

    return ( 
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row">
                <DashboardSidebar role={user.role} />
                <div className="flex-1">{children}</div>
            </div>
        </div>
    );
}
