import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // The project previously used Vite. These unreferenced legacy files are
    // retained for history but are not part of the Next.js application.
    "src/App.tsx",
    "src/main.tsx",
    "src/data.ts",
    "src/styles.css",
  ]),
]);

export default eslintConfig;
