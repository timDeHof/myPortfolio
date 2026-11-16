import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const WORKFLOWS = resolve(__dirname, "../../.github/workflows");
const ci = readFileSync(resolve(WORKFLOWS, "ci.yml"), "utf8");
const deploy = readFileSync(resolve(WORKFLOWS, "deploy.yml"), "utf8");

// Single-line `run:` commands, in order
function commands(workflow: string): string[] {
  return [...workflow.matchAll(/^\s+run: (?!\|)(.+)$/gm)].map(match => match[1].trim());
}

describe("ci workflow", () => {
  // The coverage thresholds in vitest.config.ts apply only when coverage runs
  it("runs the unit tests with coverage", () => {
    expect(commands(ci)).toContain("pnpm coverage");
    expect(commands(ci)).not.toContain("pnpm exec vitest run");
  });
});

// deploy.yml says it repeats CI's gates rather than trusting an earlier run
describe("deploy workflow", () => {
  it.each(commands(ci))("runs CI's `%s` before deploying", (command) => {
    const deployCommands = commands(deploy);
    const deployStep = deploy.indexOf("- name: Deploy\n");

    expect(deployCommands).toContain(command);
    expect(deploy.indexOf(`run: ${command}`)).toBeLessThan(deployStep);
  });
});
