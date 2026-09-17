# Gocklkatz Inc — company website

Public front door for **Gocklkatz Inc — AI Enhanced Software Development**.

Live site: <https://gocklkatz.github.io/>

This repository is **only** the company site. Demo applications stay on Vercel; their engineering source of truth is [`gocklkatz/portfolio`](https://github.com/gocklkatz/portfolio). Do not nest that monorepo here.

## What the site presents

1. **Company positioning** — AI Enhanced Software Development; public author Hermito Katt
2. **Services / outcomes** — four concrete offerings, who it’s for, and the human/AI responsibility split
3. **Proof / process** — complete builds, independent deploys, verified by running; AESD case study on the LLM-NPC mock vertical slice (`/aesd-case-study`)
4. **Demonstration product teaser** — LLM NPC Showcase (Three.js); status *Work in progress / Not playable yet*
5. **Existing demos (secondary proof)** — live Vercel hosts retained:
   - [Ameisenwerkstatt](https://gocklkatz-ameisenwerkstatt.vercel.app)
   - [Bienenstock](https://gocklkatz-bienenstock.vercel.app)
   - [Simplified](https://gocklkatz-simplified.vercel.app)
   - [Arbeitsmarkt](https://gocklkatz-arbeitsmarkt.vercel.app)
6. **Contact** — email only: [gocklkatz@gmail.com](mailto:gocklkatz@gmail.com)

## Stack

[Astro](https://astro.build) static site (no server runtime). The production build is plain HTML, CSS, and a favicon, which GitHub Pages can serve.

## Preview locally

Requires Node.js 22+.

```bash
npm ci
npm run dev          # http://127.0.0.1:4321
```

Production-shaped preview:

```bash
npm run build
npm run preview      # http://127.0.0.1:4321  (serves dist/)
npm run verify       # asserts company-first IA, services, teaser honesty, demo links, and live demo HTTP 200s
```

`npm run check` runs `astro check` (TypeScript / Astro diagnostics).

## Publish to GitHub Pages

GitHub Actions builds `dist/` on every push to `main` and deploys it with `actions/deploy-pages`.

**Required one-time repo setting** (cannot be flipped from this PR):

1. GitHub → `gocklkatz/gocklkatz.github.io` → **Settings** → **Pages**
2. **Build and deployment → Source**: change from “Deploy from a branch” (`main` / `/`) to **GitHub Actions**

Until that switch is made, merging this stack will not replace the live site: the current Pages config serves files from the `main` branch root, and the built homepage lives in the Actions artifact, not as a root `index.html` in git.

Workflows:

| File | When | What |
| --- | --- | --- |
| `.github/workflows/ci.yml` | pull requests and `main` | install, `astro check`, build, verify demo URLs |
| `.github/workflows/deploy.yml` | push to `main` | build and deploy Pages |

## License

Apache-2.0 — see [`LICENSE`](./LICENSE).
