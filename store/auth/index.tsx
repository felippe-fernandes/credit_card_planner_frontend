import { Session } from "@supabase/supabase-js";
import { create } from "zustand";

type TSession = {
  token: string | null;
  user: Session["user"] | null;
  isAuthenticated: boolean;
};

interface AuthState {
  session: TSession;
  addSession: (session: TSession) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: {
    token: null,
    user: null,
    isAuthenticated: false,
  },

  addSession: (session: TSession) =>
    set({
      session: {
        token: session.token,
        user: session.user,
        isAuthenticated: true,
      },
    }),
  clearSession: () =>
    set({ session: { token: null, user: null, isAuthenticated: false } }),

  // login: async (payload: LoginRequest) => {
  //   const { email, password } = payload;
  //   try {
  //     const authService = new AuthService();
  //     const response = await authService.Login({ email, password });

  //     if (response.data?.access_token) {
  //       const token = response.data.access_token;
  //       const user = response.data.user;

  //       set({ token, user, isAuthenticated: true });
  //       localStorage.setItem("authToken", token);
  //     }
  //   } catch (error) {
  //     const errorMessage = (error as AxiosError).message;
  //     set({ error: errorMessage });
  //     console.error("Login failed:", error);
  //   }
  // },

  // logout: () => {
  //   set({ token: null, user: null, isAuthenticated: false });
  //   localStorage.removeItem("authToken");
  // },

  // checkAuth: async () => {
  //   const token = localStorage.getItem("authToken");

  //   if (!token) {
  //     set({ session: { token: null, user: null, isAuthenticated: false } });
  //     return;
  //   }

  //   try {
  //     const authService = new AuthService();
  //     const response = await authService.Check();

  //     if (response.data?.isAuthenticated) {
  //       set({ session: { isAuthenticated: true, token, user } });
  //     } else {
  //       set({ token: null, user: null, isAuthenticated: false });
  //       localStorage.removeItem("authToken");
  //     }
  //   } catch {
  //     set({ token: null, user: null, isAuthenticated: false });
  //     localStorage.removeItem("authToken");
  //   }
  // },
}));
