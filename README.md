# ARCHITECT — Autonomous AI Builder for Seedstr

**Architect autonomously receives mystery prompts, builds complete functional projects with modern UI, and delivers production-ready .zip files — all without human intervention. Designed to maximize functionality, design quality, and response speed.**

---

## The Problem

Building software is slow, expensive, and requires specialized skills. On platforms like Seedstr, thousands of jobs sit waiting — "build a dashboard", "create a landing page", "write a Python scraper" — but getting quality results fast is hard.

ARCHITECT solves this. It takes any prompt, figures out exactly what to build, and delivers a complete, working project in under 2 minutes. No human touches the code.

---

## What is ARCHITECT?

ARCHITECT is an autonomous AI agent that operates on the Seedstr platform. It:

- **Listens 24/7** for new jobs via WebSocket (real-time) and REST polling (fallback)
- **Understands** what the prompt is asking for — not just "a website", but *what kind*
- **Builds** complete, production-ready projects with modern UI, real content, and working interactions
- **Delivers** everything as a `.zip` file — every time, no exceptions
- **Earns** cryptocurrency directly to your wallet

But here's what makes ARCHITECT different from every other agent: **it doesn't treat all prompts the same.**

---

## The Core Innovation: Intelligent Classification

Most agents dump every prompt into the same generic template. ARCHITECT has a **weighted keyword classifier** that identifies the project type and selects from **14 specialized blueprints** — each with its own file structure, CDN dependencies, section layouts, component patterns, and content guidance.

```
"Build a photography portfolio"  →  web → portfolio  →  GLightbox gallery, project grid, skills timeline
"Create an admin dashboard"      →  web → dashboard  →  Chart.js charts, sidebar nav, data tables
"Build a snake game"             →  web → game       →  Canvas game loop, collision detection, high scores
"Write a Python web scraper"     →  script → python   →  main.py, requirements.txt, argparse CLI
"Build a React todo app"         →  web → react-app   →  React + Babel CDN, hooks, functional components
"Write a haiku about coding"     →  text → response   →  response.md + README.md, zipped
```

### 14 Specialized Categories

**Web (9 blueprints):**

| Category | Key Features | Extra CDN |
|---|---|---|
| Landing Page | Hero gradient, features grid, pricing tiers, FAQ accordion, testimonials | — |
| Dashboard | Sidebar nav, stat cards, bar/line/doughnut charts, sortable data table | Chart.js |
| Game | Canvas/DOM game area, game loop, controls, scoring, progressive difficulty | — |
| Portfolio | Project cards, skills section, experience timeline, contact form | GLightbox |
| E-Commerce | Product grid, cart drawer, category filters, checkout summary | — |
| Calculator/Tool | Input fields, result display, history, copy-to-clipboard | — |
| Blog/Article | TOC sidebar with scrollspy, reading time, syntax-highlighted code blocks | Prism.js |
| React App | Functional components, hooks, state management — all via CDN, no build step | React + Babel |
| Generic Web | Adapts to the specific request when no specialized category matches | — |

**Script (5 blueprints):**

| Category | Deliverables |
|---|---|
| Python Script | `main.py`, `requirements.txt`, `README.md` — argparse CLI, logging, type hints |
| Node Script | `index.js`, `package.json` (ESM), `README.md` — async/await, error handling |
| Automation | Dry-run mode, retry logic with backoff, `.env.example`, idempotent operations |
| Data Analysis | `analysis.py`, sample CSV, pandas + matplotlib, chart outputs |
| API Backend | Flask/FastAPI/Express server, endpoints, documentation |

**Text (1 blueprint):**
- `response.md` (formatted content) + `README.md` (context) → zipped

---

## How It Works

A job lands: *"Build a task management dashboard with charts"*

| Step | What Happens | Time |
|---|---|---|
| **Detect** | WebSocket pushes job notification, agent picks it up | ~1s |
| **Classify** | Weighted scoring: "dashboard" (5pts) + "chart" (3pts) → `web → dashboard` | instant |
| **Build Prompt** | 3-layer system: base rules + dashboard blueprint (Chart.js, stat cards, data tables) + design system | instant |
| **Generate** | LLM creates index.html, styles.css, app.js, README.md via tool calls | 30-90s |
| **Validate** | Code validator checks HTML structure, JS syntax, CDN calls, tag matching | instant |
| **Package** | Files zipped (compression level 9), uploaded to Seedstr storage | ~3s |
| **Submit** | Response submitted with zip attachment | ~1s |
| **Total** | | **~40s-2min** |

Your effort: **zero**. The agent handles everything.

---

## 3-Layer Prompt Architecture

ARCHITECT doesn't send a massive monolithic prompt. It composes a **targeted, token-efficient system prompt** from 3 layers — only injecting what's relevant:

```
┌────────────────────────────────────┐
│  Layer 1: Base Rules               │  ~700 tokens
│  - No placeholders, no TODO       │  Type-aware (web/script/text)
│  - No self-references in output   │  Always zip deliverables
│  - Production-ready code          │
├────────────────────────────────────┤
│  Layer 2: Category Template        │  ~400-600 tokens
│  - File structure                  │  Sections & layout blueprint
│  - Component patterns              │  Content guidance
│  - Extra CDN deps                  │
├────────────────────────────────────┤
│  Layer 3: Design System (web only) │  ~1500 tokens
│  - Tailwind config + colors        │  Typography scale
│  - Component library               │  Animations & transitions
│  - Responsive breakpoints          │  Dark mode support
└────────────────────────────────────┘
```

**Token budget:**
- Web project: ~2,800 tokens (system prompt)
- Script project: ~1,100 tokens
- Text response: ~875 tokens

Budget-aware quality scaling:
- **< $2**: Working and correct > complex and broken
- **$2–$10**: Balance functionality with polish
- **> $10**: Premium — rich interactions, exceptional design

---

## Design System

Every web project ships with a consistent, production-quality design system:

- **Tailwind CSS** with custom primary (blue) and accent (purple) color palettes
- **Alpine.js** for reactivity — modals, accordions, filters, cart interactions
- **Lucide Icons** — 40+ icons available, initialized automatically
- **Inter font** for clean, professional typography
- **Animations** — fade-in, slide-up, scale-in, hover micro-interactions
- **Glass-morphism navbar**, responsive breakpoints (sm/md/lg/xl), dark mode support
- **No build step** — everything runs from CDN, just open `index.html` in a browser

---

## Architecture

```
src/
├── agent/
│   ├── runner.ts           # Job discovery, processing, submission loop
│   └── promptBuilder.ts    # 3-layer system prompt composition
├── templates/
│   ├── index.ts            # Classifier + design system constants
│   └── categories/         # 14 specialized blueprints
│       ├── shared.ts       # Web enhancements (dark mode, scroll animations, toasts)
│       ├── landing-page.ts
│       ├── dashboard.ts
│       ├── game.ts
│       ├── portfolio.ts
│       ├── ecommerce.ts
│       ├── calculator-tool.ts
│       ├── blog-content.ts
│       ├── react-app.ts
│       ├── generic-web.ts
│       ├── python-script.ts
│       ├── node-script.ts
│       ├── automation.ts
│       └── data-analysis.ts
├── llm/
│   └── client.ts           # OpenRouter LLM + 4 tools + retry logic
├── tools/
│   ├── projectBuilder.ts   # File creation → zip packaging
│   ├── codeValidator.ts    # HTML/JS/CSS/Python validation
│   ├── webSearch.ts        # Tavily / DuckDuckGo fallback
│   └── calculator.ts       # Math expression evaluator
├── api/
│   └── client.ts           # Seedstr REST API (v1/v2)
├── cli/
│   └── commands/           # register, verify, profile, status, run, simulate
├── tui/
│   └── index.tsx           # Real-time terminal dashboard (React + Ink)
├── config/
│   └── index.ts            # .env + persistent store
└── types/
    └── index.ts            # TypeScript interfaces
```

### Data Flow

```
Job arrives (WebSocket / REST poll)
      ↓
Filter (budget, capacity, duplicates)
      ↓
classifyProject(prompt) → { type, category }
      ↓
buildSystemPrompt(job) → 3-layer composition
      ↓
LLM.generate(prompt, systemPrompt, tools=true)
  → create_file() × N
  → finalize_project() → .zip
      ↓
Validate → Upload → Submit → Earn
```

---

## Resilience

- **LLM retry**: Exponential backoff with jitter, up to 5 attempts for recoverable errors (JSON parse, tool arguments)
- **Upload retry**: 3 attempts with progressive delay
- **Upload failure**: Falls back to text-only response
- **Swarm jobs**: Accept-then-process flow with slot detection
- **WebSocket disconnect**: Automatic fallback to REST polling (3x slower)
- **Duplicate prevention**: Last 1000 processed job IDs persisted across restarts

---

## Quick Start

```bash
# Setup
npm install
cp .env.example .env
# Edit .env: add OPENROUTER_API_KEY, WALLET_ADDRESS

# Register and go live
npm run register
npm start
```

### Test Without Going Live

```bash
npm run simulate
# Try: "Build a snake game" or "Create a SaaS landing page"
# Full pipeline runs locally — classification, generation, zip — without submitting
```

---

## Configuration

```env
OPENROUTER_API_KEY=sk-or-v1-...       # Required
WALLET_ADDRESS=0x...                   # Required
OPENROUTER_MODEL=anthropic/claude-sonnet-4-6  # Any OpenRouter model
TEMPERATURE=0.2                        # Low = deterministic
MAX_TOKENS=16384                       # Room for large projects
MIN_BUDGET=0.50                        # Minimum job value
MAX_CONCURRENT_JOBS=1                  # Focus on quality
POLL_INTERVAL=1                        # Aggressive job detection
LLM_RETRY_MAX_ATTEMPTS=5              # Resilient generation
```

---

## Tech Stack

| Technology | Purpose |
|---|---|
| TypeScript (strict) | Full type safety across the codebase |
| Vercel AI SDK | LLM orchestration with multi-step tool calling |
| OpenRouter | Multi-model support (Claude, GPT-4, Gemini, Llama, Qwen) |
| Tailwind CSS + Alpine.js + Lucide | Design system (CDN, zero build step) |
| Archiver | Zip packaging (level 9 compression) |
| Pusher | Real-time WebSocket job notifications |
| React + Ink | Terminal dashboard UI |
| Zod | Runtime schema validation for tool parameters |
| Vitest | Test suite |

---

## Status

Operational. Autonomous. Ready to compete.
