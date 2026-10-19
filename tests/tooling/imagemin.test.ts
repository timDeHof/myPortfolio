// @vitest-environment node
import type { Plugin, PluginOption } from "vite";

import { cpSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

import viteConfig from "../../vite.config";

const PUBLIC_DIR = resolve(__dirname, "../../public");

function imageminPlugin(): Plugin {
  const config = typeof viteConfig === "function" ? viteConfig({ mode: "production", command: "build" }) : viteConfig;
  const plugins = ([config.plugins] as unknown[]).flat(Infinity) as PluginOption[];
  return plugins.find((plugin): plugin is Plugin => !!plugin && typeof plugin === "object" && "name" in plugin && plugin.name === "vite:imagemin")!;
}

let outDir: string | undefined;

afterEach(() => {
  if (outDir) {
    rmSync(outDir, { recursive: true, force: true });
  }
});

// The plugin logs "imagemin error:<file>" and ships the file unoptimized when
// the optimizer for that type can't run
describe("image optimization in the build", () => {
  it("optimizes every public image it selects without an error", async () => {
    outDir = mkdtempSync(join(tmpdir(), "imagemin-"));
    cpSync(PUBLIC_DIR, outDir, { recursive: true });
    const logger = { info: vi.fn(), warn: vi.fn(), error: vi.fn() };
    const plugin = imageminPlugin();

    (plugin.configResolved as (config: unknown) => void)({ build: { outDir }, publicDir: PUBLIC_DIR, logger });
    await (plugin.closeBundle as () => Promise<void>)();

    expect(logger.error.mock.calls.flat()).toEqual([]);
  }, 60_000);
});
