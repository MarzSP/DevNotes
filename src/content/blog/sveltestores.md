---
title: 'Svelte Stores: Global State Without the Misery'
description: 'A simple take on global state'
pubDate: 'Mar 11 2026'
tags: ['Code', 'Frameworks']
heroImage: '../../assets/blog-placeholder-code.png'
---

If you've ever prop-drilled your way through five components just to get a boolean from A to E, Svelte stores are going to feel like a genuine relief.

I came to Svelte after a couple of years in React, and global state management was honestly one of the things I'd made my peace with hating. Redux felt like filing paperwork to change a variable. Context was better but had its own footguns. Zustand was fine, actually, but it was still a library I had to install and learn.

Svelte stores are built in. And they're so simple that the first time I used one I spent ten minutes wondering what I was missing.

I wasn't missing anything. They're just straightforward.

## What a store actually is

A store is an object that holds a value and lets things subscribe to changes in it. When the value updates, every subscriber gets notified automatically. That's the whole model.

You define a writable store like this:

```js
import { writable } from 'svelte/store';

export const count = writable(0);
```

And in any component, you can read it, set it, or update it:

```js
import { count } from './stores.js';

count.set(5);
count.update(n => n + 1);
```

## The `$` prefix — Svelte's magic shorthand

Manually subscribing and unsubscribing from stores is a bit tedious. Svelte knows this, so inside any `.svelte` file you can prefix a store name with `$` and Svelte handles the subscription and cleanup for you automatically:

```svelte
<script>
  import { count } from './stores.js';
</script>

<p>Current count: {$count}</p>
<button on:click={() => count.update(n => n + 1)}>Add one</button>
```

That's it. No `useSelector`. No `connect()`. No boilerplate.

The component re-renders when `count` changes, and when the component is destroyed, the subscription is cleaned up. Svelte just takes care of it.

## Readable stores — for values you don't want anyone changing

Sometimes you want a shared value that only one place should be able to update — like the current time, or data coming from a WebSocket. That's what `readable` is for:

```js
import { readable } from 'svelte/store';

export const time = readable(new Date(), set => {
  const interval = setInterval(() => set(new Date()), 1000);
  return () => clearInterval(interval);
});
```

Components can read `$time` freely, but nothing outside that store definition can call `set` on it. It's a clean way to expose real-time data without accidentally letting some stray button update it.

## Derived stores — computed values

If you've got a store and want to expose a transformed version of it, `derived` is what you want:

```js
import { derived } from 'svelte/store';
import { count } from './stores.js';

export const doubled = derived(count, $count => $count * 2);
```

`$doubled` updates automatically whenever `count` changes. You can derive from multiple stores too. I use this a lot for things like "is the form valid?" — derived from several individual field stores.

## One thing to watch out for

Stores are module-level singletons. That's great for sharing state across your whole app, but it means if you're doing server-side rendering with SvelteKit, you need to be careful. A store defined at module level will be shared across all users on the server, which is very much not what you want. SvelteKit has patterns for handling this with context, but it's worth knowing about before you run into it at 11pm.

Other than that: they're just good. Genuinely the first global state solution I've used where I didn't have to talk myself into liking it.