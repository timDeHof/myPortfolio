# timdehof.dev other pages — v2 copy draft

Audience: employers. Matches home-v2-copy.md and about-v2-copy.md. `[Brackets]` are placeholders to fill or confirm. Every unbracketed claim comes from the current site, the repo, or the earlier v2 drafts as of 2026-10-17.

Covers: Projects, project detail pages, Blog, Contact, Services (removed), 404, and the shared nav, footer, and default meta. The source file for each current string is listed so the copy can be applied without searching.

---

## G1. Generic phrases removed

| Current phrase | Where | Replaced by |
|---|---|---|
| "Building innovative solutions with cutting-edge technologies." | `src/utils/seo.ts:25` (defaultSEO), `index.html:9` | G3 default description |
| "Full-stack developer passionate about creating innovative web solutions with modern technologies and best practices." | `src/components/layout/footer.tsx:43` | G2 footer blurb |
| "A collection of projects showcasing my expertise in building modern web applications with cutting-edge technologies." | `src/pages/projects-page.tsx:84` | Projects lead |
| "Explore my latest projects including e-commerce applications, machine learning integrations, and full-stack web applications." | `src/utils/seo.ts` (pageSEO.projects) | Projects meta |
| "Real-time insights into my coding activity, language preferences, and contribution patterns." | `src/components/github/github-stats-section.tsx:33` | GitHub section lead |
| "Ready to bring your ideas to life? … create something amazing together." | `src/components/contact/contact-hero.tsx` | Contact lead |
| "I'm always excited to work on new projects and collaborate with passionate people." | `src/components/contact/contact-info-panel.tsx` | Contact panel body |
| "I'm always excited to work on new challenges and innovative solutions." | `src/utils/seo.ts` (pageSEO.contact) | Contact meta |
| "Ready to work together? Let's discuss your next project." | `footer.tsx:74-76` | G2 footer contact line |
| "Discover the web development services I offer, from full-stack applications to cutting-edge technology implementations." | `src/utils/seo.ts` (pageSEO.services) | Removed with the page (P1) |
| "Tell me about your project..." | `contact-form.tsx:235` | Form placeholder |

---

## G2. Shared: nav and footer

**Nav items:** Home · Projects · Blog · About · Contact
Services is removed (P1). The list is `DEFAULT_NAV_ITEMS` in `src/lib/constants.ts:1`, but `navbar.tsx:21` prefers `portfolioData.navigation.navItems` from the remote portfolio data, so the remote JSON needs the same change.

**Nav button:** Résumé (currently "Resume", `navbar.tsx:90`)

**Footer, left column**
- Heading: Tim DeHof
- Blurb: Full-stack engineer in Jacksonville, FL. Seven years in manufacturing engineering before software.
- Link: Read the blog →

**Footer, center column**
- Heading: Pages (was "Quick Links")

**Footer, right column**
- Heading: Contact (was "Get In Touch")
- Line: Hiring for a frontend or full-stack role? Email is fastest.
- Button: Email me (links to `mailto:tim@timdehof.dev`, was "Get In Touch" linking to /contact)
- Jokma referral (P2), small text under the social icons: Need a website or app for your business? I take contract work through [Jokma Web Solutions](https://jokma.com).

**Footer, bottom:** © [year] Tim DeHof (drop "All rights reserved.", it adds nothing)

---

## G3. Shared: default meta

Used when a page has no `SEOHead`, and as the static `<title>` and description in `index.html`.

- **Title:** Tim DeHof — Full-Stack Engineer
- **Description:** Full-stack engineer in Jacksonville, FL, working in React, TypeScript, Node, and AWS. Seven years as a mechanical engineer before software.
- **Keywords:** keep the current list, minus "portfolio" and "web developer" (they match nothing an employer searches for by name).

---

## Projects (`/projects`)

### Meta

- **Title:** Projects — Tim DeHof
- **Description:** Selected projects by Tim DeHof, with the problem, his role, the stack, and what he would change. Includes shadcn-timeline, an accessible timeline component for shadcn/ui.

### Header

**Heading:** Projects

**Lead:** Each project lists the problem, my role, and the stack. The first is the one I'd walk through in an interview.

**Count line:** keep `{n} projects`, drop "featured".

### Order (P4)

1. shadcn-timeline
2. TeamForward (Q1: add an entry to `src/data/projects-index.ts`, before A5 so the home card link resolves)
3. cognidocs
4. habitgate-mobile

Cut (Q2): roomify, 3d-product-configurator, scanpic. Remove their entries from `projects-index.ts`.

### Card buttons

- "View Details" → **Read more**
- Source and demo icon buttons keep their current labels.

### GitHub section

- **Heading:** GitHub activity (was "GitHub Analytics")
- **Lead:** Pulled from the GitHub API: repositories, languages, and recent contributions.

### Closing section

- **Heading:** More on GitHub (was "Want to see more?")
- **Body:** Smaller experiments and older bootcamp work are on my GitHub profile.
- **Button:** GitHub profile

### Empty state

- **Body:** Projects didn't load. They're also on GitHub. (was "No projects found", which reads as if there are none)
- **Button:** GitHub profile

---

## Project detail pages (`/projects/$slug`)

The page text comes from each project's data. Only the shared labels and meta are here.

### Meta (template)

These pages have no `SEOHead` today (`src/pages/project-detail-page.tsx`), so after prerendering they show the G3 default title and no `og:title`.

- **Title:** [Project name] — Tim DeHof
- **Description:** [Project one-line summary from its data]. [My role]. Built with [top three stack items].

### Labels

| Current | New |
|---|---|
| Back to Projects | All projects |
| View Source | Source |
| Live Demo | Live demo |
| Tabs: Overview · Features · Tech Stack · Workflow · Case Study | Case study · Overview · Features · Stack · Workflow (case study first when present, as now) |

### Suggested case-study structure

For the three lead projects, so every case study answers what an interviewer asks:

1. **Problem.** Who had it and what it cost them.
2. **My role.** What I owned, what others owned.
3. **Constraints.** Deadline, budget, accessibility, existing code.
4. **Decisions.** Two or three, each with the alternative I rejected.
5. **Result.** A number or a concrete outcome. [Leave blank rather than estimate.]
6. **What I'd change.**

---

## Blog (`/blog`)

Depends on blog-cleanup-plan.md (D4). After the cleanup the blog has 6 posts (7 if the Render post stays): 3 merged AWS write-ups (M1–M3), 1 rewritten career post, and 2 kept.

### Meta

- **Title:** Blog — Tim DeHof
- **Description:** Write-ups on AWS and frontend engineering by Tim DeHof: what was built, what broke, and what it cost.

### Header

**Heading:** Blog

**Lead:** Write-ups on AWS and frontend work. Each one covers what I built, what went wrong, and what I'd do next time.

**Count line:** keep `{n} posts`, drop "published".

**Button:** Open the blog (was "Visit Full Blog")

### Closing section

- **Heading:** Read the rest on the blog (was "Want to read more?")
- **Body:** The full archive, with code samples, is at blog.timdehof.dev.
- **Button:** Open the blog

---

## Contact (`/contact`)

### Meta

- **Title:** Contact — Tim DeHof
- **Description:** Contact Tim DeHof about frontend and full-stack roles. Remote, based in Jacksonville, FL.

### Header

**Heading:** Contact (was "Let's Work Together")

**Lead:** I'm looking for a full-time frontend or full-stack role on a team where engineering judgment matters as much as output. Email is the fastest way to reach me.

### Info panel

- **Heading:** Reach me directly (was "Get in touch")
- **Body:** For roles, include the team, the stack, and how you found me. For a business website or app, contact [Jokma Web Solutions](https://jokma.com), where I take contract work.
- **Email:** tim@timdehof.dev
- **Location:** Jacksonville, FL · open to remote (was "Available for remote work")
- **Links:** LinkedIn · GitHub · Résumé (PDF)

Response-time card:
- **Heading:** Response time
- **Body:** I reply within one business day. (Replaces "24 hours". Drop the urgent-inquiry sentence, it suggests client support.)

### Form

- **Heading:** Send a message (was "Send me a message")
- **Labels:** Name · Email · Message (keep)
- **Name placeholder:** keep "Your full name"
- **Email placeholder:** you@company.com (was "your.email@example.com")
- **Message placeholder:** The role, the team, or the question (was "Tell me about your project...")
- **Button:** Send (sending state: Sending…)
- **Success:** Thanks. Your message reached me, and I'll reply within one business day.
- **Not configured:** The form isn't working right now. Email me at tim@timdehof.dev.
- **Error:** Your message didn't send. Try again, or email me at tim@timdehof.dev.

---

## Services (`/services`), removed (P1)

Remove the page, its nav item, `pageSEO.services`, and `/services` from `buildEntries()` in `scripts/sitemap.ts` (which also removes it from the prerender list, A4).

Redirect `/services` to `/contact` with a 301 so existing links still land. On Cloudflare static assets this is a `_redirects` line: `/services /contact 301` ([Workers redirects docs](https://developers.cloudflare.com/workers/static-assets/redirects/)). [Or redirect to jokma.com if you'd rather send service leads straight there. That needs Joe's OK.]

The page's content comes from the remote portfolio data (`services-page.tsx:16`, `usePortfolioData`), so its entries there can be deleted too.

---

## 404

Current copy (`src/routes/__root.tsx`): "404", "Page not found", "Go home". It's specific and short. Keep it, and add one link:

- **Body:** Page not found.
- **Links:** Home · Projects

---

## Not covered

- Project descriptions, features, and tech-stack text. They live in each project's data, not in page code. They need a pass using the case-study structure above.
- The blog posts themselves (see blog-cleanup-plan.md).
- jokma.com (Joe's site, suggestions only).
