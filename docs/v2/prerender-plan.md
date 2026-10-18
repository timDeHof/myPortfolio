# Prerender plan (D5)

Goal: every public route ships real HTML at build time, with its own `<title>`, description, and Open Graph tags. Crawlers and link previews then see content without running JavaScript (fixes F5).

Repo state read on 2026-10-17, branch `docs/v2-drafts`. Doc links and versions were checked the same day.

---

## Current state

| Item | Where | Effect on prerendering |
|---|---|---|
| Client-only mount with `createRoot(#app)` | `src/index.tsx:8` | Needs a server-render path |
| Router built once at module load, browser history | `src/App.tsx:14` | Needs a per-path router with memory history at build time |
| Routes: `/`, `/about`, `/projects`, `/projects/$slug`, `/blog`, `/services`, `/contact` | `src/routes/` | `$slug` values must be listed. `projectsIndex` already has them, see `scripts/sitemap.ts:34`. |
| `.lazy` routes, `autoCodeSplitting`, `Suspense` fallbacks | `src/routes/*.lazy.tsx`, `vite.config.ts:33` | The renderer must wait for lazy chunks and loaders, or the HTML will contain `PageLoader` spinners |
| `/projects` loader calls `fetchAllProjects()` | `src/routes/projects.tsx:30`, `src/hooks/use-projects.ts:39` | Runs at build time, so network failures fall back silently |
| `window.location` read during render | `src/components/common/seo-head.tsx:21,37`, `src/hooks/use-seo.ts:31` | Throws under Node. Build URLs from `SITE_URL` and the router location instead. |
| `react-helmet-async` for head tags | `src/App.tsx:4`, `seo-head.tsx` | Head tags must be extracted per page into the HTML |
| PWA with `vite-plugin-pwa` and Workbox `generateSW` | `vite.config.ts:47` | See R1 |
| Cloudflare Workers static assets, `not_found_handling = "single-page-application"` | `wrangler.toml:4-6` | Already serves `/about` from `about/index.html` ([HTML handling](https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/)) |
| Blog app is a separate git submodule (`vite-blog`) | `.gitmodules` | Out of scope here, see R4 |

---

## Options

### O1. `vite-prerender-plugin` (recommended)

- Docs: [github.com/preactjs/vite-prerender-plugin](https://github.com/preactjs/vite-prerender-plugin). React example: [examples/react](https://github.com/preactjs/vite-prerender-plugin/tree/master/examples/react).
- Version 0.5.14, published 2026-09-26 (npm registry). It's maintained by the Preact team and was extracted from `@preact/preset-vite`. The repo has 67 stars, so adoption is small.
- **How it works.** At build time the plugin calls a `prerender({ url })` function you export, injects the returned `html` into `#app`, and writes `head` tags. It crawls `links` to find more pages, and `additionalPrerenderRoutes` adds unlinked ones.
- **What changes in this repo:**
  1. `src/index.tsx` exports `prerender()`. That function creates a router with `createMemoryHistory({ initialEntries: [url] })`, awaits `router.load()`, renders with React 19's [`prerender` from `react-dom/static`](https://react.dev/reference/react-dom/static/prerender) (it waits for Suspense, unlike `renderToString`), and returns `head` from the Helmet context.
  2. `index.html` gets `<script prerender type="module" …>`, or set `prerenderScript` in the config instead.
  3. `vite.config.ts` adds `vitePrerenderPlugin({ renderTarget: "#app", additionalPrerenderRoutes: [...project slugs] })`. Reuse `buildEntries()` from `scripts/sitemap.ts` so the sitemap and the prerender list can't drift apart.
  4. Remove the `window` reads in `seo-head.tsx` and `use-seo.ts`.
  5. Keep `createRoot` on the client for now. It replaces the prerendered markup instead of hydrating it. That avoids hydration mismatches, because loader data isn't serialized to the client. Moving to `hydrateRoot` later needs the router's dehydration (see O1b).
  6. Fix R1 (the service worker).
- **Pros:** Small and additive. It keeps `index.html`, the PWA plugin, the Cloudflare assets setup, and the SPA fallback. Reverting means removing one plugin and one export.
- **Cons:** You write the render function yourself. Small community. With `createRoot`, the client discards the server markup, which costs one extra render on first load but no content change. Measure CLS before and after.

### O1b. O1 plus real hydration

Use TanStack Router's own SSR helpers, `RouterServer` / `renderRouterToString` / `RouterClient`, documented in the [Router SSR guide](https://tanstack.com/router/latest/docs/framework/react/guide/ssr). They serialize loader data so `hydrateRoot` matches the server output. The guide says these internals are shared with Start and "should be regarded as experimental until Start reaches stable status." Only do this if the double render in O1 measurably hurts.

### O2. Migrate to TanStack Start with static prerendering

- Docs:
  - [Static prerendering](https://tanstack.com/start/latest/docs/framework/react/guide/static-prerendering)
  - [Start on Cloudflare Workers](https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/)
  - [SPA mode](https://tanstack.com/start/latest/docs/framework/react/guide/spa-mode)
  - [Start overview](https://tanstack.com/start/latest/docs)
- Version `@tanstack/react-start` 1.169.3, published 2026-10-16 (npm registry). It's the first-party path for TanStack Router apps.
- **How it works.** `tanstackStart({ prerender: { enabled: true } })`. Static routes are discovered automatically, and `crawlLinks` follows links from rendered pages. `$slug` routes are found by crawling from `/projects`, or listed in `pages`. `failOnError` stops the build when a page fails. Hydration and loader-data serialization are built in, and head tags come from each route's `head()`.
- **What changes in this repo:**
  1. Replace the `tanstackRouter()` plugin with `tanstackStart()`.
  2. Change the Cloudflare plugin to `cloudflare({ viteEnvironment: { name: "ssr" } })`.
  3. Move `wrangler.toml` to `main = "@tanstack/react-start/server-entry"` with `nodejs_compat`. The site then runs a Worker, not only static assets.
  4. Delete `index.html` and `src/index.tsx`. The root route renders the document shell with `HeadContent` and `Scripts`.
  5. Move `react-helmet-async` into route `head()` definitions.
  6. Revalidate the PWA setup. `vite-plugin-pwa` expects an `index.html` entry, and I found no Start-specific guidance for it (R2).
- **Pros:** Proper hydration, per-route head tags, and documented prerender options. Server functions become available later. It's TanStack's maintained direction.
- **Cons:** A much larger change: entry, root route, head handling, deploy config, and PWA. There's no official migration guide from a plain Router SPA. The search found guides only for Next.js and React Router ([migrate from Next.js](https://tanstack.com/start/latest/docs/framework/react/migrate-from-next-js)). Prerendering runs with local environment variables and bindings unless CI sets `CLOUDFLARE_INCLUDE_PROCESS_ENV=true`, per the Cloudflare guide.

### Comparison

| | O1 vite-prerender-plugin | O2 TanStack Start |
|---|---|---|
| Files touched (estimate from the table above) | about 5 | about 10, plus every route's head |
| Hydration | No, `createRoot` replaces | Yes |
| Per-route head tags | From the Helmet context, returned by `prerender()` | Route `head()` |
| Dynamic `$slug` routes | `additionalPrerenderRoutes` from `projectsIndex` | Crawled, or `pages` |
| PWA plugin | Unchanged, except R1 | Unverified (R2) |
| Cloudflare deploy | Unchanged static assets | Worker with server entry |
| Revert cost | Remove one plugin and one export | Revert the migration |
| Maintainer | Preact team, 67 stars | TanStack, first-party |

---

## Recommendation

Do O1 now. F5 only needs HTML at build time, and O1 delivers it without changing deploy, PWA, or routing. Move to O2 only when you need server functions or real hydration. The route files carry over either way, because both use the same TanStack Router definitions.

---

## Steps (O1)

1. **A1. Spike `/about`.** It has no loader, which proves the render path. Pass condition: `curl -s <preview>/about | grep -c "Career Timeline"` returns 1, and the `<title>` shows the about-page title.
2. **A2. Spike `/projects`.** This proves `router.load()` waits for the loader and the lazy chunk. Pass condition: the HTML has project titles and no `PageLoader` markup.
3. **A3.** Remove the `window` reads in `seo-head.tsx` and `use-seo.ts` (write the test first).
4. **A4.** Generate the route list from `buildEntries()`.
5. **A5.** Fix R1 and test a repeat visit to `/about` with the service worker active.
6. **A6.** Check deploy with `pnpm dev:pages`: `/about`, `/projects/<slug>`, and an unknown path that should still fall back to the SPA.
7. **A7.** Check a link preview, for example with the LinkedIn Post Inspector, after deploying.

Estimate: 1 to 2 days. This is a guess based on the files listed above. It's not anchored to a past task, and A2 is the main unknown.

---

## Risks

- **R1. The service worker will serve the wrong page.** `vite-plugin-pwa`'s `generateSW` defaults `navigateFallback` to `index.html`. After prerendering, `index.html` is the home page, so a repeat visit to `/about` gets the home page's HTML, which the client then replaces. Fix: precache each route's HTML and drop the navigation fallback, or use a NetworkFirst strategy for navigations. See the [Workbox navigateFallback docs](https://developer.chrome.com/docs/workbox/modules/workbox-build#property-GenerateSWOptions-navigateFallback). The default is untraced in this repo's config and comes from the plugin's documented behavior. Confirm it in `build/sw.js` after a build.
- **R2. PWA under Start is unverified.** It blocks O2 until a spike proves it works.
- **R3. Build-time network.** The `/projects` loader fetches at build time. If it fails, `fetchAllProjects` drops the project silently (`use-projects.ts:45`) and the page ships with fewer projects. Consider failing the build instead.
- **R4. The blog is a separate app.** `blog.timdehof.dev` is built from the `src/content/blog` submodule (`timDeHof/vite-blog`), and it is also client-rendered. Prerendering it needs the same work in that repo. I won't edit the submodule.
