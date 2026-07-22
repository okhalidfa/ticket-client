import { requireRole } from '@/lib/core/session';
import { getAllUsers } from '@/lib/api/users';
import ManageUsersTable from '@/components/dashboard/ManageUsersTable';

export default async function ManageUsersPage() {
    await requireRole('admin');
    const users = (await getAllUsers()) || [];

    return (
        <div>
            <h1 className="mb-6 text-2xl font-bold">Manage Users</h1>
            <ManageUsersTable users={users} />
        </div>
    );
}
