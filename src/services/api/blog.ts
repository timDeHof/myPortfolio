import { useQuery } from "@tanstack/react-query";

import postsData from "../../content/blog/.velite/posts.json";

export const BLOG_URL = "https://blog.timdehof.dev";

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
