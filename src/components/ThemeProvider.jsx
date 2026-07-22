'use client';

import { createContext, useContext, useEffect, useState } from 'react';
 
const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const stored = localStorage.getItem('tb-theme') || 'light';
        setTheme(stored);
        document.documentElement.classList.toggle('dark', stored === 'dark');
    }, []);

    const toggleTheme = () => {
        const next = theme === 'light' ? 'dark' : 'light';
        setTheme(next);
        localStorage.setItem('tb-theme', next);
        document.documentElement.classList.toggle('dark', next === 'dark');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
