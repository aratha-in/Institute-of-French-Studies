"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Course {
  id: number;
  title: string;
  description: string;
  level: string;
  price: number;
  schedule: string;
  duration: string;
}

interface Enrollment {
  id: number;
  courseId: number;
  enrolledAt: string;
  status: string;
  course: Course;
}

interface Certificate {
  id: number;
  enrollmentId: number;
  userId: string;
  courseId: number;
  issueDate: string;
  grade: string;
  certificateNumber: string;
  status: string;
  course?: Course;
}

export default function DashboardPage() {
  const { user, token, isAuthenticated, loading, logout } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [issuingId, setIssuingId] = useState<number | null>(null);
  const router = useRouter();

  const fetchMyData = async () => {
    if (!token) return;
    setFetching(true);
    try {
      // Fetch enrollments
      const enrollRes = await fetch("/api/enrollments/my", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (!enrollRes.ok) throw new Error("Could not retrieve enrollments.");
      const enrollData = await enrollRes.json();
      setEnrollments(enrollData);

      // Fetch certificates
      const certRes = await fetch("/api/certificates/my", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (certRes.ok) {
        const certData = await certRes.json();
        setCertificates(certData);
      }
    } catch (err: any) {
      console.error("Fetch dashboard data error:", err);
      setError(err.message || "Failed to load dashboard data.");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchMyData();
    }
  }, [isAuthenticated, token]);

  const handleSimulateCompletion = async (enrollmentId: number) => {
    if (!token) return;
    setIssuingId(enrollmentId);
    try {
      const response = await fetch("/api/certificates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ enrollmentId, grade: "A+" })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to issue certificate.");
      }

      alert("Félicitations! You completed the course and your certificate has been issued!");
      await fetchMyData(); // Refresh UI
    } catch (err: any) {
      alert(err.message || "Failed to complete course.");
    } finally {
      setIssuingId(null);
    }
  };

  if (loading || (fetching && !error && isAuthenticated)) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontSize: "1.2rem", opacity: 0.7 }}>Loading student profile...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="container" style={{ padding: "80px 0", textAlign: "center" }}>
        <div className="glass-card" style={{ maxWidth: "500px", margin: "0 auto", padding: "40px" }}>
          <span style={{ fontSize: "3rem" }}>⚠️</span>
          <h2 style={{ margin: "20px 0 10px 0", color: "var(--error)" }}>Erreur de Connexion</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "30px" }}>Could not establish session with default student profile. Please make sure the backend server is running.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px 0" }}>
      <div className="container">
        
        {/* Welcome Header */}
        <div className="glass-card" style={{
          padding: "40px",
          marginBottom: "40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "24px",
          background: "linear-gradient(135deg, var(--card-bg) 0%, var(--primary-glow) 100%)"
        }}>
          <div>
            <span className="badge badge-primary" style={{ marginBottom: "12px" }}>Espace Étudiant</span>
            <h1 style={{ fontSize: "2.4rem", marginBottom: "8px" }}>Bonjour, {user?.name}!</h1>
            <p style={{ opacity: 0.8, fontSize: "0.95rem" }}>
              Welcome back to your French studies portal. Track your classes, view active courses, and manage certificates.
            </p>
          </div>
          <div>
            <button onClick={logout} className="btn btn-outline" style={{ fontSize: "0.9rem" }}>
              Sign Out
            </button>
          </div>
        </div>

        {/* Dashboard grid */}
        <div className="grid-dashboard">
          
          {/* Main Column */}
          <div>
            <h2 style={{ fontSize: "1.8rem", marginBottom: "24px", fontFamily: "var(--font-serif)" }}>
              My Enrolled Courses
            </h2>

            {error && (
              <div style={{
                padding: "16px",
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                border: "1px solid var(--error)",
                color: "var(--error)",
                borderRadius: "8px",
                marginBottom: "24px"
              }}>
                {error}
              </div>
            )}

            {enrollments.length === 0 ? (
              <div className="glass-card" style={{ textAlign: "center", padding: "40px", marginBottom: "40px" }}>
                <span style={{ fontSize: "2.5rem" }}>📚</span>
                <h3 style={{ margin: "16px 0 8px 0" }}>No Registrations Yet</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "24px" }}>
                  You haven't enrolled in any French courses for the upcoming term.
                </p>
                <Link href="/courses" className="btn btn-primary">
                  Browse Course Catalogue
                </Link>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "40px" }}>
                {enrollments.map((enrollment) => {
                  const cert = certificates.find((c) => c.enrollmentId === enrollment.id);
                  return (
                    <div key={enrollment.id} className="glass-card grid-enrollment-card" style={{ padding: "32px" }}>
                      <div>
                        <span className="badge badge-gold" style={{ marginBottom: "8px" }}>
                          DELF {enrollment.course.level}
                        </span>
                        <h3 style={{ fontSize: "1.4rem", marginBottom: "8px" }}>{enrollment.course.title}</h3>
                        <p style={{ fontSize: "0.9rem", opacity: 0.8, marginBottom: "16px" }}>{enrollment.course.description}</p>
                        
                        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", fontSize: "0.85rem", opacity: 0.8 }}>
                          <span>📅 <strong>Schedule:</strong> {enrollment.course.schedule}</span>
                          <span>⏱️ <strong>Duration:</strong> {enrollment.course.duration}</span>
                          <span>🕒 <strong>Registered:</strong> {new Date(enrollment.enrolledAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "12px" }}>
                        <span className="badge" style={{
                          backgroundColor: enrollment.status === "Active" ? "rgba(16,185,129,0.15)" : (enrollment.status === "Completed" ? "rgba(212,175,55,0.15)" : "rgba(239,68,68,0.15)"),
                          color: enrollment.status === "Active" ? "var(--success)" : (enrollment.status === "Completed" ? "var(--gold)" : "var(--error)"),
                          border: `1px solid ${enrollment.status === "Active" ? "var(--success)" : (enrollment.status === "Completed" ? "var(--gold)" : "var(--error)")}`
                        }}>
                          {enrollment.status}
                        </span>
                        
                        {enrollment.status === "Completed" && cert ? (
                          <Link href={`/dashboard/certificates/${cert.id}`} className="btn" style={{ 
                            padding: "8px 16px", 
                            fontSize: "0.8rem", 
                            backgroundColor: "var(--gold)", 
                            color: "var(--black)", 
                            border: "none",
                            borderRadius: "var(--radius-sm)",
                            fontWeight: "600",
                            textAlign: "center"
                          }}>
                            View Certificate 📜
                          </Link>
                        ) : (
                          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <button className="btn btn-outline" style={{ padding: "8px 16px", fontSize: "0.8rem" }} onClick={() => alert("Simulated: Redirecting to virtual classroom... Check back on schedule date.")}>
                              Join Classroom
                            </button>
                            <button 
                              className="btn btn-primary" 
                              style={{ padding: "8px 16px", fontSize: "0.8rem", backgroundColor: "rgba(212,175,55,0.1)", color: "var(--gold)", borderColor: "var(--gold)" }}
                              onClick={() => handleSimulateCompletion(enrollment.id)}
                              disabled={issuingId !== null}
                            >
                              {issuingId === enrollment.id ? "Completing..." : "Complete & Issue Cert 🎓"}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Certificates List Section */}
            {certificates.length > 0 && (
              <div>
                <h2 style={{ fontSize: "1.8rem", marginBottom: "24px", fontFamily: "var(--font-serif)" }}>
                  My Academic Credentials
                </h2>
                <div className="grid-responsive-2" style={{ gap: "20px" }}>
                  {certificates.map((cert) => (
                    <div key={cert.id} className="glass-card" style={{ 
                      padding: "24px",
                      border: "1px solid rgba(212, 175, 55, 0.3)",
                      background: "linear-gradient(135deg, var(--card-bg) 0%, rgba(212, 175, 55, 0.03) 100%)",
                      position: "relative"
                    }}>
                      <span className="badge badge-gold" style={{ position: "absolute", top: "20px", right: "20px" }}>
                        DELF {cert.course?.level || "A1"}
                      </span>
                      <span style={{ fontSize: "1.8rem" }}>📜</span>
                      <h3 style={{ fontSize: "1.2rem", margin: "12px 0 6px 0", fontFamily: "var(--font-serif)" }}>
                        {cert.course?.title || "French Course"}
                      </h3>
                      <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "16px" }}>
                        ID: <code>{cert.certificateNumber}</code> • Grade: <strong>{cert.grade}</strong>
                      </p>
                      <Link href={`/dashboard/certificates/${cert.id}`} className="btn btn-outline" style={{ fontSize: "0.8rem", padding: "8px 16px" }}>
                        Print / Download PDF
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick links & Resources Column */}
          <div>
            <h2 style={{ fontSize: "1.8rem", marginBottom: "24px", fontFamily: "var(--font-serif)" }}>
              Student Resources
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div className="glass-card" style={{ padding: "24px" }}>
                <h4 style={{ fontWeight: "600", fontSize: "1.1rem", marginBottom: "12px" }}>Digital Media Library</h4>
                <p style={{ fontSize: "0.85rem", opacity: 0.8, marginBottom: "16px" }}>
                  Access thousands of e-books, audio clips, and magazines in French (Culturethèque integration).
                </p>
                <button className="btn btn-primary" style={{ padding: "8px 16px", fontSize: "0.8rem" }} onClick={() => alert("Opening digital library portal...")}>
                  Access Library
                </button>
              </div>

              <div className="glass-card" style={{ padding: "24px" }}>
                <h4 style={{ fontWeight: "600", fontSize: "1.1rem", marginBottom: "12px" }}>DELF/DALF Examinations</h4>
                <p style={{ fontSize: "0.85rem", opacity: 0.8, marginBottom: "16px" }}>
                  Registration is open for the upcoming October session. Practice tests are available in your portal.
                </p>
                <button className="btn btn-outline" style={{ padding: "8px 16px", fontSize: "0.8rem", width: "100%" }} onClick={() => alert("Opening exam scheduler...")}>
                  Register for Exams
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
