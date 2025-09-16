---
title: 'SOLID'
description: 'The principles of good object-oriented programming'
pubDate: 'Sept 16 2025'
theme: 
  - Code
heroImage: '../../assets/blog-placeholder-2.jpg'
---

The **SOLID** principles are a set of guidelines for writing maintainable and flexible object-oriented code. They were introduced by Robert C. Martin (Uncle Bob) and have since become a cornerstone of good software design. 

Haven't heard of Uncle Bob before? Check out his [lessons on clean code](https://www.youtube.com/watch?v=7EmboKQH8lM). There is so much to expand on this topic, but I'll try to keep it short and sweet.

The joy of SOLID principles is that you don't need a huge project to understand and practice them. Let's go!

### S - Single Responsibility Principle (SRP)
A class should have only one reason to change, meaning it should only have one job or responsibility. This makes classes easier to understand, test, and maintain.

So this is what we want to **avoid**:
```
class UserService {
  createUser(user) { ... }
  sendWelcomeEmail(user) { ... }
}
```

And this is what we want to **aim for**:
```
class UserService {
    createUser(user) { ... }
}
class EmailService {
    sendWelcomeEmail(user) { ... }
}
```

### O - Open/Closed Principle (OCP)
Software entities (classes, modules, functions, etc.) should be open for extension but closed for modification. This means you should be able to add new functionality without changing existing code, which helps prevent bugs.

This is an example of a function that grows endlessly:
```
function area(shape) {
  if (shape.type === 'circle') return Math.PI * shape.radius ** 2;
  if (shape.type === 'square') return shape.size ** 2;
}

```
But what we're looking for is that classic OO polymorphism:
```
class Circle {
  area() { return Math.PI * this.radius ** 2; }
}
class Square {
  area() { return this.size ** 2; }
}

function printArea(shape) {
  console.log(shape.area());
}
```

### L - Liskov Substitution Principle (LSP)
Subtypes must be substitutable for their base types without altering the correctness of the program. In other words, if class B is a subclass of class A, you should be able to use B wherever A is expected without any issues.

Penguins don't fly, so this example violates LSP:
```
class Bird {
    void fly() {
        System.out.println("Flying");
    }
}

class Penguin extends Bird { }
```

A better approach would be to separate the flying behavior:
```
class Bird { }

class FlyingBird extends Bird {
    void fly() {
        System.out.println("Flying");
    }
}

class Penguin extends Bird { }
````

### I - Interface Segregation Principle (ISP)
Clients should not be forced to depend on interfaces they do not use. This means creating smaller interfaces rather than large, general-purpose ones. This reduces the impact of changes and makes the codebase easier to understand.

A bloated interface: an OldPrinter is forced to implement a fax methot it doesn't need:
```
interface Machine {
    void print();
    void scan();
    void fax();
}

class OldPrinter implements Machine {
    public void print() { ... }
    public void scan() { ... }
    public void fax() { throw new UnsupportedOperationException(); }
}
```
What we want to do, is split the interface:
```
interface Printer {
void print();
}

interface Scanner {
void scan();
}

class OldPrinter implements Printer {
public void print() { ... }
}
```

### D - Dependency Inversion Principle (DIP)
High-level modules should not depend on low-level modules; both should depend on abstractions. Additionally, abstractions should not depend on details; details should depend on abstractions. 
Finding that a little hard to understand? Let's look at an example.

```
class LightBulb {
    void turnOn() { ... }
    void turnOff() { ... }
}
class Switch {
    private LightBulb bulb;

    public Switch(LightBulb bulb) {
        this.bulb = bulb;
    }

    void operate() {
        // toggles the light bulb
    }
}
```
This code tightly couples the `Switch` class to the `LightBulb` class. If we want to use a different type of bulb, we would have to modify the `Switch` class.
So for the Dependency Inversion Principle, we can introduce an abstraction:
```
interface Switchable {
    void turnOn();
    void turnOff();
}

class LightBulb implements Switchable {
    public void turnOn() { ... }
    public void turnOff() { ... }
}
```
---
References:
- Robert C. Martin's book [Clean Code](https://www.oreilly.com/library/view/clean-code-a/9780136083238/)
