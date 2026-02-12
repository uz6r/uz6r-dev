import js from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import("eslint").Linter.Config[]} */
export default [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        ignores: ["node_modules/", "dist/"],
    },
    {
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                ecmaFeatures: { jsx: true },
            },
            globals: {
                React: "readonly",
                JSX: "readonly",
            },
        },
    },
];
