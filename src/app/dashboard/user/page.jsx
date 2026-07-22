import { requireRole } from '@/lib/core/session';
import ProfileCard from '@/components/dashboard/ProfileCard';

export default async function UserProfilePage() {
    const user = await requireRole('user');
    return <ProfileCard user={user} />;
}
