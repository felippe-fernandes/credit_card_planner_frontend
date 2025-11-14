# Credit Card Planner - Frontend

A modern web application for tracking and managing credit card expenses, built with Next.js 15 and React 19.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

> **Read this in other languages**: [Português (Brasil)](./README.PT.md)

## Overview

This is the frontend application for the Credit Card Planner system. It provides an intuitive interface for users to manage their credit cards, track expenses, organize transactions by categories, manage dependents, and monitor monthly invoices.

**Architecture Note**: This project follows a **microservices architecture** with separate frontend and backend repositories. This is not a monolithic application - the frontend and backend are independent projects that communicate via REST API.

### Key Features

- **Credit Card Management**: Add, edit, and track multiple credit cards
- **Transaction Tracking**: Record and categorize expenses with detailed information
- **Invoice Management**: View and organize monthly credit card invoices
- **Category Organization**: Categorize expenses for better financial insights
- **Dependent Management**: Track expenses made by dependents
- **Authentication**: Secure user authentication with Supabase
- **Dark Mode**: Built-in theme support for light and dark modes
- **Responsive Design**: Optimized for desktop and mobile devices

## Tech Stack

### Core Framework
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://reactjs.org/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety

### State Management & Data Fetching
- **[TanStack Query](https://tanstack.com/query)** (React Query) - Server state management
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Client state management
- **[React Hook Form](https://react-hook-form.com/)** - Form state management
- **[Zod](https://zod.dev/)** - Schema validation

### Styling & UI
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component library
- **[Geist Font](https://vercel.com/font)** - Modern font family

### Authentication & Backend
- **[Supabase](https://supabase.com/)** - Authentication and session management
- **[Axios](https://axios-http.com/)** - HTTP client for API communication
- **NestJS Backend** - RESTful API integration

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher
- **npm** 9.x or higher
- **Git**

You'll also need:
- A running instance of the **[Credit Card Planner Backend](https://github.com/felippe-fernandes/credit_card_planner_backend)** (separate repository)
- Supabase project credentials (URL and Anonymous Key)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/felippe-fernandes/credit_card_planner_frontend.git
cd credit_card_planner_frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Backend API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Required Environment Variables**:
- `NEXT_PUBLIC_API_BASE_URL` - URL of the NestJS backend API
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous (public) key

> **Note**: The application will fail to start if these variables are missing or invalid (validated via Zod).

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The application will automatically reload when you make changes to the code.

## Demo Account

For recruiters and evaluators, a test account is available to explore the application without needing to fill in data:

**Test User Credentials**:
- **Email**: `teste@teste.com`
- **Password**: `teste123`

> This account comes pre-populated with sample data (cards, transactions, invoices, categories) so you can immediately see the application's features in action.

## Available Scripts

```bash
npm run dev          # Start development server with Turbopack (http://localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint for code quality checks
```

## Project Structure

```
credit_card_planner_frontend/
├── app/                      # Next.js App Router pages
│   ├── (private)/            # Protected routes (requires authentication)
│   │   ├── dashboard/        # Dashboard page
│   │   ├── cards/            # Credit card management pages
│   │   ├── transactions/     # Transaction pages
│   │   ├── invoices/         # Invoice pages
│   │   ├── categories/       # Category management pages
│   │   ├── dependents/       # Dependent management pages
│   │   └── layout.tsx        # Protected routes layout (Header + Sidebar)
│   ├── login/                # Login page
│   ├── signup/               # Signup page
│   └── layout.tsx            # Root layout
├── components/               # React components
│   ├── common/               # Shared components (Header, Sidebar, etc.)
│   ├── ui/                   # shadcn/ui primitives
│   └── [feature]/            # Feature-specific components
├── context/                  # React Context providers
│   ├── AuthContext.tsx       # Authentication state
│   └── ThemeContext.tsx      # Theme state (light/dark)
├── hooks/                    # Custom React hooks
├── lib/                      # Shared utilities
│   ├── axios.ts              # Axios configuration
│   ├── supabaseClient.ts     # Supabase client
│   ├── env.ts                # Environment validation
│   └── utils.ts              # Utility functions
├── schemas/                  # Zod validation schemas
│   ├── api/                  # API request schemas
│   └── entities/             # Entity schemas
├── services/                 # API service classes
│   ├── auth/                 # Authentication service
│   ├── cards/                # Card service
│   ├── transactions/         # Transaction service
│   ├── invoices/             # Invoice service
│   ├── categories/           # Category service
│   └── dependents/           # Dependent service
├── types/                    # TypeScript type definitions
│   ├── api/                  # API response types
│   ├── auth/                 # Auth types
│   └── entities/             # Domain model types
└── utils/                    # App-specific utilities
```

## Architecture Highlights

### Authentication Flow

The application uses a hybrid authentication approach:

1. User submits credentials via login/signup form
2. Backend validates credentials and returns Supabase tokens
3. Frontend sets session using `supabase.auth.setSession()`
4. `AuthContext` manages auth state with TanStack Query
5. Protected routes automatically redirect unauthenticated users

All pages under `app/(private)/` are automatically protected.

### Service Pattern

Services are class-based and support optional mock mode:

```typescript
// Always use the useServiceClient hook
const CardService = useServiceClient({ service: CardsService });

// Use in TanStack Query
const { data } = useQuery({
  queryKey: ['cards'],
  queryFn: async () => await CardService.getCards(),
});
```

**Mock Mode**: Add `?useMock=true` to the URL to enable mock data without backend connection.

### Form Validation

Forms use React Hook Form with Zod validation:

```typescript
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(cardSchema),
});
```

### API Integration

All API calls use centralized error handling via `handleAxiosRequest` helper:

```typescript
return await handleAxiosRequest({
  path: '/cards',
  method: 'get',
});
```

## Development Guidelines

### Adding a New Feature

1. Create service in `services/[feature]/index.ts`
2. Define types in `types/entities/[feature].ts`
3. Create Zod schemas in `schemas/api/[feature].schema.ts`
4. Build UI components in `components/[feature]/`
5. Create pages under `app/(private)/[feature]/`

### Adding shadcn/ui Components

```bash
npx shadcn add <component-name>
```

Components are added to `components/ui/` and can be imported:

```typescript
import { Button } from "@/components/ui/button"
```

### Styling Guidelines

- Use Tailwind utility classes directly in JSX
- Use `cn()` helper for conditional classes
- Follow responsive design patterns (`md:`, `lg:` prefixes)
- Dark mode is automatically handled via `ThemeProvider`

## Documentation

For detailed development instructions, architecture patterns, and best practices, see:
- **[CLAUDE.md](./CLAUDE.md)** - Comprehensive developer guide

### Related Projects

This frontend application works with a separate backend API:
- **[Backend Repository](https://github.com/felippe-fernandes/credit_card_planner_backend)** - NestJS REST API (separate project)

> **Important**: Frontend and backend are intentionally separate repositories following a microservices architecture, not a monolithic structure.

## License

This project is licensed under the MIT License.

## Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact the maintainer

---

**Built with ❤️ using Next.js 15 and React 19**
