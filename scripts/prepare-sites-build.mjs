import { copyFile, cp, mkdir, rm } from "node:fs/promises";
import { basename, resolve } from "node:path";

const root = resolve(".");
const nextOutput = resolve(root, ".next");
const dist = resolve(root, "dist");

if (basename(dist) !== "dist" || !dist.startsWith(`${root}\\`) && !dist.startsWith(`${root}/`)) {
  throw new Error("Refusing to prepare a build outside the project.");
}

await rm(dist, { recursive: true, force: true });
await mkdir(resolve(dist, "client"), { recursive: true });
await mkdir(resolve(dist, "server"), { recursive: true });
await mkdir(resolve(dist, "client", "_next"), { recursive: true });
await cp(resolve(nextOutput, "static"), resolve(dist, "client", "_next", "static"), { recursive: true });
await copyFile(resolve(nextOutput, "server", "app", "index.html"), resolve(dist, "client", "index.html"));
await cp(resolve(root, "public"), resolve(dist, "client"), { recursive: true });
await cp(resolve(root, "worker", "sites-proxy.js"), resolve(dist, "server", "index.js"));
