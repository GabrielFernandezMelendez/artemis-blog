import { describe, it, expect } from "vitest";
import { buildPostUrl, buildAriaLabel, resolveVariant } from "../../molecules/PostCard/postCard";

describe("postCard utils", () => {
  it("builds the correct URL from the slug", () => {
    const result = buildPostUrl("artemis-ii-launch");
    expect(result).toBe("/posts/artemis-ii-launch");
  });

  it("builds the correct aria-label from the title", () => {
    const result = buildAriaLabel("Artemis II Launch");
    expect(result).toBe("Leer artículo: Artemis II Launch");
  });

  it("default variant is grid", () => {
    const result = resolveVariant(undefined);
    expect(result).toBe("grid");
  });

  it("detail variant resolves correctly", () => {
    const result = resolveVariant("detail");
    expect(result).toBe("detail");
  });
});
