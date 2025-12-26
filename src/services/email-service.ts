import { env } from "../lib/env";

// Web3Forms configuration
const WEB3FORMS_ACCESS_KEY = env.VITE_WEB3FORMS_ACCESS_KEY || "YOUR_WEB3FORMS_ACCESS_KEY";

export interface EmailData {
  from_name: string;
  from_email: string;
  message: string;
  to_name?: string;
}

export async function sendEmail(data: EmailData): Promise<void> {
  if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY === "YOUR_WEB3FORMS_ACCESS_KEY") {
    throw new Error("Web3Forms access key not configured");
  }

  try {
    const formData = new FormData();
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("name", data.from_name);
    formData.append("email", data.from_email);
    formData.append("message", data.message);
    formData.append("subject", `New Contact Form Message from ${data.from_name}`);
    formData.append("from_name", "Portfolio Contact Form");
    formData.append("redirect", "false");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to send email");
    }

    if (!result.success) {
      throw new Error(result.message || "Failed to send email");
    }
  }
  catch (error) {
    console.error("Email Error:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to send email. Please try again later.");
  }
};

// Test function to verify email configuration
export async function testEmailConfiguration(): Promise<boolean> {
  try {
    const testData: EmailData = {
      from_name: "Test User",
      from_email: "test@example.com",
      message: "This is a test message to verify email configuration.",
    };

    await sendEmail(testData);
    return true;
  }
  catch (error) {
    console.error("Email configuration test failed:", error);
    return false;
  }
};
