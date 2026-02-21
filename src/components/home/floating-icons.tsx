import { Code2, Database, Zap } from "lucide-react";
import React from "react";

import { ReactIcon, TypeScriptIcon } from "../common/technology-icons";

const FloatingIcon: React.FC<{
  icon: React.ReactNode;
  position: string;
  delay: number;
}> = ({ icon, position, delay }) => {
  return (
    <div
      className={`absolute opacity-20 dark:opacity-30 ${position}`}
      style={{
        animation: `float 4s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      {icon}
    </div>
  );
};

export const FloatingIcons: React.FC = () => {
  return (
    <>
      {/* CSS Animation Keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-30px);
          }
        }
      `}</style>

      {/* Floating Icons Container */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top Left - TypeScript */}
        <FloatingIcon
          icon={<TypeScriptIcon size={80} className="text-blue-600 dark:text-blue-400" />}
          position="top-12 left-12"
          delay={0}
        />

        {/* Top Right - React */}
        <FloatingIcon
          icon={<ReactIcon size={80} className="text-cyan-500 dark:text-cyan-400" />}
          position="top-20 right-16"
          delay={0.5}
        />

        {/* Bottom Left - Database/Backend */}
        <FloatingIcon
          icon={<Database size={80} className="text-teal-600 dark:text-teal-400" />}
          position="bottom-20 left-8"
          delay={1}
        />

        {/* Bottom Right - Zap/Performance */}
        <FloatingIcon
          icon={<Zap size={80} className="text-purple-600 dark:text-purple-400" />}
          position="bottom-12 right-12"
          delay={1.5}
        />

        {/* Center Left - Code */}
        <FloatingIcon
          icon={<Code2 size={64} className="text-blue-500 dark:text-blue-300" />}
          position="top-1/2 left-4 -translate-y-1/2"
          delay={0.75}
        />
      </div>
    </>
  );
};
