/**
 * AESD case study on the LLM-NPC track through the mock vertical slice (GOC-82).
 * Honest status only — no playable/live DeepSeek claims.
 */
export const caseStudy = {
  path: "/aesd-case-study",
  title: "AESD case study — LLM-NPC mock vertical slice",
  description:
    "How Gocklkatz Inc practiced AI Enhanced Software Development on the LLM-NPC demonstration track through a mock vertical slice — with humans owning goals, judgment, and acceptance.",
  kicker: "Proof / process",
  heading: "AESD on LLM-NPC",
  lead:
    "A short case study of how Gocklkatz Inc practiced AI Enhanced Software Development while building the demonstration product through its first mock vertical slice — without claiming a public playable launch.",
  method: {
    title: "Method before scenery",
    body: "Human-owned goals came first. Discovery and implementation were AI-assisted. Judgment, acceptance, and accountability stayed with people. The first playable loop was ordered as a brief before any Three.js work started.",
  },
  loop: {
    title: "The AESD delivery loop",
    intro:
      "Each step names who owns it. AI accelerates; humans decide what ships.",
    steps: [
      {
        name: "Goals",
        owner: "Human",
        body: "Lock the client order and first-playable brief: what must work, what stays mock, what is out of scope.",
      },
      {
        name: "Discovery",
        owner: "AI",
        body: "Explore options, spikes, and constraints against the locked brief — without rewriting the goals.",
      },
      {
        name: "Judgment",
        owner: "Human",
        body: "Choose the path, reject overreach, and keep the slice honest about mock vs live model use.",
      },
      {
        name: "Implementation",
        owner: "AI",
        body: "Build against the brief with human review on every merge — Cursor agents, PRs, and Gate checks.",
      },
      {
        name: "Verification",
        owner: "AI + Gate + human",
        body: "Automated Gate CI, independent test-plan verify, then human confirmation before merge.",
      },
      {
        name: "Acceptance",
        owner: "Human",
        body: "Decide the slice is done enough for this milestone. Authorship and merge identity: Hermito Katt.",
      },
      {
        name: "Ops feedback",
        owner: "AI",
        body: "Capture interaction logs and failure modes so the next loop starts from running evidence, not guesswork.",
      },
    ],
  },
  delivery: {
    title: "What shipped through the mock slice",
    intro:
      "Concrete steps on the demonstration track — still engineering work in progress, not a public game.",
    steps: [
      {
        title: "Order the brief",
        body: "First-playable brief locked: Gatekeeper + Archivist, phrase objective, mock-first LLM bridge, interaction logging, and costly live-model testing deferred to off-peak.",
      },
      {
        title: "Spike",
        body: "Three.js lobby, one NPC, mock LLM bridge, deterministic model_unavailable fallback, and a CI Gate skeleton in the engineering repo.",
      },
      {
        title: "Vertical slice",
        body: "Two NPCs with refuse → clearance → access phrase, interaction logging, and a public README without Linear tracking laundry lists.",
      },
      {
        title: "Gate + human acceptance",
        body: "Automated Gate on PRs, independent verification against the test plan, then human merge under Hermito Katt.",
      },
    ],
  },
  tools: {
    title: "Tools and process",
    items: [
      "Linear for goals and issue tracking (internal — not pasted onto the public site)",
      "GitHub PRs with Gate CI on the engineering repo",
      "Cursor cloud agents for AI-assisted implementation under human review",
      "Mock-first LLM bridge so the slice can run without live model spend",
    ],
  },
  status: {
    title: "Status now",
    badge: "Mock slice",
    detail: "Not a public playable launch",
    body: "A mock vertical slice exists in the engineering repository. There is no public playable build on this company site, DeepSeek is not live here, and the showcase teaser stays Work in progress / Not playable yet. Vercel product deploy and live model wiring are later work — not claimed on this page.",
  },
  engineering: {
    label: "Engineering source (WIP)",
    url: "https://github.com/gocklkatz/llm-npc",
    display: "github.com/gocklkatz/llm-npc",
    note: "Demonstration-track source of truth for the mock slice. Portfolio demos remain on github.com/gocklkatz/portfolio.",
  },
  homepageLink: {
    label: "Read the AESD case study",
    blurb:
      "How the LLM-NPC mock vertical slice was ordered, spiked, gated, and accepted — with explicit human vs AI ownership.",
  },
} as const;
