# Credit Card Planner - Frontend

A modern, full-featured expense tracking application designed to help you manage your credit card expenses, invoices, and transactions with ease. This is the frontend application built with Next.js 15 and React 19.

## 🔗 Backend Repository

This frontend application requires the backend API to function. You can find the backend repository at:
**[credit_card_planner_backend](https://github.com/felippe-fernandes/credit_card_planner_backend)**

## 🧪 Test Credentials

For recruiters and evaluators who want to explore the application with pre-filled data:

- **Email:** `teste@teste.com`
- **Password:** `123456`

This test account contains sample data including credit cards, transactions, invoices, and categories to demonstrate the full functionality of the application.

## ✨ Features

- **🔐 Secure Authentication**: Login and signup with JWT-based authentication via Supabase
- **💳 Credit Card Management**: Add, edit, and manage multiple credit cards
- **📊 Transaction Tracking**: Record and categorize all your credit card transactions
- **🧾 Invoice Management**: Track monthly invoices for each credit card
- **📂 Category Organization**: Organize transactions by custom categories
- **👥 Dependent Support**: Manage expenses for family members or dependents
- **📱 Responsive Design**: Fully responsive interface that works on desktop, tablet, and mobile
- **🌓 Dark Mode**: Built-in dark mode support for comfortable viewing
- **📈 Dashboard Analytics**: Visualize your spending patterns and track expenses with charts
- **🔄 Real-time Updates**: Instant synchronization with the backend API
- **📅 Date Handling**: Advanced date filtering and formatting with date-fns
- **♿ Accessibility**: Built with Radix UI for superior accessibility

## 🛠️ Tech Stack

### Core Framework
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router and Turbopack
- **[React 19](https://react.dev/)** - Latest version of React UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development

### State Management & Data Fetching
- **[TanStack Query v5](https://tanstack.com/query)** - Powerful server state management
- **[Zustand](https://github.com/pmndrs/zustand)** - Lightweight local state management
- **[Axios](https://axios-http.com/)** - Promise-based HTTP client

### Authentication
- **[Supabase Auth](https://supabase.com/docs/guides/auth)** - Robust authentication provider with JWT

### Forms & Validation
- **[React Hook Form](https://react-hook-form.com/)** - Performant form management
- **[@hookform/resolvers](https://github.com/react-hook-form/resolvers)** - Form validation resolvers
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

### UI Components & Styling
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - High-quality re-usable components
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible component primitives:
  - Avatar, Dialog, Dropdown Menu, Label, Popover
  - Progress, Scroll Area, Select, Separator, Slot, Tabs
- **[Lucide React](https://lucide.dev/)** - Beautiful, consistent icon library
- **[React Icons](https://react-icons.github.io/react-icons/)** - Additional icon sets
- **[class-variance-authority](https://cva.style/)** - CVA for component variants
- **[clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Conditional className utilities
- **[tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate)** - Animation utilities

### Data Visualization
- **[Recharts](https://recharts.org/)** - Composable charting library for React

### UI Utilities
- **[Sonner](https://sonner.emilkowal.ski/)** - Elegant toast notifications
- **[cmdk](https://cmdk.paco.me/)** - Command menu component
- **[react-day-picker](https://react-day-picker.js.org/)** - Date picker component
- **[date-fns](https://date-fns.org/)** - Modern date utility library

### Development Tools
- **[Turbopack](https://turbo.build/pack)** - Next.js 15's fast bundler
- **[ESLint](https://eslint.org/)** - Code linting and quality
- **[PostCSS](https://postcss.org/)** - CSS transformation
- **[Geist Font](https://vercel.com/font)** - Modern, optimized font family

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 20.x or higher
- **npm**, **yarn**, **pnpm**, or **bun**
- The **backend API** running (see [backend repository](https://github.com/felippe-fernandes/credit_card_planner_backend))
- A **Supabase account** (free tier works fine)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/felippe-fernandes/credit_card_planner_frontend.git
cd credit_card_planner_frontend
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Configure environment variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Backend API URL (make sure your backend is running)
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Note:**
- You'll need to create a Supabase project at [supabase.com](https://supabase.com)
- Get your credentials from your Supabase project settings
- The backend should be configured with the same Supabase project
- Environment variables are validated at runtime using Zod schemas

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack (fast HMR)

# Production
npm run build        # Build optimized production bundle
npm run start        # Start production server

# Code Quality
npm run lint         # Run Next.js ESLint checks
```

## 🏗️ Project Structure

```
credit_card_planner_frontend/
├── app/                      # Next.js 15 App Router
│   ├── (private)/           # Protected routes (requires authentication)
│   │   ├── layout.tsx       # Protected layout with Header + Sidebar
│   │   ├── page.tsx         # Dashboard redirect
│   │   ├── dashboard/       # Dashboard with analytics
│   │   ├── cards/           # Credit card management
│   │   ├── transactions/    # Transaction CRUD operations
│   │   ├── invoices/        # Invoice management
│   │   ├── categories/      # Category management
│   │   └── dependents/      # Dependent management
│   ├── login/               # Public login page
│   ├── signup/              # Public signup page
│   ├── layout.tsx           # Root layout with providers
│   └── globals.css          # Global styles
│
├── components/              # React components
│   ├── common/             # Shared components (Button, Input, Header, etc.)
│   ├── ui/                 # shadcn/ui components (auto-generated)
│   ├── login/              # Login form component
│   ├── signup/             # Signup form component
│   ├── cards/              # Card-specific components
│   ├── transactions/       # Transaction components
│   ├── invoices/           # Invoice components
│   ├── categories/         # Category components
│   └── dependents/         # Dependent components
│
├── context/                # React Context providers
│   ├── AuthContext.tsx     # Authentication state management
│   └── ThemeContext.tsx    # Theme (light/dark mode) management
│
├── hooks/                  # Custom React hooks
│   ├── useServiceClient/   # Service instantiation hook
│   └── [other hooks]/      # Feature-specific hooks
│
├── lib/                    # Core utilities and configurations
│   ├── axios.ts           # Axios instance with interceptors
│   ├── env.ts             # Environment variable validation (Zod)
│   ├── supabaseClient.ts  # Supabase client initialization
│   └── utils.ts           # Utility functions (cn, etc.)
│
├── schemas/               # Zod validation schemas
│   ├── api/              # API request/response schemas
│   └── entities/         # Domain entity schemas
│
├── services/             # API service layer (class-based)
│   ├── auth/            # Authentication service
│   ├── cards/           # Credit card service
│   ├── transactions/    # Transaction service
│   ├── invoices/        # Invoice service
│   ├── categories/      # Category service
│   └── dependents/      # Dependent service
│
├── types/               # TypeScript type definitions
│   ├── api/            # API types (IResponseBase, etc.)
│   ├── auth/           # Auth types (LoginRequest, SignupRequest)
│   └── entities/       # Entity types (Card, Transaction, Invoice)
│
├── utils/              # App-specific utilities
│   └── Wrapper.tsx     # Provider wrapper component
│
├── styles/             # Global styles
│
├── public/             # Static assets (images, icons, etc.)
│
├── components.json     # shadcn/ui configuration
├── tailwind.config.ts  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── next.config.ts      # Next.js configuration
```

## 🏛️ Architecture Overview

### Authentication Flow

1. User submits login/signup form
2. Frontend calls backend API (`/auth/login` or `/auth/signup`)
3. Backend validates credentials and returns Supabase tokens (access_token, refresh_token)
4. Frontend establishes Supabase session via `supabase.auth.setSession()`
5. `AuthContext` manages auth state using TanStack Query
6. Supabase `onAuthStateChange` listener keeps session synchronized
7. Protected routes automatically redirect unauthenticated users to `/login`

### API Integration Pattern

All API calls follow a consistent, type-safe pattern:

1. **Service Layer**: Class-based services in `services/` directory
2. **Type Safety**: Request/response types defined with Zod schemas, then inferred
3. **Error Handling**: Centralized via `handleAxiosRequest` helper in `lib/axios.ts`
4. **State Management**: TanStack Query for server state caching and synchronization
5. **Service Instantiation**: Always via `useServiceClient` hook (supports mock mode)

**Example API call:**

```typescript
// Service (services/cards/index.ts)
export class CardService {
  public async getCards(): Promise<IResponseBase<Card[]>> {
    return await handleAxiosRequest({
      path: "/cards",
      method: "get",
    });
  }
}

// Component usage
const CardClient = useServiceClient({ service: CardService });
const { data, isLoading } = useQuery({
  queryKey: ["cards"],
  queryFn: async () => await CardClient.getCards(),
});
```

### State Management Strategy

- **Server State**: TanStack Query v5 for API data (automatic caching, refetching, and synchronization)
- **Auth State**: React Context (`AuthContext`) with TanStack Query integration
- **Form State**: React Hook Form with Zod validation for type-safe forms
- **Local State**: Zustand for cross-component state when Context is too heavy
- **UI State**: React `useState`/`useReducer` for component-specific state

### Route Protection

All authenticated routes are placed under `app/(private)/`. The layout (`app/(private)/layout.tsx`) automatically:

- Shows loading skeleton during authentication check
- Redirects to `/login` if user is not authenticated
- Renders Header and Sidebar for authenticated users
- Provides access to auth context via `useAuth()` hook

**No manual auth checks needed** - just place your page under `(private)/`!

### Provider Hierarchy

Providers are wrapped in `utils/Wrapper.tsx` in the following order (matters for dependency):

1. **Suspense** - Loading fallback (`LoadingPage` component)
2. **ThemeProvider** - Light/dark mode state
3. **QueryClientProvider** - TanStack Query setup
4. **AuthProvider** - Authentication state + Supabase session
5. **Toaster** - Toast notifications (Sonner)

## 🎨 Styling System

The application uses Tailwind CSS 4 with a custom configuration and shadcn/ui components for a consistent, modern design system.

### Key Features

- **Utility-first approach**: Compose styles directly in JSX
- **Custom theme**: Defined in `tailwind.config.ts`
- **Dark mode**: Automatic via `ThemeProvider` with `dark:` prefix
- **Responsive**: Mobile-first with `sm:`, `md:`, `lg:`, `xl:` breakpoints
- **Animations**: Built-in with `tailwindcss-animate`
- **Typography**: Geist Sans and Geist Mono fonts

### Adding shadcn/ui Components

To add new components from shadcn/ui:

```bash
npx shadcn add <component-name>
```

Examples:
```bash
npx shadcn add button
npx shadcn add dialog
npx shadcn add form
```

Components are automatically added to `components/ui/` and can be customized.

## 🔌 API Integration

This frontend communicates with the NestJS backend API. The base URL is configured via the `NEXT_PUBLIC_API_BASE_URL` environment variable.

### Expected Response Format

All API endpoints return responses in the following format:

```typescript
interface IResponseBase<T> {
  message: string;
  statusCode: number;
  data: T;           // or result: T (varies by endpoint)
  count?: number;    // for paginated responses
  success: boolean;
}
```

### Available Services

- **AuthService** - Login, signup, session management
- **CardService** - CRUD operations for credit cards
- **TransactionService** - Transaction management
- **InvoiceService** - Invoice operations
- **CategoryService** - Category management
- **DependentService** - Dependent user management

## 🧪 Mock Mode

The application supports a **mock mode** for testing without the backend. Append `?useMock=true` to any URL to enable mock responses from services.

**Example:**
```
http://localhost:3000/dashboard?useMock=true
```

This is useful for:
- Frontend development without backend dependency
- UI/UX testing
- Demos and presentations

## 🔒 Environment Variables

All environment variables are validated at runtime using Zod schemas (`lib/env.ts`). The app will fail to start if required variables are missing or invalid.

**Required variables:**

```env
NEXT_PUBLIC_API_BASE_URL      # Backend API URL (must be valid URL)
NEXT_PUBLIC_SUPABASE_URL      # Supabase project URL (must be valid URL)
NEXT_PUBLIC_SUPABASE_ANON_KEY # Supabase anonymous key (JWT)
```

## 🚢 Deployment

### Vercel (Recommended)

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new):

1. Push your code to GitHub
2. Import your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy automatically on every push

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/felippe-fernandes/credit_card_planner_frontend)

### Other Platforms

You can also deploy to:
- **Netlify** - Configure build command: `npm run build`, publish directory: `.next`
- **AWS Amplify** - Use Next.js 15 preset
- **Docker** - Create Dockerfile with Node.js 20+ base image

**Important**: Make sure to configure environment variables on your deployment platform.

## 🧑‍💻 Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow ESLint rules (`npm run lint`)
- Use functional components with hooks
- Prefer `const` over `let`, avoid `var`
- Use descriptive variable names

### Component Patterns

```typescript
// Prefer this pattern
"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function MyComponent() {
  const [state, setState] = useState<string>("");

  const { data, isLoading } = useQuery({
    queryKey: ["key"],
    queryFn: fetchFunction,
  });

  if (isLoading) return <div>Loading...</div>;

  return <div>{/* component JSX */}</div>;
}
```

### Service Pattern

```typescript
// Always use useServiceClient hook
const ServiceClient = useServiceClient({ service: MyService });

// Use TanStack Query for data fetching
const { data } = useQuery({
  queryKey: ["myData"],
  queryFn: async () => await ServiceClient.getData(),
});

// Use mutations for data modification
const { mutate } = useMutation({
  mutationFn: async (data) => await ServiceClient.create(data),
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ["myData"] }),
});
```

### Form Pattern

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mySchema } from "@/schemas/api/my.schema";

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(mySchema),
});

const onSubmit = (data: MyFormData) => {
  // Handle form submission
};
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Commit Convention

We follow conventional commits:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Test additions or changes
- `chore:` - Build process or auxiliary tool changes

## 📝 License

This project is part of a personal portfolio and is available for educational purposes.

## 👤 Author

**Felippe Fernandes**

- GitHub: [@felippe-fernandes](https://github.com/felippe-fernandes)
- LinkedIn: [Felippe Fernandes](https://www.linkedin.com/in/felippe-fernandes/)

## 🙏 Acknowledgments

- **Framework**: [Next.js](https://nextjs.org/) by Vercel
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) by shadcn
- **Icons**: [Lucide](https://lucide.dev/) and [React Icons](https://react-icons.github.io/)
- **Authentication**: [Supabase](https://supabase.com/)
- **State Management**: [TanStack Query](https://tanstack.com/query) by Tanner Linsley
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

---

**Important Notes:**

1. **Backend Required**: Make sure the backend API is running before starting the frontend. See the [backend repository](https://github.com/felippe-fernandes/credit_card_planner_backend) for setup instructions.

2. **Supabase Setup**: You need to create a Supabase project and configure it in both frontend and backend.

3. **Environment Variables**: The app validates environment variables at startup and will fail if they're missing or invalid.

4. **Test Account**: Use `teste@teste.com` / `123456` to explore the app with sample data.

