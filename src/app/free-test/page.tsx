import React from "react";
import type { Metadata } from "next";
import FreeTestPageClient from "./FreeTestPageClient";

export const metadata: Metadata = {
  title: "Free French Placement Test Online | DELF A1-B2 CEFR Assessment",
  description: "Evaluate your French language level in 10 minutes. Free online placement test aligned with CEFR standards (DELF A1, A2, B1, B2). Get immediate level recommendations.",
  alternates: {
    canonical: "https://www.francophilefrench.com/free-test",
  },
  openGraph: {
    title: "Free French Placement Test Online | DELF A1-B2 CEFR Assessment",
    description: "Determine your official CEFR French level. Take the free 10-question evaluation diagnostic and unlock instant level-tailored course pathways.",
    url: "https://www.francophilefrench.com/free-test",
    type: "website",
  },
};

export default function FreeTestPage() {
  return <FreeTestPageClient />;
}
