import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const INDEX = path.join(ROOT, "index.html");

const REQUIRED_STRINGS = [
  "Gocklkatz Inc",
  "AI Enhanced Software Development",
  ">Gocklkatz Inc</h1>",
  "gocklkatz@gmail.com",
  "mailto:gocklkatz@gmail.com",
  ">Contact</a>",
];

const RETIRED_STRINGS = [
  "id=\"services\"",
  "id=\"proof\"",
  "id=\"showcase\"",
  "id=\"demos\"",
  "aesd-case-study",
  "gocklkatz-ameisenwerkstatt.vercel.app",
  "gocklkatz-bienenstock.vercel.app",
  "gocklkatz-simplified.vercel.app",
  "gocklkatz-arbeitsmarkt.vercel.app",
];

if (!existsSync(INDEX)) {
  throw new Error("index.html is missing.");
}

const html = await readFile(INDEX, "utf8");

for (const needle of REQUIRED_STRINGS) {
  if (!html.includes(needle)) {
    throw new Error(`Homepage is missing required copy: ${needle}`);
  }
}

for (const needle of RETIRED_STRINGS) {
  if (html.includes(needle)) {
    throw new Error(`Homepage still contains retired copy: ${needle}`);
  }
}

const navMatch = html.match(/<nav class="nav"[^>]*>([\s\S]*?)<\/nav>/);
if (!navMatch) {
  throw new Error("Homepage is missing the primary nav.");
}
const navLinks = [...navMatch[1].matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/g)].map((m) =>
  m[1].replace(/\s+/g, " ").trim(),
);
if (navLinks.length !== 1 || navLinks[0] !== "Contact") {
  throw new Error(`Primary nav must contain only Contact, found: ${navLinks.join(", ")}`);
}
if (!navMatch[1].includes("mailto:gocklkatz@gmail.com")) {
  throw new Error("Contact nav link must use mailto:gocklkatz@gmail.com");
}

if (!html.includes("<main")) {
  throw new Error("Homepage is missing a <main> landmark.");
}

if (!existsSync(path.join(ROOT, "404.html"))) {
  throw new Error("404.html is missing.");
}
if (!existsSync(path.join(ROOT, "styles.css"))) {
  throw new Error("styles.css is missing.");
}
if (!existsSync(path.join(ROOT, "scene.js"))) {
  throw new Error("scene.js is missing.");
}

console.log("verify: contact-only homepage, mailto, and landmarks OK");
