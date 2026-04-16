---
title: 'RAG: Giving AI a Memory It Can Actually Trust'
description: 'What Retrieval-Augmented Generation is and why your AI needs it'
pubDate: 'Feb 14 2026'
tags: ['AI']
heroImage: '../../assets/blog-placeholder-code.png'
---

You've probably noticed that AI can be confidently wrong. Ask it about something recent, something niche, or something from your own codebase, and it will just... make something up. Delivered with full confidence. Zero hesitation.

This is not a bug. It's just how language models work. They were trained on a snapshot of the world, and that snapshot has an expiry date.

**RAG** — Retrieval-Augmented Generation — is the fix.

## The problem

A language model like Claude or GPT doesn't know what you had for breakfast. It also doesn't know what changed in your codebase last Tuesday, what your company's internal policy says, or what's in that PDF you uploaded three months ago.

Its knowledge is frozen at training time.

So when you ask it a question about something it wasn't trained on, it has two options:

1. Say "I don't know"
2. Make something up that sounds plausible

Spoiler: it usually picks option 2.

RAG is how you give the model a third option: **look it up first, then answer**.

## How RAG works

The core idea is simple. Before the model answers your question, you retrieve the relevant information from your own data source and hand it to the model as context.

```
User asks a question
  → Search your data for relevant chunks
  → Stuff those chunks into the prompt
  → Model answers using that context
```

The model is no longer guessing. It's reading. You're essentially giving it an open-book exam instead of asking it to memorise everything in advance.

## But how does "search" work here?

This is where it gets a little weird. But stick with it.

Normal search matches keywords. You search for "password reset", you get documents that contain the words "password" and "reset". Simple.

RAG uses **vector search**. Instead of matching words, it matches *meaning*.

Every piece of text gets converted into a list of numbers — a **vector embedding** — that represents its semantic meaning. Similar meaning = similar numbers = close together in vector space.

So when you search for "how do I change my login credentials", it will find a document about password resets even if neither of those words appear in it. Because the *meaning* is close.

You do not need to understand the maths behind this. You just need to understand what it's for: finding the right information even when the wording doesn't match.

## The pipeline

Building a RAG system means setting up two things: an **ingestion pipeline** and a **query pipeline**.

**Ingestion** (do this once, or whenever your data changes):

1. Take your documents
2. Split them into smaller chunks
3. Turn each chunk into a vector embedding
4. Store those vectors in a vector database

**Query** (do this every time a user asks something):

1. Take the user's question
2. Turn it into a vector embedding
3. Find the chunks with the closest embeddings
4. Add those chunks to the prompt
5. Let the model answer

## The tools

You don't have to build any of this from scratch.

**[Semantic Kernel](https://github.com/microsoft/semantic-kernel)** (Microsoft's SDK, available for C# and Python) can handle the chunking and embedding pipeline for you. It's well-suited if you're building on .NET and want something that plays nicely with the rest of the Microsoft AI stack.

For the **vector store**, two solid choices:

- **[Qdrant](https://qdrant.tech/)** — a dedicated vector database. Fast, open source, and built specifically for this job. Good if you want a standalone service.
- **[pgvector](https://github.com/pgvector/pgvector)** — a Postgres extension that adds vector search to a database you likely already have. If you're already running Postgres and don't want to manage another service, this is the pragmatic choice.

For **embeddings**, OpenAI's `text-embedding-3-small` model is cheap, fast, and good enough for most use cases. You call it with your text, it gives you a vector back.

## A quick example

Here's what the embedding step looks like in C# with Semantic Kernel:

```csharp
var embeddingService = new OpenAITextEmbeddingGenerationService(
    modelId: "text-embedding-3-small",
    apiKey: "your-api-key"
);

var embedding = await embeddingService.GenerateEmbeddingAsync("What is dependency injection?");
// Returns a float[] you can store in your vector database
```

Not that scary, right?

## When should you use RAG?

RAG is the right tool when:

- Your data changes frequently (docs, wikis, support tickets)
- You're working with private data the model was never trained on
- You need answers that are grounded in specific sources
- You want to reduce hallucinations in high-stakes answers

It's probably overkill when:

- You're asking general knowledge questions
- Your data fits comfortably in a single prompt
- Latency is critical and you can't afford the retrieval step

## The short version

RAG gives AI an open-book exam instead of asking it to memorise everything. Your data gets chunked, embedded, and stored. At query time, the most relevant chunks get retrieved and handed to the model as context. The model reads them and answers.

You don't need to understand vector maths to use it. You just need to understand what it's for.

And now you do.