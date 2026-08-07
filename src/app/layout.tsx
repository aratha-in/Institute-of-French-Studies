import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

// Configure Global SEO/GEO/AEO Metadata base
export const metadata: Metadata = {
  metadataBase: new URL("https://www.francophilefrench.com"),
  title: {
    default: "Institute of French Studies | Hyderabad's Premier French School",
    template: "%s | Institute of French Studies",
  },
  description: "Learn French language and immerse yourself in French culture at the premier Francophile French. Offering courses from A1 to C2 DELF levels, professional certifications, and cultural events.",
  keywords: [
    "Learn French in Hyderabad",
    "French classes Hyderabad",
    "DELF A1 preparation",
    "DELF B2 certification",
    "TEF TCF Canada Hyderabad",
    "French Language Institute India",
    "Français Langue Étrangère",
    "French immigration Express Entry"
  ],
  authors: [{ name: "Institute of French Studies" }],
  creator: "Institute of French Studies",
  publisher: "Francophile French",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.francophilefrench.com",
    siteName: "Institute of French Studies",
    images: [
      {
        url: "/icon.svg",
        width: 512,
        height: 512,
        alt: "Institute of French Studies logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Institute of French Studies | Learn French Hyderabad",
    description: "Accredited French language training aligned with CEFR standards. DELF, DALF, and TEF preparation with certified FLE instructors.",
    images: ["/icon.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-W9HQ6R10HG"></script>
        <script dangerouslySetInnerHTML={{ __html: "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-W9HQ6R10HG');" }} />
        <script dangerouslySetInnerHTML={{ __html: "!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '24773187459017478');fbq('track', 'PageView');" }} />
        <noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=24773187459017478&ev=PageView&noscript=1" /></noscript>
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
