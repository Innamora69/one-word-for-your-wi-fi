// One Word for Your Wi-Fi — entry program (program/v1, Node 22).
// Writes a single word describing the entrant's Wi-Fi to /output/entry.txt.
//
// The word: "Gaslighting"
// Why: the universal home Wi-Fi experience — full signal bars, nothing
// loads, and the router insists everything is fine. It is funny at once,
// true to how home Wi-Fi actually behaves, a fresh angle (not "slow" or
// "buffering"), and it works as a network name, which the winning word
// becomes. One word, 11 characters, inside the gate of 1-20 UTF-8 chars.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const WORD = "Gaslighting";
const OUT = "/output/entry.txt";

// Gate guard: one word, 1-20 UTF-8 characters, not only whitespace.
if (!/^[\p{L}\p{N}]+$/u.test(WORD)) {
  throw new Error("entry must be a single word");
}
if ([...WORD].length < 1 || [...WORD].length > 20) {
  throw new Error("entry must be 1-20 characters");
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUT, WORD, "utf8");

// Verify the file holds exactly the word: no trailing newline, no extra
// bytes. The gate counts every character, so byte-identical matters.
const written = readFileSync(OUT, "utf8");
if (written !== WORD) {
  throw new Error("entry.txt does not match the word byte for byte");
}
console.log(`wrote ${WORD.length} chars to ${OUT}`);
