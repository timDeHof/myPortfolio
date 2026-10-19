# timdehof.dev home page — v2 copy draft

Audience: employers. Placeholders filled from `to-questionnaire-v2-placeholders.md` on 2026-10-17. `[Brackets]` are placeholders to fill or confirm. Every unbracketed claim is taken from the current site or the GitHub API as of 2026-10-17.

---

## Meta

- **Title:** Tim DeHof — Full-Stack Engineer, formerly Mechanical Engineer
- **Description:** Full-stack engineer in Jacksonville, FL. Seven years in manufacturing engineering, now building React, TypeScript, and AWS applications. Author of shadcn-timeline.

---

## Hero

**Eyebrow:** Open to full-time frontend and full-stack roles (location is in the title block)

**Headline:** I spent seven years engineering physical products. Now I engineer software the same way.

**Subhead:** Full-stack engineer working in React, TypeScript, and Node. Manufacturing taught me to find the root cause, test against real constraints, and build things that hold up after handoff.

**Proof line:** Author of shadcn-timeline ({stars}★, read from the GitHub API at build time, D3) · Frontend Engineer at TeamForward · 2× AWS Certified (Cloud Practitioner, AI Practitioner)

**Primary button:** See my work
**Secondary button:** Résumé (PDF), linking to `https://assets.timdehof.dev/tim-dehof-resume.pdf` via `VITE_RESUME_URL` (I5)

> Alternate headline, if the first reads too long at mobile width:
> **Mechanical engineer turned full-stack developer.**

---

## How I work

Section heading: **What manufacturing taught me about software**

**Root cause first.**
On a production line, a fix that skips the root cause comes back on the next shift. I trace bugs through every layer, from the UI to the query, before changing code.

**Design for the constraint.**
Parts have tolerances, and software has budgets: load time, accessibility, the next developer's time. I decide which constraint matters before choosing a tool.

**Built to be handed off.**
Engineering drawings have to make sense to someone who never met the designer. I write code, docs, and pull requests the same way.

---

## Selected work

Section heading: **Selected work**
Intro: Each one covers the problem and my role. (D4: ships with two until Joe approves the Jokma card.)

1. **shadcn-timeline**: An accessible timeline component for shadcn/ui. {stars} stars on GitHub. A timeline that fits shadcn/ui's design system out of the box, with ARIA attributes so screen readers announce each item's state.
   Links: Live demo · Source · Case study
2. **TeamForward**: Frontend for an event-planning and networking platform. React, TypeScript, Tailwind. Chose web-push-neo over web-push for push notifications because it uses the Web Crypto API, so it runs outside Node.
   Links: Details (no TeamForward case study yet, so the link says Details until teamforward-case-study.json exists)

Link below the list: All projects →

**Held for Joe's OK (I8, P3), not shipped:** a Jokma Web Solutions project card.

---

## Background

Section heading: **From the shop floor to the stack**

From 2015 to 2022 I worked as a mechanical engineer in manufacturing and 3D printing. In 2022 I moved into software through Fullstack Academy. Since 2024 I've been building production frontends at TeamForward, and in June 2026 I graduated from the AWS Cloud Institute's Cloud Application Developer program.

Link: More about me →

---

## Contact

Section heading: **Hiring a frontend or full-stack engineer?**

Body: I'm looking for a team where engineering judgment matters as much as output. The fastest way to reach me is email.

Buttons: Email me (`tim@timdehof.dev`) · LinkedIn (`https://www.linkedin.com/in/tim-dehof/`) · GitHub (`https://github.com/timDeHof`)

**Jokma referral (P2), small text under the buttons and repeated in the footer:**
Need a website or app for your business? I take contract work through [Jokma Web Solutions](https://jokma.com).

---

## Removed from v1

- "Available for opportunities" badge. Replaced by a specific eyebrow line.
- "3+ Years Experience" and "20+ Projects Delivered". Not verifiable on the site (D6).
- The `deploy --production` terminal animation. It has no content (F6).
- The "What I Do Best" services blocks and "Start Your Project" button (P1).
