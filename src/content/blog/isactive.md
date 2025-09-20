---
title: 'Rethinking boolean isActive'
description: 'Why bools like isActive can lead to messy code'
pubDate: 'Sept 16 2025'
tags: ['Code']
heroImage: '../../assets/blog-placeholder-4.jpg'
---

_When I first started my studies, I thought using boolean flags like `isActive` was an easy peasy way to keep track of state. But once I started working in the field I learned very quickly that this simplicity just doesn't scale._

_One flag turns into multiple flags, date and timestamps are added and it just takes one edge case to turn your easy boolean solution in to a giant headache._

## Why do we start with isActive?
When you're new to coding, isActive feels like a natural solution to simple state management. 
- Is the user active? `true` or `false`
- Is the order paid? `true` or `false`
- Is the modal open? `true` or `false`

One field, one check, no enums, no classes, just a toggle. Great, right? Well...

### The problem with isActive
The problem rears its ugly head when you need to add complexity. Real world states rarely fit into just two options.

Take a user account:
You need to know if it's active, suspended, when they were suspended. So you start with something like this:
```js
{
  id: 1,
  name: 'Arthur Dent',
  isActive: true,
  isSuspended: false,
  userSuspendedDate: '2023-09-01T12:00:00Z',
  lastLogin: '2023-10-01T12:00:00Z'
}
```

But you also need to know if this user has been verified and if they are pending deletion, so you add more flags:
```js
{
  id: 1,
  name: 'Arthur Dent',
  isActive: true,
  isSuspended: false,
  isVerified: true,
  isPendingDeletion: false,
  userSuspendedDate: '2023-09-01T12:00:00Z',
  lastLogin: '2023-10-01T12:00:00Z'
}
```

Now you have four boolean flags, and the logic to determine the user's actual state becomes a glorious mess. What if a user is both suspended and pending deletion? What does that mean for `isActive`?

What happens when this user has 'isActive = true' and 'isSuspended = true'? Which one wins?

We're about to take a ride on the bug-express.

---
## Solution

This isn't a list of problems, don't worry. Here's a solution that has worked for me. It's not clear cut solution and certainly not for every project.

#### Status
Have a single source of truth. It just makes life a lot easier.
For example:
````java
// In your enums file
enum UserStatus {
    ACTIVE,
    SUSPENDED,
    PENDING_DELETION,
    DELETED
}

// Your user class
class User {
    private int id;
    private String name;
    private UserStatus status;
    private String lastLogin;

    // Constructor, getters, setters, etc.
}


````
Now we have achieved a few things (if not more): 
1. Code can't contradict itself.
2. Adding new states is easy.
3. Logic is simplified.
---

## Booleans
There is absolutely nothing inherently wrong with booleans. They are a fundamental part of programming and have their place.

The key question to ask yourself is: 

**“Could this ever need more than two states?”**

If _yes_ → use an enum (or something similar).

If _no_ → boolean is perfect.



