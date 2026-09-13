import assert from "node:assert/strict";
import test from "node:test";
import { normalizeQuestionForModel, selectEvidenceKeys } from "../lib/evidence-router";

test("broad identity questions add diverse recent evidence while assessments stay compact", () => {
  assert.deepEqual(selectEvidenceKeys("Who is Eirik?"), ["capabilitySynthesis"]);
  assert.deepEqual(selectEvidenceKeys("What's his greatest weakness?"), []);
  assert.deepEqual(selectEvidenceKeys("Would you hire him?"), ["roleFit"]);
});

test("specific employer and ecosystem questions retrieve only relevant evidence", () => {
  assert.deepEqual(selectEvidenceKeys("What did he do at KPMG?"), ["kpmg"]);
  assert.deepEqual(selectEvidenceKeys("What has he done in Bittensor?"), ["bittensor"]);
  assert.deepEqual(selectEvidenceKeys("Can he code?"), ["technical"]);
  assert.deepEqual(selectEvidenceKeys("Can he actually code?"), ["capabilitySynthesis", "technical"]);
});

test("first- and second-person background questions are understood as questions about Eirik", () => {
  assert.deepEqual(selectEvidenceKeys("Tell me about my background."), ["capabilitySynthesis", "career"]);
  assert.deepEqual(selectEvidenceKeys("What is your professional experience?"), ["capabilitySynthesis", "career"]);
  assert.deepEqual(selectEvidenceKeys("Tell me about his experience"), ["capabilitySynthesis", "career"]);
  assert.deepEqual(selectEvidenceKeys("Walk me through my work history."), ["career"]);
  assert.equal(normalizeQuestionForModel("Tell me about my background."), "Tell me about Eirik's background.");
  assert.equal(normalizeQuestionForModel("What is your professional experience?"), "What is Eirik's professional experience?");
  assert.equal(normalizeQuestionForModel("What did he do at KPMG?"), "What did he do at KPMG?");
});

test("build questions retrieve complete systems rather than bare project labels", () => {
  assert.deepEqual(selectEvidenceKeys("What has he built?"), ["capabilitySynthesis"]);
  assert.deepEqual(selectEvidenceKeys("What has Eirik actually made?"), ["capabilitySynthesis"]);
  assert.deepEqual(selectEvidenceKeys("Has he built real products?"), ["capabilitySynthesis"]);
  assert.deepEqual(selectEvidenceKeys("What systems has he created?"), ["capabilitySynthesis"]);
  assert.deepEqual(selectEvidenceKeys("Can he actually build?"), ["capabilitySynthesis"]);
  assert.deepEqual(selectEvidenceKeys("What's the most technically complex thing he's worked on?"), ["capabilitySynthesis"]);
});

test("concept queries retrieve the right canonical work without requiring project names", () => {
  assert.deepEqual(selectEvidenceKeys("Has he built anything in AI?"), ["capabilitySynthesis"]);
  assert.deepEqual(selectEvidenceKeys("Has he built financial products?"), ["capabilitySynthesis", "financialSystems"]);
  assert.deepEqual(selectEvidenceKeys("Can he build data systems?"), ["capabilitySynthesis"]);
  assert.deepEqual(selectEvidenceKeys("Has he done lending?"), ["bittensor", "oneClickLabs"]);
  assert.deepEqual(selectEvidenceKeys("Has he worked with ML?"), ["capabilitySynthesis"]);
  assert.deepEqual(selectEvidenceKeys("Has he done infrastructure?"), ["capabilitySynthesis"]);
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
  assert.deepEqual(selectEvidenceKeys("What has he built outside crypto?"), ["capabilitySynthesis"]);
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
  assert.deepEqual(selectEvidenceKeys("Tell me his best example of messy data"), ["capabilitySynthesis"]);
  assert.deepEqual(
    selectEvidenceKeys("Are you even able to give any specific examples...", ["Tell me his best example of messy data"]),
    ["capabilitySynthesis"],
  );
  assert.deepEqual(
    selectEvidenceKeys("So is that just one old job, or has he shown it elsewhere?", ["Tell me his best example of messy data"]),
    ["capabilitySynthesis"],
  );
});

test("role questions retrieve a compact calibration plus function-specific evidence", () => {
  assert.deepEqual(selectEvidenceKeys("Would he be a good product manager?"), ["roleFit", "capabilitySynthesis"]);
  assert.deepEqual(selectEvidenceKeys("Would he be good in a sales role?"), ["roleFit", "commercial", "gartner"]);
  assert.deepEqual(selectEvidenceKeys("What about operations management?"), ["roleFit", "capabilitySynthesis"]);
  assert.deepEqual(selectEvidenceKeys("Would Finance Manager suit him?"), ["roleFit", "kpmg", "education"]);
  assert.deepEqual(
    selectEvidenceKeys("Would he be a good fit for an Analyst, Capital Allocation role covering portfolio performance, investor reporting and SQL?"),
    ["roleFit", "financialSystems", "kpmg"],
  );
  assert.deepEqual(selectEvidenceKeys("Is Eirik a fit for a Finance Analyst role working with FP&A, SQL and the data team?"), ["roleFit", "capabilitySynthesis"]);
  assert.deepEqual(
    selectEvidenceKeys("We built AI-native energy transaction infrastructure. Is Eirik good for our Finance Analyst role working with FP&A, SQL, reporting and the data team?"),
    ["roleFit", "capabilitySynthesis"],
  );
  assert.deepEqual(selectEvidenceKeys("Is strategy & ops a good fit?"), ["roleFit", "capabilitySynthesis"]);
  assert.deepEqual(selectEvidenceKeys("What about a software engineering role?"), ["roleFit", "technical"]);
});
