"use client";

import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container grid-responsive-2" style={{ alignItems: "center" }}>
          <div className="hero-content animate-fade-in">
            <span className="badge badge-primary" style={{ marginBottom: "16px" }}>Bienvenue chez Francophile French</span>
            <h1 style={{ marginBottom: "20px" }}>
              Master the Language of <span className="text-gradient">Diplomacy & Culture</span>
            </h1>
            <p className="subtitle" style={{ fontSize: "1.15rem", marginBottom: "36px" }}>
              Immerse yourself in world-class French education. From absolute beginners to advanced literature classes, learn from certified instructors at the premier Francophile French.
            </p>
            <div style={{ display: "flex", gap: "16px" }}>
              <Link href="/courses" className="btn btn-primary">
                Explore Courses
              </Link>
              <Link href="/about" className="btn btn-outline">
                Our Methodology
              </Link>
            </div>
          </div>

          {/* Visual Showcase (Glassmorphic Accent Container) */}
          <div className="animate-fade-in delay-1" style={{ display: "flex", justifyContent: "center" }}>
            <div className="glass-card" style={{
              width: "100%",
              maxWidth: "450px",
              padding: "40px",
              position: "relative",
              overflow: "hidden",
              border: "1px solid var(--card-border)",
              boxShadow: "var(--shadow-lg)"
            }}>
              {/* French Flag Ribbon Accent */}
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "6px",
                display: "flex"
              }}>
                <div style={{ flex: 1, backgroundColor: "#002395" }}></div>
                <div style={{ flex: 1, backgroundColor: "#FFFFFF" }}></div>
                <div style={{ flex: 1, backgroundColor: "#ED2939" }}></div>
              </div>

              <h3 style={{ fontSize: "1.8rem", marginBottom: "16px", fontFamily: "var(--font-serif)" }}>
                Start Your Journey
              </h3>
              <p style={{ fontSize: "0.95rem", opacity: 0.8, marginBottom: "24px" }}>
                Sign up for an evaluation test to discover your DELF level, or request a brochure of our academic schedules.
              </p>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "8px", background: "rgba(11,37,91,0.04)" }}>
                  <span style={{ fontSize: "1.5rem" }}>💬</span>
                  <div>
                    <h5 style={{ fontWeight: "600", fontSize: "0.9rem" }}>Free Placement Test</h5>
                    <p style={{ fontSize: "0.8rem", opacity: 0.7 }}>15-minute quick assessment</p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "8px", background: "rgba(11,37,91,0.04)" }}>
                  <span style={{ fontSize: "1.5rem" }}>🎓</span>
                  <div>
                    <h5 style={{ fontWeight: "600", fontSize: "0.9rem" }}>Official Certifications</h5>
                    <p style={{ fontSize: "0.8rem", opacity: 0.7 }}>DELF, DALF & TEF training</p>
                  </div>
                </div>
              </div>

              <Link href="/free-test" className="btn btn-secondary" style={{ width: "100%", marginTop: "24px", textAlign: "center" }}>
                Take Free Test
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: "60px 0", background: "var(--primary)", color: "var(--white)" }}>
        <div className="container">
          <div className="grid-3" style={{ textAlign: "center" }}>
            <div>
              <h2 style={{ color: "var(--accent)", fontSize: "3rem", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>1,500+</h2>
              <p style={{ fontSize: "1rem", opacity: 0.8, fontWeight: "500" }}>Active Students Annually</p>
            </div>
            <div>
              <h2 style={{ color: "var(--accent)", fontSize: "3rem", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>98%</h2>
              <p style={{ fontSize: "1rem", opacity: 0.8, fontWeight: "500" }}>DELF/DALF Examination Pass Rate</p>
            </div>
            <div>
              <h2 style={{ color: "var(--accent)", fontSize: "3rem", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>15+</h2>
              <p style={{ fontSize: "1rem", opacity: 0.8, fontWeight: "500" }}>Certified Instructors</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section" style={{ backgroundColor: "rgba(11,37,91,0.02)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <span className="badge badge-primary" style={{ marginBottom: "12px" }}>Why Study With Us</span>
            <h2 style={{ fontSize: "2.6rem" }}>The Gold Standard of French Education</h2>
          </div>

          <div className="grid-3">
            <div className="glass-card">
              <span style={{ fontSize: "2.5rem" }}>🍷</span>
              <h3 style={{ fontSize: "1.4rem", margin: "16px 0 12px 0" }}>Cultural Immersion</h3>
              <p style={{ fontSize: "0.95rem", opacity: 0.8 }}>
                Learning a language is more than grammar. Enjoy monthly wine tastings, cinema clubs, literature discussions, and culinary workshops.
              </p>
            </div>

            <div className="glass-card">
              <span style={{ fontSize: "2.5rem" }}>🎯</span>
              <h3 style={{ fontSize: "1.4rem", margin: "16px 0 12px 0" }}>DELF Aligned Curriculum</h3>
              <p style={{ fontSize: "0.95rem", opacity: 0.8 }}>
                Our curriculum follows the Common European Framework of Reference for Languages, guaranteeing global recognition for your progress.
              </p>
            </div>

            <div className="glass-card">
              <span style={{ fontSize: "2.5rem" }}>🕒</span>
              <h3 style={{ fontSize: "1.4rem", margin: "16px 0 12px 0" }}>Flexible Schedules</h3>
              <p style={{ fontSize: "0.95rem", opacity: 0.8 }}>
                Choose between intensive morning crash courses, weekend workshops, or evening classes tailored for busy working professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" style={{ position: "relative", overflow: "hidden" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: "800px" }}>
          <h2 style={{ fontSize: "2.8rem", marginBottom: "20px" }}>Prêt à parler français?</h2>
          <p className="subtitle" style={{ margin: "0 auto 32px auto" }}>
            Join our community of francophones today. Enroll in one of our summer terms or take a free placement test to find the right level for you.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
            <Link href="/courses" className="btn btn-primary">
              View Active Courses
            </Link>
            <Link href="/contact" className="btn btn-outline">
              Contact Admissions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
