export function formatDate(date: string, format: "short" | "long" = "short"): string {
  if (/^\d{4}$/.test(date)) {
    date = `${date}-04-01`;
  }
  return new Date(date)
    .toLocaleDateString("en-US", {
      month: format === "long" ? "long" : "short",
      day: "numeric",
      year: "numeric",
    })
    .toUpperCase();
}
