// @vitest-environment node
import { visualizer } from "rollup-plugin-visualizer";
import { describe, expect, it, vi } from "vitest";

import viteConfig from "../../vite.config";

vi.mock("rollup-plugin-visualizer", () => ({
  visualizer: vi.fn(() => ({ name: "visualizer" })),
}));

describe("vite config", () => {
  // Every build, including CI and deploy, would try to open a browser tab
  it("writes the bundle report without opening it", () => {
    if (typeof viteConfig === "function") {
      viteConfig({ mode: "production", command: "build" });
    }

    expect(visualizer).toHaveBeenCalledWith(expect.objectContaining({ emitFile: true, filename: "stats.html" }));
    expect(visualizer).not.toHaveBeenCalledWith(expect.objectContaining({ open: true }));
  });
});
