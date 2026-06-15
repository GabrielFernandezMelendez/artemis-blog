import js from "@eslint/js";
import astro from "eslint-plugin-astro";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";

export default [
  js.configs.recommended,

  // Solo archivos TypeScript/JavaScript
  {
    files: ["**/*.{ts,js}"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        fetch: "readonly",
        global: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },

  // Archivos Astro por separado (tiene su propio parser interno)
  ...astro.configs.recommended,

  // Ignorar archivos generados
  {
    ignores: [".astro/**", "dist/**", "node_modules/**"],
  },
];
