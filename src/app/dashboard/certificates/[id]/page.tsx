"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

interface CertificateData {
  id: number;
  certificateNumber: string;
  studentName: string;
  courseTitle: string;
  level: string;
  issueDate: string;
  grade: string;
  status: string;
}

export default function CertificatePage() {
  const params = useParams();
  const router = useRouter();
  const { token, isAuthenticated, loading } = useAuth();
  const [certData, setCertData] = useState<CertificateData | null>(null);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertificateDetails = async () => {
      try {
        const response = await fetch(`/api/certificates/${params.id}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Failed to fetch certificate.");
        }

        const data = await response.json();
        setCertData(data);
      } catch (err: any) {
        console.error("Fetch certificate error:", err);
        setError(err.message || "Failed to load certificate. Make sure the ID is correct.");
      } finally {
        setFetching(false);
      }
    };

    if (!loading) {
      if (isAuthenticated && token && params.id) {
        fetchCertificateDetails();
      } else if (!isAuthenticated) {
        setError("Could not establish session with default student profile.");
        setFetching(false);
      }
    }
  }, [isAuthenticated, token, loading, params.id]);

  const handlePrint = () => {
    window.print();
  };

  if (loading || (fetching && !error)) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontSize: "1.2rem", opacity: 0.7 }}>Retrieving secure certificate...</p>
      </div>
    );
  }

  if (error || !certData) {
    return (
      <div className="container" style={{ padding: "80px 0", textAlign: "center" }}>
        <div className="glass-card" style={{ maxWidth: "500px", margin: "0 auto", padding: "40px" }}>
          <span style={{ fontSize: "3rem" }}>📜</span>
          <h2 style={{ margin: "20px 0 10px 0", color: "var(--error)" }}>Certificate Error</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "30px" }}>{error || "Certificate not found."}</p>
          <Link href="/dashboard" className="btn btn-primary">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="certificate-page-container" style={{ padding: "40px 0", minHeight: "85vh" }}>
      <div className="container">
        
        {/* Navigation & Print Controls */}
        <div className="no-print" style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          maxWidth: "850px", 
          margin: "0 auto 24px auto" 
        }}>
          <Link href="/dashboard" className="btn btn-outline" style={{ fontSize: "0.9rem" }}>
            ← Back to Dashboard
          </Link>
          <button onClick={handlePrint} className="btn btn-primary" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.9rem" }}>
            🖨️ Print / Download PDF
          </button>
        </div>

        {/* The Certificate Document */}
        <div className="certificate-document-wrapper" style={{
          maxWidth: "850px",
          margin: "0 auto",
          backgroundColor: "#181a1f",
          border: "4px double var(--gold)",
          borderRadius: "var(--radius-sm)",
          position: "relative",
          padding: "12px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.5)"
        }}>
          {/* Internal Border Accent */}
          <div style={{
            border: "1px solid rgba(212, 175, 55, 0.4)",
            padding: "48px 60px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative"
          }}>
            {/* French flag corners */}
            <div style={{ position: "absolute", top: "15px", left: "15px", display: "flex", gap: "2px" }}>
              <div style={{ width: "6px", height: "18px", backgroundColor: "#002395" }}></div>
              <div style={{ width: "6px", height: "18px", backgroundColor: "#FFFFFF" }}></div>
              <div style={{ width: "6px", height: "18px", backgroundColor: "#ED2939" }}></div>
            </div>
            
            {/* Gold Ribbon / Header Crest */}
            <div style={{ marginBottom: "20px" }}>
              <svg width="60" height="60" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="45" stroke="var(--gold)" strokeWidth="2" strokeDasharray="6 3" />
                <circle cx="50" cy="50" r="38" fill="var(--gold-dark)" opacity="0.2" />
                <path d="M50 22 L55 35 L68 35 L58 43 L62 56 L50 48 L38 56 L42 43 L32 35 L45 35 Z" fill="var(--gold)" />
              </svg>
            </div>

            {/* School Brand */}
            <h2 style={{ 
              fontFamily: "var(--font-serif)", 
              fontSize: "1.7rem", 
              letterSpacing: "3px", 
              color: "var(--gold)", 
              marginBottom: "4px",
              textTransform: "uppercase" 
            }}>
              L'Institut de Français
            </h2>
            <p style={{ 
              fontSize: "0.8rem", 
              letterSpacing: "4px", 
              opacity: 0.8, 
              textTransform: "uppercase", 
              marginBottom: "32px" 
            }}>
              Alliance et Excellence • Paris
            </p>

            {/* Certificate Declaration Header */}
            <h1 style={{ 
              fontFamily: "var(--font-serif)", 
              fontSize: "2.8rem", 
              color: "var(--white)", 
              marginBottom: "24px",
              fontWeight: "400" 
            }}>
              Certificat d'Études
            </h1>

            <p style={{ fontSize: "1rem", fontStyle: "italic", opacity: 0.8, marginBottom: "16px" }}>
              This is to certify that
            </p>

            {/* Student Name */}
            <h3 style={{ 
              fontFamily: "var(--font-serif)", 
              fontSize: "2.2rem", 
              color: "var(--gold)", 
              borderBottom: "1px solid rgba(212, 175, 55, 0.3)",
              paddingBottom: "8px",
              marginBottom: "20px",
              minWidth: "280px",
              fontWeight: "600"
            }}>
              {certData.studentName}
            </h3>

            <p style={{ fontSize: "1rem", fontStyle: "italic", opacity: 0.8, marginBottom: "16px" }}>
              has successfully completed the prescribed curriculum and passed all examinations for
            </p>

            {/* Course Title */}
            <h4 style={{ 
              fontFamily: "var(--font-sans)", 
              fontSize: "1.4rem", 
              color: "var(--white)", 
              marginBottom: "8px",
              fontWeight: "600" 
            }}>
              {certData.courseTitle}
            </h4>

            {/* Course Level Indicator */}
            <span className="badge badge-gold" style={{ fontSize: "0.9rem", padding: "6px 16px", marginBottom: "24px" }}>
              DELF Level {certData.level} (Grade: {certData.grade})
            </span>

            <p style={{ fontSize: "0.85rem", opacity: 0.7, marginBottom: "48px" }}>
              Granted on {new Date(certData.issueDate).toLocaleDateString()} at L'Institut de Français, Paris, France.
            </p>

            {/* Signatures & Seal Grid */}
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "1fr 1.2fr 1fr", 
              width: "100%", 
              alignItems: "center",
              marginTop: "20px",
              borderTop: "1px dashed rgba(255,255,255,0.1)",
              paddingTop: "32px" 
            }}>
              {/* Left Signature */}
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Brush Script MT', cursive, Georgia", fontSize: "1.8rem", color: "rgba(255,255,255,0.8)", height: "40px" }}>
                  M. Laurent
                </div>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.2)", width: "130px", margin: "8px auto 0 auto" }}></div>
                <p style={{ fontSize: "0.75rem", opacity: 0.6, marginTop: "6px" }}>Director of Studies</p>
              </div>

              {/* Gold Seal Embossing */}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  border: "2px solid var(--gold)",
                  boxShadow: "0 0 15px rgba(212,175,55,0.3)",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(212, 175, 55, 0.05)"
                }}>
                  {/* Decorative teeth on seal */}
                  <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "88px",
                    height: "88px",
                    borderRadius: "50%",
                    border: "1px dashed var(--gold)",
                  }}></div>
                  <div style={{ fontSize: "0.6rem", color: "var(--gold)", fontWeight: "bold", textAlign: "center", letterSpacing: "1px" }}>
                    OFFICIAL<br/>SEAL
                  </div>
                  {/* Ribbons hanging out */}
                  <div style={{
                    position: "absolute",
                    bottom: "-25px",
                    left: "35px",
                    width: "12px",
                    height: "40px",
                    backgroundColor: "#ED2939",
                    transform: "rotate(15deg)",
                    zIndex: -1,
                    opacity: 0.8
                  }}></div>
                  <div style={{
                    position: "absolute",
                    bottom: "-25px",
                    left: "48px",
                    width: "12px",
                    height: "40px",
                    backgroundColor: "#002395",
                    transform: "rotate(-15deg)",
                    zIndex: -1,
                    opacity: 0.8
                  }}></div>
                </div>
              </div>

              {/* Right Signature */}
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Brush Script MT', cursive, Georgia", fontSize: "1.8rem", color: "rgba(255,255,255,0.8)", height: "40px" }}>
                  JP. Dubois
                </div>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.2)", width: "130px", margin: "8px auto 0 auto" }}></div>
                <p style={{ fontSize: "0.75rem", opacity: 0.6, marginTop: "6px" }}>President</p>
              </div>
            </div>

            {/* Secure verification ID */}
            <div style={{ 
              position: "absolute", 
              bottom: "16px", 
              right: "24px", 
              fontSize: "0.65rem", 
              color: "var(--text-muted)",
              letterSpacing: "0.5px" 
            }}>
              Credential ID: <strong>{certData.certificateNumber}</strong>
            </div>

            <div style={{ 
              position: "absolute", 
              bottom: "16px", 
              left: "24px", 
              fontSize: "0.65rem", 
              color: "var(--text-muted)" 
            }}>
              Verify status: <strong>{certData.status}</strong>
            </div>

          </div>
        </div>

      </div>

      {/* Global CSS overrides for clean printing */}
      <style jsx global>{`
        @media print {
          /* Hide all UI shell elements */
          .no-print,
          header,
          footer,
          .header-nav,
          nav,
          button {
            display: none !important;
          }
          
          /* Prepare page setup */
          @page {
            size: landscape;
            margin: 0.5cm;
          }

          body {
            background-color: #ffffff !important;
            color: #000000 !important;
            padding: 0 !important;
            margin: 0 !important;
          }

          .certificate-page-container {
            padding: 0 !important;
            min-height: auto !important;
          }

          /* Force high contrast print styles for certificate */
          .certificate-document-wrapper {
            background-color: #ffffff !important;
            color: #000000 !important;
            border: 4px double #000000 !important;
            box-shadow: none !important;
            width: 100% !important;
            max-width: 100% !important;
            padding: 6px !important;
            page-break-inside: avoid;
          }

          .certificate-document-wrapper > div {
            border: 1px solid rgba(0, 0, 0, 0.4) !important;
            background-color: #ffffff !important;
            padding: 30px !important;
          }

          .certificate-document-wrapper h1 {
            color: #000000 !important;
          }
          
          .certificate-document-wrapper h2 {
            color: #b8860b !important; /* dark gold */
          }

          .certificate-document-wrapper h3 {
            color: #000000 !important;
            border-bottom-color: #000000 !important;
          }

          .certificate-document-wrapper h4 {
            color: #000000 !important;
          }

          .badge-gold {
            background-color: #f5f5f5 !important;
            color: #000000 !important;
            border: 1px solid #b8860b !important;
          }

          .certificate-document-wrapper p, 
          .certificate-document-wrapper span, 
          .certificate-document-wrapper strong {
            color: #000000 !important;
            opacity: 1 !important;
          }

          .certificate-document-wrapper div {
            border-top-color: rgba(0,0,0,0.2) !important;
            border-bottom-color: rgba(0,0,0,0.2) !important;
          }

          /* Keep seal visibility */
          .certificate-document-wrapper .seal-teeth {
            border-color: #b8860b !important;
          }
        }
      `}</style>
    </div>
  );
}
