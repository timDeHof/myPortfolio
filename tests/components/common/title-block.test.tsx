import { render, screen, within } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";

import { TitleBlock } from "../../../src/components/common/title-block";

describe("title block", () => {
  it("lays out two columns, with wide cells across both and borders between cells", () => {
    render(
      <TitleBlock
        label="Drawing"
        cells={[
          { label: "Part", value: "Tim DeHof", wide: true },
          { label: "Function", value: "Engineer" },
          { label: "Location", value: "Remote" },
          { label: "Rev A", value: ["Mechanical engineer", "2015–2022"] },
          { label: "Rev", value: "B" },
        ]}
      />,
    );
    const dl = screen.getByLabelText("Drawing");
    const cells = [...dl.children] as HTMLElement[];

    expect(dl).toHaveClass("grid-cols-2");
    expect(cells.map(cell => cell.querySelector("dt")?.textContent)).toEqual(["Part", "Function", "Location", "Rev A", "Rev"]);
    expect(cells[0]).toHaveClass("col-span-2");
    // Left-column half cells get a right border
    expect(cells[1]).toHaveClass("border-r");
    expect(cells[2]).not.toHaveClass("border-r");
    expect(cells[3]).toHaveClass("border-r");
    // The last row has no bottom border
    expect(cells[2]).toHaveClass("border-b");
    expect(cells[3]).not.toHaveClass("border-b");
    expect(cells[4]).not.toHaveClass("border-b");
    // An array value renders one line per item
    expect(within(cells[3]).getByText("2015–2022")).toHaveClass("block");
  });

  it("stacks cells in one column with a border under all but the last", () => {
    render(<TitleBlock label="Project" columns={1} cells={[{ label: "Part", value: "A" }, { label: "Function", value: "B" }, { label: "Material", value: "C" }]} />);
    const dl = screen.getByLabelText("Project");
    const cells = [...dl.children] as HTMLElement[];

    expect(dl).not.toHaveClass("grid-cols-2");
    expect(cells.map(cell => cell.classList.contains("border-b"))).toEqual([true, true, false]);
    expect(cells.some(cell => cell.classList.contains("border-r"))).toBe(false);
  });
});
