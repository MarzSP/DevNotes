This project includes ESLint configuration and a GitHub Action to run lint checks.

Run locally:

1. Install dev dependencies:
   npm install

2. Run linter:
   npm run lint

To automatically fix problems where possible:

   npm run lint:fix

GitHub Action:
- `.github/workflows/lint.yml` runs `npm ci` and `npm run lint` on push and pull requests to `main`.
