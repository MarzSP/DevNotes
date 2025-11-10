---
title: 'Choosing the right List'
description: 'A list is just a list — until it isn’t.'
pubDate: 'Oct 11 2025'
tags: ['Code']
heroImage: '../../assets/blog-placeholder-code.png'
---

## Choosing the Right List
Sooner or later you're going to come into contact with Lists. You can call it a list, array or collection but they do all serve the same purpose. Grouping related data into a single structure.

The important part is how we store and manage data - this can have implications for your performance, memory use and code clarity.

Java, for example, has several kinds of Lists. Par example:
- Arrays. Fixed length, memory efficient access
- ArrayLists. Dynamic, resizable versions of arrays
- LinkedLists. Great for inserting and deleting items in a list.
- Immutable Lists. Have a predictable state = good for concurrency.

It's understanding the small differences between these data structures that makes all the difference.

### Pros and Cons
| **Option**         | **Pros**                      | **Cons**                             |
| ------------------ | ----------------------------- | ------------------------------------ |
| **Array**          | Simple, fast access           | Fixed size, costly resizing          |
| **LinkedList**     | Cheap inserts/removals        | Poor cache locality, O(n) access     |
| **ArrayList**      | Dynamic resizing, fast access | Slight overhead on expansion         |
| **Immutable List** | Thread-safe, predictable      | Copy on every change, higher GC load |
### List
The Interface That Defines “a Collection in Order”

Think of it as the contract that defines what all list types (like ArrayList and LinkedList) must be able to do:
store elements in order, allow duplicates, and access items by position.
````
List<String> cities = new ArrayList<>(); // I don't care how it's implemented, i just need a list.
````
However should you later think, wait I need a LinkedList, Go for it, just change one word.

````
List<String> cities = new LinkedList<>();
````
###### When to Use a List
When you want to code to the interface, not the implementation.<br>
When the exact list type may change later (ArrayList → LinkedList). <br>
When your method should accept any kind of list, e.g.:
````
void printCities(List<String> cities) {
    cities.forEach(System.out::println);
}
````
###### When Not to Use Only List

When you rely on specific performance traits (e.g. ArrayList for speed, LinkedList for frequent insertions).
When you need thread-safe or immutable lists, then you should use specialized types.

### ArrayList
Let's start with an example in Java:
````
import java.util.ArrayList;
import java.util.List;

public class Example {
public static void main(String[] args) {
List<String> cities = new ArrayList<>();
cities.add("Utrecht");
cities.add("Arnhem");
cities.add("Ede");

        for (String city : cities) {
            System.out.println(city);
        }
    }
}
````

#### When to Use an ArrayList

Use an ArrayList when you need a dynamic, index-based collection that gives you options for:

###### Fast access by position
You frequently read or update elements by their index (list.get(i) or list[i]).
Think: caching objects, managing in-memory lists, UI collections, or search results.

###### Variable size
You don’t know in advance how many elements you’re going to store. So the list should grow (or shrink) as needed without manually resizing an array.

###### Mostly sequential operations
You usually add elements to the end of the list rather than inserting or removing them in the middle. Easy peasy.

######  Stable iteration performance
You often loop through all elements, and you care about predictable iteration speed (thanks to contiguous memory layout).

###### Low-complexity code
You want simplicity and readability without having to deal with array bounds yourself. (Hello IndexOutOfBoundsException - no thank you)

####  When Not to Use an ArrayList

You insert or delete elements in the middle a lot then use a LinkedList or queue instead.

You need fixed-size, low-memory collections then stick with primitive arrays (int[], String[], etc.).

### LinkedList
Here's my favourate kind of list, a LinkedList.
A LinkedList stores data in nodes. Each node holds both the element and a reference to the next (and sometimes the previous) node.
This design allows you to insert or remove elements efficiently. You don't need to shuffle large blocks of memory as you would with an array.

Let me show you how it works:
````
import java.util.LinkedList;

LinkedList<String> cities = new LinkedList<>();
cities.add("Nijmegen");
cities.addFirst("Ede");
cities.addLast("Arnhem");
````
|                                   |                                                                 |
|-----------------------------------| --------------------------------------------------------------- |
| **Efficient insertions and deletions** | Especially at the beginning or middle — just re-link the nodes. |
| **Automatically resizes**         | Grows and shrinks as needed.                                    |
| **Ideal for queues or stacks**    | Built-in methods such as `addFirst()` and `removeLast()`.       |
| **Slower random access**          | Accessing element *n* requires traversal — O(n).                |
| **Greater memory overhead**       | Each node carries extra references.                             |
| **Less cache-friendly**           | Data is scattered in memory rather than contiguous.             |

###### When to Use a LinkedList
You’re frequently adding or removing elements throughout the list.
You’re implementing queues, stacks, or undo/redo features.
You value predictable insertion performance over raw access speed.

###### Avoid it when:
You primarily iterate or access by index — ArrayList will be far more efficient.
You’re dealing with large datasets where memory use must remain minimal.