import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.all,
  ...tseslint.configs.strict,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      camelcase: 'off',
      curly: 'off',
      'func-names': 'off',
      'id-length': 'off',
      indent: ['error', 2],
      'init-declarations': 'off',
      'max-lines-per-function': 'off',
      'max-statements': 'off',
      'no-duplicate-imports': 'off',
      'no-invalid-this': 'off',
      'no-magic-numbers': 'off',
      'no-ternary': 'off',
      'no-undefined': 'off',
      'no-warning-comments': 'off',
      'one-var': 'off',
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'sort-imports': 'off',
    },
  },
];
