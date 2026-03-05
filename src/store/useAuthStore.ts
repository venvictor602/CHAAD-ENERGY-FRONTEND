import { create } from "zustand";
import { tokenStorage } from "@/lib/token-storage";
import type { LoginResponse } from "@/types/app/response";

type User = LoginResponse["user"];

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setTokensFromResponse: (data: LoginResponse) => void;
  logout: () => void;
  hydrate: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),

  setTokensFromResponse: (data) => {
    if (data.access && data.refresh) {
      tokenStorage.setTokens(data.access, data.refresh);
      set({
        user: data.user ?? null,
        isAuthenticated: true,
      });
    }
  },

  logout: () => {
    tokenStorage.clearTokens();
    set({ user: null, isAuthenticated: false });
  },

  hydrate: () => {
    const hasTokens = tokenStorage.isAuthenticated();
    set({ isAuthenticated: hasTokens });
  },
}));
