export function buildPostUrl(slug: string): string {
  return `/posts/${slug}`;
}

export function buildAriaLabel(title: string): string {
  return `Leer artículo: ${title}`;
}

export function resolveVariant(variant?: string): "grid" | "detail" {
  return variant === "detail" ? "detail" : "grid";
}
