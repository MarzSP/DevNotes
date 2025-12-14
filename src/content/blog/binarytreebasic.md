---
title: 'Basics of Binary Trees'
description: 'Two paths, endless possibilities'
pubDate: 'Dec 5 2025'
tags: ['Code']
heroImage: '../../assets/blog-placeholder-code.png'
---

# Basics of Binary Trees

## What is a Binary Tree?
Binary trees sound intimidating at first (or atleast, they did to me. Anything with binary in the name used to do that) But once you strip away the new words, a binary tree is actually a very intuitive data structure. It’s basically a way of organizing information so decisions become fast and predictable. Sounds good right?

A binary tree is a structure made of nodes.
Each node can have at most two children:

- one on the left

- one on the right

That’s it. 

There’s usually also :

- a root at the top (the starting point)

- child nodes below it

- leaf nodes at the bottom (nodes without children)

So yes, the root is the top, and a leaf is the bottom. Just like a real tree, but upside down..roll with me on this one.

#### Visual Representation
```
        [Root]
        /    \
     [L]      [R]
    /  \      /  \
 [LL] [LR] [RL]  [RR]
```

Each node stores a value and references to its left and right child. Together, these links form a tree shape that grows downward.

## Why is it called a Binary Tree?
Because every decision splits in two.

“Binary” literally means two. In a binary tree, every node answers a simple question:

- go left?

- or go right?

This makes binary trees incredibly useful for things like comparisons, decisions and searching. More on these items later!

### A quick personal note:

What really made binary trees click for me were MIT’s lectures (classes 6 and 7). They explain trees visually and cover the basics thoroughly. Highly recommended if trees still feel abstract.

Once you see a binary tree as a series of simple choices instead of a complicated structure, it suddenly becomes…understandable. Almost easy.
And that’s the real magic of binary trees:
simple rules, powerful results.

## What are binary trees used for?

Binary trees are everywhere in computer science, even when you don’t notice them.

Some common places may include:

- Searching and sorting (binary search trees)

- Databases and indexes

- Compilers (syntax trees)

- Priority queues

- Decision trees (like in games)

- File systems (hierarchical structures)

## Ways to Traverse a Binary Tree
To Traver-what-now?

Traversing a binary tree means visiting all its nodes in a specific order. Here are 3 basic methods to do that:
- In-order Traversal: Visit the left subtree, then the node, and finally the right subtree. This method is often used to retrieve values in sorted order.
- Pre-order Traversal: Visit the node first, then the left subtree, followed by the right subtree. This is useful for creating a copy of the tree.
- Post-order Traversal: Visit the left subtree, then the right subtree, and finally the node. This is often used for deleting the tree or evaluating expressions.

Let's stick to these three basic methods first.

So I'll give you an example binary tree to visualize these traversals:

```
        [A]
       /   \
     [B]   [C]
    / \     / \
  [D] [E] [F] [G]
```
- In-order Traversal: D, B, E, A, F, C, G
- Pre-order Traversal: A, B, D, E, C, F, G
- Post-order Traversal: D, E, B, F, G, C, A

## So what's a Binary Search Tree (BST)?
A Binary Search Tree (BST) is a special type of binary tree that maintains a specific order among its nodes. In a BST, for each node:
- The left subtree contains only nodes with values less than the node's value.
- The right subtree contains only nodes with values greater than the node's value.
- Both the left and right subtrees must also be binary search trees.
- This property makes BSTs particularly efficient for searching, inserting, and deleting values.
- When you search for a value in a BST, you can quickly eliminate half of the tree at each step, leading to an average time complexity of O(log n) for these operations.

### Example of a Binary Search Tree
```
        [8]
       /   \
     [3]   [10]
    / \      \
  [1] [6]    [14]
     / \     /
   [4] [7] [13]
```
In this example, you can see that for each node, the left child is less than the parent node, and the right child is greater. This structure allows for efficient searching and sorting of values.
The In-order traversal of this BST would yield the values in sorted order: 1, 3, 4, 6, 7, 8, 10, 13, 14.
The Pre-order traversal would yield: 8, 3, 1, 6, 4, 7, 10, 14, 13.
The Post-order traversal would yield: 1, 4, 7, 6, 3, 13, 14, 10, 8.

Starting to get the hang of it? Great.
In future posts I will be diving into AVL trees (self-balancing binary search trees) and how balancing is achieved.
For now, let this one sink in.


## Fun other example:
There are many ways to draw a binary tree with just the numbers 1, 2 and 3. Here are a few examples:

```
    [2]
   /   \
 [1]   [3]
```

```
    [3]
   /
 [2]
 /
[1]
```

```
    [1]
      \
      [2]
        \
        [3]
```
```
    [2]
   /   \
 [3]   [1]
```
Each of these trees has the same values but arranged differently. This shows how binary trees can represent the same data in various structures, leading to different traversal orders and properties.
