import { User } from "@/types/user";
import { create } from "zustand";

interface AuthStoreProps {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
}

export const useAuthStore = create<AuthStoreProps>()((set) => {
  return {
    isAuthenticated: false,
    user: null,
    setUser: (user: User) => set({ user, isAuthenticated: true }),
    clearIsAuthenticated: () => set({ isAuthenticated: false, user: null }),
  };
});
