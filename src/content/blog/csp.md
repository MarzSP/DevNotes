---
title: 'CSP'
description: 'What CSP means to me'
pubDate: 'Oct 5 2025'
tags: ['Security']
heroImage: '../../assets/blog-placeholder-security.png'
---
# What is a CSP Header?

If you’ve ever built a website, chances are your browser console has at some point muttered something about a CSP header.
If you ignored it and carried on with your day, it's okay, we've all been there. But what is the fuss all about?

A Content Security Policy (CSP) is a set of house rules for your website.
It tells the browser exactly which sources are allowed to load things like scripts, styles, and images.

No rules? Then anything goes. And anything goes, means trouble. This is how hackers slip in their own JavaScript and start stealing data, cookies, or, occasionally, dignity.

With CSP, the browser becomes more picky (in a good way):

“Scripts? Only from this domain, k thx bai.”
“Images? Fine, but only from these trusted ones.”

If something doesn’t match the list, it’s blocked before it reaches your site.
 
## Why?

Because the internet can be... a bit of a bun fight.

Without CSP, someone could slip a malicious script into your site maybe through a comment form, and that script could quietly nick your cookies, data, or reputation.

CSP steps in and says:

“Hold up, only scripts from mydomain.com are allowed, thank you very much.”

It’s basically your browser acting like a sensible bouncer outside the club that is your website.

## What Does It Look Like?

You add it as an HTTP header. Something like this:
Here’s what a CSP header might look like:
```http
Content-Security-Policy: default-src 'self'; img-src 'self' https://trusted-images.com; script-src 'self' https://trusted-scripts.com
```
So here we have:

default-src 'self' → only load resources from your own domain

img-src → allow images from your site and a trusted CDN

script-src → only run JavaScript you actually host

If a dodgy script tries to sneak in from evilhacker.biz, the browser says “no”. 

Also, one last thing:
You might find that you can use an asterisk (*) as a wildcard = “allow anything from anywhere.”
Technically true, but also completely defeats the purpose.
It’s like locking your front door and leaving the windows wide open. So unless you know what you're doing, avoid at all costs!