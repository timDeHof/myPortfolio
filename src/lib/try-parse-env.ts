import type { ZodObject, ZodRawShape } from "zod";

import { ZodError } from "zod";

export default function tryParseEnv<T extends ZodRawShape, S extends ZodObject<T>>(
  EnvSchema: S,
  envSource: Record<string, string | undefined> = import.meta.env as Record<string, string | undefined>,
): S["_output"] {
  try {
    const parsedEnv = EnvSchema.parse(envSource);
    return parsedEnv;
  }
  catch (error) {
    if (error instanceof ZodError) {
      const missingVars = error.issues
        .map(issue => `• ${issue.path.join(".")} (${issue.message})`);

      throw new Error(
        `Environment validation failed:\n${missingVars.join("\n")}\n\n`
        + `Required variables:\n${Object.keys(EnvSchema.shape).join("\n")}`,
      );
    }

    throw new Error(`Environment configuration error: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}
