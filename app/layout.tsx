import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import BackToTop from "./components/BackToTop";
import CustomCursor from "./components/CustomCursor";
import GoogleAnalytics from "./components/GoogleAnalytics";
import ScrollReset from "./components/ScrollReset";
import VisitorTracker from "./components/VisitorTracker";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const BASE_URL = "https://ahmedibrahim.dev";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Ahmed Ibrahim — AI Innovator & Full Stack Developer",
  description:
    "I build AI-powered web apps and design brands that convert — based in Gujranwala, Pakistan. Founder of ZehanxTech. 95+ projects shipped.",
  keywords: [
    "Ahmed Ibrahim",
    "Full Stack Developer",
    "AI Developer",
    "Next.js",
    "React",
    "Gujranwala Pakistan",
    "ZehanxTech",
    "Web Development",
    "Portfolio",
  ],
  authors: [{ name: "Ahmed Ibrahim", url: BASE_URL }],
  creator: "Ahmed Ibrahim",
  openGraph: {
    type: "website",
    url: BASE_URL,
    title: "Ahmed Ibrahim — AI Innovator & Full Stack Developer",
    description:
      "I build AI-powered web apps and design brands that convert — based in Gujranwala, Pakistan. Founder of ZehanxTech.",
    siteName: "Ahmed Ibrahim Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ahmed Ibrahim — AI Innovator & Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed Ibrahim — AI Innovator & Full Stack Developer",
    description:
      "I build AI-powered web apps and design brands that convert — based in Gujranwala, Pakistan.",
    creator: "@ZehanxTech",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
        {/* Google Analytics GA4 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-SB30JN9CKK" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-SB30JN9CKK', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full antialiased"
        style={{ background: "hsl(0 0% 4%)", color: "hsl(0 0% 96%)" }}
      >
        <ScrollReset />
        <CustomCursor />
        <BackToTop />
        <VisitorTracker />
        <GoogleAnalytics />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
