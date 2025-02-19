import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

// Tipo da sessão
interface Session {
  user: User;
  access_token: string;
  error: string | null;
}

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        setSession(null);
      } else {
        setSession(
          data.session
            ? {
                user: data.session.user,
                access_token: data.session.access_token,
                error: null,
              }
            : null
        );
      }
    };

    getSession();

    setSession(
      session
        ? {
            user: session.user,
            access_token: session.access_token,
            error: null,
          }
        : null
    );

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(
          session
            ? {
                user: session.user,
                access_token: session.access_token,
                error: null,
              }
            : null
        );
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [session]);

  return session;
}
