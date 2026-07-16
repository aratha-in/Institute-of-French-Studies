"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore session or log in default user on mount
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem("ifs_token");
      const storedUser = localStorage.getItem("ifs_user");

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        setLoading(false);
      } else {
        try {
          const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: "student@frenchstudies.edu", password: "password123" }),
          });

          if (response.ok) {
            const data = await response.json();
            localStorage.setItem("ifs_token", data.token);
            localStorage.setItem("ifs_user", JSON.stringify(data.user));
            setToken(data.token);
            setUser(data.user);
          }
        } catch (err) {
          console.error("Auto-login error:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    // Keep login function interface for backward compatibility/types
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem("ifs_token");
    localStorage.removeItem("ifs_user");
    setToken(null);
    setUser(null);
    // Trigger window reload to trigger auto-login again
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
