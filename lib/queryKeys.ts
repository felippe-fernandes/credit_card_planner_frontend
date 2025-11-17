export const queryKeys = {
  cards: {
    all: (filters?: Record<string, unknown>) => ["cards", filters] as const,
    single: (id: string) => ["card", id] as const,
  },
  categories: {
    all: (filters?: Record<string, unknown>) => ["categories", filters] as const,
    single: (name: string) => ["category", name] as const,
  },
  dependents: {
    all: (filters?: Record<string, unknown>) => ["dependents", filters] as const,
    single: (id: string) => ["dependent", id] as const,
  },
  transactions: {
    all: (filters?: Record<string, unknown>) => ["transactions", filters] as const,
    single: (id: string) => ["transaction", id] as const,
  },
  invoices: {
    all: (filters?: Record<string, unknown>) => ["invoices", filters] as const,
    single: (id: string) => ["invoice", id] as const,
  },
  user: {
    profile: () => ["user", "profile"] as const,
  },
  session: () => ["session"] as const,
} as const;
