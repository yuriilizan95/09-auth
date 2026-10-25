"use client";

import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const setAuth = useAuthStore((state) => state.setUser);
  const clearAuth = useAuthStore((state) => state.clearIsAuthenticated);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        await checkSession();
        const user = await getMe();
        setAuth(user);
      } catch {
        clearAuth();
      }
    };
    fetchSession();
  }, [clearAuth, setAuth]);
  return children;
};

export default AuthProvider;
