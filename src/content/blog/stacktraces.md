---
title: 'How to Read a Stack Trace Without Panicking'
description: 'The error message is trying to help you'
pubDate: 'Feb 21 2026'
tags: ['Code']
heroImage: '../../assets/blog-placeholder-code.png'
---

Something crashed. A wall of red text appeared. You closed your laptop and considered a career in farming.

Been there.

But here's the thing: that wall of red text is not your enemy. It's a breadcrumb trail leading directly to the problem. Once you know how to read it, a stack trace is actually one of the most useful things a computer can hand you.

Let's break it down.

## What even is a stack trace?

When your program crashes, the runtime doesn't just give up silently. It dumps a record of exactly what was happening at the moment things went wrong — which method called which method, in what order, on what line.

That record is the stack trace.

Here's a classic example:

```
Exception in thread "main" java.lang.NullPointerException
    at com.example.OrderService.calculateTotal(OrderService.java:47)
    at com.example.OrderService.processOrder(OrderService.java:31)
    at com.example.Main.main(Main.java:12)
```

Three lines. That's it. And each one tells you something.

## Read from the top

The first line is the most important one.

```
java.lang.NullPointerException
```

This tells you *what* went wrong. A `NullPointerException` means something was null when the code tried to use it. An `IndexOutOfBoundsException` means you tried to access a list position that doesn't exist. An `IllegalArgumentException` means you passed something invalid into a method.

Read this line first, always. It tells you what kind of problem you're dealing with before you've looked at anything else.

## Then read the second line

```
at com.example.OrderService.calculateTotal(OrderService.java:47)
```

This is where it crashed. `OrderService.java`, line 47. Go there.

The lines below it are how the code got there — `processOrder` called `calculateTotal`, and `main` called `processOrder`. This is useful if the crash is caused by bad data being passed in from somewhere higher up. But start with line one of the trace, not the bottom.

## Null references specifically

`NullPointerException` is probably the most common crash you'll see as a junior, so it's worth talking about specifically.

```
java.lang.NullPointerException
    at com.example.OrderService.calculateTotal(OrderService.java:47)
```

Line 47 is null. That's what the error is telling you. The question is: *which thing* on line 47 is null?

Say line 47 looks like this:

```java
double total = order.getItems().stream().mapToDouble(Item::getPrice).sum();
```

Any of these could be null: `order`, the list returned by `getItems()`, or an individual `Item` in that list. Log them:

```java
System.out.println("order: " + order);
System.out.println("items: " + order.getItems());
```

One of those will print `null`. That's your answer. That's the thing that wasn't set up correctly before this method was called.

It's not magic. It's just narrowing down.

## The most common mistake

Juniors often scroll to the *bottom* of the stack trace first. That's usually framework code or your `main` method — not where the actual problem is.

Start at the top. Find your own code in the trace (your package name, not `java.lang` or `org.springframework`). Go to that line. That's where to look.

## When the error message is vague

Sometimes the first line isn't very helpful. `NullPointerException` with no message, for example. When that happens, the line number is doing all the work.

Go to the line. Log the values of the things you're operating on. A null reference on line 47 means something on line 47 is null — narrow down which thing, and you'll have your answer.

The panic is optional. The breadcrumbs are right there.