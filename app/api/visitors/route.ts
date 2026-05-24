import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ countries: [], total: 0 });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from("visitors")
      .select("country, city, page, timestamp")
      .order("timestamp", { ascending: false });

    if (error) throw error;

    // Group by country
    const countryMap: Record<string, number> = {};
    for (const row of data || []) {
      const c = row.country || "Unknown";
      countryMap[c] = (countryMap[c] || 0) + 1;
    }

    const countries = Object.entries(countryMap)
      .sort((a, b) => b[1] - a[1])
      .map(([country, count]) => ({ country, count }));

    return NextResponse.json({
      countries,
      total: data?.length || 0,
      recent: (data || []).slice(0, 20),
    });
  } catch (err) {
    console.error("Visitors route error:", err);
    return NextResponse.json({ countries: [], total: 0 });
  }
}
