import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold">Contact Us</h1>
            <p className="mt-4 text-slate-500 dark:text-slate-400">
                Have a question about a booking, a ticket listing, or your account? Reach out and our team will get
                back to you.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
                <div className="card p-6">
                    <Mail className="mb-3 text-brand-500" size={24} />
                    <h3 className="mb-1 font-semibold">Email</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">support@ticketbari.com</p>
                </div>
                <div className="card p-6">
                    <Phone className="mb-3 text-brand-500" size={24} />
                    <h3 className="mb-1 font-semibold">Phone</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">+880 1234-567890</p>
                </div>
                <div className="card p-6">
                    <MapPin className="mb-3 text-brand-500" size={24} />
                    <h3 className="mb-1 font-semibold">Office</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Dhaka, Bangladesh</p>
                </div>
            </div>
        </div>
    );
}
