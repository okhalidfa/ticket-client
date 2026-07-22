'use client';

import { updateUserRole, markUserAsFraud } from '@/lib/actions/users';

export default function ManageUsersTable({ users }) {
    return (
        <div className="card overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="border-b border-slate-200 text-slate-500 dark:border-slate-800 dark:text-slate-400">
                    <tr>
                        <th className="px-5 py-4">Name</th>
                        <th className="px-5 py-4">Email</th>
                        <th className="px-5 py-4">Role</th>
                        <th className="px-5 py-4">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id} className="border-b border-slate-100 last:border-0 dark:border-slate-800">
                            <td className="px-5 py-4">{user.name}</td>
                            <td className="px-5 py-4">{user.email}</td>
                            <td className="px-5 py-4 capitalize">{user.role || 'user'}{user.isFraud ? ' (fraud)' : ''}</td>
                            <td className="px-5 py-4">
                                <div className="flex flex-wrap gap-2">
                                    {user.role !== 'admin' && (
                                        <button onClick={() => updateUserRole(user._id, 'admin')} className="btn-outline px-3 py-1.5 text-xs">
                                            Make Admin
                                        </button>
                                    )}
                                    {user.role !== 'vendor' && (
                                        <button onClick={() => updateUserRole(user._id, 'vendor')} className="btn-outline px-3 py-1.5 text-xs">
                                            Make Vendor
                                        </button>
                                    )}
                                    {user.role === 'vendor' && !user.isFraud && (
                                        <button onClick={() => markUserAsFraud(user._id)} className="btn-primary px-3 py-1.5 text-xs">
                                            Mark as Fraud
                                        </button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
