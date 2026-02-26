import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  return NextResponse.json({
    hasSupabaseUrl: Boolean(url),
    hasSupabaseAnonKey: Boolean(anon),
    supabaseUrlHost: url ? new URL(url).host : null,
    nodeEnv: process.env.NODE_ENV ?? null,
  });
}