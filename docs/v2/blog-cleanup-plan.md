# Blog cleanup plan (D4)

Source: blog.timdehof.dev, 30 posts, read 2026-10-17. Five posts were read in full: S3 + CloudFront, Serverless Image Processing, Mechanical Engineer journey, Axios debugging, and the index. The other 25 are judged from title, date, length, and summary only.

Result: 30 posts become 6 (3 merged AWS write-ups, 1 rewritten career post, 2 kept), or 7 if you keep the Render post.

---

## Findings

- **F10. The S3 + CloudFront post recommends a public bucket.** The policy uses `"Principal": "*"` on `s3:GetObject`, and the distribution sets `OriginAccessIdentity: ""`. Current AWS guidance is a private bucket behind Origin Access Control: [Restricting access to an S3 origin](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html).
- **F11. The S3 + CloudFront cost table is off by about 100×.** It lists 100 GB of transfer at "$0.09/month" and CloudFront 100 GB at "~$0.085/month". AWS prices transfer per GB, not per 100 GB. CloudFront also includes 1 TB/month free. See [CloudFront pricing](https://aws.amazon.com/cloudfront/pricing/).
- **F12. The S3 + CloudFront post states a "99.99% uptime SLA."** I believe CloudFront's SLA is 99.9%. I haven't verified this. Check the [CloudFront SLA](https://aws.amazon.com/cloudfront/sla/) before reusing the figure.
- **F13. The two AWS posts I opened embed "interactive" React demos with hardcoded numbers.** The latencies are fixed values and the pipeline steps all start as "complete." They simulate results instead of reporting measured ones.
- **F14. The career post is written in a fantasy-quest voice.** Examples: "the one true coding bootcamp," "wielding powerful tools." The facts underneath are useful: a Galactic Pawn capstone built with React, Node, Express, and PostgreSQL, deployed to Render.

A hiring manager who knows AWS would catch F10 and F11 in under a minute. That makes the AWS posts a liability, not just thin.

---

## Delete: 16 posts

Unpublish rather than hard-delete. Set the posts to draft or move them out of the content folder, so you can bring one back. Redirect each old URL to `/blog`.

**Starter-template leftovers (2)**
| Slug | Title |
|---|---|
| `code-blocks` | Lets see what we can do with rehype pretty code |
| `github-markdown` | Github Flavoured Markdown CheatSheet |

**React humor series, Feb 22–29 2024 (7).** These are 2-minute analogy pieces that teach nothing a reader can't get from the React docs.
| Slug | Title |
|---|---|
| `summon-component` | How to Summon a React Component |
| `react-state-management` | React State Management: An Epic Tale… |
| `react-lifecycle-cats` | The Lifecycle of a React Component, As Told by Cats |
| `react-hooks` | React Hooks: Fishing for Components… |
| `react-debug-magic` | Debugging React with Wizardry and Magic |
| `prop-drilling` | Prop Drilling: The Horror Movie |
| `disappearing-props` | The Mysterious Case of the Disappearing Props |

**Generic advice, 2022–2023 (3)**
| Slug | Title |
|---|---|
| `becoming-a-self-learner-…` | Becoming a Self-Learner |
| `the-power-of-a-growth-mindset-…` | The Power of a Growth Mindset |
| `unleash-the-power-of-java-…` | Unleash the Power of Java |

**AWS posts with no project behind them (3).** These are general cloud concepts covered better by AWS's own docs.
| Slug | Title |
|---|---|
| `cloud-computing-fundamentals-iaas-paas-saas` | Cloud Computing Fundamentals |
| `containerization-with-docker` | Containerization with Docker |
| `cloud-networking-fundamentals` | Cloud Networking Fundamentals. Its DNS section moves into M1. |

**Deprecated platform (1)**
| Slug | Title |
|---|---|
| `how-to-deploy-the-face-recognition-api-…` | Deploy the Face Recognition API with Render. Unread. It's a 2022 Heroku-alternative tutorial. Keep it only if the steps still work. |

That's 16 if you delete the Render post and 15 if you keep it.

---

## Merge: 10 AWS posts → 3 write-ups

Each merged post must describe something you actually deployed, with numbers you measured. If you haven't built one yet, build it first, or drop that post. The redirects in the last column send old URLs to the new post.

| Old post                                         | Goes into                                                               |
| ------------------------------------------------ | ----------------------------------------------------------------------- |
| S3 + CloudFront: Static Site Hosting at the Edge | M1                                                                      |
| Introduction to AWS CloudFormation               | M1                                                                      |
| Building a CI/CD Pipeline with AWS CodePipeline  | M1                                                                      |
| Cloud Security Best Practices                    | M1, as the OAC and headers section                                      |
| Building a REST API with AWS DynamoDB            | M2                                                                      |
| Deploying Serverless APIs with AWS Lambda        | M2                                                                      |
| Microservices Architecture in the Cloud          | M2, as the "why one service" section                                    |
| Serverless Image Processing with AWS Lambda      | M3                                                                      |
| Getting Started with AWS SAM                     | M3                                                                      |
| Introduction to AWS IAM for Developers           | M3, as the execution-role section. M1 also uses it for the deploy role. |

### M1. How I host timdehof.dev v2 on S3 + CloudFront

The v2 rebuild (D5) is a real project you're about to do, so this post documents it.

1. **What I needed.** A static site, a custom domain, HTTPS, deploys on every push, and a near-zero bill.
2. **Architecture.** Route 53 → CloudFront → a private S3 bucket. Include one diagram.
3. **Lock the bucket down.** Use Origin Access Control and Block Public Access, and show the bucket policy scoped to the distribution ARN. Add a short note saying an earlier version of this post got this wrong (fixes F10).
4. **Infrastructure as code.** Show the CloudFormation template, trimmed to the key resources, and explain why you chose CloudFormation over clicking through the console.
5. **The deploy pipeline.** Show the steps from GitHub to build, S3 sync, and CloudFront invalidation, plus the least-privilege IAM role for the deploy. Explain why you picked CodePipeline over GitHub Actions, or the reverse.
6. **Cache rules.** Long TTLs for hashed assets, short for HTML, and how invalidations are scoped.
7. **What it costs.** `[Your real bill from Cost Explorer, month 1]`. Note the 1 TB/month free tier (fixes F11).
8. **What I measured.** `[Lighthouse or WebPageTest numbers before and after: TTFB, LCP]`.
9. **What I'd change.**

### M2. A REST API on API Gateway, Lambda, and DynamoDB

1. **What the API does.** `[Name the real project, such as an AWS Cloud Institute lab or a TeamForward-adjacent feature, and its access patterns.]`
2. **Model access patterns first.** List the queries, then the table design: partition and sort keys, plus one GSI if needed. Explain why a single table, or why not.
3. **Handlers.** One CRUD route end to end, with validation and error responses.
4. **Why one service, not microservices.** Explain when you'd split it and what would have to be true first.
5. **Deploy.** SAM or CloudFormation, stages, and environment config.
6. **What I measured.** `[Cold start versus warm p50/p95, and DynamoDB consumed capacity]`.
7. **What it costs**, and what I'd change.

### M3. A serverless image pipeline with S3, Lambda, and SAM

1. **The problem.** `[What images, from where, and what sizes you needed.]`
2. **Event flow.** Upload bucket → S3 event → Lambda → output bucket. Include one diagram. Explain why two buckets: writing back to the source bucket can trigger the Lambda again.
3. **The SAM template.** Show the function, the event source, and the memory setting.
4. **The execution role.** Grant read on one bucket and write on the other, with nothing broader. Show the policy.
5. **Failure handling.** Retries, a dead-letter queue, and what happens with a corrupt file.
6. **What I measured.** `[Duration and cost per 1,000 images at two or three memory sizes]`.
7. **What I'd change.**

---

## Rewrite: 2 posts → 1

**From mechanical engineer to software engineer.** This merges `from-mechanical-design-engineer-to-fullstack-developer-…` and `roadmap-for-transferring-skills-…`. The roadmap post is unread and judged by its title.

Write it in plain voice (fixes F14). It is the long-form version of D3, so link to it from the About page.

1. What I did as a mechanical engineer, 2015–2022: `[employer and concrete work]`.
2. Why I left: `[the specific moment]`.
3. The bootcamp and the Galactic Pawn capstone: what you built and what broke.
4. Three habits that transferred, with one code example each. These match the "How I work" sections on the home and About pages.
5. What didn't transfer and had to be learned from scratch.

---

## Keep: 2 posts

| Slug                                                         | Action                                                                                                                                                                  |
| ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `unraveling-the-mystery-of-an-empty-api-response-in-axios-…` | Keep. It's a real bug with real code. Retitle it to name the actual cause: filtering a paginated response on the client empties later pages. Cut the generic checklist. |
| `reelwatch-movie-watchlist`                                  | Keep only if the app is still live. Unread.                                                                                                                             |

---

## Order of work

1. **A1.** Unpublish the 16 posts and add the redirects. This takes an hour and removes the risk immediately.
2. **A2.** Pull the S3 + CloudFront post now (F10, F11), even before M1 exists.
3. **A3.** Write M1 while you build v2.
4. **A4.** Rewrite the career post.
5. **A5.** Write M2 and M3 only after the projects exist.
