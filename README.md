# MyAfriMall - Frontend

The frontend application for MyAfriMall, a shipping and logistics platform enabling seamless delivery to over 300 countries from Nigeria.

Built with [Next.js](https://nextjs.org) 16, React 19, and TypeScript.

## Features

- **Sign Up** - User registration with first name, last name, email, phone (+234), and password
- **Sign In** - Email/password login with password visibility toggle
- **Dashboard** - Overview of shipments, balance, exports/imports, growth chart, and recent shipment tracking
- **Auth Protection** - Dashboard is protected; unauthenticated users are redirected to login

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Forms**: React Hook Form + Zod validation
- **State**: React Context (AuthContext)
- **Fonts**: DM Sans (primary), Montserrat (available)
- **Animations**: Framer Motion

## Project Structure

```
src/
  app/
    (landing)/page.tsx     # Redirects to /login
    login/page.tsx         # Sign in page
    register/page.tsx      # Sign up page
    dashboard/page.tsx     # Dashboard (protected)
    layout.tsx             # Root layout with providers and fonts
    globals.css            # Tailwind theme, custom colors, animations
  components/
    auth/AuthLayout.tsx    # Split-screen auth layout with decorative panel
    dashboard/
      Sidebar.tsx          # Navigation sidebar with user profile
      OverviewSection.tsx  # Balance card and stat cards
      GrowthChart.tsx      # SVG line chart for company growth
      ShipmentList.tsx     # Expandable shipment rows
  context/
    AuthContext.tsx         # Auth state management (token + user)
    Providers.tsx           # Client-side provider wrapper
  lib/
    api.ts                 # API client for backend communication
  utils/
    index.ts               # Tailwind class merge utility
```

## Getting Started

### Prerequisites

- Node.js 22.x
- The backend server running on port 8000

### Setup

```bash
# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local
# Edit .env.local with your backend API URL if needed

# Start the development server
npm run dev
```

Open [http://localhost:4096](http://localhost:4096) to view the app.

### Environment Variables

| Variable              | Default                        | Description          |
| --------------------- | ------------------------------ | -------------------- |
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000/api`    | Backend API base URL |

## Scripts

| Command          | Description                    |
| ---------------- | ------------------------------ |
| `npm run dev`    | Start dev server on port 4096  |
| `npm run build`  | Create production build        |
| `npm run start`  | Run production build           |
| `npm run lint`   | Run ESLint                     |
| `npm run format` | Format code with Prettier      |

## Design

The UI follows the Figma design provided for the MashonaDev technical assessment. Key design elements:

- Split-screen auth pages with form on the left and a decorative world map panel on the right
- Purple primary color (`#5A65AB`) used throughout for branding
- Dashboard with left sidebar navigation, stat cards, growth chart, and shipment list
- Responsive layout with mobile sidebar drawer
