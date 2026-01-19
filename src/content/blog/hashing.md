---
title: 'Hashing'
description: 'Hash it out.'
pubDate: 'Dec 3 2025'
tags: ['Code']
heroImage: '../../assets/blog-placeholder-code.png'
---

Hashing is a fundamental concept in programming and cryptography. For those who don't know me, I have thing for cryptography and security-related topics, so I thought I'd share my lessons on hashing.

Let's start with some of the basics today. KISS (Keep It Simple Stupid).

## What is Hashing?
Hashing is the process of converting an input (or 'message') into a fixed-size string of characters, which is typically a sequence of numbers and letters. This output is known as a hash value or hash code. Hash functions are designed to be fast and efficient, producing a unique hash for each unique input.

Remember: Hashing is a one-way function. You can't reverse it to get the original input back. It is not encryption.

### Example
For example, using the SHA-256 hashing algorithm, the input "Hello, World!" produces the following hash:
```a591a6d40bf420404a011733cfb7b190d62cf1fa2fede4e4f8b5b6c3e5fb6c7e```
This hash is unique to the input "Hello, World!". Even a small change in the input will produce a completely different hash.
Want to test it? Try using an online SHA-256 hash generator. It's fun to see how different inputs produce different hashes!

## How does Hashing Work?
Hash functions take an input and process it through a series of mathematical operations to produce a fixed-size output. The specific operations vary depending on the hashing algorithm used. Some common hashing algorithms include MD5, SHA-1, and SHA-256.

## Properties of Hash Functions
Good hash functions have several important properties:
1. **Deterministic**: The same input will always produce the same hash.
2. **Fast to compute**: Hash functions should be able to process data quickly.
3. **Pre-image resistance**: It should be computationally infeasible to reverse the hash
4. **Collision resistance**: It should be difficult to find two different inputs that produce the same hash.
5. **Avalanche effect**: A small change in the input should produce a significantly different hash.
6. Time Complexity: Efficient hash functions operate in linear time, O(n), where n is the size of the input data.
7. Space Complexity: Hash functions typically require constant space, O(1), for storing the hash value, regardless of the input size.

## When to Use Hashing
Hashing is used in various applications, including:
- **Data Integrity**: Hashes can verify that data has not been altered.
- **Password Storage**: Storing hashed passwords enhances security.
- **Digital Signatures**: Hashes are used in creating digital signatures for authentication.
- **Cryptographic Applications**: Hash functions are integral to many cryptographic protocols.
- **Hash Tables**: Hash functions are used in data structures like hash tables for efficient data retrieval.

### Example of Hashtable using Modulo
A simple way to implement a hash table is by using the modulo operator. For example, if we have a hash table of size 10, we can use the following hash function:
```hash(key) = key % 10
```
This function will map any integer key to an index between 0 and 9.

So we'll start easy with no collisions. We want to store the following keys: 12, 23, 34, 45
Using our hash function:
- hash(12) = 12 % 10 = 2
- hash(23) = 23 % 10 = 3
- hash(34) = 34 % 10 = 4
- hash(45) = 45 % 10 = 5
We can store these keys in our hash table at the respective indices.

| Index | Key |
|-------|-----|
| 0     |     |
| 1     |     |
| 2     | 12  | 
| 3     | 23  |
| 4     | 34  |
| 5     | 45  |
| 6     |     |
| 7     |     |
| 8     |     |
| 9     |     |

## Collisions
A collision occurs when two different inputs produce the same hash value. 
There are two common methods to handle collisions:
1. **Chaining**: Store multiple values at the same index using a linked list or another data structure.
2. **Probing**: Find the next available index in the hash table. There is Linear Probing and Quadratic Probing.

### Example of Collision using Modulo
Let's say we want to store the following keys: 12, 22, 32
Using our hash function:
- hash(12) = 12 % 10 = 2
- hash(22) = 22 % 10 = 2 (collision!)
- hash(32) = 32 % 10 = 2 (collision!)
Using chaining, we can store these keys in our hash table at index 2.
| Index | Key          |
|-------|--------------|
| 0     |              |
| 1     |              |
| 2     | 12 -> 22 -> 32 |
| 3     |              |
| 4     |              |
| 5     |              |
| 6     |              |
| 7     |              |
| 8     |              |
| 9     |              |

### Example of Probing using Modulo
Linear probing means that when a collision occurs, we check the next index in the table until we find an empty slot. 
Using linear probing, we can store these keys in our hash table as follows:
| Index | Key |
|-------|-----|
| 0     |     |
| 1     |     |
| 2     | 12  |
| 3     | 22  |
| 4     | 32  |
| 5     |     |
| 6     |     |
| 7     |     |
| 8     |     |
| 9     |     |

### Example of Quadratic Probing using Modulo
Quadratic probing means that when a collision occurs, we check indices based on a quadratic function until we find an empty slot. For example, if a collision occurs at index i,we check indices i+1^2, i+2^2, i+3^2, and so on. 
Using quadratic probing, we can store these keys in our hash table as follows:
| Index | Key |
|-------|-----|
| 0     |     |
| 1     |     |
| 2     | 12  |
| 3     |     |
| 4     | 22  |
| 5     |     |
| 6     | 32  |
| 7     |     |
| 8     |     |
| 9     |     |

## Difference between Hashing and HashMap
Hashing is the process of converting data into a fixed-size hash value using a hash function.
A HashMap is a data structure that uses hashing to store key-value pairs, allowing for efficient data retrieval based on keys.

## Difference between Map and Hashmap
A Map is an abstract data type that represents a collection of key-value pairs, where each key is unique.
A HashMap is a specific implementation of the Map interface that uses a hash table to store key-value pairs, providing average-case constant time complexity for basic operations like insertion, deletion, and retrieval.

## Commmon mistakes
1. **Using weak hash functions**: Avoid using outdated or weak hash functions like MD5 or SHA-1 for security-sensitive applications.
2. **Not handling collisions properly**: Ensure that your hash table implementation includes a robust collision resolution strategy.
3. **Ignoring the load factor**: Monitor the load factor of your hash table to maintain performance and resize when necessary.
4. **Assuming hash functions are secure**: Remember that hashing is not encryption. Don't use hashing for sensitive data without additional security measures.
5. **Using predictable inputs**: Avoid using predictable inputs for hashing, as this can make it easier for attackers to guess the original data.


# Summary
Hashing is a powerful technique used in various applications, from data integrity to password storage. Understanding the properties of hash functions and how to handle collisions is crucial for implementing effective hash tables. Remember to choose strong hash functions and implement proper collision resolution strategies to ensure the security and efficiency of your applications.

Stay tuned for more cryptography and hashing-related topics in future posts!