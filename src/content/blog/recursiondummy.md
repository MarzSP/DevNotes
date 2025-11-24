---
title: 'Recursion for beginners'
description: 'A simple introduction to recursion.'
pubDate: 'Nov 17 2025'
tags: ['Code']
heroImage: '../../assets/blog-placeholder-code.png'
---

## Recursion
Recursion is a subject that I find developers often make out to be way more complicated than it actually is. In this post, I want to demystify recursion and show you how it works with a simple example.
At its core, recursion is a programming technique where a function calls itself to solve a smaller instance.
This is particularly useful for problems that can be broken down into smaller, similar subproblems.

##### Definition
*Recursion is when a function calls itself to solve a smaller version of the same problem.*

A recursive function has two main components:
1. **Base Case**: This is the condition under which the function stops calling itself.
2. **Recursive Case**: This is where the function calls itself with a modified argument, moving towards the base case.

That's it. No wormholes or black magic.

Let's start with a simple example. 

### Example 1:

Summing numbers in Java.

```java
public static int sum(int n) {
    // Base case
    if (n == 1) return 1;

    // Recursive step
    return n + sum(n - 1);
}

public static void main(String[] args) {
    System.out.println(sum(5)); // 15
}
```
So what happens when you call `sum(5)`?
1. `sum(5)` checks if `n` is 1. It's not, so it returns `5 + sum(4)`.
2. `sum(4)` checks if `n` is 1. It's not, so it returns `4 + sum(3)`.
3. `sum(3)` checks if `n` is 1. It's not, so it returns `3 + sum(2)`.
4. `sum(2)` checks if `n` is 1. It's not, so it returns `2 + sum(1)`.
5. `sum(1)` checks if `n` is 1. It is, so it returns `1`.
6. Now we can substitute back up the chain:
   - `sum(2)` returns `2 + 1 = 3`
   - `sum(3)` returns `3 + 3 = 6`
   - `sum(4)` returns `4 + 6 = 10`
   - `sum(5)` returns `5 + 10 = 15`

This function stops because sum(1) hits the base case, and returns 1.

### Example 2:
Calculating factorials in Java.

```java
public static int factorial(int n) {
    // Base case
    if (n == 0) return 1;
    // Recursive step
    return n * factorial(n - 1);
}
public static void main(String[] args) {
    System.out.println(factorial(5)); // 120
}
```
When you call `factorial(5)`, it works a bit like the sum function:
1. `factorial(5)` returns `5 * factorial(4)`.
2. `factorial(4)` returns `4 * factorial(3)`.
3. `factorial(3)` returns `3 * factorial(2)`.
4. `factorial(2)` returns `2 * factorial(1)`.
5. `factorial(1)` returns `1 * factorial(0)`.
6. `factorial(0)` hits the base case and returns `1`.
7. Now we substitute back up:
   - `factorial(1)` returns `1 * 1 = 1`
   - `factorial(2)` returns `2 * 1 = 2`
   - `factorial(3)` returns `3 * 2 = 6`
   - `factorial(4)` returns `4 * 6 = 24`
   - `factorial(5)` returns `5 * 24 = 120`

Starting to get the hang of it? 

There are a few mistakes beginners often make with recursion:
1. **Missing Base Case**: Without a base case, the function will call itself indefinitely. You don't want that! #StackOverflowError
2. **Incorrect Recursive Step**: Ensure that each recursive call moves towards the base case. If it doesn't, you'll end up in an infinite loop.
3. **Returning the Wrong Value**: Make sure the return values from recursive calls are used correctly to build the final result.
4. **Stack Overflow**: If recursion goes too deep, it can lead to a stack overflow error. That's also where the website Stackoverflow get's its name from!

Also while you're at it; go to your search engine and type in Recursion. Just see what happens :)

### When do you use recursion?
Whenever you have a problem that can be broken down into smaller, similar subproblems. Common examples include:
- Tree Traversals
- Graph Traversals
- Divide and Conquer algorithms (like quicksort and mergesort)
- Dynamic Programming problems (like  the Fibonacci sequence)
- Backtracking problems (think Sudoku puzzles)
- Parsing nested structures (like JSON or XML)
- Mathematical computations (like factorials, GCD)
- File system operations (like searching directories)

Don't know what some of these things mean? No worries, i'll be writing about them in future posts.
Let's just keep it simple for today. 