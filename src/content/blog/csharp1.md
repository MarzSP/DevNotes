---
title: 'Learning C#'
description: 'Curiosity, Career, and a Healthy Amount of Scepticism'
pubDate: 'Jan 24 2026'
tags: ['Code', 'C#']
heroImage: '../../assets/blog-placeholder-code.png'
---

I've started learning C# recently, driven by a mix of curiosity and career aspirations. I don't just want to focus on syntax; I aim to understand the underlying principles and best practices that make C# a powerful language.

## History
C# was developed by Microsoft in the early 2000s as part of its .NET initiative. It was designed to be a modern, object-oriented language that could compete with Java. Over the years, C# has evolved, with each new version introducing features that enhance productivity and performance.

At first glance, C# looks very familiar if you’ve touched Java. Curly braces, classes everywhere, static typing, the whole ceremony. Early C# was very Java-shaped. Then it quietly started doing its own thing—and doing it well. Properties instead of endless getters and setters. Later on also: LINQ, async/await, pattern matching, records. 

## Basics
The C# language is statically typed, meaning that variable types are known at compile time. It supports object-oriented programming principles such as encapsulation, inheritance, and polymorphism. C# also has features like properties and events.

The compiler wants to know what it's dealing with up front.

#### Variables
Declaring a variable requires specifying its type:

```csharp
int number = 42;
string message = "Hello, World!";
bool isActive = true;
double pi = 3.14;
```
What C# also uses a lot is 'var', something which I wasn't used to seeing in Java:

```csharp
var number = 42; 
var message = "Hello, World!";
var isActive = true;
var pi = 3.14;
```
What this means is that the compiler infers the type based on the assigned value. So while 'var' provides some flexibility, the variable's type is still determined at compile time and cannot change later.
This doesn't mean C# is dynamically typed; it just offers a shorthand for type declaration.

#### Classes
Defining a class in C# is straightforward:

```csharp
public class Person
{
    public string Name { get; set; }
    public int Age { get; set; }

    public void Greet()
    {
        Console.WriteLine($"Hello, my name is {Name} and I am {Age} years old.");
    }
}
```
Here, we define a `Person` class with properties `Name` and `Age`, and a method `Greet` that prints a greeting message.
What stands out here is the use of properties with `get` and `set` accessors, which provide a clean way to encapsulate data.
It uses less code than traditional getter and setter methods. Clean and efficient.

#### Interfaces
Interfaces in C# define a contract that classes can implement:

```csharp
public interface IGreetable
{
    void Greet();
}
```
Any class that implements the `IGreetable` interface must provide an implementation for the `Greet` method. This promotes a consistent way to interact with different classes that share the same behavior. 

```csharp
public class Person : IGreetable
{
    public string Name { get; set; }
    public int Age { get; set; }


    public void Greet()
    {
        Console.WriteLine($"Hello, my name is {Name} and I am {Age} years old.");
    }
}
```

Another way to write this if you want to be even more explicit is:

```csharp
public class Person : IGreetable
{
    public string Name { get; set; }
    public int Age { get; set; }
    
    void IGreetable.Greet()
    {
        Console.WriteLine($"Hello, my name is {Name} and I am {Age} years old.");
    }
}
```
Here, Greet() is explicitly implemented from IGreetable. This means it can only be called through an IGreetable reference, not directly on a Person instance. This approach is useful when avoiding name conflicts, or when a class implements multiple interfaces that happen to define the same method.

#### Abstract Classes
Abstract classes in C# serve as a base for other classes. They can contain both abstract methods (without implementation) and concrete methods (with implementation):
```csharp
public abstract class Animal
{
    public string Name { get; }

    protected Animal(string name)
    {
        Name = name;
    }

    public abstract void Speak();
}
````

```csharp
public class Dog : Animal
{
    public Dog(string name) : base(name) {}

    public override void Speak()
    {
        Console.WriteLine("Woof");
    }
}
````
Here, `Animal` is an abstract class with an abstract method `Speak`. The `Dog` class inherits from `Animal` and provides an implementation for the `Speak` method. Abstract classes are useful when you want to provide a common base with shared functionality while enforcing certain methods to be implemented by derived classes.

#### Structs
A struct is a value type that is used to encapsulate small groups of related variables. Structs are typically used for lightweight objects that do not require the overhead of a class.
Structs are allocated on the stack, which can lead to performance benefits in certain scenarios.

```csharp
struct Point
{
    public int X;
    public int Y;
}
```
````
var p1 = new Point { X = 1, Y = 2 };
var p2 = p1;
p2.X = 99;
````
In this example, `Point` is a struct with two fields, `X` and ` Y`. When we assign `p1` to `p2`, a copy of the data is made. Modifying `p2` does not affect `p1`, demonstrating the value type behavior of structs.
So p1.x is still 1, while p2.x is now 99.

#### Records
Records are a C# specific thing. There will be a whole blog post about them later, because they deserve the attention.

__________________________________________________

There is still lots more to explore like Async/Await, LINQ, Enums, Generics, ADTs, and so on. But this is a good start for now.
