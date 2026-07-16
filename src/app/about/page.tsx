"use client";

import React from "react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div>
      {/* Header */}
      <section className="page-header">
        <div className="container">
          <span className="badge badge-primary" style={{ marginBottom: "12px" }}>Alliance et Excellence</span>
          <h1 className="page-title">À Propos de L'Institut</h1>
          <p className="subtitle" style={{ margin: "0 auto" }}>
            Learn about our heritage, teaching philosophy, and commitment to academic excellence.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section">
        <div className="container grid-responsive-2" style={{ gap: "60px", alignItems: "center" }}>
          <div>
            <span className="badge badge-gold" style={{ marginBottom: "16px" }}>Our Approach</span>
            <h2 style={{ fontSize: "2.4rem", marginBottom: "24px" }}>The Student-Oriented French Learning Method</h2>
            <p style={{ marginBottom: "20px", fontSize: "1rem", lineHeight: "1.8", opacity: 0.9 }}>
              At Francophile French, we teach using the Student-Oriented Approach recommended by the Council of Europe (DELF). We treat language learners as active social agents who need to complete tasks in real-life contexts.
            </p>
            <p style={{ marginBottom: "24px", fontSize: "1rem", lineHeight: "1.8", opacity: 0.9 }}>
              Rather than memorizing abstract conjugations out of context, you will learn French through active simulation: conducting negotiations, arguing a thesis, expressing opinions, writing letters, and participating in debates.
            </p>
            <Link href="/courses" className="btn btn-primary">
              View Course Catalogue
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div className="glass-card" style={{ padding: "24px" }}>
              <h4 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "8px" }}>Certified Professors</h4>
              <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>
                All our instructors hold Masters degrees in Teaching French as a Foreign Language (FLE) and are certified examiners for DELF/DALF boards.
              </p>
            </div>
            <div className="glass-card" style={{ padding: "24px" }}>
              <h4 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "8px" }}>Modern Facilities & Media Library</h4>
              <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>
                Students gain complimentary access to a digital media library containing over 15,000 French books, films, and magazines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Levels */}
      <section className="section" style={{ backgroundColor: "rgba(11,37,91,0.02)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <span className="badge badge-primary" style={{ marginBottom: "12px" }}>DELF Framework</span>
            <h2 style={{ fontSize: "2.5rem" }}>French Language Levels Explained</h2>
            <p className="subtitle" style={{ margin: "0 auto 40px auto" }}>
              Our courses strictly align with the Common European Framework of Reference for Languages.
            </p>
          </div>

          <div className="grid-3" style={{ gap: "24px" }}>
            <div className="glass-card" style={{ borderTop: "4px solid #002395" }}>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "12px", fontFamily: "var(--font-sans)", fontWeight: "bold" }}>A1 & A2</h3>
              <h5 style={{ textTransform: "uppercase", fontSize: "0.8rem", color: "var(--secondary)", fontWeight: "600", marginBottom: "16px" }}>Beginner / Elementary</h5>
              <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>
                Understand and use familiar everyday expressions. Introduce yourself, ask and answer personal questions, and describe immediate needs simply.
              </p>
            </div>

            <div className="glass-card" style={{ borderTop: "4px solid #FFFFFF" }}>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "12px", fontFamily: "var(--font-sans)", fontWeight: "bold" }}>B1 & B2</h3>
              <h5 style={{ textTransform: "uppercase", fontSize: "0.8rem", color: "var(--secondary)", fontWeight: "600", marginBottom: "16px" }}>Intermediate / Upper Intermediate</h5>
              <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>
                Interact fluently with native speakers. Express detailed thoughts, draft correspondence, debate topics, and understand complex arguments.
              </p>
            </div>

            <div className="glass-card" style={{ borderTop: "4px solid #ED2939" }}>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "12px", fontFamily: "var(--font-sans)", fontWeight: "bold" }}>C1 & C2</h3>
              <h5 style={{ textTransform: "uppercase", fontSize: "0.8rem", color: "var(--secondary)", fontWeight: "600", marginBottom: "16px" }}>Advanced / Mastery</h5>
              <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>
                Express yourself fluently and spontaneously with no effort. Command language flexibility in professional, academic, and literary domains.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TEF/TCF Bundle Section */}
      <section className="section" style={{ borderTop: "1px solid var(--card-border)" }}>
        <div className="container grid-responsive-2" style={{ gap: "60px", alignItems: "center" }}>
          <div>
            <span className="badge badge-gold" style={{ marginBottom: "16px" }}>Exam Preparation</span>
            <h2 style={{ fontSize: "2.4rem", marginBottom: "24px" }}>TEF & TCF (A0 to B2)</h2>
            <p style={{ marginBottom: "20px", fontSize: "1rem", lineHeight: "1.8", opacity: 0.9 }}>
              Accelerate your language journey for immigration, university entrance, or career advancement. Our signature TEF/TCF program takes you from absolute beginner (A0) to upper-intermediate (B2) fluency in a highly structured, result-oriented format.
            </p>
            <ul style={{ marginBottom: "32px", paddingLeft: "20px", fontSize: "0.95rem", lineHeight: "1.8", opacity: 0.9, display: "flex", flexDirection: "column", gap: "10px" }}>
              <li>🎯 <strong>Complete Journey:</strong> Covers levels A0, A1, A2, B1, and B2 comprehensively.</li>
              <li>📝 <strong>Exam Focus:</strong> Specialized modules targeted at the structure of the TEF (Test d'Évaluation de Français) and TCF (Test de Connaissance du Français) exams.</li>
              <li>🗣️ <strong>Speaking & Writing Labs:</strong> Intensive practice for active communication to maximize your band scores.</li>
              <li>📊 <strong>Simulated Practice:</strong> Complete full-length mock examinations with detailed feedback from certified FLE instructors.</li>
            </ul>
            <a
              href={`https://wa.me/919000266171?text=${encodeURIComponent(
                `Bonjour! I want to inquire about the TEF/TCF program (A0 to B2). Please share details regarding schedules, fees, and next batches.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Inquire via WhatsApp
            </a>
          </div>

          <div className="glass-card" style={{ padding: "40px", border: "1px solid var(--card-border)", display: "flex", flexDirection: "column", gap: "24px" }}>
            <h3 style={{ fontSize: "1.6rem", marginBottom: "8px", fontFamily: "var(--font-serif)" }}>Bundle Highlights</h3>
            
            <div style={{ display: "flex", gap: "16px" }}>
              <span style={{ fontSize: "1.8rem" }}>📈</span>
              <div>
                <h4 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "4px" }}>Structured Syllabus</h4>
                <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>Tailored lessons designed specifically for test-taking skills, vocabulary building, and syntax mastering.</p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "16px" }}>
              <span style={{ fontSize: "1.8rem" }}>👩‍🏫</span>
              <div>
                <h4 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "4px" }}>Expert Guidance</h4>
                <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>Learn from instructors who are certified TEF/TCF exam evaluators with proven score track records.</p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "16px" }}>
              <span style={{ fontSize: "1.8rem" }}>🇨🇦</span>
              <div>
                <h4 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "4px" }}>Immigration Friendly</h4>
                <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>Get the exact support required to secure the CLB 7+ band score needed for Canadian immigration.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="section">
        <div className="container" style={{ maxWidth: "800px", textAlign: "center" }}>
          <h2 style={{ fontSize: "2.4rem", marginBottom: "20px" }}>Our Mission</h2>
          <p style={{ fontSize: "1.1rem", fontStyle: "italic", lineHeight: "1.8", color: "var(--primary-light)", marginBottom: "32px" }}>
            "To build bridges of intellectual, economic, and cultural friendship through language excellence."
          </p>
          <p style={{ opacity: 0.8, fontSize: "0.95rem", lineHeight: "1.8", marginBottom: "40px" }}>
            Established to provide world-class French language curriculum, we serve diplomatic missions, multinational corporations, universities, and individual language enthusiasts. As an official testing center, we help hundreds of candidates unlock global mobility and career pathways yearly.
          </p>
          <Link href="/contact" className="btn btn-secondary">
            Join the Next Term
          </Link>
        </div>
      </section>
    </div>
  );
}
