# ClaudeFlow

Learn Claude Code mastery by building **TaskFlow** — a full-stack project tracker that progressively adopts every Claude Code feature. Each phase introduces real friction that the next feature naturally solves.

## Phases

| Phase | Branch | Focus | Guide |
|-------|--------|-------|-------|
| 0 | `main` | **Discovery** — Claude Web & Desktop | [Phase 0 Guide](docs/phase-0-guide.md) |
| 1 | `phase-1-foundation` | **Foundation** — Configuration & Memory | [Phase 1 Guide](docs/phase-1-guide.md) |
| 2 | `phase-2-automation` | **Automation** — Hooks & Slash Commands | [Phase 2 Guide](docs/phase-2-guide.md) |
| 3 | `phase-3-integration` | **Integration** — MCP Servers & External Tools | [Phase 3 Guide](docs/phase-3-guide.md) |
| 4 | `phase-4-orchestration` | **Orchestration** — Subagents & Context Engineering | [Phase 4 Guide](docs/phase-4-guide.md) |
| 5 | `phase-5-distribution` | **Distribution** — Skills, Plugins & Team Scale | [Phase 5 Guide](docs/phase-5-guide.md) |

See [companion-project.md](companion-project.md) for the full roadmap visualization with detailed phase content.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | FastAPI + Python |
| Frontend | Angular + TypeScript |
| Database | SQLite + SQLAlchemy + Alembic |
| Testing | pytest + Karma/Jasmine |
| Tooling | Ruff + Prettier + ESLint |

## How to Use This Repo

### Branching Model

Each phase lives on a long-lived branch. Phase branches are chained — each one builds on the previous:

```
main                         ← stable overview, Phase 0 content
 └─ phase-1-foundation       ← CLAUDE.md, settings, app scaffold
     └─ phase-2-automation   ← hooks, slash commands
         └─ phase-3-integration   ← MCP servers, external tools
             └─ phase-4-orchestration   ← subagents, context engineering
                 └─ phase-5-distribution   ← skills, plugins, CI/CD
```

### Working Through Phases

1. **Start on `main`** — read Phase 0 and explore Claude via web/desktop
2. **Check out the next phase branch** — read the guide, examine the diff
3. **Build alongside** — follow the guide to add each feature to your own project
4. **Compare your work** — diff your branch against the phase branch to validate

### Learning From Diffs

The diffs between phase branches are intentionally instructive. To see what a phase adds:

```bash
git diff phase-1-foundation..phase-2-automation
```

If the diff surprises you, revisit the phase guide — each addition solves a specific friction point.
