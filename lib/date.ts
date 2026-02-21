export function getNYDateString(): string {
  // Returns YYYY-MM-DD in America/New_York
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);

  const y = parts.find((p) => p.type === "year")?.value;
  const m = parts.find((p) => p.type === "month")?.value;
  const d = parts.find((p) => p.type === "day")?.value;

  return `${y}-${m}-${d}`;
}

export function dayOfYearNY(): number {
  // Day of year in America/New_York
  const now = new Date();
  const ny = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));

  const start = new Date(ny.getFullYear(), 0, 0);
  const diff = ny.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;

  return Math.floor(diff / oneDay);
}