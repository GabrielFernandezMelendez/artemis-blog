export function formatDate(date: string, format: "short" | "long" = "short"): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: format === "long" ? "long" : "short",
    day: "numeric",
    year: "numeric",
  }).toUpperCase();
}