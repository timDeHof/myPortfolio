import type { ZodObject, ZodRawShape } from "zod";

import { ZodError } from "zod";

/**
 * `envSource` is required rather than defaulting to `import.meta.env`.
 *
 * A default of `import.meta.env` is a wholesale reference, and Vite replaces
 * those with an object literal containing *every* VITE_* variable defined at
 * build time — so the default alone shipped unrelated values (a local
 * VITE_GITHUB_PAT among them) into the bundle, even though every caller
 * already passed an explicit, narrowed object.
 */
export default function tryParseEnv<T extends ZodRawShape, S extends ZodObject<T>>(
  EnvSchema: S,
  envSource: Record<string, string | undefined>,
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
