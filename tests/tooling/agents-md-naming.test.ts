import { readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = resolve(__dirname, "../..");
const KEBAB_CASE_FILE = /^[a-z0-9]+(?:-[a-z0-9]+)*(?:\.[a-z]+)+$/;
const agentsMd = readFileSync(resolve(ROOT, "AGENTS.md"), "utf8");
const filesSection = agentsMd.match(/### Files\n([\s\S]*?)\n### /)?.[1] ?? "";

function fileNames(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory()) {
      return entry.name === "__tests__" ? [] : fileNames(join(dir, entry.name));
    }
    return /\.tsx?$/.test(entry.name) ? [entry.name] : [];
  });
}

// AGENTS.md tells agents how to name new files, so it must describe the files
// that are already there
describe("aGENTS.md file naming", () => {
  it.each(["components", "hooks", "utils", "types", "lib"])("matches the kebab-case files in src/%s", (dir) => {
    expect(fileNames(resolve(ROOT, "src", dir)).filter(name => !KEBAB_CASE_FILE.test(name))).toEqual([]);
  });

  it("names component, hook, util and type files in kebab-case, with kebab-case examples", () => {
    for (const kind of ["Components", "Hooks", "Utils", "Types"]) {
      expect(filesSection).toMatch(new RegExp(`\\*\\*${kind}\\*\\*: kebab-case`));
    }
    const examples = [
      ...[...filesSection.matchAll(/`([a-z][\w.-]*\.tsx?)`/gi)].map(match => match[1]),
      ...[...agentsMd.matchAll(/Component file: ([\w.-]+\.tsx?)/g)].map(match => match[1]),
    ];
    expect(examples.filter(name => !KEBAB_CASE_FILE.test(name))).toEqual([]);
  });
});
