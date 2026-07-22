import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'TicketBari | Book Bus, Train, Launch & Flight Tickets',
    description: 'Discover and book bus, train, launch and flight tickets across the country with TicketBari.'
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg-white text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
                <ThemeProvider>
                    <Navbar />
                    <main className="min-h-screen">{children}</main>
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
