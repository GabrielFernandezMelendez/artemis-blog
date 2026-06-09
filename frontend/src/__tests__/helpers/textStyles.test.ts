import { describe, it, expect } from "vitest";
import { variantStyles, resolveTextStyles } from "../../lib/textStyles";

describe("textStyles", () => {
  it("variant h1 devuelve las clases correctas", () => {
    const result = variantStyles["h1"];
    expect(result).toContain("text-h1");
    expect(result).toContain("font-bold");
  });

  it("variant label devuelve las clases correctas", () => {
    const result = variantStyles["label"];
    expect(result).toContain("text-label");
    expect(result).toContain("font-semibold");
  });

  it("un variant inexistente devuelve string vacío", () => {
    const result = variantStyles["inexistente"];
    expect(result).toBeUndefined();
  });

  it("resolveTextStyles combina las clases del variant con las del padre", () => {
    const result = resolveTextStyles("h1", "mt-4");
    expect(result).toContain("text-h1");
    expect(result).toContain("mt-4");
  });
});
