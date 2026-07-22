import Link from 'next/link';
import { Bus, Facebook, Mail, Phone, CreditCard } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
            <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <div className="mb-4 flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white">
                                <Bus size={20} />
                            </div>
                            <span className="text-lg font-bold">TicketBari</span>
                        </div>
                        <p className="max-w-xs text-sm leading-6 text-slate-500 dark:text-slate-400">
                            Book bus, train, launch & flight tickets easily, anytime, anywhere.
                        </p>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-brand-600">Quick Links</h3>
                        <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                            <li><Link href="/" className="hover:text-brand-600">Home</Link></li>
                            <li><Link href="/tickets" className="hover:text-brand-600">All Tickets</Link></li>
                            <li><Link href="/contact" className="hover:text-brand-600">Contact Us</Link></li>
                            <li><Link href="/about" className="hover:text-brand-600">About</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-brand-600">Contact Info</h3>
                        <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                            <li className="flex items-center gap-2"><Mail size={16} /> support@ticketbari.com</li>
                            <li className="flex items-center gap-2"><Phone size={16} /> +880 1234-567890</li>
                            <li className="flex items-center gap-2"><Facebook size={16} /> facebook.com/ticketbari</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-brand-600">Payment Methods</h3>
                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                            <CreditCard size={18} />
                            <span>Stripe Secure Checkout</span>
                        </div>
                    </div>
                </div>

                <div className="mt-10 border-t border-slate-200 pt-6 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
                    © 2025 TicketBari. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
