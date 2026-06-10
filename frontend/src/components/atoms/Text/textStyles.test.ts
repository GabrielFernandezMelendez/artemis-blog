import { describe, it, expect } from "vitest";
import { variantStyles, resolveTextStyles } from "./textStyles";

describe("textStyles", () => {
  it("h1 variant returns the correct classes", () => {
    const result = variantStyles["h1"];
    expect(result).toContain("text-h1");
    expect(result).toContain("font-bold");
  });

  it("label variant returns the correct classes", () => {
    const result = variantStyles["label"];
    expect(result).toContain("text-label");
    expect(result).toContain("font-semibold");
  });

  it("nonexistent variant returns undefined", () => {
    const result = variantStyles["inexistente"];
    expect(result).toBeUndefined();
  });

  it("resolveTextStyles combines variant classes with parent classes", () => {
    const result = resolveTextStyles("h1", "mt-4");
    expect(result).toContain("text-h1");
    expect(result).toContain("mt-4");
  });
});
