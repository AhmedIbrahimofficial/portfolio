import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ScrollReset from "./components/ScrollReset";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ahmed Ibrahim — AI Innovator & Full Stack Developer",
  description:
    "Portfolio of Ahmed Ibrahim — AI Innovator, Full Stack Web Developer, and Graphic Designer based in Gujranwala, Pakistan.",
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
        {children}
      </body>
    </html>
  );
}
