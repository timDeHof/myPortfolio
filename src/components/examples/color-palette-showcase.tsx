import { motion } from "framer-motion";
import React from "react";

import { colorUsageGuide } from "../../utils/colorPalette";
import { Card, CardContent } from "../ui/card";

export const ColorPaletteShowcase: React.FC = () => {
  const currentColors = [
    { name: "Primary Blue", color: "bg-blue-700", usage: "Main brand color, primary actions" },
    { name: "Success Green", color: "bg-green-700", usage: "Success states, positive feedback" },
    { name: "Creative Purple", color: "bg-purple-700", usage: "Creative sections, innovation" },
    { name: "Professional Slate", color: "bg-slate-700", usage: "Text, neutral elements" },
  ];

  const extendedColors = [
    { name: "Warm Amber", color: "bg-amber-700", usage: "Warnings, warm highlights" },
    { name: "Ocean Teal", color: "bg-teal-700", usage: "Tech sections, professional" },
    { name: "Sky Blue", color: "bg-sky-700", usage: "Cloud services, lighter alternative" },
    { name: "Deep Indigo", color: "bg-indigo-700", usage: "Premium features, enterprise" },
    { name: "Fresh Emerald", color: "bg-emerald-700", usage: "Environmental, growth" },
    { name: "Vibrant Orange", color: "bg-orange-700", usage: "Energy, call-to-action" },
    { name: "Royal Violet", color: "bg-violet-700", usage: "Luxury, innovation" },
    { name: "Modern Cyan", color: "bg-cyan-700", usage: "Data visualization, tech" },
  ];

  const gradientExamples = [
    { name: "Ocean Breeze", gradient: "from-cyan-700 to-blue-700", usage: "Hero sections, tech" },
    { name: "Warm Sunset", gradient: "from-orange-700 to-pink-700", usage: "Creative, energetic" },
    { name: "Forest Night", gradient: "from-emerald-700 to-slate-700", usage: "Professional, nature" },
    { name: "Royal Gold", gradient: "from-indigo-700 to-amber-700", usage: "Premium, luxury" },
    { name: "Mystic Purple", gradient: "from-violet-700 to-fuchsia-700", usage: "Creative, innovative" },
    { name: "Tech Glow", gradient: "from-teal-700 to-indigo-700", usage: "Technology, modern" },
  ];

  return (
    <div className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Accessible Color Palette Options
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            All colors meet WCAG AA accessibility standards with 4.5:1+ contrast ratio on white backgrounds
          </p>
        </div>

        {/* Current Colors */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Current Color Palette
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentColors.map((color, index) => (
              <motion.div
                key={color.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className={`w-full h-20 ${color.color} rounded-lg mb-4 border border-gray-200`}></div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{color.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{color.usage}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Extended Colors */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Additional Accessible Colors
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {extendedColors.map((color, index) => (
              <motion.div
                key={color.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className={`w-full h-20 ${color.color} rounded-lg mb-4 border border-gray-200`}></div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{color.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{color.usage}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Gradient Examples */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Accessible Gradient Combinations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gradientExamples.map((gradient, index) => (
              <motion.div
                key={gradient.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className={`w-full h-20 bg-gradient-to-r ${gradient.gradient} rounded-lg mb-4`}></div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{gradient.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{gradient.usage}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Usage Categories */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Color Usage Categories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(colorUsageGuide).map(([category, colors], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 capitalize">
                      {category.replace(/([A-Z])/g, " $1").trim()}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {colors.map((color) => (
                        <div
                          key={color}
                          className={`w-8 h-8 bg-${color} rounded border border-gray-200`}
                          title={color}
                        >
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Implementation Note */}
        <div className="mt-16 p-8 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-200 dark:border-blue-700">
          <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4">
            Implementation Guidelines
          </h3>
          <div className="space-y-3 text-blue-800 dark:text-blue-200">
            <p>• All colors shown have been tested to meet WCAG AA accessibility standards</p>
            <p>• Use darker shades (700-800) for text and primary elements on light backgrounds</p>
            <p>• Maintain consistency by choosing a primary palette and extending gradually</p>
            <p>• Test color combinations in both light and dark modes</p>
            <p>• Consider color meaning and cultural context when choosing colors</p>
          </div>
        </div>
      </div>
    </div>
  );
};
