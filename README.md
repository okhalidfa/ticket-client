# TicketBari Client

TicketBari is an online ticket booking platform where users can discover and book bus, train, launch and flight tickets. Built with Next.js App Router for the CAT-005 assignment.

## Purpose
Let users search and book travel tickets, vendors list and manage tickets, and admins moderate the platform end to end.

## Live URL
Add your deployed link here once hosted.

## Key Features
- Role based access: User, Vendor, Admin
- Email/password and Google login via BetterAuth
- JWT protected Express API
- Home page with hero slider, advertised tickets, latest tickets and extra sections
- All Tickets page with search by route, transport type filter, price sort and pagination
- Ticket details page with live countdown and a Book Now modal
- Stripe powered payments with automatic transaction logging
- Vendor dashboard: add/update/delete tickets, requested bookings, revenue chart
- Admin dashboard: approve/reject tickets, manage users, advertise tickets (max 6)
- Dark / light mode toggle
- Fully responsive on mobile, tablet and desktop

## Packages Used
better-auth, mongodb, next, react, react-dom, react-hook-form, recharts, stripe, sweetalert2, lucide-react, tailwindcss

## Setup
```
npm install
cp .env.example .env
npm run dev
```

Make sure the server project is running and `NEXT_PUBLIC_BASE_URL` points to it.
