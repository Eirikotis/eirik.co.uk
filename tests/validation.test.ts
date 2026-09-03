import assert from "node:assert/strict";
import test from "node:test";
import { MAX_INPUT_LENGTH, validateMessage } from "../lib/validation";

test("job descriptions up to 6,000 characters are accepted", () => {
  assert.equal(MAX_INPUT_LENGTH, 6_000);
  assert.equal(validateMessage("x".repeat(6_000)).ok, true);
  const tooLong = validateMessage("x".repeat(6_001));
  assert.equal(tooLong.ok, false);
  if (!tooLong.ok) assert.match(tooLong.error, /6,000/);
});
