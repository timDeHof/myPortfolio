import { Cloud, Intro, Practices, Story, Testimonials, Tools } from "@/components/about/sections";

import { SEOHead } from "../components/common/seo-head";
import { Contact } from "../components/home/sections";
import { pageSEO } from "../utils/seo";

export const AboutPage: React.FC = () => {
  return (
    <>
      <SEOHead seo={pageSEO.about} />
      <Intro />
      <Story />
      <Practices />
      {/* Kept below How I work (D1) */}
      <Testimonials />
      <Cloud />
      <Tools />
      <Contact lead="The fastest way to reach me is email." showResume showKicker={false} />
    </>
  );
};
