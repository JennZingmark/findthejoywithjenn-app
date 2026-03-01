import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { getNYDateString } from "@/lib/date";

export async function GET() {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return NextResponse.json(
      { ok: false, reason: "no supabase client (missing env vars?)" },
      { status: 500 }
    );
  }

  const today = getNYDateString();

  const scheduled = await supabase
    .from("messages")
    .select("text, reference, scheduled_date, is_active")
    .eq("scheduled_date", today)
    .eq("is_active", true)
    .limit(1);

  const pool = await supabase
    .from("messages")
    .select("text, reference, scheduled_date, is_active")
    .eq("is_active", true)
    .is("scheduled_date", null)
    .order("created_at", { ascending: true })
    .limit(3);

  return NextResponse.json({
    ok: true,
    today,
    scheduledCount: scheduled.data?.length ?? 0,
    scheduledSample: scheduled.data?.[0] ?? null,
    poolCount: pool.data?.length ?? 0,
    poolSample: pool.data ?? [],
    scheduledError: scheduled.error?.message ?? null,
    poolError: pool.error?.message ?? null,
  });
}