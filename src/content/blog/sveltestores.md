---
title: 'Svelte Stores: Global State Without the Misery'
description: 'A simple take on global state'
pubDate: 'Mar 11 2026'
tags: ['Code', 'Frameworks']
heroImage: '../../assets/blog-placeholder-code.png'
---

If you've ever prop-drilled your way through five components just to get a boolean from A to E, Svelte stores are going to feel like a genuine relief.

My frontend background is mostly Vue and Blazor, and honestly, global state was one of those things I'd just quietly accepted as annoying. In Vue you'd reach for Vuex and suddenly you're writing mutations and actions and mapState just to update a counter. Pinia is better, but it's still a whole thing. In Blazor you're either cascading parameters down the tree or wiring up a scoped service and calling StateHasChanged() in the right places and hoping for the best.

Svelte stores are built in. No install, no setup. The first time I used one I kept looking around for the part I was missing.

There wasn't one.

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

That's it. No mapState. No commit. No boilerplate.

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

Stores are module-level singletons. Great for sharing state across your whole app, but if you're doing server-side rendering with SvelteKit, that's a problem. A store defined at module level will be shared across all users on the server, which is very much not what you want. SvelteKit has patterns for handling this with context, but it's worth knowing about before you run into it at 11pm.

Other than that: they're just good. Genuinely the first global state solution I've used where I didn't have to talk myself into liking it.
