import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ContactForm } from "../../../src/components/contact/contact-form";
import { sendEmail } from "../../../src/services/email-service";

vi.mock("../../../src/services/email-service", () => ({ sendEmail: vi.fn() }));

const sendEmailMock = vi.mocked(sendEmail);

function fill({ name = "Ada Lovelace", email = "ada@example.com", message = "I'd like to talk about a role." } = {}) {
  fireEvent.change(screen.getByLabelText(/^Name/), { target: { value: name } });
  fireEvent.change(screen.getByLabelText(/^Email/), { target: { value: email } });
  fireEvent.change(screen.getByLabelText(/^Message/), { target: { value: message } });
}

// fireEvent.submit skips the browser's `required` checks, so the form's own validation runs
function submit() {
  fireEvent.submit(screen.getByRole("button", { name: /Send Message/ }).closest("form")!);
}

describe("contact form", () => {
  beforeEach(() => {
    sendEmailMock.mockReset();
  });

  it("shows the validation errors and doesn't send an invalid form", () => {
    render(<ContactForm />);
    fill({ name: " ", email: "ada@example", message: "Hi" });
    submit();

    expect(screen.getByText("Name is required")).toBeInTheDocument();
    expect(screen.getByText("Please enter a valid email address")).toBeInTheDocument();
    expect(screen.getByText("Message must be at least 10 characters long")).toBeInTheDocument();
    expect(screen.getByLabelText(/^Email/)).toHaveAttribute("aria-invalid", "true");
    expect(sendEmailMock).not.toHaveBeenCalled();
  });

  it("clears a field's error when that field is edited", () => {
    render(<ContactForm />);
    fill({ name: " " });
    submit();
    fireEvent.change(screen.getByLabelText(/^Name/), { target: { value: "Ada" } });

    expect(screen.queryByText("Name is required")).not.toBeInTheDocument();
  });

  it("sends the form and thanks the visitor", async () => {
    sendEmailMock.mockResolvedValue();
    render(<ContactForm />);
    fill();
    submit();

    expect(await screen.findByRole("status")).toHaveTextContent("Thank you for your message!");
    expect(sendEmailMock).toHaveBeenCalledWith({
      from_name: "Ada Lovelace",
      from_email: "ada@example.com",
      message: "I'd like to talk about a role.",
    });
    expect(screen.getByLabelText(/^Name/)).toHaveValue("");
    expect(screen.getByLabelText(/^Message/)).toHaveValue("");
  });

  it("disables the form while it sends", async () => {
    let resolve!: () => void;
    sendEmailMock.mockReturnValue(new Promise<void>((r) => {
      resolve = r;
    }));
    render(<ContactForm />);
    fill();
    submit();

    expect(screen.getByRole("button", { name: /Sending/ })).toBeDisabled();
    expect(screen.getByLabelText(/^Name/)).toBeDisabled();
    resolve();
    await waitFor(() => expect(screen.getByRole("button", { name: /Send Message/ })).toBeEnabled());
  });

  it("tells the visitor the form isn't configured when the API says so", async () => {
    sendEmailMock.mockRejectedValue(new Error("Email access key not configured"));
    render(<ContactForm />);
    fill();
    submit();

    expect(await screen.findByRole("status")).toHaveTextContent("Contact form is not configured yet.");
  });

  it("shows a retry message and keeps the input when sending fails", async () => {
    sendEmailMock.mockRejectedValue(new Error("Failed to send email"));
    render(<ContactForm />);
    fill();
    submit();

    expect(await screen.findByRole("status")).toHaveTextContent("Sorry, there was an error sending your message.");
    expect(screen.getByLabelText(/^Message/)).toHaveValue("I'd like to talk about a role.");
  });
});
