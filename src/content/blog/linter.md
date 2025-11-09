---
title: 'The dreaded linter'
description: 'CI/CD components for absolute n00bs'
pubDate: 'Oct 01 2025'
tags: ['CICD']
heroImage: '../../assets/blog-placeholder-cicd.png'
---

# The dreaded linter
You've started your new job and are excited (or afraid) to open your first Pull Request.
You bravely push your code and wait for the CI/CD pipeline to run. As you sit there watching it,
you see the dreaded red X popping up next to the linter step. Your build has failed!

The linter has judged your code and convicted you of style violations.\

so what is a linter anyway?

## What is a linter?
A linter is a tool that analyzes your code for potential errors, coding standard violations, and stylistic issues.

Linters help maintain code quality and consistency across a codebase by enforcing predefined rules and best practices.

## Why use a linter?
Using a linter can have many benefits:
- **Consistency**: Linters enforce a consistent coding style across a team, making it easier to read and maintain code.
- **Error Detection**: Linters can catch errors and bugs before they make it into production.
- **Best Practices**: Linters can help enforce best practices and coding standards, improving the overall quality of the codebase.

## Common linters
So you don't need tot know them, but here's a few ones you might come across:
- **JavaScript/TypeScript**: ESLint, TSLint
- **Python**: Pylint, Flake8
- **Java**: Checkstyle, PMD

## Configuration
Linters can be configured with a config-file (go figure, right!). It's usually a JSON, YAML, or JavaScript file that specifies the rules and settings for the linter.
The good news is, it's not very hard to do! But usually you'd find it already set up in your project.
Here's an example of an ESLint configuration file (.eslint.json):
```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": "eslint:recommended",
  "rules": {
    "indent": ["error", 2],
    "quotes": ["error", "single"],
    "semi": ["error", "always"]
  }
}
```

As I said earlier, linters can be integrated into your CI/CD pipeline to automatically check code quality on each commit or pull request.
More on the CI/CD pipelines in future posts! There's just too much to cover in one go!

### A short history of the linter
The term "linter" originated from a tool called "Lint" developed in 1978 by Stephen C. Johnson at Bell Labs.
It was created to analyze C source code for potential errors and stylistic issues.
The name "Lint" was inspired by the small bits of fiber and fluff that accumulate on clothing, symbolizing the tool's purpose of cleaning up code.

’80s–’90s — Static analysis gets serious
Tools like PC-lint bring linting to PCs; other languages copy the idea. Compilers add more warnings, but lint-style tools stay stricter (and grumpier).

Early 2000s — Style cops arrive
Pylint (Python, ~2001) and Checkstyle (Java, 2001) enforce both correctness and code etiquette. Your braces are now a moral issue.

2002 → 2013 — JavaScript drama era
JSLint (2002, Douglas Crockford) is brilliant but opinionated like a tiny dictator. JSHint (2010) loosens the rules. ESLint (2013, Nicholas C. Zakas) says, “Make your own rules,” and becomes the standard.

2010s — Everywhere, all at once
Linters plug into IDEs, pre-commit hooks, and CI. Autofix becomes normal. Prettier (2017) steals formatting wars so linters can focus on logic, not tabs vs spaces.

Today — Linting = quality gate. Linters, helping you avoid style faux pas and yelling at you, since 1978.


