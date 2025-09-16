---
title: 'The Twin Peaks Model'
description: 'Twin Peaks Model'
pubDate: 'Sept 15 2025'
heroImage: '../../assets/blog-placeholder-3.jpg'
---
The **Twin Peaks model** (by Bashar Nuseibeh, 2001) shows how requirements and architecture evolve together. Instead of finishing requirements first and only then designing architecture, both “peaks” rise side by side.

- On one peak: **requirements** become clearer as we talk with users and refine what the system must do.
- On the other: **architecture** takes shape as we test design ideas, weigh trade-offs, and explore what’s technically possible.

The key message:
- **Requirements influence architecture** — if users demand high performance, the architecture must support it.
- **Architecture influences requirements** — once a technical choice is made, it may create new possibilities or constraints that change the requirements.

It’s called a *cycle* because this process is **iterative**: each new detail in requirements can reshape architecture, and each architectural decision can reshape requirements.

**Example (simple):**  
A client says “the system must handle many users.” That’s vague. While experimenting, the team tries a microservices approach. This raises new requirements: monitoring, distributed logging, and network resilience. Requirements and architecture grow together.

---

**Why it matters:**
- Prevents “big design up front” that quickly goes stale.
- Encourages collaboration between developers and stakeholders.
- Leads to systems that better fit both business needs and technical realities.

The Twin Peaks model reminds us: building software is never just *gather then code*. It’s an ongoing conversation between what users want and how we can make it work.  

---
*References:*
- Bass, L., Clements, P., & Kazman, R. (2012). Software Architecture in Practice (3rd ed.). Addison-Wesley.
- Nuseibeh, B. (2001). Weaving Together Requirements and Architectures. IEEE Computer, 34(3), 115-117.