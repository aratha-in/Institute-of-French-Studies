"use client";

import React, { useState } from "react";

export default function ContactPage() {
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
                  <p style={{ fontSize: "0.9rem", opacity: 0.7 }}>+91 9000266171</p>
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
