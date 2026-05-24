"use client";

import { useEffect, useState } from "react";

export interface GitHubLanguage {
  name: string;
  bytes: number;
  percent: number;
}

export interface GitHubRepo {
  name: string;
  fullName: string;
  description: string | null;
  stars: number;
  forks: number;
  language: string | null;
  updatedAt: string;
  url: string;
}

export interface GitHubData {
  user: {
    login: string;
    name: string;
    followers: number;
    following: number;
    publicRepos: number;
    avatarUrl: string;
  };
  totalStars: number;
  languages: GitHubLanguage[];
  topRepos: GitHubRepo[];
  yearsExperience: number;
}

export function useGitHub(refreshMs = 300_000) {
  const [data, setData]       = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/github");
      if (!res.ok) throw new Error("API error");
      const json = await res.json();
      setData(json);
      setError(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, refreshMs);
    return () => clearInterval(id);
  }, [refreshMs]);

  return { data, loading, error };
}
