import { requireRole } from '@/lib/core/session';
import ProfileCard from '@/components/dashboard/ProfileCard';

export default async function AdminProfilePage() {
    const user = await requireRole('admin');
    return <ProfileCard user={user} />;
}
