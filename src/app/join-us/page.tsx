"use client";

import React, { useState } from "react";

export default function JoinUsPage() {
  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("French Language Instructor (FLE)");
  const [message, setMessage] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate network latency
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      // Reset form
      setName("");
      setEmail("");
      setMessage("");
      setResumeUrl("");
    }, 1200);
  };

  const positions = [
    {
      title: "French Language Instructor (FLE)",
      type: "Full-Time / Part-Time",
      description: "Deliver high-quality French as a foreign language instruction for levels A1 through C2. Prepare students for DELF/DALF examinations.",
      requirements: [
        "Master's Degree in FLE (Français Langue Étrangère) or equivalent.",
        "Demonstrated experience in communicative, action-oriented teaching methods.",
        "Native or near-native French proficiency (minimum C1 level)."
      ]
    },
    {
      title: "Academic Coordinator",
      type: "Full-Time",
      description: "Manage academic timetabling, coordinate instructor resources, oversee curriculum alignment with CEFR standards, and advise students on progression paths.",
      requirements: [
        "Bachelor's or Master's in Education, Linguistics, or related field.",
        "Minimum 2 years administrative or coordination experience in a language school.",
        "Bilingual fluency in French and English."
      ]
    }
  ];

  return (
    <div style={{ padding: "60px 0" }}>
      <div className="container" style={{ maxWidth: "1000px" }}>
        
        {/* Page Header */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <span className="badge badge-gold" style={{ marginBottom: "16px" }}>Careers at IFS</span>
          <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>Rejoignez Notre Équipe</h1>
          <p className="subtitle" style={{ margin: "0 auto", maxWidth: "700px" }}>
            Join a passionate community of educators and cultural ambassadors. Help us shape the future of French language learning.
          </p>
        </div>

        {/* Benefits Section */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px", marginBottom: "60px" }}>
          <div className="glass-card" style={{ padding: "24px" }}>
            <span style={{ fontSize: "2rem" }}>🎓</span>
            <h4 style={{ fontSize: "1.2rem", fontWeight: "600", margin: "12px 0 8px 0" }}>Pedagogical Freedom</h4>
            <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>
              Develop creative lesson plans based on European action-oriented methodologies, supported by premium digital resources.
            </p>
          </div>
          <div className="glass-card" style={{ padding: "24px" }}>
            <span style={{ fontSize: "2rem" }}>🌟</span>
            <h4 style={{ fontSize: "1.2rem", fontWeight: "600", margin: "12px 0 8px 0" }}>Professional Growth</h4>
            <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>
              Receive regular training workshops, DELF/DALF examiner certification support, and path options toward academic coordination.
            </p>
          </div>
          <div className="glass-card" style={{ padding: "24px" }}>
            <span style={{ fontSize: "2rem" }}>🏛️</span>
            <h4 style={{ fontSize: "1.2rem", fontWeight: "600", margin: "12px 0 8px 0" }}>Vibrant Community</h4>
            <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>
              Teach in modern, glassmorphic facilities with access to our library of over 15,000 literary and cinematic works.
            </p>
          </div>
        </div>

        {/* Positions & Form Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "start" }} className="grid-responsive-2">
          
          {/* Vacancies List */}
          <div>
            <h2 style={{ fontSize: "1.8rem", marginBottom: "24px", fontFamily: "var(--font-serif)" }}>Open Positions</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {positions.map((pos, idx) => (
                <div key={idx} className="glass-card" style={{ padding: "28px", border: "1px solid var(--card-border)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px", marginBottom: "12px" }}>
                    <h3 style={{ fontSize: "1.3rem", fontWeight: "700" }}>{pos.title}</h3>
                    <span className="badge badge-primary" style={{ fontSize: "0.75rem" }}>{pos.type}</span>
                  </div>
                  <p style={{ fontSize: "0.9rem", opacity: 0.8, marginBottom: "16px" }}>{pos.description}</p>
                  <h5 style={{ fontWeight: "600", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px", color: "var(--primary)" }}>Requirements:</h5>
                  <ul style={{ paddingLeft: "18px", fontSize: "0.85rem", opacity: 0.9, display: "flex", flexDirection: "column", gap: "6px" }}>
                    {pos.requirements.map((req, rIdx) => (
                      <li key={rIdx}>{req}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Application Form */}
          <div className="glass-card" style={{ padding: "36px", border: "1px solid var(--card-border)", boxShadow: "var(--shadow-md)" }}>
            <h2 style={{ fontSize: "1.8rem", marginBottom: "8px", fontFamily: "var(--font-serif)" }}>Apply Now</h2>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "24px" }}>
              Submit your curriculum vitae and join our team of instructors.
            </p>

            {submitted ? (
              <div style={{
                textAlign: "center",
                padding: "40px 20px",
                background: "rgba(16, 185, 129, 0.06)",
                border: "1px solid var(--success)",
                borderRadius: "12px"
              }} className="animate-fade-in">
                <span style={{ fontSize: "3rem" }}>🎉</span>
                <h3 style={{ color: "var(--success)", fontSize: "1.4rem", margin: "16px 0 8px 0" }}>Candidature Envoyée!</h3>
                <p style={{ fontSize: "0.9rem", opacity: 0.9, marginBottom: "24px" }}>
                  Thank you for applying to the Institute. Our academic recruitment board will review your profile and respond within 5 business days.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn btn-outline" style={{ fontSize: "0.85rem" }}>
                  Submit Another Application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                
                {/* Full Name */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label htmlFor="fullname" style={{ fontSize: "0.85rem", fontWeight: "600" }}>Full Name</label>
                  <input
                    id="fullname"
                    type="text"
                    placeholder="Jean Dupont"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid var(--card-border)",
                      background: "rgba(255, 255, 255, 0.9)",
                      fontSize: "0.95rem"
                    }}
                    required
                  />
                </div>

                {/* Email Address */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label htmlFor="email" style={{ fontSize: "0.85rem", fontWeight: "600" }}>Email Address</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="jean.dupont@exemple.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid var(--card-border)",
                      background: "rgba(255, 255, 255, 0.9)",
                      fontSize: "0.95rem"
                    }}
                    required
                  />
                </div>

                {/* Position Applied For */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label htmlFor="position" style={{ fontSize: "0.85rem", fontWeight: "600" }}>Position</label>
                  <select
                    id="position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    style={{
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid var(--card-border)",
                      background: "rgba(255, 255, 255, 0.9)",
                      fontSize: "0.95rem"
                    }}
                    required
                  >
                    <option value="French Language Instructor (FLE)">French Language Instructor (FLE)</option>
                    <option value="Academic Coordinator">Academic Coordinator</option>
                  </select>
                </div>

                {/* Resume Link */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label htmlFor="resume" style={{ fontSize: "0.85rem", fontWeight: "600" }}>LinkedIn / Portfolio Link</label>
                  <input
                    id="resume"
                    type="url"
                    placeholder="https://linkedin.com/in/jeandupont"
                    value={resumeUrl}
                    onChange={(e) => setResumeUrl(e.target.value)}
                    style={{
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid var(--card-border)",
                      background: "rgba(255, 255, 255, 0.9)",
                      fontSize: "0.95rem"
                    }}
                    required
                  />
                </div>

                {/* Statement of Motivation */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label htmlFor="message" style={{ fontSize: "0.85rem", fontWeight: "600" }}>Statement of Motivation</label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Tell us briefly why you would like to join the Institute of French Studies..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{
                      padding: "12px 14px",
                      borderRadius: "8px",
                      border: "1px solid var(--card-border)",
                      background: "rgba(255, 255, 255, 0.9)",
                      fontSize: "0.95rem",
                      resize: "vertical",
                      fontFamily: "inherit"
                    }}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "100%", padding: "12px", marginTop: "10px", fontSize: "1rem" }}
                  disabled={submitting}
                >
                  {submitting ? "Submitting Application..." : "Submit Application / Postuler"}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
