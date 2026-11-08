import { readdirSync, readFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { describe, expect, it } from "vitest";

const SRC = resolve(__dirname, "../src");
const LINK_CLASSES = "font-semibold text-teal-700 hover:underline dark:text-teal-400";

function sourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      return sourceFiles(path);
    }
    return /\.tsx?$/.test(entry.name) ? [path] : [];
  });
}

// The text link style lives in one constant, so a color change is one edit
describe("text link class", () => {
  it("is written out in exactly one source file", () => {
    const files = sourceFiles(SRC)
      .filter(file => readFileSync(file, "utf8").includes(LINK_CLASSES))
      .map(file => relative(SRC, file));

    expect(files).toEqual(["lib/link-class.ts"]);
  });
});
