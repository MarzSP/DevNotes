---
title: 'Graphs for Beginners'
description: 'Everything is connected'
pubDate: 'Jan 12 2026'
tags: ['Code']
heroImage: '../../assets/blog-placeholder-code.png'
---
Arrays line up neatly: [1, 2, 3, 4, 5]

Lists go from left to right: [A, B, C, D]

Tree's are organised lines of hierarchy:

          Root
         /    \
      Node1  Node2
   
Graphs, however, are a bit different.


# Graphs for Beginners
Graphs are everywhere. From social networks to transportation systems, but also in mapping relationships between data points (yes, like route on a map!)

There's some lingo we have to cover first:
- **Vertices (or Nodes)**: These are the individual points in the graph. In a social network, each person is a vertex.
- **Edges**: These are the connections between the vertices. In a social network, an edge represents a friendship or connection between two people.
- **Directed vs Undirected Graphs**:
  - In a directed graph, edges have a direction (like a one-way street).
  - In an undirected graph, edges don't have a direction (like a two-way street).
- **Weighted vs Unweighted Graphs**:
  - In a weighted graph, edges have weights (like distances or costs).
  - In an unweighted graph, all edges are equal.
- **Cycles**: A cycle is a path that starts and ends at the same vertex without repeating any edges or vertices (except for the starting/ending vertex).
- **Path**: A sequence of edges that connects a sequence of vertices.

A vertex (plural: vertices) is a point. A thing. A place.

An edge is a connection between two vertices.

You’ll often see it written like this:
````

A —— B  ——  C
\          /
 D —— E — F
````

Meaning:

A is connected to B and D.

B is connected to A and C.

C is connected to F and B.

D is connected to A and E.

E is connected to D and F.



There’s no “start” or “end” yet. It’s just structure.


## Directed vs undirected graphs

A graph can be directed or undirected.

### Undirected graphs

Connections go both ways.
````

A —— B  ——  C
\          /
 D —— E — F
````

If A connects to B, B connects to A.
(Friendships are usually modelled this way, or atleas, they should be.)

### Directed graphs

Connections have a direction. (Don't mind my arrows in the following example.)

````

A —→ B  —→  C
|           |    
 v          v
 D —→ E —→ F
````
In this example A can Reach B, but B can’t reach A.
A can also reach F through B and C.
A can also reach F through D and E.
But B can't reach D or E.

## Weighted vs unweighted graphs
A graph can also be weighted or unweighted.

### Unweighted graphs
Connections are equal. There is no cost or distance associated with them.
````    
A —— B  ——  C
\          /
 D —— E — F  
````

## Weighted graphs
A weighted graph has costs or distances associated with each connection.
The weight of Vertex A to Vertex B is 5.
The weight of Vertex B to Vertex C is 2.
The weight of Vertex A to Vertex D is 1.
The weight of Vertex D to Vertex E is 2.
````    
A — 5 — B  — 2 —  C
 \                /  
  1              1  
   \            /
   D —2— E —2- F
````

With a weighted (and/or directed) graph you can start to ask questions like:
- What is the shortest path from A to F?
- What is the least costly path from A to F?
- Is there a path from B to D?
- What is the total cost of traveling from A to C via B?

## How it's stored
There are two common ways to store graphs in a computer: adjacency lists and adjacency matrices.
Let's keep it easy for today and focus on adjacency lists.

### Adjacency List
An adjacency list represents a graph as a collection of lists. Each vertex has a list of its adjacent vertices (it's neighbourino's!)

So for an unweighted undirected graph like this:

````
A → [B, D]
B → [A, C]
C → [B, D]
D → [A, C]
````
For the weighted and directional graph it would look like this:

````
A → [(B, 5), (D, 1)]
B → [(C, 2)]
C → [(F, 1)]
D → [(E, 2)]
E → [(F, 2)]
````

This method of storage is memory efficient, easy to traverse and scales well.
There are other ways to store graphs, but we'll save that for another day.

-------------------------------------------------------------------------------
There are many things we can do with Graphs, from finding the shortest path (Dijkstra's algorithm) to searching for specific nodes (Depth-First Search, Breadth-First Search).
Stay tuned for more fun with graphs!