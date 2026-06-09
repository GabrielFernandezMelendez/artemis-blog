/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";

export default getViteConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.{js,ts}"],
    passWithNoTests: true,
    setupFiles: ["./src/test/setup.ts"],
  },
});
