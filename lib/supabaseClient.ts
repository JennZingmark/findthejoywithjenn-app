import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null | undefined;

/**
 * IMPORTANT:
 * - Returns null if env vars are missing (prevents Vercel build from crashing).
 * - Creates the client lazily the first time you call it.
 */
export function getSupabaseClient(): SupabaseClient | null {
  if (cached !== undefined) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anon) {
    cached = null;
    return cached;
  }

  cached = createClient(url, anon);
  return cached;
}