import { m } from "framer-motion";
import { Calendar, Clock, ExternalLink, Tag } from "lucide-react";

import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";

import { BLOG_URL } from "@services/api/blog";
import type { BlogPost } from "@services/api/blog";

interface BlogPostCardProps {
  post: BlogPost;
  index?: number;
}

export const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, index = 0 }) => {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const blogUrl = `${BLOG_URL}/blog/${post.slugAsParams}`;

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <Card className="h-full hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
        {post.cover && (
          <div className="relative">
            <div
              className="h-48 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
              style={{ 
                backgroundImage: `url(${post.cover.src})`,
              }}
            />
          </div>
        )}

        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
            {post.title}
          </h3>
          
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
            {post.readingTime && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readingTime} min read</span>
              </div>
            )}
          </div>

          {post.description && (
            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
              {post.description}
            </p>
          )}

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="flex items-center px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <Button size="sm" asChild className="bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white">
              <a href={blogUrl} target="_blank" rel="noopener noreferrer">
                Read More
                <ExternalLink className="h-4 w-4 ml-1" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </m.div>
  );
};
