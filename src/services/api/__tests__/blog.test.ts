import { describe, expect, it } from "vitest";

import { extractText, getReadingTime } from "../blog";

describe("extractText", () => {
  it("returns empty string for null/undefined", () => {
    expect(extractText(null)).toBe("");
    expect(extractText(undefined)).toBe("");
  });

  it("returns the string itself when given a string", () => {
    expect(extractText("hello world")).toBe("hello world");
  });

  it("returns empty string for non-string, non-array, non-object", () => {
    expect(extractText(42)).toBe("");
    expect(extractText(true)).toBe("");
  });

  it("joins array of strings with spaces", () => {
    expect(extractText(["hello", "world"])).toBe("hello world");
  });

  it("extracts text from array of MDX AST nodes", () => {
    const nodes = [
      { children: "hello" },
      { children: "world" },
    ];
    expect(extractText(nodes)).toBe("hello world");
  });

  it("recursively extracts text from nested children", () => {
    const nodes = [
      {
        children: [
          { children: "deep" },
          { children: "text" },
        ],
      },
    ];
    expect(extractText(nodes)).toBe("deep text");
  });

  it("handles deeply nested AST structures", () => {
    const nodes = [
      {
        children: [
          {
            children: [
              { children: "level3" },
            ],
          },
        ],
      },
    ];
    expect(extractText(nodes)).toBe("level3");
  });

  it("handles mixed arrays of strings and objects", () => {
    const nodes = [
      "plain text",
      { children: "nested text" },
    ];
    expect(extractText(nodes)).toBe("plain text nested text");
  });

  it("handles empty arrays", () => {
    expect(extractText([])).toBe("");
  });

  it("handles objects without children property", () => {
    expect(extractText({ type: "text" })).toBe("");
  });
});

describe("getReadingTime", () => {
  it("returns 1 for null/undefined", () => {
    expect(getReadingTime(null)).toBe(1);
    expect(getReadingTime(undefined)).toBe(1);
  });

  it("returns 1 for short text", () => {
    expect(getReadingTime("hello")).toBe(1);
  });

  it("returns 1 for text under 200 words", () => {
    const text = Array.from({ length: 199 }).fill("word").join(" ");
    expect(getReadingTime(text)).toBe(1);
  });

  it("returns 1 for exactly 200 words", () => {
    const text = Array.from({ length: 200 }).fill("word").join(" ");
    expect(getReadingTime(text)).toBe(1);
  });

  it("returns 2 for 201 words", () => {
    const text = Array.from({ length: 201 }).fill("word").join(" ");
    expect(getReadingTime(text)).toBe(2);
  });

  it("returns minimum 1 even for empty string", () => {
    expect(getReadingTime("")).toBe(1);
  });

  it("calculates reading time from MDX AST array", () => {
    const body = [
      { children: Array.from({ length: 201 }).fill("word").join(" ") },
    ];
    expect(getReadingTime(body)).toBe(2);
  });

  it("handles array with mixed strings and objects", () => {
    const body = [
      Array.from({ length: 100 }).fill("word").join(" "),
      { children: Array.from({ length: 101 }).fill("word").join(" ") },
    ];
    expect(getReadingTime(body)).toBe(2);
  });
});
