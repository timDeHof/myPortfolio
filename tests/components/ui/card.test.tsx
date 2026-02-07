import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import React from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../src/components/ui/card";

describe("Card Components", () => {
  it("renders all card sub-components correctly", () => {
    render(
      <Card className="custom-card">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <button>Action</button>
        </CardFooter>
      </Card>
    );

    expect(screen.getByText("Card Title")).toBeInTheDocument();
    expect(screen.getByText("Card Description")).toBeInTheDocument();
    expect(screen.getByText("Card Content")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /action/i })).toBeInTheDocument();
    
    const card = screen.getByText("Card Title").closest(".custom-card");
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass("rounded-xl border bg-card text-card-foreground shadow");
  });
});
