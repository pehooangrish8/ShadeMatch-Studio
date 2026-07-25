# ShadeMatch Studio

ShadeMatch Studio is a polished beauty-tech experience built with React, TypeScript, Vite, and Tailwind CSS. It showcases a luxury-style interface for personalized beauty discovery, including shade matching, virtual lookbooks, booking appointments, and a lightweight analytics dashboard.

## Overview

This project is a single-page application that helps users:

- create and manage a beauty profile
- explore curated beauty products
- compare foundation shades and undertones
- save favorite looks and wishlists
- book beauty appointments
- view a visual dashboard of beauty insights

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Framer Motion / Motion
- Recharts
- Lucide React

## Project Structure

- src/ - application source code
  - components/ - reusable UI components
  - context/ - app-wide state management
  - data/ - mock content and sample data
  - pages/ - route-based views
  - types.ts - shared TypeScript interfaces
- public/ - static assets
- index.html - Vite HTML entry
- package.json - scripts and dependencies
- vite.config.ts - Vite configuration

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm or pnpm

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

The app will be available at:

- http://localhost:3000

### Build for production

```bash
npm run build
```

### Lint/type-check

```bash
npm run lint
```

## Available Scripts

- npm run dev - start the development server
- npm run build - create a production build
- npm run preview - preview the production build locally
- npm run lint - run TypeScript checks
- npm run clean - remove build artifacts

## Notes

- The app uses browser localStorage for profile, cart, wishlist, looks, and appointments.
- Most content is currently mock-driven and is ideal for showcasing UI/UX flows.
- The UI is designed with a soft luxury aesthetic and uses custom gradients and animation.

## Suggested Next Steps

- connect real APIs for beauty profiles and products
- add authentication and persistent user accounts
- wire appointment booking to a backend service
- expand analytics with real user behavior data
