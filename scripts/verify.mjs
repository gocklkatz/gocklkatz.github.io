import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const INDEX = path.join(ROOT, "dist", "index.html");

const REQUIRED_STRINGS = [
  "Gocklkatz Inc",
  "AI Enhanced Software Development",
  "gocklkatz@gmail.com",
  "mailto:gocklkatz@gmail.com",
  "Four demo applications, each one deployed and running on its own.",
  "https://gocklkatz-ameisenwerkstatt.vercel.app",
  "https://gocklkatz-bienenstock.vercel.app",
  "https://gocklkatz-simplified.vercel.app",
  "https://gocklkatz-arbeitsmarkt.vercel.app",
  "https://github.com/gocklkatz/portfolio",
  "Open the demo",
];

const FORBIDDEN_STRINGS = [
  "Request A Demo",
  "hermitokatt",
  ">Art<",
  ">Games<",
  ">Coding<",
  ">vLog<",
];

const DEMO_URLS = [
  "https://gocklkatz-ameisenwerkstatt.vercel.app",
  "https://gocklkatz-bienenstock.vercel.app",
  "https://gocklkatz-simplified.vercel.app",
  "https://gocklkatz-arbeitsmarkt.vercel.app",
];

async function assertStatus(url) {
  const response = await fetch(url, { redirect: "follow" });
  if (response.status !== 200) {
    throw new Error(`${url} returned ${response.status}, expected 200`);
  }
}

if (!existsSync(INDEX)) {
  throw new Error("dist/index.html is missing. Run `npm run build` first.");
}

const html = await readFile(INDEX, "utf8");

for (const needle of REQUIRED_STRINGS) {
  if (!html.includes(needle)) {
    throw new Error(`Built homepage is missing required copy: ${needle}`);
  }
}

for (const needle of FORBIDDEN_STRINGS) {
  if (html.includes(needle)) {
    throw new Error(`Built homepage still contains retired copy: ${needle}`);
  }
}

if (!html.includes("<main")) {
  throw new Error("Built homepage is missing a <main> landmark.");
}

const results = await Promise.all(DEMO_URLS.map(assertStatus));
void results;

console.log("verify: homepage copy, landmarks, and four live demo URLs (HTTP 200) OK");
