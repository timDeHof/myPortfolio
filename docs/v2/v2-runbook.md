# timdehof.dev v2 runbook

Turns `timdehof-v2-prototype.html` and the copy docs into the live site. Work top to bottom. Each build step is one branch and one PR.

Sources:

- `docs/v2/timdehof-v2-prototype.html`: home and About layout, shared header and footer.
- `docs/v2/home-v2-copy.md`, `docs/v2/about-v2-copy.md`: page copy and meta.
- `docs/v2/pages-v2-copy.md`: G1 to G3 shared copy, plus Projects, Blog, Contact, and 404.

Status as of 2026-10-17: prerendering, the project page layout, and the Services page removal are live (#32 to #34). The home Services section removal is #35.

---

## 0. Setup (once per session)

Run from `~/Dev/Personal/portfolios/myPortfolio`. Node runs under Rosetta because `node_modules` is x86-only.

```bash
git fetch --all --prune
git switch main && git pull --ff-only
git submodule update --init
```

Command aliases used below:

| Name       | Command                                                    |
| ---------- | ---------------------------------------------------------- |
| `NODE`     | `arch -x86_64 /usr/local/bin/node`                         |
| type-check | `NODE "$(which pnpm)" -s type-check`                       |
| lint       | `NODE node_modules/eslint/bin/eslint.js src tests scripts` |
| test       | `NODE node_modules/vitest/vitest.mjs run`                  |
| build      | see below                                                  |

The visualizer plugin opens a browser on every build. Build with a temporary config, then delete it:

```bash
sed 's/open: true/open: false/' vite.config.ts > vite.nobrowser.config.ts
arch -x86_64 /usr/local/bin/node node_modules/vite/bin/vite.js build -c vite.nobrowser.config.ts
rm vite.nobrowser.config.ts
```

---

## 1. Fill the placeholders (Tim)

Nothing marked as a placeholder (dashed amber in the prototype, `[brackets]` in the copy docs) ships. Fill each one or cut the line. Write answers into the copy docs so the build steps have one source.

| Code | Input                                                                                                                                | Where it goes                                        | Needed by      |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------- | -------------- |
| I1   | Roles you're open to (prototype: "full-time frontend / full-stack")                                                                  | Home hero status line                                | A4             |
| I2   | For each AWS cert (Cloud Practitioner, Developer – Associate, AI Practitioner): earned with date, in progress, or drop               | Home proof chip, About certs                         | A4, A6         |
| I2d  | Hero proof line: one chip naming both earned AWS certs, or the newest only                                                           | Home proof chip                                      | A4             |
| I2e  | AWS Cloud Institute: say you graduated (`portfolio.json` has Cloud Application Developer Graduate, June 2026), not "working through" | Home background, About learning section and timeline | A5, A6         |
| I3   | Email address (`pages-v2-copy.md` assumes `tim@timdehof.dev`)                                                                        | Footer, home and About contact blocks, Contact page  | A3, A5, A6, A7 |
| I4   | LinkedIn URL (footer has `linkedin.com/in/tim-dehof/`, unverified)                                                                   | Same as I3                                           | A3, A5, A6     |
| I5   | Résumé PDF URL. The site reads `VITE_RESUME_URL` (`src/lib/env.ts:8`). Confirm it is set in the Cloudflare build.                    | Hero button, About contact block                     | A4, A6         |
| I6   | One sentence on why shadcn-timeline is accessible or why people adopted it                                                           | Home selected work                                   | A5             |
| I7   | One TeamForward result or technical decision                                                                                         | Home selected work                                   | A5             |
| I8   | Jokma project: name, what you built and owned, stack. **Needs Joe's OK (P3).**                                                       | Home selected work, About timeline                   | A5, A6         |
| I9   | What pulled you toward software (a specific moment or tool)                                                                          | About story                                          | A6             |
| I10  | Jokma start year                                                                                                                     | About story and timeline                             | A6             |
| I11  | 2023: what you built, or merge the row into 2022                                                                                     | About timeline                                       | A6             |
| I12  | Bootcamp name                                                                                                                        | About timeline                                       | A6             |
| I13  | Mechanical engineering employer and one responsibility                                                                               | About timeline                                       | A6             |
| I14  | Confirm the accessibility claim and name one TeamForward practice                                                                    | About practices                                      | A6             |
| I15  | Tools: confirm the three groups. Decide on MongoDB, Framer Motion, Docker.                                                           | About tools                                          | A6             |
| I16  | Keep or cut "Team Leadership" and "System Design" (in `about-data.ts`, no example on the site)                                       | About tools                                          | A6             |

**Done when:** no `[bracket]` is left in the copy docs for the step you are about to build.

---

## 2. Decide (Tim)

| Code | Decision                                                                  | Recommendation                                                       | Affects |
| ---- | ------------------------------------------------------------------------- | -------------------------------------------------------------------- | ------- |
| D1   | Keep or remove the About page testimonials (the prototype has none)       | **Decided: keep**, below How I work                                  | A6      |
| D2   | Prototype nav scrolls to `#work` and `#contact` on home                   | **Decided:** keep the real `/projects` and `/contact` routes         | A3, A5  |
| D3   | Star count: prototype says 317★, the case-study JSON hard-codes 297 (F17) | **Decided:** read it from the GitHub API at build time               | A4, A5  |
| D4   | Ship the home page with two projects if I8 isn't approved                 | **Decided:** yes. Joe has not approved (I8a), so A5 ships two cards. | A5      |

---

## 3. Build (Claude, one PR per step)

### Process for every step

1. Branch from current main: `git switch -c <branch> origin/main`.
2. Write the failing test first and show it fail. For a copy change, the test asserts on the prerendered HTML (`tests/ssr/prerender-routes.test.tsx`, using `renderPage(url)`).
3. Make the change.
4. Run type-check, lint, test, and build. All must pass.
5. Commit with a message that says why.
6. Show Tim the PR title and body. Post only after a yes.
7. Turn on Auto-fix. Merge with a merge commit once CI on the head commit passes.
8. Run the step's verification (section 4).

| Step | Branch                   | Change                                                                                                                                                                                                                                                                                                                        | Files                                                                                     | Inputs                           | Done when                                                                                      |
| ---- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | -------------------------------- | ---------------------------------------------------------------------------------------------- |
| A1   | `fix/footer-github-link` | Footer GitHub link: `github.com/tim-dehof` (404) to `github.com/timDeHof`                                                                                                                                                                                                                                                     | `src/components/layout/footer.tsx:22`                                                     | none                             | Built HTML has no `tim-dehof` GitHub link. `curl -sI https://github.com/timDeHof` returns 200. |
| A2   | `feat/v2-meta`           | Default meta (G3), plus title and description for home, About, Projects, Blog, Contact                                                                                                                                                                                                                                        | `src/utils/seo.ts`                                                                        | none                             | Each prerendered page's `<title>` and description match the copy docs.                         |
| A3   | `feat/v2-footer`         | Footer copy per G2: blurb, "Pages", "Contact", "Email me" mailto, Jokma referral line, © line. Nav button "Résumé". Social links: drop Twitter (prototype has none).                                                                                                                                                          | `footer.tsx`, `navbar.tsx`                                                                | I3, I4                           | Footer on every page matches G2. No "innovative" or "All rights reserved".                     |
| A4   | `feat/v2-home-hero`      | Replace `HeroTerminal` with the prototype hero: status pill, headline, subhead, proof chips, "See my work" and "Résumé" buttons, Rev B title block. Remove the terminal animation, "Available for opportunities", "3+ Years Experience", "20+ Projects Delivered".                                                            | `src/pages/home-page.tsx`, new `src/components/home/hero.tsx`                             | I1, I2, I2d, I5, D3              | Home HTML contains the headline and title block, and none of the removed strings.              |
| A5   | `feat/v2-home-sections`  | Add How I work (3 principles), Selected work (cards link to `/projects/<slug>`), Background with short timeline and "More about me", Contact block with Jokma referral                                                                                                                                                        | `home-page.tsx`, new components in `src/components/home/`                                 | I2e, I3, I4, I6, I7, I8, D2, D4  | Home HTML contains all four section headings. Each card link resolves.                         |
| A6   | `feat/v2-about`          | Rebuild About in prototype order: intro, story and timeline, four practices, AWS Cloud Institute and certs (data stays in `portfolio.json`, add a status field), tools by proficiency, contact block. Replaces `AboutHero`, `StorySection`, `TimelineSection`, `SkillsSection`, `CertificationsSection`. Testimonials per D1. | `src/pages/about-page.tsx`, `src/components/about/*`, `portfolio-metadata/portfolio.json` | I2, I2e, I3 to I5, I8 to I16, D1 | About HTML contains each section heading and the certs with their status.                      |
| A7   | `feat/v2-pages-copy`     | Projects, Blog, Contact, and 404 copy per `pages-v2-copy.md`                                                                                                                                                                                                                                                                  | the matching pages                                                                        | I3, I4, I5                       | Each page's HTML has the new headings and none of the G1 phrases.                              |
| A8   | none                     | Visual check against the prototype: phone (375px) and desktop, light and dark. The prototype claims to keep the current navy, teal, DM Sans, and JetBrains Mono. Confirm the tokens match.                                                                                                                                    | none                                                                                      | none                             | Screenshots reviewed. Mismatches filed as follow-ups.                                          |

**Data change order (A6):** if `portfolio.json` gains a cert status field, ship the app change that reads it first, because the live site fetches `portfolio.json` at runtime. Add the field to the JSON after that PR deploys.

---

## 4. Verify after each deploy

1. **Deploy finished.** Replace `<sha>` with the merge commit.

   ```bash
   gh api "repos/timDeHof/myPortfolio/actions/runs?head_sha=<sha>" \
     --jq '.workflow_runs[] | "\(.name)\t\(.status)\t\(.conclusion // "-")"'
   ```

   Both `CI` and `Deploy` should read `completed success`.

2. **Pages serve their own head tags.**

   ```bash
   for p in / /about /contact /projects /projects/shadcn-timeline; do
     curl -sSL "https://timdehof.dev$p?cb=$(date +%s)" -o /tmp/page.html
     printf '%-28s %s  og:title x%s\n' "$p" \
       "$(grep -o '<title[^>]*>[^<]*' /tmp/page.html | sed 's/<[^>]*>//')" \
       "$(grep -o 'property="og:title"' /tmp/page.html | wc -l | tr -d ' ')"
   done
   ```

   Each title matches the copy doc, and the og:title count is 1.

3. **Step-specific check:** the "Done when" column in section 3.

4. **Once, after A2 and A4:** paste `https://timdehof.dev/` and `https://timdehof.dev/about` into Slack, LinkedIn's Post Inspector, and X. Check that the preview shows the new title, description, and image. This is A6/A7 in `prerender-plan.md`, still not done.

---

## 5. Roll back

Every step is a merge commit on main, so a revert undoes it and redeploys.

```bash
git switch main && git pull --ff-only
git switch -c revert/<step> && git revert -m 1 <merge-sha>
```

Open that as a PR. Exceptions:

- **`portfolio.json` changes** go live without a deploy, because the site fetches it at runtime. Revert those in `portfolio-metadata` directly.
- **The `/services` 301** (#32) is cached by browsers. A revert can't bring the page back for visitors who already hit it.

---

## 6. Progress

| Step                  | Status                                    | PR                                                     |
| --------------------- | ----------------------------------------- | ------------------------------------------------------ |
| Inputs I1 to I16      | answered 2026-10-17. Held: I8 (Joe's OK). | none                                                   |
| Decisions D1 to D4    | decided 2026-10-17                        | none                                                   |
| A1 Footer GitHub link | done, merged as `fce33b6`                 | [#36](https://github.com/timDeHof/myPortfolio/pull/36) |
| A2 Meta               | done, merged as `85ec033`                 | [#38](https://github.com/timDeHof/myPortfolio/pull/38) |
| A3 Footer and nav     | not started                               | none                                                   |
| A4 Home hero          | not started                               | none                                                   |
| A5 Home sections      | not started                               | none                                                   |
| A6 About              | not started                               | none                                                   |
| A7 Other pages copy   | not started                               | none                                                   |
| A8 Visual check       | not started                               | none                                                   |
