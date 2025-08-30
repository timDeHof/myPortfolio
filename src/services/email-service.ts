import emailjs from "@emailjs/browser";

import { env } from "../lib/env";

// EmailJS configuration - reading from environment variables
const EMAILJS_SERVICE_ID = env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = env.VITE_EMAILJS_PUBLIC_KEY;

// Validate that all required environment variables are present
if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
  console.error("EmailJS configuration error: Missing required environment variables");
  console.error("Required variables: VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY");
}

// Initialize EmailJS
if (EMAILJS_PUBLIC_KEY) {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

export type EmailData = {
  from_name: string;
  from_email: string;
  message: string;
  to_name?: string;
};

export async function sendEmail(data: EmailData): Promise<void> {
  // Check if configuration is valid before attempting to send
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    throw new Error("EmailJS is not properly configured. Please check your environment variables.");
  }

  try {
    // Send the main email to you
    const templateParams = {
      from_name: data.from_name,
      from_email: data.from_email,
      message: data.message,
      to_name: "Tim DeHof", // Your name for the email template
      reply_to: data.from_email,
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
    );

    if (response.status !== 200) {
      throw new Error("Failed to send email");
    }

    // Send auto-reply to the user if auto-reply template is configured
    if (EMAILJS_TEMPLATE_ID) {
      await sendAutoReply(data);
    }
  }
  catch (error) {
    console.error("EmailJS Error:", error);
    throw new Error("Failed to send email. Please try again later.");
  }
};

async function sendAutoReply(data: EmailData): Promise<void> {
  try {
    const autoReplyParams = {
      to_name: data.from_name,
      to_email: data.from_email,
      from_name: "Tim DeHof",
      message: data.message, // Changed from 'original_message' to 'message'
      original_message: data.message, // Keep both for compatibility
      reply_to: "tim@timdehof.dev",
    };

    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID!,
      autoReplyParams,
    );
  }
  catch (error) {
    console.error("Auto-reply email failed:", error);
    // Don't throw error for auto-reply failure - main email was successful
  }
};

// Test function to verify EmailJS configuration
export async function testEmailConfiguration(): Promise<boolean> {
  try {
    const testData: EmailData = {
      from_name: "Test User",
      from_email: "test@example.com",
      message: "This is a test message to verify EmailJS configuration.",
    };

    await sendEmail(testData);
    return true;
  }
  catch (error) {
    console.error("EmailJS configuration test failed:", error);
    return false;
  }
};
