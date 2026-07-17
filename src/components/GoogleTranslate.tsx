"use client";

import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

// Cookie Helpers
const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const ca = document.cookie.split(';');
  const nameEQ = name + "=";
  const values: string[] = [];
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) {
      values.push(c.substring(nameEQ.length, c.length));
    }
  }
  
  if (values.length === 0) return null;
  
  // Prioritize French target if any of the cookie instances are set to French
  if (values.includes("/fr/fr") || values.includes("/fr/fr/")) {
    return "/fr/fr";
  }
  return values[0];
};

const setCookie = (name: string, value: string) => {
  if (typeof document === "undefined") return;
  
  // 1. Set host-only cookie
  document.cookie = `${name}=${value}; path=/; SameSite=Lax`;
  
  const host = window.location.hostname;
  if (host !== "localhost" && host !== "127.0.0.1") {
    // 2. Set for current hostname explicitly
    document.cookie = `${name}=${value}; path=/; domain=${host}; SameSite=Lax`;
    document.cookie = `${name}=${value}; path=/; domain=.${host}; SameSite=Lax`;
    
    // 3. Set for parent/root domain to cover subdomains and allow Google Translate script to see it
    const parts = host.split('.');
    if (parts.length > 1) {
      const rootDomain = parts.slice(-2).join('.');
      document.cookie = `${name}=${value}; path=/; domain=${rootDomain}; SameSite=Lax`;
      document.cookie = `${name}=${value}; path=/; domain=.${rootDomain}; SameSite=Lax`;
    }
  }
};

export const GoogleTranslate: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<"en" | "fr">("en"); // English is default

  useEffect(() => {
    // Determine language from cookie
    const cookieVal = getCookie("googtrans");
    if (cookieVal === "/fr/fr" || cookieVal === "/fr/fr/") {
      setCurrentLang("fr");
    } else {
      setCurrentLang("en");
    }

    // Set English as default language by writing the Google Translate cookie if not already set
    const hasTransCookie = document.cookie.split(';').some((item) => item.trim().startsWith('googtrans='));
    if (!hasTransCookie) {
      setCookie("googtrans", "/fr/en");
    }

    // Define the init function on window (required by Google script)
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "fr",
            includedLanguages: "en,fr",
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_element"
        );
      }
    };

    // Load Translate script if not present
    const scriptId = "google-translate-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.type = "text/javascript";
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else if (window.google && window.google.translate && window.googleTranslateElementInit) {
      window.googleTranslateElementInit();
    }
  }, []);

  const handleToggleLanguage = () => {
    const nextLang = currentLang === "en" ? "fr" : "en";
    setCookie("googtrans", `/fr/${nextLang}`);
    // Refresh page to apply Google translation immediately
    window.location.reload();
  };

  return (
    <div className="language-toggle-wrapper" style={{ display: "inline-block", marginRight: "12px", verticalAlign: "middle" }}>
      {/* Google Translate element target node (must exist but can be hidden) */}
      <div id="google_translate_element" style={{ display: "none" }}></div>
      
      <button
        onClick={handleToggleLanguage}
        className="lang-toggle-btn"
        style={{
          backgroundColor: "rgba(107, 142, 35, 0.05)",
          border: "1px solid rgba(107, 142, 35, 0.3)",
          borderRadius: "50px",
          padding: "8px 16px",
          fontFamily: "var(--font-sans)",
          fontSize: "0.8rem",
          fontWeight: "600",
          color: "#6b8e23",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          transition: "all 0.3s ease"
        }}
      >
        {currentLang === "en" ? (
          <>
            <span>🇫🇷</span>
            <span>Français</span>
          </>
        ) : (
          <>
            <span>🇬🇧</span>
            <span>English</span>
          </>
        )}
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          style={{ opacity: 0.7 }}
        >
          <path
            d="M1 1L5 5L9 1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <style jsx global>{`
        /* Hide the native Google Translate select box widget completely */
        #google_translate_element,
        .skiptranslate iframe,
        .goog-te-gadget {
          display: none !important;
        }

        /* Customize custom toggle button hover states */
        .lang-toggle-btn:hover {
          background-color: rgba(107, 142, 35, 0.12) !important;
          border-color: rgba(107, 142, 35, 0.5) !important;
          box-shadow: 0 0 15px rgba(107, 142, 35, 0.1) !important;
        }
      `}</style>
    </div>
  );
};

export default GoogleTranslate;
