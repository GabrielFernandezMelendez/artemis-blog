import { describe, it, expect } from "vitest";
import { formatDate } from "../lib/formatDate";

describe("formatDate", () => {
  it("format short devuelve la fecha en formato corto", () => {
    const result = formatDate("2026-04-01", "short");
    expect(result).toBe("APR 1, 2026");
  });

  it("format long devuelve la fecha en formato largo", () => {
    const result = formatDate("2026-04-01", "long");
    expect(result).toBe("APRIL 1, 2026");
  });

  it("el resultado siempre está en mayúsculas", () => {
    const result = formatDate("2026-04-01", "short");
    expect(result).toBe(result.toUpperCase());
  });

  it("acepta fechas de distintos meses correctamente", () => {
    const short = formatDate("2026-12-25", "short");
    const long = formatDate("2026-12-25", "long");
    expect(short).toBe("DEC 25, 2026");
    expect(long).toBe("DECEMBER 25, 2026");
  });

  it("una fecha inválida no rompe la función", () => {
    const result = formatDate("fecha-invalida", "short");
    expect(result).toBe("INVALID DATE");
  });
});