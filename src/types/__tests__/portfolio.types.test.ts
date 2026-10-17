import { describe, expect, it } from "vitest";

import type { PortfolioData } from "../portfolio";

// Checked by `pnpm type-check`: service work moved to Jokma (P1), so
// portfolio.json no longer carries a services list
describe("portfolio data", () => {
  it("has no services list", () => {
    // @ts-expect-error services was removed from portfolio.json
    const services: PortfolioData["services"] = [];
    expect(services).toEqual([]);
  });
});
