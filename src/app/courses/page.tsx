"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface Course {
  id: number;
  title: string;
  description: string;
  level: string;
  price: number;
  schedule: string;
  duration: string;
  imageUrl: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState("ALL");
  const [enrollSubmitting, setEnrollSubmitting] = useState<number | null>(null);
  const [enrollMessage, setEnrollMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const { isAuthenticated, token } = useAuth();
  const router = useRouter();

  // Fetch courses from ASP.NET backend API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses");
        if (!response.ok) {
          throw new Error("Failed to fetch courses.");
        }
        const data = await response.json();
        setCourses(data);
        setFilteredCourses(data);
      } catch (err: any) {
        console.error("Fetch courses error:", err);
        setError(err.message || "Could not retrieve courses. Make sure the API service is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Filter courses by level
  useEffect(() => {
    if (selectedLevel === "ALL") {
      setFilteredCourses(courses);
    } else {
      setFilteredCourses(
        courses.filter((c) => {
          const lvl = c.level.toUpperCase();
          const sel = selectedLevel.toUpperCase();
          if (lvl === sel) return true;
          if (lvl.includes("-")) {
            const levelsOrder = ["A0", "A1", "A2", "B1", "B2", "C1", "C2"];
            const parts = lvl.split("-");
            if (parts.length === 2) {
              const minIdx = levelsOrder.indexOf(parts[0]);
              const maxIdx = levelsOrder.indexOf(parts[1]);
              const selIdx = levelsOrder.indexOf(sel);
              if (minIdx !== -1 && maxIdx !== -1 && selIdx !== -1) {
                return selIdx >= minIdx && selIdx <= maxIdx;
              }
            }
          }
          return false;
        })
      );
    }
  }, [selectedLevel, courses]);

  const handleEnroll = async (courseId: number) => {
    if (!token) {
      setEnrollMessage({
        type: "error",
        text: "Initialisation de votre compte en cours, veuillez patienter..."
      });
      return;
    }

    setEnrollSubmitting(courseId);
    setEnrollMessage(null);

    try {
      const response = await fetch("/api/enrollments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ courseId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Enrollment request failed.");
      }

      setEnrollMessage({
        type: "success",
        text: "Succès! Enrolled successfully. Redirecting to your dashboard..."
      });

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);

    } catch (err: any) {
      console.error("Enrollment error:", err);
      setEnrollMessage({
        type: "error",
        text: err.message || "An error occurred during enrollment."
      });
    } finally {
      setEnrollSubmitting(null);
    }
  };

  const levels = ["ALL", "A1", "A2", "B1", "B2", "C1"];

  return (
    <div>
      {/* Header */}
      <section className="page-header">
        <div className="container">
          <span className="badge badge-primary" style={{ marginBottom: "12px" }}>Programmes d'études</span>
          <h1 className="page-title">Nos Cours de Français</h1>
          <p className="subtitle" style={{ margin: "0 auto" }}>
            Explore our curriculum. Choose the right course level to accelerate your language proficiency.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section">
        <div className="container">
          
          {/* Level Filters */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            marginBottom: "48px",
            flexWrap: "wrap"
          }}>
            {levels.map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`course-tab-btn ${selectedLevel === level ? "active" : ""}`}
              >
                {level === "ALL" ? "All Courses" : `Level ${level}`}
              </button>
            ))}
          </div>

          {enrollMessage && (
            <div style={{
              maxWidth: "600px",
              margin: "0 auto 32px auto",
              padding: "16px",
              borderRadius: "var(--radius-sm)",
              backgroundColor: enrollMessage.type === "success" ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
              border: `1px solid ${enrollMessage.type === "success" ? "var(--success)" : "var(--error)"}`,
              color: enrollMessage.type === "success" ? "var(--success)" : "var(--error)",
              fontSize: "0.95rem",
              textAlign: "center"
            }}>
              {enrollMessage.text}
            </div>
          )}

          {loading ? (
            <div style={{ textAlign: "center", padding: "40px" }}>
              <span style={{ fontSize: "1.2rem", opacity: 0.7 }}>Loading available courses...</span>
            </div>
          ) : error ? (
            <div className="glass-card" style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center", padding: "40px" }}>
              <span style={{ fontSize: "2rem" }}>📡</span>
              <h3 style={{ margin: "16px 0 8px 0" }}>Connection Error</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "20px" }}>{error}</p>
              <button onClick={() => window.location.reload()} className="btn btn-primary">Retry Connection</button>
            </div>
          ) : filteredCourses.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px" }}>
              <p style={{ fontSize: "1.1rem", color: "var(--text-muted)" }}>No courses found for Level {selectedLevel}.</p>
            </div>
          ) : (
            <div className="grid-3">
              {filteredCourses.map((course) => (
                <div key={course.id} className="glass-card" style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  padding: "0",
                  overflow: "hidden"
                }}>
                  {/* Card Visual Top Accent */}
                  <div style={{
                    height: "120px",
                    background: "linear-gradient(135deg, var(--primary-light), var(--primary-dark))",
                    position: "relative",
                    padding: "24px",
                    display: "flex",
                    alignItems: "flex-end"
                  }}>

                    <span className="badge badge-gold" style={{ position: "absolute", top: "16px", right: "16px" }}>
                      DELF {course.level}
                    </span>
                    <h3 style={{ color: "var(--white)", fontSize: "1.4rem", fontFamily: "var(--font-serif)" }}>
                      {course.title.split(" (")[0]}
                    </h3>
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <p style={{ fontSize: "0.9rem", opacity: 0.8, marginBottom: "20px", flex: 1, lineHeight: "1.6" }}>
                      {course.description}
                    </p>

                    <div style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      fontSize: "0.85rem",
                      borderTop: "1px solid var(--card-border)",
                      paddingTop: "16px",
                      marginBottom: "24px",
                      color: "var(--text-muted)"
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", color: "var(--white)" }}>
                        <span>📅 Schedule:</span>
                        <strong style={{ color: "var(--white)" }}>{course.schedule.split(",")[0]}</strong>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", color: "var(--white)" }}>
                        <span>⏱️ Duration:</span>
                        <strong style={{ color: "var(--white)" }}>{course.duration}</strong>
                      </div>

                    </div>

                    <button
                      onClick={() => handleEnroll(course.id)}
                      className="btn btn-primary"
                      style={{ width: "100%", padding: "12px", fontSize: "0.9rem" }}
                      disabled={enrollSubmitting !== null}
                    >
                      {enrollSubmitting === course.id ? "Processing..." : "Know More"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
