/**
 * src/context/AuthContext.jsx
 * Colaba.ai — Global authentication state
 *
 * Usage:
 *   import { useAuth } from "../context/AuthContext";
 *   const { user, isAuthenticated, login, logout } = useAuth();
 */

import React, { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser, login as loginService, logout as logoutService } from "../services/authService";
import { STORAGE_KEYS } from "../utils/constants";
import { loadFromStorage } from "../utils/helpers";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(() => loadFromStorage(STORAGE_KEYS.USER_PROFILE, null));
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  /* Hydrate user from token on mount */
  useEffect(() => {
    const token = localStorage.getItem("colaba_token");
    if (token && !user) {
      setLoading(true);
      getCurrentUser()
        .then(setUser)
        .catch(() => setUser(null))
        .finally(() => setLoading(false));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function login(credentials) {
    setLoading(true);
    setError(null);
    try {
      const data = await loginService(credentials);
      setUser(data.user);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await logoutService();
    setUser(null);
  }

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    error,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
