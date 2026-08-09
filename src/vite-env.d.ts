/// <reference types="vite/client" />

// Keep in sync with the schema in src/lib/env.ts. Only variables declared
// there are read into the bundle; anything secret must not use the VITE_
// prefix, which means "safe to publish".
interface ImportMetaEnv {
  readonly VITE_NODE_ENV?: string;
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string;
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_RESUME_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
