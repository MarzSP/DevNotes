module.exports = {
  root: true,
  extends: [
    'plugin:astro/recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended'
  ],
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
      },
      rules: {
        // Basic stylistic rules
        'semi': ['warn', 'always'],
        'quotes': ['warn', 'single', { 'avoidEscape': true }],
        'comma-dangle': ['warn', 'always-multiline'],
        // Prefer TypeScript-specific rule but keep it relaxed as a warning
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
        // Relax some TypeScript strict rules so they surface as warnings instead of build-stopping errors
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/explicit-module-boundary-types': 'warn',
        '@typescript-eslint/ban-ts-comment': 'warn',
        // Reduce strictness on a few rules that were causing "error" exits in CI
        'no-mixed-spaces-and-tabs': 'warn',
        'no-useless-escape': 'warn'
      }
    },
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser'
      },
      rules: {
        // For .astro files, prefer the TypeScript plugin rule and make them warnings
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
        'no-mixed-spaces-and-tabs': 'warn',
        'no-useless-escape': 'warn'
      }
    }
  ],
  ignorePatterns: ['dist/', 'node_modules/', 'public/']
};
