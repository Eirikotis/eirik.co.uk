import assert from "node:assert/strict";
import test from "node:test";
import { selectEvidenceKeys } from "../lib/evidence-router";

test("broad identity and assessment questions use the compact profile only", () => {
  assert.deepEqual(selectEvidenceKeys("Who is Eirik?"), []);
  assert.deepEqual(selectEvidenceKeys("What's his greatest weakness?"), []);
  assert.deepEqual(selectEvidenceKeys("Would you hire him?"), []);
});

test("specific employer and ecosystem questions retrieve only relevant evidence", () => {
  assert.deepEqual(selectEvidenceKeys("What did he do at KPMG?"), ["kpmg"]);
  assert.deepEqual(selectEvidenceKeys("What has he done in Bittensor?"), ["bittensor"]);
  assert.deepEqual(selectEvidenceKeys("Can he code?"), ["technical"]);
});

test("AI infrastructure partnerships questions combine the three strongest sources", () => {
  assert.deepEqual(
    selectEvidenceKeys("Would he fit a partnerships role at an AI infrastructure company?"),
    ["bittensor", "commercial", "gartner"],
  );
});

test("short topical and generic follow-ups preserve routing context", () => {
  assert.deepEqual(selectEvidenceKeys("What about AI?", ["What did he do at KPMG?"]), ["bittensor"]);
  assert.deepEqual(selectEvidenceKeys("Tell me more", ["What has he done in Bittensor?"]), ["bittensor"]);
});
