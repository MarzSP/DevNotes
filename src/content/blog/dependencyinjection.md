---
title: 'Dependency Injection for Beginners'
description: 'Objects can mind their own business'
pubDate: 'Jan 22 2026'
tags: ['Code']
heroImage: '../../assets/blog-placeholder-code.png'
---


Dependency Injection can sound complicated when you're a junior, but let's try and break it down in today's post. Hopefully by the end of this you'll see how objects can mind their own business!

At its core, Dependency Injection answers one question:

_Who is responsible for creating the objects my class depends on?_

If the answer is “the class itself”, you will eventually regret it. I hear you asking _"but why?"_

Let’s find out!

The problem: hidden dependencies. It starts with something very ordinary like:
````
public class UserService {

    private final EmailSender emailSender = new EmailSender();

    public void registerUser(String email) {
        // business logic
        emailSender.send(email, "Welcome!");
    }
}
````

This looks harmless. It compiles. It runs. Great.

But this is __tightly coupled__ in three ways:

1. UserService decides which EmailSender to use

2. UserService decides how it is created

3. UserService cannot be tested without a real EmailSender

Point 3 is where the pain can start. You want to write a unit test for UserService but that means you also need a working EmailSender.

If EmailSender talks to SMTP, an API, or anything outside the JVM, your tests are now slow and breaky.

The dependency exists, but it’s hidden inside the class.

## Dependency Injection: the basic idea

Dependency Injection means: Dependencies are provided from the outside, not constructed on the inside.

Lets now look at the same class. Different responsibility split.
````java
public class UserService {

    private final EmailSender emailSender;

    public UserService(EmailSender emailSender) {
        this.emailSender = emailSender;
    }

    public void registerUser(String email) {
        emailSender.send(email, "Welcome!");
    }
}
````

Now UserService has exactly one job:
Use an EmailSender, not create one.

Object creation has moved elsewhere. And this, is this is basically the whole trick.

## Constructor Injection (usually the default choice)

The example above uses constructor injection, which is like the gold standard in Java.

This is because:
- dependencies are mandatory and explicit

- Objects are always fully initialised

- Fields can be final

- You cannot “forget” to inject something

> If a dependency is required for the class to function, it belongs in the constructor. 

## Interface-based injection

Real systems rarely depend on concrete classes.

Instead of this:
````java
public class UserService {
    private final EmailSender emailSender;
}
 ````
Try this - depend on an abstraction:
````java
public interface MailService {
    void send(String email, String message);
    }

public class SmtpMailService implements MailService {
    @Override
    public void send(String email, String message) {
    // SMTP logic
    }
}

public class UserService {

    private final MailService mailService;

    public UserService(MailService mailService) {
        this.mailService = mailService;
    }
}
````

Now UserService doesn’t care how mail is sent and this unlocks the possibilities for testing.

## Testing

Here is a psuedo implementation for tests:
````java
public class FakeMailService implements MailService {

    private boolean sent = false;

    @Override
    public void send(String email, String message) {
        sent = true;
    }

    public boolean wasSent() {
        return sent;
    }
}
````

And the test:
````java
@Test
void registersUserAndSendsMail() {
FakeMailService fakeMailService = new FakeMailService();
UserService service = new UserService(fakeMailService);

    service.registerUser("test@example.com");

    assertTrue(fakeMailService.wasSent());
}
````

So as you can see, UserService is now easy to test. No SMTP server needed, no mocking frameworks or other shenanigans.

This is where DI quietly shows its power, because it's now possible to test classes in isolation.

## Why 'new' can be dangerous

The keyword 'new'' is not inherently evil, in fact not at all. However an uncontrolled 'new' is.

Every time a class does this:
````
new Something();
````

You (or the person that wrote the code) are making a design decision, that cannot be changed later without editing that class.

Dependency Injection moves those decisions to a composition root. This means that classes no longer decide how their dependencies are created.

## The composition root

At some point, something must still use new. That place is called the composition root.

Example:
````java
public class Application {

    public static void main(String[] args) {
        MailService mailService = new SmtpMailService();
        UserService userService = new UserService(mailService);

        userService.registerUser("funmail@example.com");
    }
}
````
What we can see in the above example:
- All object creation lives here.
- All wiring happens here.
- This class isn't used for business logic but for composition only.

Large applications usually have one composition root per runtime (web app, CLI, batch job).

## What I learnt in practise:
If DI feels confusing inside a framework, it usually means the fundamentals were skipped. Learn DI without Spring first. Spring then becomes predictable rather than voodoo.

1. Injecting everything “just in case”. It might feel easy to inject every possible dependency, but this leads to bloated constructors and unclear class responsibilities. Only inject what the class truly needs. You can always refactor later.


2. Using DI to hide poor boundaries. If a class has too many dependencies, it ~~might be~~ is a sign that it’s doing too much. Try breaking it down into smaller, more focused classes. (Single Responsibility Principle ringing a bell?)


3. Confusing Dependency Injection with Dependency Inversion (related, not identical). Dependency Inversion is a broader principle about depending on abstractions rather than concretions. DI is one way to achieve that, but they are not the same thing.
     

    Dependency Inversion decides what you are allowed to depend on.<br>
    Dependency Injection decides how that dependency gets there.<br>

4. Treating DI containers as global service locators. This is when you reach into the container from anywhere in your code to get dependencies. This can lead to hidden dependencies and make testing harder. Instead, prefer constructor injection to make dependencies explicit.
````
What I mean here is: 
  
   If a class asks for its dependencies, something has gone wrong.
   It should receive them.
````
So really Dependency Injection is about clarity, not trying to be clever.

And remember:

> Classes should declare what they *need*, not decide where it comes from.