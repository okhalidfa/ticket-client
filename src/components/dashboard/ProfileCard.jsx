export default function ProfileCard({ user }) {
    return (
        <div className="card p-8">
            <div className="flex flex-col items-center gap-4 sm:flex-row">
                <img
                    src={user.image || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                    alt={user.name}
                    className="h-24 w-24 rounded-full object-cover"
                />
                <div className="text-center sm:text-left">
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <p className="text-slate-500 dark:text-slate-400">{user.email}</p>
                    <span className="mt-2 inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                        {user.role}
                    </span>
                </div>
            </div>
        </div>
    );
}
