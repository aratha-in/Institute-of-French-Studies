"use client";

import React from "react";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer style={{
      backgroundColor: "var(--primary)",
      color: "rgba(255, 255, 255, 0.8)",
      padding: "80px 0 40px 0",
      marginTop: "auto",
      borderTop: "1px solid rgba(212, 175, 55, 0.2)", // Subtle gold border accent on top of reverse deep blue
      background: "linear-gradient(to bottom, var(--primary-light) 0%, var(--primary) 100%)"
    }}>
      <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "40px", marginBottom: "60px" }}>
        
        {/* About Column */}
        <div>
          <h3 className="footer-title" style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
            <img 
              src="/logo.svg" 
              alt="Francophile French Logo" 
              style={{ 
                height: "55px", 
                width: "auto",
                objectFit: "contain",
                filter: "brightness(0) invert(1)"
              }} 
            />
          </h3>
          <p className="footer-text" style={{ marginBottom: "16px" }}>
            Promoting French language and culture through premium education, tailored courses, and authentic immersive experiences.
          </p>
          <div className="social-links">
            <a 
              href="https://www.instagram.com/francophilefrench/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link-btn" 
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a 
              href="https://www.facebook.com/FrancophileFrench" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link-btn" 
              aria-label="Facebook"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a 
              href="https://www.linkedin.com/company/francophile-french/?viewAsMember=true" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link-btn" 
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a 
              href="https://www.youtube.com/@francophilefrenchindia" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link-btn" 
              aria-label="YouTube"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 className="footer-heading">
            Quick Links
          </h4>
          <ul className="footer-list" style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.9rem" }}>
            <li>
              <Link href="/" className="footer-link">
                Home
              </Link>
            </li>
            <li>
              <Link href="/courses" className="footer-link">
                Courses
              </Link>
            </li>
            <li>
              <Link href="/about" className="footer-link">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="footer-link">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h4 className="footer-heading">
            Contact Info
          </h4>
          <p className="footer-text" style={{ marginBottom: "8px" }}>
            📍 Mailing Address: 29, 401, Hira Mansion, 5-9, opp. to Paigah Plaza, Hill Fort, Adarsh Nagar, Hyderabad, Telangana 500004
          </p>
          <p className="footer-text" style={{ marginBottom: "8px" }}>
            📞 Admissions & Helpdesk: +91 9000-266-171
          </p>
          <p className="footer-text">
            ✉️ info@francophilefrench.com
          </p>
        </div>

      </div>

      <div className="container" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", fontSize: "0.85rem", opacity: 0.7, color: "rgba(255, 255, 255, 0.8)" }}>
        <p>© {new Date().getFullYear()} Francophile French. All rights reserved.</p>
        <p>Designed By <a href="https://aratha.in" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", color: "inherit" }}>Aratha</a></p>
      </div>

      <style jsx>{`
        .footer-title {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          color: var(--white);
          margin-bottom: 20px;
          font-weight: 700;
        }
        .footer-heading {
          font-family: var(--font-sans);
          font-weight: 600;
          font-size: 1.1rem;
          margin-bottom: 20px;
          color: var(--white);
          letter-spacing: 0.5px;
        }
        .footer-text {
          font-size: 0.9rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.8);
        }
        .footer-link {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          transition: all 0.25s ease;
          display: inline-block;
        }
        .footer-link:hover {
          color: var(--accent) !important;
          transform: translateX(4px);
        }
        .footer-list li {
          display: block;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
