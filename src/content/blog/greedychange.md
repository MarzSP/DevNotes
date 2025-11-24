---
title: 'Greedy Algorithms: Part 1'
description: 'The change-making problem.'
pubDate: 'Nov 15 2025'
tags: ['Code']
heroImage: '../../assets/blog-placeholder-code.png'
---
If you’ve ever stood at a Dutch supermarket checkout, desperately trying to hand the cashier your exact €6,37 in coins (only to discover you have three 1-cent coins, a mysterious 2-cent coin that seems illegal, and a button from your coat), then congratulations: you’ve lived the Change-Making Problem.

In IT, the Change-Making Problem asks:

Given coin denominations and a target amount, what is the minimum number of coins needed to make exact change?

That sounds simple but..it isn't always.
Algorithms argue about this problem like devs argue about Windows vs Linux.

To solve it, we usually meet two characters:

**Greedy Algorithm** – “I’ll just take the biggest coin first. YOLO.”

**Dynamic Programming** – “Let me consider all possibilities because uncertainty gives me anxiety.” (a bit like me really)

Let’s explore both.

````
€2, €1, 50c, 20c, 10c, 5c, 2c, 1c
````
These denominations are canonical, meaning greedy usually works.
But not always — and those edge cases are where the fun *really* begins.

## The greedy approach
🥐 The Greedy Approach

Greedy logic is simple:

Take the largest possible coin.

Subtract it from the amount.

Repeat until zero.



This is the algorithm equivalent of “eat the biggest piece of cake first; deal with crumbs later”.

````java
import java.util.*;

public class GreedyEuroChange {

    static int[] coins = {200, 100, 50, 20, 10, 5, 2, 1};

    public static List<Integer> makeChange(int amount) {
        List<Integer> result = new ArrayList<>();

        for (int coin : coins) {
            while (amount >= coin) {
                amount -= coin;
                result.add(coin);
            }
        }
        return result;
    }

    public static void main(String[] args) {
        int amount = 87; // €0.87
        List<Integer> change = makeChange(amount);
        System.out.println(change);
    }
}
````

Run this and we expect to get...
````java
[50, 20, 10, 5, 2]
````
Correct! 

BUT

#### But Greedy Fails (Sometimes)

With euro coins, greedy works in 99% of cases.
But let’s invent a new coin to show greedy can be _less_ optimal:

Suppose we add a 25cent coin (don’t ask why; maybe the Danish did it).

Now let's try and make 40 cents:

**Greedy says:**

Take 25

Take 10

Take 5

= 3 coins

**Optimal solution:**

20 + 20

= 2 coins, optimal wins. 

Let’s push it further: 60 cents

**Greedy**:

25 + 25 + 10 = 3 coins

**Optimal:**

20 + 20 + 20 = 3 coins, D'oh.

Okay, bad example. Let's keep trying.

Try 80 cents:

**Greedy**:

25 + 25 + 20 + 10 = 4 coins

**Optimal**:

20 + 20 + 20 + 20 = 4 coins
Still a stalemate.

Try 90 cents:

**Greedy:**

50 + 25 + 20 + 5 = 4 coins

**Optimal:**

50 + 20 + 20 = 3 coins

Optimal wins again. This shows greedy can fail when coin denominations are non-standard.

## Dynamic Programming to the Rescue
DP does not trust greedy.
DP assumes the universe is chaotic and checks every possibility.

It builds a table from 0 -> amount, storing the minimum coins needed.

````javascript
function dpEuroChange(amount) {
  const coins = [200, 100, 50, 20, 10, 5, 2, 1];
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let amt = 1; amt <= amount; amt++) {
    for (let coin of coins) {
      if (coin <= amt) {
        dp[amt] = Math.min(dp[amt], dp[amt - coin] + 1);
      }
    }
  }

  return dp[amount];
}

console.log(dpEuroChange(87)); // 5
````

Dynamic programming gives you the optimal answer, every time. Fountain of wisdom.
But it’s slower, like that colleague who triple-checks every document because
“you can never be too sure, Karen”.

The change making problem shows the trade-off between speed and accuracy in algorithms.
Greedy is fast but can be wrong.
Dynamic programming is accurate but slower.
Choose your fighter wisely!