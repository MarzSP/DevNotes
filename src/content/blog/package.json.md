---
title: 'Package.json'
description: 'Learning to work with package.json files'
pubDate: 'Oct 6 2025'
tags: ['javascript']
heroImage: '../../assets/blog-placeholder-js.png'
---

## Learning to Work with package.json

The package.json. Every JavaScript project has one. It feels like a weird right of passage to write a blogpost about it.
Let’s work on explaining what it is, why it matters, and how to use it effectively.

### What is package.json?

Think of it as your project’s manifest.
It tells Node (and anyone else who looks) what your project is called, what version it’s on, what dependencies it needs, and a few other helpful bits like scripts and metadata.

When you install or run anything through npm (or yarn/pnpm), the package manager reads your package.json file first.
It uses the dependency list to resolve which packages and which versions to install.

Each dependency version often includes a semantic version range, like "^4.19.0".
That (^) means:

“Install version 4.19.0 or any newer patch/minor version — but don’t jump to version 5.”

Once npm resolves all these ranges, it downloads the exact versions into your node_modules folder and records them in package-lock.json.

When you later run npm ci or npm install again, npm checks that lock file to reproduce the exact same dependency tree.

So package.json defines intent,
and package-lock.json locks in reality.

That’s how Node projects stay (mostly) consistent across machines, builds, and continuous deployment environments.

A typical one looks a bit like this:
```
{
"name": "marzs-brilliant-app",
"version": "1.0.0",
"description": "An app that does a thing",
"scripts": {
"start": "node index.js",
"test": "vitest"
},
"dependencies": {
"express": "^4.19.0"
},
"devDependencies": {
"eslint": "^9.0.0"
}
}
````
### What About package-lock.json?

This is where new devs may get confused.
package.json says what you depend on (“Express version 4-point-something”).
package-lock.json says exactly which versions you’ve actually installed (“Express 4.19.2, with this hash”).

The lock file ensures everyone on your team installs the same versions, so your project doesn’t behave differently on someone else’s machine.

If package.json is the shopping list,  then package-lock.json is the receipt showing what you actually bought.


### Do You Commit package.json?

Yes.
It’s how your project declares its dependencies. And while you’re at it, commit package-lock.json too.
There used to be debates about this years ago (“should I commit it?” “is it machine-specific?”), but nowadays the answer is a clear yes.
It helps ensure consistent builds and faster installs for everyone.

### Things You Don’t Get Told About package.json

A few handy bits people often forget to mention:

You can add scripts for anything.
For example, "lint": "eslint ." or "format": "prettier --write .".
You can chain them too:
"check": "npm run lint && npm run test"

engines field matters.
You can specify which Node version your app supports:
````
"engines": { "node": ">=18" }
````
This will help avoid the "it works on my machine" problem.