import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const corpusDirectory = join(root, "content", "eirik");
const expectedDocuments = [
  "bittensor.md",
  "career.md",
  "claim-boundaries.md",
  "commercial.md",
  "core.md",
  "dusd.md",
  "education.md",
  "kpmg.md",
  "one-click-labs.md",
  "technical.md",
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const actualDocuments = (await readdir(corpusDirectory))
  .filter((name) => name.endsWith(".md"))
  .sort();
assert(
  JSON.stringify(actualDocuments) === JSON.stringify(expectedDocuments),
  "The professional corpus document set has changed unexpectedly.",
);

const corpus = (
  await Promise.all(
    actualDocuments.map((name) => readFile(join(corpusDirectory, name), "utf8")),
  )
).join("\n");
assert(!/first[ -]class/i.test(corpus), "Prohibited First-Class wording remains.");
assert(
  /Upper Second-Class Honours \(2:1\)[\s\S]{0,40}69%/i.test(corpus),
  "Education result is missing.",
);
assert(
  /independent and venture-based work/i.test(corpus),
  "Bittensor relationship boundary is missing.",
);
assert(/September 2024.*July 2026/is.test(corpus), "KPMG dates are missing.");
assert(/did not found the underlying token/i.test(corpus), "DUSD ownership boundary is missing.");

const knowledgeLoader = await readFile(join(root, "lib", "knowledge.ts"), "utf8");
assert(knowledgeLoader.includes('import "server-only"'), "The corpus loader must remain server-only.");

const schema = await readFile(join(root, "db", "schema.sql"), "utf8");
assert(/CREATE TABLE IF NOT EXISTS conversations/i.test(schema), "Conversation table is missing.");
assert(/CREATE TABLE IF NOT EXISTS messages/i.test(schema), "Message table is missing.");
assert(/CREATE TABLE IF NOT EXISTS rate_limits/i.test(schema), "Rate-limit table is missing.");

const nextConfig = await readFile(join(root, "next.config.ts"), "utf8");
for (const route of [
  "/work/bittensor",
  "/work/void",
  "/work/bittensor-autoresearch",
  "/work/dusd",
  "/work/one-click-labs",
  "/work/kpmg",
  "/experience",
  "/about",
]) {
  assert(nextConfig.includes(`source: "${route}"`), `Missing legacy redirect for ${route}.`);
}

const envExample = await readFile(join(root, ".env.example"), "utf8");
for (const variable of [
  "OPENROUTER_API_KEY",
  "DATABASE_URL",
  "ADMIN_PASSWORD",
  "RATE_LIMIT_SALT",
]) {
  assert(envExample.includes(variable), `Missing ${variable} from .env.example.`);
}

console.log(
  `Validated ${actualDocuments.length} server-only corpus documents, persistence schema, environment contract and legacy routes.`,
);
