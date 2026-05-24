import { NextResponse } from "next/server";

const GH_USER = "AhmedIbrahimofficial";
const GH_API  = "https://api.github.com";

function ghHeaders() {
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    h["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return h;
}

export async function GET() {
  try {
    // Fetch user profile + all repos in parallel
    const [userRes, reposRes] = await Promise.all([
      fetch(`${GH_API}/users/${GH_USER}`, {
        headers: ghHeaders(),
        next: { revalidate: 300 }, // cache 5 min
      }),
      fetch(`${GH_API}/users/${GH_USER}/repos?per_page=100&sort=updated`, {
        headers: ghHeaders(),
        next: { revalidate: 300 },
      }),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      return NextResponse.json({ error: "GitHub API error" }, { status: 502 });
    }

    const user  = await userRes.json();
    const repos = await reposRes.json();

    // Language byte counts across all repos
    const langBytes: Record<string, number> = {};
    for (const repo of repos) {
      if (repo.language) {
        langBytes[repo.language] = (langBytes[repo.language] || 0) + (repo.size || 1);
      }
    }

    // Sort languages by usage
    const totalBytes = Object.values(langBytes).reduce((a, b) => a + b, 0);
    const languages = Object.entries(langBytes)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([name, bytes]) => ({
        name,
        bytes,
        percent: Math.round((bytes / totalBytes) * 100),
      }));

    // Top 10 recently updated repos
    const topRepos = repos.slice(0, 10).map((r: {
      name: string;
      full_name: string;
      description: string | null;
      stargazers_count: number;
      forks_count: number;
      language: string | null;
      updated_at: string;
      html_url: string;
    }) => ({
      name: r.name,
      fullName: r.full_name,
      description: r.description,
      stars: r.stargazers_count,
      forks: r.forks_count,
      language: r.language,
      updatedAt: r.updated_at,
      url: r.html_url,
    }));

    // Total stars across all repos
    const totalStars = repos.reduce(
      (sum: number, r: { stargazers_count: number }) => sum + r.stargazers_count,
      0
    );

    return NextResponse.json({
      user: {
        login: user.login,
        name: user.name,
        followers: user.followers,
        following: user.following,
        publicRepos: user.public_repos,
        avatarUrl: user.avatar_url,
      },
      totalStars,
      languages,
      topRepos,
      yearsExperience: new Date().getFullYear() - 2020,
    });
  } catch (err) {
    console.error("GitHub route error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
