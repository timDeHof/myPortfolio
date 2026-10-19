# timdehof.dev v2: placeholders and decisions

**Purpose:** fill the placeholders and make the decisions that block build steps A3 to A7 in `docs/v2/v2-runbook.md`. Nothing marked as a placeholder ships, so each blank here either gets an answer or its line gets cut.

**From:** Claude, **To:** Tim, **How your answers will be used:** they go into `home-v2-copy.md`, `about-v2-copy.md`, and `pages-v2-copy.md`, then into the build PRs. Each question carries its runbook code (I1 to I15, D1 to D4).

## Context

The v2 prototype (`docs/v2/timdehof-v2-prototype.html`) rewrites the home and About pages for employers. A1 (the footer's broken GitHub link) needs nothing from you. Every later step needs at least one answer below. The sections run in build order, so answering the first two sections unblocks A3 and A4 even if the rest waits.

## How to answer

Each question has a **Recommended** answer, with its source. Reply "yes" to accept it, or write your own answer under it. "Cut it" is a valid answer for any line you'd rather not publish. Mark anything you're unsure of with "unsure" rather than skipping it.

Sources checked on 2026-10-17:

- `portfolio-metadata/portfolio.json`: the certifications list.
- `src/data/about-data.ts`: the current About timeline and skills.
- `portfolio-metadata/testimonials.json`.
- The GitHub API.
- DNS records for timdehof.dev.
- The live HTML of timdehof.dev.

**Not verified** means I found no source and the recommendation is a guess for you to correct.

## Contact details (A3, A5, A6, A7)

### I3. What email address should the site use?

_Why this matters: it becomes the "Email me" button in the footer and on every contact block._

> **Recommended:** `tim@timdehof.dev`.
> Source: timdehof.dev has MX records for Cloudflare Email Routing (`route1`, `route2`, and `route3.mx.cloudflare.net`).
> Not verified: that a route exists for `tim@`. Send it a test email before A3 ships.
>
> **Your answer: yes**

### I4. What is your LinkedIn profile URL?

> **Recommended:** `https://www.linkedin.com/in/tim-dehof/`, the URL the footer uses now.
> Not verified: LinkedIn answers unauthenticated requests with a 301 to its login wall, so curl can't confirm the profile exists. Open it while signed in.
>
> **Your answer: yes**

### I5. Should the production build set `VITE_RESUME_URL`, and is the résumé PDF current?

_Why this matters: the live site shows no Résumé button. `.github/workflows/deploy.yml` builds without `VITE_RESUME_URL`, so the navbar's `{env.VITE_RESUME_URL && ...}` renders nothing. The live home HTML has no résumé link._

> **Recommended:** yes. Add `VITE_RESUME_URL: https://assets.timdehof.dev/tim-dehof-resume.pdf` to the Build step's `env` in `deploy.yml` and `ci.yml`. It's a public URL, not a secret.
> The PDF returns 200, is 80 KB, and was last modified 2026-03-04.
> Not verified: whether that March version is current. Upload a new PDF first if it isn't.
>
> **Your answer: yes**

## Home hero (A4)

### I1. Which roles are you open to?

> **Recommended:** "Open to full-time frontend and full-stack roles · Remote · Jacksonville, FL", as in the prototype.
> Not verified: this comes from the prototype, not from you.
>
> **Your answer: yes**

### I2a. AWS Certified Cloud Practitioner: earned (with date), in progress, or drop?

> **Recommended:** earned, September 2025. Source: `portfolio.json`, with a Credly verification link.
>
> **Your answer: yes**

### I2b. AWS Certified Developer – Associate: earned (with date), in progress, or drop?

> **Recommended:** drop it, unless you're scheduled for the exam.
> It isn't in `portfolio.json`. The only mention is in `about-data.ts`, which says you're "preparing for" it.
>
> **Your answer: no**
>
> **Clarified 2026-10-17:** drop it. Still studying for it. Add it when earned.

### I2c. AWS Certified AI Practitioner: earned (with date), in progress, or drop?

> **Recommended:** earned, September 2026. Source: `portfolio.json`, with a Credly verification link.
>
> **Your answer: yes**

### I2d. Should the hero proof line name both earned AWS certifications, or the newest one only?

_Why this matters: the hero has room for three short proof chips._

> **Recommended:** one chip, "2× AWS Certified (Cloud Practitioner, AI Practitioner)". The About page lists each certification separately.
>
> **Your answer: yes**

### I2e. Should the AWS Cloud Institute line say you graduated?

_Why this matters: the prototype and `about-data.ts` both say you're still "working through" the curriculum. `portfolio.json` has "AWS Cloud Application Developer Graduate", June 2026._

> **Recommended:** yes. "Graduated from the AWS Cloud Institute's Cloud Application Developer program, June 2026." The timeline row becomes "2024 – 2026", not "2024 – now".
>
> **Your answer: yes**

### D3. Should the shadcn-timeline star count come from the GitHub API at build time, or stay hard-coded?

> **Recommended:** from the API at build time. GitHub shows 317 stars today, and the case-study JSON hard-codes 297, so the hard-coded number is already stale.
>
> **Your answer: yes**

## Home: selected work (A5)

### D4. If Joe hasn't approved the Jokma case study by build time, should the home page ship with two projects?

> **Recommended:** yes. Add the Jokma card when he approves.
>
> **Your answer: yes**

### I6. In one sentence, what makes shadcn-timeline accessible, or why did people adopt it?

> **Recommended:** "A timeline that fits shadcn/ui's design system out of the box, with ARIA attributes so screen readers announce each item's state."
> Source: the repo README lists "Fully accessible with ARIA attributes". Its case study lists multi-state items (completed, in progress, pending) and works with Next.js SSR.
> Not verified: "out of the box" and "screen readers announce each item's state" are my wording. Confirm both against the component.
>
> **Your answer: yes**

### I7. What is one TeamForward result or technical decision you can publish?

_Why this matters: "built the frontend" is what every candidate says. A number, or a decision with its trade-off, is what makes the card worth reading._

> **Recommended:** no source. This has to come from you. If you have no metric, a decision works, for example "Chose X over Y because Z."
>
> \*\*Your answer:yes, I chose web-push-neo over regular web-push because it can work with the service worker and the notification service, which is important for our use case."
>
> **Clarified 2026-10-17:** chose web-push-neo because it uses the Web Crypto API and runs outside Node. Copy: "Chose web-push-neo over web-push for push notifications because it uses the Web Crypto API, so it runs outside Node."

### I8a. Has Joe approved naming a Jokma project on your site (P3)?

> **Recommended:** ask him before A5. Until he says yes, ship per D4.
>
> **Your answer:no**

### I8b. Which Jokma project would you feature?

> **Recommended:** no source. Pick the one where you owned the most and can name a result.
>
> **Your answer:** held for Joe's OK (I8, P3)

### I8c. What did you build on it, and which parts did you own?

> **Recommended:** no source.
>
> **Your answer:** held for Joe's OK (I8, P3)

### I8d. What was its stack?

> **Recommended:** no source.
>
> **Your answer:** held for Joe's OK (I8, P3)

### D2. The prototype's "projects" and "contact" nav links scroll within the home page. Keep the real `/projects` and `/contact` pages instead?

> **Recommended:** keep the routes. They're prerendered, linked from search results, and have their own titles.
>
> **Your answer: yes**

## About page (A6)

### D1. Keep the testimonials section on About?

_Why this matters: the prototype has none._

> **Recommended:** keep it, below the four practices. `testimonials.json` has 3 named TeamForward colleagues with their roles:
>
> - Jacek Supernak, Team Member
> - Winnie Ng, Software Engineer
> - Farhad Faraji, Full Stack Software Engineer
>
> Quotes from named engineers who worked with you support the "How I work" claims better than anything you can write about yourself.
> Not verified: that each person agreed to be quoted on the site.
>
> **Your answer: yes**

### I9. What first pulled you toward software?

_Why this matters: this replaces "discovered my passion for web development." A specific moment, tool, or problem reads as true. A general interest doesn't._

> **Recommended:** no source. If it started with a tool from your 3D-printing work (slicer scripts, printer firmware, a spreadsheet you automated), that's the line to use, because it connects the two careers.
>
> **Your answer: when I first used the 3d-printing software and realized how it could streamline our production process.**

### I10. What year did you start contract work through Jokma?

> **Recommended:** no source. Neither `about-data.ts` nor `portfolio.json` mentions Jokma.
>
> **Your answer: This year (2026)**

### I11. What did you build in 2023? Or should that row merge into 2022?

> **Recommended:** keep a 2023 row titled "DevOps fundamentals", from IBM DevOps Essentials (Coursera, July 2023) in `portfolio.json`. Add a project you built that year if there is one.
> The current row says only "Focusing on modern web technologies."
>
> **Your answer: CI/CD pipelines**

### I12. What was the bootcamp's name?

> **Recommended:** Fullstack Academy, 2022. Source: `portfolio.json`, which lists "Full Stack Web Development, Fullstack Academy, 2022" with React, Node.js, PostgreSQL, and REST APIs.
>
> **Your answer: Fullstack Academy**

### I13a. Who was your mechanical engineering employer from 2015 to 2022?

> **Recommended:** no source. The site says only "manufacturing and 3D printing."
>
> **Your answer: Polyhistor International**

### I13b. What is one concrete responsibility from that job?

_Example of the shape: "Owned the fixture design for a line producing X parts a day." This line backs up the "shop floor" claims on the home page._

> **Recommended:** no source.
>
> **Your answer: Owned the engraving design for a line producing 250 parts a day.**

### I14a. Is it accurate to say you build accessibility in from the start at TeamForward?

> **Recommended:** yes, with evidence.
>
> - `about-data.ts` describes your TeamForward work as "accessible, user-friendly interfaces".
> - `portfolio.json` has W3Cx WAI0.1x: Introduction to Web Accessibility, August 2025, verified on edX.
> - shadcn-timeline ships with ARIA attributes.
>
> Name the course in this section.
>
> **Your answer: W3Cx WAI0.1x: Introduction to Web Accessibility**

### I14b. What is one concrete accessibility practice you use there?

_For example keyboard testing, screen-reader checks, or axe in CI._

> **Recommended:** no source for the TeamForward practice itself. It has to come from you.
>
> **Your answer: Keyboard testing**

### I15a. Which tools do you use daily?

> **Recommended:** React, TypeScript, Tailwind CSS, Git. These match your TeamForward stack in `about-data.ts`.
>
> **Your answer: React, TypeScript, Tailwind CSS, Postgres, Docker, Git**

### I15b. Which tools have you shipped production work with?

_An interviewer can ask about anything on this list._

> **Recommended:** Next.js, Node.js, Express, PostgreSQL, REST APIs, Vercel, Figma. All are in the current skills list, and Node.js, PostgreSQL, and REST APIs are also on the Fullstack Academy certificate.
>
> **Your answer: Next.js, Node.js, Express, PostgreSQL, REST APIs, Vercel, Figma**

### I15c. Do MongoDB, Framer Motion, and Docker belong under "shipped with", "learning", or nowhere?

> **Recommended:**
>
> - Framer Motion under "shipped with": this site uses it.
> - MongoDB and Docker cut, unless you can name a shipped project for each.
>
> All three are in the current skills list, but nothing else on the site shows them in use.
>
> **Your answer: shipped with**
>
> **Clarified 2026-10-17:** cut MongoDB. Framer Motion goes under "shipped with". Docker goes under "use daily" (I15a).

### I15d. Is the "learning" list right?

> **Recommended:** rename the group "Cloud (AWS Cloud Institute)". Since you graduated (I2e), "learning" undersells it.
> Keep Lambda, DynamoDB, S3 and CloudFront, CloudFormation, SAM, and Python. The graduate badge lists serverless, IaC, microservices, Python, and DevOps.
>
> **Your answer: yes**

### I16. Should "Team Leadership" and "System Design" stay in the skills list?

_Why this matters: both are in `about-data.ts`. `about-v2-copy.md` drops Team Leadership for lack of an example, and nothing on the site shows System Design._

> **Recommended:** cut both, unless you can name one example for each.
>
> **Your answer: yes**

## Anything else?

Is there anything the copy should say that these questions didn't ask about, or anything in the prototype you already know you want changed?

> **Your answer: no**
