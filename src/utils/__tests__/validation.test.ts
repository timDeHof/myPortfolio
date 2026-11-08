import { describe, expect, it } from "vitest";

import { validateContactForm } from "../validation";

const valid = { name: "Ada Lovelace", email: "ada@example.com", message: "I'd like to talk about a role." };

describe("validateContactForm", () => {
  it("returns no errors for a valid form", () => {
    expect(validateContactForm(valid)).toEqual({});
  });

  it("requires every field, ignoring whitespace", () => {
    expect(validateContactForm({ name: "  ", email: " ", message: "\n" })).toEqual({
      name: "Name is required",
      email: "Email is required",
      message: "Message is required",
    });
  });

  it.each(["ada", "ada@", "ada@example", "@example.com", "ada@.com", "ada lovelace@example.com"])("rejects the email %j", (email) => {
    expect(validateContactForm({ ...valid, email }).email).toBe("Please enter a valid email address");
  });

  it.each(["a@b.co", "ada.lovelace+jobs@mail.example.com"])("accepts the email %j", (email) => {
    expect(validateContactForm({ ...valid, email })).toEqual({});
  });

  it("requires a message of at least 10 characters after trimming", () => {
    expect(validateContactForm({ ...valid, message: "123456789" }).message).toBe("Message must be at least 10 characters long");
    expect(validateContactForm({ ...valid, message: "  123456789  " }).message).toBe("Message must be at least 10 characters long");
    expect(validateContactForm({ ...valid, message: "1234567890" })).toEqual({});
  });
});
