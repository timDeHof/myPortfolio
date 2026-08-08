export * from "./about";
export * from "./blog";
export * from "./case-study";
// Domain-organized type re-exports
export * from "./github";
export * from "./portfolio";
export * from "./project";

// Contact form type (not domain-organized, kept here for convenience)
export interface ContactForm {
  name: string;
  email: string;
  message: string;
}
