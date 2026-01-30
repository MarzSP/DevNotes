---
title: 'C# Records, Explained'
description: 'Simple data, fewer things to get wrong'
pubDate: 'Jan 24 2026'
tags: ['Code', 'C#']
heroImage: '../../assets/blog-placeholder-csharp.png'
---
On my journey of learning C#, I've come across  a feature called "records" that has piqued my interest. In the past I had only heard of records in the context of databases so I'd like to share what I have learned about C# records so far.

## What are Records?
C# records solve a very specific problem.

>A record lets you model simple data without writing a lot of boilerplate, while also reducing the chance of subtle bugs.

A record is designed to represent data, not behaviour.
Two records with the same values are considered equal. This is different from classes, where two instances are only equal if they reference the same object in memory.

So what does that actually mean in practice?

When you define a record, the compiler automatically generates implementations for methods like Equals(), GetHashCode(), and ToString(), all based on the values of the record’s properties. You don’t have to remember to override them, and you don’t accidentally forget one.

For example, consider a User Class:
````csharp
public class User
{
public string Name { get; }
public int Age { get; }

    public User(string name, int age)
    {
        Name = name;
        Age = age;
    }
}
````
Now, you'd like to compare two users:
````csharp
var a = new User("Jane", 30);
var b = new User("Jane", 30);

Console.WriteLine(a == b);        // false
Console.WriteLine(a.Equals(b));   // false
````
Even though `a` and `b` have the same values for `Name` and `Age`, they are different instances in memory, so they are not considered equal.
Now let's do this with a record instead:
````csharp
public record User(string Name, int Age);
````
Now, comparing two users:
````csharp
var a = new User("Jane", 30);
var b = new User("Jane", 30);

Console.WriteLine(a == b);        // true
Console.WriteLine(a.Equals(b));   // true
````
Here, `a` and `b` are considered equal because their properties have the same values. What you can see here is that data is treated as data and the comparison is made by values. This ensures that the comparison is showing correct behaviour by default.

## What are Records used for?
Records are used when identity doesn't matter but the data does. Here are some examples when you might want to use records:
- Data Transfer Objects (DTOs): When transferring data between layers or services, records can be a concise way to represent the data structure.
- Money: `Money(10, "EUR")` is equal to `Money(10, "EUR")`. Identity doesn't matter, only the values.
- Email Addresses: EmailAddress`("42@example.com")` is equal to EmailAddress `("42@example.com")`. Again, identity doesn't matter, only the value.
- Coordinates: `Coordinates(10, 20)` is equal to `Coordinates(10, 20)`. 
- Time Stamps: `TimeStamp(2024, 1, 1, 12, 0, 0)` is equal to `TimeStamp(2024, 1, 1, 12, 0, 0)`.
- Configuration Settings: `ConfigurationSettings("SettingA", "Value1")` is equal to `ConfigurationSettings("SettingA", "Value1")`.
- Read-only Data Structures: When you want to create immutable data structures that should not change after creation.
- Messages and events: Records can be used to represent messages or events that are passed between components.

## Common mistakes

- Records don't prevent mutation. They are not a magic prevention against changing data. If you define mutable properties in a record, the data can still be changed after creation. To make a record immutable, use `init` accessors or define properties without setters.
- Records are not a replacement for classes. They are designed for specific use cases where data equality is important. If your object has identity, behavior, or a lifecycle, a class is likely more appropriate.
- Be cautious with inheritance. While records support inheritance, it can lead to confusion if not used carefully. 
- Putting behaviour in to records. Records can have methods but that doesn't mean they should. Keep behaviour in classes and use records for data only.

## Rules of thumb
Use a record when:

1. You care what it is, not who it is

2. Equality should mean “same data”

3. The object represents a fact, not a thing with a lifecycle

4. If the object has identity, changes over time, or owns behaviour —> use a class.
________________________________________________
Further Reading:
- [Microsoft Docs: Records](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/record)
- [Why records in C# are game changing](https://dev.to/stevsharp/why-records-in-c-are-game-changing-2fp3/)
- [Geeks for Geeks: Record Types in C#](https://www.geeksforgeeks.org/c-sharp/record-types-in-c-sharp/)
