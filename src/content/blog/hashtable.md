---
title: 'Hashing for HashTables'
description: 'Just add a little chaos'
pubDate: 'Jan 11 2026'
tags: ['Code']
heroImage: '../../assets/blog-placeholder-code.png'
---
# The magic behind HashTables
Hashtables are promoted for their fast access to data. The Time Complexity for lookups, insertions, and deletions is on average O(1) which means it takes the same amount of time regardless of how much data is stored.
I covered this ground in my previous post on [Hashing](./hashing.md) but today I want to focus on what hashing options there are.

## Modulo
The best way to start is with the modulo operator. This is the simplest way to map a hashcode to an index in the hashtable array.
Here is an example:
````
    private int hashKey(K key, int modulo) {
        return Math.floorMod(key.hashCode(), modulo);
    }
 ````
Whats actually happening here?
1. We get the hashcode of the key using `key.hashCode()`. This gives us an integer representation of the key.
2. We then use `Math.floorMod(..., modulo)` to ensure the hashcode maps to a valid index within the bounds of our hashtable array.

An example of this hash function in action:
Imagine a hashtale with a capacity of 11 (note: this is a prime number, it also happens to be the default capacity that java's HashMap uses).

| Key  | HashCode | Index (HashCode % 11) |
|------|----------|------------------------|
| "apple" | 93029210 | 10                     |
| "banana"| 20395820 | 1                      |
| "cherry"| 34567890 | 2                      | 
| "date"  | 45678901 | 3                      |
| "elderberry"| 56789012 | 4                   |
| "fig"   | 67890123 | 5                      |
| "grape" | 78901234 | 6                      |

What our hashtable now looks like:

| Index | Key         |
|-------|-------------|
| 0     |             |
| 1     | banana      |
| 2     | cherry      |
| 3     | date        |
| 4     | elderberry  |
| 5     | fig         |
| 6     | grape       |
| 7     |             |
| 8     |             |
| 9     |             |
| 10    | apple       |
| 11    |             |

## Bitmasking
Bitmasking sounds a little intimidating but all it actually does is mix up the bits of the hashcode a little to reduce collisions.
1. We start with hashcode of the key using `Objects.hashCode(key)`.
2. We mix the bits by XORing the hashcode with a right-shifted version of itself: `h ^ (h >>> 16)`. This helps to spread out the bits more evenly.
3. Finally, we use `Math.floorMod(..., modulo)` to map the mixed hashcode to a valid index in the hashtable array.
Here's the code:
````    
    private int hashKey(K key, int modulo) {
    int h = Objects.hashCode(key);
    int mixed = h ^ (h >>> 16);
    return Math.floorMod(mixed, modulo);
    }
   ````

Here's an example of how this works with the same keys as before:

| Key  | HashCode | Mixed HashCode | Index (Mixed HashCode % 11) |
|------|----------|--------------|------------------------------|
| "apple" | 93029210 | 93029834     | 5                         |
| "banana"| 20395820 | 20396068      | 3                          |
| "cherry"| 34567890 | 34568408     | 1                          | 
| "date"  | 45678901 | 45679596     | 8                          |
| "elderberry"| 56789012 | 45679596 | 6                       |
| "fig"   | 67890123 | 45679596    | 9                          |
| "grape" | 78901234 | 78902402     | 4                          |


What our hashtable now looks like:

| Index | Key         |
|-------|-------------|
| 0     |             |
| 1     | cherry      |
| 2     |             |
| 3     | banana      |
| 4     | grape       |
| 5     | apple       |
| 6     | elderberry  |
| 7     |             |
| 8     | date        |
| 9     | fig         |
| 10    |             |
| 11    |             |

Compared to the modulo-only version, the keys are spread out differently.
This reduces the chance of collisions piling up in the same buckets.

## String Hashing
Another option is to create a custom hash function specifically for strings. So we don't use hashCode() at all.
For example, we can iterate over each character in the string and compute a hash value based on their ASCII values. 

Here's what's going on:
1. We loop over each character in the string.
2. We multiply the current hash value by 31 (a prime number) and add the ASCII value of the character.
3. Finally, we use modulo to map the computed hash value to a valid index in the hashtable array.

````
    private int hashKey(K key, int modulo) {
    String s = String.valueOf(key);
    int h = 0;
    for (int i = 0; i < s.length(); i++) {
        h = (31 * h + s.charAt(i)) % modulo;
    }
    return h;
    }
````
This is how it works with our example keys:
String = "apple"

| Key        | Computation Steps                                                                                                          | Final HashCode | Index (HashCode % 11) |
| ---------- |----------------------------------------------------------------------------------------------------------------------------| -------------- | ---------------------- |
| "apple"    | ((0 * 31 + 'a') * 31 + 'p') * 31 + 'p') * 31 + 'l') * 31 + 'e'                                                             | 123456789      | 10                     |
| "banana"   | ((0 * 31 + 'b') * 31 + 'a') * 31 + 'n') * 31 + 'a') * 31 + 'n')                                                            | 234567890      | 6                      |
| "cherry"   | ((0 * 31 + 'c') * 31 + 'h') * 31 + 'e') * 31 + 'r') * 31 + 'r') * 31 + 'y'                                                 | 345678901      | 2                      |
| "date"     | ((0 * 31 + 'd') * 31 + 'a') * 31 + 't') * 31 + 'e'                                                                         | 456789012      | 3                      |   
| "elderberry"| ((0 * 31 + 'e') * 31 + 'l') * 31 + 'd') * 31 + 'e') * 31 + 'r') * 31 + 'b') * 31 + 'e') * 31 + 'r') * 31 + 'r') * 31 + 'y' | 567890123      | 0                      |
| "fig"      | ((0 * 31 + 'f') * 31 + 'i') * 31 + 'g'                                                                                     | 678901234      | 5                      |
| "grape"    | ((0 * 31 + 'g') * 31 + 'r') * 31 + 'a') * 31 + 'p') * 31 + 'e'                                                             | 789012345      | 7                      |   


So the resulting hashtable will be:

| Index | Key        |
| ----- | ---------- |
| 0     | elderberry |
| 1     |            |
| 2     | cherry     |
| 3     | date       |
| 4     |            |
| 5     | fig        |
| 6     | banana     |
| 7     | grape      |
| 8     |            |
| 9     |            |
| 10    | apple      |

This gives a very even spread of keys across the hashtable.

I hear you asking me: "But why the 31?". Exellent question! (I feel like an LLM for answering like that..)

The number 31 is an odd prime number. Using a prime number helps to reduce collisions because it spreads out the hash values more evenly across the available indices.
Additionally, 31 has some computational advantages. Multiplying by 31 can be optimized by the compiler to use bit shifting and subtraction, which can be faster than a regular multiplication operation.

Want to ask "Why?" again? Let's save the compiler optimizations for another time. I need to take a deep dive into that myself first.