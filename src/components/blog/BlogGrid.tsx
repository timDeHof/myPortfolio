import { BlogPostCard } from "./BlogPostCard";

import type { BlogPost } from "../../services/api/blog";

interface BlogGridProps {
  posts: BlogPost[];
  isLoading?: boolean;
}

export const BlogGrid: React.FC<BlogGridProps> = ({ posts, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-80 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">
          No blog posts found.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post, index) => (
        <BlogPostCard key={post.slug} post={post} index={index} />
      ))}
    </div>
  );
};
