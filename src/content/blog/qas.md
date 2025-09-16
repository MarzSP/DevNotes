---
title: 'Quality Attribute Scenarios'
description: 'From vague goals to concrete tests'
pubDate: 'Sept 15 2025'
heroImage: '../../assets/blog-placeholder-2.jpg'
---
Saying “a system must be reliable and secure” sounds great, but it doesn’t really when you’re designing or testing it. Reliability for *who*? Secure *against what*?
That’s where Quality Attribute Scenarios (QAS) step in: they turn vague but important words into clear, real-world situations.


### What is a QAS?
In short: a QAS is a way of taking a vague quality like *security* or *usability* and turning it into something **specific, measurable, and testable**.  

So what does an architect want? They want: *“On a 4G connection, loading 10,000 records must take less than 5 seconds.”* Now that’s a QAS.

They’re basically unit tests for your architecture goals. Instead of code asserting things, it’s your system design being checked against reality. Sounds good right?

---

### Anatomy of a QAS
A typical QAS has a few ingredients:
- **Source** – who/what triggers it (a user, system, attacker, etc.).
- **Stimulus** – what event happens (request, failure, login attempt).
- **Environment** – the context (heavy load, normal conditions, mobile network).
- **Artifact** – the part of the system affected (database, UI, API).
- **Response** – what the system does.
- **Response Measure** – how success is judged (time, % uptime, error rate).

Think of it like filling out a nerdy mad-lib: *“When X happens in Y conditions, the system must Z within N seconds.”*

---

### Examples
- **Performance**: “A field inspector on a weak 4G connection loads and edits 10,000 objects in under 5 seconds.”
- **Security**: “If five failed logins occur within one minute, the account is locked for 15 minutes.”
- **Modifiability**: “Adding a new inspection type should not require changes to existing modules, only a new module.”

---
*References:*
- Bass, L., Clements, P., & Kazman, R. (2012). Software Architecture in Practice (3rd ed.). Addison-Wesley.
- Nuseibeh, B. (2001). Weaving Together Requirements and Architectures. IEEE Computer, 34(3), 115-117.