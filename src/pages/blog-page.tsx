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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
          <MaxWidthWrapper>
            <div className="text-center">
              <p className="text-lg text-red-600 dark:text-red-400 mb-4">
                Failed to load blog posts
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
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

      <AnimatedSection className="py-20 bg-gradient-to-br from-gray-50 via-teal-50/30 to-blue-50 dark:from-slate-800 dark:via-teal-900/30 dark:to-blue-900">
        <MaxWidthWrapper>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Blog
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Thoughts on web development, React, and building modern applications.
            </p>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              {posts.length} posts published
            </p>
            <Button asChild className="mt-6 bg-teal-700 hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700 text-white">
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

      <AnimatedSection className="py-16 bg-gradient-to-br from-gray-50 via-teal-50/30 to-blue-50 dark:from-slate-800 dark:via-teal-900/30 dark:to-blue-900">
        <MaxWidthWrapper className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Want to read more?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Check out my full blog for more articles and tutorials.
          </p>
          <Button asChild className="bg-teal-700 hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700 text-white py-4 px-6">
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
