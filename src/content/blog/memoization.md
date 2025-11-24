---
title: 'Memoization: Teaching Your Code to Remember Stuff
description: 'Memoization functions for efficiency'
pubDate: 'Nov 17 2025'
tags: ['Code']
heroImage: '../../assets/blog-placeholder-code.png'
---

Want to know how to make your code faster and more efficient? Meet **memoization** — the cheat code that helps your functions remember the results of big computations so they don’t have to redo the work every time.

Devs love Recursion. (Don't know what recursion is? [Check out our previous blog post first](./recursion.md)) 

Until recursion loves them back by performing 58 million repeated calculations, melting their CPU, and making IntelliJ beg for mercy.

Enter our new friend Memoization. The art of teaching your function to remember things so it stops doing the same work over and over like an underpaid junior.

**Memoization** is simple:

If you’ve already computed something, don’t compute it again. Just save it and reuse it.

Congratulations, you now understand 90% of Dynamic Programming. So far so good, right?

Let’s dig in deeper.

### Example: Fibonacci with Memoization

Take fibonacci numbers. (Y'know that number sequence where each number is the sum of the two before it? 0, 1, 1, 2, 3, 5, 8, 13...)

```
fib(5) = 5
fib(500) = your computer is crying
```
And why is your computer crying? Because the naive recursive implementation of Fibonacci recalculates the same values over, and over and over again.
So basicly it's doing this:
```
fib(6)
├── fib(5)
│   ├── fib(4)
│   │   ├── fib(3)
│   │   └── ...
│   └── fib(3)
└── fib(4)
    ├── fib(3)
    └── ...
````
We can see here that fib(3) and fib(4) are calculated multiple times. This leads to an exponential time complexity of O(2^n). (I'll talk about Big O notation in a future blog post).
To fix this, we can use memoization to store the results of previous calculations. Here’s how you can implement it in Java:


```javascript
function fib(n, memo = {}) {
  // if we have already computed it, return it
  if (memo[n]) return memo[n];

  // base cases
  if (n <= 1) return n;

  // otherwise compute and store result
  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  return memo[n];
}

console.log(fib(40)); // fast!
```
In this version, we use an object `memo` to store previously computed Fibonacci numbers. Before calculating `fib(n)`, we check if it’s already in `memo`. If it is, we return the stored value. If not, we compute it, store it in `memo`, and then return it.
With memoization, the time complexity drops to O(n), making it much more efficient for larger inputs. 

### Why Memoization works
Memoization is effective because many problems have overlapping subproblems.

### When to use Memoization
When Should You Use Memoization?

**Use memoization when:**

A function calls itself with the same inputs repeatedly

Subproblems overlap

You see the same recursion branches appearing in your stack

You want to prevent your laptop from becoming a jet engine


**Do *not* use memoization when:**

Each subproblem is unique (no overlap)

Storing results is more expensive than recalculating

Inputs are huge and would blow up your RAM


### Examples in Real Life
- Web performance: Caching API requests to avoid redundant network calls
- Game development: Storing computed paths in pathfinding algorithms
- Searching and sorting: Optimizing recursive algorithms like quicksort or mergesort


Memoization is a powerful technique to optimize recursive functions by storing previously computed results. 
It can significantly improve performance for problems with overlapping subproblems. 
Just remember: it's not a one stop shop -> not *all* problems benefit from memoization. 