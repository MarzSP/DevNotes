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
        '@typescript-eslint/ban-ts-comment': 'warn'
      }
    },
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser'
      },
      rules: {}
    }
  ],
  ignorePatterns: ['dist/', 'node_modules/', 'public/']
};
