import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const { page } = await req.json();

    // Get visitor IP
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    // Fetch geo from ipapi.co (free, no key needed)
    let country = "Unknown";
    let city    = "Unknown";

    if (ip !== "unknown" && ip !== "127.0.0.1" && !ip.startsWith("192.168")) {
      try {
        const geoRes = await fetch(`https://ipapi.co/${ip}/json/`, {
          next: { revalidate: 0 },
        });
        if (geoRes.ok) {
          const geo = await geoRes.json();
          country = geo.country_name || "Unknown";
          city    = geo.city || "Unknown";
        }
      } catch {
        // geo lookup failed — continue without it
      }
    }

    // Store in Supabase if configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      await supabase.from("visitors").insert({
        country,
        city,
        page: page || "/",
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({ ok: true, country, city });
  } catch (err) {
    console.error("Track route error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
