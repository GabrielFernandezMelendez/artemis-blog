import { describe, it, expect } from "vitest";
import { formatDate } from "../../lib/formatDate";

describe("formatDate", () => {
  const cases = [
    { date: "2026-04-01", format: "short", expected: "APR 1, 2026" },
    { date: "2026-04-01", format: "long", expected: "APRIL 1, 2026" },
    { date: "2026-12-25", format: "short", expected: "DEC 25, 2026" },
    { date: "2026-12-25", format: "long", expected: "DECEMBER 25, 2026" },
    { date: "fecha-invalida", format: "short", expected: "INVALID DATE" },
    { date: "2026-04-01", format: undefined, expected: "APR 1, 2026" },
    { date: "2026", format: undefined, expected: "APR 1, 2026" },
  ] as const;

  it.each(cases)(
    'returns "$expected" for $date (format: $format)',
    ({ date, format, expected }) => {
      const result = formatDate(
        date,
        format as Parameters<typeof formatDate>[1],
      );
      expect(result).toBe(expected);
      expect(result).toBe(result.toUpperCase());
    },
  );
});
