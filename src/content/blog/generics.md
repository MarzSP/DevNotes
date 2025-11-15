---
title: 'Basics of Generics'
description: 'Type safety for n00bs'
pubDate: 'Nov 11 2025'
tags: ['Code']
heroImage: '../../assets/blog-placeholder-code.png'
---

Ever looked at code and seen something like this?

```java
List<String> names = new ArrayList<>();
```
What does that <String> part mean? Welcome to the ~~weird and~~ wonderful world of **Generics**!

Generics allow you to create classes, interfaces, and methods that operate on a "placeholder" type. This means you can write code that works with any data type while still maintaining type safety.

Say *what* now? Let's break it down.

## What are Generics?
Generics help you write code that works with different types while still keeping you safe from bugs. Generics let one piece of code work for many data types, while also preventing you from ever putting the wrong type in the wrong place. Let me write out an example to take away the element of voodoo.

Think of generics like labeling a box.

Without a label: you can put anything in the box, *but* you might grab the wrong thing later.

With a label: the box only accepts items of that label and you always know what comes out of it.

That’s exactly what generics do for your variables, lists, classes, and methods.

##### Example without Generics:
```java
public class Box {
    private Object value;

    public Box(Object value) {
        this.value = value;
    }

    public Object getValue() {
        return value;
    }
}
````
Using it:
```java
Box box = new Box("StringsGoInHere!");
String text = (String) box.getValue(); // You HAVE to cast
//but you can also do this:
box = new Box(42); // Also allowed 
Integer number = (Integer) box.getValue(); // You HAVE to cast
````
Fear not, there is a solution!

##### Example with Generics:
```java
public class Box<T> {
    private T value;
    
    public Box(T value) {
        this.value = value;
    }
    
    public T getValue() {
        return value;
    }
}
````
And using this beauty:
```java
Box<String> stringBox = new Box<>("StringsGoInHere!");
String text = stringBox.getValue(); // No casting needed hoorah!
`````

In this example, we can see that by using <T>, we can create a Box that only accepts a specific type. When we create a Box<String>, you can only put String values in it. You can only expect String values to come out of it too.

#### What does <T> mean?
<T> is a placeholder for a *type*. You can use any letter or word, but T is commonly used to represent "Type".

I have a lot to say about generics. This is just the tip of the ol' iceberg. There's more to explore, inheritance with generics, comparables, wildcards...but let's save that for another day. One thing at a time!

