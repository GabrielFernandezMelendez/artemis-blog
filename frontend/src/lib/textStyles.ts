export const variantStyles: Record<string, string> = {
  display: "text-display font-bold leading-tight",
  h1: "text-h1 font-bold leading-tight",
  h2: "text-h2 font-bold leading-tight",
  h3: "text-h3 font-bold leading-tight",
  "body-lg": "text-body-lg font-regular leading-relaxed",
  body: "text-body font-regular leading-relaxed",
  caption: "text-caption font-regular",
  label: "text-label font-semibold",
};

export function resolveTextStyles(variant: string, className: string): string {
  const base = variantStyles[variant] ?? "";
  return `${base} ${className}`.trim();
}