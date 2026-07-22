import { m } from "framer-motion";
import { ExternalLink, Mail, MapPin } from "lucide-react";
import React from "react";

import { Card, CardContent } from "../ui/card";

const contactInfo = [
  {
    icon: <Mail className="h-6 w-6" />,
    title: "Email",
    value: "tim@timdehof.dev",
    href: "mailto:tim@timdehof.dev",
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    title: "Location",
    value: "Available for remote work",
    href: null,
  },
];

export const ContactInfoPanel: React.FC = () => {
  return (
    <m.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Get in touch
        </h2>
        <p className="text-foreground mb-4">
          I'm always excited to work on new projects and collaborate with
          passionate people. Whether you have a specific project in mind
          or just want to explore possibilities, I'd love to hear from you.
        </p>
        <p className="text-foreground mb-8">
          You can also check out my
          {" "}
          <a
            href="https://blog.timdehof.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 underline inline-flex items-center"
          >
            blog
            <ExternalLink className="h-4 w-4 ml-1" />
          </a>
          {" "}
          for insights into my development process and latest projects.
        </p>
      </div>

      <div className="space-y-6">
        {contactInfo.map((info, index) => (
          <m.div
            key={info.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex items-center space-x-4"
          >
            <div className="flex-shrink-0 w-12 h-12 bg-muted text-primary rounded-full flex items-center justify-center">
              {info.icon}
            </div>
            <div>
              <h3 className="text-sm font-medium text-foreground">
                {info.title}
              </h3>
              {info.href
                ? (
                    <a
                      href={info.href}
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      {info.value}
                    </a>
                  )
                : (
                    <p className="text-foreground">{info.value}</p>
                  )}
            </div>
          </m.div>
        ))}
      </div>

      <Card className="bg-muted border">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Response Time
          </h3>
          <p className="text-foreground text-sm">
            I typically respond to messages within 24 hours. For urgent
            inquiries, please mention it in your message and I'll prioritize
            getting back to you as soon as possible.
          </p>
        </CardContent>
      </Card>
    </m.div>
  );
};
