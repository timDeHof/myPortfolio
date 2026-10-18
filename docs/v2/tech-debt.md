# Tech debt

Found in the tech-debt review of #42 on 2026-10-18. Each item is scored 1 to 5 on impact (I), risk (R) and effort (E), and priority = (I + R) × (6 − E). Effort is an estimate based on the size of comparable fixes.

Fix each item test-first: commit a test that fails, then the fix, as separate commits. Update the Status column when an item's PR merges.

## Open

| #   | Item                                                                                                                                                                                             | Type         | I   | R   | E   | Priority | Status                                                                                  |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------ | --- | --- | --- | -------- | --------------------------------------------------------------------------------------- |
| T6  | No type-check covers `tests/` or `e2e/`. `tsconfig.app.json` includes only `src`, and the editor already flags `toHaveClass` in tests.                                                           | Test         | 2   | 2   | 2   | 16       | Open. 1 to 2 h, depending on how many type errors `tests/` has.                         |
| T8  | `fetchRepository` reads the full repository list (536,355 B per request) to get one star count.                                                                                                  | Architecture | 2   | 2   | 2   | 16       | Blocked on [portfolio-tools#29](https://github.com/timDeHof/portfolio-tools/issues/29). |
| T13 | The prerender passes only the star count to the browser, and server-versus-browser behavior is handled by `typeof window` checks in each query (`src/prerender.tsx`, `src/lib/query-client.ts`). | Architecture | 3   | 3   | 4   | 12       | Open. 1 to 2 days. Would also replace T7's fix and the per-query checks.                |
| T14 | 56 dependencies are outdated, 21 of them a major version behind (`pnpm outdated`).                                                                                                               | Dependency   | 2   | 3   | 4   | 10       | Open. One major version per PR.                                                         |
| T17 | The kicker and heading class strings repeat across section files.                                                                                                                                | Code         | 1   | 1   | 2   | 8        | Open. File count unverified.                                                            |

## In review

| #   | Item                                                                                                                           | Fix                                                                             | Status   |
| --- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- | -------- |
| T4  | `pnpm test:browser` failed with `Cannot merge config in form of callback`.                                                     | 247a37c removes the browser suite. The Playwright e2e suite covers the browser. | #43      |
| T5  | Deploy didn't run the e2e suite.                                                                                               | 1b88905 adds the Playwright install and `pnpm test:e2e` to `deploy.yml`.        | #43      |
| T7  | The About loader waited on the testimonials fetch, which has no timeout.                                                       | 9ebda1f stops waiting after 1.5s in the browser.                                | #46      |
| T9  | Local `pnpm lint` failed on the uncommitted `docs/` and `.claude/` folders.                                                    | 3eadc8f ignores them. ecd078e lints `docs/` again once it is committed.         | #43, #44 |
| T12 | AGENTS.md named files in PascalCase and camelCase. The repo uses kebab-case.                                                   | a13bb38                                                                         | #43      |
| T15 | The bundle visualizer opened a browser on every build.                                                                         | affefa7 sets `open: false`.                                                     | #43      |
| T16 | The build printed 6 `imagemin error` lines. pnpm doesn't run the install scripts that download pngquant, mozjpeg and gifsicle. | 4f07bcf optimizes only SVGs.                                                    | #46      |

## Fixed in #42

| #   | Item                                                                                 | Fix     |
| --- | ------------------------------------------------------------------------------------ | ------- |
| T1  | Testimonials didn't retry during the prerender.                                      | 33ad765 |
| T2  | The star count didn't retry during the prerender.                                    | 1e121a4 |
| T3  | `hydrateFromPrerender` threw on a malformed query state script, before `createRoot`. | 0100084 |
| T10 | The prerender retry for portfolio data replaced the shared 404 rule.                 | 5b24ef8 |
| T11 | `TitleBlock` ignored wide cells when finding the last row.                           | 6a63d60 |

The same review found two product bugs, G7 (the lead repeated its tagline) and G8 ("1 projects", and a different project became the lead). Both are fixed in #42.
