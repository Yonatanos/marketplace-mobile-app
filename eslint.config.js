const js = require('@eslint/js');
const globals = require('globals');
const tseslint = require('@typescript-eslint/eslint-plugin');
const tsparser = require('@typescript-eslint/parser');

module.exports = [
  {
    ignores: ['dist/**', 'node_modules/**', '.expo/**', 'babel.config.js'],
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsparser,
      globals: {
        ...globals.node,
        ...globals.browser,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'react-hooks': require('eslint-plugin-react-hooks'),
      'unused-imports': require('eslint-plugin-unused-imports'),
    },
    rules: {
      // React Hooks - Essential for React apps
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // TypeScript - Essential rules
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off', // Handled by unused-imports
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'no-undef': 'off', // TypeScript handles this
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-redeclare': 'off',
      '@typescript-eslint/no-redeclare': 'error',

      // Code Safety - Essential rules
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-console': 'off', // Allow console for logging utilities
      'no-debugger': 'error',
      'no-var': 'error',
      'prefer-const': 'error',

      // Code Quality - Keep code clean
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['if', 'block-like'], next: '*' },
        { blankLine: 'always', prev: 'block-like', next: '*' },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
      ],

      // String Literals - Prevent hardcoded strings outside constants
      'no-restricted-syntax': [
        'warn',
        {
          selector:
            'JSXText[value=/[A-Za-z]{2,}/], JSXAttribute[value.type="Literal"][value.value=/^[A-Z][a-z]+/]:not([name.name=/^(key|id|testID|accessibilityLabel)$/])',
          message:
            'Avoid hardcoded user-facing strings in JSX. Use constants from src/constants/strings.ts instead.',
        },
      ],
    },
  },
  {
    // Allow string literals in constants directory
    files: ['src/constants/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-syntax': 'off',
    },
  },
];
