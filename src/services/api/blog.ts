import { useQuery } from "@tanstack/react-query";

import type { BlogPost } from "../../types/blog";

import postsData from "../../content/blog/.velite/posts.json";

// Re-export type for backward compatibility
export type { BlogPost } from "../../types/blog";

export const BLOG_URL = "https://blog.timdehof.dev";

const WORDS_PER_MINUTE = 200;

export function getReadingTime(body: unknown): number {
  if (!body)
    return 1;

  let text = "";

  if (typeof body === "string") {
    text = body;
  }
  else if (Array.isArray(body)) {
    text = body
      .map((node) => {
        if (typeof node === "string")
          return node;
        if (node && typeof node === "object" && "children" in node) {
          return extractText(node.children);
        }
        return "";
      })
      .join(" ");
  }

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE);
  return Math.max(1, minutes);
}

export function extractText(nodes: unknown): string {
  if (!nodes)
    return "";
  if (typeof nodes === "string")
    return nodes;
  if (Array.isArray(nodes)) {
    return nodes.map(extractText).join(" ");
  }
  if (nodes && typeof nodes === "object" && "children" in nodes) {
    return extractText((nodes as { children: unknown }).children);
  }
  return "";
}

const posts = postsData as BlogPost[];

export const blogKeys = {
  all: ["blog"] as const,
  posts: () => [...blogKeys.all, "posts"] as const,
  post: (slug: string) => [...blogKeys.all, "post", slug] as const,
};

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  return posts
    .filter(p => p.published)
    .map(post => ({
      ...post,
      readingTime: getReadingTime(post.body),
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function fetchBlogPost(slug: string): Promise<BlogPost | undefined> {
  return posts.find(p => p.slugAsParams === slug);
}

export function useBlogPosts() {
  return useQuery({
    queryKey: blogKeys.posts(),
    queryFn: fetchBlogPosts,
  });
}

export function useBlogPost(slug: string) {
  return useQuery({
    queryKey: blogKeys.post(slug),
    queryFn: () => fetchBlogPost(slug),
    enabled: !!slug,
  });
}
