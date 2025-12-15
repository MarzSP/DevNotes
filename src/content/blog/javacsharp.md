---
title: 'Java & C#'
description: 'Same tea, different cup.'
pubDate: 'Dec 7 2025'
tags: ['Code']
heroImage: '../../assets/blog-placeholder-code.png'
---

Java and C# are both object-oriented, statically typed, compiled languages designed to build large, serious applications without everything collapsing into a screaming pile of spaghetti.

They are commonly used for:

- backend web services

- desktop applications

- distributed enterprise systems

- APIs


If you learn one, the other will feel eerily familiar. This is not an accident. C# was created in the early 2000s at Microsoft, very consciously taking inspiration from Java. 

# Spot the Differences
Let’s start with something comforting: they look almost the same.
Hello World:

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

```csharp
class HelloWorld {
    static void Main(string[] args) {
        Console.WriteLine("Hello, World!");
    }
}
```
What do you notice? The syntax is nearly identical, but the main differences are:

- System.out.println vs Console.WriteLine

- String vs string

- Java insists everything be public class, C# is a bit more relaxed

### Types: Strong, Static and very clear about it
Both Java and C# are statically typed. That means the compiler wants to know exactly what kind of thing every variable is.
```java
int age = 25;
String name = "Carol";
```

```csharp
int age = 25;
string name = "Carol";
```

If you try to put a String into an int, both languages will gently but firmly refuse.

C# does add a helpful feature called var:
```csharp
var age = 25;
```


This does not at all mean “dynamic typing”. It still knows age is an int; it just saves you some typing. Java eventually added something similar (var in Java 10), but C# embraced this idea earlier and more enthusiastically.

### Object Orientation
Both languages are proudly object-oriented. You’ll see:

classes

objects

encapsulation

inheritance

polymorphism

A simple class looks familiar in both:

```java
public class Person {
private String name;

    public Person(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
```

```csharp
class Person
{
private string name;

    public Person(string name)
    {
        this.name = name;
    }

    public string GetName()
    {
        return name;
    }
}
```

Same idea. Same structure. Even the constructor works the same way.

The difference? C# tends to give you nicer tools for the same job.

### Properties
C# has a feature called properties that makes getters and setters cleaner:
Where Java does this
```java
public String getName() {
    return name;
}

public void setName(String name) {
    this.name = name;
}
```
C# does this:
```csharp
public string Name { get; set; }
```
Pretty neat right? Same functionality, less boilerplate. Love that.

### Learning curve: so what transfers?

If you'vee learned Java, you already understand:

- classes and objects

- interfaces

- collections

- generics

- exceptions

- unit testing concepts

**Moving to C# mostly involves learning:**

- new keywords

- different libraries

- some nicer syntax

The mental model stays the same. That’s the key thing.
I will be making the change myself soon, so I can share my experiences here as they happen. Stay tuned!
