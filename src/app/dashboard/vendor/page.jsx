import { requireRole } from '@/lib/core/session';
import ProfileCard from '@/components/dashboard/ProfileCard';

export default async function VendorProfilePage() {
    const user = await requireRole('vendor');
    return <ProfileCard user={user} />;
}
