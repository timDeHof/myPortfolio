import { z } from "zod";

import tryParseEnv from "./try-parse-env";

const EnvSchema = z.object({
  VITE_NODE_ENV: z.string().default("development"),
  VITE_EMAILJS_SERVICE_ID: z.string(),
  VITE_EMAILJS_TEMPLATE_ID: z.string(),
  VITE_EMAILJS_PUBLIC_KEY: z.string(),
  VITE_GITHUB_PAT: z.string(),
});

export type EnvSchema = z.infer<typeof EnvSchema>;

// Create environment object with only string values
const envWithNodeEnv = {
  ...Object.fromEntries(
    Object.entries(import.meta.env).filter(([, value]) => typeof value === 'string')
  ),
  VITE_NODE_ENV: import.meta.env.VITE_NODE_ENV || import.meta.env.MODE || "development",
};

tryParseEnv(EnvSchema, envWithNodeEnv);
export const env = EnvSchema.parse(envWithNodeEnv);
