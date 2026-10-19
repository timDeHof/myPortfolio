// @vitest-environment node
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = resolve(__dirname, "../..");
const scripts: Record<string, string> = JSON.parse(readFileSync(resolve(ROOT, "package.json"), "utf8")).scripts;

// `pnpm test` reads vitest.config.ts. Any script that passes its own config must
// be able to load it, or the script fails before running a test.
const vitestConfigs = [
  "vitest.config.ts",
  ...Object.values(scripts).flatMap(script => [...script.matchAll(/vitest\b.*?--config\s+(\S+)/g)].map(match => match[1])),
];

describe("package scripts", () => {
  it.each(vitestConfigs)("can load the Vitest config %s", async (file) => {
    const config = (await import(resolve(ROOT, file))).default;

    expect(typeof config).toBe("object");
  });
});
