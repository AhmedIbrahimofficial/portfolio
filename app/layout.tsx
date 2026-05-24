import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BackToTop from "./components/BackToTop";
import CustomCursor from "./components/CustomCursor";
import ScrollReset from "./components/ScrollReset";

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
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full antialiased"
        style={{ background: "hsl(0 0% 4%)", color: "hsl(0 0% 96%)" }}
      >
        <ScrollReset />
        <CustomCursor />
        <BackToTop />
        {children}
      </body>
    </html>
  );
}
