---
title: 'AVL: Staying Balanced'
description: 'Becuase a tree isnt a linkedlist'
pubDate: 'Dec 8 2025'
tags: ['Code']
heroImage: '../../assets/blog-placeholder-code.png'
---

In my previous post, Binary Tree Basics, I covered what a binary tree is, what we use them for, how traversal works and what makes a tree a Binary Search Tree.
If you haven't read that yet, I recommend checking it out first [here](./binary-tree-basics.md).

In this post, we'll explore a special type of binary search tree called an AVL tree. AVL trees are self-balancing binary search trees that maintain a balanced structure to ensure efficient operations.
This is a solution to the problem of a badly growing BST. For example:

```
      10
        \
         20
           \
            30
              \
               40
```
This is a BST.
It also behaves exactly like a linked list.

Searching, inserting, or deleting now takes O(n) time, which rather defeats the point of using a tree in the first place.

This is where AVL trees step in. (AVL stands for: Adelson-Velsky and Landis, the inventors of this fancy data structure).

Turning it into an AVL tree would look like this:

```
        20
       /  \
     10    30
              \
               40
```
In an AVL tree, the heights of the two child subtrees of any node differ by at most one. If they differ by more than one, the tree is rebalanced using rotations.

### Rotations
There are four types of rotations used to rebalance an AVL tree:
1. **Right Rotation (Single Rotation)**: Used when a node is inserted into the left subtree of the left child.
2. **Left Rotation (Single Rotation)**: Used when a node is inserted into the right
3. **Left-Right Rotation (Double Rotation)**: Used when a node is inserted into the right subtree of the left child.
4. **Right-Left Rotation (Double Rotation)**: Used when a node is inserted into the left subtree of the right child.

Here's a simple implementation of an AVL tree in Java:

```java
class AVLNode {
    int key, height;
    AVLNode left, right;
    AVLNode(int d) {
        key = d;
        height = 1;
    }
}
class AVLTree {
    AVLNode root;

    int height(AVLNode N) {
        if (N == null)
            return 0;
        return N.height;
    }

    int getBalance(AVLNode N) {
        if (N == null)
            return 0;
        return height(N.left) - height(N.right);
    }

    AVLNode rightRotate(AVLNode y) {
        AVLNode x = y.left;
        AVLNode T2 = x.right;

        x.right = y;
        y.left = T2;

        y.height = Math.max(height(y.left), height(y.right)) + 1;
        x.height = Math.max(height(x.left), height(x.right)) + 1;

        return x;
    }

    AVLNode leftRotate(AVLNode x) {
        AVLNode y = x.right;
        AVLNode T2 = y.left;

        y.left = x;
        x.right = T2;

        x.height = Math.max(height(x.left), height(x.right)) + 1;
        y.height = Math.max(height(y.left), height(y.right)) + 1;

        return y;
    }

    AVLNode insert(AVLNode node, int key) {
        if (node == null)
            return (new AVLNode(key));

        if (key < node.key)
            node.left = insert(node.left, key);
        else if (key > node.key)
            node.right = insert(node.right, key);
        else
            return node;

        node.height = 1 + Math.max(height(node.left), height(node.right)));

        int balance = getBalance(node);

        // Left Left Case
        if (balance > 1 && key < node.left.key)
            return rightRotate(node);

        // Right Right Case
        if (balance < -1 && key > node.right.key)
            return leftRotate(node);

        // Left Right Case
        if (balance > 1 && key > node.left.key) {
            node.left = leftRotate(node.left);
            return rightRotate(node);
        }

        // Right Left Case
        if (balance < -1 && key < node.right.key) {
            node.right = rightRotate(node.right);
            return leftRotate(node);
        }

        return node;
    }
}
```

This example shows the basic structure of an AVL tree with insertion and balancing logic.

But we can also remove nodes from an AVL tree while maintaining its balanced property. The removal process is similar to that of a standard BST, but after deletion, we need to check the balance factor and perform rotations if necessary.
Here's how you can implement the delete operation in an AVL tree:

```java
VLNode delete(AVLNode root, int key) {
    if (root == null)
        return root;
    if (key < root.key)
        root.left = delete(root.left, key);
    else if (key > root.key)
        root.right = delete(root.right, key);
    else {
        if ((root.left == null) || (root.right == null)) {
            AVLNode temp = null;
            if (temp == root.left)
                temp = root.right;
            else
                temp = root.left;
            if (temp == null) {
                root = null;
            } else
                root = temp;
        } else {
            AVLNode temp = minValueNode(root.right);
            root.key = temp.key;
            root.right = delete(root.right, temp.key);
        }
    }
    if (root == null)
        return root;
    root.height = 1 + Math.max(height(root.left), height(root.right)));
    int balance = getBalance(root);
    // Left Left Case
    if (balance > 1 && getBalance(root.left) >= 0)
        return rightRotate(root);
    // Left Right Case
    if (balance > 1 && getBalance(root.left) < 0) {
        root.left = leftRotate(root.left);
        return rightRotate(root);
    }
    // Right Right Case
    if (balance < -1 && getBalance(root.right) <= 0)
        return leftRotate(root);
    // Right Left Case
    if (balance < -1 && getBalance(root.right) > 0) {
        root.right = rightRotate(root.right);
        return leftRotate(root);
    }
    return root;
}
```
This code snippet demonstrates how to delete a node from an AVL tree while ensuring that the tree remains balanced after the deletion.

Some more example of adding a node to an AVL tree and how it balances itself:
1. Insert 10:
```
    10
```
2. Insert 20:
```
    10
      \
       20
```
3. Insert 30 (causes imbalance, perform left rotation):
```
      20
     /  \
   10    30
```
4. Insert 25:
```
        20
       /  \
     10    30
           /
          25
```
5. Insert 5:
```
       20
      /  \
    10    30
    /     /
   5     25

```