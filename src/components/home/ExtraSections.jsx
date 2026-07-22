import { ShieldCheck, Clock3, Wallet, Headphones } from 'lucide-react';

const routes = [
    { from: 'Dhaka', to: "Cox's Bazar", price: 850 },
    { from: 'Dhaka', to: 'Sylhet', price: 620 },
    { from: 'Chattogram', to: 'Dhaka', price: 700 },
    { from: 'Dhaka', to: 'Khulna', price: 550 }
];

const perks = [
    { icon: ShieldCheck, title: 'Verified Vendors', desc: 'Every ticket is reviewed by our admin team before listing.' },
    { icon: Clock3, title: 'Live Countdown', desc: 'Track your departure time right from your dashboard.' },
    { icon: Wallet, title: 'Secure Payments', desc: 'Pay safely through Stripe with instant confirmation.' },
    { icon: Headphones, title: '24/7 Support', desc: 'Our team is always ready to help with your booking.' }
];

export function PopularRoutes() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="mb-10 text-center text-3xl font-bold">Popular Routes</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {routes.map((route) => (
                    <div key={`${route.from}-${route.to}`} className="card p-6 text-center">
                        <p className="text-sm text-slate-500 dark:text-slate-400">{route.from} → {route.to}</p>
                        <p className="mt-2 text-2xl font-bold text-brand-600">${route.price}</p>
                        <p className="mt-1 text-xs text-slate-400">Starting price</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export function WhyChooseUs() {
    return (
        <section className="bg-slate-50 py-16 dark:bg-slate-900">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className="mb-10 text-center text-3xl font-bold">Why Choose Us?</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {perks.map((perk) => (
                        <div key={perk.title} className="card p-6 text-center">
                            <perk.icon className="mx-auto mb-4 text-brand-600" size={32} />
                            <h3 className="font-semibold">{perk.title}</h3>
                            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{perk.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
