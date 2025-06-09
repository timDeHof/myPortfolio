export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export const defaultSEO: SEOData = {
  title: 'Tim DeHof - Full Stack Developer',
  description: 'Experienced full-stack developer specializing in React, Node.js, and modern web technologies. Building innovative solutions with cutting-edge technologies.',
  keywords: 'web developer, full stack developer, React, Node.js, JavaScript, TypeScript, portfolio',
  image: '/og-image.jpg',
};

export const pageSEO = {
  home: {
    title: 'Tim DeHof - Full Stack Developer & Engineer',
    description: 'Welcome to my portfolio. I\'m a full-stack developer with a background in mechanical engineering, creating efficient and innovative web solutions.',
  },
  about: {
    title: 'About Tim DeHof - Developer & Engineer',
    description: 'Learn about my journey from mechanical engineering to web development, and how I bring unique perspectives to every project.',
  },
  projects: {
    title: 'Projects - Tim DeHof Portfolio',
    description: 'Explore my latest projects including e-commerce applications, machine learning integrations, and full-stack web applications.',
  },
  services: {
    title: 'Services - Web Development Solutions',
    description: 'Discover the web development services I offer, from full-stack applications to cutting-edge technology implementations.',
  },
  contact: {
    title: 'Contact Tim DeHof - Let\'s Work Together',
    description: 'Get in touch to discuss your next project. I\'m always excited to work on new challenges and innovative solutions.',
  },
};