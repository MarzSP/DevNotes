---
title: "Dijkstra's Algorithm"
description: 'The art of finding the shortest path.'
pubDate: 'Jan 13 2026'
tags: ['Code']
heroImage: '../../assets/blog-placeholder-code.png'
---

In my previous post on [Graphs for Beginners](./graph1.md), we covered the basics of graphs, including vertices, edges, and different types of graphs. Today, we're going to dive into one of the most famous algorithms for finding the shortest path in a graph: Dijkstra's Algorithm.

## What is Dijkstra's Algorithm?
Dijkstra's Algorithm is a greedy algorithm that finds the shortest path from a starting vertex to all other vertices in a weighted graph with non-negative edge weights. It was developed by Dutch computer scientist Edsger W. Dijkstra in 1956 and has since become a fundamental algorithm in computer science and graph theory.

## How Does Dijkstra's Algorithm Work?
The algorithm works by maintaining a priority queue (or linked list) of vertices to explore, starting from the source vertex.
1. **Initialization**: Set the distance to the source vertex to 0 and all other vertices to infinity. Mark all vertices as unvisited.
2. **Exploration**: While there are unvisited vertices:
   - Select the unvisited vertex with the smallest distance (let's call it the "current vertex").
   - For each unvisited neighbor of the current vertex, calculate the tentative distance from the source vertex through the current vertex.
   - If the tentative distance is less than the previously recorded distance, update the distance and set the current vertex as the predecessor of the neighbor.
   - Mark the current vertex as visited.
3. **Completion**: The algorithm continues until all vertices have been visited. The shortest path from the source vertex to each vertex can be reconstructed by following the predecessor links.
4. **Path Reconstruction**: To find the shortest path to a specific vertex, backtrack from that vertex to the source using the predecessor links.
5. **Result**: The algorithm produces the shortest path distances from the source vertex to all other vertices in the graph.
6. **Time Complexity**: The time complexity of Dijkstra's Algorithm is O((V + E) log V) when using a priority queue, where V is the number of vertices and E is the number of edges.
7. **Space Complexity**: The space complexity is O(V) due to the storage of distances and predecessor information for each vertex.

That's a lot of dry information, so let's look at an example.
### Example
Consider the following weighted graph:
```
      (1)
   A ------- B
   | \       |
 (4)|  \ (2) |
   |     \  |(5)|
   C ------- D
      (1)
```
We want to find the shortest path from vertex A to all other vertices. I'm going to use my Java Implementation, using recursion and a linked list for the priority queue.
This isn't the most efficient way to do it, but it gets the job done for small graphs. I practised writing many different versions of Dijkstra's Algorithm, and this is just one of them.

Also: Dijkstra computes shortest distances first; reconstructing the actual path requires storing predecessor information during the algorithm. (not done in this example below!)
```java
    public double[] dijkstraFromIndex(int startIndex) {
        int n = adjacencyList.size();
        if (startIndex < 0 || startIndex >= n) {
            throw new IllegalArgumentException("startIndex out of range");
        }

        double[] distance = new double[n];
        boolean[] visited = new boolean[n];

        Arrays.fill(distance, Double.POSITIVE_INFINITY);
        distance[startIndex] = 0.0;

        int start = findClosestNotVisited(distance, visited);

        dijkstraRecursive(start, distance, visited);

        return distance;
    }

    private void dijkstraRecursive(int currentIndex, double[] distance, boolean[] visited) {
        if (currentIndex == -1) return;

        VertexEntry currentNode = adjacencyList.get(currentIndex);
        for (Edge<T> edge : currentNode.edges) {
            Vertex<T> targetVertex = edge.getTargetVertex();

            int neighborIndex = indexOfVertex(targetVertex);
            if (neighborIndex == -1) continue;

            double candidate = distance[currentIndex] + edge.getWeight();
            if (candidate < distance[neighborIndex]) {
                distance[neighborIndex] = candidate;
            }
        }

        visited[currentIndex] = true;
        int nextIndex = findClosestNotVisited(distance, visited);
        dijkstraRecursive(nextIndex, distance, visited);
    }

  
    private int findClosestNotVisited(double[] distance, boolean[] visited) {
        int bestIndex = -1;
        double bestDistance = Double.POSITIVE_INFINITY;

        for (int i = 0; i < distance.length; i++) {
            if (!visited[i] && distance[i] < bestDistance) {
                bestDistance = distance[i];
                bestIndex = i;
            }
        }
        return bestIndex;
    }
```
Using this implementation on our example graph, starting from vertex A, we get the following shortest path distances:
- Distance from A to A: 0
- Distance from A to B: 1
- Distance from A to C: 4
- Distance from A to D: 3
- Distance from A to E: ∞ (not reachable)
- Distance from A to F: ∞ (not reachable)

Now there's a few things to note here.
1. Dijkstra's Algorithm only works with graphs that have non-negative edge weights. 
2. Once the shortest path to a vertex is found, it is finalized and will not be updated again.
