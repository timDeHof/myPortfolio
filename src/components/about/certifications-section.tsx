import { motion } from "framer-motion";
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
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.3 },
      }}
      className="group h-full"
    >
      <Card className="h-full bg-white dark:bg-slate-800 hover:shadow-2xl dark:hover:shadow-2xl transition-all duration-500 border-gray-200 dark:border-slate-600 rounded-2xl overflow-hidden">
        <CardContent className="p-6 flex flex-col h-full">
          {/* Badge Image */}
          {certification.badgeUrl && (
            <div className="flex justify-center mb-6">
              <motion.div
                className="w-32 h-32 rounded-full overflow-hidden shadow-lg bg-white dark:bg-slate-700 p-2"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={certification.badgeUrl}
                  alt={`${certification.name} badge`}
                  className="w-full h-full object-contain"
                />
              </motion.div>
            </div>
          )}

          {/* Certification Icon (if no badge) */}
          {!certification.badgeUrl && (
            <div className="flex justify-center mb-6">
              <motion.div
                className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-700 to-teal-700 dark:from-blue-400 dark:to-teal-400 flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Award className="w-10 h-10 text-white" />
              </motion.div>
            </div>
          )}

          {/* Content */}
          <div className="flex-1 space-y-3">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
              {certification.name}
            </h3>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-teal-700 dark:text-teal-400">
                {certification.issuer}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Earned:
                {" "}
                {certification.date}
              </p>
            </div>

            {certification.description && (
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {certification.description}
              </p>
            )}

            {/* Skills Tags */}
            {certification.skills && certification.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {certification.skills.map(skill => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Verification Link */}
          {certification.verificationUrl && (
            <motion.a
              href={certification.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 hover:bg-teal-100 dark:hover:bg-teal-900/40 rounded-lg transition-colors group/link"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Verify Credential
              <ExternalLink className="ml-2 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
            </motion.a>
          )}

          {/* Decorative corner accent */}
          <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-teal-700 dark:bg-teal-400 opacity-20 group-hover:opacity-60 transition-opacity" />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export const CertificationsSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-teal-50 to-purple-50 dark:from-slate-800 dark:via-blue-900/30 dark:to-purple-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-6 shadow-2xl text-white text-4xl bg-gradient-to-br from-blue-700 to-teal-700 dark:from-blue-400 dark:to-teal-400">
              <Award className="w-10 h-10" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 via-teal-800 to-purple-800 dark:from-gray-100 dark:via-blue-400 dark:via-teal-400 dark:to-purple-400 bg-clip-text text-transparent mb-6">
              Certifications & Credentials
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Professional certifications that validate my expertise and commitment to continuous learning
              in modern web development and technology.
            </p>
          </motion.div>
        </div>

        {/* Certifications Grid */}
        {certifications.length > 0
          ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {certifications.map((cert, index) => (
                  <CertificationCard
                    key={`${cert.name}-${index}`}
                    certification={cert}
                    index={index}
                  />
                ))}
              </div>
            )
          : (
            // Empty state
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center py-12"
              >
                <Card className="max-w-2xl mx-auto bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-600">
                  <CardContent className="p-12">
                    <Award className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      Certifications Coming Soon
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      I'm currently working on obtaining industry-recognized certifications.
                      Check back soon for updates!
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

        {/* Stats Summary */}
        {certifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-700 border-gray-200 dark:border-slate-600 shadow-2xl rounded-3xl overflow-hidden">
              <CardContent className="p-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-teal-700 dark:from-blue-400 dark:to-teal-400 bg-clip-text text-transparent mb-2">
                      {certifications.length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                      Active Certifications
                    </div>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <div className="text-4xl font-bold bg-gradient-to-r from-teal-700 to-emerald-700 dark:from-teal-400 dark:to-emerald-400 bg-clip-text text-transparent mb-2">
                      {new Set(certifications.map(c => c.issuer)).size}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                      Issuing Organizations
                    </div>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <div className="text-4xl font-bold bg-gradient-to-r from-purple-700 to-pink-700 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-2">
                      {certifications.filter(c => c.verificationUrl).length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                      Verified Credentials
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </section>
  );
};
