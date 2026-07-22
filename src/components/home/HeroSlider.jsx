'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const slides = [
    {
        title: 'Travel Anywhere, Book in Seconds',
        subtitle: 'Bus, train, launch and flight tickets all in one place.',
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1600&q=80'
    },
    {
        title: 'Best Prices, Verified Vendors',
        subtitle: 'Every ticket is checked and approved by our team before it goes live.',
        image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80'
    },
    {
        title: 'Instant Booking, Secure Payment',
        subtitle: 'Pay safely with Stripe and get your ticket confirmed instantly.',
        image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1600&q=80'
    }
];

export default function HeroSlider() {
    const [active, setActive] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActive((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative h-[70vh] min-h-[420px] w-full overflow-hidden">
            {slides.map((slide, index) => (
                <div
                    key={slide.title}
                    className={`absolute inset-0 transition-opacity duration-700 ${index === active ? 'opacity-100' : 'opacity-0'}`}
                >
                    <img src={slide.image} alt={slide.title} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute inset-0 flex flex-col items-start justify-center px-6 sm:px-12 lg:px-24">
                        <h1 className="max-w-2xl text-3xl font-bold text-white sm:text-5xl">{slide.title}</h1>
                        <p className="mt-4 max-w-xl text-base text-slate-200 sm:text-lg">{slide.subtitle}</p>
                        <Link href="/tickets" className="btn-primary mt-8">Browse Tickets</Link>
                    </div>
                </div>
            ))}

            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
                {slides.map((slide, index) => (
                    <button
                        key={slide.title}
                        onClick={() => setActive(index)}
                        className={`h-2 rounded-full transition-all ${index === active ? 'w-8 bg-brand-500' : 'w-2 bg-white/60'}`}
                        aria-label={`Slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
