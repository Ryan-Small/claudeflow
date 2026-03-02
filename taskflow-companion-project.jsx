import { useState } from "react";

const phases = [
  {
    id: 1,
    branch: "phase-1-foundation",
    title: "Foundation",
    subtitle: "Configuration & Memory",
    duration: "Week 1–2",
    color: "#E8D5B7",
    accent: "#3D2B1F",
    appState: "Basic task tracker API + Angular frontend. CRUD operations for projects, tasks, and comments. SQLite database with SQLAlchemy. No external integrations yet.",
    friction: "You keep re-explaining your project structure, API conventions, and component patterns to Claude every session. Permissions are wide open — Claude occasionally touches files it shouldn't.",
    whatYouBuild: [
      "FastAPI backend with routers for projects, tasks, comments, and users",
      "Angular frontend with a Kanban board view and task detail panel",
      "SQLite database with SQLAlchemy models and Alembic migrations",
      "Auth middleware with JWT using python-jose and Pydantic schemas",
    ],
    claudeCodeWork: [
      {
        feature: "CLAUDE.md (global)",
        what: "Personal preferences: preferred test runner (pytest), commit message style, Python formatting (Ruff), TypeScript strictness",
        file: "~/.claude/CLAUDE.md",
      },
      {
        feature: "CLAUDE.md (project)",
        what: "Project architecture, FastAPI router patterns, Angular component/service conventions, SQLAlchemy model structure, Pydantic schema patterns",
        file: "project/CLAUDE.md",
      },
      {
        feature: "settings.json",
        what: "Permission deny rules for .env files, database credentials, and the production config directory",
        file: ".claude/settings.json",
      },
      {
        feature: "Model configuration",
        what: "Set default model, configure thinking tokens, understand /cost output",
        file: "Environment variables",
      },
    ],
    branchDiff: "Phase 2 branch adds hook configurations and slash command files. If your CLAUDE.md is well-structured and permissions are configured, the diff should only be new files in .claude/commands/ and hook entries in settings.json.",
    checkpoint: "Claude remembers your conventions across sessions without re-prompting. It refuses to read .env but happily works on everything else. You're using /cost to understand your token spend.",
  },
  {
    id: 2,
    branch: "phase-2-automation",
    title: "Automation",
    subtitle: "Hooks & Slash Commands",
    duration: "Week 3–4",
    color: "#C4D7C2",
    accent: "#1B3A1A",
    appState: "Working CRUD app with tests. You're adding features regularly — new FastAPI routers, Angular components, Alembic migrations. The codebase is growing.",
    friction: "Every time Claude edits a file, you manually run the formatter. Tests break silently because you forget to run them after changes. Creating a new API resource (router + schemas + model + migration + test) requires the same 5-step prompt every time.",
    whatYouBuild: [
      "Task assignment and due date features with Pydantic validation",
      "Angular filtering and search components on the Kanban board",
      "Request validation with Pydantic models and FastAPI dependency injection",
      "Test suite with pytest (API) and Karma/Jasmine (Angular components)",
    ],
    claudeCodeWork: [
      {
        feature: "PostToolUse hook — auto-format",
        what: "Run Ruff on *.py files and Prettier on *.ts, *.html, *.scss files after Write or Edit tools",
        file: ".claude/settings.json → hooks.PostToolUse",
      },
      {
        feature: "PostToolUse hook — auto-test",
        what: "Run related pytest file when a source file in /server is modified; run ng test --include for Angular component changes",
        file: ".claude/settings.json + scripts/run-related-tests.sh",
      },
      {
        feature: "PreToolUse hook — branch guard",
        what: "Block Write/Edit operations when on the main branch to enforce feature branch workflow",
        file: ".claude/settings.json → hooks.PreToolUse",
      },
      {
        feature: "Slash command — /project:new-resource",
        what: "Scaffolds a complete API resource: FastAPI router, Pydantic schemas, SQLAlchemy model, Alembic migration, and pytest file from a single prompt",
        file: ".claude/commands/new-resource.md",
      },
      {
        feature: "Slash command — /project:pr-prep",
        what: "Runs Ruff, Prettier, pytest, generates a changelog entry, and drafts a PR description",
        file: ".claude/commands/pr-prep.md",
      },
    ],
    branchDiff: "Phase 3 branch adds .mcp.json and potentially new slash commands that reference MCP tools. Your hooks and existing commands should be nearly identical.",
    checkpoint: "Python files are auto-formatted with Ruff, TypeScript with Prettier on every edit. Tests run automatically and Claude sees failures immediately. You scaffold new resources with a single /project:new-resource command instead of a multi-paragraph prompt.",
  },
  {
    id: 3,
    branch: "phase-3-integration",
    title: "Integration",
    subtitle: "MCP Servers & External Tools",
    duration: "Week 5–6",
    color: "#C4CDE0",
    accent: "#1A2740",
    appState: "Feature-complete task tracker. You're now managing real work in it — tracking bugs, planning features. You want Claude to work with your actual project management flow, not just edit files.",
    friction: "You're copy-pasting issue descriptions from GitHub into Claude prompts. When Claude finishes a feature, you manually create the PR. You can't query your app's database without writing raw SQL in a separate terminal. Context about what needs to be built lives outside Claude's reach.",
    whatYouBuild: [
      "Activity feed showing recent changes across projects using FastAPI WebSocket endpoints",
      "Label/tag system with SQLAlchemy many-to-many relationships",
      "Angular dashboard view with task statistics and Chart.js integration",
      "Notification preferences with per-user settings stored in SQLAlchemy",
    ],
    claudeCodeWork: [
      {
        feature: "GitHub MCP server",
        what: "Read issues, create PRs, check CI status — the ticket-to-PR workflow becomes a single conversation",
        file: ".mcp.json → github",
      },
      {
        feature: "SQLite MCP server",
        what: "Claude queries your app's database directly: checking data integrity, exploring SQLAlchemy schema, verifying Alembic migrations",
        file: ".mcp.json → sqlite",
      },
      {
        feature: "Filesystem MCP server",
        what: "Enhanced file operations beyond Claude's built-in Read/Write for batch operations",
        file: ".mcp.json → filesystem",
      },
      {
        feature: "Slash command — /project:ticket",
        what: "Reads a GitHub issue via MCP, implements the feature, runs tests, and opens a PR — all in one flow",
        file: ".claude/commands/ticket.md",
      },
      {
        feature: "Hook + MCP synergy",
        what: "PostToolUse hook logs all MCP write operations (GitHub PR creation, database changes) to an audit file",
        file: ".claude/settings.json + scripts/log-mcp-writes.sh",
      },
    ],
    branchDiff: "Phase 4 branch adds .claude/agents/ directory with subagent markdown files. Your MCP configuration and commands should be very close.",
    checkpoint: "You say 'implement issue #42' and Claude reads the ticket, writes the code, runs tests, and opens a PR. You can ask Claude to query your database to verify data without leaving the conversation.",
  },
  {
    id: 4,
    branch: "phase-4-orchestration",
    title: "Orchestration",
    subtitle: "Subagents & Context Engineering",
    duration: "Week 7–8",
    color: "#DBC4D8",
    accent: "#3A1A36",
    appState: "The app is substantial now — 50+ files, multiple feature areas, growing test suite. Single-context conversations are hitting limits. Complex tasks (refactoring the API layer while updating frontend components) cause Claude to lose track.",
    friction: "When Claude investigates a bug, the debug output floods the context window and it forgets your original question. Asking Claude to refactor the FastAPI layer AND update the Angular components means it loses details about one while working on the other. Code reviews are shallow because Claude's context is full of implementation details.",
    whatYouBuild: [
      "Real-time updates with FastAPI WebSockets and Angular RxJS observables",
      "File attachments on tasks with FastAPI UploadFile and Angular file upload components",
      "Advanced Kanban features: swimlanes, WIP limits, Angular CDK drag-and-drop",
      "Admin panel as a lazy-loaded Angular module with guards and role-based access",
    ],
    claudeCodeWork: [
      {
        feature: "Code reviewer subagent",
        what: "Dedicated agent with a detailed review checklist (Python type hints, Pydantic validation, Angular best practices, test coverage, security). Runs in isolation so review context doesn't pollute your implementation session.",
        file: ".claude/agents/code-reviewer.md",
      },
      {
        feature: "Database analyst subagent",
        what: "Read-only agent that explores schema, checks query performance, suggests indexes. Uses the SQLite MCP server but can't modify data.",
        file: ".claude/agents/db-analyst.md",
      },
      {
        feature: "Test writer subagent",
        what: "Specialized agent that reads source files and generates pytest tests for FastAPI endpoints and Karma/Jasmine specs for Angular components. Knows your testing patterns from its own MEMORY.md.",
        file: ".claude/agents/test-writer.md",
      },
      {
        feature: "Slash command — /project:feature",
        what: "Orchestrates the full feature lifecycle: db-analyst checks schema → main Claude implements → test-writer adds tests → code-reviewer validates",
        file: ".claude/commands/feature.md",
      },
      {
        feature: "Subagent model routing",
        what: "Route the code-reviewer to Sonnet for speed, keep main implementation on Opus for capability. Configure CLAUDE_CODE_SUBAGENT_MODEL.",
        file: "Environment variables + agent frontmatter",
      },
    ],
    branchDiff: "Phase 5 adds .claude/skills/ directories, plugin packaging, and CI/CD workflows. Your agents and orchestration commands should match closely.",
    checkpoint: "You kick off /project:feature and Claude orchestrates multiple specialists. Your main context stays clean. The code-reviewer subagent has built up memory of your codebase's recurring issues over several sessions.",
  },
  {
    id: 5,
    branch: "phase-5-distribution",
    title: "Distribution",
    subtitle: "Skills, Plugins & Team Scale",
    duration: "Week 9–10",
    color: "#D4C4B0",
    accent: "#2E251C",
    appState: "Production-ready app. You're now thinking about team collaboration: how do new contributors get the same Claude Code experience? How do you enforce standards in CI/CD?",
    friction: "A new team member joins and has to manually recreate your entire .claude/ setup. Your FastAPI and Angular patterns are documented in CLAUDE.md but Claude doesn't consistently apply them. There's no automated quality gate in the CI pipeline — code review depends on someone remembering to invoke the reviewer subagent.",
    whatYouBuild: [
      "Deployment pipeline with Docker, uvicorn, and ng build for staging/production",
      "API documentation auto-generated from FastAPI's OpenAPI schema",
      "Performance monitoring with FastAPI middleware and health check endpoints",
      "Contributor onboarding documentation",
    ],
    claudeCodeWork: [
      {
        feature: "Skill — API patterns",
        what: "SKILL.md + templates for your FastAPI router/Pydantic schema/dependency injection pattern. Auto-discovered when Claude is creating new endpoints.",
        file: ".claude/skills/api-patterns/SKILL.md + templates/",
      },
      {
        feature: "Skill — Angular components",
        what: "SKILL.md + examples showing your component conventions, service patterns, RxJS usage, and SCSS styling approach. Triggered automatically on frontend work.",
        file: ".claude/skills/angular-components/SKILL.md + examples/",
      },
      {
        feature: "Skill — testing standards",
        what: "SKILL.md bundled with pytest fixtures, conftest patterns, and Angular test helpers. Ensures consistent test patterns whether invoked by you, a subagent, or a new team member.",
        file: ".claude/skills/testing/SKILL.md + helpers/",
      },
      {
        feature: "Plugin packaging",
        what: "Bundle your entire .claude/ configuration — agents, commands, hooks, skills, MCP config — into a distributable plugin that teammates install with one command.",
        file: "plugin.json + install script",
      },
      {
        feature: "CI/CD integration",
        what: "GitHub Action that runs Claude Code in headless mode: auto-reviews PRs, checks for convention violations, validates test coverage, and comments results.",
        file: ".github/workflows/claude-review.yml",
      },
      {
        feature: "Slash command — /project:onboard",
        what: "Interactive onboarding flow for new contributors: explores the codebase, explains architecture, verifies their environment, and sets up their local Claude config.",
        file: ".claude/commands/onboard.md",
      },
    ],
    branchDiff: "This is the final branch. It represents the fully-instrumented project — a reference implementation of Claude Code best practices applied to a real application.",
    checkpoint: "New team members install your plugin and immediately have your full Claude Code setup. Skills auto-activate based on what area of the codebase they're working in — FastAPI patterns for backend, Angular conventions for frontend. PRs are automatically reviewed in CI. The project is a self-documenting, self-enforcing codebase.",
  },
];

const techStack = [
  { layer: "Backend", tech: "FastAPI + Python" },
  { layer: "Frontend", tech: "Angular + TypeScript" },
  { layer: "Database", tech: "SQLite + SQLAlchemy + Alembic" },
  { layer: "Testing", tech: "pytest + Karma/Jasmine" },
  { layer: "Tooling", tech: "Ruff + Prettier + ESLint" },
];

export default function CompanionProject() {
  const [activePhase, setActivePhase] = useState(0);
  const [expandedSection, setExpandedSection] = useState("claude");

  const phase = phases[activePhase];

  const toggle = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div style={{
      fontFamily: "'Newsreader', 'Georgia', serif",
      background: "#FAF8F4",
      minHeight: "100vh",
      color: "#2A2118",
    }}>
      {/* Header */}
      <div style={{
        background: "#2A2118",
        color: "#FAF8F4",
        padding: "48px 32px 40px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "repeating-linear-gradient(45deg, transparent, transparent 60px, rgba(255,255,255,0.015) 60px, rgba(255,255,255,0.015) 61px)",
          pointerEvents: "none",
        }} />
        <div style={{ maxWidth: 960, margin: "0 auto", position: "relative" }}>
          <div style={{
            fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
            fontSize: 11,
            letterSpacing: 3,
            textTransform: "uppercase",
            opacity: 0.5,
            marginBottom: 12,
          }}>
            Companion Project · TaskFlow
          </div>
          <h1 style={{
            fontSize: 38,
            fontWeight: 400,
            margin: 0,
            lineHeight: 1.15,
            letterSpacing: -0.5,
          }}>
            Building a Project Tracker
          </h1>
          <p style={{
            fontSize: 16,
            opacity: 0.6,
            marginTop: 12,
            fontStyle: "italic",
            maxWidth: 600,
            lineHeight: 1.5,
          }}>
            A full-stack task management app that progressively adopts every Claude Code feature.
            Each phase introduces real friction that the next feature naturally solves.
          </p>

          {/* Tech Stack Pills */}
          <div style={{ display: "flex", gap: 8, marginTop: 20, flexWrap: "wrap" }}>
            {techStack.map((t, i) => (
              <div key={i} style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                padding: "5px 12px",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 3,
              }}>
                <span style={{ opacity: 0.4 }}>{t.layer}:</span> {t.tech}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 32px" }}>

        {/* Phase Timeline */}
        <div style={{
          display: "flex",
          marginTop: 40,
          position: "relative",
        }}>
          {/* Connecting line */}
          <div style={{
            position: "absolute",
            top: 20,
            left: 20,
            right: 20,
            height: 2,
            background: "#E8E2DA",
            zIndex: 0,
          }} />
          {phases.map((p, i) => (
            <button
              key={p.id}
              onClick={() => { setActivePhase(i); setExpandedSection("claude"); }}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                background: "none",
                border: "none",
                cursor: "pointer",
                zIndex: 1,
                padding: "0 4px",
              }}
            >
              <div style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: activePhase === i ? "#2A2118" : activePhase > i ? p.color : "#FAF8F4",
                border: `2px solid ${activePhase >= i ? "#2A2118" : "#D8D0C8"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                fontWeight: 600,
                color: activePhase === i ? "#FAF8F4" : "#2A2118",
                transition: "all 0.3s",
              }}>
                {activePhase > i ? "✓" : p.id}
              </div>
              <div style={{
                marginTop: 10,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                letterSpacing: 1,
                textTransform: "uppercase",
                color: activePhase === i ? "#2A2118" : "#A09080",
                fontWeight: activePhase === i ? 600 : 400,
              }}>
                {p.title}
              </div>
              <div style={{
                fontSize: 11,
                color: "#A09080",
                marginTop: 2,
              }}>
                {p.duration}
              </div>
            </button>
          ))}
        </div>

        {/* Phase Content */}
        <div style={{ padding: "40px 0" }}>

          {/* Branch Badge */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "#2A2118",
            color: "#FAF8F4",
            padding: "6px 14px",
            borderRadius: 4,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            marginBottom: 24,
          }}>
            <span style={{ opacity: 0.5 }}>⎇</span>
            {phase.branch}
          </div>

          <h2 style={{
            fontSize: 28,
            fontWeight: 400,
            margin: "0 0 6px",
            letterSpacing: -0.3,
          }}>
            {phase.subtitle}
          </h2>

          {/* App State */}
          <div style={{
            background: phase.color,
            border: `1px solid ${phase.accent}20`,
            borderRadius: 6,
            padding: "20px 24px",
            marginTop: 20,
            marginBottom: 12,
          }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              letterSpacing: 2,
              textTransform: "uppercase",
              opacity: 0.5,
              marginBottom: 8,
            }}>
              App State at This Phase
            </div>
            <div style={{ fontSize: 14.5, lineHeight: 1.6, color: phase.accent }}>
              {phase.appState}
            </div>
          </div>

          {/* Friction Box */}
          <div style={{
            background: "#FFF",
            border: "1px solid #E8E2DA",
            borderLeft: `3px solid #C4483E`,
            borderRadius: "0 6px 6px 0",
            padding: "20px 24px",
            marginBottom: 28,
          }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#C4483E",
              marginBottom: 8,
            }}>
              ⚡ The Friction You'll Feel
            </div>
            <div style={{ fontSize: 14.5, lineHeight: 1.6 }}>
              {phase.friction}
            </div>
          </div>

          {/* Expandable Sections */}
          {[
            { key: "app", label: "What You Build in the App", icon: "◆" },
            { key: "claude", label: "Claude Code Configuration Work", icon: "◇" },
            { key: "checkpoint", label: "Phase Checkpoint & Branch Diff", icon: "◈" },
          ].map(({ key, label, icon }) => (
            <div key={key} style={{
              marginBottom: 8,
              border: `1px solid ${expandedSection === key ? phase.accent + "30" : "#E8E2DA"}`,
              borderRadius: 6,
              overflow: "hidden",
              background: expandedSection === key ? "#FFF" : "#FEFDFB",
              transition: "all 0.2s",
            }}>
              <button
                onClick={() => toggle(key)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "16px 20px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span style={{ color: phase.accent, opacity: 0.4, fontSize: 14 }}>{icon}</span>
                <span style={{
                  fontSize: 15,
                  fontWeight: 600,
                  fontFamily: "'Newsreader', serif",
                  flex: 1,
                }}>
                  {label}
                </span>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 14,
                  opacity: 0.3,
                  transition: "transform 0.2s",
                  transform: expandedSection === key ? "rotate(45deg)" : "rotate(0)",
                }}>+</span>
              </button>

              {expandedSection === key && (
                <div style={{ padding: "0 20px 20px 46px" }}>
                  <div style={{ borderTop: `1px solid ${phase.accent}15`, paddingTop: 16 }}>

                    {key === "app" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {phase.whatYouBuild.map((item, i) => (
                          <div key={i} style={{
                            display: "flex",
                            gap: 10,
                            fontSize: 13.5,
                            lineHeight: 1.55,
                          }}>
                            <span style={{ color: phase.accent, opacity: 0.3, fontSize: 8, marginTop: 6, flexShrink: 0 }}>●</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {key === "claude" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {phase.claudeCodeWork.map((item, i) => (
                          <div key={i} style={{
                            background: "#FAFAF8",
                            border: "1px solid #E8E2DA",
                            borderRadius: 4,
                            padding: "14px 16px",
                          }}>
                            <div style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "baseline",
                              marginBottom: 6,
                            }}>
                              <span style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: 13,
                                fontWeight: 600,
                                color: phase.accent,
                              }}>
                                {item.feature}
                              </span>
                              <code style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: 10,
                                opacity: 0.4,
                                background: "#F0ECE6",
                                padding: "2px 8px",
                                borderRadius: 3,
                              }}>
                                {item.file}
                              </code>
                            </div>
                            <div style={{ fontSize: 13, lineHeight: 1.55, color: "#5A4D3F" }}>
                              {item.what}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {key === "checkpoint" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        <div>
                          <div style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: 10,
                            letterSpacing: 1.5,
                            textTransform: "uppercase",
                            opacity: 0.4,
                            marginBottom: 8,
                          }}>
                            ✓ You Know You've Succeeded When
                          </div>
                          <div style={{
                            fontSize: 14,
                            lineHeight: 1.6,
                            color: "#1B3A1A",
                            padding: "12px 16px",
                            background: "#E8F0E8",
                            borderRadius: 4,
                          }}>
                            {phase.checkpoint}
                          </div>
                        </div>
                        <div>
                          <div style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: 10,
                            letterSpacing: 1.5,
                            textTransform: "uppercase",
                            opacity: 0.4,
                            marginBottom: 8,
                          }}>
                            ⎇ Expected Diff to Next Branch
                          </div>
                          <div style={{
                            fontSize: 13,
                            lineHeight: 1.6,
                            fontFamily: "'JetBrains Mono', monospace",
                            padding: "12px 16px",
                            background: "#2A2118",
                            color: "#E8DDD0",
                            borderRadius: 4,
                          }}>
                            {phase.branchDiff}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Project Structure (shown at bottom) */}
        <div style={{
          background: "#2A2118",
          color: "#E8DDD0",
          borderRadius: 6,
          padding: "28px 32px",
          marginBottom: 24,
          fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
          fontSize: 12,
          lineHeight: 1.8,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", opacity: 0.4, marginBottom: 16 }}>
            TaskFlow — Full Project Structure by Phase 5
          </div>
          <pre style={{ margin: 0, whiteSpace: "pre-wrap", fontSize: 11.5 }}>{`taskflow/
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
    └── test_auth.py`}</pre>
        </div>

        {/* Narrative Flow */}
        <div style={{
          background: "#FFF",
          border: "1px solid #E8E2DA",
          borderRadius: 6,
          padding: "28px 32px",
          marginBottom: 48,
        }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            letterSpacing: 2,
            textTransform: "uppercase",
            opacity: 0.4,
            marginBottom: 16,
          }}>
            The Narrative Arc
          </div>
          <div style={{ fontSize: 14.5, lineHeight: 1.7, maxWidth: 720 }}>
            You start by teaching Claude who you are and how you work
            <span style={{ color: "#A09080" }}> (Phase 1)</span>. Then you get tired of
            manual chores and automate them
            <span style={{ color: "#A09080" }}> (Phase 2)</span>. The app gets serious enough
            that you need Claude to talk to the outside world
            <span style={{ color: "#A09080" }}> (Phase 3)</span>. Complexity grows until one
            brain isn't enough — you need a team of specialists
            <span style={{ color: "#A09080" }}> (Phase 4)</span>. Finally, you package
            everything so others can work the same way you do
            <span style={{ color: "#A09080" }}> (Phase 5)</span>.
          </div>
          <div style={{
            marginTop: 16,
            fontSize: 14,
            fontStyle: "italic",
            color: "#8A7A68",
          }}>
            Each phase's branch is a checkpoint, not a crutch. If the diff surprises you, revisit the lessons.
          </div>
        </div>

        {/* Progress dots */}
        <div style={{
          display: "flex",
          gap: 4,
          justifyContent: "center",
          padding: "0 0 48px",
        }}>
          {phases.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === activePhase ? 32 : 8,
                height: 4,
                borderRadius: 2,
                background: i === activePhase ? "#2A2118" : "#D8D0C8",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        borderTop: "1px solid #E8E2DA",
        padding: "24px 32px",
        textAlign: "center",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
        color: "#A09080",
        letterSpacing: 0.5,
      }}>
        TaskFlow Companion Project · Mastering Claude Code Roadmap · 2026
      </div>
    </div>
  );
}
