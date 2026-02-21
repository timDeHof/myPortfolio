// SEO Configuration - Customize these values for your portfolio

const siteConfig = {
  // Basic site information
  siteName: 'Tim DeHof Portfolio',
  siteUrl: 'https://timdehof.dev', // Update with your actual domain
  author: 'Tim DeHof',
  email: 'tim@timdehof.dev',
  
  // Social media handles
  social: {
    twitter: '@timDeHof', // Update with your Twitter handle
    github: 'https://github.com/timDeHof',
    linkedin: 'https://linkedin.com/in/timdehof',
  },
  
  // Default images
  images: {
    ogImage: '/og-image.jpg', // 1200x630px recommended
    favicon: '/favicon.ico',
    appleTouchIcon: '/apple-touch-icon.png', // 180x180px
  },
  
  // Business/Professional information
  business: {
    name: 'Tim DeHof',
    jobTitle: 'Full Stack Developer',
    location: 'Remote',
    skills: [
      'JavaScript',
      'TypeScript',
      'React',
      'Node.js',
      'Python',
      'Web Development',
      'Full Stack Development',
      'Mechanical Engineering'
    ],
  },
  
  // Analytics and tracking
  analytics: {
    googleAnalyticsId: '', // Add your GA4 ID: G-XXXXXXXXXX
    googleSiteVerification: '', // Add your Google Search Console verification code
    bingVerification: '', // Add your Bing verification code
  },
  
  // Theme colors
  theme: {
    primaryColor: '#3b82f6',
    backgroundColor: '#ffffff',
    textColor: '#1f2937',
  }
};

// Page-specific SEO templates - Customize these for each page
const pageTemplates = {
  home: {
    titleTemplate: '%s - Full Stack Developer & Engineer',
    description: 'Welcome to my portfolio. I\'m a full-stack developer with a background in mechanical engineering, creating efficient and innovative web solutions.',
    keywords: ['Tim DeHof', 'full stack developer', 'React developer', 'Node.js', 'mechanical engineer', 'web development portfolio'],
  },
  
  about: {
    titleTemplate: 'About %s - Developer & Engineer',
    description: 'Learn about my journey from mechanical engineering to web development, and how I bring unique perspectives to every project.',
    keywords: ['Tim DeHof about', 'mechanical engineering', 'web development journey', 'developer background'],
  },
  
  projects: {
    titleTemplate: 'Projects - %s Portfolio',
    description: 'Explore my latest projects including e-commerce applications, machine learning integrations, and full-stack web applications.',
    keywords: ['Tim DeHof projects', 'web development projects', 'React projects', 'full stack applications'],
  },
  
  services: {
    titleTemplate: 'Services - Web Development Solutions',
    description: 'Discover the web development services I offer, from full-stack applications to cutting-edge technology implementations.',
    keywords: ['web development services', 'React development', 'Node.js development', 'full stack services'],
  },
  
  contact: {
    titleTemplate: 'Contact %s - Let\'s Work Together',
    description: 'Get in touch to discuss your next project. I\'m always excited to work on new challenges and innovative solutions.',
    keywords: ['contact Tim DeHof', 'hire developer', 'web development contact', 'project inquiry'],
  },
};

// Section-specific SEO for different parts of pages
export const sectionTemplates = {
  hero: {
    title: 'Innovative Full Stack Developer',
    description: 'Transforming ideas into powerful web applications with modern technologies and engineering precision.',
  },
  
  skills: {
    title: 'Technical Skills & Expertise',
    description: 'Expertise in React, TypeScript, Node.js, Python, and modern web development technologies.',
  },
  
  experience: {
    title: 'Professional Experience',
    description: 'Years of experience in full-stack development, from mechanical engineering to cutting-edge web solutions.',
  },
  
  testimonials: {
    title: 'Client Testimonials',
    description: 'What clients say about working with Tim DeHof on their web development projects.',
  },
  
  portfolio: {
    title: 'Featured Projects',
    description: 'A showcase of recent web development projects and technical achievements.',
  },
};

// Project categories for dynamic SEO
const projectCategories = {
  'web-app': {
    title: 'Web Application',
    description: 'Full-stack web application built with modern technologies',
  },
  'e-commerce': {
    title: 'E-commerce Platform',
    description: 'Online shopping platform with advanced features',
  },
  'api': {
    title: 'API Development',
    description: 'RESTful API and backend service development',
  },
  'mobile': {
    title: 'Mobile Application',
    description: 'Cross-platform mobile application development',
  },
  'tool': {
    title: 'Development Tool',
    description: 'Utility tool for developers and businesses',
  },
};