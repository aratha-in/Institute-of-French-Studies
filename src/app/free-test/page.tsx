"use client";

import React, { useState } from "react";
import Link from "next/link";

interface Question {
  id: number;
  level: "A1" | "A2" | "B1" | "B2";
  question: string;
  options: string[];
  answerIndex: number;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    level: "A1",
    question: "Bonjour, comment ____-tu ?",
    options: ["es", "vas", "as", "fais"],
    answerIndex: 1,
  },
  {
    id: 2,
    level: "A1",
    question: "Qu'est-ce que c'est ?",
    options: ["Il est un livre", "C'est un livre", "Ce sont livres", "Il y a livre"],
    answerIndex: 1,
  },
  {
    id: 3,
    level: "A1",
    question: "___ parents habitent à Paris.",
    options: ["Mon", "Mes", "Ma", "Votre"],
    answerIndex: 1,
  },
  {
    id: 4,
    level: "A2",
    question: "Hier soir, nous ____ au restaurant.",
    options: ["avons mangé", "mangent", "mangeons", "sommes mangés"],
    answerIndex: 0,
  },
  {
    id: 5,
    level: "A2",
    question: "Je ne trouve pas mes clés, je les ai ____ quelque part.",
    options: ["perdus", "perdues", "perdu", "perdue"],
    answerIndex: 1,
  },
  {
    id: 6,
    level: "B1",
    question: "Si j'avais assez d'argent, je ____ un voyage autour du monde.",
    options: ["ferai", "ferais", "fais", "fasse"],
    answerIndex: 1,
  },
  {
    id: 7,
    level: "B1",
    question: "C'est l'étudiant ____ a obtenu la meilleure note.",
    options: ["que", "qui", "dont", "auquel"],
    answerIndex: 1,
  },
  {
    id: 8,
    level: "B2",
    question: "Il est indispensable que vous ____ votre inscription avant vendredi.",
    options: ["terminez", "terminiez", "terminerez", "finissez"],
    answerIndex: 1,
  },
  {
    id: 9,
    level: "B2",
    question: "Bien qu'il ____ tard, nous continuons à étudier.",
    options: ["est", "soit", "était", "sera"],
    answerIndex: 1,
  },
  {
    id: 10,
    level: "B2",
    question: "Je me demande s'ils ____ demain.",
    options: ["viendront", "viennent", "viennent de", "soient venus"],
    answerIndex: 0,
  },
];

export default function FreeTestPage() {
  const [step, setStep] = useState<"intro" | "quiz" | "result">("intro");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Results
  const [score, setScore] = useState(0);
  const [assessedLevel, setAssessedLevel] = useState("");
  const [feedbackText, setFeedbackText] = useState("");

  const handleStartTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setError("Please fill out both Name and Email to start your free test.");
      return;
    }
    setError(null);
    setStep("quiz");
  };

  const handleSelectOption = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (currentQuestionIndex + 1 < QUESTIONS.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResults(newAnswers);
    }
  };

  const calculateResults = async (finalAnswers: number[]) => {
    setSubmitting(true);
    let finalScore = 0;
    finalAnswers.forEach((ans, idx) => {
      if (ans === QUESTIONS[idx].answerIndex) {
        finalScore++;
      }
    });
    setScore(finalScore);

    let level = "A1";
    let feedback = "";
    if (finalScore <= 3) {
      level = "A1";
      feedback = "You are at the A1 (Introductory/Beginner) level. We recommend starting with our A1 course to build strong vocabulary and foundational pronunciation skills.";
    } else if (finalScore <= 5) {
      level = "A2";
      feedback = "You are at the A2 (Elementary) level. You can communicate in simple daily situations. Our A2 classes will help you consolidate past tenses and express opinions.";
    } else if (finalScore <= 7) {
      level = "B1";
      feedback = "You are at the B1 (Intermediate) level. You can understand core concepts and describe plans. Our B1 courses will enable you to explain complex reasoning and write essays.";
    } else {
      level = "B2";
      feedback = "Excellent! You are at the B2 (Upper Intermediate) level. You can follow arguments and converse fluently. Join our advanced B2 modules to master literature and nuance.";
    }
    setAssessedLevel(level);
    setFeedbackText(feedback);

    // Save lead details via API
    try {
      const message = `Evaluation Placement Test Completed.\nScore: ${finalScore}/10.\nRecommended level placement: DELF ${level}.\nDetailed recommendations: ${feedback}`;
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) {
        throw new Error("Could not register inquiry.");
      }
    } catch (err: any) {
      console.error("Inquiry registration error during test submit:", err);
    } finally {
      setSubmitting(false);
      setStep("result");
    }
  };

  const handleRestart = () => {
    setName("");
    setEmail("");
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setScore(0);
    setAssessedLevel("");
    setFeedbackText("");
    setError(null);
    setStep("intro");
  };

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex) / QUESTIONS.length) * 100);

  return (
    <div>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <span className="badge badge-primary" style={{ marginBottom: "12px" }}>Évaluation en ligne</span>
          <h1 className="page-title">Free French Placement Test</h1>
          <p className="subtitle" style={{ margin: "0 auto" }}>
            Identify your CEFR French Level in 10 questions. Start your language learning journey today.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="section" style={{ minHeight: "60vh" }}>
        <div className="container" style={{ maxWidth: "650px" }}>
          
          {/* STEP 1: INTRO / REGISTER */}
          {step === "intro" && (
            <div className="glass-card" style={{ padding: "40px" }}>
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
                Start Your Evaluation
              </h3>
              <p style={{ fontSize: "0.95rem", opacity: 0.85, marginBottom: "28px" }}>
                Provide your details below to save your evaluation score. This helps us recommend the perfect class schedules and DELF/DALF resources tailored for your proficiency.
              </p>

              {error && (
                <div style={{
                  padding: "12px",
                  borderRadius: "var(--radius-sm)",
                  backgroundColor: "rgba(239, 68, 68, 0.1)",
                  border: "1px solid var(--error)",
                  color: "var(--error)",
                  fontSize: "0.9rem",
                  marginBottom: "20px"
                }}>
                  {error}
                </div>
              )}

              <form onSubmit={handleStartTest}>
                <div className="form-group" style={{ display: "flex", flexDirection: "column", marginBottom: "20px" }}>
                  <label className="form-label" htmlFor="student-name">Your Full Name</label>
                  <input
                    type="text"
                    id="student-name"
                    className="form-input"
                    placeholder="Jean Dupont"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group" style={{ display: "flex", flexDirection: "column", marginBottom: "28px" }}>
                  <label className="form-label" htmlFor="student-email">Email Address</label>
                  <input
                    type="email"
                    id="student-email"
                    className="form-input"
                    placeholder="jean.dupont@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "14px" }}>
                  Start Placement Test
                </button>
              </form>
            </div>
          )}

          {/* STEP 2: INTERACTIVE QUIZ */}
          {step === "quiz" && currentQuestion && (
            <div className="glass-card" style={{ padding: "40px" }}>
              {/* Progress indicator */}
              <div style={{ marginBottom: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", opacity: 0.8, marginBottom: "8px" }}>
                  <span>Question {currentQuestionIndex + 1} of {QUESTIONS.length}</span>
                  <span className="badge badge-gold">Level {currentQuestion.level}</span>
                </div>
                <div style={{ width: "100%", height: "6px", backgroundColor: "rgba(11,37,91,0.08)", borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{ width: `${progressPercent}%`, height: "100%", backgroundColor: "var(--primary)", transition: "width 0.3s ease" }}></div>
                </div>
              </div>

              {/* Question Text */}
              <h3 style={{ fontSize: "1.45rem", marginBottom: "28px", lineHeight: "1.4", minHeight: "60px" }}>
                {currentQuestion.question}
              </h3>

              {/* Multiple Choice Options */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {currentQuestion.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className="btn btn-outline"
                    style={{
                      width: "100%",
                      justifyContent: "flex-start",
                      padding: "16px 20px",
                      textAlign: "left",
                      fontSize: "1rem",
                      fontWeight: "500",
                      borderColor: "rgba(11,37,91,0.15)",
                      backgroundColor: "rgba(255, 255, 255, 0.5)"
                    }}
                  >
                    <span style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(11,37,91,0.06)",
                      marginRight: "16px",
                      fontSize: "0.85rem",
                      fontWeight: "600"
                    }}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: RESULTS SCREEN */}
          {step === "result" && (
            <div className="glass-card" style={{ padding: "40px", textAlign: "center" }}>
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

              <span style={{ fontSize: "3.5rem", display: "block", marginBottom: "16px" }}>🏆</span>
              
              <h3 style={{ fontSize: "2rem", marginBottom: "8px", fontFamily: "var(--font-serif)" }}>
                Your Placement Level: <span className="text-gradient" style={{ fontWeight: "700" }}>DELF {assessedLevel}</span>
              </h3>
              
              <p style={{ fontSize: "1.1rem", opacity: 0.9, fontWeight: "600", marginBottom: "20px", color: "var(--primary-light)" }}>
                Score: {score} / {QUESTIONS.length} Correct Answers
              </p>

              <p style={{ fontSize: "0.95rem", opacity: 0.85, lineHeight: "1.7", marginBottom: "32px", padding: "16px", borderRadius: "8px", backgroundColor: "rgba(11,37,91,0.03)" }}>
                {feedbackText}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <Link href={`/courses?level=${assessedLevel}`} className="btn btn-primary" style={{ width: "100%", padding: "14px" }}>
                  View Recommended {assessedLevel} Courses
                </Link>

                <button onClick={handleRestart} className="btn btn-outline" style={{ width: "100%", padding: "14px" }}>
                  Take Test Again
                </button>
              </div>

              <p style={{ fontSize: "0.8rem", opacity: 0.6, marginTop: "24px" }}>
                A confirmation with detailed next steps has been logged. Our learning coordinators will reach out via email ({email}) shortly.
              </p>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
