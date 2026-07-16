"use client";

import React from "react";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  return (
    <AuthProvider>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />
        <main style={{ flex: 1, paddingTop: "var(--nav-height)" }}>
          {children}
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
};
export default ClientLayout;
