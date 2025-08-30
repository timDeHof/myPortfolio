import { z } from "zod";

import tryParseEnv from "./try-parse-env";

const EnvSchema = z.object({
  NODE_ENV: z.string(),
  VITE_EMAILJS_SERVICE_ID: z.string(),
  VITE_EMAILJS_TEMPLATE_ID: z.string(),
  VITE_EMAILJS_PUBLIC_KEY: z.string(),
  VITE_GITHUB_PAT: z.string(),
});

export type EnvSchema = z.infer<typeof EnvSchema>;
tryParseEnv(EnvSchema);
export const env = EnvSchema.parse(import.meta.env);
