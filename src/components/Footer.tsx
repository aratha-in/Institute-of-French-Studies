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
          <h3 className="footer-title">
            Francophile French
          </h3>
          <p className="footer-text" style={{ marginBottom: "16px" }}>
            Promoting French language and culture through premium education, tailored courses, and authentic immersive experiences.
          </p>
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
                Nos Cours (Our Courses)
              </Link>
            </li>
            <li>
              <Link href="/about" className="footer-link">
                À Propos (About Us)
              </Link>
            </li>
            <li>
              <Link href="/contact" className="footer-link">
                Contactez-nous (Contact)
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
            📍 29, 401, Hira Mansion, 5-9, opp. to Paigah Plaza, Hill Fort, Adarsh Nagar, Hyderabad, Telangana 500004
          </p>
          <p className="footer-text" style={{ marginBottom: "8px" }}>
            📞 +91 9000266171
          </p>
          <p className="footer-text">
            ✉️ info@francophilefrench.com
          </p>
        </div>



      </div>

      <div className="container" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", fontSize: "0.85rem", opacity: 0.7, color: "rgba(255, 255, 255, 0.8)" }}>
        <p>© {new Date().getFullYear()} Francophile French. All rights reserved.</p>
        <p>Designed with ❤️ for French language enthusiasts.</p>
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
