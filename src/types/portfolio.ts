export interface Certification {
  name: string;
  issuer: string;
  date: string;
  verificationUrl?: string;
  badgeUrl?: string;
  description?: string;
  skills?: string[];
}

export interface NavItem {
  name: string;
  href: string;
}

export interface SocialLink {
  name: string;
  href: string;
}

export interface FooterLinks {
  social: SocialLink[];
}

export interface Navigation {
  navItems: NavItem[];
  footerLinks: FooterLinks;
}

export interface PortfolioData {
  certifications: Certification[];
  navigation: Navigation;
}
