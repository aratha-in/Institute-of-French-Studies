import React from "react";
import type { Metadata } from "next";
import JoinUsPageClient from "./JoinUsPageClient";

export const metadata: Metadata = {
  title: "Join Our Team - Careers in French Education | Institute of French Studies",
  description: "Apply for careers at the Institute of French Studies in Hyderabad. We are hiring certified French Language Instructors (FLE) and Academic Coordinators. Apply online today.",
  alternates: {
    canonical: "https://www.francophilefrench.com/join-us",
  },
  openGraph: {
    title: "Join Our Team - Careers in French Education | Institute of French Studies",
    description: "Build a rewarding career in FLE (French as a Foreign Language) instruction. Join our academic recruiting board and teach in modern language labs.",
    url: "https://www.francophilefrench.com/join-us",
    type: "website",
  },
};

export default function JoinUsPage() {
  return <JoinUsPageClient />;
}
