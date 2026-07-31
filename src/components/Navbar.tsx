"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import GoogleTranslate from "./GoogleTranslate";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when page route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent background scrolling when mobile navigation drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Base links available to everyone
  const links = [
    { name: "Home", path: "/" },
    { name: "Cours", path: "/courses" },
    { name: "À Propos", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Join Us", path: "/join-us" },
  ];

  return (
    <header className="header-nav">
      <div className="container nav-container">
        <Link href="/" className="logo" onClick={() => setIsMobileMenuOpen(false)} style={{ display: "flex", alignItems: "center" }}>
          <img 
            src="/logo.svg" 
            alt="Francophile French Logo" 
            style={{ 
              height: "45px", 
              width: "auto",
              objectFit: "contain"
            }} 
          />
        </Link>

        {/* Mobile Menu Toggle Hamburger */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}>
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>

        <nav>
          <ul className={`nav-links ${isMobileMenuOpen ? "mobile-active" : ""}`}>
            {links.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className={`nav-link ${pathname === link.path ? "active" : ""}`}
                >
                  {link.name}
                </Link>
              </li>
            ))}

            <li style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <GoogleTranslate />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
