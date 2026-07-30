import { cp, mkdir, rm } from "node:fs/promises";
import { basename, resolve } from "node:path";

const root = resolve(".");
const output = resolve(root, "out");
const dist = resolve(root, "dist");

if (basename(dist) !== "dist" || !dist.startsWith(`${root}\\`) && !dist.startsWith(`${root}/`)) {
  throw new Error("Refusing to prepare a build outside the project.");
}

await rm(dist, { recursive: true, force: true });
await mkdir(resolve(dist, "client"), { recursive: true });
await mkdir(resolve(dist, "server"), { recursive: true });
await cp(output, resolve(dist, "client"), { recursive: true });
await cp(resolve(root, "worker", "sites-static.js"), resolve(dist, "server", "index.js"));
