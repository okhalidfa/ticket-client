'use client';

import { useEffect, useState } from 'react';

const getTimeLeft = (departureAt) => {
    const diff = new Date(departureAt).getTime() - Date.now();
    if (diff <= 0) return null;

    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60)
    };
};

export default function CountdownTimer({ departureAt }) {
    const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(departureAt));

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(getTimeLeft(departureAt));
        }, 1000);
        return () => clearInterval(interval);
    }, [departureAt]);

    if (!timeLeft) {
        return <span className="text-sm font-semibold text-red-500">Departed</span>;
    }

    return (
        <div className="flex gap-3 text-sm font-semibold">
            <span>{timeLeft.days}d</span>
            <span>{timeLeft.hours}h</span>
            <span>{timeLeft.minutes}m</span>
            <span>{timeLeft.seconds}s</span>
        </div>
    );
}
