/**
 * Public company-site copy. Phase 0 locked 2026-09-16 (GOC-73).
 * Claims that name a number live in `demos.ts` and come from
 * github.com/gocklkatz/portfolio — do not invent new metrics here.
 */
export const site = {
  company: "Gocklkatz Inc",
  tagline: "AI Enhanced Software Development",
  title: "Gocklkatz Inc — AI Enhanced Software Development",
  description:
    "Gocklkatz Inc provides AI Enhanced Software Development: AI-assisted delivery that produces complete, independently deployable, verified builds — with humans retaining goals, judgment, acceptance, and accountability.",
  eyebrow: "Company site",
  headline: "Gocklkatz Inc",
  displayTagline: "AI Enhanced Software Development",
  intro:
    "AI systems assist discovery, implementation, verification, and operations across the delivery loop, while humans retain goals, judgment, acceptance, and accountability. Gocklkatz Inc uses AI to accelerate exploration, produce and refine working software, strengthen tests and reviews, and improve operational feedback — without treating model output as unsupervised product.",
  claim:
    "The public claim is not “AI replaces engineers”; it is that AI-assisted delivery produces complete, independently deployable, verified builds faster and with clearer quality gates.",
  author: "Hermito Katt",
  authorLabel: "Public author",
  contactEmail: "gocklkatz@gmail.com",
  contactMailto: "mailto:gocklkatz@gmail.com",
  sourceUrl: "https://github.com/gocklkatz/portfolio",
  sourceLabel: "github.com/gocklkatz/portfolio",
  license: "Apache-2.0",
  copyrightYear: 2026,
} as const;

export const audience = {
  primary:
    "Product companies and product engineering teams that need to ship AI-enabled delivery or AI product features without losing accountability — typically small-to-mid product orgs, platform/product squads, or founders with an existing codebase.",
  notTargeting:
    "Generic “digital transformation,” staffing-only body shops, or claims of fully autonomous software orgs.",
} as const;

export const proof = {
  heading: "How the work is built",
  intro:
    "Demos and client work share the same delivery discipline: complete builds, independent deploys, and verification by running — not by trusting a green build alone.",
  principles: [
    {
      title: "Complete builds",
      body: "Each project owns its dependencies, tests, and quality gate. One project’s breakage is not allowed to take another down.",
    },
    {
      title: "Independent deploys",
      body: "Every application has its own deploy target, so it can be built, shared, and rolled back on its own.",
    },
    {
      title: "Verified by running",
      body: "A green CI job is necessary but not sufficient. The work is checked by opening the deployed application and using it.",
    },
  ],
} as const;

export const teaser = {
  kicker: "Demonstration product",
  title: "LLM NPC Showcase",
  status: "Work in progress",
  statusDetail: "Not playable yet",
  concept:
    "A small Three.js scene with LLM-driven NPCs — constrained dialogue, visible safeguards, and the same AI-enhanced build discipline applied to the demo itself.",
  stack: "Three.js + constrained LLM dialogue",
  honesty:
    "No playable build is public yet. This section is a concept teaser only — not a live game, not a launch date, and not a feature claim beyond what will ship in the first vertical slice.",
} as const;

export const demosSection = {
  kicker: "Proof",
  heading: "Existing demos",
  intro:
    "Four live applications on Vercel. They are proof of complete, gated delivery — not the primary company offer. Each opens its own host; nothing here is nested on github.io.",
} as const;
