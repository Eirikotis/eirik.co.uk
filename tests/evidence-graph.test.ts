import assert from "node:assert/strict";
import test from "node:test";
import { getCapabilityEvidence, getEvidenceAtomIds } from "../lib/evidence-graph";

test("messy-data questions use recent examples before earlier corroboration", () => {
  assert.deepEqual(getEvidenceAtomIds("Tell me his best example of messy data"), [
    "e2-finance",
    "opportunity-engine",
    "bittensor-autoresearch",
    "one-click-labs",
  ]);
  assert.deepEqual(
    getEvidenceAtomIds(
      "So is that just one old job, or has he shown it elsewhere?",
      ["Tell me his best example of messy data"],
    ),
    ["opportunity-engine", "bittensor-autoresearch", "kpmg"],
  );
});

test("broad build questions diversify evidence across contexts", () => {
  const ids = getEvidenceAtomIds("What has Eirik built?");
  assert.deepEqual(ids, ["e2-finance", "opportunity-engine", "bittensor-credit", "dusd-markets"]);
  assert.equal(new Set(ids).size, ids.length);
});

test("non-crypto build questions lead with relevant recent systems", () => {
  assert.deepEqual(getEvidenceAtomIds("What has he built outside crypto?"), [
    "opportunity-engine",
    "eirik-ai-interface",
  ]);
});

test("rendered capability context controls synthesis and Bittensor naming", () => {
  const context = getCapabilityEvidence("Can he build data systems?");
  assert.match(context, /evidence, not a list to recite/i);
  assert.match(context, /items are ordered by intended relevance and recency/i);
  assert.match(context, /Do not widen them with plausible but unstated/i);
  assert.match(context, /professional work in the Bittensor ecosystem/i);
  assert.match(context, /Do not lead with the internal venture name VOID/i);
});
