import React from "react";
import { PenLine } from "lucide-react";

import { AnimatedSection } from "../components/common/animated-section";
import { SEOHead } from "../components/common/seo-head";
import { BlogGrid } from "../components/blog/BlogGrid";
import { Button } from "../components/ui/button";
import { MaxWidthWrapper } from "../components/ui/max-width-wrapper";
import { useBlogPosts, BLOG_URL } from "../services/api/blog";
import { pageSEO } from "../utils/seo";

export const BlogPage: React.FC = () => {
  const { data: posts = [], isLoading, error, isError } = useBlogPosts();

  if (isError) {
    return (
      <>
        <SEOHead seo={pageSEO.blog} />
        <div className="min-h-[100dvh] flex items-center justify-center bg-muted">
          <MaxWidthWrapper>
            <div className="text-center">
              <p className="text-lg text-red-600 dark:text-red-400 mb-4">
                Failed to load blog posts
              </p>
              <p className="text-muted-foreground mb-6">
                {error instanceof Error ? error.message : "Unknown error"}
              </p>
              <Button asChild>
                <a href={BLOG_URL} target="_blank" rel="noopener noreferrer">
                  <PenLine className="h-4 w-4 mr-2" />
                  Visit Blog
                </a>
              </Button>
            </div>
          </MaxWidthWrapper>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead seo={pageSEO.blog} />

      <AnimatedSection className="py-20 bg-muted">
        <MaxWidthWrapper>
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4">
              Blog
            </h1>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              Thoughts on web development, React, and building modern applications.
            </p>
            <p className="mt-4 text-muted-foreground">
              {posts.length} posts published
            </p>
            <Button asChild className="mt-6 bg-secondary text-secondary-foreground hover:opacity-90">
              <a href={BLOG_URL} target="_blank" rel="noopener noreferrer">
                <PenLine className="h-4 w-4 mr-2" />
                Visit Full Blog
              </a>
            </Button>
          </div>
        </MaxWidthWrapper>
      </AnimatedSection>

      <MaxWidthWrapper className="py-16">
        <BlogGrid posts={posts} isLoading={isLoading} />
      </MaxWidthWrapper>

      <AnimatedSection className="py-16 bg-muted">
        <MaxWidthWrapper className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Want to read more?
          </h2>
          <p className="text-muted-foreground mb-6">
            Check out my full blog for more articles and tutorials.
          </p>
          <Button asChild className="bg-secondary text-secondary-foreground hover:opacity-90 py-4 px-6">
            <a href={BLOG_URL} target="_blank" rel="noopener noreferrer">
              <PenLine className="h-4 w-4 mr-2" />
              Visit Full Blog
            </a>
          </Button>
        </MaxWidthWrapper>
      </AnimatedSection>
    </>
  );
};

export default BlogPage;
