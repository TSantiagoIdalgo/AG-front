import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import tseslint from "typescript-eslint";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.all,
  ...tseslint.configs.strict,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      "curly": "off",
      // eslint-disable-next-line no-magic-numbers
      "indent": ["error", 2],
      "max-lines-per-function": "off",
      "no-duplicate-imports": "off",
      "no-ternary": "off",
      "no-undefined": "off",
      "one-var": "off",
      "semi": ["error", "always"],
    }
  }
];