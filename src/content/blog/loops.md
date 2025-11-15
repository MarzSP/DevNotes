---
title: 'Loops'
description: 'Looping like its RTC1 all over again'
pubDate: 'Oct 16 2025'
tags: ['Code']
heroImage: '../../assets/blog-placeholder-code.png'
---

Loops. We're all writing them. The trick is to find out when to stop writing the wrong ones. (And I feel like this is something you find out as you go, not taught in college!)

The **OG loop** is the classic 'for'-loop.
Rigid, polite and likes counting things.
````
for (int i = 0; i < stuff.size(); i++) {
    buy(stuff.get(i));
}
````

This looks like a duck, walks like a duck and quacks like a duck. It does exactly what you tell it to do, which isn't always what you think it is that you told it.

You can use this OG classic when you need an index, a step or control. Avoid this one if you can't count things without using <= instead of <.


### While
The while loop is for those moments when you have absolutely no idea how many times something will happen.
Could be once. Could be forever. It’s an adventure. Don't forget an exit strategy on this one.
````
while (teapot.isFull()) {
    pourCup();
}
````
Use it wisely, like when you’re waiting for something to stop being true.

### Do While
Love a bit of optimism. That where the Do While comes in to play. Try until it works! (This is a terrible example.. I know)
````
do {
    attemptLogin();
} while (!loggedIn);
````
Run atleast once, no matter what. 

### For Each
The nice and civilized loop is the For-Each loop. It doesn't really care what number you are on, it will just visit each element.
````
for (var biscuit : biscuits) {
    dunkInTea(biscuit);
}
````
- Ideal when you simply need each thing.
- Useless if you actually need the number of the thing.

----
Coming soon: More on loops! With Map, Filter and Reduce. Feeling Loopy yet?