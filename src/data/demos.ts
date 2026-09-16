/**
 * Live demo apps hosted on Vercel. Descriptions and test claims are taken from
 * the engineering source of truth: https://github.com/gocklkatz/portfolio
 * (`src/lib/demos.ts` as of 2026-09-16). Do not invent new metrics here.
 */
export type Demo = {
  slug: string;
  name: string;
  description: string;
  url: string;
  claim: string;
};

export const demos: readonly Demo[] = [
  {
    slug: "ameisenwerkstatt",
    name: "Ameisenwerkstatt",
    description: "Ant colony optimization on a fixed TSP, with a live 3D workspace.",
    url: "https://gocklkatz-ameisenwerkstatt.vercel.app",
    claim: "62 tests over its simulation, HTTP façade and tool allowlist, all passing",
  },
  {
    slug: "bienenstock",
    name: "Bienenstock",
    description: "Bee colony simulation — hive and foraging, rendered in 3D.",
    url: "https://gocklkatz-bienenstock.vercel.app",
    claim: "13 tests over the colony model, its interactions and the canvas sizing, all passing",
  },
  {
    slug: "simplified",
    name: "Simplified",
    description: "Learning and practising simplified Chinese characters.",
    url: "https://gocklkatz-simplified.vercel.app",
    claim: "29 tests over the radicals data, practice sessions and health shape, all passing",
  },
  {
    slug: "arbeitsmarkt",
    name: "Arbeitsmarkt",
    description: "A relevance-ranked job-listing pipeline, demonstrated on synthetic data.",
    url: "https://gocklkatz-arbeitsmarkt.vercel.app",
    claim: "23 tests over the synthetic dataset generator, the ranking pipeline and the operations model, all passing",
  },
] as const;
