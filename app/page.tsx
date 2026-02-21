import { supabase } from "@/lib/supabaseClient";
import { dayOfYearNY, getNYDateString } from "@/lib/date";

async function getMessage() {
  const today = getNYDateString();

  // 1️⃣ Check if there is a scheduled message for today
  const { data: scheduled } = await supabase
    .from("messages")
    .select("text, reference")
    .eq("scheduled_date", today)
    .eq("is_active", true)
    .limit(1);

  if (scheduled && scheduled.length > 0) {
    return scheduled[0];
  }

  // 2️⃣ Otherwise rotate through all active messages
  const { data: pool } = await supabase
    .from("messages")
    .select("text, reference")
    .eq("is_active", true)
    .is("scheduled_date", null)
    .order("created_at", { ascending: true });

  if (!pool || pool.length === 0) return null;

  const index = dayOfYearNY() % pool.length;
  return pool[index];
}

export default async function Home() {
  const message = await getMessage();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-semibold mb-2">
          Get Your Daily Jenn Juice ☀️
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          A little encouragement for wherever you are today.
        </p>

        {message ? (
          <>
            <p className="text-lg leading-relaxed mb-4">
              {message.text}
            </p>
            {message.reference && (
              <p className="text-sm text-gray-500">
                — {message.reference}
              </p>
            )}
          </>
        ) : (
          <p>No message found.</p>
        )}
      </div>
    </div>
  );
}