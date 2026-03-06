import { useQuery } from "@tanstack/react-query";

import postsData from "../../content/blog/.velite/posts.json";

export const BLOG_URL = "https://blog.timdehof.dev";

const WORDS_PER_MINUTE = 200;

function getReadingTime(body: unknown): number {
  if (!body) return 1;
  
  let text = "";
  
  if (typeof body === "string") {
    text = body;
  } else if (Array.isArray(body)) {
    text = body
      .map((node) => {
        if (typeof node === "string") return node;
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

function extractText(nodes: unknown): string {
  if (!nodes) return "";
  if (typeof nodes === "string") return nodes;
  if (Array.isArray(nodes)) {
    return nodes.map(extractText).join(" ");
  }
  if (nodes && typeof nodes === "object" && "children" in nodes) {
    return extractText((nodes as { children: unknown }).children);
  }
  return "";
}

export type BlogPost = {
  slug: string;
  slugAsParams: string;
  title: string;
  description?: string;
  date: string;
  published: boolean;
  tags?: string[];
  cover?: {
    src: string;
    height: number;
    width: number;
    blurDataURL: string;
  };
  body: unknown;
  readingTime?: number;
};

const posts = postsData as BlogPost[];

export const blogKeys = {
  all: ["blog"] as const,
  posts: () => [...blogKeys.all, "posts"] as const,
  post: (slug: string) => [...blogKeys.all, "post", slug] as const,
};

export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  return posts
    .filter((p) => p.published)
    .map((post) => ({
      ...post,
      readingTime: getReadingTime(post.body),
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const fetchBlogPost = async (
  slug: string
): Promise<BlogPost | undefined> => {
  return posts.find((p) => p.slugAsParams === slug);
};

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
