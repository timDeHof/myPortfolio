import { z } from "zod";

import tryParseEnv from "./try-parse-env";

const EnvSchema = z.object({
  VITE_NODE_ENV: z.string().default("development"),
  VITE_WEB3FORMS_ACCESS_KEY: z.string().optional(),
  VITE_API_BASE_URL: z.string().url().default("https://api.timdehof.dev/api"),
  VITE_RESUME_URL: z.string().url().optional(),
});

type EnvSchema = z.infer<typeof EnvSchema>;

/**
 * Each variable is read by name, deliberately.
 *
 * This previously spread `Object.entries(import.meta.env)`, which makes Vite
 * inline *every* VITE_* variable present at build time into the bundle —
 * including ones absent from the schema above. A local .env carrying, say,
 * VITE_GITHUB_PAT therefore shipped that token in the published JavaScript,
 * even though no code ever referenced it. Naming each key keeps the bundle to
 * exactly what the app declares.
 *
 * Anything genuinely secret must not be a VITE_ variable at all: the prefix
 * means "safe to publish".
 */
const rawEnv: Record<string, string | undefined> = {
  VITE_NODE_ENV: import.meta.env.VITE_NODE_ENV || import.meta.env.MODE || "development",
  VITE_WEB3FORMS_ACCESS_KEY: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  VITE_RESUME_URL: import.meta.env.VITE_RESUME_URL,
};

// Drop unset and empty values so schema defaults and .optional() apply, rather
// than an empty string failing .url() validation.
const definedEnv = Object.fromEntries(
  Object.entries(rawEnv).filter(([, value]) => typeof value === "string" && value !== ""),
);

tryParseEnv(EnvSchema, definedEnv);
export const env = EnvSchema.parse(definedEnv);
