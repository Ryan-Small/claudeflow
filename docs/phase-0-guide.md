# Phase 0 — Discovery

**Claude Web & Desktop** · Week 0

*Before touching the CLI, learn what Claude can do through familiar interfaces. By the end of this phase, you'll have a concrete project plan, generated artifacts, and the prompting instincts that carry into every subsequent phase.*

---

## Prerequisites

- A Claude account (free or Pro) at [claude.ai](https://claude.ai) or the Claude desktop app
- No code, no terminal, no setup — just you and Claude

---

## 1. Your First Prompt — Writing with Tone

Before any technical work, start with something human. Ask Claude to help you write an invitation — a party, a team dinner, a project kickoff — in a specific tone.

**Try this progression:**

1. Ask Claude to write the invitation in a **formal** tone
2. Ask it to rewrite in a **playful** tone
3. Ask for a **minimalist** version — three sentences max
4. Ask it to blend two tones — "formal but warm"

**What you're learning:**
- How specificity in instructions changes output quality
- The feedback loop: prompt → evaluate → refine → re-prompt
- That Claude adapts to stylistic constraints — the same instinct behind `CLAUDE.md` conventions and response styles

> **Prompting tip:** Compare "write me an invitation" with "write a 3-sentence invitation to a team lunch, playful tone, include a food pun." The second prompt produces better output not because it's longer, but because it's *specific about what matters*.

---

## 2. Create a Claude Project

Projects let you set persistent instructions and upload reference documents — Claude remembers them across every conversation in that project.

**Steps:**

1. Create a new Project (e.g., "TaskFlow Planning")
2. Add **custom instructions** that tell Claude about your preferences:
   - Your programming language preferences (Python, TypeScript)
   - Your communication style (concise, structured with headers, no emojis)
   - Your experience level and what kind of explanations you want
3. Upload **knowledge files** — documentation, style guides, or API references you want Claude to have access to

**What you're learning:**
- This is the web/desktop equivalent of `CLAUDE.md` — you're teaching Claude your context so it doesn't need re-explaining every session
- Custom instructions shape *every* response in the project, just like project-level `CLAUDE.md` shapes every Claude Code session

> **Checkpoint:** Start a new conversation in your project and ask a question. Does Claude respond in the style you specified? If not, refine your custom instructions and try again.

---

## 3. Configure Response Styles

Response Styles let you control *how* Claude communicates — beyond individual prompt instructions.

**Experiment with:**

- **Built-in styles** — try Concise, Detailed, Formal and notice how the same question gets different treatment
- **Custom styles** — create styles tailored to specific workflows:
  - A "Code Review" style — terse, opinionated, focuses on issues not praise
  - A "Planning" style — structured with headers, checklists, and clear next steps
  - A "Teaching" style — explains reasoning, provides examples, asks follow-up questions

**What you're learning:**
- Shaping Claude's behavior is a spectrum: individual prompts → response styles → project instructions → `CLAUDE.md`
- Different tasks benefit from different communication modes — you'll apply this same principle when configuring subagent personas in Phase 4

---

## 4. Use Research Mode

Research mode lets Claude perform deep, multi-step research with cited sources. Use it to make informed technology decisions for your project.

**Research tasks to try:**

1. "Compare FastAPI and Django for building a REST API — focus on performance, async support, and learning curve"
2. "Explain SQLAlchemy relationship patterns — one-to-many, many-to-many, self-referential — with examples"
3. "What are the trade-offs between Angular and React for a data-heavy dashboard application?"

**Evaluating research output:**

Research mode provides source links alongside its synthesis. Practice critical evaluation:

- **Check source quality** — is the source official documentation, a reputable blog, or a random forum post? Weight accordingly.
- **Verify currency** — is the source from the current version of the framework? A 2021 guide about FastAPI may not reflect 2024+ changes.
- **Cross-reference claims** — when Claude recommends an approach, check the cited source. Does it actually support the conclusion, or is Claude extrapolating?
- **Identify unsourced claims** — notice when Research provides no citation for a claim. That's where you need to verify independently.

**What you're learning:**
- Claude is a powerful research tool, but source verification is your responsibility
- This skill carries directly into Claude Code — you'll know when to trust generated code and when to verify against documentation

---

## 5. Understand the Model Tiers

Claude comes in three model tiers. Understanding when to use each one saves time and money.

| Model | Strengths | Best For | Trade-off |
|-------|-----------|----------|-----------|
| **Opus** | Highest reasoning capability, nuanced understanding, best code quality | Architecture decisions, complex debugging, code reviews, multi-step reasoning | Slowest, highest cost |
| **Sonnet** | Balanced capability and speed | General development work, code generation, explanations, most daily tasks | Good default for most work |
| **Haiku** | Fastest response time, lowest cost | Quick lookups, formatting, boilerplate generation, simple Q&A, high-volume tasks | Lower capability on complex tasks |

**Practice switching models:**

1. Ask the same architecture question on all three tiers — notice the difference in depth and nuance
2. Ask Haiku to generate boilerplate (a Python dataclass, an Angular component skeleton) — it's fast and accurate for structured tasks
3. Ask Opus to review a complex code decision — notice how it considers edge cases that Sonnet might miss

**What you're learning:**
- Model selection is a cost/capability trade-off you'll make constantly in Claude Code
- In Phase 4, you'll route subagents to different models (Sonnet for speed on reviews, Opus for complex implementation) — building intuition now makes those decisions natural

---

## 6. Generate Artifacts

Artifacts let Claude produce and preview code, diagrams, and documents inline. Use them to create visual mockups of your application.

**Exercises:**

1. Describe your app's main view (e.g., "a Kanban board with columns for backlog, in-progress, and done") and ask Claude to generate a React component
2. Iterate: "make the cards show priority as a colored dot," "add a search bar above the columns"
3. Ask Claude to generate an architecture diagram or entity-relationship diagram for your planned database

**What you're learning:**
- The prompt → preview → refine cycle is the same workflow you'll use in Claude Code, but with a visual feedback loop
- Artifacts help you think through UI design before writing any production code
- The `taskflow-companion-project.jsx` file in this repo was generated through this exact process

---

## 7. Plan the Project

Use everything you've learned to create a concrete project plan. By the end of this step, you should have:

1. **Technology decisions** — informed by Research, with sources
2. **Database schema** — entity-relationship design with tables, columns, and relationships
3. **API routes** — endpoint list with HTTP methods, paths, and request/response shapes
4. **Component hierarchy** — frontend structure (pages, components, services)
5. **Docker service map** — what containers you need and how they connect

Ask Claude to generate each of these as artifacts. Save them — they'll be your blueprint for Phase 1.

**What you're learning:**
- Planning with Claude is iterative — your first schema won't be your last
- The quality of your plan depends on the quality of your prompts — everything from steps 1–6 builds toward this

---

## Phase Checkpoint

You know you've succeeded when:

- [ ] You have a Claude Project with custom instructions that shape every response
- [ ] You've configured at least one custom Response Style
- [ ] You've used Research mode and can evaluate source quality in the output
- [ ] You understand when to use Opus vs Sonnet vs Haiku
- [ ] You've generated at least one visual artifact (UI mockup) through iterative prompting
- [ ] You have a concrete project plan (schema, routes, components, Docker services)
- [ ] You're ready to move from chatting with Claude to building with Claude Code

---

## Resources

- [Prompt Engineering Guide](https://www.promptingguide.ai/) — comprehensive reference for prompting techniques and best practices
- [Claude Documentation](https://docs.anthropic.com/) — official Anthropic docs for Claude features
- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code) — what you'll be using starting in Phase 1
