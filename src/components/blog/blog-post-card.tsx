import type { BlogPost } from "@services/api/blog";

import { Card, CardContent } from "@components/ui/card";
import { BLOG_URL } from "@services/api/blog";
import { m } from "framer-motion";
import { Calendar, Clock, Tag } from "lucide-react";

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
      className="group h-full"
    >
      <a
        href={blogUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        <Card className="h-full border bg-card hover:border-primary/50 transition-colors duration-200 rounded-lg">
          {post.cover && (
            <div className="relative">
              <div
                className="h-44 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${post.cover.src})`,
                }}
              />
            </div>
          )}

          <CardContent className="p-5">
            <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              {post.title}
            </h3>

            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{formattedDate}</span>
              </div>
              {post.readingTime && (
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>
                    {post.readingTime}
                    {" "}
                    min
                  </span>
                </div>
              )}
            </div>

            {post.description && (
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                {post.description}
              </p>
            )}

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {post.tags.slice(0, 3).map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full"
                  >
                    <Tag className="h-2.5 w-2.5" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </a>
    </m.div>
  );
};
