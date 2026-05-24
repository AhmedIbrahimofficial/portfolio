"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import ContactFooter from "./components/ContactFooter";
import ExplorationsSection from "./components/ExplorationsSection";
import HeroSection from "./components/HeroSection";
import JournalSection from "./components/JournalSection";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import ReachOutSection from "./components/ReachOutSection";
import StatsSection from "./components/StatsSection";
import WorksSection from "./components/WorksSection";

export default function HomePage() {
  // Start as false so SSR and initial client render match (no loading screen on server).
  // After mount, flip to true so the loading screen plays on the client only.
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsLoading(true);
  }, []);

  return (
    <>
      {/* Loading screen — client-only, avoids SSR mismatch */}
      <AnimatePresence>
        {mounted && isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Main content */}
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
        <ReachOutSection />
        <StatsSection />
        <ContactFooter />
      </div>
    </>
  );
}
