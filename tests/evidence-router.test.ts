import assert from "node:assert/strict";
import test from "node:test";
import { selectEvidenceKeys } from "../lib/evidence-router";

test("broad identity and assessment questions use the compact profile only", () => {
  assert.deepEqual(selectEvidenceKeys("Who is Eirik?"), []);
  assert.deepEqual(selectEvidenceKeys("What's his greatest weakness?"), []);
  assert.deepEqual(selectEvidenceKeys("Would you hire him?"), ["roleFit"]);
});

test("specific employer and ecosystem questions retrieve only relevant evidence", () => {
  assert.deepEqual(selectEvidenceKeys("What did he do at KPMG?"), ["kpmg"]);
  assert.deepEqual(selectEvidenceKeys("What has he done in Bittensor?"), ["bittensor"]);
  assert.deepEqual(selectEvidenceKeys("Can he code?"), ["technical"]);
  assert.deepEqual(selectEvidenceKeys("Can he actually code?"), ["technical", "workSystems"]);
});

test("build questions retrieve complete systems rather than bare project labels", () => {
  assert.deepEqual(selectEvidenceKeys("What has he built?"), ["workSystems"]);
  assert.deepEqual(selectEvidenceKeys("What has Eirik actually made?"), ["workSystems"]);
  assert.deepEqual(selectEvidenceKeys("Has he built real products?"), ["workSystems"]);
  assert.deepEqual(selectEvidenceKeys("What systems has he created?"), ["workSystems"]);
  assert.deepEqual(selectEvidenceKeys("Can he actually build?"), ["workSystems"]);
  assert.deepEqual(selectEvidenceKeys("What's the most technically complex thing he's worked on?"), ["workSystems"]);
});

test("concept queries retrieve the right canonical work without requiring project names", () => {
  assert.deepEqual(selectEvidenceKeys("Has he built anything in AI?"), ["bittensor"]);
  assert.deepEqual(selectEvidenceKeys("Has he built financial products?"), ["financialSystems"]);
  assert.deepEqual(selectEvidenceKeys("Can he build data systems?"), ["workSystems", "technical"]);
  assert.deepEqual(selectEvidenceKeys("Has he done lending?"), ["bittensor", "oneClickLabs"]);
  assert.deepEqual(selectEvidenceKeys("Has he worked with ML?"), ["bittensor"]);
  assert.deepEqual(selectEvidenceKeys("Has he done infrastructure?"), ["workSystems"]);
});

test("canonical follow-ups and attribution questions retrieve detailed evidence", () => {
  assert.deepEqual(selectEvidenceKeys("What's VOID?"), ["bittensor"]);
  assert.deepEqual(selectEvidenceKeys("What's AutoResearch?"), ["bittensor"]);
  assert.deepEqual(selectEvidenceKeys("How does the credit protocol work?"), ["bittensor"]);
  assert.deepEqual(selectEvidenceKeys("What was the quantitative research system trying to do?"), ["bittensor"]);
  assert.deepEqual(selectEvidenceKeys("What has he done in compute and inference?"), ["bittensor"]);
  assert.deepEqual(selectEvidenceKeys("What is DUSD.fun?"), ["dusd"]);
  assert.deepEqual(selectEvidenceKeys("Is DUSD a meme coin?"), ["dusd", "claimBoundaries"]);
  assert.deepEqual(selectEvidenceKeys("Did he work for Bittensor?"), ["bittensor", "claimBoundaries"]);
  assert.deepEqual(selectEvidenceKeys("Was his Bittensor work paid?"), ["bittensor", "claimBoundaries"]);
  assert.deepEqual(selectEvidenceKeys("What has he built outside crypto?"), ["technical", "kpmg"]);
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

test("role questions retrieve a compact calibration plus function-specific evidence", () => {
  assert.deepEqual(selectEvidenceKeys("Would he be a good product manager?"), ["roleFit", "technical", "bittensor"]);
  assert.deepEqual(selectEvidenceKeys("Would he be good in a sales role?"), ["roleFit", "commercial", "gartner"]);
  assert.deepEqual(selectEvidenceKeys("What about operations management?"), ["roleFit", "commercial", "kpmg"]);
  assert.deepEqual(selectEvidenceKeys("Would Finance Manager suit him?"), ["roleFit", "kpmg", "education"]);
  assert.deepEqual(selectEvidenceKeys("Is Eirik a fit for a Finance Analyst role working with FP&A, SQL and the data team?"), ["roleFit", "kpmg", "technical"]);
  assert.deepEqual(
    selectEvidenceKeys("We built AI-native energy transaction infrastructure. Is Eirik good for our Finance Analyst role working with FP&A, SQL, reporting and the data team?"),
    ["roleFit", "kpmg", "technical"],
  );
  assert.deepEqual(selectEvidenceKeys("Is strategy & ops a good fit?"), ["roleFit", "commercial", "kpmg"]);
  assert.deepEqual(selectEvidenceKeys("What about a software engineering role?"), ["roleFit", "technical"]);
});
