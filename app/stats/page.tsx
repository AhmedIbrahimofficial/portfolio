"use client";

import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useGitHub } from "../lib/useGitHub";

interface VisitorData {
  countries: { country: string; count: number }[];
  total: number;
  recent: { country: string; city: string; page: string; timestamp: string }[];
}

function useVisitors() {
  const [data, setData]       = useState<VisitorData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const res = await fetch("/api/visitors");
        if (res.ok) setData(await res.json());
      } catch { /* silent */ }
      finally { setLoading(false); }
    };
    fetch_();
    const id = setInterval(fetch_, 60_000);
    return () => clearInterval(id);
  }, []);

  return { data, loading };
}

function StatCard({ label, value, sub, icon }: { label: string; value: string | number; sub?: string; icon: string }) {
  return (
    <div className="p-6 rounded-2xl border flex flex-col gap-2" style={{ background: "#141414", borderColor: "#2a2a2a" }}>
      <span className="text-xl" aria-hidden suppressHydrationWarning>{icon}</span>
      <span className="text-3xl font-display italic font-normal"
        style={{ fontFamily: "'Instrument Serif', serif", background: "linear-gradient(90deg, #89AACC, #4E85BF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        {value}
      </span>
      <p className="text-sm font-bold" style={{ color: "#ffffff" }}>{label}</p>
      {sub && <p className="text-xs font-medium" style={{ color: "#666" }}>{sub}</p>}
    </div>
  );
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const d = Math.floor(diff / 86400000);
  const h = Math.floor(diff / 3600000);
  const m = Math.floor(diff / 60000);
  if (d > 0) return `${d}d ago`;
  if (h > 0) return `${h}h ago`;
  return `${m}m ago`;
}

export default function StatsPage() {
  const { data: gh, loading: ghLoading } = useGitHub();
  const { data: vis, loading: visLoading } = useVisitors();

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      <Navbar />

      <section className="pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: "#333" }} />
            <span className="text-xs uppercase tracking-[0.3em] font-bold" style={{ color: "#aaaaaa" }}>Live Dashboard</span>
            <span className="text-[10px] rounded-full px-2 py-0.5 font-bold"
              style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)" }}>
              ● AUTO-REFRESH
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display italic leading-[0.95] tracking-tight mb-4"
            style={{ color: "#ffffff", fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
            Public <em>Stats</em>
          </h1>
          <p className="text-base font-medium max-w-xl" style={{ color: "#cccccc" }}>
            Live data from GitHub API and visitor analytics. Refreshes every 5 minutes.
          </p>
        </div>
      </section>

      {/* GitHub Overview */}
      <section className="py-12 px-6" style={{ background: "#0d0d0d" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-sm uppercase tracking-[0.2em] mb-6 font-bold" style={{ color: "#aaaaaa" }}>
            GitHub Overview
          </h2>
          {ghLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-32 rounded-2xl animate-pulse" style={{ background: "#141414" }} />
              ))}
            </div>
          ) : gh ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatCard icon="📁" label="Public Repos"   value={gh.user.publicRepos}   sub="All repositories" />
              <StatCard icon="👥" label="Followers"      value={gh.user.followers}      sub="GitHub followers" />
              <StatCard icon="➡️" label="Following"      value={gh.user.following}      sub="Accounts followed" />
              <StatCard icon="⭐" label="Total Stars"    value={gh.totalStars}          sub="Across all repos" />
            </div>
          ) : (
            <p className="text-sm" style={{ color: "#555" }}>Could not load GitHub data.</p>
          )}
        </div>
      </section>

      {/* Top Repos */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-sm uppercase tracking-[0.2em] mb-6 font-bold" style={{ color: "#aaaaaa" }}>
            10 Most Recently Updated Repos
          </h2>
          {ghLoading ? (
            <div className="flex flex-col gap-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-16 rounded-xl animate-pulse" style={{ background: "#141414" }} />
              ))}
            </div>
          ) : gh?.topRepos.length ? (
            <div className="flex flex-col gap-3">
              {gh.topRepos.map((repo) => (
                <a key={repo.name} href={repo.url} target="_blank" rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 hover:border-[#89AACC] hover:-translate-y-0.5"
                  style={{ background: "#141414", borderColor: "#2a2a2a" }}>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold group-hover:text-[#89AACC] transition-colors truncate" style={{ color: "#ffffff" }}>
                      {repo.name}
                    </p>
                    {repo.description && (
                      <p className="text-xs mt-0.5 truncate font-medium" style={{ color: "#666" }}>{repo.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {repo.language && (
                      <span className="text-xs rounded-full px-2 py-0.5 font-semibold hidden sm:block"
                        style={{ background: "#1a1a1a", color: "#aaaaaa", border: "1px solid #333" }}>
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-xs font-bold" style={{ color: "#fbbf24" }}>
                      ★ {repo.stars}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: "#666" }}>
                      ⑂ {repo.forks}
                    </span>
                    <span className="text-xs font-medium hidden md:block" style={{ color: "#444" }}>
                      {timeAgo(repo.updatedAt)}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-sm" style={{ color: "#555" }}>No repos found.</p>
          )}
        </div>
      </section>

      {/* Visitor Analytics */}
      <section className="py-12 px-6" style={{ background: "#0d0d0d" }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-sm uppercase tracking-[0.2em] font-bold" style={{ color: "#aaaaaa" }}>
              Visitor Analytics
            </h2>
            {!visLoading && vis && (
              <span className="text-xs font-bold rounded-full px-3 py-1"
                style={{ background: "rgba(137,170,204,0.1)", color: "#89AACC", border: "1px solid rgba(137,170,204,0.2)" }}>
                {vis.total} total visits
              </span>
            )}
          </div>

          {visLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-16 rounded-xl animate-pulse" style={{ background: "#141414" }} />
              ))}
            </div>
          ) : vis && vis.countries.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
                {vis.countries.slice(0, 12).map(({ country, count }) => (
                  <div key={country} className="flex items-center justify-between p-4 rounded-xl border"
                    style={{ background: "#141414", borderColor: "#2a2a2a" }}>
                    <span className="text-sm font-semibold" style={{ color: "#dddddd" }}>{country}</span>
                    <span className="text-sm font-bold rounded-full px-3 py-0.5"
                      style={{ background: "rgba(137,170,204,0.1)", color: "#89AACC" }}>
                      {count}
                    </span>
                  </div>
                ))}
              </div>

              {/* Recent visits */}
              <h3 className="text-xs uppercase tracking-[0.2em] mb-4 font-bold" style={{ color: "#555" }}>
                Recent Visits
              </h3>
              <div className="flex flex-col gap-2">
                {vis.recent.slice(0, 10).map((v, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs py-2 border-b" style={{ borderColor: "#1a1a1a" }}>
                    <span className="font-semibold" style={{ color: "#dddddd" }}>{v.country}</span>
                    <span style={{ color: "#555" }}>·</span>
                    <span style={{ color: "#666" }}>{v.city}</span>
                    <span style={{ color: "#555" }}>·</span>
                    <span style={{ color: "#89AACC" }}>{v.page}</span>
                    <span className="ml-auto" style={{ color: "#444" }}>
                      {new Date(v.timestamp).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="p-8 rounded-2xl border text-center" style={{ background: "#141414", borderColor: "#2a2a2a" }}>
              <p className="text-sm font-semibold mb-2" style={{ color: "#aaaaaa" }}>Visitor tracking not configured yet</p>
              <p className="text-xs" style={{ color: "#555" }}>
                Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_KEY to your Vercel environment variables to enable visitor tracking.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
