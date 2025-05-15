import js from '@eslint/js';

/** @type {import("eslint").Linter.FlatConfig} */
export default [
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      // Règles personnalisées ici
    },
  },
];