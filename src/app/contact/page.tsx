import React from "react";
import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Admissions & Admissions Office | Institute of French Studies",
  description: "Get in touch with the Institute of French Studies in Hyderabad. Connect with our admissions desk via phone at +91 9000-266-171, email, or visit our Adarsh Nagar campus.",
  alternates: {
    canonical: "https://www.francophilefrench.com/contact",
  },
  openGraph: {
    title: "Contact Admissions & Admissions Office | Institute of French Studies",
    description: "Connect with the premier French institute in Hyderabad. Inquire about DELF/DALF course registrations, TEF schedules, and study packages.",
    url: "https://www.francophilefrench.com/contact",
    type: "website",
  },
};

export default function ContactPage() {
  // Contact page structured data for search crawlers & generative search context
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Institute of French Studies",
    "description": "Admissions and helpdesk contact details for Francophile French in Hyderabad, India.",
    "url": "https://www.francophilefrench.com/contact",
    "mainEntity": {
      "@type": "EducationalOrganization",
      "name": "Francophile French (Institute of French Studies)",
      "telephone": "+91-9000-266-171",
      "email": "info@francophilefrench.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "29, 401, Hira Mansion, 5-9, opp. to Paigah Plaza, Hill Fort, Adarsh Nagar",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana",
        "postalCode": "500004",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "17.4042",
        "longitude": "78.4735"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-9000-266-171",
        "contactType": "admissions",
        "email": "info@francophilefrench.com",
        "availableLanguage": ["English", "French", "Telugu", "Hindi"]
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <ContactPageClient />
    </>
  );
}
