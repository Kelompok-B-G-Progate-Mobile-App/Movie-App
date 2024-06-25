import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import tseslint from '@typescript-eslint/eslint-plugin';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import reactPlugin from 'eslint-plugin-react';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: './tsconfig.json'
      },
      globals: globals.browser,
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'react': reactPlugin
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...pluginReactConfig.rules,
      ...prettierConfig.rules 
    }
  }
];
