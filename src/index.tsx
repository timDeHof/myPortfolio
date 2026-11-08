import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Force TypeScript refresh
import App, { createAppRouter } from "./App";
import { hydrateFromPrerender } from "./lib/query-client";
import "./styles/index.css";

if (typeof window !== "undefined") {
  hydrateFromPrerender();
  createRoot(document.getElementById("app") as HTMLElement).render(
    <StrictMode>
      <App router={createAppRouter()} />
    </StrictMode>,
  );
}

// Called by vite-prerender-plugin at build time, never in the browser
export async function prerender({ url }: { url: string }) {
  const { renderPage } = await import("./prerender");
  return renderPage(url);
}
