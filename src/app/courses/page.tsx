import React from "react";
import type { Metadata } from "next";
import CoursesPageClient from "./CoursesPageClient";

export const metadata: Metadata = {
  title: "French Language Courses & DELF Certifications | Institute of French Studies",
  description: "Explore professional French language classes in Hyderabad from DELF A1 to C1. Certified FLE training, TEF/TCF prep for Canadian immigration, and flexible schedules.",
  alternates: {
    canonical: "https://www.francophilefrench.com/courses",
  },
  openGraph: {
    title: "French Language Courses & DELF Certifications | Institute of French Studies",
    description: "Immerse yourself in world-class French education in Hyderabad. From beginner A1 to advanced C1, get certified by accredited examiners.",
    url: "https://www.francophilefrench.com/courses",
    type: "website",
  },
};

export default function CoursesPage() {
  // Course structured data for GEO & SEO indexing
  const courseListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "French Language Certification Courses",
    "description": "Comprehensive French language training aligned with the CEFR framework.",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Course",
          "name": "DELF A1 - French for Beginners",
          "description": "Introductory French course covering basic vocabulary, pronunciation, and everyday expressions.",
          "provider": {
            "@type": "EducationalOrganization",
            "name": "Francophile French (Institute of French Studies)",
            "sameAs": "https://www.francophilefrench.com"
          },
          "educationalLevel": "A1"
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "Course",
          "name": "DELF A2 - Elementary French",
          "description": "Consolidate simple communication, past tenses, and personal interactions.",
          "provider": {
            "@type": "EducationalOrganization",
            "name": "Francophile French (Institute of French Studies)",
            "sameAs": "https://www.francophilefrench.com"
          },
          "educationalLevel": "A2"
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "Course",
          "name": "DELF B1 - Intermediate French",
          "description": "Develop fluency to express opinions, argue points, and write analytical essays.",
          "provider": {
            "@type": "EducationalOrganization",
            "name": "Francophile French (Institute of French Studies)",
            "sameAs": "https://www.francophilefrench.com"
          },
          "educationalLevel": "B1"
        }
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@type": "Course",
          "name": "DELF B2 - Upper Intermediate French",
          "description": "Advanced communication skills and debate structure for academic or professional settings.",
          "provider": {
            "@type": "EducationalOrganization",
            "name": "Francophile French (Institute of French Studies)",
            "sameAs": "https://www.francophilefrench.com"
          },
          "educationalLevel": "B2"
        }
      },
      {
        "@type": "ListItem",
        "position": 5,
        "item": {
          "@type": "Course",
          "name": "TEF & TCF (A0 to B2) Exam Preparation",
          "description": "Specialized intensive program targeted at secure band scores (CLB 7+) for Canadian immigration.",
          "provider": {
            "@type": "EducationalOrganization",
            "name": "Francophile French (Institute of French Studies)",
            "sameAs": "https://www.francophilefrench.com"
          },
          "educationalLevel": "A0-B2"
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseListSchema) }}
      />
      <CoursesPageClient />
    </>
  );
}
