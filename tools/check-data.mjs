/**
 * Data-integrity check for the listing model.
 *
 * Guards the things that would silently break the gallery: a photo count drift,
 * a duplicate id (which would make the lightbox jump), a hero id that doesn't
 * resolve, or a src with no file behind it (a 404 in the grid).
 *
 * Run: node tools/check-data.mjs
 */
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { readFileSync } from "node:fs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = readFileSync(join(root, "src/data/listing.ts"), "utf8");

// The data file is TS; rather than add a build step just to test it, pull the
// photo ids straight out of the GROUPS literal and re-derive the invariants.
const groupsBlock = src.slice(
  src.indexOf("const GROUPS"),
  src.indexOf("/** Flat, ordered list"),
);
const ids = [...groupsBlock.matchAll(/"([0-9a-f-]{36})"/g)].map((m) => m[1]);
const categories = [...groupsBlock.matchAll(/^\s{2}"?([A-Z][^":]*?)"?:\s*\[/gm)].map(
  (m) => m[1],
);

assert.equal(ids.length, 43, `expected 43 tour photos, got ${ids.length}`);
assert.equal(
  categories.length,
  9,
  `expected 9 categories, got ${categories.length}`,
);
assert.equal(
  new Set(ids).size,
  ids.length,
  "duplicate photo id — the lightbox would page inconsistently",
);

// Every referenced photo must exist on disk.
const missing = ids.filter(
  (id) => !existsSync(join(root, "public/assets/images", `${id}.jpeg`)),
);
assert.deepEqual(missing, [], `missing image files: ${missing.join(", ")}`);

// Hero ids must resolve into the tour set, or the mosaic renders blanks.
const heroBlock = src.slice(
  src.indexOf("export const heroPhotoIds"),
  src.indexOf("export const heroPhotos"),
);
const heroIds = [...heroBlock.matchAll(/"([0-9a-f-]{36})"/g)].map((m) => m[1]);
assert.equal(heroIds.length, 5, `expected 5 hero photos, got ${heroIds.length}`);
const unresolved = heroIds.filter((id) => !ids.includes(id));
assert.deepEqual(unresolved, [], `hero id not in tour: ${unresolved.join(", ")}`);

console.log(
  `ok — ${ids.length} photos, ${categories.length} categories, ${heroIds.length} hero, all files present`,
);
