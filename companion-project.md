# Companion Project: TaskFlow

*A full-stack task management app that progressively adopts every Claude Code feature. Each phase introduces real friction that the next feature naturally solves.*

**[Phase 0](#phase-0--discovery)** | **[Phase 1](#phase-1--foundation)** | **[Phase 2](#phase-2--automation)** | **[Phase 3](#phase-3--integration)** | **[Phase 4](#phase-4--orchestration)** | **[Phase 5](#phase-5--distribution)**

| Layer | Technology |
|-------|-----------|
| Backend | FastAPI + Python |
| Frontend | Angular + TypeScript |
| Database | SQLite + SQLAlchemy + Alembic |
| Testing | pytest + Karma/Jasmine |
| Tooling | Ruff + Prettier + ESLint |

---

## Phase 0 — Discovery

`main` · **Claude Web & Desktop** · Week 0

### App State at This Phase

> No code yet. You're exploring what Claude can do before committing to a development workflow. The TaskFlow app is just an idea — you're using Claude to research, plan, and prototype.

### The Friction You'll Feel

> **You've heard about Claude but aren't sure where to start.** You're not ready for a CLI tool — you want to explore what AI-assisted development looks like through a familiar interface. You have questions about architecture, want to brainstorm features, and maybe generate some UI mockups before writing any code.

<details>
<summary><strong>What You Do in This Phase</strong></summary>

- Use Claude.ai (web) or the Claude desktop app to brainstorm TaskFlow's feature set and architecture
- Ask Claude to explain trade-offs: FastAPI vs Django, Angular vs React, SQLite vs PostgreSQL
- Generate UI mockups by describing your Kanban board layout and having Claude produce a React visualization
- Research Claude Code's feature set — ask Claude to explain CLAUDE.md, hooks, MCP servers, and subagents
- Plan your project structure and API design through conversational iteration

</details>

<details>
<summary><strong>Claude Skills You'll Practice</strong></summary>

| Skill | What You'll Do |
|-------|---------------|
| **Conversational Q&A** | Ask Claude to compare frameworks, explain patterns, and evaluate trade-offs for TaskFlow's architecture |
| **Research & synthesis** | Have Claude summarize documentation, explain unfamiliar concepts (FastAPI dependency injection, Angular modules), and identify learning paths |
| **UI generation** | Describe your Kanban board vision and ask Claude to generate a React component as a visual prototype (see `taskflow-companion-project.jsx`) |
| **Prompt iteration** | Practice refining prompts — start vague ("build me a task tracker"), get specific ("generate a React component showing a 5-phase roadmap with expandable sections") |
| **Artifacts** | Use Claude's artifact feature to generate, preview, and iterate on code snippets, diagrams, and documentation |

</details>

<details>
<summary><strong>Phase Checkpoint</strong></summary>

> **You know you've succeeded when:**
> You have a clear mental model of what TaskFlow will look like, understand why each tech stack choice was made, and have generated at least one artifact (like the JSX roadmap visualization) through conversational iteration with Claude. You're ready to move from chatting to building.

> **Expected diff to Phase 1:**
> Phase 1 adds the actual app scaffold (FastAPI backend, Angular frontend, SQLite database), `CLAUDE.md` files, and `.claude/settings.json`. The transition is from *talking about building* to *actually building with Claude Code as your pair programmer*.

</details>

---

## Phase 1 — Foundation

`phase-1-foundation` · **Configuration & Memory** · Week 1–2

### App State at This Phase

> Basic task tracker API + Angular frontend. CRUD operations for projects, tasks, and comments. SQLite database with SQLAlchemy. No external integrations yet.

### The Friction You'll Feel

> **You keep re-explaining your project structure, API conventions, and component patterns to Claude every session.** Permissions are wide open — Claude occasionally touches files it shouldn't.

<details>
<summary><strong>What You Build in the App</strong></summary>

- FastAPI backend with routers for projects, tasks, comments, and users
- Angular frontend with a Kanban board view and task detail panel
- SQLite database with SQLAlchemy models and Alembic migrations
- Auth middleware with JWT using python-jose and Pydantic schemas

</details>

<details>
<summary><strong>Claude Code Configuration Work</strong></summary>

| Feature | What You'll Configure | File |
|---------|----------------------|------|
| **CLAUDE.md (global)** | Personal preferences: preferred test runner (pytest), commit message style, Python formatting (Ruff), TypeScript strictness | `~/.claude/CLAUDE.md` |
| **CLAUDE.md (project)** | Project architecture, FastAPI router patterns, Angular component/service conventions, SQLAlchemy model structure, Pydantic schema patterns | `project/CLAUDE.md` |
| **settings.json** | Permission deny rules for .env files, database credentials, and the production config directory | `.claude/settings.json` |
| **Model configuration** | Set default model, configure thinking tokens, understand /cost output | Environment variables |

</details>

<details>
<summary><strong>Phase Checkpoint</strong></summary>

> **You know you've succeeded when:**
> Claude remembers your conventions across sessions without re-prompting. It refuses to read .env but happily works on everything else. You're using /cost to understand your token spend.

> **Expected diff to Phase 2:**
> Phase 2 branch adds hook configurations and slash command files. If your CLAUDE.md is well-structured and permissions are configured, the diff should only be new files in .claude/commands/ and hook entries in settings.json.

</details>

---

## Phase 2 — Automation

`phase-2-automation` · **Hooks & Slash Commands** · Week 3–4

### App State at This Phase

> Working CRUD app with tests. You're adding features regularly — new FastAPI routers, Angular components, Alembic migrations. The codebase is growing.

### The Friction You'll Feel

> **Every time Claude edits a file, you manually run the formatter.** Tests break silently because you forget to run them after changes. Creating a new API resource (router + schemas + model + migration + test) requires the same 5-step prompt every time.

<details>
<summary><strong>What You Build in the App</strong></summary>

- Task assignment and due date features with Pydantic validation
- Angular filtering and search components on the Kanban board
- Request validation with Pydantic models and FastAPI dependency injection
- Test suite with pytest (API) and Karma/Jasmine (Angular components)

</details>

<details>
<summary><strong>Claude Code Configuration Work</strong></summary>

| Feature | What You'll Configure | File |
|---------|----------------------|------|
| **PostToolUse hook — auto-format** | Run Ruff on *.py files and Prettier on *.ts, *.html, *.scss files after Write or Edit tools | `.claude/settings.json` → `hooks.PostToolUse` |
| **PostToolUse hook — auto-test** | Run related pytest file when a source file in /server is modified; run ng test --include for Angular component changes | `.claude/settings.json` + `scripts/run-related-tests.sh` |
| **PreToolUse hook — branch guard** | Block Write/Edit operations when on the main branch to enforce feature branch workflow | `.claude/settings.json` → `hooks.PreToolUse` |
| **Slash command — /project:new-resource** | Scaffolds a complete API resource: FastAPI router, Pydantic schemas, SQLAlchemy model, Alembic migration, and pytest file from a single prompt | `.claude/commands/new-resource.md` |
| **Slash command — /project:pr-prep** | Runs Ruff, Prettier, pytest, generates a changelog entry, and drafts a PR description | `.claude/commands/pr-prep.md` |

</details>

<details>
<summary><strong>Phase Checkpoint</strong></summary>

> **You know you've succeeded when:**
> Python files are auto-formatted with Ruff, TypeScript with Prettier on every edit. Tests run automatically and Claude sees failures immediately. You scaffold new resources with a single /project:new-resource command instead of a multi-paragraph prompt.

> **Expected diff to Phase 3:**
> Phase 3 branch adds .mcp.json and potentially new slash commands that reference MCP tools. Your hooks and existing commands should be nearly identical.

</details>

---

## Phase 3 — Integration

`phase-3-integration` · **MCP Servers & External Tools** · Week 5–6

### App State at This Phase

> Feature-complete task tracker. You're now managing real work in it — tracking bugs, planning features. You want Claude to work with your actual project management flow, not just edit files.

### The Friction You'll Feel

> **You're copy-pasting issue descriptions from GitHub into Claude prompts.** When Claude finishes a feature, you manually create the PR. You can't query your app's database without writing raw SQL in a separate terminal. Context about what needs to be built lives outside Claude's reach.

<details>
<summary><strong>What You Build in the App</strong></summary>

- Activity feed showing recent changes across projects using FastAPI WebSocket endpoints
- Label/tag system with SQLAlchemy many-to-many relationships
- Angular dashboard view with task statistics and Chart.js integration
- Notification preferences with per-user settings stored in SQLAlchemy

</details>

<details>
<summary><strong>Claude Code Configuration Work</strong></summary>

| Feature | What You'll Configure | File |
|---------|----------------------|------|
| **GitHub MCP server** | Read issues, create PRs, check CI status — the ticket-to-PR workflow becomes a single conversation | `.mcp.json` → `github` |
| **SQLite MCP server** | Claude queries your app's database directly: checking data integrity, exploring SQLAlchemy schema, verifying Alembic migrations | `.mcp.json` → `sqlite` |
| **Filesystem MCP server** | Enhanced file operations beyond Claude's built-in Read/Write for batch operations | `.mcp.json` → `filesystem` |
| **Slash command — /project:ticket** | Reads a GitHub issue via MCP, implements the feature, runs tests, and opens a PR — all in one flow | `.claude/commands/ticket.md` |
| **Hook + MCP synergy** | PostToolUse hook logs all MCP write operations (GitHub PR creation, database changes) to an audit file | `.claude/settings.json` + `scripts/log-mcp-writes.sh` |

</details>

<details>
<summary><strong>Phase Checkpoint</strong></summary>

> **You know you've succeeded when:**
> You say "implement issue #42" and Claude reads the ticket, writes the code, runs tests, and opens a PR. You can ask Claude to query your database to verify data without leaving the conversation.

> **Expected diff to Phase 4:**
> Phase 4 branch adds .claude/agents/ directory with subagent markdown files. Your MCP configuration and commands should be very close.

</details>

---

## Phase 4 — Orchestration

`phase-4-orchestration` · **Subagents & Context Engineering** · Week 7–8

### App State at This Phase

> The app is substantial now — 50+ files, multiple feature areas, growing test suite. Single-context conversations are hitting limits. Complex tasks (refactoring the API layer while updating frontend components) cause Claude to lose track.

### The Friction You'll Feel

> **When Claude investigates a bug, the debug output floods the context window and it forgets your original question.** Asking Claude to refactor the FastAPI layer AND update the Angular components means it loses details about one while working on the other. Code reviews are shallow because Claude's context is full of implementation details.

<details>
<summary><strong>What You Build in the App</strong></summary>

- Real-time updates with FastAPI WebSockets and Angular RxJS observables
- File attachments on tasks with FastAPI UploadFile and Angular file upload components
- Advanced Kanban features: swimlanes, WIP limits, Angular CDK drag-and-drop
- Admin panel as a lazy-loaded Angular module with guards and role-based access

</details>

<details>
<summary><strong>Claude Code Configuration Work</strong></summary>

| Feature | What You'll Configure | File |
|---------|----------------------|------|
| **Code reviewer subagent** | Dedicated agent with a detailed review checklist (Python type hints, Pydantic validation, Angular best practices, test coverage, security). Runs in isolation so review context doesn't pollute your implementation session. | `.claude/agents/code-reviewer.md` |
| **Database analyst subagent** | Read-only agent that explores schema, checks query performance, suggests indexes. Uses the SQLite MCP server but can't modify data. | `.claude/agents/db-analyst.md` |
| **Test writer subagent** | Specialized agent that reads source files and generates pytest tests for FastAPI endpoints and Karma/Jasmine specs for Angular components. Knows your testing patterns from its own MEMORY.md. | `.claude/agents/test-writer.md` |
| **Slash command — /project:feature** | Orchestrates the full feature lifecycle: db-analyst checks schema → main Claude implements → test-writer adds tests → code-reviewer validates | `.claude/commands/feature.md` |
| **Subagent model routing** | Route the code-reviewer to Sonnet for speed, keep main implementation on Opus for capability. Configure CLAUDE_CODE_SUBAGENT_MODEL. | Environment variables + agent frontmatter |

</details>

<details>
<summary><strong>Phase Checkpoint</strong></summary>

> **You know you've succeeded when:**
> You kick off /project:feature and Claude orchestrates multiple specialists. Your main context stays clean. The code-reviewer subagent has built up memory of your codebase's recurring issues over several sessions.

> **Expected diff to Phase 5:**
> Phase 5 adds .claude/skills/ directories, plugin packaging, and CI/CD workflows. Your agents and orchestration commands should match closely.

</details>

---

## Phase 5 — Distribution

`phase-5-distribution` · **Skills, Plugins & Team Scale** · Week 9–10

### App State at This Phase

> Production-ready app. You're now thinking about team collaboration: how do new contributors get the same Claude Code experience? How do you enforce standards in CI/CD?

### The Friction You'll Feel

> **A new team member joins and has to manually recreate your entire .claude/ setup.** Your FastAPI and Angular patterns are documented in CLAUDE.md but Claude doesn't consistently apply them. There's no automated quality gate in the CI pipeline — code review depends on someone remembering to invoke the reviewer subagent.

<details>
<summary><strong>What You Build in the App</strong></summary>

- Deployment pipeline with Docker, uvicorn, and ng build for staging/production
- API documentation auto-generated from FastAPI's OpenAPI schema
- Performance monitoring with FastAPI middleware and health check endpoints
- Contributor onboarding documentation

</details>

<details>
<summary><strong>Claude Code Configuration Work</strong></summary>

| Feature | What You'll Configure | File |
|---------|----------------------|------|
| **Skill — API patterns** | SKILL.md + templates for your FastAPI router/Pydantic schema/dependency injection pattern. Auto-discovered when Claude is creating new endpoints. | `.claude/skills/api-patterns/SKILL.md` + `templates/` |
| **Skill — Angular components** | SKILL.md + examples showing your component conventions, service patterns, RxJS usage, and SCSS styling approach. Triggered automatically on frontend work. | `.claude/skills/angular-components/SKILL.md` + `examples/` |
| **Skill — testing standards** | SKILL.md bundled with pytest fixtures, conftest patterns, and Angular test helpers. Ensures consistent test patterns whether invoked by you, a subagent, or a new team member. | `.claude/skills/testing/SKILL.md` + `helpers/` |
| **Plugin packaging** | Bundle your entire .claude/ configuration — agents, commands, hooks, skills, MCP config — into a distributable plugin that teammates install with one command. | `plugin.json` + install script |
| **CI/CD integration** | GitHub Action that runs Claude Code in headless mode: auto-reviews PRs, checks for convention violations, validates test coverage, and comments results. | `.github/workflows/claude-review.yml` |
| **Slash command — /project:onboard** | Interactive onboarding flow for new contributors: explores the codebase, explains architecture, verifies their environment, and sets up their local Claude config. | `.claude/commands/onboard.md` |

</details>

<details>
<summary><strong>Phase Checkpoint</strong></summary>

> **You know you've succeeded when:**
> New team members install your plugin and immediately have your full Claude Code setup. Skills auto-activate based on what area of the codebase they're working in — FastAPI patterns for backend, Angular conventions for frontend. PRs are automatically reviewed in CI. The project is a self-documenting, self-enforcing codebase.

> **This is the final branch.** It represents the fully-instrumented project — a reference implementation of Claude Code best practices applied to a real application.

</details>

---

## Full Project Structure (Phase 5)

```
taskflow/
├── CLAUDE.md                         # Project conventions & architecture
├── .mcp.json                         # GitHub, SQLite, Filesystem servers
├── plugin.json                       # Distributable plugin manifest
├── pyproject.toml                    # Python project config (Ruff, pytest)
│
├── .claude/
│   ├── settings.json                 # Hooks + permissions
│   ├── settings.local.json           # Personal overrides (gitignored)
│   │
│   ├── agents/
│   │   ├── code-reviewer.md          # Phase 4: Review checklist agent
│   │   ├── db-analyst.md             # Phase 4: Read-only DB explorer
│   │   └── test-writer.md            # Phase 4: Test generation specialist
│   │
│   ├── commands/
│   │   ├── new-resource.md           # Phase 2: Scaffold API resource
│   │   ├── pr-prep.md                # Phase 2: Lint + test + PR draft
│   │   ├── ticket.md                 # Phase 3: Issue → implement → PR
│   │   ├── feature.md                # Phase 4: Orchestrated feature flow
│   │   └── onboard.md                # Phase 5: New contributor setup
│   │
│   └── skills/
│       ├── api-patterns/             # Phase 5: FastAPI router templates
│       │   ├── SKILL.md
│       │   └── templates/
│       ├── angular-components/       # Phase 5: Component conventions
│       │   ├── SKILL.md
│       │   └── examples/
│       └── testing/                  # Phase 5: Test patterns + helpers
│           ├── SKILL.md
│           └── helpers/
│
├── scripts/
│   ├── run-related-tests.sh          # Phase 2: Smart test runner
│   └── log-mcp-writes.sh            # Phase 3: MCP audit logger
│
├── server/                           # FastAPI backend
│   ├── main.py                       # App entry, middleware, CORS
│   ├── routers/                      # API route modules
│   ├── models/                       # SQLAlchemy ORM models
│   ├── schemas/                      # Pydantic request/response models
│   ├── dependencies/                 # FastAPI dependency injection
│   └── alembic/                      # Database migrations
│       └── versions/
│
├── client/                           # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/           # Shared UI components
│   │   │   ├── features/             # Feature modules (kanban, admin)
│   │   │   ├── services/             # HTTP + WebSocket services
│   │   │   ├── guards/               # Route guards
│   │   │   └── models/               # TypeScript interfaces
│   │   ├── assets/
│   │   └── environments/
│   ├── angular.json
│   └── tsconfig.json
│
├── .github/
│   └── workflows/
│       └── claude-review.yml         # Phase 5: CI/CD integration
│
└── tests/                            # pytest test suite
    ├── conftest.py
    ├── test_projects.py
    ├── test_tasks.py
    └── test_auth.py
```

---

## The Narrative Arc

You start by exploring Claude through the web and desktop interfaces — learning what it can do before committing to a workflow *(Phase 0)*. Then you teach Claude who you are and how you work *(Phase 1)*. You get tired of manual chores and automate them *(Phase 2)*. The app gets serious enough that you need Claude to talk to the outside world *(Phase 3)*. Complexity grows until one brain isn't enough — you need a team of specialists *(Phase 4)*. Finally, you package everything so others can work the same way you do *(Phase 5)*.

*Each phase's branch is a checkpoint, not a crutch. If the diff surprises you, revisit the lessons.*
