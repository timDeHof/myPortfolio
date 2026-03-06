import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const postsData = JSON.parse(fs.readFileSync(path.join(__dirname, "../src/content/blog/.velite/posts.json"), "utf-8"));

const BLOG_URL = "https://blog.timdehof.dev";
const SITE_URL = "https://timdehof.dev";

const posts = postsData.filter((p: any) => p.published);

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Tim DeHof's Blog</title>
    <description>Thoughts on web development, React, and building modern applications.</description>
    <link>${BLOG_URL}</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${posts
      .map((post: any) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description || ""}]]></description>
      <link>${BLOG_URL}/blog/${post.slugAsParams}</link>
      <guid isPermaLink="true">${BLOG_URL}/blog/${post.slugAsParams}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      ${post.tags?.map((tag: string) => `<category>${tag}</category>`).join("\n      ") || ""}
    </item>`)
      .join("")}
  </channel>
</rss>`;

const outputPath = path.join(__dirname, "..", "public", "feed.xml");
fs.writeFileSync(outputPath, rss);

console.log(`RSS feed generated at ${outputPath}`);
