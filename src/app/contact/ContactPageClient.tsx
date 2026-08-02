"use client";

import React, { useState } from "react";

export default function ContactPageClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    if (!name || !email || !message) {
      setStatus({ type: "error", text: "Please complete all fields in the form." });
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit inquiry.");
      }

      setStatus({
        type: "success",
        text: "Merci! Your inquiry has been submitted. Our admissions team will email you shortly."
      });
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      console.error("Submit inquiry error:", err);
      setStatus({
        type: "error",
        text: err.message || "Could not submit inquiry. Please try again later."
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <section className="page-header">
        <div className="container">
          <span className="badge badge-primary" style={{ marginBottom: "12px" }}>Contactez-nous</span>
          <h1 className="page-title">Connect With Us</h1>
          <p className="subtitle" style={{ margin: "0 auto" }}>
            Have questions about levels, registration, or certifications? Send us a message.
          </p>
        </div>
      </section>

      {/* Grid Content */}
      <section className="section">
        <div className="container grid-contact">
          
          {/* Info Side */}
          <div>
            <span className="badge badge-gold" style={{ marginBottom: "16px" }}>L'Institut de Hyderabad</span>
            <h2 style={{ fontSize: "2.2rem", marginBottom: "24px" }}>Francophile French</h2>
            
            <p style={{ marginBottom: "32px", opacity: 0.85, fontSize: "0.95rem", lineHeight: "1.7" }}>
              Our offices are located in Hyderabad. Whether visiting in person or joining our classes, we look forward to assisting you.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div style={{ display: "flex", gap: "16px" }}>
                <span style={{ fontSize: "1.8rem" }}>📍</span>
                <div>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "4px" }}>Mailing Address</h4>
                  <p style={{ fontSize: "0.9rem", opacity: 0.7 }}>29, 401, Hira Mansion, 5-9, opp. to Paigah Plaza, Hill Fort, Adarsh Nagar, Hyderabad, Telangana 500004</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "16px" }}>
                <span style={{ fontSize: "1.8rem" }}>📞</span>
                <div>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "4px" }}>Admissions & Helpdesk</h4>
                  <p style={{ fontSize: "0.9rem", opacity: 0.7 }}><span style={{ marginRight: "6px" }}>+91</span>9000-266-171</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "16px" }}>
                <span style={{ fontSize: "1.8rem" }}>✉️</span>
                <div>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "4px" }}>Admissions Email</h4>
                  <p style={{ fontSize: "0.9rem", opacity: 0.7 }}>info@francophilefrench.com</p>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div style={{ marginTop: "40px", borderTop: "1px solid rgba(9, 92, 71, 0.1)", paddingTop: "32px" }}>
              <h4 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "16px", color: "var(--primary)" }}>Suivez-nous (Follow Us)</h4>
              <div className="social-badge-container">
                <a 
                  href="https://www.instagram.com/francophilefrench/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-badge"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  <span>Instagram</span>
                </a>
                <a 
                  href="https://www.facebook.com/FrancophileFrench" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-badge"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                  <span>Facebook</span>
                </a>
                <a 
                  href="https://www.linkedin.com/company/francophile-french/?viewAsMember=true" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-badge"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  <span>LinkedIn</span>
                </a>
                <a 
                  href="https://www.youtube.com/@francophilefrenchindia" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-badge"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                  </svg>
                  <span>YouTube</span>
                </a>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div>
            <div className="glass-card" style={{ padding: "40px" }}>
              <h3 style={{ fontSize: "1.6rem", marginBottom: "24px", fontFamily: "var(--font-serif)" }}>
                Send an Inquiry
              </h3>

              {status && (
                <div style={{
                  padding: "12px",
                  borderRadius: "var(--radius-sm)",
                  backgroundColor: status.type === "success" ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
                  border: `1px solid ${status.type === "success" ? "var(--success)" : "var(--error)"}`,
                  color: status.type === "success" ? "var(--success)" : "var(--error)",
                  fontSize: "0.9rem",
                  marginBottom: "24px"
                }}>
                  {status.text}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group" style={{ display: "flex", flexDirection: "column", marginBottom: "20px" }}>
                  <label className="form-label" htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    className="form-input"
                    placeholder="Jean Dupont"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group" style={{ display: "flex", flexDirection: "column", marginBottom: "20px" }}>
                  <label className="form-label" htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    className="form-input"
                    placeholder="jean.dupont@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group" style={{ display: "flex", flexDirection: "column", marginBottom: "24px" }}>
                  <label className="form-label" htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    className="form-input"
                    rows={5}
                    placeholder="Explain your goals, questions, or desired study schedule..."
                    style={{ resize: "vertical", fontFamily: "var(--font-sans)" }}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "100%", padding: "14px", fontSize: "1rem" }}
                  disabled={submitting}
                >
                  {submitting ? "Sending Inquiry..." : "Submit Inquiry"}
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
