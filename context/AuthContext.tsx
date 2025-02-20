import { supabase } from "@/lib/supabaseClient";
import { Session } from "@supabase/supabase-js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  session: Session | null;
  token: string | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const [session, setSession] = useState<Session | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const savedSession = localStorage.getItem("supabase-session");
      if (savedSession) {
        const parsedSession: Session = JSON.parse(savedSession);
        return parsedSession;
      }
      return null;
    },
  });

  useEffect(() => {
    if (data) {
      setSession(data);
      setToken(data.access_token);
    }
  }, [data]);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
        setToken(newSession?.access_token || null);

        if (newSession) {
          localStorage.setItem("supabase-session", JSON.stringify(newSession));
          console.log("Nov sessão. Logando...");
        } else if (_event === "SIGNED_OUT") {
          console.log("Token inválido ou sessão expirada. Deslogando...");
        } else {
          console.log("Deslogado...");
          localStorage.removeItem("supabase-session");
        }

        queryClient.invalidateQueries({ queryKey: ["session"] });
      }
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
    setSession(null);
    setToken(null);
    localStorage.removeItem("supabase-session");
    queryClient.invalidateQueries({ queryKey: ["session"] });
  };

  return (
    <AuthContext.Provider value={{ session, token, isLoading, signOut }}>
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
