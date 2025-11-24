---
title: 'Greedy Algorithms: Part 2'
description: 'REGEX is a powertool for pattern matching'
pubDate: 'Nov 21 2025'
tags: ['Code']
heroImage: '../../assets/blog-placeholder-code.png'
---

To start off with, I hope you know what a REGEX is. If not, well, I'll tell you quickly.

**REGEX** (short for Regular Expression) is a powerful tool used in programming for pattern matching within strings. It allows you to search, match, and manipulate text based on specific patterns.

### Classic Example
Regex:
````javascript
".*"
````
This regex pattern matches any string that starts and ends with double quotes, capturing everything in between. For example, it would match `"Hello, World!"` or `"12345"`.

So basicly, this regex is greedy and means: "Match as many characters as possible between the quotes."

### Greedy Quantifiers: The Main Culprits

These characters are greedy by default:

* — zero or more

+ — one or more

{m,n} — between m and n

And all of them behave like contestants on a game show trying to grab as much text as possible.

### How Regex Actually Chooses What to Match

(The tiny little chaos engine inside your computer)

Here’s the process:

Greedy quantifier matches everything
“Let me grab the entire line, top to bottom.”

Regex then tries to satisfy the rest of the pattern
“Oh dear, this doesn't quite fit.”

It begins backtracking
“Alright, I’ll put this bit back… and that bit… fine, have it.”

This backtracking is the reason greedy regex often works eventually. However it is also the reason your CPU fan occasionally sounds like it's preparing for take-off.

### Example: HTML Tags (Don't try this at home..please)
Consider this HTML snippet:
````html
<.*>
````
This regex is supposed to match HTML tags. However, because of its greedy nature, it matches everything from the first `<` to the last `>`, resulting in:
Text: 
````html
<div>Hello</div><span>Bye</span>
````
Match: `<div>Hello</div><span>Bye</span>`
To fix this, we can use a non-greedy quantifier by adding a `?
    after the `*`:
````html
<.*?>
````
Now it matches each tag individually:

Matches: `<div>`, `<span>`


### Watching Greediness in Action
When your pattern is ambiguous, greedy quantifiers cause extreme backtracking.
The regex engine essentially panics and tries every possible match length.
````javascript
(a+)+
````
Results in..
```
aaaaaaaaaaaaaaaaaaaa
```
Which is:
Your regex engine quietly writing its will.

This is not what you call “greedy algorithm optimisation”.
It’s brute-force enthusiasm.

### When you *do* want to use Greedy Regex
Now that I’ve spent an entire blog post scaring you away from greedy regex like it's a dodgy kebab at 2 AM, let’s be fair: greedy matching isn’t always the villain. Sometimes you actually want your regex to grab as much as it can.

Here is when greedy regex is your friend:

- When you're matching the entire rest of a line

For example, logs, console output, CSV rows:
if you want everything after a certain marker, greedy is your friend:
````javascript
ERROR: (.*)

````
If the line contains multiple chunks, you genuinely want the whole mess.

- When the boundaries are unambiguous

If there's only one valid match possible, being greedy doesn’t hurt.
Example:
````javascript
^.*$
````
Perfectly fine to match the entire line: because that’s literally the job.

- When you’re capturing a “blob” of text

Sometimes you genuinely want everything inside a block:
````javascript
BEGIN(.*)END
````

I found this website to be quite helpful in making the right REGEX: [Regex101](https://regex101.com/). Give it a try!