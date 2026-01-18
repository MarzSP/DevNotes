---
title: 'Thoughts on Big O Notation'
description: 'Having your class truths challenged'
pubDate: 'Dec 6 2025'
tags: ['Code']
heroImage: '../../assets/blog-placeholder-code.png'
---
In college, I learned that Big O notation is this strict set of rules for measuring how efficient algorithms are. You know, like O(1) for constant time, O(n) for linear time, and so on. 
It's taught so that we have tools to reason about performance. We learn to compare algorithms, rank them by efficiency and all think that O(n log n) is always better than O(n²).

### What happened?
Recently, a friend of mine challenged this idea. And that got me thinking and researching - Is Big O really as absolute as we were taught?

“Computers are absurdly fast now,” they said. “Memory is massive. Most of the time, none of this really matters.”

## The real world is messy
Big O notation is a beautifully clean abstraction. It politely ignores almost everything that makes real software slow. It doesn’t care about constants. It doesn’t care about cache locality. It doesn’t care that your elegant O(n log n) solution allocates seventeen objects per iteration and trips over the garbage collector.

An O(n²) algorithm working on a few hundred items will happily run faster than a theoretically superior alternative that spends its time creating hash maps, boxing primitives, and generally having ideas above its station.

In real systems, performance problems rarely come from algorithms. They come from databases, networks, disk I/O, logging frameworks, JSON parsing, and that one API call that everyone swears is “basically instant.”

In that context, Big O can start to feel like learning the aerodynamics of flight when your real problem is that the plane has no fuel.

## What Big O is actually for

I like to think that Big O notation is like a pair of glasses.

It helps you see shape instead of detail. Patterns instead of numbers. It trains you to notice when work multiplies quietly, when a “small” decision is actually doing something once per item, per request, per user, per day.

More than anything, it teaches restraint. It whispers, “This will be fine… until it isn’t.”

That instinct is valuable, even if the exact notation rarely shows up in real discussions once you leave the classroom.

Big O shouldn’t be worshipped, and it shouldn’t be ignored. It’s a warning system, not a performance guarantee.

Write clear code first. Measure when it matters. Optimise where it hurts. (And do actually keep Big O in the back of your mind!)

So I like to think:

**Big O notation is a tool, not a rulebook. Use it wisely.**