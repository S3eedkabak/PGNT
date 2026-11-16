import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
const courses = JSON.parse(
  readFileSync(new URL("../src/courses.json", import.meta.url)),
);
test("all 195 original training rows remain traceable exactly once", () => {
  const rows = courses.flatMap((c) => c.sourceRows).sort((a, b) => a - b);
  assert.deepEqual(
    rows,
    Array.from({ length: 195 }, (_, i) => i + 1),
  );
  for (const c of courses)
    assert.equal(
      c.sourcePage,
      c.sourceRows[0] <= 43
        ? 1
        : c.sourceRows[0] <= 87
          ? 2
          : c.sourceRows[0] <= 131
            ? 3
            : c.sourceRows[0] <= 175
              ? 4
              : 5,
    );
});
test("featured course titles and durations match the supplied source", () => {
  for (const [id, title, duration] of [
    ["193", "Work Permit Receiver (Aramco Pre-Requisite)", "4 Days"],
    ["23", "CWQAP - Electrical", "3 Days"],
    ["53", "Forklift Operator", "2 Days"],
    ["49", "First Aid, CPR With AED", "4-6 Hours"],
    ["96", "IOSH Managing Safely (MS)", "4 Days"],
    [
      "142",
      "NEBOSH International General Certificate In Occupational Health & Safety",
      "13 Days",
    ],
  ]) {
    const c = courses.find((c) => c.id === id);
    assert.ok(c);
    assert.equal(c.title, title);
    assert.equal(c.duration, duration);
  }
});
test("catalogue has unique IDs and no duplicate title/duration pairs", () => {
  assert.equal(new Set(courses.map((c) => c.id)).size, courses.length);
  assert.equal(
    new Set(courses.map((c) => `${c.title}|${c.duration}`)).size,
    courses.length,
  );
});
test("durations contain valid source units or explicitly require confirmation", () => {
  assert.deepEqual(
    courses.filter((c) => c.duration === "Confirm with team").map((c) => c.id),
    ["136", "140", "141"],
  );
  for (const c of courses) {
    assert.match(
      c.duration,
      /^(\d+(?:-\d+)? (?:Days?|Hours?)|Confirm with team)$/,
    );
    assert.ok(c.title.length >= 3);
    assert.ok(!c.title.includes("|"));
    assert.ok(!/ - Copy$/i.test(c.title));
  }
});
test("original documents and all UI image assets are bundled locally", () => {
  for (const name of [
    "training-list.pdf",
    "pngit-profile-2026.pdf",
    "cropped-pngit-logo.webp",
    "engineer-oil-refiner.webp",
    "050524_65.webp",
    "050524_128.webp",
    "tvtc.png",
    "aramco.png",
    "hrsd.png",
    "tga.png",
    "saso.png",
  ])
    assert.ok(
      existsSync(new URL("../public/assets/" + name, import.meta.url)),
      name,
    );
});
function luminance(hex) {
  const rgb = hex
    .match(/\w\w/g)
    .map((c) => parseInt(c, 16) / 255)
    .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
}
function contrast(a, b) {
  const v = [luminance(a), luminance(b)].sort((a, b) => b - a);
  return (v[0] + 0.05) / (v[1] + 0.05);
}
test("core button and body text colours meet AA contrast", () => {
  for (const [fg, bg] of [
    ["ffffff", "11796f"],
    ["10271f", "f06d23"],
    ["5b685f", "e9f0e8"],
    ["65716c", "ffffff"],
  ])
    assert.ok(contrast(fg, bg) >= 4.5, `${fg} on ${bg}`);
});
import { matchesDuration, matchesSearch } from "../src/lib/catalog.ts";
test("multi-day filters never include hour-based courses or unknown durations", () => {
  for (const value of ["4 Hours", "4-6 Hours", "1 Day", "Confirm with team"])
    assert.equal(matchesDuration(value, "2 days or more"), false);
  for (const value of ["2 Days", "13 Days"])
    assert.equal(matchesDuration(value, "2 days or more"), true);
  assert.equal(matchesDuration("4-6 Hours", "1 day or less"), true);
  assert.equal(matchesDuration("13 Days", "1 day or less"), false);
});
test("common industry abbreviations and punctuation find the right course", () => {
  assert.equal(
    matchesSearch(
      courses.find((c) => c.id === "193"),
      "WPR",
    ),
    true,
  );
  assert.equal(
    matchesSearch(
      courses.find((c) => c.id === "89"),
      "H2S",
    ),
    true,
  );
  assert.equal(
    matchesSearch(
      courses.find((c) => c.id === "49"),
      "first-aid",
    ),
    true,
  );
  assert.equal(
    matchesSearch(
      courses.find((c) => c.id === "193"),
      "not-a-course",
    ),
    false,
  );
});
