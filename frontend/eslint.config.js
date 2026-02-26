import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),

  {
    files: ["**/*.{js,jsx}"],

    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],

    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },

    plugins: {
      "simple-import-sort": simpleImportSort,
    },

    rules: {
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],

      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // 1️⃣ React first
            ["^react", "^react-dom"],

            // 2️⃣ Third party packages
            ["^@?\\w"],

            // 3️⃣ Absolute imports (@/)
            ["^@/"],

            // 4️⃣ Relative imports
            ["^\\./", "^\\.\\./"],

            // 5️⃣ Style imports (CSS last)
            ["^.+\\.?(css)$"],
          ],
        },
      ],

      "simple-import-sort/exports": "error",
    },
  },
]);
