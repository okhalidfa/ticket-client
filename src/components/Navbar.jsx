'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Bus, Menu, X, Moon, Sun } from 'lucide-react';
import { useSession, signOut } from '@/lib/auth-client';
import { useTheme } from '@/components/ThemeProvider';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { data: session } = useSession();
    const { theme, toggleTheme } = useTheme();
    const pathname = usePathname();
    const router = useRouter();

    const user = session?.user;

    const dashboardLinks = {
        user: '/dashboard/user',
        vendor: '/dashboard/vendor',
        admin: '/dashboard/admin'
    };

    const navLinks = [
        { label: 'Home', href: '/' },
        { label: 'All Tickets', href: '/tickets' }
    ];

    if (user) {
        navLinks.push({ label: 'Dashboard', href: dashboardLinks[user.role] || '/dashboard/user' });
    }

    const handleSignOut = async () => {
        await signOut();
        await fetch('/api/jwt', { method: 'DELETE' });
        router.push('/');
        router.refresh();
    };

    const initials = user?.name
        ? user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
        : '';

    return (
        <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-lg dark:border-slate-800 dark:bg-slate-950/90">
            <div className="mx-auto flex h-20 max-w-[1450px] items-center justify-between px-4 sm:px-6 lg:px-8 ">
                {/* Left: Logo */}
                <Link href="/" className="flex flex-1 items-center gap-2 ">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg">
                        <Bus size={22} />
                    </div>
                    <span className="text-xl font-bold">TicketBari</span>
                </Link>

                {/* Center: Nav links */}
                <ul className="hidden flex-1 items-center justify-center gap-8 md:flex">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={`text-base font-medium transition hover:text-brand-600 ${pathname === link.href ? 'text-brand-600' : 'text-slate-600 dark:text-slate-300'}`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Right: theme + name + avatar + logout */}
                <div className="hidden flex-1 items-center justify-end gap-4 md:flex">
                    <button
                        onClick={toggleTheme}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                        aria-label="Toggle theme"
                    >
                        {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                    </button>

                    {user ? (
                        <>
                            <div className="text-right leading-tight">
                                <p className="text-base font-semibold text-slate-800 dark:text-slate-100">{user.name}</p>
                            </div>

                            <Link href="/profile" aria-label="Go to profile">
                                {user.image ? (
                                    <img
                                        src={user.image}
                                        alt={user.name}
                                        className="h-10 w-10 rounded-full object-cover ring-2 ring-slate-200 transition hover:ring-brand-500 dark:ring-slate-700"
                                    />
                                ) : (
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 text-sm font-semibold text-white ring-2 ring-slate-200 transition hover:ring-brand-500 dark:ring-slate-700">
                                        {initials}
                                    </div>
                                )}
                            </Link>

                            <button
                                onClick={handleSignOut}
                                className="rounded-full border border-red-300 px-4 py-1.5 text-base font-medium text-red-500 transition hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/40"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link href="/auth/signin" className="text-base font-medium text-slate-600 hover:text-brand-600 dark:text-slate-300">
                                Login
                            </Link>
                            <Link href="/auth/signup" className="btn-primary text-base">
                                Register
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile controls */}
                <div className="flex items-center gap-3 md:hidden">
                    <button onClick={toggleTheme} className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700">
                        {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                    </button>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle Menu">
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="border-t border-slate-200 px-4 py-4 dark:border-slate-800 md:hidden">
                    <ul className="space-y-3">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href} className="block text-base font-medium" onClick={() => setIsMenuOpen(false)}>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4 flex flex-col gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
                        {user ? (
                            <>
                                <Link
                                    href="/profile"
                                    className="flex items-center gap-3"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {user.image ? (
                                        <img src={user.image} alt={user.name} className="h-9 w-9 rounded-full object-cover" />
                                    ) : (
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-xs font-semibold text-white">
                                            {initials}
                                        </div>
                                    )}
                                    <p className="text-base font-semibold">{user.name}</p>
                                </Link>
                                <button onClick={handleSignOut} className="text-left text-base font-medium text-red-500">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/auth/signin" className="text-base font-medium">Login</Link>
                                <Link href="/auth/signup" className="btn-primary w-fit text-base">Register</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}