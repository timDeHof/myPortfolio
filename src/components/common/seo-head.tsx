import React from "react";
import { Helmet } from "react-helmet-async";

import type { SEOData } from "../../utils/seo";

import { defaultSEO } from "../../utils/seo";

type SEOHeadProps = {
  seo?: Partial<SEOData>;
  structuredData?: object;
};

const defaultSEOProp: Partial<SEOData> = {};

export const SEOHead: React.FC<SEOHeadProps> = ({ seo = defaultSEOProp, structuredData }) => {
  const {
    title = defaultSEO.title,
    description = defaultSEO.description,
    keywords = defaultSEO.keywords,
    image = defaultSEO.image,
    url = window.location.href,
    type = defaultSEO.type,
    author = defaultSEO.author,
    publishedTime,
    modifiedTime,
    section,
    tags,
    locale = defaultSEO.locale,
    siteName = defaultSEO.siteName,
    twitterHandle = defaultSEO.twitterHandle,
    canonicalUrl,
    noIndex = false,
    noFollow = false,
  } = { ...defaultSEO, ...seo };

  const robotsContent = `${noIndex ? 'noindex' : 'index'}, ${noFollow ? 'nofollow' : 'follow'}`;
  const fullImageUrl = image?.startsWith('http') ? image : `${window.location.origin}${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {author && <meta name="author" content={author} />}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content={robotsContent} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl || url} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      {locale && <meta property="og:locale" content={locale} />}
      {siteName && <meta property="og:site_name" content={siteName} />}
      {section && <meta property="article:section" content={section} />}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}
      {tags?.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      {twitterHandle && <meta name="twitter:creator" content={twitterHandle} />}
      {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}

      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#3b82f6" />
      <meta name="msapplication-TileColor" content="#3b82f6" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};
