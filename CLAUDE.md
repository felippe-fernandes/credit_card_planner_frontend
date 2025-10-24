# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Documentation Access

**IMPORTANT**: Always use the Context7 MCP server tools for accessing up-to-date library documentation:

1. First resolve the library ID: `mcp__mcp-server-context7__resolve-library-id` with the library name
2. Then fetch documentation: `mcp__mcp-server-context7__get-library-docs` with the resolved Context7-compatible library ID

Use Context7 for all major dependencies:
- Next.js (`/vercel/next.js`)
- TanStack Query (`/tanstack/query`)
- React Hook Form, Zod, Tailwind CSS, shadcn/ui, etc.

## Project Overview

This is the Next.js 15 frontend for a credit card expense tracking application. It communicates with a NestJS backend API and uses Supabase for authentication session management.

**Stack**: Next.js 15 (App Router) + React 19 + TanStack Query + Supabase Auth + Tailwind CSS + shadcn/ui

## Development Commands

```bash
# Development
npm run dev                    # Start development server with Turbopack (http://localhost:3000)

# Production
npm run build                  # Build for production
npm run start                  # Start production server

# Code Quality
npm run lint                   # Run Next.js linter with ESLint
```

## Architecture Overview

### Authentication System

**Hybrid Approach**: Combines backend API with Supabase client-side session management.

**Flow**:
1. `AuthService` (services/auth/) calls backend `/auth/login` or `/auth/signup`
2. Backend validates credentials and returns Supabase tokens (access_token, refresh_token)
3. Frontend sets session via `supabase.auth.setSession()` (lib/supabaseClient.ts)
4. `AuthContext` (context/AuthContext.tsx) manages auth state using:
   - TanStack Query for session data fetching
   - Supabase `onAuthStateChange` listener for real-time updates
   - Automatic token derivation from session
5. Protected routes use `(private)` route group with auth check in layout (app/(private)/layout.tsx)

**Key Files**:
- `context/AuthContext.tsx` - Auth state management, `useAuth()` hook
- `services/auth/index.ts` - Login/signup API calls
- `lib/supabaseClient.ts` - Supabase client initialization
- `app/(private)/layout.tsx` - Protected route wrapper with redirect logic

### API Integration Pattern

**Axios Configuration** (lib/axios.ts):
- Base URL from validated environment variables (lib/env.ts)
- Credentials automatically included (`withCredentials: true`)
- Centralized error handling via `handleAxiosRequest` helper

**Response Interface**: All API calls expect `IResponseBase<T>` (types/api/index.ts):
```typescript
{
  message: string;
  statusCode: HttpStatusCode;
  data: T;           // or result: T (varies by endpoint)
  count?: number;
  success: boolean;
}
```

**Important**: Some endpoints return `result` instead of `data` (e.g., auth endpoints). Check the service implementation.

### Service Layer Pattern

Services use **class-based architecture** with optional mock mode support:

```typescript
class FeatureService {
  useMock: boolean;
  constructor(useMock?: boolean) {
    this.useMock = useMock ?? false;
  }

  public async getData(): Promise<ResponseType> {
    return await handleAxiosRequest({
      path: "/endpoint",
      method: "get",
    });
  }
}
```

**Instantiation**: Always use `useServiceClient` hook (hooks/useServiceClient/):
```typescript
const AuthClient = useServiceClient({ service: AuthService });
```

**Mock Mode**: Append `?useMock=true` to URL to enable mock mode for testing without backend.

**Existing Services**:
- `services/auth/` - Authentication (login, signup)
- `services/cards/` - Credit card management
- `services/categories/` - Expense categories
- `services/dependents/` - Dependent management
- `services/invoices/` - Invoice operations
- `services/transactions/` - Transaction management

### State Management

- **Server State**: TanStack Query (React Query) via `QueryClientProvider`
  - Default config: no retry, no refetch on window focus
  - Configured in `utils/Wrapper.tsx`
- **Auth State**: React Context (`AuthContext`) with TanStack Query
- **Form State**: react-hook-form + Zod validation
- **Local State**: Zustand (when needed, not heavily used)
- **UI State**: React `useState` for component-specific state

### Type System Organization

```
types/
├── api/          # API response interfaces (IResponseBase)
├── auth/         # Auth types (LoginRequest, SignupRequest, LoginResponse)
└── entities/     # Domain models (Card, Transaction, Invoice, Category, Dependent)

schemas/
├── api/          # Zod validation schemas for API requests
└── entities/     # Entity schemas
```

**Pattern**: Define Zod schema first, then infer TypeScript types:
```typescript
const loginSchema = z.object({ email: z.string().email(), password: z.string() });
type LoginRequest = z.infer<typeof loginSchema>;
```

### Component Architecture

```
app/
├── (private)/           # Protected routes (requires authentication)
│   ├── layout.tsx       # Auth check, redirect logic, Header + Sidebar
│   ├── page.tsx         # Home/dashboard redirect
│   └── dashboard/       # Dashboard page
├── login/               # Public login page
├── signup/              # Public signup page
└── layout.tsx           # Root layout with Wrapper (providers + fonts)

components/
├── common/              # Shared components (Button, Input, Header, Loader, Sidebar)
├── ui/                  # shadcn/ui primitives (button, card, dialog, etc.)
├── login/               # Login form component
└── signup/              # Signup form component
```

**Route Protection**: Place new authenticated routes under `app/(private)/`. The layout automatically:
- Shows loading skeleton during auth check
- Redirects to `/login` if unauthenticated
- Renders Header + Sidebar for authenticated users

### Styling System

- **Tailwind CSS 4** with custom configuration (tailwind.config.ts)
- **shadcn/ui** for UI primitives (installed via `components.json`)
- **Utility Function**: `cn()` from lib/utils.ts for conditional className merging
- **Fonts**: Geist Sans + Geist Mono (loaded in app/layout.tsx)
- **Theme**: Light/dark mode support via `ThemeProvider` (context/ThemeContext.tsx)

**Adding shadcn Components**:
```bash
npx shadcn add <component-name>
```

### Provider Hierarchy

Wrappers applied in `utils/Wrapper.tsx` (order matters):
1. **Suspense** - Loading fallback (`LoadingPage` component)
2. **ThemeProvider** - Theme state management
3. **QueryClientProvider** - TanStack Query setup
4. **AuthProvider** - Auth context + session management
5. **Toaster** - Toast notifications (sonner)

### Environment Variables

Defined in `.env.local` and validated via Zod in `lib/env.ts`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001  # Backend API URL
NEXT_PUBLIC_SUPABASE_URL=                       # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=                  # Supabase anonymous key (JWT)
```

**Validation**: The app will fail to start if environment variables are missing or invalid.

## Common Development Workflows

### Adding a New Feature Service

1. Create service class in `services/[feature]/index.ts`:
```typescript
export class FeatureService {
  useMock: boolean;
  constructor(useMock?: boolean) { this.useMock = useMock ?? false; }

  public async getItems(): Promise<ResponseType> {
    return await handleAxiosRequest({ path: "/feature", method: "get" });
  }
}
```

2. Define types in `types/entities/[feature].ts`
3. Create Zod schemas in `schemas/api/[feature].schema.ts`
4. Use service in components via `useServiceClient`

### Implementing a Form with Validation

1. Define Zod schema in `schemas/api/`:
```typescript
export const createItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  amount: z.number().positive(),
});
export type CreateItemRequest = z.infer<typeof createItemSchema>;
```

2. Create form component with react-hook-form:
```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const { register, handleSubmit, formState: { errors } } = useForm<CreateItemRequest>({
  resolver: zodResolver(createItemSchema),
});
```

3. Wrap submission in TanStack Query mutation:
```typescript
const { mutate, isPending } = useMutation({
  mutationFn: async (data: CreateItemRequest) => await ServiceClient.create(data),
  onSuccess: () => { toast.success("Created!"); queryClient.invalidateQueries({ queryKey: ["items"] }); },
  onError: (error) => { toast.error(error.message); },
});
```

4. Handle submission:
```typescript
const onSubmit = (data: CreateItemRequest) => mutate(data);
return <form onSubmit={handleSubmit(onSubmit)}>...</form>;
```

### Adding a Protected Route

1. Create page under `app/(private)/[feature]/page.tsx`
2. Use `"use client"` directive if you need hooks/state
3. Access auth via `const { session, token } = useAuth()`
4. Fetch data with TanStack Query:
```typescript
const { data, isLoading } = useQuery({
  queryKey: ["feature"],
  queryFn: async () => await FeatureClient.getData(),
});
```

### Adding a shadcn/ui Component

1. Run: `npx shadcn add <component-name>`
2. Component added to `components/ui/`
3. Import and use: `import { Component } from "@/components/ui/component"`

### Styling Guidelines

- Use Tailwind utility classes directly in JSX
- Use `cn()` for conditional classes: `cn("base-class", condition && "conditional-class")`
- Follow existing patterns: `flex`, `gap-*`, `p-*`, `rounded-*`, `bg-*`, `text-*`
- Responsive: `md:`, `lg:` prefixes for breakpoints
- Dark mode: `dark:` prefix (auto-managed by ThemeProvider)

## Key Patterns to Follow

### Service Instantiation
Always use `useServiceClient` hook instead of directly instantiating services:
```typescript
// ✅ Correct
const ServiceClient = useServiceClient({ service: FeatureService });

// ❌ Wrong
const ServiceClient = new FeatureService();
```

### API Error Handling
`handleAxiosRequest` automatically throws errors. Catch them in mutation `onError`:
```typescript
onError: (error: Error) => {
  toast.error(error.message);
}
```

### Query Invalidation
After mutations, invalidate related queries to refetch data:
```typescript
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: ["items"] });
}
```

### Protected Routes
All authenticated pages go under `app/(private)/`. Never implement custom auth checks.

### Environment Variables
Always access via `env` object from `lib/env.ts`, never `process.env` directly.

## Project Structure Notes

- **No `src/` directory**: Next.js App Router uses top-level `app/` directory
- **Route Groups**: `(private)` creates shared layout without affecting URL
- **Colocation**: Feature components live in `components/[feature]/`
- **Utilities**: Shared utilities in `lib/`, app-specific in `utils/`
- **Public Assets**: Static files in `public/` (images, icons, etc.)

## Related Documentation

- For backend architecture and API contracts, see `../credit_card_planner_backend/CLAUDE.md`
- For full-stack overview, see `../CLAUDE.md` at repository root
