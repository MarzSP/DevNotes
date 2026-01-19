---
title: 'Queues'
description: 'Queues are not just for supermarkets'
pubDate: 'Nov 09 2025'
tags: ['Code']
heroImage: '../../assets/blog-placeholder-code.png'
---

The beauty of Queues...watching people who wait for their turn. I appreciate a well-ordered (and polite) queue.

Programming queues is just like that. They are data structure that follow the First In, First Out (**FIFO**) principle. The first element added to the queue will be the first one to be removed.

### Basic Operations
If you join a queue:
1. You get in line behind everyone else
2. You wait your turn, like a civilised human being
3. Eventually, you get served and leave the queue

So computers do this too, with the added mixin of *NullPointerExceptions* if you try to remove something from an empty queue.

| Operation | Description |
|-----------|-------------|
| Enqueue   | Add an element to the back of the queue |
| Dequeue   | Remove and return the element at the front of the queue |
| Peek      | View the element at the front of the queue without removing it |
| IsEmpty   | Check if the queue is empty |
| Size      | Get the number of elements in the queue |

### Let's see that in action
Here is an example with a generic queue interface in Java (*Fear not, I will be penning about Generics soon!*)
```java
public interface MyQueue<T> {
    void enqueue(T item);
    T dequeue();
    T peek();
    boolean isEmpty();
    int size();
}
```
And a simple implementation using a linked list:
```java
public class LinkedListQueue<T> implements MyQueue<T> {
    private static class Node<T> {
        T value;
        Node<T> next;
        Node(T value) { this.value = value; }
    }

    private Node<T> front;
    private Node<T> back;
    private int size = 0;

    @Override
    public void enqueue(T item) {
        Node<T> node = new Node<>(item);
        if (back != null) {
            back.next = node;
        }
        back = node;
        if (front == null) {
            front = back;
        }
        size++;
    }

    @Override
    public T dequeue() {
        if (isEmpty()) throw new IllegalStateException("Queue is empty!");
        T value = front.value;
        front = front.next;
        if (front == null) back = null;
        size--;
        return value;
    }

    @Override
    public T peek() {
        if (isEmpty()) throw new IllegalStateException("Queue is empty!");
        return front.value;
    }

    @Override
    public boolean isEmpty() { return size == 0; }

    @Override
    public int size() { return size; }
}
```
And what you can do with this:
```java
MyQueue<String> q = new LinkedListQueue<>(); 
q.enqueue("Tea");
q.enqueue("Biscuits");
q.enqueue("More Tea");

System.out.println(q.dequeue()); // I hope you can guess what this prints.
System.out.println(q.peek());    // Same for this one!
```

### When to use a Queue
- Fairness (everyone gets their turn)
- Order (tasks processed in arrival order)
- Buffering (network packets, messages, jobs)