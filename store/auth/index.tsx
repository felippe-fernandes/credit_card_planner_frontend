import { AuthService } from "@/services/auth";
import { create } from "zustand";

interface AuthState {
  token: string | null;
  user: { id: string; email: string } | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,

  login: async (email, password) => {
    try {
      const authService = new AuthService();
      const response = await authService.Login({ email, password });

      if (response.data?.access_token) {
        const token = response.data.access_token;
        const user = response.data.user;

        set({ token, user, isAuthenticated: true });
        localStorage.setItem("authToken", token);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  },

  logout: () => {
    set({ token: null, user: null, isAuthenticated: false });
    localStorage.removeItem("authToken");
  },

  checkAuth: async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      set({ token: null, user: null, isAuthenticated: false });
      return;
    }

    try {
      const authService = new AuthService();
      const response = await authService.Check();

      if (response.data?.isAuthenticated) {
        set({ isAuthenticated: true });
      } else {
        set({ token: null, user: null, isAuthenticated: false });
        localStorage.removeItem("authToken");
      }
    } catch {
      set({ token: null, user: null, isAuthenticated: false });
      localStorage.removeItem("authToken");
    }
  },
}));
