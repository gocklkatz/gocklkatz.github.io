/**
 * Service catalog locked in Phase 0 / GOC-73; published on-site for GOC-75.
 * Do not invent alternate offerings or unsupported autonomy claims.
 */
export type Service = {
  name: string;
  whatWeDo: string;
  outcome: string;
};

export const servicesIntro = {
  kicker: "Services",
  heading: "Four concrete offerings",
  lead:
    "A small catalog with outcomes a buyer can check. AI assists the loop; humans keep accountability.",
  humanAi:
    "Where AI helps: discovery, implementation, verification, and operations. What stays human-owned: goals, judgment, acceptance, and accountability.",
} as const;

export const services: readonly Service[] = [
  {
    name: "AI-enabled delivery",
    whatWeDo:
      "Embed AI into an existing product team’s discovery → build → verify → ship loop (tooling, prompts/workflows, review gates, CI assist).",
    outcome:
      "Shorter iteration cycles with explicit human acceptance checkpoints; measurable quality gates retained.",
  },
  {
    name: "AI feature / product engineering",
    whatWeDo:
      "Design and ship product features that use LLMs or other models (APIs, tool use, retrieval, UX for uncertainty).",
    outcome:
      "A shipped vertical slice with safeguards, fallbacks, and observable behavior — not a slide deck.",
  },
  {
    name: "Modernization & automation",
    whatWeDo:
      "Replace brittle manual or legacy paths with tested automation and AI-assisted migration/refactors where they pay off.",
    outcome:
      "Fewer handoffs; scripts/services with tests; rollback-friendly deploys.",
  },
  {
    name: "Engineering quality systems",
    whatWeDo:
      "Tests, CI gates, deploy isolation, ops health checks, and “verified by running” discipline for AI-touched codebases.",
    outcome:
      "Independent projects that fail closed; green CI is necessary but not sufficient.",
  },
] as const;
