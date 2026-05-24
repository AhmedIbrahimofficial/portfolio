"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import ContactFooter from "./components/ContactFooter";
import ContactForm from "./components/ContactForm";
import ExplorationsSection from "./components/ExplorationsSection";
import HeroSection from "./components/HeroSection";
import JournalSection from "./components/JournalSection";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import StatsSection from "./components/StatsSection";
import WorksSection from "./components/WorksSection";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsLoading(true);
  }, []);

  return (
    <>
      <AnimatePresence>
        {mounted && isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <div
        suppressHydrationWarning
        style={{
          opacity: mounted && isLoading ? 0 : 1,
          transition: "opacity 0.4s ease",
          background: "hsl(0 0% 4%)",
        }}
      >
        <Navbar />
        <HeroSection />
        <WorksSection />
        <JournalSection />
        <ExplorationsSection />
        <StatsSection />
        <ContactForm />
        <ContactFooter />
      </div>
    </>
  );
}
