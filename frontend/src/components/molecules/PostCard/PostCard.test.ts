import { describe, it, expect } from "vitest";
import { buildPostUrl, buildAriaLabel, resolveVariant } from "../../lib/postCard";

describe("postCard utils", () => {
  it("construye la URL correcta a partir del slug", () => {
    const result = buildPostUrl("artemis-ii-launch");
    expect(result).toBe("/posts/artemis-ii-launch");
  });

  it("construye el aria-label correcto a partir del título", () => {
    const result = buildAriaLabel("Artemis II Launch");
    expect(result).toBe("Leer artículo: Artemis II Launch");
  });

  it("el variant por defecto es grid", () => {
    const result = resolveVariant(undefined);
    expect(result).toBe("grid");
  });

  it("variant detail se resuelve correctamente", () => {
    const result = resolveVariant("detail");
    expect(result).toBe("detail");
  });
});
