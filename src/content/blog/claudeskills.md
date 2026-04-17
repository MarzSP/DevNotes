---
title: 'Claude Skills Are Just Markdown Files'
description: 'Powerful skills in an .md'
pubDate: 'Apr 17 2026'
tags: ['AI']
heroImage: '../../assets/blog-placeholder-code.png'
---

I recently quit ChatGPT after two years. I wasn't a l33t superuser, I just quietly stopped opening it. And while I was properly digging into Claude for the first time, I realised there were cheat codes to make it actually work with me instead of just generically.

Two years I used ChatGPT. Not as a power user, just someone who had it open in a tab and used it the way most developers do. Rubber duck debugging, first drafts, "explain this error message to me like I'm tired." It was fine. Then I switched to Claude, mostly because a colleague mentioned it over lunch and made it sound interesting enough to actually explore.

Skills were not in any tutorial I read. I found them by going down a rabbit hole that same afternoon. This post is that rabbit hole, condensed.

Think of it like giving a new contractor a style guide before they start work. You could explain your conventions every single time they show up, or you could write it down once and hand it to them. A Skill is the written-down version. Claude gets the context it needs, including the reasoning behind the rules, not just the rules themselves.

The files live under `/mnt/skills/` and are organised into subfolders by purpose. There are public skills that Claude ships with, and you can add your own.

## What a SKILL.md actually looks like

Here's a simplified example. Say you want Claude to always generate Word documents in a consistent, professional format with proper headings, a specific structure, and no weird formatting surprises. You'd write something like this:

```markdown
# SKILL: docx generation

## Purpose
Use this skill when creating .docx files. It ensures consistent,
professional output using the docx npm package.

## When to trigger
- User asks for a Word document, report, memo, or letter
- Output needs to be a .docx file
- User says "save as Word" or similar

## Setup
Always install dependencies first:
\`\`\`bash
npm install docx
\`\`\`

## Structure rules
- Use HeadingLevel.HEADING_1 for the document title only
- Use HeadingLevel.HEADING_2 for major sections
- Body text uses Paragraph with no explicit heading level
- Tables use the default TableRow/TableCell structure
- Always save to /mnt/user-data/outputs/

## Example: creating a basic document
\`\`\`typescript
import { Document, Packer, Paragraph, HeadingLevel } from 'docx';
import { writeFileSync } from 'fs';

const doc = new Document({
  sections: [{
    children: [
      new Paragraph({ text: 'Report title', heading: HeadingLevel.HEADING_1 }),
      new Paragraph({ text: 'Introduction', heading: HeadingLevel.HEADING_2 }),
      new Paragraph('Your content here.'),
    ],
  }],
});

const buffer = await Packer.toBuffer(doc);
writeFileSync('/mnt/user-data/outputs/report.docx', buffer);
\`\`\`

## Common mistakes to avoid
- Do not use raw font styling, use HeadingLevel instead
- Do not create the file in /home/claude and forget to copy it to outputs
- Do not use a plain Paragraph where a heading is needed
```

That's a real pattern. The skill tells Claude what to install, how to structure things, what to avoid, and gives a concrete example. When you ask Claude to make you a Word document, it reads this first and the output is immediately more consistent than if it was just winging it from training alone.

## Why this actually matters

You write the instructions once, and they apply forever. That's genuinely it. No re-explaining yourself every session, no prompt gymnastics, no hoping Claude remembers the patterns your team agreed on.

## Where I landed

I'm a few weeks into using Claude "properly" now, and Skills are the thing I keep coming back to. A markdown file is about as technically unimpressive as it gets, but they work because they're the right shape for the problem. You write down what you know, Claude uses it. No ceremony, no framework, no configuration file with seventeen options.

It's one of those features that makes you think the people who built it have actually watched how developers work, rather than just building what sounded good in a launch announcement.

I, unexpectedly, don't miss ChatGPT.