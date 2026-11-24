// Bundle-size budget gate. Fails when the total gzipped JS in build/assets/
// grows past a committed ceiling, so a regression is caught in CI, not in prod.
//
// Zero dependencies (node:zlib), so it adds nothing to the lockfile CI installs
// with --frozen-lockfile. Node 20 compatible: readdirSync, no fs.globSync.
//
// Metric: sum of gzipped build/assets/*.js. The service worker precaches every
// chunk (vite.config.ts globPatterns), so total JS is the real download cost,
// not just the entry. sw.js and workbox-*.js live at the build root, not under
// assets/, so they are excluded as infra. The blog.lazy chunk carries the blog
// submodule's posts.json, so a content bump moves this number — when that is
// intentional, raise LIMIT_KB.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import process from "node:process";
import { gzipSync } from "node:zlib";

const ASSETS_DIR = "build/assets";
// Measured 324.1 kB at the time this was committed, plus ~10% headroom.
const LIMIT_KB = 360;

let files;
try {
  files = readdirSync(ASSETS_DIR).filter(name => name.endsWith(".js"));
}
catch {
  console.error(`size-gate: cannot read ${ASSETS_DIR}/. Run \`pnpm build\` first.`);
  process.exit(1);
}

// A wrong path would otherwise measure 0 bytes and pass forever.
if (files.length === 0) {
  console.error(`size-gate: no .js files in ${ASSETS_DIR}/. Did the build output path change?`);
  process.exit(1);
}

let totalGzip = 0;
for (const name of files)
  totalGzip += gzipSync(readFileSync(join(ASSETS_DIR, name))).length;

// Divide by 1000 (kB, not KiB) so this agrees with Vite's own gzip table.
const totalKb = totalGzip / 1000;
const over = totalKb > LIMIT_KB;
console.error(
  `size-gate: ${totalKb.toFixed(1)} kB gzipped JS across ${files.length} chunks `
  + `(ceiling ${LIMIT_KB} kB) [${over ? "OVER" : "OK"}]`,
);

if (over) {
  console.error("size-gate: bundle grew past the ceiling. If intentional, raise LIMIT_KB in scripts/check-bundle-size.mjs.");
  process.exit(1);
}
