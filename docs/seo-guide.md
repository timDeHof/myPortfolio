# SEO Implementation Guide

This guide explains how to use and customize the comprehensive SEO system implemented in your portfolio.

## Overview

The SEO system provides:

- **Page-level SEO**: Different metadata for each page
- **Section-level SEO**: Specific SEO for page sections
- **Dynamic SEO**: Generated SEO for projects and content
- **Structured Data**: Rich snippets for search engines
- **Social Media**: Open Graph and Twitter Card support

## File Structure

```
src/
├── components/common/
│   ├── seo-head.tsx          # Main SEO component
│   └── section-seo.tsx       # Section-specific SEO
├── config/
│   └── seo-config.ts         # SEO configuration (customize here)
├── hooks/
│   └── use-seo.ts            # SEO management hook
├── utils/
│   ├── seo.ts                # SEO utilities and data
│   └── structured-data.ts    # Structured data generators
```

## Quick Start

### 1. Basic Page SEO

```tsx
import { SEOHead } from "../components/common/seo-head";
import { pageSEO } from "../utils/seo";

export function MyPage() {
  return (
    <>
      <SEOHead seo={pageSEO.home} />
      {/* Your page content */}
    </>
  );
}
```

### 2. Custom Page SEO

```tsx
import { SEOHead } from "../components/common/seo-head";

export function MyPage() {
  const customSEO = {
    title: "Custom Page Title",
    description: "Custom page description",
    keywords: "custom, keywords, here",
  };

  return (
    <>
      <SEOHead seo={customSEO} />
      {/* Your page content */}
    </>
  );
}
```

### 3. Section-Specific SEO

```tsx
import { SectionSEO } from "../components/common/section-seo";

export function MySection() {
  return (
    <section>
      <SectionSEO section="hero" />
      {/* Your section content */}
    </section>
  );
}
```

### 4. SEO with Structured Data

```tsx
import { SEOHead } from "../components/common/seo-head";
import { generatePersonSchema } from "../utils/structured-data";

export function AboutPage() {
  const structuredData = generatePersonSchema();

  return (
    <>
      <SEOHead
        seo={pageSEO.about}
        structuredData={structuredData}
      />
      {/* Your page content */}
    </>
  );
}
```

## Customization

### 1. Site Configuration

Edit `/src/config/seo-config.ts` to customize your site information:

```typescript
export const siteConfig = {
  siteName: "Your Name Portfolio",
  siteUrl: "https://yoursite.com",
  author: "Your Name",
  email: "your@email.com",

  social: {
    twitter: "@yourhandle",
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourprofile",
  },

  // ... other settings
};
```

### 2. Page Templates

Customize page-specific SEO in the same file:

```typescript
export const pageTemplates = {
  home: {
    titleTemplate: "%s - Your Title",
    description: "Your home page description",
    keywords: ["your", "keywords", "here"],
  },
  // ... other pages
};
```

### 3. Section Templates

Add or modify section SEO:

```typescript
export const sectionTemplates = {
  hero: {
    title: "Your Hero Title",
    description: "Your hero description",
  },
  // Add new sections here
  newSection: {
    title: "New Section Title",
    description: "New section description",
  },
};
```

## Advanced Usage

### 1. Dynamic Project SEO

```tsx
import { generateProjectSEO } from "../utils/seo";

const project = {
  title: "My Awesome Project",
  description: "Project description",
  technologies: ["React", "TypeScript", "Node.js"],
  category: "web-app",
};

const projectSEO = generateProjectSEO(project);

return <SEOHead seo={projectSEO} />;
```

### 2. Using the SEO Hook

```tsx
import { useSEO } from "../hooks/use-seo";

export function MyComponent() {
  const seoData = useSEO({
    title: "Custom Title",
    description: "Custom description",
  });

  // SEO data is automatically applied
  return <div>Your content</div>;
}
```

### 3. Conditional SEO

```tsx
import { SEOHead } from "../components/common/seo-head";

export function MyPage({ isPrivate }) {
  const seoConfig = {
    title: "My Page",
    description: "Page description",
    noIndex: isPrivate, // Don't index private pages
    noFollow: isPrivate,
  };

  return (
    <>
      <SEOHead seo={seoConfig} />
      {/* Your content */}
    </>
  );
}
```

## SEO Features

### Meta Tags Generated

- **Basic**: title, description, keywords, author
- **Open Graph**: og:title, og:description, og:image, og:url, og:type
- **Twitter Cards**: twitter:card, twitter:title, twitter:description, twitter:image
- **Article**: article:section, article:tag, article:author
- **Technical**: robots, canonical, viewport

### Structured Data Types

- **Person**: Your professional information
- **Website**: Site information and search functionality
- **Project**: Individual project details
- **Breadcrumb**: Navigation structure
- **FAQ**: Frequently asked questions

### Social Media Support

- **Open Graph**: Facebook, LinkedIn sharing
- **Twitter Cards**: Enhanced Twitter sharing
- **Image optimization**: Automatic full URL generation

## Best Practices

### 1. Title Optimization

```typescript
// Good: Specific and descriptive
title: "React Developer Portfolio - Tim DeHof";

// Bad: Too generic
title: "Portfolio";
```

### 2. Description Guidelines

- Keep descriptions between 150-160 characters
- Include target keywords naturally
- Make them compelling for users

### 3. Image Requirements

- **Open Graph**: 1200x630px (recommended)
- **Twitter Card**: 1200x600px (minimum)
- Use absolute URLs for images

### 4. Keywords Strategy

```typescript
// Good: Specific and relevant
keywords: "React developer, TypeScript, Node.js, full stack";

// Bad: Keyword stuffing
keywords: "developer developer developer React React React";
```

## Testing Your SEO

### 1. Meta Tags

Use browser dev tools to inspect `<head>` section and verify all meta tags are present.

### 2. Open Graph

Test with:

- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

### 3. Twitter Cards

Test with:

- [Twitter Card Validator](https://cards-dev.twitter.com/validator)

### 4. Structured Data

Test with:

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)

## Troubleshooting

### Common Issues

1. **Images not showing in social previews**
   - Ensure images use absolute URLs
   - Check image dimensions (1200x630px recommended)
   - Verify images are publicly accessible

2. **Meta tags not updating**
   - Clear browser cache
   - Check if react-helmet-async is properly configured
   - Verify SEOHead component is rendered

3. **Structured data errors**
   - Validate JSON-LD syntax
   - Ensure required properties are present
   - Test with Google's Rich Results Test

### Debug Mode

Add this to see current SEO data:

```tsx
// eslint-disable-next-line react-hooks/rules-of-hooks
const seoData = useSEO();
// eslint-disable-next-line no-console
console.log("Current SEO:", seoData);
```

## Performance Considerations

- SEO components are lightweight and don't impact performance
- Structured data is minimal and cached by browsers
- Images are optimized for social sharing
- Meta tags are generated server-side when possible

## Future Enhancements

Consider adding:

- **Sitemap generation**: Automatic XML sitemap
- **Analytics integration**: Google Analytics 4, Search Console
- **A/B testing**: Different meta descriptions
- **Internationalization**: Multi-language SEO support
