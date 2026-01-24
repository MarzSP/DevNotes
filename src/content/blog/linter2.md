---
title: 'How to build a linter'
description: 'Build your own linter from scratch'
pubDate: 'Nov 12 2025'
tags: ['CICD']
heroImage: '../../assets/blog-placeholder-cicd.png'
---

You've probably already met the dreaded linter. If not, fear not, read this first: [The dreaded Linter](https://marzsp.github.io/DevNotes/blog/linter/)

Today, we're taking this relationship to the next level. Instead of fearing the Linter, you're going to build one!
Let's go!

### First: What Isn’t a Linter?

A linter is **not**:

- A compiler

- A formatter

A linter analyzes code for:
- Suspected errors

- Bad patterns

- Style violations

- *“Why did I write that?!”* situations

### Let’s Build One Then

To build a linter, you need three things:

1. Code to inspect

2. Rules to enforce

3. A system to yell at you when you break those rules

This is where ESLint (or your linter of choice) and GitHub Actions shine together like a passive-aggressive duo.

#### Step 1 — Pick Your Linter

For JavaScript or TypeScript, use ESLint.
It’s flexible, powerful, and comes with fewer opinions than your senior developer.

Install it:
```
npm install eslint --save-dev
```
Initialize it:
```
npx eslint --init
```
This creates an `.eslintrc` file where you can define your rules.

I have a working linter for this project. You can check it out here: [Marzsp's Repo: Linter](https://github.com/MarzSP/DevNotes/blob/main/.github/workflows/lint.yml)

#### Step 2 — Define Your Rules
In your `.eslintrc` file, you can specify rules.
For example, to enforce single quotes and disallow console logs:
```json
{
  "rules": {
    "quotes": ["error", "single"],
    "no-console": "warn"
  }
}
```
You can find a full list of ESLint rules [here](https://eslint.org/docs/rules/).

#### Step 3 — How to make it work
Run the linter:
```
npx eslint .
```
This command checks all files in the current directory.
To automatically fix problems where possible:
```
npx eslint . --fix
```
#### Step 4 — Automate with GitHub Actions
To make sure your linter runs on every push or pull request, set up a GitHub Action.
Create a file at `.github/workflows/lint.yml`:
```yaml
name: lint

on:
  push:
  pull_request:

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x]

    steps:
    - uses: actions/checkout@v3

    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}

    - run: npm install
    - run: npm run lint
````
Let’s break down what this masterpiece does.

1. What's in a name?

> lint

KISS. That means Keep It Simple, Stupid. 

2. Triggers

 Runs on:

- every push

- every pull request

- every time you make a typo in a branch name

- every moment you least expect it *just kidding*

3. Runner
````
ubuntu-latest 
````    
This is just GitHub’s polite way of saying:
“We’re judging your code from a Linux box. Behave or the lil penguin will....”

4. Steps

- Checkout your repo

- Install Node

- Install dependencies

- Run your linter


Now all you have to do is smile, 'cos you've just built a linter! w00p!





