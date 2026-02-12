/** @type {import("eslint").Linter.Config} */
module.exports = {
    extends: ["eslint:recommended"],
    env: { node: true },
    parser: "@typescript-eslint/parser",
    parserOptions: { ecmaVersion: 2022, sourceType: "module" },
    plugins: ["@typescript-eslint"],
    ignorePatterns: ["node_modules/", "dist/"],
};
