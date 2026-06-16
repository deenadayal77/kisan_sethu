"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser, getToken, setUser, setToken, clearToken } from "@/lib/auth";
import { api } from "@/lib/api";
import type { User } from "@/types";

export function useAuth() {
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    const storedUser = getUser();

    if (token && storedUser) {
      setUserState(storedUser);
    }

    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const { user, access_token } = await api.login(email, password);
    setToken(access_token);
    setUser(user);
    setUserState(user);
    return user;
  };

  const register = async (data: any) => {
    const { user, access_token } = await api.register(data);
    setToken(access_token);
    setUser(user);
    setUserState(user);
    return user;
  };

  const logout = () => {
    clearToken();
    setUserState(null);
    router.push("/");
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };
}
