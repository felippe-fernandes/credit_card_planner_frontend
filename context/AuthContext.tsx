import { supabase } from "@/lib/supabaseClient";
import type { Session } from "@supabase/supabase-js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useEffect } from "react";

type AuthContextType = {
  session: Session | null;
  token: string | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();

  const { data: session, isLoading } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const {
        data: { session: supabaseSession },
      } = await supabase.auth.getSession();
      return supabaseSession;
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  // Derivar token diretamente da sessão
  const token = session?.access_token || null;

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        queryClient.setQueryData(["session"], newSession);

        // Handle token expiration or sign out events
        if (event === "SIGNED_OUT" || event === "TOKEN_REFRESHED") {
          if (!newSession && typeof window !== "undefined") {
            // Session expired or user was signed out
            window.location.href = "/login";
          }
        }


      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [queryClient]);

  const signOutMutation = useMutation({
    mutationFn: async () => {
      await supabase.auth.signOut();
    },
  });

  const signOut = async () => {
    await signOutMutation.mutateAsync();
    queryClient.setQueryData(["session"], null);
  };

  return (
    <AuthContext.Provider value={{ session: session ?? null, token, isLoading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro do AuthProvider");
  }
  return context;
};
