import { env } from "../lib/env";

export interface EmailData {
  from_name: string;
  from_email: string;
  message: string;
  subject?: string;
}

export async function sendEmail(data: EmailData): Promise<void> {
  const payload = {
    name: data.from_name,
    email: data.from_email,
    subject: data.subject || `New Contact Form Message from ${data.from_name}`,
    message: data.message,
  };

  try {
    const response = await fetch(`${env.VITE_API_BASE_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Failed to send email");
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