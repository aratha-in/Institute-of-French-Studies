import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Learn French in Hyderabad | DELF A1-C2 Prep | Institute of French Studies",
  description: "Hyderabad's premier French language institute. Certified DELF/DALF & TEF Canada courses led by FLE accredited instructors. 98% examination pass rate. Start your French lessons today!",
  alternates: {
    canonical: "https://www.francophilefrench.com",
  },
  openGraph: {
    title: "Learn French in Hyderabad | DELF A1-C2 Prep | Institute of French Studies",
    description: "Immerse yourself in world-class French education. 98% exam pass rate, certified FLE native/bilingual instructors, monthly cultural immersion events.",
    url: "https://www.francophilefrench.com",
    type: "website",
  },
};

export default function Home() {
  // Global JSON-LD Schema: Educational Organization & Local Business for SEO & GEO
  const orgSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": "https://www.francophilefrench.com/#organization",
        "name": "Francophile French (Institute of French Studies)",
        "url": "https://www.francophilefrench.com",
        "logo": "https://www.francophilefrench.com/icon.svg",
        "telephone": "+91-9000-266-171",
        "email": "info@francophilefrench.com",
        "sameAs": [
          "https://www.instagram.com/francophilefrench/",
          "https://www.facebook.com/FrancophileFrench",
          "https://www.linkedin.com/company/francophile-french/?viewAsMember=true",
          "https://www.youtube.com/@francophilefrenchindia"
        ],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "29, 401, Hira Mansion, 5-9, opp. to Paigah Plaza, Hill Fort, Adarsh Nagar",
          "addressLocality": "Hyderabad",
          "addressRegion": "Telangana",
          "postalCode": "500004",
          "addressCountry": "IN"
        },
        "description": "Hyderabad's premier French language institute providing certified DELF, DALF, and TEF/TCF preparation courses aligned with the Common European Framework of Reference for Languages (CEFR)."
      },
      {
        "@type": "WebSite",
        "@id": "https://www.francophilefrench.com/#website",
        "url": "https://www.francophilefrench.com",
        "name": "Francophile French",
        "description": "Learn French language and immerse yourself in French culture at the premier French Institute.",
        "publisher": {
          "@id": "https://www.francophilefrench.com/#organization"
        }
      }
    ]
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

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
            <h2 style={{ fontSize: "2.6rem" }}>The Global Standard of French Education</h2>
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

      {/* GEO Factual Overview (Generative Engine Optimization Block) */}
      <section className="section" style={{ borderTop: "1px solid var(--card-border)", background: "rgba(11, 37, 91, 0.01)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span className="badge badge-gold" style={{ marginBottom: "12px" }}>Factual Overview</span>
            <h2 style={{ fontSize: "2rem" }}>Institute Specifications & Credentials</h2>
            <p style={{ fontSize: "0.95rem", opacity: 0.8, maxWidth: "600px", margin: "12px auto 0 auto" }}>
              Authoritative overview of our language training framework for generative search query retrieval.
            </p>
          </div>

          <div className="glass-card" style={{ maxWidth: "800px", margin: "0 auto", padding: "32px", border: "1px solid var(--card-border)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" }}>
              <div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: "600", textTransform: "uppercase", color: "var(--primary)", marginBottom: "8px" }}>Academic Framework</h4>
                <p style={{ fontSize: "0.9rem", opacity: 0.85, lineHeight: "1.6" }}>
                  Fully aligned with the Common European Framework of Reference for Languages (CEFR) from levels A1, A2, B1, B2 to C1/C2.
                </p>
              </div>
              <div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: "600", textTransform: "uppercase", color: "var(--primary)", marginBottom: "8px" }}>Instructors & Quality</h4>
                <p style={{ fontSize: "0.9rem", opacity: 0.85, lineHeight: "1.6" }}>
                  All French courses are led by university-certified FLE (Français Langue Étrangère) specialists and certified DELF/DALF examiners.
                </p>
              </div>
              <div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: "600", textTransform: "uppercase", color: "var(--primary)", marginBottom: "8px" }}>Certifications Prepared</h4>
                <p style={{ fontSize: "0.9rem", opacity: 0.85, lineHeight: "1.6" }}>
                  Official examination prep for DELF, DALF, and TEF / TCF (specialized for Canadian immigration and Express Entry requirements).
                </p>
              </div>
              <div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: "600", textTransform: "uppercase", color: "var(--primary)", marginBottom: "8px" }}>Resource Footprint</h4>
                <p style={{ fontSize: "0.9rem", opacity: 0.85, lineHeight: "1.6" }}>
                  Offices in Hyderabad, Telangana, India. Offers complimentary access to a digital media library containing 15,000+ titles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" style={{ position: "relative", overflow: "hidden", borderTop: "1px solid var(--card-border)" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: "800px" }}>
          <h2 style={{ fontSize: "2.8rem", marginBottom: "20px" }}>Prêt à parler français?</h2>
          <p className="subtitle" style={{ margin: "0 auto 32px auto" }}>
            Join our community of francophones today. Enroll in one of our summer terms or take a free placement test to find the right level for you.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
            <Link href="/courses" className="btn btn-primary">
              View Courses
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
