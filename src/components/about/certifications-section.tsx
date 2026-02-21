import { m } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import React from "react";

import { certifications } from "../../data/certifications";
import { Card, CardContent } from "../ui/card";

// Certification type definition
export type Certification = {
  name: string;
  issuer: string;
  date: string;
  verificationUrl?: string;
  badgeUrl?: string;
  description?: string;
  skills?: string[];
};

type CertificationCardProps = {
  certification: Certification;
  index: number;
};

const CertificationCard: React.FC<CertificationCardProps> = ({ certification, index }) => {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <Card className="flex h-full flex-col border-gray-200 bg-white dark:border-slate-600 dark:bg-slate-800">
        <CardContent className="flex flex-1 flex-col p-6">
          {/* Badge or Icon */}
          <div className="mb-6 flex justify-center">
            {certification.badgeUrl ? (
              <img
                src={certification.badgeUrl}
                alt={`${certification.name} badge`}
                className="h-32 w-32 rounded-full object-contain shadow-lg"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-700 to-teal-700 shadow-lg dark:from-blue-400 dark:to-teal-400">
                <Award className="h-10 w-10 text-white" />
              </div>
            )}
          </div>

          {/* Content */}
          <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-gray-100">
            {certification.name}
          </h3>

          <div className="mb-3 space-y-1">
            <p className="text-sm font-semibold text-teal-700 dark:text-teal-400">
              {certification.issuer}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Earned: {certification.date}
            </p>
          </div>

          {certification.description && (
            <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              {certification.description}
            </p>
          )}

          {/* Skills Tags */}
          {certification.skills && certification.skills.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {certification.skills.map(skill => (
                <span
                  key={skill}
                  className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          {/* Verification Link */}
          {certification.verificationUrl && (
            <a
              href={certification.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center justify-center rounded-lg bg-teal-50 px-4 py-2 text-sm font-medium text-teal-700 transition-colors hover:bg-teal-100 dark:bg-teal-900/20 dark:text-teal-400 dark:hover:bg-teal-900/40"
            >
              Verify Credential
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          )}
        </CardContent>
      </Card>
    </m.div>
  );
};

export const CertificationsSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-teal-50 to-purple-50 py-20 dark:from-slate-800 dark:via-blue-900/30 dark:to-purple-900/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-700 to-teal-700 text-4xl text-white shadow-2xl dark:from-blue-400 dark:to-teal-400">
              <Award className="h-10 w-10" />
            </div>
            <h2 className="mb-6 bg-gradient-to-r from-gray-900 via-blue-800 via-teal-800 to-purple-800 bg-clip-text text-4xl font-bold text-transparent dark:from-gray-100 dark:via-blue-400 dark:via-teal-400 dark:to-purple-400 md:text-5xl">
              Certifications & Credentials
            </h2>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600 dark:text-gray-300">
              Professional certifications that validate my expertise and commitment to continuous learning
              in modern web development and technology.
            </p>
          </m.div>
        </div>

        {/* Certifications Grid */}
        {certifications.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert, index) => (
              <CertificationCard
                key={cert.name}
                certification={cert}
                index={index}
              />
            ))}
          </div>
        ) : (
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="py-12 text-center"
          >
            <Card className="mx-auto max-w-2xl border-gray-200 bg-white dark:border-slate-600 dark:bg-slate-800">
              <CardContent className="p-12">
                <Award className="mx-auto mb-4 h-16 w-16 text-gray-400 dark:text-gray-600" />
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Certifications Coming Soon
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  I'm currently working on obtaining industry-recognized certifications.
                  Check back soon for updates!
                </p>
              </CardContent>
            </Card>
          </m.div>
        )}

        {/* Stats Summary */}
        {certifications.length > 0 && (
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <Card className="overflow-hidden border-gray-200 bg-gradient-to-br from-white to-gray-50 shadow-2xl dark:border-slate-600 dark:from-slate-800 dark:to-slate-700">
              <CardContent className="p-10">
                <div className="grid gap-8 text-center sm:grid-cols-3">
                  <div>
                    <div className="mb-2 bg-gradient-to-r from-blue-700 to-teal-700 bg-clip-text text-4xl font-bold text-transparent dark:from-blue-400 dark:to-teal-400">
                      {certifications.length}
                    </div>
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      Active Certifications
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 bg-gradient-to-r from-teal-700 to-emerald-700 bg-clip-text text-4xl font-bold text-transparent dark:from-teal-400 dark:to-emerald-400">
                      {new Set(certifications.map(c => c.issuer)).size}
                    </div>
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      Issuing Organizations
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 bg-gradient-to-r from-purple-700 to-pink-700 bg-clip-text text-4xl font-bold text-transparent dark:from-purple-400 dark:to-pink-400">
                      {certifications.filter(c => c.verificationUrl).length}
                    </div>
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      Verified Credentials
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </m.div>
        )}
      </div>
    </section>
  );
};
